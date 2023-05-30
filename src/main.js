import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/global.css';
import './plugins/element.js';
import { Message } from 'element-ui';
import store from './store/index';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$message = Message;

let socket = null; // 全局 WebSocket 连接

function createWebSocket(token2) {
  socket = new WebSocket('ws://192.168.1.131:8080/ws/' + token2);

  socket.onopen = function () {
    console.log("连接成功")
  };

  socket.onmessage = function (event) {
    
    const message = JSON.parse(event.data); 
    store.commit('addMessageReceive', message);
  };

  return socket;
}

Vue.prototype.$getWebSocket = function() {
  if (!socket) {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      socket = createWebSocket(token);
    }
  }
  return socket;
};

function tryReconnectWebSocket() {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    const existingSocket = socket;

    if (existingSocket && existingSocket.readyState === WebSocket.OPEN) {
      existingSocket.close();
    }

    socket = createWebSocket(token);
  }
}

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$root.$on('loginSuccess', () => {
      tryReconnectWebSocket();
    });

    tryReconnectWebSocket();
  },
  beforeDestroy() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  },
}).$mount('#app');
