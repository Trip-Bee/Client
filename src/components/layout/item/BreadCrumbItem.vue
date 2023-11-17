<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  breadcrumbs: String,
});
</script>

<template>
  <v-container class="border pa-0 elevation-2 rounded ps-4">
    <v-breadcrumbs class="pa-2 text-caption" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="$chevronRight"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<style scoped></style>
