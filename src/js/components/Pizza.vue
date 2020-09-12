<template>
  <div class="bg-blue-900 h-40 flex items-center justify-center text-center font-extrabold text-xl relative" style="background-image: url(https://source.unsplash.com/MQUqbmszGGM/500x180)">
  <div class="flex justify-center items-center absolute top-0 left-0 h-full w-full bg-blue-900 bg-opacity-75">{{ pizza.name }}</div>
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