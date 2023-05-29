import Vue from 'vue'
import VueRouter from 'vue-router'
import Login1 from '../views/Login1.vue'
import Register from '../views/Register.vue'
import Selector from '../views/Selector.vue'
import MsgUser from '../views/MsgUser.vue'
import Contactor from '../views/Contactor.vue'
import ChatMsg1 from '../views/ChatMsg1.vue'
import ChatMsg2 from '../views/ChatMsg2.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login1', component: Login1 },
  { path: '/login1', component: Login1 },
  { path: '/register', component: Register },
  {
    path: '/selector', component: Selector,
    redirect:'/msg_user',
    children: [
      {
        path: '/msg_user',
        component: MsgUser,
        children: [
          { path: "/chat_msg1/:userId", component: ChatMsg1 },
          { path: "/chat_msg2/:userId", component: ChatMsg2 }
        ]
      },
      { path: '/contactor', component: Contactor }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

