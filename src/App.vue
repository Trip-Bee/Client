<script setup>
import { ref } from "vue";
import TheHeading from "./components/layout/TheHeading.vue";
import TheFooter from "./components/layout/TheFooter.vue";

const tab = ref("");
const items = ref(["spot", "plan", "board", "notice", "qna"]);
</script>

<template>
  <v-layout ref="app" class="d-flex justify-center flex-wrap align-center">
    <TheHeading class="w-75"></TheHeading>
    <router-view class="w-75"></router-view>
    <TheFooter class="w-75"></TheFooter>
  </v-layout>
</template>

<style scoped></style>
