import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";
import { useMemberStore } from "../stores/member";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
      beforeEnter: (to, from, next) => {
        const memberStore = useMemberStore();

        const { isAuthenticated } = storeToRefs(memberStore);

        if (!isAuthenticated) {
          next("/user/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/email",
      name: "email",
      component: () => import("@/components/users/EmailInput.vue"),
    },
    {
      path: "/password",
      name: "password",
      component: () => import("@/components/users/UserPassword.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/TheUserView.vue"),
      children: [
        {
          path: "login",
          name: "user-login",
          component: () => import("@/components/users/UserLogin.vue"),
        },
        {
          path: "signup",
          name: "user-signup",
          component: () => import("@/components/users/UserRegister.vue"),
        },
        {
          path: "mypage",
          name: "user-mypage",
          component: () => import("@/components/users/UserMyPage.vue"),
        },
      ],
    },
    {
      path: "/qna",
      name: "QnA",
      component: () => import("@/views/TheQnAView.vue"),
      redirect: { name: "qna-list" },
      children: [
        {
          path: "list",
          name: "qna-list",
          component: () => import("@/components/qna/QnAList.vue"),
        },
        {
          path: "view/:id",
          name: "qna-view",
          component: () => import("@/components/qna/QnADetail.vue"),
        },
        {
          path: "write",
          name: "qna-write",
          component: () => import("@/components/qna/QnAWrite.vue"),
        },
        {
          path: "modify/:id",
          name: "qna-modify",
          component: () => import("@/components/qna/QnAModifiy.vue"),
        },
      ],
    },
    {
      path: "/spot",
      name: "spot",
      component: () => import("@/views/TheSpotView.vue"),
      redirect: { name: "spot-list" },
      children: [
        {
          path: "list",
          name: "spot-list",
          component: () => import("@/components/spot/SpotList.vue"),
        },
        {
          path: "view/:id",
          name: "spot-view",
          component: () => import("@/components/spot/SpotDetail.vue"),
        },
      ],
    },
    {
      path: "/plan",
      name: "plan",
      component: () => import("@/views/ThePlanView.vue"),
      redirect: { name: "plan-list" },
      children: [
        {
          path: "list",
          name: "plan-list",
          component: () => import("@/components/plan/PlanList.vue"),
        },
        {
          path: "view/:id",
          name: "plan-view",
          component: () => import("@/components/plan/PlanDetail.vue"),
        },
        {
          path: "write",
          name: "plan-write",
          component: () => import("@/components/plan/PlanWrite.vue"),
        },
      ],
    },
  ],
});

export default router;
