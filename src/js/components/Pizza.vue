<template>
  <div class="w-1/3 flex-none px-3">
    <div class="h-40 bg-gray-800 flex items-center justify-center">Pizza {{ pizza.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Pizza',
  props: [
    'pizza',
  ],
};
</script>