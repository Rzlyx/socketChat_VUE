<template>
  <div class="friend-circle">
    <div class="input-container">
      <textarea v-model="content" placeholder="这一刻的想法..."></textarea>
      <button @click="addImage">添加图片</button>
    </div>
    <div class="image-preview">
      <img v-for="image in images" :src="image" :key="image" />
    </div>
    <div class="privacy">
      <div class="privacy-button">
        <el-button @click="drawer = true" type="primary" block icon="el-icon-location-outline"
          style="margin-left: 16px;">所在位置</el-button>
        <el-button @click="drawer = true" type="primary" block icon="el-icon-s-opportunity"
          style="background-color: #409EFF; color: #ffffff;">提醒谁看</el-button>
        <el-button @click="drawer = true" type="primary" block icon="el-icon-view"
          style="background-color: #409EFF; color: #ffffff;">谁可以看</el-button>
      </div>

      <!-- <el-drawer title="谁可以看" :visible.sync="drawer" :with-header="false">
        <span class="option" :class="{ active: privacy === 'public' }" @click="setPrivacy('public')">
          <i class="fa fa-globe"></i>
          <span>公开</span>
        </span>
        <span class="option" :class="{ active: privacy === 'private' }" @click="setPrivacy('private')">
          <i class="fa fa-lock"></i>
          <span>私密</span>
        </span>
        <span class="option" :class="{ active: privacy === 'partial' }" @click="setPrivacy('partial')">
          <i class="fa fa-users"></i>
          <span>部分可见</span>
        </span>
        <span class="option" :class="{ active: privacy === 'deny' }" @click="setPrivacy('deny')">
          <i class="fa fa-ban"></i>
          <span>不给谁看</span>
        </span>
      </el-drawer> -->
      <el-drawer :visible.sync="drawer" title="谁可以看" :with-header="false">
        <el-radio-group v-model="privacy">
          <el-radio-button label="public" class="option">
            <span>公开</span>
          </el-radio-button>
          <el-radio-button label="private" class="option">
            <span>私密</span>
          </el-radio-button>
          <el-radio-button label="partial" class="option">
            <span>部分可见</span>
          </el-radio-button>
          <el-radio-button label="deny" class="option">
            <span>不给谁看</span>
          </el-radio-button>
        </el-radio-group>
      </el-drawer>
    </div>
    <button class="submit-button" @click="submit">发布</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      images: [],
      privacy: 'public', // 默认公开
      drawer: false,
    }
  },
  methods: {
    addImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.addEventListener('change', this.handleImageSelected);
      input.click();
    },
    handleImageSelected(event) {
      const files = event.target.files;
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        urls.push(url);
      }
      this.images = this.images.concat(urls);
    },
    setPrivacy(privacy) {
      this.privacy = privacy;
    },
    submit() {
      // 提交数据到服务器
      // ...

      // 发布成功后返回上一页
      this.$router.back();
    }
  },
  created(){
    window.sessionStorage.setItem("contactor_id", "")
  }
}
</script>

<style>
/* 样式可以根据实际需求进行调整 */
.friend-circle {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

textarea {
  width: 100%;
  height: 100px;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 1.6;
  padding: 8px;
}

button {
  margin-top: 8px;
  padding: 8px 16px;
  border: none;
  background-color: #eee;
  cursor: pointer;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}

.image-preview img {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 8px;
  margin-bottom: 8px;
}

.privacy {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-top: 1px solid #ddd;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;
  cursor: pointer;
}

.option.active {
  color: #09f;
}

.option i {
  font-size: 24px;
}

.option span {
  margin-top: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.submit-button {
  margin-top: auto;
  padding: 16px;
  background-color: #09f;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
  cursor: pointer;
}
</style>