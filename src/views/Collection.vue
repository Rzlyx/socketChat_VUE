<template>
  <div class="image-list" ref="imageList">
    <div v-for="(item, index) in imageRows" :key="index" class="image-row">
      <div v-for="image in item" :key="image" :style="{width: imageSize + 'px', height: imageSize + 'px', backgroundImage: 'url(' + image + ')'}" class="image"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        // ...
      ],
      row: 4, // 每行图片个数
      listWidth: 0 // 图片列表宽度
    }
  },
  computed: {
    imageRows() {
      // 根据行数计算每一行应该展示的图片地址
      const rows = []
      const length = this.images.length
      const rowNum = Math.ceil(length / this.row)
      for (let i = 0; i < rowNum; i++) {
        let start = i * this.row
        let end = start + this.row
        rows.push(this.images.slice(start, end))
      }
      return rows
    },
    imageSize() {
      // 计算每个元素的大小
      const images = this.images
      const length = images.length
      switch (length) {
        case 1:
          return this.listWidth
        case 2:
          return (this.listWidth - 10) / 2
        default:
          return (this.listWidth - 20) / 3
      }
    }
  },
  mounted() {
    // 获取列表元素宽度
    this.listWidth = this.$refs.imageList.offsetWidth
  },
  created(){
    window.sessionStorage.setItem("contactor_id", "")
  }
}
</script>

<style>
.image-list {
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
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
</style>