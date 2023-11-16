import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"


import App from "./App.vue";
import router from "./router";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as styles from "vuetify/styles";

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
} from "@mdi/js";

const vuetify = createVuetify({
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

// app.mount("#app");
app.use(vuetify).mount("#app");
