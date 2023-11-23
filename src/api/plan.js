import { localAxios, simpleAxios } from "@/util/http-commons";
import { useMemberStore } from "@/stores/member";

const local = localAxios();
const simple = simpleAxios();

function listPlan(param, success, fail) {
  simple
    .get(`/plans`, {
      params: param,
    })
    .then(success)
    .catch(fail);
}

function listVehicle(param, success, fail) {
  simple.get(`/vehicles`).then(success).catch(fail);
}

function addPlans(param, success, fail) {
  const memberStore = useMemberStore();
  const { getAccessToken } = memberStore;
  const accessToken = getAccessToken();

  local.defaults.headers["Authorization"] = accessToken;
  local.post(`/plans`, JSON.stringify(param)).then(success).catch(fail);
}

function detailPlan(param, success, fail) {
  local.get(`/plans/${param.planId}`).then(success).catch(fail);
}

export { listPlan, listVehicle, addPlans, detailPlan };
