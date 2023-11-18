<script setup>
import { ref } from "vue";
import { useMemberStore } from "../../../stores/member";
import { storeToRefs } from "pinia";
import router from "../../../router";

const memberStore = useMemberStore();
const { userLogout } = memberStore;
const { isAuthenticated } = storeToRefs(memberStore);

console.log("profile " + isAuthenticated.value);

const items = ref([
  { icon: `$account`, value: "mypage", name: "MyPage" },
  { icon: `$logout`, value: "logout", name: "로그아웃" },
]);

const user = ref({
  nickname: "nickname",
  email: "test@ssafy.com",
});

const logout = async () => {
  console.log("로그아웃!!!");
  await userLogout();
  changeMenuState();

  // initMenu(isAuthentciated.value);

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
              :title="user.nickname"
              :subtitle="user.email"
            >
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list :lines="false" density="compact" nav>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item.value"
              color="primary"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 153px"></v-main>
      </v-layout>
    </v-card>
  </v-menu>
</template>
<style scoped></style>
