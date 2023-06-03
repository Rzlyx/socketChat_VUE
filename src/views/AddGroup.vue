<template>
    <div class="container">
        <div class="addG">
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <span>发起群聊</span>
                <div class="content">
                    {{ my_frinds_list }}
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="applyG">
            <el-dialog :visible.sync="dialogVisible2" v-if="searchGmsg" width="35%">
                <div class="content">
                    <div class="item item1">{{ searchGmsg.group_name}}</div>
                    <div class="item item2">{{ searchGmsg.group_id }}</div>
                    <div class="item item3">{{ searchGmsg.description }}</div>
                    <div class="item item4">{{ searchGmsg.create_time }}</div>
                    
                </div>

                <span slot="footer" class="dialog-footer">
                    <div style="display:flex">
                        <el-input v-model="applyfrom.reason" style="margin-right: 10px;" placeholder="输入原因" />
                        <el-button @click="dialogVisible2 = false, searchG = ''">取 消</el-button>
                        <el-button type="primary" @click="ApplyAG()">申请入群</el-button>
                    </div>

                </span>
            </el-dialog>
        </div>
        <div class="ApplicationStatus">
            <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column label="Name" prop="name">
                </el-table-column>
                <el-table-column label="Desc" prop="desc">
                </el-table-column>
                <el-table-column label="Status" prop="status">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <div style="display: flex; align-items: center">
                            <el-input v-model="searchG" size="mini" style="margin-right: 5px;" placeholder="请输入群号"
                                ref="searchInput" @keyup.native.enter="handleSearch()" />
                            <i class="el-icon-search" style="margin-right: 20px;" @click="searchGroup()"></i>
                            <el-button size="mini" style="margin-right: 10px;"
                                @click="dialogVisible = true">新建群聊</el-button>
                            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                        <el-button size="mini" type="danger" @click="handleNegate(scope.$index, scope.row)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                name: ' 王小明',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }, {
                name: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }, {
                name: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }, {
                name: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }, {
                name: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }, {
                name: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }, {
                name: '王小虎',
                desc: '上海市普陀区金沙江路 1518 弄',
                status: '已同意'
            }],
            search: '',
            searchG: '',
            dialogVisible: false,
            dialogVisible2: false,
            my_frinds_list: [],
            searchGmsg: {},//搜索到的群信息
            applyfrom: {
                user_id: '',
                group_id: '',
                reason: ''
            }
        }
    },
    methods: {
        handleDelete(index, row) {
            console.log(index, row);
        },
        async Submit() {
            try {
                const response = await this.$http.post('http://192.168.1.222:8070/addFriend', this.form);
                if (response.data.code !== 1000) {
                    return this.$message.error('添加失败');
                }
                this.$message.success('添加信息发送成功');
                console.log(response)
                // this.$root.$emit('AddSuccess');
            } catch (error) {
                console.error(error);
                return this.$message.error('请求失败，请重试');
            }
        },
        handleSearch() {
            console.log("测试1")
            const searchInput = this.$refs.searchInput.$el.querySelector('input')
            searchInput.blur() // 让输入框失去焦点
            this.searchGroup()
            this.applyfrom.group_id = this.searchG
        },
        async searchGroup() {// 搜索群聊,查看群信息
            console.log("测试2")
            console.log(Number(this.searchG))
            await this.$http.post('http://192.168.1.222:8070/QueryGroupInfo', { group_id: Number(this.searchG) }).then(response => {
                this.searchGmsg = response.data.data
                console.log(this.searchGmsg)
            }).catch(error => {
                console.log(error)
                return this.$message.error('没有找到该群聊');
            })
            this.dialogVisible2 = true
            this.applyfrom.user_id = window.sessionStorage.getItem('userid')
            this.applyfrom.group_id = this.searchG
        },
        ApplyAG() {//申请加群
            this.dialogVisible2 = false
            console.log('此处发送http请求')
            console.log(this.tableData[0])
            // this.$http.post('http://192.168.1.222:8070/group_id', this.applyfrom).then(response => {
            //     if (response.data.code !== 1000) {
            //         return this.$message.error('发送加群信息失败');
            //     }
            // }).catch(error => {
            //     console.log(error)
            //     return this.$message.error('没有找到该群聊');
            // })
        }
    },
    created() {
        this.my_frinds_list = this.$store.state.my_friends_list
        console.log(this.my_frinds_list)
        // const response = this.$http.post('http://192.168.1.222:8070/queryGroupApply', window.sessionStorage.getItem("userid"));
        // if (response.data.code !== 1000) {
        //     return this.$message.error('获取信息失败');
        // }
        // console.log(response)
        // this.tableData.name = response.data.applicat_name
        // this.tableData.desc = response.data.reason
        // this.tableData.status = response.data.status
    }

}
</script>

<style scope>
.content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 10px;
}

.item {
    background-color: #f5f4f4;
    padding: 10px;
}
</style>