<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/member';
import { useMenuStore } from '@/stores/menu';

const router = useRouter();
const memberStore = useMemberStore();
const menuStore = useMenuStore();
const { isLogin, isLoginError, isValidToken } = storeToRefs(memberStore);
const { userLogin } = memberStore;
const { changeMenuState } = menuStore;

const loginUser = ref({
    email: '',
    password: '',
});

const login = async () => {
    console.log('login ing!!!! !!!');
    console.log(loginUser.value);
    await userLogin(loginUser.value);
    // let
    // changeMenuState();
  // let token = sessionStorage.getItem('accessToken');
    let token = localStorage.getItem("accessToken");
    console.log('access token : ', token);
    console.log('isLogin: ', isLogin);

    if (isLogin) {
      console.log('로그인 성공');
      changeMenuState();
    }

    router.push('/home');
};
</script>

<template>
    <div class="container pt-5 pb-5">
        <div class="w-50 m-auto border mt-5 mb-5">
            <div class="container text-center pb-3 mt-5 mb-3 w-25 border-bottom border-4">
                <div class="fs-2 fw-semibold">로그인</div>
            </div>

            <div class="w-75 m-auto">
                <form>
                    <div class="mb-3">
                        <label class="form-label" for="login-email">이메일</label>
                        <input
                            class="form-control"
                            type="text"
                            id="login-email"
                            v-model="loginUser.email"
                            placeholder="이메일 입력"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="login-password">비밀번호</label>
                        <input
                            class="form-control"
                            type="password"
                            id="login-password"
                            v-model="loginUser.password"
                            @keyup.enter="login"
                            placeholder="비밀번호 입력"
                        />
                    </div>
                    <div class="d-flex justify-content-center mb-4">
                        <button class="btn col-4 text-secondary" type="button">
                            비밀번호 찾기
                        </button>
                    </div>
                    <div class="mb-5">
                        <!-- <button id="login" class="btn w-100 btn-secondary" type="submit">로그인</button> -->
                        <button id="login" class="btn w-100 btn-secondary" @click.prevent="login">
                            로그인
                        </button>
                        <!-- 회원가입 버튼 추가? -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
