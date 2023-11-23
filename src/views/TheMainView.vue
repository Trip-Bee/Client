<script setup>
import BreadCrumbItem from "../components/layout/item/BreadCrumbItem.vue";
import MainCarousel from "../components/main/MainCarousel.vue";
</script>

<template>
  <!-- <BreadCrumbItem></BreadCrumbItem> -->
  <MainCarousel class="w-100"></MainCarousel>
  <v-divider class="mt-3 mb-4"></v-divider>
  <v-container class="pa-0 mb-4">
    <v-sheet class="mx-auto" elevation="4">
      <div class="pt-6 text-h5 font-weight-bold text-center">
        <p class="">여행지 Top 10</p>
      </div>
      <v-slide-group v-model="model" class="pa-4">
        <v-slide-group-item v-for="n in 10" :key="n">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                :color="isHovering ? '#283241' : undefined"
                :class="['ma-4']"
                height="300"
                width="210"
                elevation="6"
                hover
              >
                <v-img src="../../src/assets/img/default.png"></v-img>
                <v-divider class="mt-1 mb-1 border-opacity-50"></v-divider>
                <v-card-title>TItle</v-card-title>
                <v-card-subtitle class="text-truncate">Addr</v-card-subtitle>
              </v-card>
            </template>
          </v-hover>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
  <v-container class="pa-0 mb-4">
    <v-sheet class="mx-auto" elevation="4">
      <div class="pt-6 text-h5 font-weight-bold text-center">
        <p class="">계획 Top 10</p>
      </div>
      <v-slide-group v-model="model" class="pa-4">
        <v-slide-group-item v-for="n in 10" :key="n">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                :color="isHovering ? '#283241' : undefined"
                :class="['ma-4']"
                height="300"
                width="210"
                elevation="6"
                hover
              >
                <v-img src="../../src/assets/img/default.png"></v-img>
                <v-divider class="mt-1 mb-1 border-opacity-50"></v-divider>
                <v-card-title>TItle</v-card-title>
                <v-card-subtitle class="text-truncate">Addr</v-card-subtitle>
              </v-card>
            </template>
          </v-hover>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
