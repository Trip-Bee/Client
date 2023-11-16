import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
    console.log("param", param);
    await local.post(`/auth/login`, param).then(success).catch(fail);
    console.log("userConfirm ok");
}

export { userConfirm };