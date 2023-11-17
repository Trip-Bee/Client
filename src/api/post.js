import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listPost(param, success, fail) {
  local.get(`/${param}/posts`).then(success).catch(fail);
}
export { listPost };
