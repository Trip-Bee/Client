<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {},
});

const title = useField("title");
const content = useField("content");

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
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
          >QnA 작성</v-card-title
        >

        <form @submit.prevent="submit">
          <div class="mt-8">
            <v-text-field
              v-model="title.value.value"
              :counter="30"
              label="Title"
              required
              variant="solo"
            ></v-text-field>

            <v-textarea
              v-model="content.value.value"
              label="Content"
              variant="solo"
              required
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
              type="submit"
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
      <!-- <v-container>
        <form @submit.prevent="submit">
          <v-text-field
            v-model="title.value.value"
            :counter="30"
            label="Title"
            required
          ></v-text-field>

          <v-textarea
            clearable
            label="Content"
            variant="solo"
            required
          ></v-textarea>

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
        </form>
      </v-container> -->
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
