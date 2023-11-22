<script setup>
import { ref, watch, onMounted, onUpdated } from 'vue';
import PlanSpotList from '../plan/item/PlanSpotList.vue';
import { listVehicle } from '../../api/plan.js';

const plan = ref({
    title: '',
    headCount: 1,
    start: new Date(),
    end: new Date(),
    theme: '',
});

const vehicles = ref([]);
onMounted(() => {
    getVehicles();
});

watch(plan.value, (newValue, oldValue) => {
    getDiff();
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
const planDetails = ref([
    [],
    [{ title: '1 test1' }],
    [{ title: '2 test1' }, { title: '2 test2' }],
    [{ title: '3 test1' }, { title: '3 test2' }, { title: '3 test3' }],
]);

// PlanWriter 에서 선택한 tab(1일차, 2일차... 에서 1, 2 같은 숫자)을 PlanSpotList에 전달(props)
// PlanSpotList에서 props로 전달받은 tab을 이용, 선택한 장소의 spotId, img, title, addr, tab을 하나로 묶어서 객체로 만들고 PlanWriter에 전달(emit)
// emit 이벤트 핸들러에서 전달 받으면 planDetails[tab]에 push

watch(tab, (newValue, oldValue) => {
    console.log(tab.value);
});

const data = ref({
    tab: null, // dateOrder
    detailIndex: null, // order
    spotId: null, // 장소 id
    title: null, // 장소 이름
    image: null, // 장소 이미지
    addr: null, // 장소 주소
    order: null, // 배열에서 순서 >> 해당 일차의 상세계획에서 순서
    vehicle: null,
    cost: null,
});

// index의 경우는?

// v-model로?
// vehicle: null,
// cost: null

// emit으로 데이터 받아서 planDetails[tab] 에 넣기
const addPlanDetail = (args) => {
    console.log('args', args);
    data.value.tab = args.tab;
    data.value.detailIndex = args.detailIndex;
    data.value.spotId = args.spotId;
    data.value.title = args.title;
    data.value.image = args.image;
    data.value.addr = args.addr;

    console.log('data', data.value);

    planDetails[data.value.tab].push(data);
};
</script>

<template>
    <v-container class="pa-0 pt-1 d-flex">
        <v-stepper :items="['여행정보입력', '여행일정추가', '미리보기']" class="w-100">
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
                                                            {{ item.title }}
                                                            {{ index }}
                                                            <!-- 카드 1개 PlanDetails 정보가 담겨있음 -->
                                                            <v-card class="border ma-2" hover>
                                                                <v-img
                                                                    class="border ma-2 rounded elevation-2"
                                                                    :height="120"
                                                                    aspect-ratio="16/9"
                                                                    src="../src/assets/img/default.png"
                                                                ></v-img>
                                                                <v-card-title
                                                                    class="pa-0 ps-4 pe-4 pb-2"
                                                                    >Spot Title</v-card-title
                                                                >
                                                                <v-card-subtitl
                                                                    class="pa-0 ps-4 pe-4"
                                                                    >Spot 주소</v-card-subtitl
                                                                >

                                                                <v-card-text
                                                                    class="pa-0 ps-4 pe-4 pt-2"
                                                                >
                                                                    <div>
                                                                        <v-divider></v-divider>
                                                                        <div
                                                                            class="font-weight-bold mt-1"
                                                                        >
                                                                            교통수단
                                                                        </div>
                                                                        <div class="px-4 mb-1">
                                                                            <!-- click? v-model -->
                                                                            <v-chip-group>
                                                                                <v-chip
                                                                                    variant="outlined"
                                                                                    elevation="1"
                                                                                    size="x-small"
                                                                                    mandatory
                                                                                    rounded
                                                                                    selected-class="text-primary"
                                                                                    v-for="vehicle in vehicles"
                                                                                    :key="
                                                                                        vehicle.id
                                                                                    "
                                                                                    :value="
                                                                                        vehicle.id
                                                                                    "
                                                                                    >{{
                                                                                        vehicle.name
                                                                                    }}</v-chip
                                                                                >
                                                                            </v-chip-group>
                                                                        </div>
                                                                        <v-divider></v-divider>
                                                                        <div class="px-4 mb-2">
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
                                                                                v-model="data.cost"
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
                                                                        <span
                                                                            class="subheading me-2"
                                                                            >256</span
                                                                        >
                                                                    </div>
                                                                    <v-btn
                                                                        color="#424242"
                                                                        class="me-1"
                                                                        icon="$minus"
                                                                        variant="text"
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
