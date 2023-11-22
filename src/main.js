import { createApp } from "vue";
import { createPinia } from "pinia";
import { useMemberStore } from "./stores/member";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as styles from "vuetify/styles?main.css";

// vurify icon
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiAccount,
  mdiLogout,
  mdiFacebook,
  mdiTwitter,
  mdiInstagram,
  mdiLinkedin,
  mdiGithub,
  mdiChevronRight,
  mdiMagnify,
  mdiEyeOff,
  mdiEye,
  mdiEmailOutline,
  mdiLockOutline,
  mdiCardTextOutline,
  mdiClose,
  mdiHeart,
  mdiPlusThick,
  mdiMinusThick,
} from "@mdi/js";

const vuetify = createVuetify({
  lang: {
    current: "ko",
  },
  components,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      account: mdiAccount,
      logout: mdiLogout,
      facebook: mdiFacebook,
      twitter: mdiTwitter,
      instagram: mdiInstagram,
      linkedin: mdiLinkedin,
      github: mdiGithub,
      chevronRight: mdiChevronRight,
      magnify: mdiMagnify,
      eyeOff: mdiEyeOff,
      eye: mdiEye,
      email: mdiEmailOutline,
      lock: mdiLockOutline,
      card: mdiCardTextOutline,
      close: mdiClose,
      heart: mdiHeart,
      plus: mdiPlusThick,
      minus: mdiMinusThick,
    },
    sets: {
      mdi,
    },
  },
  directives,
  styles,
});

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

const memberStore = useMemberStore();
memberStore.isLogin();

app.use(vuetify).mount("#app");
