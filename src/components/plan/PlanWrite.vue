<script setup>
import { ref, computed, watch } from "vue";
import SpotList from "../spot/SpotList.vue";

const getDiff = (start, end) => {
  const diffDate = end.getTime() - start.getTime();

  // 시작일 변경하지 않을 경우 시작일의 시간이 현재시간이므로 소수가 나온다.
  // 소수에 대한 처리를 해줘야 한다.
  return Math.ceil(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1; // 밀리세컨 * 초 * 분 * 시 = 일
};

const plan = ref({
  title: "",
  headCount: 1,
  start: new Date(),
  end: new Date(),
  theme: "",
});

const duration = computed(() => {
  return getDiff(plan.value.start, plan.value.end);
});
console.log(duration.value);

// const duration = ref(1);

watch(plan.value, (newValue, oldValue) => {
  console.log(`start ${plan.value.start}`);
  console.log(`end ${plan.value.end}`);
  console.log("watch in", plan.value);
  //   duration = getDiff(plan.value.start, plan.value.end);
  //   console.log(duration);
  console.log(duration.value);
});

// let duration = getDiff(plan.value.start, plan.value.end);
console.log(duration);
</script>

<template>
  <v-container class="pa-0 pt-1 d-flex">
    <!-- <v-sheet
      class="d-flex flex-wrap justify-center pt-8 pb-14"
      :elevation="2"
      border
      rounded
    > -->
    <v-stepper :items="['여행정보입력', '여행일정추가', '미리보기']" class="w-100">
      <template v-slot:[`item.1`]>
        <div class="d-flex flex-wrap justify-center">
          <v-card class="w-85" title="여행정보입력" flat>
            <v-text-field
              :counter="30"
              label="Title"
              variant="solo"
              v-model="plan.title"
            ></v-text-field>
            <v-text-field
              label="인원수"
              variant="solo"
              type="Number"
              v-model="plan.headCount"
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
                v-model="plan.theme"
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
