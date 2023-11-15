<script setup>
import { defineProps } from "vue";

const props = defineProps({
  qna: Object,
});
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ qna.id }}</th>
    <td>
      <router-link :to="{ name: 'qna-view', params: { id: qna.id } }">
        {{ qna.title }}
      </router-link>
    </td>
    <td>{{ qna.nickname }}</td>
    <td>{{ qna.hit }}</td>
    <td>{{ qna.createdAt }}</td>
  </tr>
</template>

<style scoped></style>
