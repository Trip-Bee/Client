<script setup>
import { ref } from "vue";
import { useMemberStore } from "../../../stores/member";
import { storeToRefs } from "pinia";
import router from "../../../router";

const memberStore = useMemberStore();
const { userLogout } = memberStore;
const { userInfo } = storeToRefs(memberStore);

const items = ref([
  { icon: `$account`, value: "mypage", title: "MyPage", routeName: "" },
  {
    icon: `$logout`,
    value: "logout",
    title: "로그아웃",
    routeName: "",
  },
]);

const user = ref({
  nickname: "nickname",
  email: "test@ssafy.com",
});

const logout = async () => {
  console.log("로그아웃!!!");
  await userLogout();
  alert("로그아웃되었습니다.");
  router.push("/");
};
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props">
        <v-img
          src="../../src/assets/img/profile.png"
          alt="logo"
          :width="37"
        ></v-img>
      </v-btn>
    </template>
    <v-card class="mx-auto" width="256">
      <v-layout>
        <v-navigation-drawer permanent absolute>
          <v-list>
            <v-list-item
              prepend-avatar="/src/assets/img/profile.png"
              :title="userInfo.nickname"
              :subtitle="userInfo.email"
            >
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list :lines="false" density="compact" nav>
            <v-list-item
              color="primary"
              @click="
                $router.push({
                  name: 'user-mypage',
                })
              "
            >
              <template v-slot:prepend>
                <v-icon icon="$account"></v-icon>
              </template>
              <v-list-item-title>MyPage</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" @click.prevent="logout()">
              <template v-slot:prepend>
                <v-icon icon="$logout"></v-icon>
              </template>
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 153px"></v-main>
      </v-layout>
    </v-card>
  </v-menu>
</template>
<style scoped></style>
