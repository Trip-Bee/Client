<script setup>
import { ref } from "vue";
import QnAListItem from "./item/QnAListItem.vue";
import { listPost } from "../../api/post.js";

const posts = ref([]);
const currentPage = ref(0);
const totalPage = ref(0);

const getPostList = () => {
  console.log("들어왔니");
  listPost(
    "qna",
    ({ data }) => {
      console.log(data.dataBody);
      posts.value = data.dataBody;
    },
    (error) => {
      console.error(error);
    }
  );
};

const temp = () => {
  getPostList();
};
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
          <v-container class="search pa-0 w-50 d-flex align-start justify-end">
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
              label="검색어"
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
                color="#757575"
                elevation="1"
                >글쓰기</v-btn
              ></router-link
            >
          </v-container>
          <v-container class="pa-0 pt-3">
            <v-table hover="true">
              <thead class="elevation-3">
                <tr>
                  <th class="text-center text-white">ID</th>
                  <th class="text-center text-white w-50">제목</th>
                  <th class="text-center text-white">작성자</th>
                  <th class="text-center text-white">조회수</th>
                  <th class="text-center text-white">작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in posts" :key="post.id">
                  <td class="text-center">{{ post.id }}</td>
                  <td class="text-center">
                    <router-link
                      class="title text-decoration-none"
                      :to="{ name: 'qna-view', params: { id: post.id } }"
                      >{{ post.title }}</router-link
                    >
                  </td>
                  <td class="text-center">{{ post.nickname }}</td>
                  <td class="text-center">{{ post.hit }}</td>
                  <td class="text-center">{{ post.createdAt }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-pagination
              class="mt-3 mb-10"
              :length="5"
              show-first-last-page="true"
              @click="temp()"
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
  width: 30%;
}

.search-input {
  width: 70%;
}

tr > td:nth-child(1) {
  font-weight: bold;
}

.title {
  color: #424242;
}
</style>
