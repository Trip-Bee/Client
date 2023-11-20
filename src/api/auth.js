import { localAxios, simpleAxios } from "@/util/http-commons";
import axios from "axios";
const { VITE_VUE_API_URL } = import.meta.env;
const local = localAxios();
const simple = simpleAxios();

async function userConfirm(param, success, fail) {
  console.log("param", param);
  const instance = axios.create({
    withCredentials: true,
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  await instance.post("/auth/login", param).then(success).catch(fail);

  console.log("userConfirm ok");
}

async function signupApi(signupUser, success, fail) {
  console.log("signup api", signupUser);
  await simple.post("/auth/signup", signupUser).then(success).catch(fail);
  console.log("signup ok");
}

async function tokenRegeneration(token, success, fail) {
  console.log("token", token);
  await local.post(`/auth/reissue`, token).then(success).catch(fail);
  console.log("token reissue ok");
}

async function logout(token, success, fail) {
  console.log(token);
  local.defaults.headers["Authorization"] = token;
  await local.post(`/auth/logout`).then(success).catch(fail);
}

export { userConfirm, tokenRegeneration, logout, signupApi };
