<script setup></script>

<template>
  <div class="container pt-5 pb-5">
    <div class="w-50 m-auto border mt-5 mb-5">
      <div class="container text-center pb-3 mt-5 mb-3 w-25 border-bottom border-4">
        <div class="fs-2 fw-semibold">회원가입</div>
      </div>

      <div class="w-75 m-auto">
        <form>
          <div class="mb-3">
            <label class="form-label" for="join-nickname">닉네임</label>
            <input class="form-control" type="text" id="join-nickname" name="nickname" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="join-email">이메일</label>
            <input class="form-control" type="text" id="join-email" name="email" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="join-password">비밀번호</label>
            <input class="form-control" type="password" id="join-password" name="password" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="join-password-check">비밀번호 확인</label>
            <input
              class="form-control"
              type="password"
              id="join-password-check"
              name="password-check"
            />
          </div>
          <div class="mb-5">
            <button class="btn w-100 btn-secondary" @click="signup">회원가입</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
