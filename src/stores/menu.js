import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  // isAuthenticated 가져와서 show에 넣기?
  const menuList = ref([
    { name: "회원가입", show: true, routeName: "user-signup" },
    { name: "로그인", show: true, routeName: "user-login" },
    { name: "마이페이지", show: false, routeName: "user-mypage" },
    { name: "로그아웃", show: false, routeName: "user-logout" },
  ]);

  const userItems = ref([
    { value: "login", title: "로그인", routeName: "user-login", show: true },
    {
      value: "signup",
      title: "회원가입",
      routeName: "user-signup",
      show: true,
    },
  ]);

  const changeMenuState = () => {
    userItems.value = userItems.value.map((item) => ({
      ...item,
      show: !item.show,
    }));
  };

  const initMenu = (isAuthenticated) => {
    // menuList.value.forEach((item) => {
    //   if (item.routeName === "user-login" || item.routeName === "user-signup") {
    //     item.show = !isAuthenticated;
    //   } else if (
    //     item.routeName === "user-mypage" ||
    //     item.routeName === "user-logout"
    //   ) {
    //     item.show = isAuthenticated;
    //   }
    // });

    userItems.value.forEach((item) => {
      if (item.routeName === "user-login" || item.routeName === "user-signup") {
        item.show = !isAuthenticated;
      }
    });
  };

  return {
    userItems,
    menuList,

    changeMenuState,
    initMenu,
  };
});
