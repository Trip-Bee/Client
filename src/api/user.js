import { localAxios, simpleAxios } from "../util/http-commons";
import { useCookies } from "vue3-cookies";
import { useMemberStore } from "../stores/member";

const { cookies } = useCookies();

const local = localAxios();
const simple = simpleAxios();

async function findById(userId, success, fail) {
  const memberStore = useMemberStore();
  const { getAccessToken } = memberStore;
  console.log("enter findById");
  console.log("findById accessToken", cookies.get("accessToken"));
  local.defaults.headers["Authorization"] = getAccessToken();
  await local.get(`/users/${userId}`).then(success).catch(fail);
  console.log("success findById");
}

async function userUpdate(param, success, fail) {
  console.log("param", param);
  local.patch(`/users/${param.id}`, JSON.stringify(param)).then(success).catch(fail);
}

async function sendEmail(email, success, fail) {
  console.log("email", email);
  simple.post(`/mail/password`, JSON.stringify(email)).then(success).catch(fail);
}

async function changePassword(param, success, fail) {
  // param에서 토큰, 비밀번호 분리해서 헤더, DTO 따로 전달
  console.log("param?", param);
  const password = param.password;
  const accessToken = param.accessToken;
  await local
    .patch(`/users/password`, JSON.stringify(password), {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(success)
    .catch(fail);
}

export { findById, sendEmail, changePassword, userUpdate };
