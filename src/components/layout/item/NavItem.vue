<script setup>
import { ref } from "vue";

const items = ref([
  { value: "spot", title: "여행지", name: "" },
  { value: "plan", title: "플래너", name: "" },
  { value: "board", title: "게시판", name: "" },
  { value: "notice", title: "공지사항", name: "" },
  { value: "qna", title: "QnA", name: "qna-list" },
  { value: "login", title: "로그인", name: "user-login" },
  { value: "signup", title: "회원가입", name: "user-signup" },
]);
</script>

<template>
  <div class="nav mt-6 elevation-2 rounded mb-6">
    <v-row>
      <v-col class="d-flex justify-space-between">
        <div>
          <router-link
            :to="{ name: items[i - 1].name }"
            v-for="i in 5"
            tag="v-btn"
            ><v-btn
              class="font-weight-black"
              variant="plain"
              rounded="lg"
              color="black"
              >{{ items[i - 1].title }}</v-btn
            ></router-link
          >
        </div>
        <div>
          <router-link
            :to="{ name: items[4 + i].name }"
            v-for="i in 2"
            tag="v-btn"
            ><v-btn
              class="font-weight-black"
              variant="plain"
              rounded="lg"
              color="black"
              >{{ items[4 + i].title }}</v-btn
            ></router-link
          >
        </div>
      </v-col>
    </v-row>
  </div>
  <!-- <v-divider class="mt-3 mb-10 border-opacity-25"></v-divider> -->
</template>

<style scoped></style>
