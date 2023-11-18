import axios from "axios";
import { httpStatusCode } from "./http-status";

const { VITE_VUE_API_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    withCredentials: true,
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  // Request 발생 시 적용할 내용.
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.patch["Content-Type"] = "application/json";
  instance.defaults.headers.delete["Content-Type"] = "application/json";

  return instance;
}

// function localAxios() {
//   const instance = axios.create({
//     withCredentials: true,
//     baseURL: VITE_VUE_API_URL,
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   });
//   // Request 발생 시 적용할 내용.
//   instance.defaults.headers.common["Authorization"] = "";
//   instance.defaults.headers.post["Content-Type"] = "application/json";
//   instance.defaults.headers.patch["Content-Type"] = "application/json";
//   instance.defaults.headers.delete["Content-Type"] = "application/json";

//   return instance;
// }

function tokenAxios() {
  const instance = axios.create({});

  return instance;
}

export { localAxios, tokenAxios };
