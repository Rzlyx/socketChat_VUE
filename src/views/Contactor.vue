<template>
    <div class="container">
        <div class="block">
            <div class="lable">
                <div>
                    <img :src="avator" alt="新的朋友">
                </div>
                <div>
                    <p>新的朋友</p>
                </div>
            </div>
        </div>

        <div class="flex1">
            <div class="user_list">
                <div v-for="(user, index) in this.List" :key="user.id"
                :class="['user-container', { highlighted: user.id === highlightedUserId }]"
                    @click="toggleHighlight(user.id)">
                    <div class="user-container">
                        <div class="user-picture">
                            <el-badge :value="user.num" class="item" :hidden="user.num === 0">
                                <img :src="user.picture" alt="用户头像" />
                            </el-badge>
                        </div>
                        <div class="user-info">
                            <div class="user-name">{{ user.name }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="operate" v-if="Isclick">
                <el-row>
                    <el-col>
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="briefintro">
                                <div>
                                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                        class="image">
                                </div>
                                <div class="info">
                                    {{ this.info.name }}
                                    {{ this.info.signature }}
                                </div>

                            </div>
                            <div class="mark">
                                <el-form :model="form" label-width="80px">
                                    <el-form-item label="备注">
                                        <el-input v-model="form.notes" placeholder="无" :border="false"></el-input>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <el-input v-model="form.tag" placeholder="无" :border="false"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="limits">
                                <el-switch style="display: block ;margin-left: 41px;" v-model="sw1" inactive-text="仅聊天"></el-switch>
                                <el-switch style="display: block ;margin-left: 41px;" v-model="sw2" inactive-text="不让他看朋友圈"></el-switch>
                                <el-switch style="display: block ;margin-left: 41px;" v-model="sw3" inactive-text="不看他朋友圈"></el-switch>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <el-button type="text" class="button" @click="JumpChat()">发消息</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>
</template>

<style lang="less" scoped></style>

<script>
export default {
    data() {
        return {
            List: [
            ],
            avator: 'https://img1.baidu.com/it/u=1582149699,3121859091&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501',
            Isclick: false,
            info: {},
            sw1:false,
            sw2:false,
            sw3:false,
            form:{},
            highlightedUserId:'',
            index1:''
        }
    },
    methods: {
        toggleHighlight(userId) {
            this.highlightedUserId = this.highlightedUserId === userId ? '' : userId;
            this.ClearData()
            window.sessionStorage.setItem("contactor_id", userId)
            this.info = this.List.find(item => item.id === userId)
            console.log(this.info)
            this.Isclick = true
            // console.log(this.info.name)
            // this.$router.replace('/contactor/' + index + '/' + userId)
        },
        JumpChat(){
            this.index1 = window.sessionStorage.getItem("msg")
            if (this.index1 == undefined || this.index1 == '2') {
                this.index1 = '1'
                window.sessionStorage.setItem("msg", "1")
            }
            else if (this.index1 == '1') {
                this.index1 = '2'
                window.sessionStorage.setItem("msg", "2")
            }
            this.Isclick = false,
            this.$router.replace('/chat_msg' + this.index1 + '/' + window.sessionStorage.getItem("contactor_id"))
        },
        ClearData(){
            // this.List = [],
            // this.avator = '',
            this.info = {},
            this.form = {}
        }
    },
    created() {
        this.List = this.$store.state.user_list
    }
}
</script>

<style scoped>

.limits {
  display: flex;
  align-items: center;
}
.limits span {
  flex-grow: 1;
  text-align: left; /* 设置文字左对齐 */
}
.limits .el-switch {
  flex-shrink: 0;
  margin-left: 10px; /* 开关与文字之间的间距 */
  text-align: right; /* 设置开关右对齐 */
}

.user_list {
    margin-top: 10px;
    width: 320px;
}

.user-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    max-width: 320px;
    /* 设置最大宽度为 320px */
    width: 100%;
    /* 占满父容器的宽度 */
}

.user-container:hover {
    /* 添加鼠标悬停时的样式 */
    background-color: rgb(216, 216, 217);
}

.highlighted {
    background-color: rgb(216, 216, 217);
    /* 高亮样式 */
}
.user-picture {
    margin-right: 10px;
}

.user-picture img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.block {
    margin-top: 20px;
    margin-left: 2px;
    width: 320px;
}

.lable {
    display: flex;
    width: 100%;
}

.lable img {
    width: 50px;
    height: 50px;
}

.flex1 {
    display: flex;

}

.operate {
    margin-left: 10%;
    margin-top: 5%;
    width: 40%;
}
.mark .el-form-item {
  width: 500px; /* 设置表单项的宽度 */
}

.briefintro {
    display: flex;
}

.image {
    width: 20%;
    display: block;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    margin-left: 25px;
    margin-right: 45px;
    background-color: greenyellow;
    
}
button{
    margin-left: 45%;
    border-radius: 5px;
    line-height: 2px;
}
</style>