import { localAxios } from "@/util/http-commons";
import { useMemberStore } from "../stores/member";

const local = localAxios();
const memberStore = useMemberStore();
const { getAccessToken, getUserId } = memberStore;

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

function writePost(param, success, fail) {
  const token = getAccessToken();
  const writerId = getUserId();
  const body = {
    title: param.post.title,
    content: param.post.content,
    writerId: writerId,
  };
  local
    .post(`/${param.category}/posts`, JSON.stringify(body), {
      headers: {
        Authorization: token,
      },
    })
    .then(success)
    .catch(fail);
}

export { listPost, writePost };
