<template>
  <div>
    <div class="panel">
      <el-tabs type="border-card" stretch v-model="activeMaterial">
        <el-tab-pane label="图片上传" name="pic" class="panel-son flex flex-direction justify-around">
          <div class="panel-son-top flex justify-around">
            <el-switch v-model="multiple" active-text="批量上传" inactive-text="单个上传"> </el-switch>
            <el-checkbox v-model="needCanvas">Canvas画帧(对上传的图片、视频做前置处理，是否画出缩略图?)</el-checkbox>
          </div>
          <div class="panel-son-bottom flex flex-direction justify-around align-center">
            <div class="piclist flex flex-wrap justify-center" style="height: 26vh; width: 100%; overflow: scroll;">
              <svg-icon
                icon-class="bg-upload"
                style="width:200px; height: 200px"
                v-show="Alinkimg1.length === 0 && !fulfill"
              />
              <svg-icon icon-class="wancheng" style="width:200px; height: 200px" v-show="fulfill" />
              <div
                v-for="(linkimg, index) in Alinkimg1"
                :key="index"
                style="width: 100px; height: 100px; margin: 10px; position: relative;"
                v-show="!fulfill"
              >
                <img :src="linkimg" alt="" />
                <img src="../../../assets/png/loading.gif" alt="" class="loadingLine" />
                <div class="loadingSpan flex justify-center align-center">请点开始上传</div>
              </div>
            </div>
            <ya-upload
              @linkBase64="(val) => (Alinkimg1 = val)"
              :action="uploadNow"
              :afterUpload="uploadAfter"
              :btn_words="multiple ? (needCanvas ? '批量选择' : '批量上传') : '单个上传'"
              size="mini"
              :autoUpload="true"
              :needCanvas="needCanvas"
              :fields="value"
              :multiple="multiple"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频上传" name="video" class="panel-son flex flex-direction justify-around">
          <div class="panel-son-top flex justify-around">
            <el-switch v-model="multiple" active-text="批量上传" inactive-text="单个上传"> </el-switch>
            <el-checkbox v-model="needCanvas">Canvas画帧(对上传的图片、视频做前置处理，是否画出缩略图?)</el-checkbox>
          </div>
          <div class="panel-son-bottom flex flex-direction justify-around align-center">
            <div class="piclist flex flex-wrap justify-center" style="height: 26vh; width: 100%; overflow: scroll;">
              <svg-icon
                icon-class="bg-upload"
                style="width:200px; height: 200px"
                v-show="Alinkimg2.length === 0 && !fulfill"
              />
              <svg-icon icon-class="wancheng" style="width:200px; height: 200px" v-show="fulfill" />
              <div
                v-for="(linkimg, index) in Alinkimg2"
                :key="index"
                style="width: 100px; height: 100px; margin: 10px; position: relative;"
                v-show="!fulfill"
              >
                <img :src="linkimg" alt="" />
                <img src="../../../assets/png/loading.gif" alt="" class="loadingLine" />
                <div class="loadingSpan flex justify-center align-center">请点开始上传</div>
              </div>
            </div>
            <ya-upload
              @linkBase64="(val) => (Alinkimg2 = val)"
              :action="uploadNow"
              :afterUpload="uploadAfter"
              :btn_words="multiple ? (needCanvas ? '批量选择' : '批量上传') : '单个上传'"
              size="mini"
              :autoUpload="true"
              :needCanvas="needCanvas"
              :fields="value"
              :multiple="multiple"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他上传" name="other" class="panel-son flex flex-direction justify-around">
          <div class="panel-son-top flex justify-around">
            <el-switch v-model="multiple" active-text="批量上传" inactive-text="单个上传"> </el-switch>
            <el-checkbox v-model="needCanvas">Canvas画帧(对上传的图片、视频做前置处理，是否画出缩略图?)</el-checkbox>
          </div>
          <div class="panel-son-bottom flex flex-direction justify-around align-center">
            <div class="piclist flex flex-wrap justify-center" style="height: 26vh; width: 100%; overflow: scroll;">
              <svg-icon
                icon-class="bg-upload"
                style="width:200px; height: 200px"
                v-show="Alinkimg3.length === 0 && !fulfill"
              />
              <svg-icon icon-class="wancheng" style="width:200px; height: 200px" v-show="fulfill" />
              <div
                v-for="(linkimg, index) in Alinkimg3"
                :key="index"
                style="width: 100px; height: 100px; margin: 10px; position: relative;"
                v-show="!fulfill"
              >
                <img :src="linkimg" alt="" />
                <img src="../../../assets/png/loading.gif" alt="" class="loadingLine" />
                <div class="loadingSpan flex justify-center align-center">请点开始上传</div>
              </div>
            </div>
            <ya-upload
              @linkBase64="(val) => (Alinkimg3 = val)"
              :action="uploadNow"
              :afterUpload="uploadAfter"
              :btn_words="multiple ? (needCanvas ? '批量选择' : '批量上传') : '单个上传'"
              size="mini"
              :autoUpload="true"
              :needCanvas="needCanvas"
              :fields="value"
              :multiple="multiple"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      multiple: false,
      needCanvas: false,
      Alinkimg1: [],
      Alinkimg2: [],
      Alinkimg3: [],
      activeMaterial: 'pic',
      fulfill: false,
    };
  },
  watch: {
    activeMaterial: {
      handler(newValue) {
        if (newValue === 'pic') {
          this.value.type = '1';
        } else if (newValue === 'video') {
          this.value.type = '2';
        } else {
          this.value.type = '3';
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    affirm(vlm) {
      vlm.handleClosed();
    },
    uploadNow(source, fields, thumb) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        if (source.length > 1) {
          formData.append('group_id', fields.group_id);
          formData.append('type', fields.type);
          for (let i = 0; i < source.length; i++) {
            thumb
              ? formData.append('thumbnail_' + i, thumb[i])
              : formData.append('thumbnail_' + i, 'https://kodo.mboke.top/404.png');
            formData.append('file_' + i, source[i]);
          }
        } else {
          thumb ? formData.append('thumbnail', thumb) : null;
          formData.append('group_id', fields.group_id);
          formData.append('type', fields.type);
          formData.append('file', source[0]);
        }
        let url;
        toString.call(source) === '[object Array]' && source.length > 1
          ? (url = 'qiniu/uploadMultipart')
          : (url = 'qiniu/upload'),
        this.$yian
          .uploadFormData(url, 'post', formData)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    uploadAfter(res) {
      console.log(res);
      if (res.code === 200) {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 5 * 1000,
        });
        this.fulfill = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  width: 100%;
  .panel-son {
    width: 100%;
    height: 50vh;
    .panel-son-bottom {
      width: 100%;
      height: 40vh;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      &:hover {
        border-color: #623ceb;
      }
      .loadingLine {
        width: 100px;
        position: absolute;
        z-index: 98;
        bottom: 0px;
        left: 0px;
      }
      .loadingSpan {
        position: absolute;
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 99;
        font-family: PingFang SC;
        color: #ffffff;
        bottom: 0px;
      }
    }
  }
}
</style>
