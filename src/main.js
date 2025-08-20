import { createApp } from 'vue';
import App from './App.vue';
import routes from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createRouter, createWebHistory } from 'vue-router';

console.log('=== MAIN.JS LOADING ===');

// Bootstrap CSS + JS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// BootstrapVue 3
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
// import { BContainer, BRow, BCol } from 'bootstrap-vue-3';

// Router setup
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Axios configuration
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 10000; // 10 second timeout
// Temporarily disable withCredentials for testing
axios.defaults.withCredentials = true;

// Axios interceptors
axios.interceptors.request.use(
  (config) => {
    // Avoid double baseURL in log
    const url = config.url.startsWith('http') ? config.url : (config.baseURL ? config.baseURL.replace(/\/$/, '') : '') + config.url;
    console.log('Making request to:', url);
    console.log('Request method:', config.method);
    console.log('Request data:', config.data);
    return config;
  }, 
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url);
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return response;
  }, 
  (error) => {
    console.error('Response interceptor error:', error);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Create app
const app = createApp(App);

// Plugins
app.use(router);
app.use(VueAxios, axios);
app.use(BootstrapVue3);

// Register global BootstrapVue3 components
// app.component('BContainer', BContainer);
// app.component('BRow', BRow);
// app.component('BCol', BCol);

// Mount app
console.log('=== MOUNTING VUE APP ===');
app.mount('#app');
console.log('=== VUE APP MOUNTED ===');
