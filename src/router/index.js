import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";
import { useMemberStore } from "../stores/member";
import { useBreadcrumbsStore } from "../stores/breadcrumbs";
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
      meta: {
        breadcrumb: "Home",
      },
    },
    {
      path: "/email",
      name: "email",
      component: () => import("@/components/users/EmailInput.vue"),
      meta: {
        breadcrumb: "Email",
      },
    },
    {
      path: "/password",
      name: "password",
      component: () => import("@/components/users/UserPassword.vue"),
      meta: {
        breadcrumb: "Password",
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/TheUserView.vue"),
      meta: {
        breadcrumb: "User",
      },
      children: [
        {
          path: "login",
          name: "user-login",
          component: () => import("@/components/users/UserLogin.vue"),
          meta: {
            breadcrumb: "Login",
          },
        },
        {
          path: "signup",
          name: "user-signup",
          component: () => import("@/components/users/UserRegister.vue"),
          meta: {
            breadcrumb: "SignUp",
          },
        },
        {
          path: "mypage",
          name: "user-mypage",
          component: () => import("@/components/users/UserMyPage.vue"),
          meta: {
            breadcrumb: "MyPage",
          },
        },
      ],
    },
    {
      path: "/qna",
      name: "QnA",
      component: () => import("@/views/TheQnAView.vue"),
      meta: {
        breadcrumb: "QnA",
      },
      redirect: { name: "qna-list" },
      children: [
        {
          path: "list",
          name: "qna-list",
          component: () => import("@/components/qna/QnAList.vue"),
          meta: {
            breadcrumb: "List",
          },
        },
        {
          path: "view/:id",
          name: "qna-view",
          component: () => import("@/components/qna/QnADetail.vue"),
          meta: {
            breadcrumb: "View",
          },
        },
        {
          path: "write",
          name: "qna-write",
          component: () => import("@/components/qna/QnAWrite.vue"),
          meta: {
            breadcrumb: "Write",
          },
        },
        {
          path: "modify/:id",
          name: "qna-modify",
          component: () => import("@/components/qna/QnAModifiy.vue"),
          meta: {
            breadcrumb: "Modify",
          },
        },
      ],
    },
    {
      path: "/notice",
      name: "notice",
      component: () => import("@/views/TheNoticeView.vue"),
      meta: {
        breadcrumb: "Notice",
      },
      redirect: { name: "notice-list" },
      children: [
        {
          path: "list",
          name: "notice-list",
          component: () => import("@/components/notice/NoticeList.vue"),
          meta: {
            breadcrumb: "List",
          },
        },
        {
          path: "view/:id",
          name: "notice-view",
          component: () => import("@/components/notice/NoticeDetail.vue"),
          meta: {
            breadcrumb: "View",
          },
        },
        {
          path: "write",
          name: "notice-write",
          component: () => import("@/components/notice/NoticeWrite.vue"),
          meta: {
            breadcrumb: "Write",
          },
        },
        {
          path: "modify/:id",
          name: "notice-modify",
          component: () => import("@/components/notice/NoticeModify.vue"),
          meta: {
            breadcrumb: "Modify",
          },
        },
      ],
    },
    {
      path: "/board",
      name: "board",
      component: () => import("@/views/TheBoardView.vue"),
      meta: {
        breadcrumb: "Board",
      },
      redirect: { name: "board-list" },
      children: [
        {
          path: "list",
          name: "board-list",
          component: () => import("@/components/board/BoardList.vue"),
          meta: {
            breadcrumb: "List",
          },
        },
        {
          path: "view/:id",
          name: "board-view",
          component: () => import("@/components/board/BoardDetail.vue"),
          meta: {
            breadcrumb: "View",
          },
        },
        {
          path: "write",
          name: "board-write",
          component: () => import("@/components/board/BoardWrite.vue"),
          meta: {
            breadcrumb: "Write",
          },
        },
        {
          path: "modify/:id",
          name: "board-modify",
          component: () => import("@/components/board/BoardModify.vue"),
          meta: {
            breadcrumb: "Modify",
          },
        },
      ],
    },
    {
      path: "/spot",
      name: "spot",
      component: () => TheSpotView,
      meta: {
        breadcrumb: "Spot",
      },
      redirect: { name: "spot-list" },
      children: [
        {
          path: "list",
          name: "spot-list",
          component: () => SpotList,
          meta: {
            breadcrumb: "List",
          },
        },
        {
          path: "view/:id",
          name: "spot-view",
          component: () => SpotDetail,
          meta: {
            breadcrumb: "View",
          },
        },
      ],
    },
    {
      path: "/plan",
      name: "plan",
      component: () => ThePlanView,
      meta: {
        breadcrumb: "Plan",
      },
      redirect: { name: "plan-list" },
      children: [
        {
          path: "list",
          name: "plan-list",
          component: () => PlanList,
          meta: {
            breadcrumb: "List",
          },
        },
        {
          path: "view/:id",
          name: "plan-view",
          component: () => PlanDetail,
          meta: {
            breadcrumb: "View",
          },
        },
        {
          path: "write",
          name: "plan-write",
          component: () => PlanWrite,
          meta: {
            breadcrumb: "Write",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const breadcrumbsStore = useBreadcrumbsStore();
  const matchedRoutes = to.matched;
  const newBreadcrumbs = matchedRoutes.map((route) => route.meta.breadcrumb);

  // Update previous breadcrumbs before updating the current ones
  breadcrumbsStore.setPreviousBreadcrumbs(breadcrumbsStore.breadcrumbs);

  // Update the breadcrumbs in the store
  breadcrumbsStore.setBreadcrumbs(newBreadcrumbs);

  next();
});
export default router;
