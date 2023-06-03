<template>
    <div class="container">
        <div class="aside">
            <div class="block">
                <div class="lable" @click="$router.push('/addFrind')">
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
                    <div v-for="(user, index) in this.List" :key="user.friend_id"
                        :class="['user-container2', { highlighted: user.friend_id === highlightedUserId }]"
                        @click="toggleHighlight(user.friend_id)">
                        <div class="user-container">
                            <div class="user-picture">
                                <!-- <img :src="user.picture" alt="用户头像" /> -->
                                <el-avatar shape="square" :size="35" :src="user.picture"></el-avatar>
                            </div>
                            <div class="user-info">
                                <div class="user-name">{{ user.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div class="block1">
                <div class="lable" @click="$router.push('/addGroup')">
                    <div>
                        <img :src="avator" alt="新的">
                    </div>
                    <div>
                        <p>新的群聊</p>
                    </div>
                </div>
            </div>
            <div class="flex2">
                <div class="group_list">
                    <div v-for="(group, index) in this.my_group_list" :key="group.group_id"
                        @click="MouseClick(group.group_id)" class="group-container2">
                        <div class="group-container">
                            <div class="group-picture">
                                <!-- <img :src="group.picture" alt="群聊头像" /> -->
                                <el-avatar shape="square" :size="35" :src="group.picture"></el-avatar>
                            </div>
                            <div class="group-info">
                                <div class="group-name">{{ group.group_name }}</div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
        <div class="main">
            <div class="default_picture" v-if="Isclick === false && Isclick2 === false">
                <div class="center">
                    <i class="el-icon-chat-dot-square"></i>
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
                                    昵称：{{ this.info.name }}
                                    <br>
                                    邮信号：{{ this.info.signature }}
                                </div>

                            </div>
                            <div class="mark">
                                <el-form :model="form" label-width="80px">
                                    <el-form-item label="备注" class="Remark">
                                        <div class="input-container">
                                            <el-input v-model="form.notes" placeholder="无" :border="false"></el-input>
                                            <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                            </el-tooltip>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <el-tag type="success">同学</el-tag>&nbsp;&nbsp;<el-tag type="info">好友</el-tag>
                                    </el-form-item>
                                    <el-form-item label="消息">
                                        <el-select v-model="select_value"
                                            :placeholder="choose_msg_type(this.info.msg_type)">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                                :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="limits">
                                <el-switch style="display: block ;margin-left: 41px;" v-model="status1"
                                    inactive-text="仅聊天"></el-switch>
                                <el-switch style="display: block ;margin-left: 41px;" v-model="status2"
                                    inactive-text="不让他看朋友圈"></el-switch>
                                <el-switch style="display: block ;margin-left: 41px;" v-model="status3"
                                    inactive-text="不看他朋友圈"></el-switch>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom_div clearfix">
                                    <el-button type="primary" size="small" @click="JumpChat()">文字聊天</el-button>
                                    <el-button type="primary" size="small">视频聊天</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="operate" v-if="Isclick2">
                <el-row>
                    <el-col>
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="briefintro">
                                <div>
                                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                        class="image">
                                </div>
                                <div class="info">
                                    昵称：{{ this.groupInfo.group_name }}
                                    <br>
                                    邮信号：{{ this.groupInfo.signature }}
                                </div>

                            </div>
                            <div class="mark">
                                <el-form :model="form" label-width="80px">
                                    <el-form-item label="备注">
                                        <div class="input-container">
                                            <el-input v-model="form.notes" placeholder="无" :border="false"></el-input>
                                            <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                            </el-tooltip>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <el-tag type="success">我加入的群</el-tag>&nbsp;&nbsp;<el-tag type="info">我管理的群</el-tag>
                                    </el-form-item>
                                    <el-form-item label="消息">
                                        <el-select v-model="select_value"
                                            :placeholder="choose_msg_type(this.groupInfo.msg_type)">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                                :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom_div clearfix">
                                    <el-button type="primary" size="small" @click="JumpChat()">文字聊天</el-button>
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
            status1: true,
            status2: true,
            status3: true,
            select_value: '',
            options: [{
                value: '选项1',
                label: '接收消息并展示',
                disabled: false

            }, {
                value: '选项2',
                label: '接收但是不展示',
                disabled: false
            }, {
                value: '选项3',
                label: '不接受消息',
                disabled: false
            },],
            List: [
            ],
            my_group_list: [

            ],
            avator: 'https://img1.baidu.com/it/u=1582149699,3121859091&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501',
            Isclick: false,
            Isclick2: false,
            info: {},
            form: {},
            groupInfo: {},
            highlightedUserId: '',
            index1: '',
            dialogFormVisible: false,
            friendform: {
                name: '',
                desc: ''
            }
        }
    },
    methods: {
        async get_contactor_list() {
            const id = window.sessionStorage.getItem("userid")
            const { data: res } = await this.$http.post("http://127.0.0.1:8070/queryFriendList", { user_id: parseInt(id, 10) });
            this.$store.commit('updateContactList', res.data.friend_list.friends);
        },
        choose_msg_type(type) {
            if (type == 1) {
                return "接收消息并展示"
            } else if (type == 2) {
                return "接收但是不展示"
            } else {
                return "不接受消息"
            }
        },
        async toggleHighlight(userId) {
            this.highlightedUserId = this.highlightedUserId === userId ? '' : userId;
            this.ClearData()
            window.sessionStorage.setItem("contactor_id", userId)
            const info = this.List.find(item => item.friend_id === userId)
            const form={
                "friendship_id": Number(info.friendship_id,10),
                "user_id": Number(userId),
                "friend_id": Number(info.friend_id)
            }
            setTimeout(() => {
                console.log(Number("2172620156973350912"),info.friendship_id);
            }, 200);
            const { data: res } = await this.$http.post("http://127.0.0.1:8070/queryFriendInfo", form)
            setTimeout(() => {
                console.log(res);
            }, 200);

            this.Isclick2 = false
            this.Isclick = true
        },

        MouseClick(id) {
            this.groupInfo = this.my_group_list.find(item => item.group_id === id)
            if (this.info.msg_type == 1) {
                this.options[0].disabled = true
                this.options[1].disabled = false
                this.options[2].disabled = false
            } else if (this.info.msg_type == 2) {
                this.options[0].disabled = false
                this.options[1].disabled = true
                this.options[2].disabled = false
            } else {
                this.options[0].disabled = false
                this.options[1].disabled = false
                this.options[2].disabled = true
            }
            this.Isclick = false
            this.Isclick2 = true
        },
        JumpChat() {
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
        ClearData() {
            // this.List = [],
            // this.avator = '',
            this.info = {},
                this.form = {}
            this.groupInfo = {}
        }
    },
    created() {

        this.List = this.$store.state.contactor_list
        this.my_group_list = this.$store.state.my_group_list
    }
}
</script>

<style scoped>
.input-container {
    display: flex;
    align-items: center;
}

.input-container> :not(:last-child) {
    margin-right: 10px;
}

.user-info {
    margin-left: 6px;
}

.group-container2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.user-container2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
}

.el-button {
    flex: 1;
}

.default_picture {
    font-size: 100px;
    position: relative;
    height: 50%;
    /* 为父元素设置合适的高度 */
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;

}

.aside {
    height: 100%;
    max-width: 25%;
    background-color: #F1F3F4;
}

.main {
    flex: 1;
    background-color: #DEE1E6;
}

.container {
    display: flex;
}

.limits {
    display: flex;
    align-items: center;
}

.limits span {
    flex-grow: 1;
    text-align: left;
    /* 设置文字左对齐 */
}

.limits .el-switch {
    flex-shrink: 0;
    margin-left: 10px;
    /* 开关与文字之间的间距 */
    text-align: right;
    /* 设置开关右对齐 */
}

.user_list {
    margin-top: 10px;
    width: 100%;
}

.group_list {
    margin-top: 10px;
    width: 280px;
}

.user-container {
    height: 40px;
    display: flex;
    align-items: center;
    /* 添加水平居中 */
    margin-top: 5px;
    width: 100%;
}

.group-container {
    height: 40px;
    display: flex;
    align-items: center;
    /* 添加水平居中 */
    margin-top: 5px;
    max-width: 280px;
    width: 100%;
}

.user-container:hover {
    /* 添加鼠标悬停时的样式 */
    background-color: rgb(216, 216, 217);
}

.group-container:hover {
    /* 添加鼠标悬停时的样式 */
    background-color: rgb(216, 216, 217);
}

.highlighted {
    background-color: rgb(216, 216, 217);
    /* 高亮样式 */
}

.user-picture {
    margin-left: 5px;
}

.group-picture {
    margin-left: 5px;
}

.user-picture img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.group-picture img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.block {
    margin-top: 5px;
    margin-left: 2px;
    width: 280px;
}

.block1 {
    margin-top: 0px;
    margin-left: 2px;
    width: 280px;
}

.lable {
    display: flex;
    width: 100%;
}

.lable img {
    width: 50px;
    height: 50px;
}


.operate {
    position: absolute;
    top: 50%;
    left: 62%;
    transform: translate(-50%, -50%);
    width: 550px;
}

.mark .el-form-item {
    width: 500px;
    /* 设置表单项的宽度 */
}

.briefintro {
    display: flex;
}

.image {
    margin-top: 5px;
    margin-left: 10px;
    width: 20%;
    display: block;
    border-radius: 10%;
}

.bottom_div {
    display: flex;

}

/* button {
    margin-left: 45%;
    border-radius: 5px;
    line-height: 2px;
} */
</style>