<script setup>
import { watch } from "vue";
import ProfileItem from "./item/ProfileItem.vue";
import NavItem from "./item/NavItem.vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { isAuthenticated } = storeToRefs(memberStore);

console.log("heading " + isAuthenticated.value);
watch(isAuthenticated, (newValue, oldValue) => {
  console.log(`heading watch ${oldValue} ${newValue}`);
});
</script>

<template>
  <v-container class="mt-10 pa-0">
    <div class="d-flex flex-wrap align-center justify-space-between">
      <div :class="{ notVisible: isAuthenticated }">aaaa</div>
      <a href="/" class="d-flex justiry-center">
        <v-img
          src="../../src/assets/img/logo.png"
          class="d-flex"
          alt="logo"
          :width="200"
        ></v-img>
      </a>
      <div :class="{ notVisible: isAuthenticated }">
        <ProfileItem></ProfileItem>
      </div>
    </div>
    <NavItem class="mt-8"></NavItem>
  </v-container>
</template>

<style scoped>
.notVisible {
  visibility: hidden;
}
</style>
