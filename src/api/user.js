import { localAxios } from "../util/http-commons";
import { useCookies } from "vue3-cookies";
import { useMemberStore } from "../stores/member";

const { cookies } = useCookies();

const local = localAxios();

async function findById(userId, success, fail) {
  const memberStore = useMemberStore();
  const { getAccessToken } = memberStore;
  console.log("enter findById");
  console.log("findById accessToken", cookies.get("accessToken"));
  local.defaults.headers["Authorization"] = getAccessToken();
  await local.get(`/users/${userId}`).then(success).catch(fail);
  console.log("success findById");
}

export { findById };
