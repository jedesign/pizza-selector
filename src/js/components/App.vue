<template>
  <div class="min-h-screen p-8 flex">
    <div class="h-full flex flex-col text-gray-100 w-full">
      <p class="p-1 text-xs">Eine Zutatenbasierte Pizza-Auswahlhilfe für Nerds.</p>

      <div class="w-full">
        <div class="flex justify-start items-center">
          <h2 class="text-4xl mb-2 mt-2 p-1 mr-10">{{ ingredientsTitle }}</h2>
          <div
              class="bg-gray-800 font-semibold rounded-lg hover:bg-pink-500 button flex justify-center items-center cursor-pointer"
              v-show="selectedIngredients.length > 0"
              @click="resetIngredients"
          >Mach Weg
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

      this.sortOutIngredients(pizzas);

      return pizzas;
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
  },
};
</script>
