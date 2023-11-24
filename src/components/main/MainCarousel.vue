<script setup>
import { ref } from "vue";

const items = ref([
  { src: "../../src/assets/img/carousel/item1.png" },
  { src: "../../src/assets/img/carousel/item2.png" },
  { src: "../../src/assets/img/carousel/item3.png" },
]);
</script>

<template>
  <v-carousel show-arrows="hover" hide-delimiters cycle>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      cover
      lazy-src
    ></v-carousel-item>
  </v-carousel>
</template>

<style scoped></style>
