import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    MsgSum: 0,
    Contactor: 0,
    moments: 0,
    comment: 0,
    message: {
    },
    contactor_list: [
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
        signature: '111',
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
        signature: '222',
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
    ],
    my_friends_list: [
      {
        friendship_id: '13746435',
        friend_id: '1575346457',
        name: '小明'
      }
    ],
    //动态列表
    moment_list: [
      {
        id: "21690096",
        name: "123456",
        avator:
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        new_msg: "今天天气好好呀！",
        time: "2023-05-22T08:15:00",
        picture: [
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          // 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],

        likes: [
          // {
          //   id: '12966',
          //   name: '小明'
          // },
          // {
          //   id: '43805',
          //   name: '小红'
          // }
        ],
        comments: [
          {
            id: '29664',
            name: '小刚',
            content: '确实不错！'
          },
          {
            id: '12345',
            name: '小利',
            content: '嗯，天气真好！'
          },
        ]
      },
      {
        id: "21696499",
        name: "456789",
        avator:
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        new_msg: "早上好",
        time: "2023-05-23T09:45:00",
        picture: [
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        ],

        likes: [
          {
            id: '12966',
            name: '小明'
          },
          {
            id: '43805',
            name: '小红'
          }
        ],
        comments: [
          {
            id: '29664',
            name: '小刚',
            content: '确实不错！'
          }
        ]
      },
      {
        id: "987456",
        name: "任隽延",
        avator:
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        new_msg: "中午好",
        time: "2023-05-21T14:20:00",
        picture: [
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],

        likes: [
          {
            id: '12966',
            name: '小明'
          },
          {
            id: '43805',
            name: '小红'
          }
        ],
        comments: [
          {
            id: '29664',
            name: '小刚',
            content: '确实不错！'
          }
        ]
      },

    ],


  },
  mutations: {
    momentLikes(state, like_info) {
      const target_moment = state.moment_list[like_info.index]// 第一步：根据传入的 index 取出目标动态对象
      const existing_like = target_moment.likes.find(like => like.id === like_info.id)// 第二步：判断用户是否重复点赞了该动态
      if (existing_like) {// 第三步：如果是重复点赞，则取消点赞
        target_moment.likes = target_moment.likes.filter(like => like.id !== like_info.id)
      }
      else { // 第四步：如果是新的点赞，则将点赞对象添加到列表中
        target_moment.likes.push({
          id: like_info.id,
          name: like_info.name
        })
      }
    },
    momentComments(state, comment_info) {
      state.moment_list[comment_info.index].comments.push({
        id: comment_info.id,
        name: comment_info.name,
        content: comment_info.content,
      })
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
    addMessageLocal(state, messages) {
      var last = messages.length - 1
      var receive_id = messages[last].receive_id
      state.message[receive_id] = messages
      var temp_message = messages[last]
      const targetObj = state.user_list.find(obj => obj.id === receive_id)
      targetObj.new_msg = temp_message.context
      targetObj.time = temp_message.time
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
          targetObj.time = message.time
        }
        else {
          targetObj.new_msg = message.context
          targetObj.num++
          targetObj.new_msg = message.context
          targetObj.time = message.time
          state.MsgSum++
        }
      } else {
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