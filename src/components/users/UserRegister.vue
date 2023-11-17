<script setup></script>

<template>
  <v-container class="pa-0 pt-1">
    <v-sheet
      class="d-flex flex-wrap justify-center pt-8 pb-14"
      :elevation="2"
      border
      rounded
    >
      <v-card
        class="mx-auto pa-16 pb-3 w-50 mt-14 mb-16"
        elevation="2"
        rounded="md"
      >
        <v-card-title class="text-center text-h5 font-weight-bold"
          >회원가입</v-card-title
        >

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          닉네임
        </div>

        <v-text-field
          density="compact"
          placeholder="Nickname"
          prepend-inner-icon="$card"
          variant="solo"
        ></v-text-field>

        <div class="text-subtitle-1 text-large-emphasis font-weight-medium">
          이메일
        </div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="$email"
          variant="solo"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호
        </div>

        <v-text-field
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-large-emphasis font-weight-medium d-flex align-center justify-space-between"
        >
          비밀번호 확인
        </div>

        <v-text-field
          :append-inner-icon="visible ? '$eyeOff' : '$eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="$lock"
          variant="solo"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          block
          class="mt-4 mb-16 font-weight-bold"
          color="#424242"
          size="large"
          variant="elevated"
        >
          회원가입
        </v-btn>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
