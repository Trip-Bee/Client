<script setup>
import { ref } from "vue";
import BreadCrumbItem from "../components/layout/item/BreadCrumbItem.vue";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
// const {user} = storeToRefs

const breadcrumbs = ref(["Main"]);
</script>

<template>
  <BreadCrumbItem :breadcrumbs="breadcrumbs"></BreadCrumbItem>
</template>

<style scoped></style>
