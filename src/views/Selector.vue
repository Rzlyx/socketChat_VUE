<template>
  <el-container>
    <el-aside width="65px">
      <div class="container">
        <div class="column1">
          <el-image :src="url" @click="GotoPersonalInfo()"></el-image>
          <div>
           
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">


              <el-menu-item :index=url1 @click="goto_msg_user">
                <el-badge :value=msg_value class="item" :hidden="msg_visable">
                  <i class="el-icon-chat-dot-round"></i>
                </el-badge>
                <span slot="title">消息</span>
              </el-menu-item>



              <el-menu-item :index=url2 @click="goto_contactor">
                <el-badge :value=user_value class="item" :hidden="user_visable">
                  <i class="el-icon-user"></i>
                </el-badge>
                <span slot="title">联系人</span>
              </el-menu-item>


              <el-menu-item index="3">
                <el-badge :value=value2 class="item" :hidden="value2_visable">
                  <i class="el-icon-orange"></i>
                </el-badge>
                <span slot="title">动态</span>
              </el-menu-item>


            </el-menu>
          </div>
        </div>
        <div class="column2">

        </div>
      </div>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
  
<style scoped>
.container {
  height: 100%;
  padding: 0;
}

.el-container {
  height: 100%;
}

.el-badge {
  width: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 120px;
  height: 100%;
}

.el-image {
  margin-top: 0.5%;
  margin-left: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%
}

.el-switch {
  margin-top: 5px;
  margin-left: 10px;
}

.el-aside {
  width: 65px;
  flex: 0 0 auto;
}

.el-main {
  height: 100%;
  width: 100%;
  flex: 1;
  padding: 2px;
}
</style>
<script>
export default {
  data() {
    return {
      url1: "msg_user",
      url2: "userlist",
      // 未读消息个数
      msg_value: 0,
      // 联系人待通过个数
      user_value: 0,
      // 动态个数
      value2: 0,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      msg_visable: false,
      user_visable: false,
      value2_visable: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goto_msg_user() {
      this.$router.push('/msg_user')
    },
    goto_contactor() {
      this.$router.push('/contactor')
    },
    GotoPersonalInfo(){
      this.$router.push('/infomation')
    }
  },
  watch: {
    '$store.state.MsgSum'(new_value) {
      this.msg_value = new_value;
      this.msg_visable = new_value === 0;
    },
    '$store.state.Contactor'(new_value) {
      this.user_value = new_value;
      this.user_visable = new_value === 0;
    },
    '$store.state.moments'(new_value) {
      this.value2 = new_value;
      this.value2_visable = new_value === 0;
    }
  },
  created() {
    this.msg_value = this.$store.state.MsgSum;
    this.user_value = this.$store.state.Contactor;
    this.value2 = this.$store.state.moments;
    this.msg_visable = this.msg_value === 0;
    this.user_visable = this.user_value === 0;
    this.value2_visable = this.value2 === 0;
  }
}


</script>