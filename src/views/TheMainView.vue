<script setup>
import { ref, onMounted } from "vue";
import BreadCrumbItem from "../components/layout/item/BreadCrumbItem.vue";
import MainCarousel from "../components/main/MainCarousel.vue";
import { top10Plan } from "../api/plan.js";
import { top10Spot } from "../api/spot.js";
import { useRouter } from "vue-router";

const router = useRouter();

const plans = ref([]);
const spots = ref([]);

onMounted(() => {
  getTop10Plan();
  getTop10Spot();
});

const getTop10Plan = () => {
  top10Plan(
    {},
    ({ data }) => {
      console.log(data);
      plans.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const getTop10Spot = () => {
  top10Spot(
    {},
    ({ data }) => {
      spots.value = data.dataBody;
      console.log(spots.value);
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <!-- <BreadCrumbItem></BreadCrumbItem> -->
  <MainCarousel class="w-100"></MainCarousel>
  <v-divider class="mt-3 mb-4 border-opacity-75"></v-divider>
  <v-container class="pa-0 mb-4">
    <v-sheet class="mx-auto" elevation="4">
      <div class="pt-6 text-h5 font-weight-bold text-center">
        <p class="">여행지 Top 10</p>
      </div>
      <v-slide-group v-model="model" class="pa-4">
        <v-slide-group-item v-for="spot in spots" :key="spot.spotId">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                :color="isHovering ? '#424242' : undefined"
                :class="['ma-4']"
                height="300"
                width="210"
                elevation="6"
                hover
                @click.prevent="
                  router.push({
                    name: 'spot-view',
                    params: { id: spot.spotId },
                  })
                "
              >
                <v-img :src="spot.image" :height="140"></v-img>
                <div class="mt-1"></div>
                <v-card-title>{{ spot.title }}</v-card-title>
                <v-card-subtitle class="text-truncate">{{
                  spot.addr
                }}</v-card-subtitle>
                <div class="mt-4">
                  <v-card-action class="pa-0 ma-0 ms-4 mt-6">
                    <v-btn
                      size="smal"
                      class="pa-0 ma-0"
                      color="#EF5350"
                      icon="$heart"
                      variant="text"
                    ></v-btn>
                    {{ spot.likeCount }}
                  </v-card-action>
                </div>
              </v-card>
            </template>
          </v-hover>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
  <v-divider class="mt-3 mb-4 border-opacity-75"></v-divider>
  <v-container class="pa-0 mb-4">
    <v-sheet class="mx-auto" elevation="4">
      <div class="pt-6 text-h5 font-weight-bold text-center">
        <p class="">계획 Top 10</p>
      </div>
      <v-slide-group v-model="model" class="pa-4">
        <v-slide-group-item v-for="plan in plans" :key="plan.planId">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                :color="isHovering ? '#424242' : undefined"
                :class="['ma-4']"
                height="300"
                width="210"
                elevation="6"
                hover
                @click.prevent="
                  router.push({
                    name: 'plan-view',
                    params: { id: plan.planId },
                  })
                "
              >
                <v-img src="../../src/assets/img/default.png"></v-img>
                <div class="mt-1"></div>
                <v-card-title>{{ plan.title }}</v-card-title>
                <v-card-subtitle class="text-truncate"
                  >조회수 : {{ plan.hit }}</v-card-subtitle
                >
              </v-card>
            </template>
          </v-hover>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
