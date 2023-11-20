<script setup>
import { ref, onBeforeMount } from "vue";
import { detailPost, modifyPost } from "../../api/post.js";
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
      // 현재 qna가 수정이 안됨 >> 글자 변경되도록
      qna.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const submit = (modifyTitle, modifyContent) => {
  const post = {
    postId: route.params.id,
    title: modifyTitle,
    content: modifyContent,
  };
  console.log(post);
  const param = { category: "qna", post: post };
  modifyPost(
    param,
    ({ data }) => {
      router.replace({ name: "qna-view", params: { id: route.params.id } });
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
      class="d-flex flex-wrap justify-center pt-8 pb-14"
      :elevation="2"
      border
      rounded
    >
      <v-card
        class="mx-auto pa-16 pb-3 w-75 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >QnA 수정</v-card-title
        >

        <form @submit.prevent="submit">
          <div class="mt-8">
            <v-text-field
              v-model="qna.title"
              label="Title"
              variant="solo"
              prefix="[QnA] "
            ></v-text-field>
            <v-textarea
              v-model="qna.content"
              label="Content"
              variant="solo"
              rows="10"
              row-height="15"
              no-resize
            ></v-textarea>
          </div>

          <v-container class="pa-0 d-flex justify-space-between">
            <v-btn
              class="write-btn mt-4 mb-16 font-weight-bold"
              color="#424242"
              variant="elevated"
              @click="submit(qna.title, qna.content)"
            >
              수정
            </v-btn>

            <v-btn
              class="reset-btn mt-4 mb-16 font-weight-bold"
              color="#424242"
              variant="elevated"
              @click="resetField()"
            >
              초기화
            </v-btn>
          </v-container>
        </form>
      </v-card>
    </v-sheet></v-container
  >
</template>

<style scoped>
.write-btn {
  width: 48%;
}

.reset-btn {
  width: 48%;
}
</style>
