<script setup>
import { ref, onMounted } from "vue";
import { detailSpot } from "../../api/spot.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  getSpot();
});

const spot = ref([]);

const getSpot = () => {
  const param = {
    id: route.params.id,
  };
  detailSpot(
    param,
    ({ data }) => {
      spot.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center pt-6 pb-6"
      :elevation="2"
      border
      rounded
    >
      <v-card
        class="mx-auto pa-16 pb-3 w-75 mt-14 mb-2"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h4 font-weight-bold mb-6">{{
          spot.title
        }}</v-card-title>
        <v-sheet
          class="d-flex justify-space-bewteen mt-8 mb-8 pa-8"
          :elevation="2"
          border
          rounded
        >
          <v-img
            class="elevation-2 rounded"
            :src="
              spot.image != '' ? spot.image : '../../src/assets/img/default.png'
            "
            :width="400"
            :aspect-ratio="1 / 1"
            cover
          ></v-img>
          <div class="w-75 ms-4 me-4">
            <v-text-field
              label="주소"
              v-model="spot.addr"
              class="font-weight-bold"
              variant="solo"
              readonly
            ></v-text-field>
            <v-text-field
              label="전화번호"
              v-model="spot.tel"
              class="font-weight-bold"
              variant="solo"
              readonly
            ></v-text-field>
            <v-textarea
              label="overview"
              v-model="spot.overview"
              class="font-weight-medium text-left"
              variant="solo"
              rows="15"
              no-resize
              hide-details
              readonly
            ></v-textarea>
          </div>
        </v-sheet>
      </v-card> </v-sheet
  ></v-container>
</template>

<style scoped></style>
