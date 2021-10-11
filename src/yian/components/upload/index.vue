<script>
export default {
  props: {
    //上传axios操作，保证是一个promise
    action: {
      type: Function,
      default: () => {},
    },
    //上传后的回调函数，包括成功和失败
    afterUpload: {
      type: Function,
      default: () => {},
    },
    //是否需要截取vedio画面第一帧
    needCanvas: {
      type: Boolean,
      default: false,
    },
    //多文件 multiple和needCanvas同时为ture，上传需要分两步走
    multiple: {
      type: Boolean,
      default: false,
    },
    //自动上传?
    autoUpload: {
      type: Boolean,
      default: true,
    },
    //按钮文字内容
    btn_words: {
      type: String,
      default: '上传图片',
    },
    //按钮大小，支持el系 medium / small / mini 三种大小
    size: {
      type: String,
      default: 'medium',
    },
    //按钮颜色，支持el系 primary / success / warning / danger / info / text
    color_type: {
      type: String,
      default: 'primary',
    },
    fields: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      thumbnails: [],
      postFiles: [],
      upload_file: `upload-file-${Math.round(Math.random() * 10000).toString()}`,
    };
  },
  computed: {
    label_class() {
      if (this.size === 'medium') {
        return `el-button el-button--${this.color_type}`;
      } else if (this.size === 'small') {
        return `el-button el-button--${this.color_type} el-button--small`;
      } else if (this.size === 'mini') {
        return `el-button el-button--${this.color_type} el-button--mini`;
      } else {
        return `el-button el-button--${this.color_type}`;
      }
    },
  },
  beforeUpdate() {
    console.log(this.multiple);
  },
  methods: {
    //变动时
    handleChange(e) {
      const files = e.target.files;
      if (!files) return;
      this.getUploadFiles(files);
    },

    //canvas处理vedio
    canvasDrawVedio(postFiles, callfn) {
      for (let i = 0; i < postFiles.length; i++) {
        const file = postFiles[i];
        if (/video\/.*/.test(postFiles[i].type)) {
          var video = document.createElement('video');
          video.src = URL.createObjectURL(file);
          console.log(video.src);
          video.addEventListener('loadeddata', function() {
            //走一遍video，在1秒处定格画面
            this.currentTime = 1;
          });
          video.addEventListener('seeked', function() {
            // this.width = this.videoWidth;
            // this.height = this.videoHeight;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 100;
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            var thumb = canvas.toDataURL('image/jpeg', 0.05);
            callfn(thumb);
          });
        } else {
          const reader = new FileReader();
          let img = new Image();
          reader.onload = (evt) => {
            img.src = evt.target.result;
          };
          reader.readAsDataURL(file);
          img.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 100, 100);
            var thumb = canvas.toDataURL('image/jpeg', 0.1);
            callfn(thumb);
          };
        }
      }
    },

    //处理选择的文件
    getUploadFiles(files) {
      let postFiles = Array.from(files); //类数组转数组
      //console.log(postFiles)
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      if (postFiles.length === 0) return;
      this.upload(postFiles);
    },

    //上传操作前的处理
    upload(postFiles) {
      let filesType = []; //不能图片和视频混着传，因为数据库fileds关键字的问题
      for (let i = 0; i < postFiles.length; i++) {
        if (postFiles[i].size / 1024 / 1024 > 3 && /image\/.*/.test(postFiles[i].type)) {
          this.$message({
            message: `${postFiles[i].name}图片超过上传大小限制，最大3Mb`,
            type: 'error',
            duration: 5 * 1000,
          });
          this.$refs.fileInput.value = null;
          return;
        } else if (postFiles[i].size / 1024 / 1024 > 50 && /video\/.*/.test(postFiles[i].type)) {
          this.$message({
            message: `${postFiles[i].name}视频超过上传大小限制，最大50Mb`,
            type: 'error',
            duration: 5 * 1000,
          });
          this.$refs.fileInput.value = null;
          return;
        } else {
          filesType.push(postFiles[i].type);
        }
      }
      const reg = new RegExp(`${filesType[0].slice(0, 3)}.*`, 'i'); //验证批量上传时是否是同一类型的文件
      const result = filesType.every((element) => reg.test(element));
      if (result) {
        this.needCanvas && this.multiple
          ? this.beforePost(postFiles)
          : this.autoUpload
          ? this.post(postFiles)
          : this.$emit('selectX', postFiles); //非自动上传把postFiles，$emit出来
      } else {
        this.$message({
          message: '批量上传时请上传同一类型的文件!',
          type: 'error',
          duration: 5 * 1000,
        });
        this.$refs.fileInput.value = null;
        return;
      }
    },

    //数据上传前的前置操作
    beforePost(postFiles) {
      this.postFiles = postFiles;
      if (/video\/.*/.test(postFiles[0].type) || /image\/.*/.test(postFiles[0].type)) {
        this.canvasDrawVedio(postFiles, (thumb) => {
          this.thumbnails.push(thumb);
        });
        console.log(this.thumbnails)
        this.$emit('linkBase64', this.thumbnails) //事件监听是__ob__,这里不用担心异步
      } else {
        this.$message({
          message: '非视频、图片类文件无法使用Canvas画图帧!',
          type: 'error',
          duration: 5 * 1000,
        });
      }
    },

    //数据正式上传[callback]  且onSuccess[callback]
    waitPost() {
      if(this.postFiles.length === 0 ) {
        this.$message({
          message: '请先批量选择素材，再点击开始上传!',
          type: 'error',
          duration: 5 * 1000,
        });
        return
      }
      if (/video\/.*/.test(this.postFiles[0].type) || /image\/.*/.test(this.postFiles[0].type)) {
        this.action(this.postFiles, this.fields, this.thumbnails).then((res) => {
          this.afterUpload(res);
        });
      } else {
        this.action(this.postFiles, this.fields).then((res) => {
          this.afterUpload(res);
        });
      }
    },

    //数据正式上传[callback]  且onSuccess[callback]
    post(postFiles) {
      if (this.multiple) {
        this.action(postFiles, this.fields).then((res) => {
          this.afterUpload(res);
        });
      } else {
        if (this.needCanvas && (/video\/.*/.test(postFiles[0].type) || /image\/.*/.test(postFiles[0].type))) {
          this.canvasDrawVedio(postFiles, (thumb) => {
            this.action(postFiles, this.fields, thumb).then((res) => {
              this.afterUpload(res);
            });
          });
        } else {
          this.action(postFiles, this.fields).then((res) => {
            this.afterUpload(res);
          });
        }
      }
    },
  },
  render(h) {
    return (
      <div>
        <label for={this.upload_file} class={this.label_class}>
          {this.btn_words}
        </label>
        <input
          ref="fileInput"
          type="file"
          id={this.upload_file}
          style="display: none"
          on-change={this.handleChange}
          multiple={this.multiple}
        />
        <button
          type="primary"
          on-click={this.waitPost}
          class={this.label_class}
          v-show={this.needCanvas && this.multiple}
          style="margin-left: 20px"
        >
          开始上传
        </button>
      </div>
    );
  },
};
</script>

<style></style>
