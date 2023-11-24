import { localAxios } from "@/util/http-commons";
import { useMemberStore } from "../stores/member";

const local = localAxios();
const memberStore = useMemberStore();
const { getAccessToken, getUserId } = memberStore;

function listComment(param, success, fail) {
  local
    .get(`/${param.category}}/comments`, { params: { postId: param.postId } })
    .then(success)
    .catch(fail);
}

function writeComment(param, success, fail) {
  console.log(param);
  const token = getAccessToken();
  const writerId = getUserId();
  const body = {
    writerId: writerId,
    postId: param.postId,
    content: param.content,
  };
  local
    .post(`/${param.category}/comments`, JSON.stringify(body), {
      headers: {
        Authorization: token,
      },
    })
    .then(success)
    .catch(fail);
}

function modifyComment() {}

function deleteComment(param, success, fail) {
  const token = getAccessToken();
  local
    .delete(`/${param.category}/comments/${param.commentId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then(success)
    .catch(fail);
}

export { listComment, writeComment, deleteComment };
