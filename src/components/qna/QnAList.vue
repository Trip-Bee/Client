<script setup>
import { ref } from "vue";
import QnAListItem from "./item/QnAListItem.vue";

const items = [
  {
    id: 1,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 2,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 3,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 4,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 5,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
];
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center"
      :elevation="2"
      border
      rounded
    >
      <v-container class="w-75 d-flex flex-wrap justify-center">
        <v-container
          class="search pa-0 mt-8 w-50 d-flex align-start justify-end"
        >
          <v-select
            class="search-type"
            label="검색조건"
            :items="['ID', '제목', '작성자']"
            variant="outlined"
            density="compact"
          ></v-select>
          <v-text-field
            class="search-input ms-2"
            density="compact"
            variant="solo"
            append-inner-icon="$magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </v-container>
        <v-container class="pa-0 d-flex justify-end align-end">
          <router-link :to="{ name: 'qna-write' }" tag="v-btn"
            ><v-btn
              class="font-weight-black"
              variant="outlined"
              rounded="md"
              color="black"
              elevation="2"
              >글쓰기</v-btn
            ></router-link
          >
        </v-container>
        <v-container class="pa-0 pt-3">
          <v-table hover="true">
            <thead class="elevation-2">
              <tr>
                <th class="text-center text-white">ID</th>
                <th class="text-center text-white w-50">제목</th>
                <th class="text-center text-white">작성자</th>
                <th class="text-center text-white">조회수</th>
                <th class="text-center text-white">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.title }}</td>
                <td class="text-center">{{ item.nickname }}</td>
                <td class="text-center">{{ item.hit }}</td>
                <td class="text-center">{{ item.createdAt }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-pagination class="mt-3 mb-10" :length="5"></v-pagination>
        </v-container>
      </v-container>
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
  width: 30%;
}

.search-input {
  width: 70%;
}
</style>
