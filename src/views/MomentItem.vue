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
          style="background-color: #409EFF; color: #ffffff;">所在位置</el-button>
        <el-button @click="drawer = true" type="primary" block icon="el-icon-view"
          style="background-color: #409EFF; color: #ffffff;">谁可以看</el-button>
      </div>

      <el-drawer :visible.sync="drawer" title="谁可以看" :with-header="false">
        <el-radio-group v-model="privacy">
          <el-radio-button label="public" class="option">
            <span>公开</span>
          </el-radio-button>
          <el-radio-button label="private" class="option">
            <span>私密</span>
          </el-radio-button>
          <el-radio-button label="deny" class="option">
            <span @click="testa()">不给谁看</span>
          </el-radio-button>
          <el-checkbox-group class=checkbox_group v-if="showUserList" v-model="checkedCities"
            @change="handleCheckedCitiesChange">
            <el-checkbox class=checkbox v-for="city in cities" :label="city" :key="city">
              {{ city }}
            </el-checkbox>
          </el-checkbox-group>

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
      showUserList: false,// 是否显示用户列表
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      contactorlist: [
      ],
    }
  },
  methods: {
    testa() {
      this.showUserList = !this.showUserList
      console.log(this.showUserList)
    },
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


    async submit() {
      // console.log( this.content.length !=0 && this.images.length ==0)
      const userid = window.sessionStorage.getItem("userid")
      let type = 0 // 朋友圈的类型，初值设为 0
      if (this.content.length != 0 && this.images.length == 0) {
        // 只有文本
        type = 1 // 设置 type 值为 1
        console.log(type)
      } else if (this.content.length == 0 && this.images.length != 0) {
        // 只有图片
        type = 2 // 设置 type 值为 2
        console.log(type)
      } else {
        // 文本和图片
        type = 4 // 设置 type 值为 4
        console.log(type)
      }
      console.log(type)
      console.log(this.content)
      try {
        console.log(userid)
        if (type == 1) {
          const { data } = await this.$http.post('http://192.168.2.220:8070/SendCircle', {
            sender: userid,
            news: this.content,
            type: type,
            black_list: this.contactorlist,
            circle_type: this.privacy,
          })
        }
        // else if (type == 2){
        //   const { data } = await this.$http.post('http://192.168.2.220:8070/UploadCirclePhoto', {
        //     news_id: this.news_id,
        //   })
        // }
        else if (type == 4) {
          const { data: momentData } = await this.$http.post('http://192.168.2.220:8070/SendCircle', {
            sender: userid,
            news: this.content,
            type: type,
            black_list: this.contactorlist,
            circle_type: this.privacy,
          })
          console.log('发布成功:', momentData) // 输出成功信息
          var image_id = momentData.data.news_id

          // if (this.images.length != 0) {
          const { data: imageData } = await this.$http.post('http://192.168.2.220:8070/UploadCirclePhoto', {
            news_id: image_id,
            photo: this.images,
          })
          console.log('图片上传成功:', imageData) // 输出成功信息

          // }

        }
        // console.log('发布成功:', data) // 输出成功信息
        this.$router.back() // 发布成功后返回上一页
      } catch (error) {
        console.error('发布失败:', error) // 输出错误信息
      }
    },
    // async submit() {
    //   try {
    //     const { data } = await this.$http.post('http://192.168.8.220:8070/SendCircle', {
    //       sender: this.sender,
    //       news: this.news,
    //       type: this.type,
    //       blacklist: this.blacklist,
    //       circletype: this.circletype,
    //     })
    //     console.log('发布成功:', data) // 输出成功信息
    //     this.$router.back() // 发布成功后返回上一页
    //   } catch (error) {
    //     console.error('发布失败:', error) // 输出错误信息
    //   }
    // },
    // async submit() {

    //   // 提交数据到服务器
    //   // ...

    //   // 发布成功后返回上一页
    //   this.$router.back();
    // },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
  }
}
</script>

<style lang="less" scoped>
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

.checkbox_group {
  display: flex;
  flex-wrap: wrap;
}

.checkbox {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>