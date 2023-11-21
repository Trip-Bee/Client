<script setup>
import { ref } from 'vue';
import SpotList from '../spot/SpotList.vue';

const plan = ref({
    title: '',
    headCount: 0,
    start: '',
    end: '',
});
</script>

<template>
    <v-container class="pa-0 pt-1">
        <v-sheet class="d-flex flex-wrap justify-center pt-8 pb-14" :elevation="2" border rounded>
            <v-stepper :items="['여행정보입력', '여행일정추가', '미리보기']" class="w-85">
                <template v-slot:item.1>
                    <div class="d-flex flex-wrap justify-center">
                        <v-card class="w-75" title="여행정보입력" flat>
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
                            <div class="d-flex justify-space-between">
                                <v-date-picker
                                    color="#424242"
                                    elevation="2"
                                    show-adjacent-months
                                    header="시작일"
                                    title="title"
                                    hide-weekdays
                                ></v-date-picker>
                                <v-date-picker
                                    color="#424242"
                                    elevation="2"
                                    show-adjacent-months
                                    header="종료일"
                                    title="title"
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

                <template v-slot:item.2>
                    <v-card title="여행일정추가" flat>
                        <SpotList></SpotList>
                    </v-card>
                </template>

                <template v-slot:item.3>
                    <v-card title="미리보기" flat></v-card>
                </template>
            </v-stepper>
        </v-sheet>
    </v-container>
</template>

<style scoped>
.w-85 {
    width: 85%;
}
</style>
