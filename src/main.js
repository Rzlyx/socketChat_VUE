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
  socket = new WebSocket('ws://192.168.1.181:8080/ws/' + token2);

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
    window.sessionStorage.removeItem("token");
    // 登录成功的事件
    this.$root.$on('loginSuccess', async () => {
      const id = window.sessionStorage.getItem("userid");
      const { data: res } = await this.$http.post("http://127.0.0.1:8070/queryFriendList", { user_id: parseInt(id, 10) });
      this.$store.commit('updateContactList', res.data.friend_list.friends);
      tryReconnectWebSocket();
    });

    tryReconnectWebSocket();
  },
  beforeDestroy() {


    // 当页面刷新时，重新建立连接
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  },
  
}).$mount('#app');
