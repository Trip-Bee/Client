<script setup>
import ProfileItem from "./item/ProfileItem.vue";
import NavItem from "./item/NavItem.vue";
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;
console.log(menuList);

const logout = () => {
  console.log("로그아웃!!!");
  changeMenuState();
};
</script>

<template>
  <div class="mt-10">
    <div class="d-flex flex-wrap align-center justify-space-between">
      <div></div>
      <a href="/" class="d-flex justiry-center">
        <v-img
          class="d-flex"
          src="src/assets/img/logo.png"
          alt="logo"
          :width="200"
        ></v-img>
      </a>
      <ProfileItem></ProfileItem>
    </div>
    <NavItem class="mt-8"></NavItem>
  </div>
</template>

<style scoped></style>
