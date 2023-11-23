<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { sendEmail } from "@/api/user.js";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

const route = useRoute();
const router = useRouter();

const emailInput = ref({
  email: "",
});

const handlePasswordMail = async () => {
  // email 전송
  sendEmail(
    emailInput.value,
    (response) => {
      // 로그인 페이지로 이동
      router.push({ name: "user-login" });
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
      class="d-flex flex-wrap justify-center pt-6 pb-6"
      :elevation="2"
      border
      rounded
    >
      <v-card
        class="mx-auto pa-16 pb-3 w-50 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >가입메일</v-card-title
        >

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          이메일
        </div>

        <v-text-field
          v-model="emailInput.email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="$email"
          variant="solo"
        ></v-text-field>

        <v-btn
          block
          class="mt-4 mb-16 font-weight-bold"
          color="#424242"
          size="large"
          variant="elevated"
          @click.prevent="handlePasswordMail"
        >
          입력
        </v-btn>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
