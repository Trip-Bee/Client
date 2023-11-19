<script setup>
import { ref, defineProps, onBeforeMount } from "vue";

const props = defineProps({
  post: Object,
});
</script>

<template>
  <tr>
    <td class="text-center">{{ post.id }}</td>
    <td class="text-center">
      <router-link
        class="title text-decoration-none"
        :to="{ name: 'qna-view', params: { id: post.id } }"
        >{{ post.title }}</router-link
      >
    </td>
    <td class="text-center">{{ post.nickname }}</td>
    <td class="text-center">{{ post.hit }}</td>
    <td class="text-center">{{ post.createdAt }}</td>
  </tr>
  <!-- <tr class="text-center">
    <th scope="row">{{ post.id }}</th>
    <td>
      <router-link :to="{ name: 'qna-view', params: { id: post.id } }">
        {{ post.title }}
      </router-link>
    </td>
    <td>{{ post.nickname }}</td>
    <td>{{ post.hit }}</td>
    <td>{{ post.createdAt }}</td>
  </tr> -->
</template>

<style scoped>
tr > td:nth-child(1) {
  font-weight: bold;
}

.title {
  color: #424242;
}
</style>
