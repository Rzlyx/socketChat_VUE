<template>
  <div class="chat-dialog" v-chat-scroll>
    <div class="chat-container">
      <div v-for="message in messages" :key="message.id" class="message-container">
        <img :src="avatar" alt="Avatar" class="avatar" v-if="message.send_id !== userId">
        <div class="message-wrapper" :class="message.send_id === userId ? 'me' : 'other'">
          <div class="message" :class="message.send_id === userId ? 'me' : 'other'">
            {{ message.context }}
          </div>
        </div>
        <img :src="avatar" alt="Avatar" class="avatar me" v-if="message.send_id === userId">
      </div>
    </div>
    <div class="input-box">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message here...">
      <button class="send-btn" @click="sendMessage">Send</button>
    </div>
  </div>
</template>
    
<script>
import VueChatScroll from "vue-chat-scroll";

export default {
  name: "ChatDialog",
  directives: {
    "chat-scroll": VueChatScroll.directive,
  },
  data() {
    return {
      messages: [

      ],
      newMessage: '',
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      otheravatar: '',
      userId: '',
      contactorId: '',
      send_message: {
        id: '',
        context: ' ',
        time: '',
        send_id: '',
        receive_id: '',
        type: '1',
      }
    };
  },
  methods: {
    getCurrentTime() {
      const now = new Date();

      // 获取年份
      const year = now.getFullYear();

      // 获取月份（注意月份从 0 开始，所以需要加 1）
      const month = now.getMonth() + 1;

      // 获取日期
      const date = now.getDate();

      // 获取小时
      const hours = now.getHours();

      // 获取分钟
      const minutes = now.getMinutes();

      // 获取秒钟
      const seconds = now.getSeconds();
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
      const formattedDateTime = `${formattedDate} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return formattedDateTime
    },
    generateMsgId() {
      let id = this.messages.length + 1;
      while (this.messages.findIndex(msg => msg.id === id) !== -1) {
        id++;
      }
      return id.toString();
    },
    generateID() {
      return new Date().getTime().toString()
    },
    sendMessage() {

      if (this.newMessage === "") return;
      this.messages.push({
        id: this.generateID(),
        context: this.newMessage,
        time: this.getCurrentTime(),
        send_id: this.userId,
        receive_id: this.contactorId,
        type: '1',
      });

      this.$store.commit('addMessageLocal', this.messages);


      this.$getWebSocket().send(JSON.stringify(this.messages[this.messages.length - 1]))
      this.newMessage = "";
      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector('.chat-container')
        chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight
      });

    },
    
  },
  mounted() {
  },
  created() {
    //获取数据
    this.userId = window.sessionStorage.getItem("userid"),
      this.contactorId = this.$route.params.userId
    this.messages = this.$store.state.message[this.contactorId]
    if (this.messages == undefined) {
      this.messages = []
    }

    this.$store.commit('inspectMsg', this.contactorId);
    
  },

};
</script>
    
<style scoped>
.chat-dialog {
  border: 1px solid #ccc;
  height: 100%;
  padding: 10px;
  position: relative;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  padding: 16px;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.message-container {
  display: flex;
  align-items: flex-end;
  margin-top: 16px;
  justify-content: flex-start;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.message-wrapper.me {
  margin-left: auto;
}

.message-wrapper.other {
  margin-right: auto;
}

.message {
  display: inline-block;
  padding: 8px;
  margin: 4px;
  max-width: 70%;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: left;
  word-wrap: break-word;

  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.me .message {
  background-color: #4CAF50;
  color: #ffffff;
  margin-left: auto;
  margin-right: 5px;
}

.other .message {
  background-color: #ffffff;
  margin-left: 5px;
  margin-right: auto;
}

.me .message:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -12px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 12px solid #4CAF50;
  transform: translateY(-50%);
  z-index: 1;
}

.other .message:after {
  content: "";
  position: absolute;
  top: 50%;
  left: -12px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid #ffffff;
  transform: translateY(-50%);
  z-index: 1;
}

.input-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  padding: 8px;
  background-color: #fff;
}

input[type="text"] {
  flex: 1;
  padding: 5px;
  border-radius: 5px;
  border: none;
  height: 40px;
}

input[type="text"]:focus {
  outline: none;
}

button.send-btn {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  background-color: #64b5f6;
  color: #fff;
  border: none;
  font-size: 16px;
}
</style>