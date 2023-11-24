<script setup>
import { ref, onMounted } from "vue";
import { detailPost, deletePost, modifyPost } from "../../api/post.js";
import { useRoute, useRouter } from "vue-router";
import CommentList from "../common/CommentList.vue";
import { listComment } from "../../api/comment";
import { useMemberStore } from "../../stores/member";

const memberStore = useMemberStore();
const { userInfo } = memberStore;

const route = useRoute();
const router = useRouter();

const notice = ref({});

onMounted(() => {
  getPost();
  getComments();
});

const getPost = () => {
  const param = {
    category: "notice",
    postId: route.params.id,
  };
  detailPost(
    param,
    ({ data }) => {
      notice.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const getComments = () => {
  const param = {
    category: "notice",
    postId: route.params.id,
  };
  listComment(
    param,
    ({ data }) => {
      comments.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const handleDelete = () => {
  const param = {
    category: "notice",
    postId: route.params.id,
  };

  deletePost(
    param,
    ({ data }) => {
      alert("Post가 삭제되었습니다.");
      router.replace({ name: "notice-list" });
    },
    (error) => {
      console.log(error);
    }
  );
};

const handleModify = () => {
  const param = {
    category: "notice",
    postId: route.params.id,
  };

  modifyPost(
    param,
    ({ data }) => {
      router.replace({ name: "notice-list" });
    },
    (error) => {
      console.log(error);
    }
  );
};

const comments = ref([]);
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center pt-6 pb-6"
      :elevation="2"
      border
      rounded
    >
      <v-card
        class="mx-auto pa-16 pb-3 w-75 mt-10 mb-2"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >Notice</v-card-title
        >

        <div class="mt-4 mb-2 d-flex flex-wrap justify-end">
          <v-list lines="one">
            <v-list-item
              prepend-avatar="/src/assets/img/profile.png"
              elevation="2"
              rounded
            >
              <v-list-title class="font-weight-bold d-block">
                {{ notice.nickname }}
              </v-list-title>
              <v-list-subtitle>
                {{ notice.createdAt }}
              </v-list-subtitle>
            </v-list-item>
          </v-list>
        </div>

        <div class="mt-2 mb-4">
          <v-text-field
            v-model="notice.title"
            class="font-weight-bold"
            variant="solo"
            prefix="[Notice] "
            readonly
          ></v-text-field>
          <v-textarea
            variant="solo"
            :value="notice.content"
            readonly
            rows="10"
            row-height="15"
            no-resize
          ></v-textarea>
        </div>
        <div>조회수 : {{ notice.hit }}</div>
        <div class="mb-8 d-flex justify-end">
          <v-card-action>
            <div v-if="userInfo != null && userInfo.id == notice.writerId">
              <v-btn
                class="font-weight-black me-2"
                variant="outlined"
                rounded="md"
                color="success"
                elevation="1"
                @click="
                  $router.push({
                    name: 'notice-modify',
                    params: { id: $route.params.id },
                  })
                "
                >수정</v-btn
              >
              <v-btn
                class="font-weight-black"
                variant="outlined"
                rounded="md"
                color="error"
                elevation="1"
                @click="handleDelete()"
                >삭제</v-btn
              >
            </div>
          </v-card-action>
        </div>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
