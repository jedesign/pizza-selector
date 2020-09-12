<template>
  <div class="min-h-screen p-8 flex">
    <div class="h-full flex flex-col text-gray-100 w-full">
      <p class="p-1 text-xs">Eine Zutatenbasierte Pizza-Auswahlhilfe für Nerds.</p>
      <div class="w-full" v-show="selectedIngredients.length > 0">
        <h2 class="p-1 text-4xl mb-4 mt-8">
          Deine
          <span v-if="filteredPizzas.length=== 1">Pizza</span>
          <span v-else>Pizzen</span>
        </h2>
        <div class="grid xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-flow-row gap-2">
          <pizza v-for="pizza in filteredPizzas" :pizza="pizza" :key="pizza.id" />
        </div>
      </div>
      <div class="w-full">
        <h2 class="text-4xl mb-4 mt-8 p-1">Deine Zutaten</h2>
        <div class="grid xxl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <ingredient :data="ingredient"
              @ingredientToggled="updateSelectedIngredient"
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              v-show="!ingredient.disabled"
              ref="ingredients" />
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
    loadPizzas() {
      Axios.get(
          `https://api.airtable.com/v0/${Config.airTableApp}/pizza`,
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
          `https://api.airtable.com/v0/${Config.airTableApp}/ingredient`,
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