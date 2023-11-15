<script setup></script>

<template>
  <header class="p-3 mb-3">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <div></div>
        <a
          href="/"
          class="d-flex align-items-center justify-content-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
        >
          <img class="logo" src="@/assets/img/logo.svg" alt="" />
        </a>
        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="@/assets/img/profile.svg"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul class="dropdown-menu text-small" style="">
            <li><a class="dropdown-item" href="#">MyPage</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container mt-4">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="#" class="nav-link">여행지</a></li>
          <li class="nav-item"><a href="#" class="nav-link">플래너</a></li>
          <li class="nav-item"><a href="#" class="nav-link">게시판</a></li>
          <li class="nav-item"><a href="#" class="nav-link">공지사항</a></li>
          <li class="nav-item">
            <!-- <router-link ></router-link>
            <a href="#" class="nav-link">QnA</a> -->
            <router-link class="nav-link" :to="{ name: 'QnA' }">QnA</router-link>
          </li>
        </ul>
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="#" class="nav-link">Login</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Join</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.logo {
  width: 60%;
}

.nav-link {
  color: black;
  font-weight: 600;
}
</style>
