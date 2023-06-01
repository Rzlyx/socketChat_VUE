<template>
    <div class="container">
        <div class="addF">

        </div>
        <div class="ApplicationStatus">
            <el-table :data="tableData"
                style="width: 100%">
                <el-table-column label="Name" prop="name">
                </el-table-column>
                <el-table-column label="Desc" prop="desc">
                </el-table-column>
                <el-table-column label="Status" prop="status">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="新增联系人" />
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
            search: ''
        }
    },
    methods: {
        handleDelete(index, row) {
            console.log(index, row);
        },
        async Submit() {
            try {
                const response = await axios.post('http://192.168.1.222:8070/addFriend', this.form);
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
        }
    },
    created() {
        const response = axios.post('http://192.168.1.222:8070/queryFriendApply', window.sessionStorage.getItem("userid"));
        if (response.data.code !== 1000) {
            return this.$message.error('获取信息失败');
        }
        console.log(response)
        this.tableData.name = response.data.applicat_name
        this.tableData.desc = response.data.reason
        this.tableData.status = response.data.status
        // this.$root.$emit('AddSuccess');
    }

}
</script>