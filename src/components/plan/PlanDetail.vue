<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailPlan } from "../../api/plan.js";

const route = useRoute();
const router = useRouter();

const tab = ref(null);
const plan = ref({});
const totalDate = ref(1);
const planDetails = ref([]);

onMounted(() => {
  getPlan();
});

const getPlan = () => {
  const param = {
    planId: route.params.id,
  };
  detailPlan(
    param,
    ({ data }) => {
      plan.value = data.dataBody;
      getDiff(plan.value.startDate.split("-"), plan.value.endDate.split("-"));
      planDetails.value = Array.from({ length: totalDate.value + 1 }, () => []);
      const details = Array.from({ length: totalDate.value + 1 }, () => []);
      if (plan.value.details.length > 0) {
        details.push([]);
        plan.value.details.forEach((detail) => {
          details[detail.dateOrder][detail.order] = detail;
        });
        planDetails.value = details;
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

const getDiff = (start, end) => {
  const diffDate = new Date(end).getTime() - new Date(start).getTime();
  totalDate.value = Math.ceil(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1;
  console.log("totalDate ", totalDate.value);
};
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center"
      :elevation="2"
      border
      rounded
    >
      <v-stepper :items="['전체 계획', '세부 계획']" class="w-100">
        <template v-slot:[`item.1`]>
          <v-container
            class="pa-0 w-50 border rounded ps-16 pe-16 pb-10 elevation-2 mt-8"
          >
            <div class="font-weight-bold mt-1 mb-1 text-center text-h4 pt-10">
              {{ plan.planTitle }}
            </div>
            <div class="mt-4 mb-2 d-flex justify-center">
              <div class="w-50">
                <div class="font-weight-bold mt-1 mb-1">작성자</div>
                <v-text-field
                  class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                  variant="outlined"
                  hide-details
                  rounded
                  density="compact"
                  :value="plan.nickname"
                  readonly
                ></v-text-field>
              </div>
              <div class="w-50">
                <div class="font-weight-bold mt-1 mb-1">인원수</div>
                <v-text-field
                  class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                  variant="outlined"
                  hide-details
                  rounded
                  density="compact"
                  :value="plan.headCount"
                  readonly
                ></v-text-field>
              </div>
            </div>
            <div class="mb-2 d-flex justify-center">
              <div class="w-50">
                <div class="font-weight-bold mt-1 mb-1">시작일</div>
                <v-text-field
                  class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                  variant="outlined"
                  hide-details
                  rounded
                  density="compact"
                  :value="plan.startDate"
                  readonly
                ></v-text-field>
              </div>
              <div class="w-50">
                <div class="font-weight-bold mt-1 mb-1">종료일</div>
                <v-text-field
                  class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                  variant="outlined"
                  hide-details
                  rounded
                  density="compact"
                  :value="plan.endDate"
                  readonly
                ></v-text-field>
              </div>
            </div>
            <div class="mb-2">
              <div class="font-weight-bold mt-1 mb-1">전체 비용</div>
              <v-text-field
                class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                variant="outlined"
                type="Number"
                hide-details
                rounded
                density="compact"
                :value="plan.totalCost"
                readonly
              ></v-text-field>
            </div>
            <div class="mb-2">
              <div class="font-weight-bold mt-1 mb-1">테마</div>
              <v-text-field
                class="ms-1 me-1 pa-1 text-subtitle-1 font-weight-medium"
                variant="outlined"
                hide-details
                rounded
                density="compact"
                :value="plan.theme"
                readonly
              ></v-text-field>
            </div>
          </v-container>
        </template>
        <template v-slot:[`item.2`]>
          <v-container class="pa-0 d-flex justify-center">
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
                                          :src="item.spotImage"
                                        ></v-img>
                                        <v-card-title
                                          class="pa-0 ps-4 pe-4 pb-2 font-weight-bold"
                                          >{{ item.spotTitle }}</v-card-title
                                        >
                                        <!-- <v-card-subtitle
                                          class="pa-0 ps-4 pe-4 text-start"
                                          >{{ item.addr }}</v-card-subtitle
                                        > -->

                                        <v-card-text
                                          class="pa-0 ps-4 pe-4 pt-2"
                                        >
                                          <div>
                                            <v-divider></v-divider>
                                            <div class="font-weight-bold mt-1">
                                              교통수단
                                            </div>
                                            <div class="mb-2 mt-1">
                                              <v-chip
                                                variant="outlined"
                                                elevation="1"
                                                size="small"
                                                mandatory
                                                rounded
                                                selected-class="text-primary"
                                              >
                                                {{ item.vehicleName }}
                                              </v-chip>
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
                                                :value="item.cost"
                                                readonly
                                              ></v-text-field>
                                            </div>
                                            <v-divider></v-divider>
                                          </div>
                                        </v-card-text>
                                        <v-card-action
                                          class="d-flex justify-space-between align-center"
                                        >
                                          <!-- <div class="ms-2">
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
                                          ></v-btn> -->
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
                </v-card>
              </v-sheet>
            </v-container>
          </v-container>
        </template>
      </v-stepper>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.w-31 {
  width: 30%;
}

.w-69 {
  width: 67%;
}
</style>
