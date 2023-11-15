<script setup>
import TheHeading from "./components/layout/TheHeading.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

<template>
  <div>
    <TheHeading></TheHeading>
    <router-view></router-view>
    <TheFooter></TheFooter>
  </div>
</template>

<style scoped></style>
