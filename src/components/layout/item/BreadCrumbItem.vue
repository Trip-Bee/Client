<script setup>
import { useBreadcrumbsStore } from "../../../stores/breadcrumbs";
const breadcrumbsStore = useBreadcrumbsStore();
const breadcrumbs = breadcrumbsStore.breadcrumbs;
const previousBreadcrumbs = breadcrumbsStore.previousBreadcrumbs;
console.log(breadcrumbs);
console.log(previousBreadcrumbs);
</script>

<template>
  <v-container class="border pa-0 elevation-2 rounded ps-4 text-subtitle-2">
    <v-breadcrumbs class="pa-1" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="$chevronRight"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<style scoped></style>
