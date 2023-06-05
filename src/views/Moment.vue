<template>
    <el-container>
        <el-aside style="width: 600px;">
            <div class="moment_list_container">
                <div class="image-container">
                    <div class="backgrand">
                        <el-image :src="url" :preview-src-list="srcList"></el-image>
                    </div>
                    <div class="button-container">
                        <router-link to="/momentitem" class="link-class">
                            <i style="font-size: 24px" class="el-icon-camera"></i>
                        </router-link>
                    </div>

                </div>
                <div class="moment_list">
                    <div v-for="(momentI, index) in momentlist" :key="momentI.id">
                        <div class="moment-container">
                            <div class="moment-avetor">
                                <el-avatar :size="50" :src="momentI.avator"></el-avatar>
                            </div>&nbsp;&nbsp;
                            <div class="moment-name">{{ momentI.name }}</div>
                        </div>
                        <div class="moment-info">
                            <div class="moment-msg">{{ momentI.new_msg }}</div>
                            <div class="moment-picture" ref="imageList">
                                <div v-for="(item, index) in imageRows(momentI)" :key="index" class="image-row">
                                    <div v-for="image in item" :key="image"
                                        :style="{ width: imageSize(momentI) + 'px', height: imageSize(momentI) + 'px', backgroundImage: 'url(' + image + ')' }"
                                        class="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="moment-time">
                            <div>{{ momentI.time }}</div>
                            <div class="moment-icon">
                                <el-tooltip class="item" effect="dark" content="点赞" placement="bottom">
                                    <div><i @click="handleLikeClick(index)" class="el-icon-magic-stick"></i></div>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="评论" placement="bottom">
                                    <div><i @click="showCommentBox = true" class="el-icon-chat-square"></i></div>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="moment-comment">
                            <div class="like-list" v-if="momentI.likes.length !== 0">
                                <div v-if="momentI.likes" class="like">
                                    <i class="el-icon-magic-stick"></i>
                                    <span class="like-names">
                                        <span v-for="(like, index) in momentI.likes" :key="index">{{ like.name }} </span>
                                    </span>
                                </div>
                            </div>
                            <div class="comment-list" v-if="momentI.comments.length !== 0">
                                <div v-if="momentI.comments" v-for="(comment, index) in momentI.comments" :key="index"
                                    class="comment">
                                    <div class="comment-info">
                                        <span class="comment-name">{{ comment.name }}:</span>
                                        <span class="comment-content">{{ comment.content }}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="showCommentBox" class="comment-box">
                                <input v-model="commentInput" placeholder="评论...">
                                <button @click="handleCommentSubmit(index)">提交评论</button>
                            </div>

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
.el-icon-magic-stick:hover {
    cursor: pointer;
    color: blue;
}

.el-icon-chat-square:hover {
    cursor: pointer;
    color: blue;
}

.moment-icon {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.moment-icon div {
    margin-right: 10px;
    /* 调整图标之间的间距 */
}

.image-container {
    position: relative;
}

.backgrand {
    position: relative;
    /* 其他样式 */
}

.button-container {
    position: absolute;
    top: 10px;
    /* 调整垂直位置 */
    right: 10px;
    /* 调整水平位置 */
}

.link-class {
    color: wheat;
}

.moment-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    /* 其他样式 */
}

.moment-avetor {
    display: flex;
    align-items: center;
    max-width: 50px;
    flex: 0 0 50px;
    /* 让元素宽固定为50px */
    top: 0;
    /* 其他样式 */
}


.moment-info {
    max-width: 350px;
    max-height: 550px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    /* 如果内容过多可以出现滚动条 */
}

.moment-name {
    flex: 1;
    font-weight: bold;
    font-size: 16px;
}

.moment-msg {
    max-width: 150px;
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.moment-picture {
    margin-right: 50px;
    max-width: 200px;
    max-height: 300px;
    margin-bottom: 10px;
    /* 调整下方间距，避免与下方元素重叠 */
    display: flex;
    flex-wrap: wrap;

}

.image-row {
    display: flex;
    flex-wrap: nowrap;
    margin: 5px;
}

.image {
    margin-right: 5px;
    margin-bottom: 5px;
    background-size: cover;
    background-position: center;
}

.moment-picture img {
    width: 50px;
    height: 50px;
    /* border-radius: 50%; */
}

.moment-time {
    max-width: 280px;
    justify-content: space-between;
    display: flex;
    font-size: 12px;
    margin-left: 0;
    /* 将 moment-time 推到最右边 */
    color: #888;
}

.like-list .like {
    display: flex;
    align-items: center;
}

.like-list .like i {
    margin-right: 5px;
    font-size: 16px;
    color: #245779;
}

.like-list .like-names {
    white-space: nowrap;
    color: #245779;
}

.comment {
    margin-bottom: 8px;
}

.comment-info {
    display: inline-block;
}

.comment-name {
    margin-right: 5px;
    color: #245779;
}

.item {
    margin: 4px;
}

.el-main {
    padding: 0px
}
</style>

<script>
// import Moment from './MomentItem.vue';
export default {
    data() {
        return {
            showPopover: false,
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
            momentlist: [
            ],
            momentI: {

            },
            row: 3, // 每行图片个数
            listWidth: 280, // 图片列表宽度
            showCommentBox: false,
            commentInput: '',

        };
    },
    mounted() {
        this.$nextTick(() => {
            this.listWidth = this.$refs.imageList ? this.$refs.imageList.offsetWidth : 0;
        });
        this.momentlist = JSON.parse(JSON.stringify(this.momentlist));
    },

    computed: {
        moment_list() {
            return this.$store.state.moment_list;
        }
    },
    methods: {
        imageRows(momentI) {
            // 根据行数计算每一行应该展示的图片地址
            const rows = []
            const length = momentI.picture.length
            const rowNum = Math.ceil(length / this.row)
            for (let i = 0; i < rowNum; i++) {
                let start = i * this.row
                let end = start + this.row
                rows.push(momentI.picture.slice(start, end))
            }
            return rows
        },
        imageSize(momentI) {
            // 计算每个元素的大小
            const images = momentI.picture
            const length = images.length
            switch (length) {
                case 1:
                    return this.listWidth
                case 2:
                    return (this.listWidth - 10) / 2
                default:
                    return (this.listWidth - 20) / 3
            }
        },

        handleLikeClick(index) {
            const userid = '125345453'   /*window.localStorage.getItem("id")*/
            const username = '任' /*window.localStorage.getItem("username")*/
            const like_info = {
                id: userid,
                name: username,
                index: index
            }
            this.$store.commit('momentLikes', like_info);
            this.momentlist=this.$store.state.moment_list;
            //
        },
        handleCommentSubmit(index) {
            const userid = '12345612'   /*window.localStorage.getItem("id")*/
            const username = '小任' /*window.localStorage.getItem("username")*/

            const comment_info = {
                id: userid,
                name: username,
                content: this.commentInput,
                index: index
            }
            this.$store.commit('momentComments', comment_info);
            this.momentlist=this.$store.state.moment_list;
            this.commentInput = '';
            this.showCommentBox = false;
            console.log(this.momentlist[index])
        },

        handleMomentAdded(momentI) {
            this.moments.unshift(momentI);
        },

    },
    created() {
        this.momentlist = this.$store.state.moment_list
    },




}
</script>