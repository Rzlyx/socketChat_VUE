<template>
    <div class="container">
        <div class="aside">
            <div class="block">
                <div class="lable" @click="Addf()">
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
                <div class="lable" @click="applyG()">
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
            <div class="default_picture"
                v-if="Isclick === false && Isclick2 === false && Isclick3 === false && Isclick4 === false && Isclick5 === false">
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
                                <el-form :model="formcon" label-width="80px">
                                    <el-form-item label="备注" class="Remark">
                                        <div class="input-container">
                                            <el-input v-model="formcon.notes" placeholder="无" :border="false"
                                                ref="inputNotes" @keyup.native.enter="handleEnter()"></el-input>
                                            <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                                <el-button type="primary" icon="el-icon-edit" @click="UpdataRemark()"
                                                    circle></el-button>
                                            </el-tooltip>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="通知">
                                        <el-select v-model="select_value" @change="handleSelectChange"
                                            :placeholder="choose_msg_type(this.info.is_private_chat_gray)">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                                :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <div>
                                            <!-- 渲染标签 -->
                                            <el-tag v-for="(tag, index) in formcon.tags" :key="index" type="success"
                                                :class="{ hoverable: isTagHovered }"
                                                @mouseenter="handleTagHover(index, true)"
                                                @mouseleave="handleTagHover(index, false)" closable
                                                @close="removeTag(index, tag)">
                                                {{ tag[index] }}
                                            </el-tag>

                                            <!-- 输入框 -->
                                            <el-input v-model="newTag" placeholder="新建标签" @keyup.enter="addTag"
                                                style="width: 120px;margin-left: 30px;"></el-input>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="签名">
                                        <el-tag type="info">
                                            {{ formcon.signature }}</el-tag>
                                    </el-form-item>
                                    <el-form-item label="状态">
                                        <el-tag type="info">{{ getStatusText }}</el-tag>
                                    </el-form-item>

                                </el-form>
                            </div>
                            <div class="limits">
                                <el-switch style="display: block ;margin-left: 40px;" v-model="status1"
                                    inactive-text="不看他朋友圈" @change="handleSwitchChange1"></el-switch>
                                <el-switch style="display: block ;margin-left: 40px;" v-model="status2" inactive-text="拉黑"
                                    @change="handleSwitchChange2"></el-switch>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom_div clearfix">
                                    <el-button type="primary" size="small" @click="JumpChat()">文字聊天</el-button>
                                    <el-button type="primary" size="small">视频聊天</el-button>
                                    <el-button type="danger" size="small" @click="Del">删除好友</el-button>
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
                                <div class="info" v-if="!IsGO">
                                    <label>群名:</label>
                                    <div class="item">{{ groupInfo.group_name }}</div>
                                    <div class="item"></div>
                                    <label>群号:</label>
                                    <div class="item">{{ groupInfo.group_id }}</div>
                                    <div class="item"></div>
                                    <label>创建时间:</label>
                                    <div class="item">{{ groupInfo.create_time }}</div>

                                </div>
                                <el-form class="infoG" v-if="IsGO">
                                    <el-form-item label="群名">
                                        <el-input class="item" v-model="groupInfo.group_name"
                                            @keyup.native.enter="handleEnterGNandDesc()"></el-input>
                                    </el-form-item>
                                    <el-form-item label="群号">
                                        <el-input class="item" v-model="groupInfo.group_id" readonly></el-input>
                                    </el-form-item>
                                    <el-form-item label="创建时间">
                                        <el-input class="item" v-model="groupInfo.create_time" readonly></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="mark">
                                <el-form :model="groupInfo" label-width="80px">
                                    <el-form-item label="备注">
                                        <div class="input-container">
                                            <el-input v-model="groupInfo.my_group_name" placeholder="无" :border="false"
                                                ref="inputNotesG" @keyup.native.enter="handleEnterG()"></el-input>
                                            <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                                <el-button type="primary" icon="el-icon-edit" @click="UpdataRemarkG()"
                                                    circle></el-button>
                                            </el-tooltip>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="通知">
                                        <el-select v-model="select_value2" @change="handleSelectChangeG"
                                            :placeholder="choose_msg_type(this.groupInfo.msg_type)">
                                            <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                                :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="公告" v-if="!IsGO">
                                        <el-tag type="info">{{ groupInfo.description }}</el-tag>
                                    </el-form-item>
                                    <el-form-item label="公告" v-if="IsGO">
                                        <el-input class="item" v-model="groupInfo.description"
                                            @keyup.native.enter="handleEnterGNandDesc()"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div style="padding: 14px;">
                                <div class="bottom_div clearfix">
                                    <div class="button-wrapper" style="margin-left: 30px;"><el-button type="primary"
                                            size="small" @click="JumpChatG()">文字聊天</el-button></div>
                                    <div v-if="IsGO" class="button-wrapper"><el-button type="primary" size="small"
                                            @click="GmemberManage()">群成员管理</el-button></div>
                                    <div v-if="IsGO" class="button-wrapper"><el-button type="danger" size="small"
                                            @click="DissolveGroup()">解散群聊</el-button></div>
                                    <div v-if="!IsGO" class="button-wrapper"><el-button type="danger" size="small"
                                            @click="QuitGroup()">退出群聊</el-button></div>


                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div v-if="Isclick3">
                <el-table :data="tableData3" style="width: 100%">
                    <el-table-column label="申请昵称" prop="applicant_name">
                    </el-table-column>
                    <el-table-column label="申请人账号" prop="apply_id">
                    </el-table-column>
                    <el-table-column label="Desc" prop="reason">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="AddsearchF" size="mini" @keyup.native.enter="applyFSearch()"
                                placeholder="新增联系人" />
                        </template>
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary"
                                @click="AgreeApply(scope.$index, scope.row)">同意</el-button>
                            <el-button size="mini" type="danger"
                                @click="NegateApply(scope.$index, scope.row)">拒绝</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>


            <div class="AfterSearch">
                <el-dialog :visible.sync="dialogVisibleF" v-if="SearchResults" width="35%">
                    <el-table :data="SearchResults" style="width: 100%">
                        <el-table-column label="姓名" prop="name">
                        </el-table-column>
                        <el-table-column label="账号" prop="id">
                        </el-table-column>
                        <el-table-column label="类型" prop="type">
                            <template slot-scope="scope">
                                <!-- 在作用域插槽中定义自定义渲染内容 -->
                                {{ scope.row.type === 0 ? '个人' : '群聊' }}
                            </template>
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success"
                                    @click="ApplyAddF(scope.$index, scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </div>

            <!-- 搜索的详细信息 -->
            <el-dialog :visible.sync="dialogVisibleFInfo" v-if="SearchResultsInfo" width="45%">
                <el-table :data="Object.values(SearchResultsInfo)" style="width: 100%">
                    <el-table-column label="姓名" prop="user_name">
                    </el-table-column>
                    <el-table-column label="账号" prop="user_id">
                    </el-table-column>
                    <el-table-column label="性别" prop="sex">
                    </el-table-column>
                    <el-table-column label="电话" prop="phone_number">
                    </el-table-column>
                    <el-table-column label="生日" prop="birthday">
                    </el-table-column>
                    <el-table-column label="邮件" prop="e_mail">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-input v-model="reason" placeholder="无" :border="false"></el-input>
                            <el-button size="mini" type="success" style="margin-top: 10px;"
                                @click="AddFriend(scope.$index, scope.row)">加好友</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>


            <div v-if="Isclick4">
                <div class="ApplicationStatus">
                    <el-table :data="tableData4" style="width: 100%">
                        <el-table-column label="邀请人" prop="invited_id">
                        </el-table-column>
                        <el-table-column label="账号" prop="target_id">
                        </el-table-column>
                        <el-table-column label="描述" prop="reason">
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot="header" slot-scope="scope">
                                <div style="display: flex; align-items: center">
                                    <el-input v-model="AddsearchF" size="mini" style="margin-right: 5px;"
                                        placeholder="请输入群号" ref="searchInput" @keyup.native.enter="applyFSearch()" />
                                    <i class="el-icon-search" style="margin-right: 20px;" @click="applyFSearch()"></i>
                                    <el-button size="mini" style="margin-right: 10px;" @click="newG()">新建群聊</el-button>
                                </div>
                            </template>
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary"
                                    @click="AgreeG(scope.$index, scope.row)">同意</el-button>
                                <el-button size="mini" type="danger"
                                    @click="NegateG(scope.$index, scope.row)">拒绝</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <!-- 搜索的群聊详细信息 -->
            <el-dialog :visible.sync="dialogVisibleGInfo" v-if="SearchResultsInfo" width="45%">
                <el-table :data="Object.values(SearchResultsInfo)" style="width: 100%">
                    <el-table-column label="群名" prop="group_name">
                    </el-table-column>
                    <el-table-column label="群号" prop="group_id">
                    </el-table-column>
                    <el-table-column label="描述" prop="description">
                    </el-table-column>
                    <el-table-column label="创建时间" prop="create_time">
                    </el-table-column>
                    <el-table-column label="群主" prop="owner_id">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-input v-model="reason" placeholder="无" :border="false"></el-input>
                            <el-button size="mini" type="success" style="margin-top: 10px;"
                                @click="ApplyJoinGroup(scope.$index, scope.row)">加群</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>


            <el-dialog :visible.sync="NewG" width="25%" title="发起群聊" class="dia1">
                <el-checkbox-group v-model="selectedList">
                    <el-checkbox v-for="option in List" :key="option.friend_id" :label="option.name">{{
                        option.name }}</el-checkbox>
                </el-checkbox-group>
                <el-input v-model="CreateGname" size="mini" style="margin-top: 8px;" placeholder="请输入群名" />
                <el-input v-model="CreateGdesc" size="mini" style="margin-top: 8px;margin-bottom: 8px;"
                    placeholder="请输入群描述" />
                <div style="text-align: right;">
                    <el-button size="mini" type="success" style="margin-right: 10px;" @click="CreateG()">创建</el-button>
                </div>
            </el-dialog>


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
            CreateGname: '',
            CreateGdesc: '',
            selectedList: [],
            NewG: false,
            dialogVisibleGInfo: false,//群聊详细信息展示
            reason: '无',//添加好友的原因
            dialogVisibleFInfo: false,//好友详细信息展示
            SearchResultsInfo: [],//存放搜索的好友详细信息
            dialogVisibleF: false,//添加朋友或群聊界面，搜索结果展示dialog
            SearchResults: '',//添加朋友界面搜索框，结果存储
            AddsearchF: '',//添加朋友界面搜索框双向绑定数据
            AddsearchG: '',//添加群聊界面搜索框双向绑定数据
            IsGO: false,
            newTag: '',//新建标签
            isTagHovered: null,//标签鼠标悬停
            group_identify: 2,
            tableData: [{
                date: '2016-05-02',
                identity: 2,
                name: '王小虎',
                status: true,
                online: 0
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
            },],//5
            tableData3: [],//好友申请
            tableData4: [],//群申请
            status1: false,
            status2: false,
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
            Isclick3: false,
            Isclick4: false,
            Isclick5: false,
            info: {},//存放点击好友获得的信息
            formcon: {
                notes: '',
                signature: '',
                tags: [],
                status: 0
            },//存放好友信息的备注
            groupInfo: {},
            highlightedUserId: '',
            index1: '',
            dialogFormVisible: false,
            friendform: {
                name: '',
                desc: ''
            },
        }
    },
    methods: {
        CreateG() {//创建群聊
            this.$http.post('http://192.168.2.220:8070/CreateGroupInfo',
                { owner_id: window.sessionStorage.getItem("userid"), group_name: this.CreateGname, description: this.CreateGdesc, user_ids: this.selectedList }).then(response => {
                    console.log(response.data)
                    this.CreateGname = ''
                    this.CreateGdesc = ''
                    this.NewG = false
                    return this.$message.success('创建成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },
        newG() {//新建群聊按钮
            this.selectedList = []
            this.NewG = true,
                console.log(this.List)
        },
        ApplyJoinGroup(idx, d) {//申请加群
            this.$http.post('http://192.168.2.220:8070/ApplyJoinGroup',
                { user_id: window.sessionStorage.getItem("userid"), group_id: d.group_id, reason: this.reason }).then(response => {
                    console.log(response.data)
                    this.AddsearchF = ''
                    this.dialogVisibleGInfo = false

                    return this.$message.success('申请信息发送成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },
        async AgreeG(idx, d) {//同意群邀请
            await this.$http.post('http://192.168.2.220:8070/AgreeInviteGroup',
                { apply_id: d.apply_id, user_id: d.applicant, group_id: d.target_id, applicant: d.applicant }).then(response => {
                    console.log(response.data.data);
                    return
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },
        async NegateG(idx, d) {//拒绝群邀请
            await this.$http.post('http://192.168.2.220:8070/DisAgreeInviteGroup',
                { apply_id: d.apply_id, user_id: d.applicant, group_id: d.target_id }).then(response => {
                    console.log(response.data.data);
                    return
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },
        async applyG() {//打开加群聊界面
            await this.$http.post('http://192.168.2.220:8070/QueryInviteGroup',
                { user_id: window.sessionStorage.getItem("userid") }).then(response => {
                    this.tableData4 = response.data.data
                    console.log(response.data.data);
                    this.Isclick = false
                    this.Isclick2 = false
                    this.Isclick3 = false
                    this.Isclick4 = true
                    this.Isclick5 = false
                    return
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })

        },

        AddFriend(idx, d) {//发送申请加好友
            this.$http.post('http://192.168.2.220:8070/addFriend',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: d.user_id, reason: this.reason }).then(response => {
                    console.log(response.data)
                    this.AddsearchF = ''
                    this.dialogVisibleFInfo = false

                    return this.$message.success('申请信息发送成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },

        ApplyAddF(idx, d) {//详情接口,用于显示该用户详细信息
            this.SearchResultsInfo = []
            console.log(idx, d)
            if (d.type == 0) {
                this.$http.post('http://192.168.2.220:8070/queryUserInfo',
                    { user_id: d.id, }).then(response => {
                        this.SearchResultsInfo.push(response.data.data.user_info)
                        console.log(this.SearchResultsInfo)
                        this.dialogVisibleF = false
                        this.dialogVisibleFInfo = true
                        return this.$message.success('操作成功');
                    }).catch(error => {
                        console.log(error)
                        return this.$message.error('系统内部内部错误');
                    })
            } else {
                this.$http.post('http://192.168.2.220:8070/QueryGroupInfo',
                    { group_id: d.id, user_id: window.sessionStorage.getItem("userid") }).then(response => {
                        this.SearchResultsInfo.push(response.data.data)
                        console.log(this.SearchResultsInfo)
                        this.dialogVisibleF = false
                        this.dialogVisibleGInfo = true
                        return this.$message.success('操作成功');
                    }).catch(error => {
                        console.log(error)
                        return this.$message.error('系统内部内部错误');
                    })
            }

        },

        applyFSearch() {//添加好友搜索触发事件
            if (this.AddsearchF != '') {
                this.$http.post('http://192.168.2.220:8070/searchFriendOrGroup',
                    { context: this.AddsearchF }).then(response => {
                        this.SearchResults = response.data.data.context.result
                        console.log(this.SearchResults)
                        this.dialogVisibleF = true
                        return this.$message.success('操作成功');
                    }).catch(error => {
                        console.log(error)
                        return this.$message.error('系统内部内部错误');
                    })
            } else {
                return this.$message.error('无搜索结果');
            }
        },
        async AgreeApply(idx, d) {//同意申请
            console.log(idx, d)
            await this.$http.post('http://192.168.2.220:8070/agreeFriendApply',
                { apply_id: d.apply_id, user_id: window.sessionStorage.getItem("userid"), friend_id: d.applicant_id }).then(response => {
                    this.tableData3 = []
                    return this.$message.success('操作成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },
        async NegateApply(idx, d) {
            await this.$http.post('http://192.168.2.220:8070/disagreeFriendApply',
                { apply_id: d.apply_id, user_id: window.sessionStorage.getItem("userid"), friend_id: d.applicant_id }).then(response => {
                    this.tableData3 = []
                    return this.$message.success('操作成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
        },
        async Addf() {//添加好友或查看好友申请
            await this.$http.post('http://192.168.2.220:8070/queryFriendApply',
                { user_id: window.sessionStorage.getItem("userid") }).then(response => {
                    this.tableData3 = response.data.data.applications.applications
                    console.log(this.tableData3);
                    return
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统内部内部错误');
                })
            this.Isclick = false
            this.Isclick2 = false
            this.Isclick3 = true
            this.Isclick4 = false
            this.Isclick5 = false
        },
        GmemberManage() {//群成员管理
            this.Isclick = false
            this.Isclick2 = false
            this.Isclick5 = true
        },
        handleEnterGNandDesc() {//修改群名以及群公告
            this.$http.post('http://192.168.2.220:8070/UpdateGroupInfo', { group_id: this.groupInfo.group_id, group_name: this.groupInfo.group_name, description: this.groupInfo.description })
                .then(response => {
                    // 处理请求成功的响应
                    console.log(response.data);
                    return this.$message.success('操作成功');
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                    return this.$message.error('操作失败');
                });
        },
        DissolveGroup() {//解散群聊
            this.$http.post('http://192.168.2.220:8070/DissolveGroupInfo', { user_id: window.sessionStorage.getItem("userid"), group_id: this.groupInfo.group_id })
                .then(response => {
                    // 处理请求成功的响应
                    console.log(response.data);
                    return this.$message.success('操作成功');
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                    return this.$message.error('操作失败');
                });
        },
        QuitGroup() {//退群
            this.$http.post('http://192.168.2.220:8070/QuitGroup', { user_id: window.sessionStorage.getItem("userid"), group_id: this.groupInfo.group_id })
                .then(response => {
                    // 处理请求成功的响应
                    console.log(response.data);
                    return this.$message.success('退群成功');
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                    return this.$message.error('操作失败');
                });
        },
        handleSelectChangeG() {//群通知改变 的处理函数
            if (this.select_value2 == '选项1') {
                this.ChangeGNotice6()
            } else if (this.select_value2 == '选项2') {
                this.ChangeGNotice7()
            } else {
                this.ChangeGNotice8()
            }
            this.$store.commit('change_group_status',{
                contactor_id:this.groupInfo.group_id,
                status:this.groupInfo.msg_type
            })
            //this.$router.go(0)
        },
        ChangeGNotice6() {//修改群备注
            this.$http.post('http://192.168.2.220:8070/SetWhiteList', { user_id: window.sessionStorage.getItem("userid"), group_id: this.groupInfo.group_id })
                .then(response => {
                    // 处理请求成功的响应
                    return this.$message.success('操作成功');
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                    return this.$message.error('操作失败');
                });
        },
        ChangeGNotice7() {
            this.$http.post('http://192.168.2.220:8070/SetGrayList', { user_id: window.sessionStorage.getItem("userid"), group_id: this.groupInfo.group_id })
                .then(response => {
                    // 处理请求成功的响应
                    console.log(response.data);
                    return this.$message.success('操作成功');
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                    return this.$message.error('操作失败');
                });
        },
        ChangeGNotice8() {
            this.$http.post('http://192.168.2.220:8070/SetBlackList', { user_id: window.sessionStorage.getItem("userid"), group_id: this.groupInfo.group_id })
                .then(response => {
                    // 处理请求成功的响应
                    console.log(response.data);
                    return this.$message.success('操作成功');
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                    return this.$message.error('操作失败');
                });
        },
        handleEnterG() {//群聊详备注框回车触发事件
            this.$refs.inputNotesG.blur(); // 让输入框失去焦点
            this.UpdataRemarkG()
        },
        async UpdataRemarkG() {//更新群聊备注
            await this.$http.post('http://192.168.2.220:8070/SetGroupName',
                { user_id: window.sessionStorage.getItem("userid"), group_id: this.groupInfo.group_id, group_name: this.groupInfo.my_group_name }).then(response => {
                    console.log(response.data)
                    return this.$message.success('更新成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('更新失败');
                })
        },
        handleSwitchChange2() {
            if (this.status2 === true) {
                this.SetPrivateChatBlack()
            } else {
                this.UnBlockPrivateChat()
            }
            
        },
        handleSwitchChange1() {
            if (this.status1 === true) {
                this.SetFriendCircleBlack()
            } else {
                this.UnBlockFriendCircle()
            }
        },
        SetPrivateChatBlack() {//私聊拉黑
            this.$http.post('http://192.168.2.220:8070/setPrivateChatBlack',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id }).then(response => {
                    console.log(response.data);
                    return this.$message.success('拉黑成功');
                }).catch(error => {
                    console.log(error)
                    this.status2 = false
                    return this.$message.error('系统内部内部错误');
                })
        },
        UnBlockPrivateChat() {//解除拉黑
            this.$http.post('http://192.168.2.220:8070/unBlockPrivateChat',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id }).then(response => {
                    console.log(response.data);
                    return this.$message.success('解除拉黑成功');
                }).catch(error => {
                    console.log(error)
                    this.status2 = true
                    return this.$message.error('系统内部内部错误');
                })
        },
        SetFriendCircleBlack() {//不看他朋友圈
            this.$http.post('http://192.168.2.220:8070/setFriendCircleBlack',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id }).then(response => {
                    console.log(response.data);
                    return this.$message.success('操作成功，将不展示他（她）的朋友圈');
                }).catch(error => {
                    console.log(error)
                    this.status1 = false
                    return this.$message.error('系统内部内部错误');
                })
        },
        UnBlockFriendCircle() {//解除 不看他朋友圈
            this.$http.post('http://192.168.2.220:8070/unBlockFriendCircle',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id }).then(response => {
                    console.log(response.data);
                    return this.$message.success('解除成功');
                }).catch(error => {
                    console.log(error)
                    this.status1 = true
                    return this.$message.error('系统内部内部错误');
                })
        },
        Del() {
            this.$http.post('http://192.168.2.220:8070/deleteFriend',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id }).then(response => {
                    return this.$message.success('删除成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('系统错误');
                })
        },
        removeTag(index, tag) {
            // 根据索引从标签数组中移除标签
            this.formcon.tags.splice(index, 1);
        },
        async addTag() {
            // 添加输入框中的标签到标签数组
            if (this.newTag.trim() !== '') {
                this.formcon.tags.push(this.newTag.trim());
                await this.$http.post('http://192.168.2.220:8070/addFriendTag', { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id, tag: this.newTag })
                    .then(response => {
                        // 处理请求成功的响应
                        someAsyncFunction(() => {
                            this.formcon.tags.push(newTag);
                        });
                        console.log(response.data);
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                    });
                console.log(this.formcon.tags)
                this.newTag = ''; // 清空输入框
            }
        },
        handleTagHover(index, isHovered) {
            this.isTagHovered = isHovered ? index : null;
        },
        handleSelectChange() {//消息改变处理函数
            this.$http.post('http://192.168.2.220:8070/setPrivateChatGray', { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id })
                .then(response => {
                    // 处理请求成功的响应
                    console.log(response.data);
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                });
                console.log(this.info)
                this.$store.commit('change_friend_status',{
                friend_id:this.info.user_id,
                status:this.info.is_private_chat_gray
            })
        },
        handleEnter() {//更新备注
            this.$refs.inputNotes.blur(); // 让输入框失去焦点
            console.log(window.sessionStorage.getItem("userid"))
            console.log(this.info.user_id)
            console.log(this.formcon.notes)
            this.UpdataRemark()
        },
        async UpdataRemark() {//更新备注
            await this.$http.post('http://192.168.2.220:8070/setFriendRemark',
                { user_id: window.sessionStorage.getItem("userid"), friend_id: this.info.user_id, remark: this.formcon.notes }).then(response => {
                    return this.$message.success('更新成功');
                }).catch(error => {
                    console.log(error)
                    return this.$message.error('更新失败');
                })
        },
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
        choose_msg_type(type) {//消息通知框内显示内容变化
            if (type == false || type == 6) {
                return "接收消息并提醒"
            } else if (type == true || type == 7) {
                return "接收但是不提醒"
            } else if (type == 8) {
                return "屏蔽该群"
            }
            
        },
        async toggleHighlight(userId) {//高亮显示好友，点击获取好友详细信息，消息通知下拉内容已选项禁用，切换main内容卡片
            this.highlightedUserId = this.highlightedUserId === userId ? '' : userId;
            this.ClearData()
            window.sessionStorage.setItem("contactor_id", userId)
            const info = this.List.find(item => item.friend_id === userId)
            const fform = {
                "user_id": window.sessionStorage.getItem("userid"),
                "friend_id": info.friend_id
            }
            await this.$http.post('http://192.168.2.220:8070/queryFriendInfo', fform).then(response => {
                this.info = response.data.data.friend_info
                this.formcon.notes = response.data.data.friend_info.remark
                this.formcon.signature = response.data.data.friend_info.signature === '' ? '无' : response.data.data.friend_info.signature
                this.formcon.status = response.data.data.friend_info.status
                this.formcon.tags.push(response.data.data.friend_info.tags === null ? '无' : response.data.data.friend_info.tags)
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
            console.log(this.info.is_private_chat_gray)
        },

        async MouseClick(id) {//点击获取群聊详细信息，消息通知下拉内容已选项禁用，切换main内容卡片
            // this.groupInfo = this.my_group_list.find(item => item.group_id === id)


            await this.$http.post('http://192.168.2.220:8070/QueryGroupInfo', { group_id: id, user_id: window.sessionStorage.getItem("userid") }).then(response => {
                this.groupInfo = response.data.data
                console.log(this.groupInfo)
            }).catch(error => {
                console.log(error)
                return this.$message.error('网络错误');
            })
            this.IsGO = this.groupInfo.owner_id === window.sessionStorage.getItem("userid") ? true : false
            console.log(this.IsGO)
            if (this.groupInfo.msg_type == 6) {
                this.options2[0].disabled = true
                this.options2[1].disabled = false
                this.options2[2].disabled = false
            } else if (this.groupInfo.msg_type == 7) {
                this.options2[0].disabled = false
                this.options2[1].disabled = true
                this.options2[2].disabled = false
            } else {
                this.options2[0].disabled = false
                this.options2[1].disabled = false
                this.options2[2].disabled = true
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
        JumpChatG() {
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
                this.$router.replace('/chat_msg' + this.index1 + '/' + this.groupInfo.group_id)
        },
        ClearData() {
            // this.List = [],
            // this.avator = '',
            this.info = {},
                this.groupInfo = {}
        }
    },
    created() {
        window.sessionStorage.setItem("contactor_id", "")
        this.List = this.$store.state.contactor_list
        this.my_group_list = this.$store.state.my_group_list
    },
    computed: {
        getStatusText() {
            switch (this.formcon.status) {
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
.hoverable .el-tag__close {
    display: none;
    margin-left: 20PX;
}

.hoverable:hover .el-tag__close {
    display: inline-block;
}

.img {
    width: 130px;
}

.infoG {
    margin-right: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
}

infoG>>>.el-textarea__inner {
    border: 0;
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
    flex-direction: row;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.button-wrapper {
    flex: 1;
    width: 100%;
    height: 100%;
}

/* button {
    margin-left: 45%;
    border-radius: 5px;
    line-height: 2px;
} */
</style>