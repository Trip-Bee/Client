import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";
import { useMemberStore } from "../stores/member";
import { storeToRefs } from "pinia";

import TheSpotView from "@/views/TheSpotView.vue";
import SpotList from "@/components/spot/SpotList.vue";
import SpotDetail from "@/components/spot/SpotDetail.vue";

import ThePlanView from "@/views/ThePlanView.vue";
import PlanList from "@/components/plan/PlanList.vue";
import PlanDetail from "@/components/plan/PlanDetail.vue";
import PlanWrite from "@/components/plan/PlanWrite.vue";

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
      path: "/notice",
      name: "notice",
      component: () => import("@/views/TheNoticeView.vue"),
      redirect: { name: "notice-list" },
      children: [
        {
          path: "list",
          name: "notice-list",
          component: () => import("@/components/notice/NoticeList.vue"),
        },
        {
          path: "view/:id",
          name: "notice-view",
          component: () => import("@/components/notice/NoticeDetail.vue"),
        },
        {
          path: "write",
          name: "notice-write",
          component: () => import("@/components/notice/NoticeWrite.vue"),
        },
        {
          path: "modify/:id",
          name: "notice-modify",
          component: () => import("@/components/notice/NoticeModify.vue"),
        },
      ],
    },
    {
      path: "/board",
      name: "board",
      component: () => import("@/views/TheBoardView.vue"),
      redirect: { name: "board-list" },
      children: [
        {
          path: "list",
          name: "board-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:id",
          name: "board-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "board-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:id",
          name: "board-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
    {
      path: "/spot",
      name: "spot",
      component: () => TheSpotView,
      redirect: { name: "spot-list" },
      children: [
        {
          path: "list",
          name: "spot-list",
          component: () => SpotList,
        },
        {
          path: "view/:id",
          name: "spot-view",
          component: () => SpotDetail,
        },
      ],
    },
    {
      path: "/plan",
      name: "plan",
      component: () => ThePlanView,
      redirect: { name: "plan-list" },
      children: [
        {
          path: "list",
          name: "plan-list",
          component: () => PlanList,
        },
        {
          path: "view/:id",
          name: "plan-view",
          component: () => PlanDetail,
        },
        {
          path: "write",
          name: "plan-write",
          component: () => PlanWrite,
        },
      ],
    },
  ],
});

export default router;
