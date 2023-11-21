<script setup>
import { ref, onMounted } from "vue";
import { listPost } from "../../api/post.js";
import PostList from "../common/PostList.vue";

const posts = ref([]);

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

onMounted(() => {
  getPostList(
    currentPage.value,
    pageSize.value,
    searchKey.value,
    searchWord.value
  );
});

const getPostList = (page, size, key, word) => {
  listPost(
    {
      category: "board",
      page: page,
      size: size,
      key: key,
      word: word,
    },
    ({ data }) => {
      posts.value = data.dataBody.data;
      currentPage.value = data.dataBody.currentPage;
      totalPage.value = data.dataBody.totalPage;
      pageSize.value = data.dataBody.size;
      searchKey.value = data.dataBody.key;
      searchWord.value = data.dataBody.word;
    },
    (error) => {
      console.error(error);
    }
  );
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
                getPostList(1, pageSize, searchKey, searchWord)
              "
            ></v-text-field>
          </v-container>
          <v-container class="pa-0 d-flex justify-end align-end">
            <router-link :to="{ name: 'board-write' }" tag="v-btn"
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
            <PostList :posts="posts"></PostList>
            <v-pagination
              class="mt-3 mb-10"
              :length="totalPage"
              show-first-last-page="true"
              @click="getPostList(currentPage, pageSize, searchKey, searchWord)"
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
</style>
