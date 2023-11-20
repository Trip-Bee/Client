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

function modifyPost(param, success, fail) {
  const token = getAccessToken();
  const writerId = getUserId();
  const body = {
    id: param.post.postId,
    writerId: writerId,
    title: param.post.title,
    content: param.post.content,
  };
  local
    .patch(
      `/${param.category}/posts/${param.post.postId}`,
      JSON.stringify(body),
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(success)
    .catch(fail);
}

function detailPost(param, success, fail) {
  local
    .get(`/${param.category}/posts/${param.postId}`)
    .then(success)
    .catch(fail);
}

function deletePost(param, success, fail) {
  const token = getAccessToken();
  const writerId = getUserId();
  local
    .delete(`/${param.category}/posts/${param.postId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then(success)
    .catch(fail);
}

export { listPost, writePost, modifyPost, detailPost, deletePost };
