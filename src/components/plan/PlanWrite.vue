<script setup>
import { ref, watch } from "vue";
import SpotList from "../spot/SpotList.vue";

const plan = ref({
  title: "",
  headCount: 0,
  start: new Date(),
  end: new Date(),
});

watch(plan.value, (newValue, oldValue) => {
  console.log(`start ${plan.value.start}`);
  console.log(`end ${plan.value.end}`);
  console.log(this);
});
</script>

<template>
  <v-container class="pa-0 pt-1 d-flex">
    <!-- <v-sheet
      class="d-flex flex-wrap justify-center pt-8 pb-14"
      :elevation="2"
      border
      rounded
    > -->
    <v-stepper
      :items="['여행정보입력', '여행일정추가', '미리보기']"
      class="w-100"
    >
      <template v-slot:[`item.1`]>
        <div class="d-flex flex-wrap justify-center">
          <v-card class="w-85" title="여행정보입력" flat>
            <v-text-field
              :counter="30"
              label="Title"
              variant="solo"
            ></v-text-field>
            <v-text-field
              label="인원수"
              variant="solo"
              type="Number"
            ></v-text-field>
            <div class="d-flex justify-space-evenly">
              <v-date-picker
                locale="ko"
                v-model="plan.start"
                color="#424242"
                elevation="4"
                show-adjacent-months
                header="시작일"
                title="title"
                hide-header
                rounded
              ></v-date-picker>
              <v-date-picker
                locale="ko"
                v-model="plan.end"
                color="#424242"
                elevation="4"
                show-adjacent-months
                header="종료일"
                title="title"
                :min="plan.start"
                hide-header
                rounded
              ></v-date-picker>
            </div>
            <div class="mt-6">
              <v-text-field
                :counter="30"
                label="Theme"
                variant="solo"
              ></v-text-field>
            </div>
          </v-card>
        </div>
      </template>

      <template v-slot:[`item.2`]>
        <v-card title="여행일정추가" flat>
          <SpotList class="w-80"></SpotList>
          <v-container class="pa-0"></v-container>
        </v-card>
      </template>

      <template v-slot:[`item.3`]>
        <v-card title="미리보기" flat></v-card>
      </template>
    </v-stepper>
    <!-- </v-sheet> -->
  </v-container>
</template>

<style scoped>
.w-80 {
  width: 80%;
}

.w-85 {
  width: 85%;
}
</style>
