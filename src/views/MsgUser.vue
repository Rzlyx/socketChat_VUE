<template>
    <el-container>
        <el-aside>
            <div class="msg_list_container">
                <div class="search">
                    
                </div>
                <div class="user_list">
                    <div v-for="(user, index) in sortedUserlist" :key="user.id"
                        :class="['user-container', { highlighted: user.id === highlightedUserId }]"
                        @click="toggleHighlight(user.id, index)">
                        <div class="user-container">
                            <div class="user-picture">
                                <el-badge :value="user.num" class="item" :hidden="user.num === 0">
                                    <img :src="user.picture" alt="用户头像" />
                                </el-badge>
                            </div>
                            <div class="user-info">
                                <div class="user-name">{{ user.name }}</div>
                                <div class="user-msg">{{ user.new_msg }}</div>
                            </div>
                            <div class="user-time">{{ formatTime(user.time) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
  
<style scoped>
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

.user-info {
    max-width: 200px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: bold;
    font-size: 16px;
}

.user-msg {
    max-width: 150px;
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.user-time {

    font-size: 12px;
    margin-left: 0;
    /* 将 user-time 推到最右边 */
    color: #888;
}

.user-separator {
    margin: 10px 0;
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    max-width: 320px;
}

.user_list {
    margin-top: 10px;
    width: 320px;
}

.el-main {
    padding: 0px
}
</style>
  
<script>
export default {
    data() {
        return {
            input4: "",
            userlist: [

            ],
            sortedUserlist: [], // 存储排序后的用户列表
            highlightedUserId: '' // 存储高亮用户的 ID
        };
    },
    computed: {
        sortedUserlist1() {
            // 使用计算属性生成排序后的用户列表
            return this.userlist.slice().sort((a, b) => {
                // 根据排序逻辑进行排序
            });
        }
    },
    mounted() {
        this.sortUserlist(); // 页面加载时排序
    },
    methods: {
        toggleHighlight(userId, index) {
            // 切换高亮用户,显示聊天信息
            this.highlightedUserId = this.highlightedUserId === userId ? '' : userId;
            index = window.sessionStorage.getItem("msg")
            if (index == undefined || index == '2') {
                index = '1'
                window.sessionStorage.setItem("msg", "1")
            }
            else if (index == '1') {
                index = '2'
                window.sessionStorage.setItem("msg", "2")
            }
            window.sessionStorage.setItem("contactor_id", userId)
            this.$router.replace('/chat_msg' + index + '/' + userId)
        },
        sortUserlist() {
            this.sortedUserlist = this.userlist
                .slice()
                .sort((a, b) => {
                    const dateA = new Date(a.time);
                    const dateB = new Date(b.time);
                    return dateB.getTime() - dateA.getTime();
                });
        },
        formatTime(time) {
            const currentTime = new Date();
            const messageTime = new Date(time);

            const diff = currentTime - messageTime;
            const oneDay = 24 * 60 * 60 * 1000;
            const oneYear = 365 * oneDay;

            if (diff < oneDay) {
                // 如果是今天，只展示时间
                return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (diff < oneYear) {
                // 如果是过去一年内，只展示日期
                return messageTime.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
            } else {
                // 超过一年，只展示年份
                return messageTime.getFullYear().toString();
            }
        },
        
    },
    created() {
        this.userlist = this.$store.state.user_list
    }

};
</script>
  