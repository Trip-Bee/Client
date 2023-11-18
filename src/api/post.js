import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listPost(param, success, fail) {
  local
    .get(`/${param.category}/posts`, {
      params: {
        page: param.page,
        size: param.size,
        key: param.key,
        word: param.word,
      },
    })
    .then(success)
    .catch(fail);
}
export { listPost };
