<script setup>
import { ref, watch, onBeforeMount } from "vue";
import VKakaoMap from "../common/VKakaoMap.vue";
import { useRouter } from "vue-router";
import {
  getSidoList,
  getGugunList,
  getSpotTypList,
  search,
} from "../../api/spot.js";

onBeforeMount(() => {
  getSido();
  getSpotType();
});

const router = useRouter();

// 목록에 나올 리스트
const sidoItems = ref([{ code: 0, name: "" }]);
const gugunItems = ref([{ code: 0, name: "" }]);
const spotTypeItems = ref([]);

const getSido = () => {
  getSidoList(
    {},
    ({ data }) => {
      sidoItems.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};
const getGugun = (param) => {
  getGugunList(
    param,
    ({ data }) => {
      sidoCode.value = param.sidoCode;
      const gugun = [{ code: "", name: "전체", sidoCode: param.sidoCode }];
      gugun.concat(data.dataBody);
      gugunItems.value = gugun.concat(data.dataBody);
    },
    (error) => {
      console.log(error);
    }
  );
};
const getSpotType = () => {
  getSpotTypList(
    {},
    ({ data }) => {
      spotTypeItems.value = data.dataBody;
    },
    (error) => {
      console.log(error);
    }
  );
};

const currentPage = ref(0);
const totalPage = ref(0);
const pageSize = ref(5);

// 선택된 시도 code, 구군 code, spotType code
const sidoCode = ref("");
const gugunCode = ref("");
const spotTypeCode = ref("");
const query = ref("");

// search 결과로 반환받은 여행지 정보 >> 여기서 latitude, longitude 뽑아서 마커에 찍기
const spotItems = ref([]);

watch(sidoCode, (newValue, oldValue) => {
  const param = {
    sidoCode: sidoCode.value,
  };
  getGugun(param);
});

const spotPositions = ref([]);

const spotSearch = (page, size, sido, gugun, type, input) => {
  console.log(`${sido} ${gugun} ${type} ${input}`);
  console.log(`size :  ${size}`);
  search(
    {
      page: page,
      size: size,
      sidoCode: sido,
      gugunCode: gugun,
      typeId: type,
      query: input,
    },
    ({ data }) => {
      console.log(data);
      spotItems.value = data.dataBody.data;
      currentPage.value = data.dataBody.currentPage;
      totalPage.value = data.dataBody.totalPage;
      pageSize.value = data.dataBody.size;
      sidoCode.value = sido;
      gugunCode.value = gugun;
      spotTypeCode.value = type;
      query.value = input;

      console.log("spotItems", data.dataBody.data);

      // spotItems.forEach((element) => {
      //   spotPositions.push({
      //     latitude: element.latitude,
      //     longitude: element.longitude,
      //   });
      // });
    },
    (error) => {
      console.log(error);
    }
  );
};

watch(
  () => spotItems.value,
  (newValue, oldValue) => {
    spotPositions.value = newValue.map((element) => ({
      latitude: element.latitude,
      longitude: element.longitude,
    }));

    console.log("spotPositions이 변경되었습니다", spotPositions);
  }
);

// spotPositions.value = spotItems.value.map((element) => ({
//         latitude: element.latitude,
//         longitude: element.longitude,
//       }));

// spotPositions.value.forEach((element) => {
//   console.log(element);
// });

const clickItem = (index) => {
  router.push({
    name: "spot-view",
    params: {
      id: spotItems.value[index].id,
    },
  });
};
</script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center pb-14"
      :elevation="2"
      border
      rounded
    >
      <v-expansion-panels>
        <v-expansion-panel class="elevation-2">
          <v-expansion-panel-title
            class="font-weight-bold"
            text-color="white"
            color="#424242"
          >
            검색
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container
              class="border pa-0 ps-4 pe-4 pt-5 pb-5 w-75 elevation-2 rounded"
            >
              <v-row>
                <v-col>
                  <v-select
                    label="시 선택"
                    :items="sidoItems"
                    item-title="name"
                    item-value="code"
                    variant="outlined"
                    density="compact"
                    v-model="sidoCode"
                    hide-details
                    clearable
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    label="구군 선택"
                    :items="gugunItems"
                    item-title="name"
                    item-value="code"
                    variant="outlined"
                    density="compact"
                    v-model="gugunCode"
                    hide-details
                    clearable
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-sheet elevation="2">
                    <v-chip-group
                      mandatory
                      selected-class="text-primary"
                      class="justify-center"
                      v-model="spotTypeCode"
                    >
                      <v-chip
                        v-for="item in spotTypeItems"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </v-chip>
                    </v-chip-group>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    density="compact"
                    variant="solo"
                    label="검색어"
                    append-inner-icon="$magnify"
                    single-line
                    hide-details
                    v-model="query"
                    clearable
                    @click:appendInner="
                      spotSearch(
                        1,
                        pageSize,
                        sidoCode,
                        gugunCode,
                        spotTypeCode,
                        query
                      )
                    "
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card
        class="mx-auto ps-4 pe-4 pt-4 pb-3 w-75 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-row>
          <v-col cols="5">
            <v-sheet class="ms-2 me-1 border">
              <VKakaoMap :spotPositions="spotPositions"></VKakaoMap>
            </v-sheet>
          </v-col>
          <v-col
            ><v-sheet class="ms-1 me-2 border">
              <v-card
                class="ps-16 pe-16 pt-6 pb-6 mt-2 mb-14"
                elevation="2"
                rounded="md"
              >
                <v-list lines="three">
                  <v-list-subheader class="font-weight-bold"
                    >Spot</v-list-subheader
                  >
                  <v-list-item
                    v-for="(item, index) in spotItems"
                    :key="item.id"
                    :prepend-avatar="
                      item.image != ''
                        ? item.image
                        : '../src/assets/img/profile.png'
                    "
                    :title="item.title"
                    :subtitle="item.addr"
                    elevation="2"
                    @click="clickItem(index)"
                  ></v-list-item>
                </v-list>
              </v-card>
              <v-pagination
                class="mt-3 mb-10"
                :length="totalPage"
                show-first-last-page="true"
                @click="
                  spotSearch(
                    currentPage,
                    pageSize,
                    sidoCode,
                    gugunCode,
                    spotTypeCode,
                    query
                  )
                "
                v-model="currentPage"
              ></v-pagination></v-sheet
          ></v-col>
        </v-row>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.map {
  width: 35%;
}

.spot-list {
  width: 65%;
}
</style>
