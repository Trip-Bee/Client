<script setup>
import { ref, watch } from "vue";
import PlanSpotList from "../plan/item/PlanSpotList.vue";

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
  getDiff();
});

const items = ref([]);
const tab = ref(null);
const tabItems = ref([]);
const totalDate = ref();

const getDiff = () => {
  const diffDate = plan.value.end.getTime() - plan.value.start.getTime();
  totalDate.value = Math.abs(diffDate / (1000 * 60 * 60 * 24)) + 1;
  console.log(totalDate.value);
};

// const load = async () => {
//   const res = await this.api();
// };
</script>

<template>
  <v-container class="pa-0 pt-1 d-flex">
    <v-stepper
      :items="['여행정보입력', '여행일정추가', '미리보기']"
      class="w-100"
    >
      <template v-slot:[`item.1`]>
        <div class="d-flex flex-wrap justify-center">
          <v-card class="w-85" flat>
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
                :min="new Date()"
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
        <v-card flat>
          <div class="d-flex flex-wrap justify-center">
            <PlanSpotList class="w-69"></PlanSpotList>
            <v-sheet class="w-31">
              <v-card class="pa-2 border rounded" elevation="3">
                <v-tabs
                  v-model="tab"
                  bg-color="#424242"
                  color="white"
                  class="border"
                >
                  <div v-for="(n, index) in totalDate" :key="index">
                    <v-tab :value="n">{{ n }}일차</v-tab>
                  </div>
                </v-tabs>

                <v-card-text>
                  <v-window v-model="tab">
                    <div v-for="(n, index) in totalDate" :key="index">
                      <v-window-item :value="n">{{ n }}일차 </v-window-item>
                    </div>
                  </v-window>
                </v-card-text>
              </v-card>
            </v-sheet>
          </div>
        </v-card>
      </template>

      <template v-slot:[`item.3`]>
        <v-card flat></v-card>
      </template>
    </v-stepper>
  </v-container>
</template>

<style scoped>
.w-31 {
  width: 30%;
}

.w-69 {
  width: 67%;
}

.w-80 {
  width: 80%;
}

.w-85 {
  width: 85%;
}
</style>
