<template>
  <div class="w-1/4 flex-none p-3">
    <div
        @click="$emit('toggle',data.id)"
        :style="`background-image: url(${unsplashUrl})`"
        class="bg-cover h-40 flex justify-center items-end p-3"
    >
      {{ data.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: [
    'data',
  ],
  computed: {
    unsplashUrl() {
      return `https://source.unsplash.com/${this.data.unsplashId}/270x180`;
    },
  },
};
</script>