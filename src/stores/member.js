import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

import { userConfirm } from '@/api/auth';
import { httpStatusCode } from '@/util/http-status';

export const useMemberStore = defineStore('memberStore', () => {
    const router = useRouter();

    const isLogin = ref(false);
    const isLoginError = ref(false);
    const user = ref(null);
    const isValidToken = ref(false);

    const userLogin = async (loginUser) => {
        console.log(loginUser)
        await userConfirm(
            loginUser,
            (response) => {
                console.log("response: ", response)
                // console.log("login ok!!!!", response.status);
                // console.log("login ok!!!!", httpStatusCode.CREATE);
                if (response.status === httpStatusCode.OK) {
                    let { token, userInfo } = response.data.dataBody;
                    // console.log("data", data);
                    console.log('response : ', response);
                    console.log('token : ', token);

                    // let accessToken = data['accessToken'];
                    // let refreshToken = data['refreshToken'];

                    let accessToken = token.accessToken;
                    let refreshToken = token.refreshToken;
                    user.value = userInfo;
                    
                    console.log('accessToken', accessToken);
                    console.log('refreshToken', refreshToken);
                    isLogin.value = true;
                    isLoginError.value = false;
                    isValidToken.value = true;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    // sessionStorage.setItem('accessToken', accessToken);
                    // sessionStorage.setItem('refreshToken', refreshToken);
                    // console.log('sessiontStorage에 담았다', isLogin.value);
                    console.log('localStorage 담았다', isLogin.value);
                } else {
                    console.log('로그인 실패했다');
                    isLogin.value = false;
                    isLoginError.value = true;
                    isValidToken.value = false;
                }
            },
            (error) => {
                console.error(error);
            }
            // loginUser,
            // (response) => {
            //     console.log(response);
            //     console.log("로그인 요청 성공", response.status);
            //     console.log("로그인 요청 성공", httpStatusCode.OK);
            //     // 성공했을 때
            //     if (response.status === httpStatusCode.OK) {
            //         console.log("성공 진입");
            //         // let { data } = response;
            //         console.log("data", data);
            //     } else {
            //         console.log("로그인 실패");
            //         isLogin.value = false;
            //         isLoginError.value = true;
            //         isValidToken.value = false;
            //     }

            //     // if 상태, 반환값 code 같은거 확인해서
            //     // token있는 경우에는 token을 가져와서
            //     // 저장소에 저장

            //     // else 로그인 실패
            // },
            // (error) => {
            //     // 예외 발생
            //     console.log(error);
            // }
        );
    };

    return {
        isLogin,
        isLoginError,
        user,
        isValidToken,
        userLogin,
    };
});
