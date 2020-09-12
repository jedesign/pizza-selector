<template>
  <div class="h-40 bg-gray-800 flex items-center justify-center text-center">Pizza <br>{{ pizza.name }}</div>
</template>

<script>
export default {
  name: 'Pizza',
  props: [
    'pizza',
  ],
};
</script>