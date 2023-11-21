import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "vue3-cookies";
import { userConfirm, logout, tokenRegeneration, signupApi } from "@/api/auth";
import { findById } from "@/api/user";
import { httpStatusCode } from "@/util/http-status";
import { useMenuStore } from "./menu";

const { cookies } = useCookies();

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter();
  const isSignup = ref(false);
  const isAuthenticated = ref(false);
  const isLoginError = ref(false);
  const userInfo = ref(null);
  const isValidToken = ref(false);

  const userSignup = async (signupUser) => {
    console.log("enter signup", signupUser);
    await signupApi(
      signupUser,
      (response) => {
        console.log(response);
        if (response.status === httpStatusCode.OK) {
          isSignup.value = true;
        } else {
          isSignup.value = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const userLogin = async (loginUser) => {
    console.log("enter userLogin", loginUser);
    await userConfirm(
      loginUser,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log("status ok", response);
          let accessToken = getAccessToken();
          let refreshToken = getRefreshToken();

          console.log("accessToken", accessToken);
          console.log("refreshToken", refreshToken);

          isAuthenticated.value = true;
          isLoginError.value = false;
          isValidToken.value = true;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const getAccessToken = () => {
    return "Bearer " + cookies.get("accessToken");
  };

  const getRefreshToken = () => {
    return cookies.get("refreshToken");
  };

  const isLogin = () => {
    const menuStore = useMenuStore();

    if (cookies.isKey("accessToken")) {
      isAuthenticated.value = true;
      const token = getAccessToken();
      getUserInfo(token);
    } else {
      isAuthenticated.value = false;
    }
    
    console.log("isAuthenticated", isAuthenticated.value);
    menuStore.initMenu(isAuthenticated.value);
  };

  const userLogout = async () => {
    console.log(getAccessToken);
    await logout(
      getAccessToken(),
      (response) => {
        if (response.status === httpStatusCode.OK) {
          cookies.remove("accessToken");
          cookies.remove("refreshToken");
        }
        isAuthenticated.value = false;
      },
      (error) => {
        console.error(error);
      }
    );
  };

  //   const userLogin = async (loginUser) => {
  //     console.log(loginUser);
  //     await userConfirm(
  //       loginUser,
  //       (response) => {
  //         console.log("response: ", response);
  //         if (response.status === httpStatusCode.OK) {
  //           let { accessToken, refreshToken } = response.data.dataBody;
  //           console.log("status 200 response : ", response);

  //           console.log("login response accessToken", accessToken);
  //           console.log("login response refreshToken", refreshToken);
  //           isLogin.value = true;
  //           isLoginError.value = false;
  //           isValidToken.value = true;
  //           sessionStorage.setItem("accessToken", "Bearer " + accessToken);
  //           sessionStorage.setItem("refreshToken", refreshToken);
  //           console.log("sessionStorage 담았다", isLogin.value);
  //         } else {
  //           console.log("로그인 실패했다");
  //           isLogin.value = false;
  //           isLoginError.value = true;
  //           isValidToken.value = false;
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   };

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token);
    console.log("2. decodeToken", decodeToken);
    console.log("decodeToken id", decodeToken.jti);
    await findById(
      decodeToken.jti,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          userInfo.value = response.data.dataBody;
          isAuthenticated.value = true;
          console.log("3. getUserInfo data >> ", response.data);
        } else {
          console.log("유저 정보 없음!!!!");
        }
      },
      async (error) => {
        console.error(
          "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
          error.response.status
        );
        isValidToken.value = false;

        await tokenRegenerate();
      }
    );
  };

  //   const getUserInfo = async (token) => {
  //     let decodeToken = jwtDecode(token);
  //     console.log("2. decodeToken", decodeToken);
  //     console.log("decodeToken id", decodeToken.jti);
  //     await findById(
  //       decodeToken.jti,
  //       (response) => {
  //         if (response.status === httpStatusCode.OK) {
  //           userInfo.value = response.data.dataBody;
  //           isLogin.value = true;
  //           console.log("3. getUserInfo data >> ", response.data);
  //         } else {
  //           console.log("유저 정보 없음!!!!");
  //         }
  //       },
  //       async (error) => {
  //         console.error(
  //           "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
  //           error.response.status
  //         );
  //         isValidToken.value = false;

  //         await tokenRegenerate();
  //       }
  //     );
  //   };

  //   const tokenRegenerate = async () => {
  //     await tokenRegeneration(
  //       JSON.stringify({
  //         accessToken: null,
  //         refreshToken: sessionStorage.getItem("refreshToken"),
  //       }),
  //       (response) => {
  //         if (response.status === httpStatusCode.OK) {
  //           let { accessToken, refreshToken } = response.data.dataBody;
  //           sessionStorage.setItem("accessToken", "Bearer " + accessToken);
  //           sessionStorage.setItem("refreshToken", refreshToken);
  //           isValidToken.value = true;
  //         }
  //       },
  //       async (error) => {
  //         console.error(error);
  //         sessionStorage.removeItem("accessToken");
  //         sessionStorage.removeItem("refreshToken");
  //         isLogin.value = false;
  //         userInfo.value = null;
  //         isValidToken.value = false;
  //         router.push({ name: "user-login" });
  //       }
  //     );
  //   };

  const tokenRegenerate = async () => {
    await tokenRegeneration(
      JSON.stringify({
        refreshToken: getRefreshToken(),
      }),
      (response) => {
        if (response.status === httpStatusCode.OK) {
          //   let { accessToken, refreshToken } = response.data.dataBody;
          console.log("reissued access ", getAccessToken());
          console.log("reissued refresh ", getRefreshToken());
          isValidToken.value = true;
        }
      },
      async (error) => {
        console.error(error);
        isAuthenticated.value = false;
        userInfo.value = null;
        isValidToken.value = false;
        router.push({ name: "user-login" });
      }
    );
  };

  //   const userLogout = async () => {
  //     let accessToken = sessionStorage.getItem("accessToken");
  //     console.log("logout accessToken", accessToken);
  //     await logout(
  //       accessToken,
  //       (response) => {
  //         if (response.status === httpStatusCode.OK) {
  //           isLogin.value = false;
  //           userInfo.value = null;
  //           isValidToken.value = false;
  //           sessionStorage.removeItem("accessToken");
  //           sessionStorage.removeItem("refreshToken");
  //         } else {
  //           console.error("유저 정보 없음!!!!");
  //           sessionStorage.removeItem("accessToken");
  //         }
  //       },
  //       async (error) => {
  //         console.log(error);
  //         sessionStorage.removeItem("accessToken");
  //         sessionStorage.removeItem("refreshToken");
  //       }
  //     );
  //   };

  const getUserId = () => {
    let decodeToken = jwtDecode(getAccessToken());
    return decodeToken.jti;
  };

  return {
    isAuthenticated,
    isLoginError,
    userInfo,
    isValidToken,
    isSignup,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    getAccessToken,
    getRefreshToken,
    isLogin,
    userLogout,
    userSignup,
    getUserId,
  };
});
