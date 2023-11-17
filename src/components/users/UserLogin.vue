<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

const router = useRouter();
const memberStore = useMemberStore();
const menuStore = useMenuStore();
const { isLogin, isLoginError, isValidToken } = storeToRefs(memberStore);
const { userLogin } = memberStore;
const { changeMenuState } = menuStore;

const loginUser = ref({
  email: "",
  password: "",
});

const login = async () => {
  console.log("login ing!!!! !!!");
  console.log(loginUser.value);
  await userLogin(loginUser.value);
  // let
  // changeMenuState();
  // let token = sessionStorage.getItem('accessToken');
  let token = localStorage.getItem("accessToken");
  console.log("access token : ", token);
  console.log("isLogin: ", isLogin);

  if (isLogin) {
    console.log("로그인 성공");
    changeMenuState();
  }

  router.push("/home");
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
        class="mx-auto pa-16 pb-3 w-50 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >로그인</v-card-title
        >

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          이메일
        </div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="$email"
          variant="solo"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            비밀번호 찾기</a
          >
        </div>

        <v-text-field
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
        >
          로그인
        </v-btn>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
