import { localAxios } from "@/util/http-commons";

const local = localAxios();

function getSidoList(param, success, fail) {
  local.get(`/area/sido`).then(success).catch(fail);
}

function getGugunList(param, success, fail) {
  local
    .get(`/area/gugun`, {
      params: {
        sidoCode: param.sidoCode,
      },
    })
    .then(success)
    .catch(fail);
}

function getSpotTypList(param, success, fail) {
  local.get(`/spot/type`).then(success).catch(fail);
}

function search(param, success, fail) {
  local
    .get(`/spot`, {
      params: {
        page: param.page,
        size: param.size,
        sidoCode: param.sidoCode,
        gugunCode: param.gugunCode,
        typeId: param.typeId,
        query: param.query,
      },
    })
    .then(success)
    .catch(fail);
}

export { getSidoList, getGugunList, getSpotTypList, search };
