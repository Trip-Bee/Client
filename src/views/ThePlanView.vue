<script setup>
import { ref } from "vue";
import BreadCrumbItem from "../components/layout/item/BreadCrumbItem.vue";

const breadcrumbs = ref(["Main", "Plan"]);
</script>

<template>
  <BreadCrumbItem :breadcrumbs="breadcrumbs"></BreadCrumbItem>
  <router-view></router-view>
</template>

<style scoped></style>
