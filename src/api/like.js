import { localAxios } from "@/util/http-commons";
import { useMemberStore } from "../stores/member";

const local = localAxios();

function addOrdeleteLike(param, success, fail) {
  const memberStore = useMemberStore();
  const { getAccessToken, getUserId } = memberStore;
  const token = getAccessToken();
  const userId = getUserId();
  const body = {
    userId: userId,
    spotId: param.spotId,
  };
  local
    .post(`/likes`, JSON.stringify(body), {
      headers: {
        Authorization: token,
      },
    })
    .then(success)
    .catch(fail);
}

function countLike(param, success, fail) {
  local
    .get(`likes`, {
      params: {
        spotId: param.spotId,
      },
    })
    .then(success)
    .catch(fail);
}

export { addOrdeleteLike, countLike };
