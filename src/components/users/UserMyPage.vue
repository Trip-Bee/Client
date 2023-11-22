<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { userUpdate } from "@/api/user.js";

const router = useRouter();
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const { getUserId, getUserNickname, getAccessToken, getUserInfo } = memberStore;

onMounted(() => {
  const id = getUserId();
  updateUser.value.id = id;
  const token = getAccessToken();
  getUserInfo(token);

  updateUser.value.nickname = userInfo.value.nickname;
  updateUser.value.email = userInfo.value.email;
});

const click = ref(true);

const updateUser = ref({
  id: "",
  nickname: "",
  email: "",
  password: "",
  passwordCheck: "",
});

const handleUpdateUser = async () => {
  if (click.value) {
    click.value = false;
  } else {
    await userUpdate(
      {
        id: updateUser.value.id,
        nickname: updateUser.value.nickname,
        email: updateUser.value.email,
        password: updateUser.value.password,
      },
      async (response) => {
        console.log("변경 성공");
        const token = getAccessToken();
        await getUserInfo(token);
        alert("회원 정보가 변경되었습니다.");
      },
      (error) => {
        console.log(error);
      }
    );
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
          >마이페이지</v-card-title
        >

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          닉네임
        </div>

        <v-text-field
          v-model="updateUser.nickname"
          density="compact"
          placeholder="Nickname"
          prepend-inner-icon="$card"
          variant="solo"
          :readonly="click"
        ></v-text-field>

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          이메일
        </div>

        <v-text-field
          v-model="updateUser.email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="$email"
          variant="solo"
          :readonly="click"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호
        </div>

        <v-text-field
          v-model="updateUser.password"
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
          :readonly="click"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호 확인
        </div>

        <v-text-field
          v-model="updateUser.passwordCheck"
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
          :readonly="click"
        ></v-text-field>
        <v-container class="pa-0 d-flex justify-space-between">
          <v-btn
            class="join-btn mt-4 mb-16 font-weight-bold"
            color="#424242"
            variant="elevated"
            @click.prevent="handleUpdateUser"
          >
            수정
          </v-btn>

          <v-btn
            class="reset-btn mt-4 mb-16 font-weight-bold"
            color="#424242"
            variant="elevated"
            @click="
              $router.push({
                name: 'main',
              })
            "
          >
            홈으로
          </v-btn>
        </v-container>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
