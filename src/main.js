import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './lib/store.js';
import DefaultLayout from './layout/DefaultLayout.vue';
import globalComponents from './helpers/globalComponents.js';

const app = createApp(App);
app.component('DefaultLayout', DefaultLayout);
globalComponents(app);
app.use(store).use(router).mount('#app');
