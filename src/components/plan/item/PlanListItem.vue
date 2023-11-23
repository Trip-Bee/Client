<script setup>
import { ref, defineProps, onBeforeMount } from "vue";

const props = defineProps({
  plan: Object,
});
</script>

<template>
  <tr>
    <td class="text-center">{{ plan.planId }}</td>
    <td class="text-center">
      <router-link
        class="title text-decoration-none"
        :to="{ name: 'plan-view', params: { id: plan.planId } }"
        >{{ plan.title }}</router-link
      >
    </td>
    <td class="text-center">{{ plan.nickname }}</td>
    <td class="text-center">{{ plan.startDate }}</td>
    <td class="text-center">{{ plan.endDate }}</td>
    <td class="text-center">{{ plan.hit }}</td>
    <td class="text-center">{{ plan.createdAt.split("T")[0] }}</td>
  </tr>
</template>

<style scoped>
tr > td:nth-child(1) {
  font-weight: bold;
}

.title {
  color: #424242;
}
</style>
