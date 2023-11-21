<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  posts: Array,
});
</script>

<template>
  <v-table hover="true">
    <thead class="elevation-3">
      <tr>
        <th class="text-center text-white">ID</th>
        <th class="text-center text-white w-50">제목</th>
        <th class="text-center text-white">작성자</th>
        <th class="text-center text-white">조회수</th>
        <th class="text-center text-white">작성일</th>
      </tr>
    </thead>
    <tbody v-for="post in posts" :key="post.id">
      <tr>
        <td class="text-center">{{ post.id }}</td>
        <td class="text-center">
          <router-link
            class="title text-decoration-none"
            :to="{
              name: `${route.path.split('/')[1]}-view`,
              params: { id: post.id },
            }"
            >{{ post.title }}</router-link
          >
        </td>
        <td class="text-center">{{ post.nickname }}</td>
        <td class="text-center">{{ post.hit }}</td>
        <td class="text-center">{{ post.createdAt }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
th {
  background-color: #424242;
}

tr > td:nth-child(1) {
  font-weight: bold;
}

.title {
  color: #424242;
}
</style>
