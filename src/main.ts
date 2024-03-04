import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap-icons/font/bootstrap-icons.css';
 // Import component
 import Loading from 'vue3-loading-overlay';
 import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('Loading',Loading);
app.mount('#app')
