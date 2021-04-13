<template>
  <div class="addArticle">
    <el-form ref="article" :inline="true" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title" class="title" placeholder="文章标题" />
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="article.sort" class="inline-input" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top" />
      </el-form-item>
      <el-form-item>
        <el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
      </el-form-item>
      <el-form-item label="缩略图上传" label-width="95px">
        <el-upload
          class="avatar-uploader"
          action="/api/editor/uploadImg"
          :show-file-list="false"
          :on-success="handlethumbnailSuccess"
          :before-upload="beforethumbnailUpload"
        >
          <img v-if="article.thumbnail" :src="article.thumbnail" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="banner图上传" label-width="110px">
        <el-upload
          class="avatar-uploader"
          action="/api/editor/uploadImg"
          :show-file-list="false"
          :on-success="handleBannerSuccess"
          :before-upload="beforeBannerUpload"
        >
          <img v-if="article.banner" :src="article.banner" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <WangEditor v-model="article.content_html" :value="article.value" :is-clear="isClear" @change="change" />
  </div>
</template>

<script>
import { fetchAddArticle, fetchGetArticle } from '@/api/apis/article'
import WangEditor from '@/components/Editor/wangEditor.vue'
export default {
  name: 'AddArticle',
  components: { WangEditor },
  data() {
    return {
      article: {
        id: '',
        title: '',
        sort: '',
        top: false,
        content_html: '',
        thumbnail: '',
        banner: '',
        value: '' // 这个值是根据文章二次编辑时的富文本内容传入的
      },
      isClear: false // isClear用在发布文章后，清空富文本内容
    }
  },
  mounted() {
    const id = this.$route.query.articleId
    if (id !== null) {
      fetchGetArticle({ id }).then(res => {
        for (const item in this.article) {
          this.article[item] = res[item]
        }
        this.article.value = res.content_html
      })
    }
  },
  methods: {
    change(val) {
      this.article.content_html = val // 这个val就是子组件传来的this._info
      // console.log(this.article.content_html)
    },
    handlethumbnailSuccess(res, file) {
      this.article.thumbnail = res.data[0]
    },
    beforethumbnailUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) {
        this.$message.error('上传文章缩略图只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传文章缩略图大小不能超过 2MB!')
      }
      return (isLt2M && isJPG) || (isPNG && isLt2M)
    },
    handleBannerSuccess(res, file) {
      this.article.banner = res.data[0]
    },
    beforeBannerUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!(isJPG || isPNG)) {
        this.$message.error('上传banner只能是 JPG/PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传banner图片大小不能超过 5MB!')
      }
      return (isLt5M && isJPG) || (isPNG && isLt5M)
    },
    submitArticle() {
      fetchAddArticle(this.article).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        // Object.assign(this.$data,this.$options.data())
        this.$router.push({ name: '文章列表' })
      }).catch(err => {
        this.$throw(err)
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
  .addArticle {
    margin-top: 20px;
  }

  .title {
    width: 900px;
  }

  .subBtn {
    width: 100px;
    margin: 0 auto;
  }
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
