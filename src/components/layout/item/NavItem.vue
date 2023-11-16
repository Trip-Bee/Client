<script setup>
import { ref } from "vue";

const items = ref([
  { value: "spot", name: "여행지" },
  { value: "plan", name: "플래너" },
  { value: "board", name: "게시판" },
  { value: "notice", name: "공지사항" },
  { value: "qna", name: "QnA" },
  { value: "login", name: "로그인" },
  { value: "join", name: "회원가입" },
]);
</script>

<template>
  <div class="nav mt-6 elevation-2 rounded mb-10">
    <v-row>
      <v-col class="d-flex justify-space-between">
        <div>
          <v-btn
            class="font-weight-black"
            variant="plain"
            rounded="lg"
            v-for="i in 5"
            >{{ items[i - 1].name }}</v-btn
          >
        </div>
        <div>
          <v-btn
            class="font-weight-black"
            variant="plain"
            rounded="lg"
            v-for="i in 2"
            >{{ items[4 + i].name }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
  <!-- <v-divider class="mt-3 mb-10 border-opacity-25"></v-divider> -->
</template>

<style scoped></style>
