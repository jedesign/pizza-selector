<template>
  <li>
    {{ pizza.name }}
  </li>
</template>

<script>
export default {
  name: 'Pizza',
  props:[
      'pizza'
  ]
};
</script>

<style scoped>

</style>