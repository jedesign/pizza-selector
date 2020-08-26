<template>
  <div class="flex">
    <div>
      <h2>Pizzas</h2>
      <ul>
        <template v-for="pizza in filteredPizzas">
          <pizza :pizza="pizza" />
        </template>
      </ul>
    </div>
    <div>
      <h2>Zutaten</h2>
      {{ selectedIngredients }}
      <ul>
        <template v-for="ingredient in ingredients">
          <ingredient :data="ingredient" @toggle="toggleIngredientSelection" />
        </template>
      </ul>
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
    toggleIngredientSelection(ingredient) {
      const i = this.selectedIngredients.indexOf(ingredient);
      if (i === -1) {
        this.selectedIngredients.push(ingredient);
      } else {
        this.selectedIngredients.splice(i, 1);
      }
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