<template>
  <div class="p-8 flex h-screen">
    <div class="min-h-full flex flex-col items-center text-gray-100 w-full max-w-6xl m-auto">
      <p class="text-center text-xs">Eine Zutatenbasierte Pizza-Auswahlhilfe für Nerds.</p>
      <div class="w-full">
        <h2 class="text-center text-4xl mb-8 mt-12">Deine Pizza</h2>
        <!--        <div class="flex flex-row flex-no-wrap overflow-hidden -mx-3">-->
        <div class="grid grid-flow-col gap-3 overflow-x-scroll">
          <pizza v-for="pizza in filteredPizzas" :pizza="pizza" :key="pizza.id" />
        </div>
      </div>
      <div class="w-full">
        <h2 class="text-center text-4xl mb-8 mt-12">Deine Zutaten</h2>
        <div class="flex flex-row flex-wrap -m-3">
          <ingredient :data="ingredient"
              @ingredientToggled="updateActiveIngredients"
              v-for="ingredient in ingredients"
              :key="ingredient.id"
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
    updateActiveIngredients() {
      if (!this.$refs.ingredients) {
        this.selectedIngredients = [];
      }
      let ingredients = [];
      this.$refs.ingredients.forEach(ingredient => {
        if (!ingredient.active) {
          return;
        }
        ingredients.push(ingredient.data.id);
      });
      this.selectedIngredients = ingredients;
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