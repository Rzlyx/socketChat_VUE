import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { Message } from 'element-ui';

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    temp_group_info:{},
    temp_contactor_info:{},
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
    get_msg_user(context, msg_user) {
      console.log(msg_user,1111)
      var highlighted = false;
      var num = 0;
      if(msg_user==null){
        context.user_list = [];
        return
      }
      // var filteredMsgUser = msg_user.filter(function (user) {
      //   var temp_id = user.id;
      //   const targetObj = context.contactor_list.find(contact => contact.friend_id == temp_id);
      //   return targetObj; // 只保留存在于 contactor_list 中的元素
      // });
      if (msg_user && Array.isArray(msg_user)) {
        context.user_list = msg_user.map(function (user) {
          if (user.status == 0) {
            var status = "danger";
          } else {
            var status = "info";
          }
          return {
            id: user.id,
            name: user.name,
            new_msg: user.new_msg,
            time: user.time,
            picture: "http://192.168.2.220:8070/getPhotoByID/" + user.id,
            highlighted: highlighted,
            num: num,
            status: status
          };
        });
        
      } else {
        context.user_list = []; // 如果 filteredMsgUser 为空数组或不是数组，将 user_list 重置为空数组
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
      var id = window.sessionStorage.getItem("userid")
      const targetObj = context.user_list.find(obj => obj.id === userId)
      if(targetObj==null){
        return
      }
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
      const target_contact= context.contactor_list.find(obj=>obj.friend_id==receive_id)
       const target_group= context.my_group_list.find(obj=>obj.group_id==receive_id)
       console.log(target_contact,target_group,2222222)
       //如果是好友
      if (target_contact!=null&&target_group==null){
        //是好友，但没在首页
        if(targetObj==null){
          var info={user_id:temp_message.send_id,friend_id:receive_id}
          this.dispatch('get_contactor_info',info)
          if(context.temp_contactor_info.is_private_chat_gray==false)  var status="error"
          else  var status="info"
          var user={
            id: target_contact.friend_id,
            name: target_contact.name,
            new_msg: temp_message.context,
            time: temp_message.time,
            picture: "http://192.168.2.220:8070/getPhotoByID/" + target_contact.friend_id,
            highlighted: true,
            num: 0,
            status: status
          }
          context.user_list.push(user)
        }else{
          targetObj.new_msg = temp_message.context
          targetObj.time = temp_message.time
        }
        //是群
      }else if(target_contact==null&&target_group!=null){
        console.log(targetObj)
        if(targetObj==null){
          var info={user_id:temp_message.send_id,group_id:receive_id}
          
          //获取消息
          this.dispatch('get_group_info',info).then(group_info=>{
            info=group_info
            
          })
          if(info.msg_type==6)  var status="error"
          else  var status="info"
          var user={
            id: info.group_id,
            name: target_group.group_name,
            new_msg: temp_message.context,
            time: temp_message.time,
            picture: "http://192.168.2.220:8070/getPhotoByID/" + target_group.group_id,
            highlighted: true,
            num: 0,
            status: status
          }
          context.user_list.push(user)
        }else{
          targetObj.new_msg = temp_message.context
          targetObj.time = temp_message.time
        }
      }else{
        Message.error("他不是你的联系人")
        return false
      }
      
      

      this.dispatch('update_msg_user');
    },


    async addMessageReceive(context, message) {
      console.log(message)
      if(message.msg_type==12){
        context.Contactor++
        return
      }
      var id__=""
      if(message.msg_type==6||message.msg_type==7){
        id__=message.receive_id
        
      }else{
        id__=message.send_id
      }
      if (context.message[id__]) {
        context.message[id__].push(message);
      } else {
        context.message[id__] = [message];
      }
      const contactor_id = window.sessionStorage.getItem('contactor_id')
      const targetObj = context.user_list.find(obj => obj.id === id__)
      //如果找到了

      if (targetObj) {

        if (contactor_id == id__) {
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
        const targetObj2 = context.contactor_list.find(obj => obj.friend_id === id__)
        const targetGroup =context.my_group_list.find(obj=>obj.group_id==id__)
        console.log("user",targetObj2)
        console.log("group:",targetGroup)
        if(targetObj2&&!targetGroup){
          var name =targetObj2.name
          var id=send_id
        }else{
          var name =targetGroup.group_name
          var id =message.receive_id
        }
        if (message.msg_type == 0 || message.msg_type == 6) {
          //如果这个是通知消息，整个未读消息加1
          context.MsgSum++
          var status = "danger"
        } else {
          var status = "info"
        }
        context.user_list.push({
          "id": id,
          "name": name,
          "new_msg": message.context,
          "time": message.time,
          "picture": 'http://192.168.2.220:8070/getPhotoByID/' + id__,
          "highlighted": false,
          "num": 1,  //将这个用户的未读消息设为1
          "status": status
        })
      }
      this.dispatch('update_msg_user');
    },

  },
  actions: {
    async update_msg_user(context) {
      var id = window.sessionStorage.getItem("userid")
      const newContactorList = context.state.user_list.map(user => {
        if (user.status == "") var new_status = 0
        else var new_status = 1
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
        } else {
          console.log("更新信息失败", res)
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
    },
    async get_contactor_info(context, info) {
      try {
        const { data: res } = await axios.post('http://192.168.2.220:8070/queryFriendInfo', info);
        // 处理响应数据或其他操作
        if (res.code === 1000) {
          context.temp_contactor_info=res.friend_info
        }else{
          console.log(res)
        }
      } catch (error) {
        // 处理错误情况
      }
    },
    async get_group_info(context, info) {
      try {
        const { data: res } = await axios.post('http://192.168.2.220:8070/QueryGroupInfo', info);
        // 处理响应数据或其他操作
        if (res.code === 1000) {
          return res.data
        }else{
          console.log(res)
        }
      } catch (error) {
        // 处理错误情况
      }
    }
  },
  modules: {}
})
export default store
