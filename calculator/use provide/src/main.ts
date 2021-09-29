import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret, faClock, faBackspace, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';

library.add(faUserSecret, faClock, faBackspace, faTrash);

const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.use(router);
app.mount('#app');