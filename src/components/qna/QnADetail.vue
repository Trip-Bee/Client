<script setup>
import { ref } from "vue";

const qna = ref({
  id: 1,
  title: "title test",
  content: "content test",
  nickname: "nickname test",
  hit: 0,
  createdAt: "2023-11-10",
});

const reviews = ref([
  { id: 1, nickname: "test1", content: "Comment Test1" },
  { id: 2, nickname: "test2", content: "Comment Test2" },
  { id: 3, nickname: "test3", content: "Comment Test3" },
  { id: 4, nickname: "test4", content: "Comment Test4" },
]);
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
        class="mx-auto pa-16 pb-3 w-75 mt-14 mb-2"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >QnA</v-card-title
        >

        <div class="mt-8 mb-8">
          <v-text-field
            class="font-weight-bold"
            variant="solo"
            :value="'[QnA] ' + qna.title"
            readonly
          ></v-text-field>

          <v-textarea
            variant="solo"
            :value="qna.content"
            readonly
            rows="10"
            row-height="15"
            no-resize
          ></v-textarea>
        </div>
      </v-card>
      <v-card
        class="ps-16 pe-16 pt-6 pb-6 w-75 mt-2 mb-14"
        elevation="2"
        rounded="md"
      >
        <v-list lines="three">
          <v-list-subheader class="font-weight-bold">Comment</v-list-subheader>
          <v-list-item
            v-for="review in reviews"
            :key="review.id"
            prepend-avatar="/src/assets/img/profile.png"
            :title="review.nickname"
            :subtitle="review.content"
            elevation="2"
          ></v-list-item>
        </v-list>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
