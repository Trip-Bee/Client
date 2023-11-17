<script setup>
import TheHeading from "./components/layout/TheHeading.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

<template>
  <v-layout ref="app" class="d-flex flex-wrap justify-center">
    <v-container class="pa-0 w-75">
      <TheHeading></TheHeading>
      <router-view></router-view>
      <TheFooter></TheFooter>
    </v-container>
  </v-layout>
</template>

<style scoped></style>
