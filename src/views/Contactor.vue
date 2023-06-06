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
            <div class="default_picture" v-if="Isclick === false && Isclick2 === false && Isclick5 === false">
                <div class="center">
                    <i class="el-icon-chat-dot-square"></i>
                </div>
            </div>
            <div class="operate" v-if="Isclick">
                <el-row>
                    <el-col>
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="briefintro">
                                <div class="img">
                                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                        class="image">
                                </div>
                                <div class="info" v-if="info != {}">
                                    <div class="item item1">昵称：{{ info.user_name }}</div>
                                    <div class="item"></div>
                                    <div class="item item2">账号：{{ info.user_id }}</div>
                                    <div class="item item3">电话：{{ info.phone_number }}</div>
                                    <div class="item item4">邮件：{{ info.e_mail }}</div>
                                    <div class="item item5" v-if="info.sex != 999">性别：{{ info.sex }}</div>
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
                                    <el-form-item label="消息">
                                        <el-select v-model="select_value"
                                            :placeholder="choose_msg_type(this.info.is_private_chat_gray)">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                                :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <el-tag type="success">{{form.tags}}</el-tag>
                                    </el-form-item>
                                    <el-form-item label="签名">
                                        <el-tag type="info">{{ form.signature }}</el-tag>
                                    </el-form-item>
                                    <el-form-item label="状态">
                                        <el-tag type="info">{{ getStatusText }}</el-tag>
                                    </el-form-item>

                                </el-form>
                            </div>
                            <div class="limits">
                                <el-switch style="display: block ;margin-left: 40px;" v-model="status1"
                                    inactive-text="不看他朋友圈"></el-switch>
                                <el-switch style="display: block ;margin-left: 40px;" v-model="status2"
                                    inactive-text="拉黑"></el-switch>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom_div clearfix">
                                    <el-button type="primary" size="small" @click="JumpChat()">文字聊天</el-button>
                                    <el-button type="primary" size="small">视频聊天</el-button>
                                    <el-button type="danger" size="small">删除好友</el-button>
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
                                <div class="img">
                                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                        class="image">
                                </div>
                                <div class="info">
                                    <div class="item">{{ groupInfo.group_name }}</div>
                                    <div class="item"></div>
                                    <div class="item">{{ groupInfo.group_id }}</div>
                                    <div class="item"></div>
                                    <div class="item">{{ groupInfo.create_time }}</div>

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
                                    <el-form-item label="消息">
                                        <el-select v-model="select_value2"
                                            :placeholder="choose_msg_type(this.groupInfo.msg_type)">
                                            <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                                :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="公告">
                                        <el-tag type="info">{{ groupInfo.description }}</el-tag>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <el-tag type="success">我加入的群</el-tag>&nbsp;&nbsp;<el-tag type="info">我管理的群</el-tag>
                                    </el-form-item>

                                </el-form>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom_div clearfix">
                                    <el-button type="primary" size="small" @click="JumpChat()">文字聊天</el-button>
                                    <el-button type="primary" size="small">群成员管理</el-button>
                                    <el-button type="danger" size="small">退出群聊</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div v-if="Isclick5">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="头像" prop="user_id">
                        <template slot-scope="scope">
                            <el-avatar :size="40"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="Date" prop="date">
                    </el-table-column>
                    <el-table-column label="身份">
                        <template slot-scope="scope">
                            <el-tag :type="get_identify(scope.row.identity).status">{{ get_identify(scope.row.identity).name
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="在线" prop="name">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="在线" placement="top">
                                <i v-if="scope.row.online == 1" class="el-icon-check"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="离线" placement="top">
                                <i v-if="scope.row.online == 0" class="el-icon-minus"></i>
                            </el-tooltip>

                        </template>
                    </el-table-column>
                    <el-table-column label="Name" prop="name">
                    </el-table-column>
                    <el-table-column label="禁言状态">
                        <template slot-scope="scope">
                            <el-switch v-if="scope.row.identity != 2" v-model="scope.row.status" active-color="#ff4949"
                                inactive-color="#13ce66"
                                :disabled="!(group_identify > scope.row.identity && group_identify >= 1)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" label="管理">

                        <template slot-scope="scope">
                            <el-button-group>
                                <el-tooltip class="item" effect="dark" content="转让群" placement="top">
                                    <el-button v-if="scope.row.identity != 2" size="mini" type="warning"
                                        :disabled="(group_identify != 2)" icon="el-icon-upload2"></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="设为管理" placement="top">
                                    <el-button v-if="scope.row.identity != 2" size="mini" type="success"
                                        :disabled="(group_identify != 2)" icon="el-icon-upload2"></el-button>
                                </el-tooltip>
                                <el-button size="mini" v-if="scope.row.identity != 2" type="danger"
                                    :disabled="!(group_identify > scope.row.identity && group_identify >= 1)">踢</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<style lang="less" scoped></style>

<script>
export default {
    data() {
        return {
            group_identify: 1,
            tableData: [
            ],
            status1: false,
            status2: false,
            tableData: [{
                date: '2016-05-02',
                identity: 2,
                name: '王小虎',
                status: true,
                online:0
            }, {
                date: '2016-05-02',
                identity: 1,
                name: '王小虎',
                status: true,
                online: 1
            }, {
                date: '2016-05-02',
                identity: 0,
                name: '王小虎',
                status: true,
                online: 0
            }, {
                date: '2016-05-02',
                identity: 0,
                name: '王小虎',
                status: true,
                online: 1
            }, {
                date: '2016-05-02',
                identity: 0,
                name: '王小虎',
                status: true,
                online: 0
            }, {
                date: '2016-05-02',
                identity: 0,
                name: '王小虎',
                status: true,
                online: 1
            }, {
                date: '2016-05-02',
                identity: 0,
                name: '王小虎',
                status: true,
                online: 0
            },],
            status1: true,
            status2: true,
            status3: true,
            select_value: '',
            select_value2: '',
            options: [{
                value: '选项1',
                label: '接收消息并提醒',
                disabled: false

            }, {
                value: '选项2',
                label: '接收但是不提醒',
                disabled: false
            }],
            options2: [
                {
                    value: '选项1',
                    label: '接收消息并提醒',
                    disabled: false
                },
                {
                    value: '选项2',
                    label: '接收但是不提醒',
                    disabled: false
                },
                {
                    value: '选项3',
                    label: '屏蔽该群',
                    disabled: false
                }
            ],
            List: [
            ],
            my_group_list: [

            ],
            avator: 'https://img1.baidu.com/it/u=1582149699,3121859091&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501',
            Isclick: false,
            Isclick2: false,
            info: {},//存放点击好友获得的信息
            form: {
                notes: '',
                signature: '',
                tags: [],
                status: 0
            },//存放好友信息的备注
            Isclick5: true,
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
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        async get_group_user_list(group_id) {
            group_id = '2172635274176102400'
            var id = window.sessionStorage.getItem("userid")
            const { data: res } = await this.$http.post("http://192.168.2.220:8070/GetGroupAllUser", { user_id: id, group_id: group_id })
            console.log(res)
            this.tableData = res.data
            this.tableData.sort(function (a, b) {
                // 根据 identity 进行降序排序
                if (a.identity < b.identity) {
                    return 1;
                } else if (a.identity > b.identity) {
                    return -1;
                } else {
                    // 如果 identity 相同，根据 online 进行降序排序
                    if (a.online < b.online) {
                        return 1;
                    } else if (a.online > b.online) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            })
            console.log(this.group_identify)
        },
        get_identify(num) {
            if (num == 2) {
                return { name: "群主", status: "warning" }
            } else if (num == 0) {
                return { name: "成员", status: "info" }
            } else if (num == 1) {
                return { name: "管理", status: "success" }
            }
        },
        async get_contactor_list() {
            const id = window.sessionStorage.getItem("userid")
            console.log(id)
            const { data: res } = await this.$http.post("http://192.168.2.220:8070/queryFriendList", { user_id: parseInt(id, 10) });
            setTimeout(() => {
                console.log(res);
            }, 200);
            //this.$store.commit('updateContactList', res.data.friend_list.friends);
        },
        choose_msg_type(type) {//消息通知框内显示内容变化
            if (type == false || type == 6) {
                return "接收消息并提醒"
            } else if (type == true || type == 7) {
                return "接收但是不提醒"
            } else if (type == 8) {
                return "不接收消息"
            }
        },
        async toggleHighlight(userId) {//高亮显示好友，点击获取好友详细信息，消息通知下拉内容已选项禁用，切换main内容卡片
            this.highlightedUserId = this.highlightedUserId === userId ? '' : userId;
            this.ClearData()
            window.sessionStorage.setItem("contactor_id", userId)
            const info = this.List.find(item => item.friend_id === userId)
            const form = {
                "user_id": window.sessionStorage.getItem("userid"),
                "friend_id": info.friend_id
            }
            await this.$http.post('http://192.168.2.172:8070/queryFriendInfo', form).then(response => {
                this.info = response.data.data.friend_info
                this.form.notes = response.data.data.friend_info.remark
                this.form.signature = response.data.data.friend_info.signature === '' ? '无' : response.data.data.friend_info.signature
                this.form.status = response.data.data.friend_info.status
                this.form.tags = response.data.data.friend_info.tags === null ? '无' : response.data.data.friend_info.tags
                console.log(this.info)
            }).catch(error => {
                console.log(error)
                return this.$message.error('网络错误');
            })
            if (this.info.is_private_chat_gray == true) {
                this.options[0].disabled = false
                this.options[1].disabled = true
            } else if (this.info.is_private_chat_gray == false) {
                this.options[0].disabled = true
                this.options[1].disabled = false
            }
            // setTimeout(() => {
            //     console.log(res.data);
            // }, 200);
            this.Isclick2 = false
            this.Isclick = true
        },

        async MouseClick(id) {//点击获取群聊详细信息，消息通知下拉内容已选项禁用，切换main内容卡片
            // this.groupInfo = this.my_group_list.find(item => item.group_id === id)


            await this.$http.post('http://192.168.2.172:8070/QueryGroupInfo', { group_id: id, user_id: window.sessionStorage.getItem("userid") }).then(response => {
                this.groupInfo = response.data.data
                console.log(this.groupInfo)
            }).catch(error => {
                console.log(error)
                return this.$message.error('网络错误');
            })
            if (this.groupInfo.msg_type == 6) {
                this.options2[0].disabled = true
                this.options2[1].disabled = false
                this.options2[2].disabled = false
            } else if (this.info.msg_type == 7) {
                this.options2[0].disabled = false
                this.options2[1].disabled = true
                this.options2[2].disabled = false
            } else {
                this.options2[0].disabled = false
                this.options2[1].disabled = false
                this.options2[2].disabled = true
            } true
            this.Isclick = false
            this.Isclick2 = true
            const { data: res } = await this.$http.post("http://192.168.2.172:8070/QueryGroupInfo", { group_id: id })
            this.groupInfo = res.data
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
        window.sessionStorage.setItem("contactor_id", "")
         this.get_contactor_list()
        this.List = this.$store.state.contactor_list
        this.my_group_list = this.$store.state.my_group_list
    },
    computed: {
        getStatusText() {
            switch (this.form.status) {
                case 0:
                    return '离线';
                case 1:
                    return '在线';
                case 2:
                    return '潜水';
                default:
                    return '';
            }
        },
    }
}
</script>

<style scoped>
.img {
    width: 130px;
}

.info {

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* grid-template-rows: repeat(3, 1fr); */
    grid-gap: 10px;
}

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

.group-info {
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
    background-color: #e8e5e5;
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
    margin-top: 3%;
    margin-bottom: 3%;
}

.image {
    margin-top: 5px;
    margin-left: 10px;
    width: 60%;
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