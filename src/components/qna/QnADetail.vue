<script setup>
import { ref, onBeforeMount } from "vue";
import { detailPost, deletePost, modifyPost } from "../../api/post.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const qna = ref({});

onBeforeMount(() => {
  getPost();
});

const getPost = () => {
  const param = {
    category: "qna",
    postId: route.params.id,
  };
  detailPost(
    param,
    ({ data }) => {
      qna.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const handleDelete = () => {
  const param = {
    category: "qna",
    postId: route.params.id,
  };

  deletePost(
    param,
    ({ data }) => {
      router.replace({ name: "qna-list" });
    },
    (error) => {
      console.log(error);
    }
  );
};

const handleModify = () => {
  const param = {
    category: "qna",
    postId: route.params.id,
  };

  modifyPost(
    param,
    ({ data }) => {
      router.replace({ name: "qna-list" });
    },
    (error) => {
      console.log(error);
    }
  );
};

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

        <div class="mt-8 mb-1">
          <v-text-field
            v-model="qna.title"
            class="font-weight-bold"
            variant="solo"
            prefix="[QnA] "
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
        <div class="mb-8 d-flex justify-end">
          <v-card-action>
            <v-btn
              class="font-weight-black me-2"
              variant="outlined"
              rounded="md"
              color="success"
              elevation="1"
              @click="
                $router.push({
                  name: 'qna-modify',
                  params: { id: $route.params.id },
                })
              "
              >수정</v-btn
            >
            <v-btn
              class="font-weight-black"
              variant="outlined"
              rounded="md"
              color="error"
              elevation="1"
              @click="handleDelete()"
              >삭제</v-btn
            >
          </v-card-action>
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
