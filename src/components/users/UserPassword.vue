<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { changePassword } from "@/api/user.js";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

const route = useRoute();
const router = useRouter();

const { token } = route.query;

// onMounted(async() => {
//     // await router.isReady;
//     // 쿼리로 넘어오는 토큰
//     const { token } = route.query;

//     console.log(token);

//     // if (!token) {
//     //     router.replace({ name: 'main' });
//     // }
// });

const passwordInput = ref({
  password: "",
  passwordCheck: "",
});

const handlePasswordChange = async () => {
  // 전달받은 토큰을 이용하여 passwordChange 호출 >> 서버에 보낼 비밀번호 변경 api >> 토큰에 Bearer 주의
  const accessToken = `Bearer ${token}`;

  console.log("pw 변경 토큰", accessToken);
  console.log("입력한 pw", passwordInput.value.password);

  await changePassword(
    {
      accessToken: accessToken,
      password: passwordInput.value.password,
    },
    (response) => {
      console.log("pw 변경 완료!!!", response);
      router.replace({ name: "user-login" });
    },
    (error) => {
      console.log(error);
      router.replace({ name: "main" });
    }
  );

  // if (isSuccessChangePassword) {
  //     router.replace({ name: 'user-login' });
  // }

  // router.replace({ name: 'main' });
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
          >비밀번호 변경</v-card-title
        >

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호
        </div>

        <v-text-field
          v-model="passwordInput.password"
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호 확인
        </div>

        <v-text-field
          v-model="passwordInput.passwordCheck"
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          block
          class="mt-4 mb-16 font-weight-bold"
          color="#424242"
          size="large"
          variant="elevated"
          @click.prevent="handlePasswordChange"
        >
          비밀번호 변경
        </v-btn>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
