import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    MsgSum: 0,
    Contactor: 0,
    moments: 0,
    message: {
    },
    user_list: [
      {
        id: "21690096",
        name: "123456",
        new_msg: "打开我能打发色好你还是分的耐玩的怒诶dhyedgbuafbesyuf",
        time: "2023-05-22T08:15:00",
        picture:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        signature:'111',
        highlighted: false,
        num: 0,

      },
      {
        id: "33336499",
        name: "456789",
        new_msg: "早上好",
        time: "2023-05-23T09:45:00",
        picture:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        signature:'222',
        highlighted: false,
        num: 0
      },
      {
        id: "987456",
        name: "任隽延",
        new_msg: "中午好",
        time: "2023-05-21T14:20:00",
        picture:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        signature:'333',
        highlighted: false,
        num: 0
      },
    ],

  },
  mutations: {
    inspectMsg(state, userId) {
      const targetObj = state.user_list.find(obj => obj.id === userId)
      var t = targetObj.num
      targetObj.num = 0;
      state.MsgSum -= t
    },
    addMessageLocal(state, messages) {
      var last = messages.length - 1
      var receive_id = messages[last].receive_id
      state.message[receive_id] = messages
      var temp_message=messages[last]
      const targetObj = state.user_list.find(obj => obj.id === receive_id)
      targetObj.new_msg = temp_message.context
      targetObj.time=temp_message.time
    },


    addMessageReceive(state, message) {
      const send_id = message.send_id
      if (state.message[send_id]) {
        state.message[send_id].push(message);
      } else {
        state.message[send_id] = [message];
      }
      
      const contactor_id = window.sessionStorage.getItem('contactor_id')
      const targetObj = state.user_list.find(obj => obj.id === send_id)
      if (targetObj) {
        if (contactor_id == message.send_id) {
          targetObj.new_msg = message.context
          targetObj.time=message.time
        }
        else{
          targetObj.new_msg = message.context
          targetObj.num++
          targetObj.new_msg = message.context
          targetObj.time=message.time
          state.MsgSum++
        }
      }else{
        state.user_list.push({
          "id": send_id,
          "name": '',
          "new_msg": '',
          "time": message.time,
          "picture": '',
          "highlighted": false,
          "num": 1
        })
      }

    },

  },
  actions: {},
  modules: {}
})
export default store

/*
   {
        id: "21690096",
        name: "123456",
        new_msg: "打开我能打发色好你还是分的耐玩的怒诶dhyedgbuafbesyuf",
        time: "2023-05-22T08:15:00",
        picture:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        highlighted: false,
        num: 0,

    },
    {
        id: "21696499",
        name: "456789",
        new_msg: "早上好",
        time: "2023-05-23T09:45:00",
        picture:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        highlighted: false,
        num: 0
    },
    {
        id: "987456",
        name: "任隽延",
        new_msg: "中午好",
        time: "2023-05-21T14:20:00",
        picture:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        highlighted: false,
        num: 0
    },
*/ 