<script setup>
import { ref, watch, onMounted, toRefs } from "vue";
import PlanSpotList from "../plan/item/PlanSpotList.vue";
import { listVehicle, addPlans } from "../../api/plan.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const memberStore = useMemberStore();
const { getAccessToken, getUserInfo } = memberStore;
const { userInfo } = storeToRefs(memberStore);

const plan = ref({
  title: "",
  headCount: 1,
  start: new Date(),
  end: new Date(),
  theme: "",
});

console.log("userInfo", userInfo.value);

const vehicles = ref([]);

watch(plan.value, (newValue, oldValue) => {
  getDiff();
  console.log(plan.value);
});

const tab = ref(null);
const totalDate = ref();

const getDiff = () => {
  const diffDate = plan.value.end.getTime() - plan.value.start.getTime();
  totalDate.value = Math.ceil(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1;
};

const getVehicles = () => {
  listVehicle(
    {},
    ({ data }) => {
      vehicles.value = data.dataBody;
    },
    (error) => console.log(error)
  );
};

// 카드 정보를 여기에?
// 추가한 여행상세계획 카드 하나
const planDetails = ref([]);
// const planDetails = ref([
//   [],
//   [{ title: "1 test1" }],
//   [{ title: "2 test1" }, { title: "2 test2" }],
//   [{ title: "3 test1" }, { title: "3 test2" }, { title: "3 test3" }],
// ]);

const initializePlanDetails = () => {
  // totalDate의 수만큼 빈 배열을 만들어 planDetails에 할당
  planDetails.value = Array.from({ length: totalDate.value + 1 }, () => []);
  console.log("planDetails 길이?", planDetails.value.length);
};

// totalDate가 변경되면 다시 초기화
watch(totalDate, () => {
  initializePlanDetails();
});

// PlanWriter 에서 선택한 tab(1일차, 2일차... 에서 1, 2 같은 숫자)을 PlanSpotList에 전달(props)
// PlanSpotList에서 props로 전달받은 tab을 이용, 선택한 장소의 spotId, img, title, addr, tab을 하나로 묶어서 객체로 만들고 PlanWriter에 전달(emit)
// emit 이벤트 핸들러에서 전달 받으면 planDetails[tab]에 push

watch(tab, (newValue, oldValue) => {
  console.log("현재 선택한 일자?", tab.value);
});

const data = ref({
  tab: null, // dateOrder
  spotId: null, // 장소 id
  title: null, // 장소 이름
  image: null, // 장소 이미지
  addr: null, // 장소 주소
  order: null, // 배열에서 순서 >> 해당 일차의 상세계획에서 순서
  vehicle: 8,
  cost: 0,
});

// index의 경우는?

// v-model로?
// vehicle: null,
// cost: null

///////////////// 아래랑 비교
// import { toRefs } from 'vue';

// // ...

// const { data: reactiveData } = toRefs(data);

// const addPlanDetail = (args) => {
//   console.log("args", args);
//   reactiveData.tab = args.tab;
//   reactiveData.spotId = args.spotId;
//   reactiveData.title = args.title;
//   reactiveData.image = args.image;
//   reactiveData.addr = args.addr;

//   reactiveData.order = planDetails.value[reactiveData.tab].length;
//   console.log("reactiveData", reactiveData);

//   const newData = { ...reactiveData };
//   console.log("newData", newData);

//   planDetails.value[newData.tab].push(newData);
//   console.log("planDetails 배열", planDetails.value);
//   console.log("planDetails배열의 배열", planDetails.value[1]);
// };

// emit으로 데이터 받아서 planDetails[tab] 에 넣기
const addPlanDetail = (args) => {
  console.log("args", args);
  data.value.tab = args.tab;
  data.value.spotId = args.spotId;
  data.value.title = args.title;
  data.value.image = args.image;
  data.value.addr = args.addr;

  //   console.log("data", data.value);
  data.value.order = planDetails.value[data.value.tab].length;
  console.log("data", data.value);

  const newData = ref({ ...data.value });
  console.log("newData", newData.value);

  planDetails.value[newData.value.tab].push(newData.value);
  // planDetails.value[newData.value.tab].push(newData);

  console.log("planDetails 배열", planDetails.value);
  console.log("planDetails배열의 배열", planDetails.value[1]);
};

watch(planDetails.value, (newValue, oldValue) => {
  console.log(newValue.value);
});

// const removePlanDetail = (tab, index) => {
//   // 객체를 삭제할 때 해당 객체의 인덱스를 찾아서 삭제
//   planDetails[tab].splice(index, 1);

//   // 삭제된 후에는 각 객체의 인덱스를 업데이트
//   planDetails[tab].forEach((item, idx) => {
//     item.order = idx;
//   });
// };

// const changePlanDetailOrder = (tab, oldIndex, newIndex) => {
//   // 순서를 변경할 때 배열 내에서 인덱스를 조절
//   const movedItem = planDetails[tab].splice(oldIndex, 1)[0];
//   planDetails[tab].splice(newIndex, 0, movedItem);

//   // 변경된 후에는 각 객체의 인덱스를 업데이트
//   planDetails[tab].forEach((item, idx) => {
//     item.order = idx;
//   });
// };

const handleAddPlan = () => {
  // planDetails 데이터 변환해서 넣기
  let totalCost = 0;
  const details = ref([]);
  const inputData = ref({
    spotId: null,
    vehicleId: null,
    order: null,
    dateOrder: null,
    cost: 0,
  });
  // planDetails 를 idx 1부터 반복문 돌리기
  // inputData에 값넣고 inputData를 복사해서 배열에 넣기
  for (let i = 1; i <= totalDate.value; i++) {
    // 각 일차별로 planDetails를 돌면서 내부의 값을 details 배열에 넣기
    // ?일차 일정 배열
    planDetails.value[i];
    if (planDetails.value[i].length === 0) {
      continue;
    }

    for (let j = 0; j < planDetails.value[i].length; j++) {
      inputData.value.spotId = planDetails.value[i][j].spotId;
      inputData.value.vehicleId = planDetails.value[i][j].vehicle;
      inputData.value.order = planDetails.value[i][j].order;
      inputData.value.dateOrder = planDetails.value[i][j].tab;
      inputData.value.cost = planDetails.value[i][j].cost;
      totalCost += parseInt(inputData.value.cost);

      console.log("totalCost type?", typeof totalCost);
      console.log("cost type?", typeof parseInt(inputData.value.cost));

      const newData = ref({ ...inputData.value });
      console.log("newData", newData.value);
      details.value.push(newData.value);
    }
    // details.value[i] = planDetails.value[i].map((item, index) => ({
    //   spotId: item.spotId,
    //   vehicleId: item.vehicle,
    //   order: index,
    //   dateOrder: i,
    //   cost: item.cost,
    // }));
  }
  // 배열의 cost를 이용하여 totalCost 계산
  addPlans(
    {
      writerId: userInfo.value.id,
      title: plan.value.title,
      totalCost: totalCost,
      startDate: plan.value.start,
      endDate: plan.value.end,
      headCount: plan.value.headCount,
      theme: plan.value.theme,
      planDetails: details.value,
    },
    (response) => {
      router.push({ name: "plan-list" });
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getDiff(); // totalDate 계산
  getVehicles(); // 교통수단 목록조회
  initializePlanDetails(); // PlanDetails 배열을 totalDate + 1로 초기화
});
</script>

<template>
  <v-container class="pa-0 pt-1 d-flex">
    <v-stepper
      :items="['여행정보입력', '여행일정추가', '미리보기']"
      class="w-100"
    >
      <!-- 1번째 단계, plan입력받는 곳 -->
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

      <!-- 2단계 -->
      <template v-slot:[`item.2`]>
        <v-card flat>
          <div class="d-flex flex-wrap justify-center">
            <!-- plan 에서 지도 검색 -->
            <PlanSpotList
              class="w-69"
              :tab="tab"
              @emitPlanDetail="addPlanDetail"
            ></PlanSpotList>

            <v-sheet class="w-31">
              <v-card class="pa-2 border rounded" elevation="2">
                <v-tabs
                  v-model="tab"
                  bg-color="#424242"
                  color="white"
                  class="border"
                >
                  <div v-for="(n, index) in totalDate" :key="n">
                    <v-tab :value="n">{{ n }}일차</v-tab>
                  </div>
                </v-tabs>

                <v-card-text>
                  <v-window v-model="tab">
                    <div v-for="(n, index) in totalDate" :key="n">
                      <v-window-item :value="n">
                        <v-card>
                          <v-card-title class="font-weight-bold pa-0"
                            >{{ n }}일차</v-card-title
                          >
                          <v-virtual-scroll
                            :height="620"
                            :items="planDetails[n]"
                            item-height="200"
                          >
                            <template v-slot:default="{ item, index }">
                              <!-- 카드 1개 PlanDetails 정보가 담겨있음 -->
                              <v-card class="border ma-2" hover>
                                <v-img
                                  class="border ma-2 rounded elevation-2"
                                  :height="120"
                                  aspect-ratio="16/9"
                                  :src="item.image"
                                ></v-img>
                                <v-card-title class="pa-0 ps-4 pe-4 pb-2">{{
                                  item.title
                                }}</v-card-title>
                                <v-card-subtitle
                                  class="pa-0 ps-4 pe-4 text-start"
                                  >{{ item.addr }}</v-card-subtitle
                                >

                                <v-card-text class="pa-0 ps-4 pe-4 pt-2">
                                  <div>
                                    <v-divider></v-divider>
                                    <div class="font-weight-bold mt-1">
                                      교통수단
                                    </div>
                                    <div class="px-4 mb-1">
                                      <!-- click? v-model -->
                                      <v-chip-group v-model="item.vehicle">
                                        <v-chip
                                          variant="outlined"
                                          elevation="1"
                                          size="x-small"
                                          mandatory
                                          rounded
                                          selected-class="text-primary"
                                          v-for="vehicle in vehicles"
                                          :key="vehicle.id"
                                          :value="vehicle.id"
                                          >{{ vehicle.name }}</v-chip
                                        >
                                      </v-chip-group>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="px-4 mb-2">
                                      <div class="font-weight-bold mt-1 mb-1">
                                        비용
                                      </div>
                                      <v-text-field
                                        class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                                        variant="outlined"
                                        type="Number"
                                        hide-details
                                        rounded
                                        density="compact"
                                        v-model="item.cost"
                                      ></v-text-field>
                                    </div>
                                    <v-divider></v-divider>
                                  </div>
                                </v-card-text>
                                <v-card-action
                                  class="d-flex justify-space-between align-center"
                                >
                                  <div class="ms-2">
                                    <v-icon
                                      class="me-1 ms-2"
                                      icon="$heart"
                                      color="red"
                                    ></v-icon>
                                    <span class="subheading me-2">{{
                                      item.isLike
                                    }}</span>
                                  </div>
                                  <v-btn
                                    color="#424242"
                                    class="me-1"
                                    icon="$minus"
                                    variant="text"
                                    @click=""
                                  ></v-btn>
                                </v-card-action>
                              </v-card>
                            </template>
                          </v-virtual-scroll>
                        </v-card>
                      </v-window-item>
                    </div>
                  </v-window>
                </v-card-text>
              </v-card>
            </v-sheet>
          </div>
        </v-card>
      </template>

      <!-- 3단계 -->
      <template v-slot:[`item.3`]>
        <v-container class="pa-0 d-flex justify-center">
          <v-sheet class="pa-0 w-75">
            <v-card flat>
              <v-container
                class="pa-0 mt-4 mb-4 d-flex flex-wrap justify-space-between"
              >
                <div class="w-69 border">
                  <v-card
                    class="pa-2 border rounded d-flex flex-row"
                    elevation="2"
                  >
                    <v-tabs
                      direction="vertical"
                      v-model="tab"
                      bg-color="#424242"
                      color="white"
                      class="border"
                    >
                      <div v-for="(n, index) in totalDate" :key="n">
                        <v-tab :value="n">{{ n }}일차</v-tab>
                      </div>
                    </v-tabs>

                    <v-card-text>
                      <v-window v-model="tab">
                        <div v-for="(n, index) in totalDate" :key="n">
                          <v-window-item :value="n">
                            <v-card>
                              <v-card-title class="font-weight-bold pa-0"
                                >{{ n }}일차</v-card-title
                              >
                              <v-virtual-scroll
                                :height="620"
                                :items="planDetails[n]"
                                item-height="200"
                              >
                                <template v-slot:default="{ item, index }">
                                  <!-- 카드 1개 PlanDetails 정보가 담겨있음 -->
                                  <v-card class="border ma-2" hover>
                                    <v-img
                                      class="border ma-2 rounded elevation-2"
                                      :height="120"
                                      aspect-ratio="16/9"
                                      :src="item.image"
                                    ></v-img>
                                    <v-card-title
                                      class="pa-0 ps-4 pe-4 pb-2 font-weight-bold"
                                      >{{ item.title }}</v-card-title
                                    >
                                    <v-card-subtitle
                                      class="pa-0 ps-4 pe-4 text-start"
                                      >{{ item.addr }}</v-card-subtitle
                                    >

                                    <v-card-text class="pa-0 ps-4 pe-4 pt-2">
                                      <div>
                                        <v-divider></v-divider>
                                        <div class="font-weight-bold mt-1">
                                          교통수단
                                        </div>
                                        <div class="mb-1">
                                          <!-- click? v-model -->
                                          <v-chip-group v-model="item.vehicle">
                                            <v-chip
                                              variant="outlined"
                                              elevation="1"
                                              size="x-small"
                                              mandatory
                                              rounded
                                              selected-class="text-primary"
                                              v-for="vehicle in vehicles"
                                              :key="vehicle.id"
                                              :value="vehicle.id"
                                              >{{ vehicle.name }}</v-chip
                                            >
                                          </v-chip-group>
                                        </div>
                                        <v-divider></v-divider>
                                        <div class="mb-2">
                                          <div
                                            class="font-weight-bold mt-1 mb-1"
                                          >
                                            비용
                                          </div>
                                          <v-text-field
                                            class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                                            variant="outlined"
                                            type="Number"
                                            hide-details
                                            rounded
                                            density="compact"
                                            v-model="item.cost"
                                          ></v-text-field>
                                        </div>
                                        <v-divider></v-divider>
                                      </div>
                                    </v-card-text>
                                    <v-card-action
                                      class="d-flex justify-space-between align-center"
                                    >
                                      <div class="ms-2">
                                        <v-icon
                                          class="me-1 ms-2"
                                          icon="$heart"
                                          color="red"
                                        ></v-icon>
                                        <span class="subheading me-2">256</span>
                                      </div>
                                      <v-btn
                                        color="#424242"
                                        class="me-1"
                                        icon="$minus"
                                        variant="text"
                                        @click=""
                                      ></v-btn>
                                    </v-card-action>
                                  </v-card>
                                </template>
                              </v-virtual-scroll>
                            </v-card>
                          </v-window-item>
                        </div>
                      </v-window>
                    </v-card-text>
                  </v-card>
                </div>
                <div class="w-31 border">
                  <v-window v-model="tab">
                    <div v-for="(n, index) in totalDate" :key="n">
                      <v-window-item :value="n">
                        <v-card class="pt-6 ps-4 pe-4 pb-6">
                          <v-card-title class="font-weight-bold pa-0"
                            >{{ n }}일차</v-card-title
                          >
                          <v-card-subtitle
                            >{{ n }}일차 여행 계획
                          </v-card-subtitle>
                          <v-card-item>
                            <div class="font-weight-bold mt-1 mb-1">
                              계획 개수
                            </div>
                            <v-text-field
                              class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                              variant="outlined"
                              type="Number"
                              hide-details
                              rounded
                              density="compact"
                              readonly
                              :value="planDetails[n].length"
                            ></v-text-field>
                            <div class="font-weight-bold mt-1 mb-1">
                              전체 비용
                            </div>
                            <v-text-field
                              class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                              variant="outlined"
                              type="Number"
                              hide-details
                              rounded
                              density="compact"
                              readonly
                              :value="
                                planDetails[n]
                                  .map((detail) => parseInt(detail.cost))
                                  .reduce((prev, curr) => prev + curr, 0)
                              "
                            ></v-text-field>
                          </v-card-item>
                        </v-card>
                      </v-window-item>
                    </div>
                  </v-window>
                </div>
              </v-container>

              <v-divider class="mt-4 mb-4"></v-divider>
              <v-row>
                <v-col class="text-end">
                  <v-btn
                    class="font-weight-black"
                    variant="outlined"
                    rounded="md"
                    color="#757575"
                    @click="handleAddPlan"
                  >
                    완료
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-sheet>
        </v-container>
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
