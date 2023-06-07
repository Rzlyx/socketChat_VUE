<template>
  <div class="chat-dialog" v-chat-scroll>
    <div class="select">
      <p>
        {{ user.remark }}
      </p>
    </div>
    <div class="chat-container">
      <div v-for="message in messages" :key="message.id" class="message-container">
        <img :src="avatar" alt="Avatar" class="avatar" v-if="message.send_id !== userId">
        <div class="message-wrapper" :class="message.send_id === userId ? 'me' : 'other'">
          <div class="message" :class="message.send_id === userId ? 'me' : 'other'">
            <template v-if="message.type === 1">
              <img :src="url_photo + message.id" class="message-image" alt="Image">
            </template>
            <template v-else>
              {{ message.context }}
            </template>
            <!-- <span class="message-time">{{ message.time }}</span> -->
          </div>
        </div>
        <img :src="avatar" alt="Avatar" class="avatar me" v-if="message.send_id === userId">
      </div>
    </div>


    <div class="select2">
      <div>
        <el-upload class="upload-demo" action="http://192.168.2.172:8070/uploadPrivateChatPhoto"
          :before-upload="handleBeforeUpload" :data="picture_msg" :on-error="pic_err" :on-success="pic_success" name="img"
          :show-file-list="false">
          <el-tooltip class="item" effect="dark" content="发送图片" placement="top">
            <i class="el-icon-picture-outline"></i>
          </el-tooltip>
        </el-upload>
      </div>
      &nbsp; &nbsp;
      <div>
        <el-tooltip class="item" effect="dark" content="视频聊天" placement="top">
          <i class="el-icon-video-camera" @click="video_chat()"></i>
        </el-tooltip>
      </div>
      &nbsp; &nbsp;
      <div>
        <el-tooltip class="item" effect="dark" content="电话聊天" placement="top">
          <i class="el-icon-phone-outline"></i>
        </el-tooltip>
      </div>
      &nbsp; &nbsp;
      <div @click="get_history_msg()">
        <el-tooltip class="item" effect="dark" content="历史消息" placement="top">
          <i class="el-icon-timer" @click="drawer = true"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="input-box">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message here...">
      <button class="send-btn" @click="sendMessage">Send</button>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="40%">
      <div class="block" style="height: 100%;">
        <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="showTime()"
          value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
        <div class="history_msg">
          <div class="history_msg_item" v-for="item in history_msg_list" :key="item.id">
            <div class="history_msg_info">{{ item.name }} &nbsp; {{ item.time }}</div>
            <div class="history_msg_context">{{ item.context }}</div>
          </div>

        </div>
      </div>
    </el-drawer>
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
      url_photo: "http://192.168.2.172:8070/getPhotoByID/",
      history_msg_list: [
        {
          id: "1",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "2",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "3",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "4",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "5",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "6",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "7",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "8",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
        {
          id: "9",
          msg_type: '2',
          context: "今晚吃什么？？？？",
          time: '2023-05-15 15:16:45',
          send_id: "43234",
          receive_id: '45354',
          type: '1',
        },
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',

      drawer: false,
      user: {
        id: '',
        username: '123456',
        remark: '',
        identif: 1,
        picture: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      },
      messages: [

      ],
      newMessage: '',
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      otheravatar: '',
      userId: '',
      contactorId: '',
      picture_msg: {
        id: "",
        context: "",
        time: "",
        send_id: "",
        receive_id: "",
        type: 1,
        msg_type: 0
      }
    };
  },
  methods: {
    pic_success() {
      this.messages.push({
        id:this.picture_msg.id,
        context:this.picture_msg.context,
        time:this.picture_msg.time,
        send_id:this.picture_msg.send_id,
        receive_id:this.picture_msg.receive_id,
        type:this.picture_msg.type,
        msg_type:this.picture_msg.msg_type
      });
      this.$store.commit('addMessageLocal', this.messages);
      this.$getWebSocket().send(JSON.stringify(this.messages[this.messages.length - 1]));
    },
    pic_err(error, file) {
      console.error('文件上传失败', error, file);
    },
    handleBeforeUpload() {
      var id = this.generateID()
      this.picture_msg.id = id
      this.picture_msg.context = "[图片]"
      this.picture_msg.time = this.getCurrentTime()
      this.picture_msg.send_id = this.userId
      this.picture_msg.receive_id = this.contactorId
      console.log(this.messages)
    },


    showTime() {
      console.log(this.value2)
    },
    get_remark() {
      const targetObj2 = this.$store.state.contactor_list.find(obj => obj.friend_id === this.contactorId)
      this.user.remark = targetObj2.name
    },
    get_history_msg() {

    },
    video_chat() {
      this.$router.push('/video_chat')
    },
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
        type: 0,
        msg_type: 0
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
    this.get_remark()
  },

};
</script>
    
<style scoped>
.message-image {
  height: 100px;
  width: 60px;
}

.history_msg_info {
  font-size: 10px;
  color: #64b5f6;
}

.history_msg_item {
  width: 100%;
  margin-top: 5px;
}

.history_msg {
  width: 88%;
  height: 85%;
  background-color: #ccc;
  margin-left: 6%;
  margin-top: 8px;
}

.el-icon-picture-outline:hover {
  cursor: pointer;
  color: blue;
}

.el-icon-video-camera:hover {
  cursor: pointer;
  color: blue;
}

.el-icon-phone-outline:hover {
  cursor: pointer;
  color: blue;
}

.el-icon-timer:hover {
  cursor: pointer;
  color: blue;
}

.select2 {
  height: 4%;
  display: flex;
  width: 100%;
  height: 30px;
}

.select {
  margin: 0;
  top: 0;
  /* display: flex; */
  font-weight: bold;
  width: 100%;
  height: 5%;
}

.chat-dialog {
  border: 1px solid #ccc;
  height: 100%;
  padding-top: 0px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 16px;
  /* 添加此行，移动 padding 到 .chat-dialog */
  position: relative;
}

.chat-container {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 82%;
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