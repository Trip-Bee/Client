import { localAxios } from "@/util/http-commons";
import { useCookies } from "vue3-cookies";

const local = localAxios();
const { cookies } = useCookies();

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
  // 특정 조건을 확인하고 그에 따라 헤더를 동적으로 결정
  // const shouldAddCustomHeader = true; // 특정 조건에 따라 수정
  // const customHeaderValue = "your-custom-value";

  // const headers = {};

  // if (shouldAddCustomHeader) {
  //   headers["Custom-Header"] = customHeaderValue;
  // }

  const token = cookies.get("accessToken");
  const accessToken = token === null ? null : `Bearer ${token}`;
  console.log("search accessToken", accessToken);
  local.defaults.headers["Authorization"] = accessToken;
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

function detailSpot(param, success, fail) {
  console.log(param);
  local.get(`/spot/${param.id}`).then(success).catch(fail);
}

function top10Spot(param, success, fail) {
  local.get(`/spot/top10`).then(success).catch(fail);
}

export {
  getSidoList,
  getGugunList,
  getSpotTypList,
  search,
  detailSpot,
  top10Spot,
};
