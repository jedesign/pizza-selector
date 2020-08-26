<template>
  <li @click="$emit('toggle',data.id)">
    {{ data.name }}<br>
    <img :src="unsplashUrl" alt="">
  </li>
</template>

<script>
export default {
  name: 'Ingredient',
  props: [
    'data',
  ],
  computed: {
    unsplashUrl() {
      return `https://source.unsplash.com/${this.data.unsplashId}/120x80`;
    },
  },
};
</script>