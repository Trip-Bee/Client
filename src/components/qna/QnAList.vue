<script setup>
import { ref } from "vue";
import QnAListItem from "./item/QnAListItem.vue";
import PageNavigation from "../common/PageNavigation.vue";

const qnaList = [
  {
    id: 1,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 2,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 3,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 4,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
  {
    id: 5,
    title: "title test",
    content: "content test",
    nickname: "nickname test",
    hit: 0,
    createdAt: "2023-11-10",
  },
];

const currentPage = ref(1);
const totalPage = ref(30);
const param = ref({
  pgno: currentPage.value,
  spp: 20,
  key: "",
  word: "",
});

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
};
</script>

<template>
  <div class="container">
    <div class="pt-5 pb-3 w-75 m-auto">
      <div class="d-flex justify-content-end">
        <router-link
          :to="{ name: 'qna-write' }"
          class="btn btn-outline-success mb-3"
        >
          글쓰기</router-link
        >
      </div>
      <div class="col-md-7 offset-3">
        <form class="d-flex" id="form-search" action="">
          <input type="hidden" name="action" value="list" />
          <input type="hidden" name="pgno" value="1" />
          <select
            name="key"
            id="key"
            class="form-select form-select-sm ms-5 me-1 w-50"
            aria-label="검색조건"
          >
            <option value="" selected>검색조건</option>
            <option value="article_no">글번호</option>
            <option value="subject">제목</option>
            <option value="user_id">작성자</option>
          </select>
          <div class="input-group input-group-sm">
            <input
              type="text"
              name="word"
              id="word"
              class="form-control"
              placeholder="검색어..."
            />
            <button id="btn-search" class="btn btn-dark" type="button">
              검색
            </button>
          </div>
        </form>
      </div>
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">조회수</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody class="post-list" id="board-body">
          <QnAListItem
            v-for="qna in qnaList"
            :key="qna.id"
            :qna="qna"
          ></QnAListItem>
        </tbody>
      </table>
    </div>
    <!-- <PageNavigation
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"
    ></PageNavigation> -->
    <nav
      aria-label="Page navigation example"
      class="d-flex justify-content-center"
    >
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
