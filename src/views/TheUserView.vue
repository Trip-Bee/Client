<script setup>
import BreadCrumbItem from "../components/layout/item/BreadCrumbItem.vue";
</script>

<template>
  <BreadCrumbItem></BreadCrumbItem>
  <router-view></router-view>
</template>

<style>
mark.orange {
  background: linear-gradient(to top, rgb(243, 164, 18) 20%, transparent 30%);
}
</style>
