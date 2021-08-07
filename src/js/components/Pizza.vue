<template>
  <div class="bg-gray-800 h-52 flex items-center justify-center text-center font-extrabold text-xl relative p-4 rounded-lg overflow-hidden">
    {{ pizza.name }}
    <span class="h-full absolute left-0 top-0 w-[45px]">
      <pizza-shape :color="pizza.restaurant_color[0]" />
      <span class="transform rotate-180 writing-mode-vertical-lr font-light text-sm absolute left-0 h-full w-[33px] flex justify-center items-center">{{
          pizza.restaurant_name[0]
        }}</span>
    </span>
  </div>
</template>

<script>
import PizzaShape from './PizzaShape';

export default {
  name: 'Pizza',
  props: [
    'pizza',
  ],
  components: {PizzaShape},
};
</script>
