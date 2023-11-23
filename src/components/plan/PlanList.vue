<script setup>
import { ref, onBeforeMount } from "vue";
import PlanListItem from "./item/PlanListItem.vue";
import { listPlan } from "@/api/plan.js";
import { useMemberStore } from "../../stores/member";

const memberStore = useMemberStore();
const { isAuthenticated, userInfo } = memberStore;

const plans = ref([]);

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

const getPlanList = (page, size, key, word) => {
  listPlan(
    {
      page: page,
      size: size,
      key: key,
      word: word,
    },
    ({ data }) => {
      plans.value = data.dataBody.data;
      currentPage.value = data.dataBody.currentPage;
      totalPage.value = data.dataBody.totalPage;
      pageSize.value = data.dataBody.size;
      searchKey.value = data.dataBody.key;
      searchWord.value = data.dataBody.word;
    },
    (error) => {
      console.log(error);
    }
  );
};

onBeforeMount(() => {
  getPlanList(
    currentPage.value,
    pageSize.value,
    searchKey.value,
    searchWord.value
  );
});
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
        class="mx-auto ps-6 pe-6 pt-10 pb-3 w-85 mt-10 mb-10"
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
              @click:appendInner="
                getPlanList(1, pageSize, searchKey, searchWord)
              "
            ></v-text-field>
          </v-container>
          <v-container class="pa-0 d-flex justify-end align-end">
            <div v-if="userInfo != null">
              <div
                :class="{
                  notVisible: !isAuthenticated,
                  visible: isAuthenticated,
                }"
              >
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
              </div>
            </div>
          </v-container>
          <v-container class="pa-0 pt-3">
            <v-table hover="true">
              <thead class="elevation-3">
                <tr>
                  <th class="text-center text-white">ID</th>
                  <th class="text-center text-white w-25">제목</th>
                  <th class="text-center text-white">작성자</th>
                  <th class="text-center text-white">시작일</th>
                  <th class="text-center text-white">종료일</th>
                  <th class="text-center text-white">조회수</th>
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
              @click="getPlanList(currentPage, pageSize, searchKey, searchWord)"
              :show-first-last-page="true"
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

.notVisible {
  visibility: hidden;
}
.visible {
  visibility: visible;
}

.w-85 {
  width: 85%;
}
</style>
