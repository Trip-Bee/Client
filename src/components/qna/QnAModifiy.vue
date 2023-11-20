<script setup>
import { ref, onBeforeMount } from "vue";
import { useField, useForm } from "vee-validate";
import { detailPost, deletePost, modifyPost } from "../../api/post.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    title(value) {
      if (value?.length > 0) return true;

      return "Title을 입력하세요.";
    },
    content(value) {
      if (value?.length > 0) return true;

      return "Content를 입력하세요.";
    },
  },
});

const title = useField("title");
const content = useField("content");
console.log(title.value);

const submit = handleSubmit((values) => {
  console.log(values.value);
  const post = {
    postId: route.params.id,
    title: values.value.title,
    content: values.value.content,
  };
  const param = { category: "qna", post: post };
  modifyPost(
    param,
    ({ data }) => {
      router.replace({ name: "qna-list" });
    },
    (error) => {
      console.log(error);
    }
  );
});

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
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet class="d-flex flex-wrap justify-center pt-8 pb-14" :elevation="2" border rounded>
      <v-card class="mx-auto pa-16 pb-3 w-75 mt-14 mb-16" elevation="2" rounded="md">
        <v-card-title class="text-center text-h5 font-weight-bold">QnA 작성</v-card-title>

        <form @submit.prevent="submit">
          <div class="mt-8">
            <v-text-field
              v-model="qna.title"
              :error-messages="title.errorMessage.value"
              :counter="30"
              label="Title"
              variant="solo"
              :value="'[QnA] ' + qna.title"
            ></v-text-field>
            <!-- v-model="title.value.value" -->
            <!-- :value="'[QnA] ' + qna.title" -->

            <!-- v-model="content.value.value" -->
            <!-- :value="qna.content" -->
            <v-textarea
              v-model="qna.content"
              :error-messages="content.errorMessage.value"
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
              @click="submit()"
            >
              작성
            </v-btn>

            <v-btn
              class="reset-btn mt-4 mb-16 font-weight-bold"
              color="#424242"
              variant="elevated"
              @click="$router.push({ name: 'QnA' })"
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
