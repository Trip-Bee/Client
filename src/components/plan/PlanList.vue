<script setup>
import { ref, onBeforeMount } from "vue";
import PlanListItem from "./item/PlanListItem.vue";

const plans = ref([
  {
    planId: 1,
    startDate: "2023-11-20",
    endDate: "2023-11-22",
    title: "집가고 싶다",
    writedId: 1,
    nickname: "test",
    createdAt: "2023-11-20",
  },
  {
    planId: 2,
    startDate: "2023-11-20",
    endDate: "2023-11-22",
    title: "집가고 싶다2",
    writedId: 1,
    nickname: "test2",
    createdAt: "2023-11-20",
  },
  {
    planId: 3,
    startDate: "2023-11-20",
    endDate: "2023-11-22",
    title: "집가고 싶다3",
    writedId: 1,
    nickname: "test3",
    createdAt: "2023-11-20",
  },
]);

const currentPage = ref(0);
const totalPage = ref(0);
const pageSize = ref(10);

const searchKey = ref("");
const searchWord = ref("");

const items = ref([
  { text: "ID", value: "id" },
  { text: "제목", value: "title" },
  { text: "작성자", value: "nickname" },
]);

onBeforeMount(() => {});
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center pt-8 pb-14"
      :elevation="2"
      border
      rounded
    >
      <v-card
        class="mx-auto ps-16 pe-16 pt-10 pb-3 w-75 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-container class="d-flex flex-wrap justify-center">
          <v-container
            class="search pa-0 w-50 mb-3 d-flex align-start justify-end"
          >
            <v-select
              class="search-type"
              label="검색조건"
              :items="items"
              item-title="text"
              item-value="value"
              variant="outlined"
              density="compact"
              v-model="searchKey"
              hide-details
            ></v-select>
            <v-text-field
              class="search-input ms-2"
              density="compact"
              variant="solo"
              label="검색어"
              append-inner-icon="$magnify"
              single-line
              hide-details
              v-model="searchWord"
              clearable
            ></v-text-field>
          </v-container>
          <v-container class="pa-0 d-flex justify-end align-end">
            <router-link :to="{ name: 'plan-write' }" tag="v-btn"
              ><v-btn
                class="font-weight-black"
                variant="outlined"
                rounded="md"
                color="#757575"
                elevation="1"
                >계획 작성</v-btn
              ></router-link
            >
          </v-container>
          <v-container class="pa-0 pt-3">
            <v-table hover="true">
              <thead class="elevation-3">
                <tr>
                  <th class="text-center text-white">ID</th>
                  <th class="text-center text-white w-35">제목</th>
                  <th class="text-center text-white">작성자</th>
                  <th class="text-center text-white">시작일</th>
                  <th class="text-center text-white">종료일</th>
                  <th class="text-center text-white">작성일</th>
                </tr>
              </thead>
              <tbody v-for="plan in plans" :key="plan.planId">
                <PlanListItem :plan="plan"></PlanListItem>
              </tbody>
            </v-table>
            <v-pagination
              class="mt-3 mb-10"
              :length="totalPage"
              show-first-last-page="true"
              v-model="currentPage"
            ></v-pagination>
          </v-container>
        </v-container>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped>
th {
  background-color: #424242;
}

.search {
  height: 0%;
}

.search-type {
  width: 40%;
}

.search-input {
  width: 60%;
}

.w-35 {
  width: 35%;
}
</style>