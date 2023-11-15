<script setup>
const qna = {
  id: 1,
  title: "title test",
  content: "content test",
  nickname: "nickname test",
  hit: 0,
  createdAt: "2023-11-10",
};
</script>

<template>
  <div class="container d-flex justify-content-center flex-wrap">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글보기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{ qna.id }}. {{ qna.title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <p>
              <span class="fw-bold">{{ qna.nickname }}</span> <br />
              <span class="text-secondary fw-light">
                {{ qna.createdAt }} 조회 : {{ qna.hit }}
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">댓글 : 0</div>
        <div class="divider mb-3"></div>
        <div class="text-secondary">{{ qna.content }}</div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <router-link
            :to="{ name: 'qna-list' }"
            class="btn btn-outline-primary mb-3"
            >글목록</router-link
          >
          <button
            type="button"
            id="btn-delete"
            class="btn btn-outline-danger mb-3 ms-1"
          >
            글삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
