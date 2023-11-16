<script setup>
import { ref } from "vue";

const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];

const icons = ["$facebook", "$twitter", "$instagram", "$linkedin", "$github"];
</script>

<template>
  <div class="footer">
    <v-divider class="mt-10"></v-divider>
    <div class="d-flex justify-space-between mt-4 mb-3">
      <div class="color-bg-grey-lighten-1">
        <strong>© {{ new Date().getFullYear() }} — Company, Inc</strong>
      </div>
      <div></div>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-1"
          :icon="icon"
          variant="text"
          size="small"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  color: #757575;
}
</style>
