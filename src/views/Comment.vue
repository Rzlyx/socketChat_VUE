<template>
  <div>
    <div class="moment">
      <p>{{moment.content}}</p>
      <div class="like-list">
        <div v-for="(like, index) in moment.likes" :key="index" class="like">
          <img :src="like.avatar" alt="">
          {{like.name}}
        </div>
      </div>
      <button @click="handleLikeClick">点赞</button>
      <div class="comment-list">
        <div v-for="(comment, index) in moment.comments" :key="index" class="comment">
          <img :src="comment.avatar" alt="">
          <div>
            <p>{{comment.name}}：</p>
            <p>{{comment.content}}</p>
          </div>
        </div>
      </div>
      <input v-model="commentInput" placeholder="评论...">
      <button @click="handleCommentSubmit">评论</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moment: {
        id: 1,
        content: '今天天气真好！',
        likes: [
          {
            avatar: 'path/to/avatar-1',//表示用户的头像图片的路径
            name: '小明'
          },
          {
            avatar: 'path/to/avatar-2',
            name: '小红'
          }
        ],
        comments: [
          {
            avatar: 'path/to/avatar-3',
            name: '小刚',
            content: '确实不错！'
          }
        ]
      },
      commentInput: ''
    }
  },
  methods: {
    handleLikeClick() {
      const { likes } = this.moment;
      likes.push({
        avatar: 'path/to/avatar-4',
        name: '小李'
      });
    },
    handleCommentSubmit() {
      const { comments } = this.moment;
      comments.push({
        avatar: 'path/to/avatar-5',
        name: '小白',
        content: this.commentInput
      });
      this.commentInput = '';
    }
  }
}
</script>