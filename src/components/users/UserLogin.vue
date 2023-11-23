<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";
import { useCookies } from "vue3-cookies";
import { useField, useForm } from "vee-validate";

const { cookies } = useCookies();
const router = useRouter();
const memberStore = useMemberStore();
const menuStore = useMenuStore();
// const tokenStore = useTokenStore();
const { isAuthenticated } = storeToRefs(memberStore);
const { getAccessToken } = memberStore;
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = menuStore;
// const { getAccessToken } = tokenStore;

const loginUser = ref({
  email: "",
  password: "",
});

const visible = ref(false);

const login = async () => {
  console.log(`email ${email.value.value} password ${password.value.value}`);
  console.log("loginUser", loginUser.value);

  loginUser.value.email = email.value.value;
  loginUser.value.password = password.value.value;

  await userLogin(loginUser.value);
  //   let token = cookies.get("accessToken");
  let token = getAccessToken();
  console.log("after userLogin token", token);
  console.log("isAuthentciated", isAuthenticated.value);

  if (isAuthenticated.value) {
    await getUserInfo(token);
    changeMenuState();
    router.push("/");
  } else {
    alert("로그인을 실패하였습니다.");
  }
};

const handlePasswordEmail = async () => {
  console.log("비밀번호 변경 email 전송");

  // 이메일 입력받는 페이지로 이동
  router.push({ name: "email" });
};

const { handleSubmit } = useForm({
  validationSchema: {
    email(value) {
      if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return "이메일을 입력하세요.";
    },
    password(value) {
      if (value?.length > 0) return true;
      return "비밀번호를 입력하세요.";
    },
  },
});
const email = useField("email");
const password = useField("password");

const submit = handleSubmit(() => {
  login();
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
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="$email"
          variant="solo"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호
          <v-hover>
            <a
              class="text-caption text-decoration-none text-blue password-link"
              @click.prevent="handlePasswordEmail"
              rel="noopener noreferrer"
              target="_blank"
            >
              비밀번호 찾기</a
            >
          </v-hover>
        </div>

        <v-text-field
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-container class="pa-0 d-flex justify-space-between">
          <v-btn
            class="login-btn mt-4 mb-16 font-weight-bold"
            color="#424242"
            variant="elevated"
            @click.prevent="submit()"
          >
            로그인
          </v-btn>

          <v-btn
            class="join-btn mt-4 mb-16 font-weight-bold"
            color="#424242"
            variant="elevated"
            @click.prevent="router.push({ name: 'user-signup' })"
          >
            회원가입
          </v-btn>
        </v-container>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.password-link {
  cursor: pointer;
}

.join-btn {
  width: 48%;
}

.login-btn {
  width: 48%;
}
</style>
