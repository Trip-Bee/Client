<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { writePost } from "../../api/post.js";

const router = useRouter();

const { handleSubmit, handleReset } = useForm({
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

const submit = handleSubmit((values) => {
  const param = { category: "board", post: values };
  writePost(
    param,
    ({ data }) => {
      router.replace({ name: "board-list" });
    },
    (error) => {
      console.log(error);
    }
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
        class="mx-auto pa-16 pb-3 w-75 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >Board 작성</v-card-title
        >

        <form @submit.prevent="submit">
          <div class="mt-8">
            <v-text-field
              v-model="title.value.value"
              :error-messages="title.errorMessage.value"
              :counter="30"
              label="Title"
              variant="solo"
            ></v-text-field>

            <v-textarea
              v-model="content.value.value"
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
              @click="handleReset"
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
