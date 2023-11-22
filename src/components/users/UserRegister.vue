<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    nickname(value) {
      if (value?.length > 0) return true;
      return "닉네임을 입력하세요.";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return "이메일을 입력하세요.";
    },
    password(value) {
      if (value?.length > 0) return true;
      return "비밀번호를 입력하세요.";
    },
    passwordCheck(value) {
      if (value?.length > 0) {
        return true;
      }
      return "비밀번호 확인을 입력하세요.";
    },
    passwordCheck(value) {
      if (password.value.value == value?.value) {
        return true;
      } else {
        return "비밀번호가 같지 않습니다.";
      }
    },
  },
});

const submit = handleSubmit(() => {
  signup();
});

const router = useRouter();
const memberStore = useMemberStore();
const { isSignup } = storeToRefs(memberStore);
const { userSignup } = memberStore;
const signupUser = ref({
  nickname: "",
  email: "",
  password: "",
  passwordCheck: "",
});

const visible = ref(false);

const nickname = useField("nickname");
const email = useField("email");
const password = useField("password");
const passwordCheck = useField("passwordCheck");

const signup = async () => {
  signupUser.value.nickname = nickname.value.value;
  signupUser.value.email = email.value.value;
  signupUser.value.password = password.value.value;
  signupUser.value.passwordCheck = passwordCheck.value.value;

  // signup.password === signup.passwordCheck
  let user = signupUser.value;

  // password, passwordCheck 같은지 확인
  // email, nickname, password 모두 입력했는지 확인
  //   if (user.password != user.passwordCheck) {
  // // alert 창?
  //     return;
  //   }

  await userSignup({
    nickname: user.nickname,
    email: user.email,
    password: user.password,
  });

  console.log("signup", isSignup.value);

  if (isSignup.value) {
    alert("회원가입을 성공하였습니다.");
    router.push({ name: "main" });
  } else {
    alert("회원가입을 실패하였습니다.");
  }
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
          >회원가입</v-card-title
        >

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          닉네임
        </div>

        <v-text-field
          v-model="nickname.value.value"
          :error-messages="nickname.errorMessage.value"
          density="compact"
          placeholder="Nickname"
          prepend-inner-icon="$card"
          variant="solo"
          clearable
        ></v-text-field>

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
          clearable
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호
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
          clearable
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호 확인
        </div>

        <v-text-field
          v-model="passwordCheck.value.value"
          :error-messages="passwordCheck.errorMessage.value"
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
          clearable
        ></v-text-field>
        <v-container class="pa-0 d-flex justify-space-between">
          <v-btn
            class="join-btn mt-4 mb-16 font-weight-bold"
            color="#424242"
            variant="elevated"
            @click.prevent="submit()"
          >
            회원가입
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
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.join-btn {
  width: 48%;
}

.reset-btn {
  width: 48%;
}
</style>
