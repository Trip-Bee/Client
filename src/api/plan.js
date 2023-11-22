import { localAxios, simpleAxios } from "@/util/http-commons";
import { useMemberStore } from "../stores/member";

const local = localAxios();
const simple = simpleAxios();
// const memberStore = useMemberStore();
// const { getAccessToken, getUserId } = memberStore;

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

export { listPlan, listVehicle };
