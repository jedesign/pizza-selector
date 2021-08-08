<template>
  <div class="min-h-screen p-4 flex sm:p-8">
    <div class="h-full flex flex-col text-gray-100 w-full">
      <p class="p-1 text-xs">Eine Zutatenbasierte Pizza-Auswahlhilfe für Nerds.</p>

      <div class="w-full">
        <div class="flex flex-wrap justify-start items-center mb-4">
          <h2 class="text-4xl my-2 p-1 mr-10 w-full md:w-auto">{{ ingredientsTitle }}</h2>
          <div class="flex">
            <div
                class="bg-gray-800 font-semibold rounded-lg md:hover:bg-pink-500 button flex justify-center items-center cursor-pointer mr-4 select-none"
                :class="[{'bg-pink-500': explicitIngredientsFilter},{'pointer-events-none opacity-20 bg-transparent':!enableExplicitIngredientsFilterButton}]"
                v-show="showExplicitIngredientsFilterButton"
                @click="toggleExplicitIngredientsFilter"
            ><span>Nur diese&nbsp;</span><span v-if="selectedIngredients.length=== 1">Zutat</span><span v-else>Zutaten</span>
              <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[1em] w-[1em] ml-2" v-if="explicitIngredientsFilter">
                <path d="M14 24.73L4.27 15L0.956665 18.29L14 31.3333L42 3.33333L38.71 0.0433331L14 24.73Z" fill="currentColor" />
              </svg>
            </div>
            <div
                class="bg-gray-800 font-semibold rounded-lg md:hover:bg-pink-500 button flex justify-center items-center cursor-pointer"
                v-show="selectedIngredients.length > 0"
                @click="resetIngredients"
            >Mach Weg
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
          <ingredient :data="ingredient"
              @ingredientToggled="updateSelectedIngredient"
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              v-show="!ingredient.disabled"
              ref="ingredients" />
        </div>
      </div>

      <div class="w-full" v-show="selectedIngredients.length > 0">
        <h2 class="p-1 text-4xl mb-4 mt-8">
          Deine
          <span v-if="filteredPizzas.length=== 1">Pizza</span>
          <span v-else>Pizzen</span>
        </h2>
        <div class="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-flow-row gap-2">
          <pizza v-for="pizza in filteredPizzas" :pizza="pizza" :key="pizza.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Config from '../config.js';
import Pizza from './Pizza';
import Ingredient from './Ingredient';

export default {
  name: 'App',
  data() {
    return {
      pizzas: [],
      ingredients: [],
      selectedIngredients: [],
      explicitIngredientsFilter: false,
    };
  },
  computed: {
    ingredientsTitle() {
      const titles = [
        'Deine Zutaten',
        'I wött:',
        'Gib:',
        'Habe Bock auf:',
        'Uf wa häsch Lust?',
        'Da sind dini Optione:',
      ];
      return titles[Math.floor(Math.random() * titles.length)];
    },
    filteredPizzas() {
      let pizzas = [];
      if (this.selectedIngredients.length < 1) {
        this.sortOutIngredients(this.pizzas);
        return this.pizzas;
      }
      if (this.explicitIngredientsFilter) {
        pizzas = this.explicitFilteredPizzas;
      } else {
        this.pizzas.forEach(pizza => {
          let includesAllIngredients = true;

          this.selectedIngredients.forEach(ingredient => {
            if (pizza.ingredients && pizza.ingredients.includes(ingredient)) {
              return;
            }
            includesAllIngredients = false;
          });
          if (!includesAllIngredients) {
            return;
          }
          pizzas.push(pizza);
        });
      }

      this.sortOutIngredients(pizzas);

      return pizzas;
    },
    explicitFilteredPizzas() {
      let pizzas = [];
      if (this.selectedIngredients.length < 1) {
        return this.pizzas;
      }
      this.pizzas.forEach(pizza => {
        let includesAllIngredients = true;
        if (this.selectedIngredients.length !== pizza.ingredients.length) {
          return;
        }
        this.selectedIngredients.forEach(ingredient => {
          if (pizza.ingredients && pizza.ingredients.includes(ingredient)) {
            return;
          }
          includesAllIngredients = false;
        });
        if (!includesAllIngredients) {
          return;
        }
        pizzas.push(pizza);
      });
      return pizzas;
    },
    showExplicitIngredientsFilterButton() {
      return this.selectedIngredients.length >= 1;
    },
    enableExplicitIngredientsFilterButton() {
      return this.explicitFilteredPizzas.length >= 1;
    },
  },
  components: {
    Pizza,
    Ingredient,
  },
  mounted() {
    this.loadPizzas();
    this.loadingredients();
  },
  methods: {
    updateSelectedIngredient() {
      if (!this.$refs.ingredients) {
        this.selectedIngredients = [];
      }
      let ingredients = [];
      this.$refs.ingredients.forEach(ingredient => {
        if (!ingredient.selected) {
          return;
        }
        ingredients.push(ingredient.data.id);
      });

      if (ingredients.length === 0) {
        this.explicitIngredientsFilter = false;
      }

      this.selectedIngredients = ingredients;
    },
    sortOutIngredients(filteredPizzas) {
      if (!this.$refs.ingredients) {
        return;
      }
      this.$refs.ingredients.forEach(ingredient => {
        let id = ingredient.data.id;
        ingredient.data.disabled = true;

        filteredPizzas.forEach(pizza => {
          if (!ingredient.data.disabled) {
            return;
          }

          if (pizza.ingredients && pizza.ingredients.includes(id)) {
            ingredient.data.disabled = false;
          }
        });
      });
    },
    resetIngredients() {
      this.explicitIngredientsFilter = false;
      this.selectedIngredients = [];
      if (!this.$refs.ingredients) {
        return;
      }
      this.$refs.ingredients.forEach(
          ingredient => {
            ingredient.data.disabled = false;
            ingredient.selected = false;
          });
    },
    loadPizzas() {
      Axios.get(
          `https://api.airtable.com/v0/${Config.airTableApp}/pizza?sort[0][field]=name&sort[0][direction]=asc`,
          {headers: {Authorization: 'Bearer ' + Config.apiToken}})
          .then((response) => {
            this.pizzas = response.data.records.map((item) => {
              return {
                id: item.id,
                ...item.fields,
              };
            });
          }).catch((error) => {
        console.log(error);
      });
    },
    loadingredients() {
      Axios.get(
          `https://api.airtable.com/v0/${Config.airTableApp}/ingredient?sort[0][field]=prioritise&sort[0][direction]=desc&sort[1][field]=pizzas_count&sort[1][direction]=desc&sort[2][field]=name&sort[2][direction]=asc`,
          {headers: {Authorization: 'Bearer ' + Config.apiToken}})
          .then((response) => {
            this.ingredients = response.data.records.map((item) => {
              return {
                id: item.id,
                disabled: false,
                ...item.fields,
              };
            });
          }).catch((error) => {
        console.log(error);
      });
    },
    toggleExplicitIngredientsFilter() {
      this.explicitIngredientsFilter = !this.explicitIngredientsFilter;
    },
  },
};
</script>
