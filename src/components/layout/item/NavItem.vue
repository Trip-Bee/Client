<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "../../../stores/member";
import { useMenuStore } from "../../../stores/menu";

const memberStore = useMemberStore();
const { isAuthenticated } = storeToRefs(memberStore);

const menuStore = useMenuStore();
const { userItems } = storeToRefs(menuStore);
const { initMenu } = menuStore;

watch(isAuthenticated, (newValue, oldValue) => {
  initMenu();
});

const navItems = ref([
  { value: "spot", title: "여행지", routeName: "" },
  { value: "plan", title: "플래너", routeName: "" },
  { value: "board", title: "게시판", routeName: "" },
  { value: "notice", title: "공지사항", routeName: "" },
  { value: "qna", title: "QnA", routeName: "qna-list" },
]);
</script>

<template>
  <div class="nav mt-6 elevation-2 rounded mb-6">
    <v-row>
      <v-col class="d-flex justify-space-between">
        <div>
          <router-link
            :to="{ name: navItems[i - 1].routeName }"
            v-for="i in 5"
            tag="v-btn"
            ><v-btn
              class="font-weight-black"
              variant="plain"
              rounded="lg"
              color="black"
              >{{ navItems[i - 1].title }}</v-btn
            ></router-link
          >
        </div>
        <div>
          <template v-for="item in userItems">
            <template v-if="item.show">
              <router-link :to="{ name: item.routeName }" tag="v-btn"
                ><v-btn
                  class="font-weight-black"
                  variant="plain"
                  rounded="lg"
                  color="black"
                  >{{ item.title }}</v-btn
                ></router-link
              >
            </template>
          </template>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
