<template>
  <div class="p-1">
    <div
        @click="updateSelected"
        class="bg-cover h-40 flex justify-center items-end p-1 relative select-none cursor-pointer"
    >
      <img :src="unsplashUrl"
           alt=""
           width="270"
           height="180"
           loading="lazy"
           class="w-full h-full object-cover absolute left-0 top-0">
      <div
          v-show="selected"
          class="absolute top-0 left-0 w-full h-full bg-pink-500 bg-opacity-75 z-0 flex items-center justify-center"
      >
        <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 24.73L4.27 15L0.956665 18.29L14 31.3333L42 3.33333L38.71 0.0433331L14 24.73Z"
                fill="currentColor"/>
        </svg>
      </div>
      <span class="relative z-10 font-extrabold text-shadow">{{ data.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: [
    'data',
  ],
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    unsplashUrl() {
      return `https://source.unsplash.com/${this.data.unsplashId}/270x180`;
    },
  },
  methods: {
    updateSelected() {
      this.selected = !this.selected;
      this.$emit('ingredientToggled');
    },
  },
};
</script>
