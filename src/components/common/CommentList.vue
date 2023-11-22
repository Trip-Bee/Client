<script setup>
import { ref, onMounted } from "vue";
import { listComment, writeComment, deleteComment } from "../../api/comment.js";
import { useRoute } from "vue-router";
import { useMemberStore } from "../../stores/member";

const memberStore = useMemberStore();
const { userInfo } = memberStore;

const route = useRoute();
const reviews = ref([]);
const commentContent = ref("");

const category = ref(route.path.split("/")[1]);

onMounted(() => {
  getComments();
  console.log(route.path.split("/")[1]);
});

const deleteBtn = (id) => {
  const param = {
    category: route.path.split("/")[1],
    commentId: id,
  };
  deleteComment(
    param,
    ({ data }) => {
      getComments();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getComments = () => {
  const param = {
    category: route.path.split("/")[1],
    postId: route.params.id,
  };
  listComment(
    param,
    ({ data }) => {
      reviews.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const handleWriteBtn = () => {
  const param = {
    category: route.path.split("/")[1],
    postId: route.params.id,
    content: commentContent.value,
  };
  writeComment(
    param,
    ({ data }) => {
      getComments();
    },
    (error) => {}
  );
};
</script>

<template>
  <v-card
    class="ps-16 pe-16 pt-6 pb-6 w-75 mt-2 mb-14"
    elevation="2"
    rounded="md"
  >
    <div v-if="category == 'qna'">
      <div v-if="userInfo != null && userInfo.role == 'ROLE_ADMIN'">
        <v-textarea
          v-model="commentContent"
          label="Comment 작성"
          class="font-weight-medium text-left"
          variant="solo"
          rows="5"
          elevation="2"
          no-resize
          hide-details
          clearable
        ></v-textarea>
        <div class="d-flex justify-end">
          <v-btn
            class="font-weight-black me-2 mt-2"
            variant="outlined"
            rounded="md"
            color="success"
            elevation="1"
            @click="handleWriteBtn()"
            >작성</v-btn
          >
        </div>
      </div>
    </div>
    <div v-else>
      <v-textarea
        v-model="commentContent"
        label="Comment 작성"
        class="font-weight-medium text-left"
        variant="solo"
        rows="5"
        elevation="2"
        no-resize
        hide-details
        clearable
      ></v-textarea>
      <div class="d-flex justify-end">
        <v-btn
          class="font-weight-black me-2 mt-2"
          variant="outlined"
          rounded="md"
          color="success"
          elevation="1"
          @click="handleWriteBtn()"
          >작성</v-btn
        >
      </div>
    </div>
    <v-list lines="three">
      <div v-if="category == 'qna'">
        <v-list-subheader class="font-weight-bold">Comment</v-list-subheader>
      </div>
      <div v-else>
        <v-list-subheader class="font-weight-bold"
          >Comment 목록</v-list-subheader
        >
      </div>
      <v-list-item
        v-for="review in reviews"
        :key="review.id"
        prepend-avatar="/src/assets/img/profile.png"
        :title="review.nickname"
        :subtitle="review.createdAt"
        elevation="2"
      >
        <v-list-subtitle>{{ review.content }}</v-list-subtitle>
        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="$close"
            variant="text"
            @click="deleteBtn(review.id)"
          ></v-btn> </template
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped></style>
