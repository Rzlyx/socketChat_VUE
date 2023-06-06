import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    tem_name: "",
    MsgSum: 0,
    Contactor: 0,
    moments: 0,
    comment: 0,
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
    get_msg_user(state, msg_user) {
      var highlighted = false;
      var num = 0;
      if (msg_user && Array.isArray(msg_user)) {
        state.user_list = msg_user.map(function (user) {
          if(user.status==0){
            var status="danger"
          }else{
            var status="info"
          }
          return {
            id: user.id,
            name: user.name,
            new_msg: user.new_msg,
            time: user.time,
            picture: "http://192.168.2.220:8070/getPhotoByID/" + user.id,
            highlighted: highlighted,
            num: num,
            status:status
          };
        });
      } else {
        return
      }
    },
    get_moment_list(state, momentList) {
      if (Array.isArray(momentList) && momentList.length > 0) {
        // 循环处理每个朋友圈数据
        state.momentList = momentList.map(moment => {
          return {
            id: moment.id, // 朋友圈ID
            avatar: moment.user.avatar, // 用户头像
            username: moment.user.username, // 用户名字
            content: moment.content, // 朋友圈内容
            pictures: moment.pictures, // 图片列表
            time: moment.time, // 发布时间
            comments: moment.comments, // 评论列表
            likes: moment.likes, // 点赞列表
            isLiked: false // 是否已经点赞
          }
        })
      } else {
        state.momentList = []
      }
    },
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
    updateGList(state, listG) {
      state.my_group_list = listG
    },
    inspectMsg(context, userId) {
      var id =window.sessionStorage.getItem("userid")
      const targetObj = context.user_list.find(obj => obj.id === userId)
      var t = targetObj.num
      var contact_id = targetObj.id
      var info = {
        user_id: id,
        friend_id: contact_id
      }
      
      this.dispatch('update_msg_readtime', info)
      targetObj.num = 0;
      context.MsgSum -= t
    },
    addMessageLocal(context, messages) {
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

      //获取当前联系人的id，判断当前message里是否存在这个联系人
      const send_id = message.send_id
      if (context.message[send_id]) {
        context.message[send_id].push(message);
      } else {
        context.message[send_id] = [message];
      }

      const contactor_id = window.sessionStorage.getItem('contactor_id')
      const targetObj = context.user_list.find(obj => obj.id === send_id)
      //如果找到了

      if (targetObj) {
        if (contactor_id == message.send_id) {
          targetObj.new_msg = message.context
          targetObj.time = message.time
        }
        else {//如果当前页面不是这个联系人，那就是把气泡加一
          targetObj.new_msg = message.context
          targetObj.num++

          targetObj.new_msg = message.context
          targetObj.time = message.time

          context.MsgSum++
        }
      } else {//如果没找到，构建一个新的对象塞进去
        const targetObj2 = context.contactor_list.find(obj => obj.friend_id === send_id)
        if (message.msg_type==0||message.msg_type==6){
          //如果这个是通知消息，整个未读消息加1
          context.MsgSum++
          var status=""
        }else{
          var status="warning"
        }
        context.user_list.push({
          "id": send_id,
          "name": targetObj2.name,
          "new_msg": message.context,
          "time": message.time,
          "picture": 'http://192.168.1.208:8070/getPhotoByID/' + send_id,
          "highlighted": false,
          "num": 1,  //将这个用户的未读消息设为1
          "status":status
        })

        context.MsgSum++
      }

      this.dispatch('update_msg_user');
    },

  },
  actions: {
    async update_msg_user(context) {
      var id =window.sessionStorage.getItem("userid")
      const newContactorList = context.state.user_list.map(user => {
        if(user.status=="") var new_status=0
        else                var  new_status=1
        return {
          id: user.id,
          new_msg: user.new_msg,
          name: user.name,
          time: user.time,
          status: new_status
        };
      });
      try {
        const { data: res } = await axios.post('http://192.168.2.220:8070/setContactorList', {user_id:id,contactor_list:newContactorList});
        // 处理响应数据或其他操作
        if (res.code === 1000) {
        }else{
          console.log("更新信息失败",res)
        }
      } catch (error) {
        // 处理错误情况
      }
    },
    async get_user_info(context, id) {
      try {
        const { data: res } = await axios.post('http://192.168.2.220:8070/queryUserInfo', { user_id: id });
        // 处理响应数据或其他操作
        if (res.code === 1000) {
          context.tem_name = res.data.user_info.user_name
          return
        }
      } catch (error) {
        // 处理错误情况
      }
    },
    async update_msg_readtime(context, info) {
      try {
        const { data: res } = await axios.post('http://192.168.2.220:8070/setReadTime', info);
        // 处理响应数据或其他操作
        if (res.code === 1000) {
        }
      } catch (error) {
        // 处理错误情况
      }
    }
  },
  modules: {}
})
export default store
