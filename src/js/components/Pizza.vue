<template>
  <div class="bg-gray-800 h-40 flex items-center justify-center text-center font-extrabold text-xl">{{ pizza.name }}</div>
</template>

<script>
export default {
  name: 'Pizza',
  props: [
    'pizza',
  ],
};
</script>