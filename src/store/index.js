import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    tem_name:"",
    MsgSum: 0,
    Contactor: 0,
    moments: 0,
    message: {
    },
    contactor_list: [
    ],
    user_list: [
    ],
    my_group_list: [
      {
        group_id: "13145738",
        group_name: "战地2042交流群",
        picture:
          "http://pic.imeitou.com/uploads/allimg/211216/3-211216094252640.jpg",
        signature: '111',
        highlighted: false,
        msg_type: 1,
        status1: true,
        status2: true,
        status3: true,
        num: 0,
      },
      {
        group_id: "64225367",
        group_name: "战地5薯薯群",
        picture:
          "http://pic.imeitou.com/uploads/allimg/211216/3-21121609425U18.jpg",
        signature: '111',
        highlighted: false,
        msg_type: 2,
        status1: true,
        status2: true,
        status3: true,
        num: 0,
      }
    ]


  },
  mutations: {
    get_msg_user(state, msg_user) {
      var highlighted = false;
      var num = 0;
      if(msg_user && Array.isArray(msg_user)){
        state.user_list = msg_user.map(function (user) {
          return {
            id: user.id,
            name: user.name,
            new_msg: user.message,
            time: user.time,
            picture: "http://192.168.1.208:8070/getPhotoByID/" + user.id,
            highlighted: highlighted,
            num: num
          };
        });
      }else{
        return
      }
      

    },
    updateContactList(state, contactList) {
      state.contactor_list = contactList
    },
    inspectMsg(state, userId) {
      const targetObj = state.user_list.find(obj => obj.id === userId)
      var t = targetObj.num
      targetObj.num = 0;
      state.MsgSum -= t
    },
    addMessageLocal(context, messages) {
      console.log(messages)
      var last = messages.length - 1
      var receive_id = messages[last].receive_id
      context.message[receive_id] = messages
      var temp_message = messages[last]
      const targetObj = context.user_list.find(obj => obj.id === receive_id)
      targetObj.new_msg = temp_message.context
      targetObj.time = temp_message.time
      this.dispatch('update_msg_user');
    },


    async addMessageReceive(context, message) {
      const send_id = message.send_id
      if (context.message[send_id]) {
        context.message[send_id].push(message);
      } else {
        context.message[send_id] = [message];
      }

      const contactor_id = window.sessionStorage.getItem('contactor_id')
      
      const targetObj = context.user_list.find(obj => obj.id === send_id)
      if (targetObj) {
        
        if (contactor_id == message.send_id) {
          targetObj.new_msg = message.context
          targetObj.time = message.time
        }
        else {
          targetObj.new_msg = message.context
          targetObj.num++
         
          targetObj.new_msg = message.context
          targetObj.time = message.time

          context.MsgSum++
        }
      } else {
        const targetObj2 = context.contactor_list.find(obj => obj.friend_id === send_id)
        console.log(targetObj2)
        context.user_list.push({
          "id": send_id,
          "name": targetObj2.name,
          "new_msg": message.context,
          "time": message.time,
          "picture": 'http://192.168.1.208:8070/getPhotoByID/'+send_id,
          "highlighted": false,
          "num": 1
        })
        
        context.MsgSum++
      }
      this.dispatch('update_msg_user');
    },

  },
  actions: {
    async update_msg_user(context) {
      try {
        const { data: res } = await axios.post('http://192.168.1.208:8070/setContactorList', context.state.user_list);
        // 处理响应数据或其他操作
        if (res.code === 1000) {
          console.log("更新成功")
        }
      } catch (error) {
        // 处理错误情况
      }
    },
    async get_user_info(context,id) {
      try {
        const { data: res } = await axios.post('http://192.168.1.208:8070/queryUserInfo', {user_id:id});
        // 处理响应数据或其他操作
        if (res.code === 1000) {
          context.tem_name=res.data.user_info.user_name
          console.log(context.tem_name,11111)
          return 
        }
      } catch (error) {
        // 处理错误情况
      }
    }
  },
  modules: {}
})
export default store
