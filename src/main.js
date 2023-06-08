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
let heartbeatReceived = false; // 记录是否收到心跳包的标志
const heartbeatTimeout = 3000; // 心跳超时时间（单位：毫秒）
var sbda=true
function createWebSocket(token2) {
  socket = new WebSocket('ws://192.168.2.220:8070/ws/' + token2);

  socket.onopen = function () {
    console.log("连接成功");
    startHeartbeatTimer(); // 连接成功后启动心跳计时器
  };

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    if (message.msg_type === 999) {
      socket.send(JSON.stringify(message));
      heartbeatReceived = true; // 收到心跳包消息
    } else {
      store.commit('addMessageReceive', message);
    }
  };

  socket.onclose = function () {
    console.log("连接关闭");
    stopHeartbeatTimer(); // 连接关闭时停止心跳计时器
  };

  return socket;
}

function startHeartbeatTimer() {
  heartbeatReceived = false; // 重置心跳包接收标志
  setTimeout(function () {
    if (!heartbeatReceived) {
      if(sbda){
        Message.error("网络连接失败,刷新页面") 
        sbda=false
      }
        
    }
    startHeartbeatTimer(); // 重新启动心跳计时器
  }, heartbeatTimeout);
}

function stopHeartbeatTimer() {
  clearTimeout(); // 停止心跳计时器
  console.log("心跳计时器停止");
}



Vue.prototype.$getWebSocket = function () {
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
      tryReconnectWebSocket();
      const id = window.sessionStorage.getItem("userid");
      const { data: res } = await this.$http.post("http://192.168.2.220:8070/queryFriendList", { user_id: id });
      this.$store.commit('updateContactList', res.data.friend_list.friends);

      const { data: res2 } = await this.$http.post('http://192.168.2.220:8070/queryContactorList', { user_id: id });
      console.log(res2.data.contactor_list.contactor_list,5555555555)
      this.$store.commit('get_msg_user', res2.data.contactor_list.contactor_list)

      const { data: resG } = await this.$http.post("http://192.168.2.220:8070/QueryGroupList", { user_id: id });
      this.$store.commit('updateGList', resG.data)
      console.log(id)
      const { data: res3 } = await this.$http.post("http://192.168.2.220:8070/StartSendWebSocket", { user_id: id })


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
