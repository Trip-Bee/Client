import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from 'jwt-decode';

import { userConfirm } from "@/api/user";
import { httpStatusCode } from "../util/http-status";

export const useMemberStore = defineStore("memberStore", () => {
    const router = useRouter();

    const userLogin = async (loginUser) => {
        await userConfirm(
            loginUser,
            (response) => {
                // 성공했을 때
                if (response.status === httpStatusCode.OK) {
                    let { data } = response;
                    console.log(data);
                }

                // if 상태, 반환값 code 같은거 확인해서 
                // token있는 경우에는 token을 가져와서 
                // 저장소에 저장
                
                // else 로그인 실패
            },
            (error) => {
                // 예외 발생
                console.log(error);
            }
        )
    };

    return {
        userLogin
    };
});