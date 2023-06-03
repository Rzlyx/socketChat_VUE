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
    contactor_list:[
      // {
      //   id: "21690096",
      //   name: "123456",
      //   picture:
      //     "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      //   signature:'111',
      //   highlighted: false,
      //   msg_type:1,
      //   status1: true,
      //   status2:true,
      //   status3:true,
      //   num: 0,

      // },
      // {
      //   id: "33336499",
      //   name: "456789",
      //   picture:
      //     "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      //   signature:'222',
      //   highlighted: false,
      //   msg_type:2,
      //   status1: true,
      //   status2:true,
      //   status3:true,
      //   num: 0
      // },
      // {
      //   id: "987456",
      //   name: "任隽延",
      //   picture:
      //     "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      //   signature:'333',
      //   highlighted: false,
      //   msg_type:3,
      //   status1: true,
      //   status2:true,
      //   status3:true,
      //   num: 0
      // },
    ],
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
    ],
    my_group_list: [
      {
        group_id: "13145738",
        group_name: "战地2042交流群",
        picture:
          "http://pic.imeitou.com/uploads/allimg/211216/3-211216094252640.jpg",
        signature:'111',
        highlighted: false,
        msg_type:1,
        status1: true,
        status2:true,
        status3:true,
        num: 0,
      },
      {
        group_id: "64225367",
        group_name: "战地5薯薯群",
        picture:
          "http://pic.imeitou.com/uploads/allimg/211216/3-21121609425U18.jpg",
        signature:'111',
        highlighted: false,
        msg_type:2,
        status1: true,
        status2:true,
        status3:true,
        num: 0,
      }
    ]


  },
  mutations: {
    updateContactList(state,contactList){
      state.contactor_list=contactList
    },
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