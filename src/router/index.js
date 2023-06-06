import Vue from 'vue'
import VueRouter from 'vue-router'
import Login1 from '../views/Login1.vue'
import Register from '../views/Register.vue'
import Selector from '../views/Selector.vue'
import MsgUser from '../views/MsgUser.vue'
import Moment from'../views/Moment.vue'
import MomentItem from '../views/MomentItem.vue'
import Comment from '../views/Comment.vue'
import Collection from '../views/Collection.vue'
import Contactor from '../views/Contactor.vue'
import ChatMsg1 from '../views/ChatMsg1.vue'
import ChatMsg2 from '../views/ChatMsg2.vue'
import VideoChat from '../views/VideoChat.vue'
import AddFrind from '../views/AddFrind.vue'
import AddGroup from '../views/AddGroup.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login1', component: Login1 },
  { path: '/login1', component: Login1 },
  { path: '/register', component: Register },
  {
    path: '/selector', component: Selector,
    redirect: '/msg_user',
    children: [
      {
        path: '/msg_user',
        component: MsgUser,
        children: [
          { path: "/chat_msg1/:userId", component: ChatMsg1 },
          { path: "/chat_msg2/:userId", component: ChatMsg2 },
          { path: "/video_chat", component: VideoChat }
        ]
      },
      { path: '/contactor', component: Contactor },
      { 
        path: '/moment', 
        component: Moment,
        children: [
          {path: "/momentitem",component:MomentItem},
          {path: "/comment",component:Comment},
        ]
      },
      { path: '/collection', component: Collection },
    ]
  },
  { path: '/addFrind', component: AddFrind },
  { path: '/addGroup', component: AddGroup }
]

const router = new VueRouter({
  routes
})

export default router

