import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret, faClock, faBackspace, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faUserSecret, faClock, faBackspace, faTrash);

const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.provide('$store', store);
app.use(store);
app.use(router);
app.mount('#app');
