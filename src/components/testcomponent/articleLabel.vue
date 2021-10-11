<template>
  <div class="">
    <el-cascader
      ref="label"
      v-model="value"
      placeholder="文章标签"
      :options="options"
      :show-all-levels="false"
      :props="{ multiple: true, checkStrictly: true, emitPath: false }"
      clearable
      @change="handleChange"
    />
    <div class="flex justify-center align-center" style="width:300px; height: 200px background-color: #34D4E9">
      这是一个方块
    </div>
    <svg-icon icon-class="shouye" />
    <svg-icon icon-class="https://panjiachen.github.io/vue-element-admin-site/home.png" />
    <svg-icon icon-class="bug" />
    <el-button v-popup.orderShipping="0" type="primary" vvbb="12" module="order">主要按钮</el-button>
    <el-button id="12" v-popup.orderShipping="{ a: 1, b: 1 }" type="primary" module="order" width="1200"
      >主要按钮</el-button
    >
    <testcom></testcom>
    <testcom2 @click.native="comCli">
      <template v-slot:testcom2>
        <span>helloword</span> </template
      >>
    </testcom2>
    <img
      @click="upload"
      style="width: 200px; height: 200px; background: green; z-index: 999"
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F01%2F35%2F77%2F80573bf4a16f06d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633854298&t=4bba4d95e06dc28e6d3b647901b5d63d"
      alt=""
    />
    <div v-html="`<div style='width: 200px; height: 200px; background: green;'>haha</div>`"></div>
    <!--     <label for="upload-file" class="el-button el-button--primary">
      上传图片
    </label>
    <input type="file" id="upload-file" title=" " style="display: none"> -->
    <!-- <input ref="ipt" type="file" id="upload-file" title=" " @change="upchange" multiple> -->
    <ya-upload
      :action="uploadNow"
      :afterUpload="uploadAfter"
      btn_words="批量选择"
      size="mini"
      :autoUpload="true"
      :multiple="true"
      :needCanvas="true"
      :fields="{ type: '1', group_id: '4' }"
    />
    <img :src="linkimg" alt="" style="width: 200px; height: 200px" />
    <ya-upload
      :action="uploadNow"
      :afterUpload="uploadAfter"
      btn_words="单个上传"
      size="mini"
      :autoUpload="true"
      :needCanvas="true"
      :fields="{ type: '1', group_id: '4' }"
    />
    <img>
    haha
    <img>
  </div>
</template>

<script>
import { fetchGetAcademicField } from '@/api/apis/academicfield';
import { fetchGetArticleLabel } from '@/api/apis/articlelabel';
import testcom from './testcom.vue';
import testcom2 from './testcom2.vue';

export default {
  inject: ['reload'],
  components: {
    testcom,
    testcom2,
  },
  data() {
    return {
      options: [],
      value: [],
      linkimg: ''
    };
  },
  async created() {
    const old1 = await fetchGetAcademicField();
    const old2 = await fetchGetArticleLabel();

    const s1 = [1, 2, 3, 4, 5];
    const s2 = this.$yian.utils.deepClone(s1);
    console.log(s2);
    this.$yian.gallery('get', { include: 'group' }).then((res) => {
      console.log(res);
    });
    //console.log(gallery)

    this.handleOptions(old1, old2);
  },
  methods: {
    //source形参是一个数组，fields是一个对象, thumb存在的话是一个数组
    uploadNow(source, fields, thumb) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        if (source.length > 1) {
          formData.append('group_id', fields.group_id);
          formData.append('type', fields.type);
          for (let i = 0; i < source.length; i++) {
            formData.append('thumbnail_' + i, thumb[i]);
            formData.append('file_' + i, source[i]);
          }
        } else {
          thumb ? formData.append('thumbnail', thumb) : null
          formData.append('group_id', fields.group_id);
          formData.append('type', fields.type);
          formData.append('file', source[0]);
        }
        this.$yian
          .axios({
            url: toString.call(thumb) === '[object Array]' ? '/v2/qiniu/uploadMultipart' : '/v2/qiniu/upload',
            method: 'post',
            params: formData,
            headers: { 'content-type': 'multipart/form-data' },
          })
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
    },
    comCli() {
      console.log('haha');
    },
    upload(e) {
      console.log(e);
      let input = document.createElement('input');
      input.type = 'file';
      input.click();
    },

    handleChange() {
      this.$emit('translabel', this.value);
    },
    handleOptions(old1, old2) {
      old1.data.forEach((element) => {
        this.options.push({
          value: element.academic_name,
          label: element.academic_name,
          id: element.id,
          children: [],
          disabled: true,
        });
      });
      this.options.forEach((element) => {
        const attrs = element.id;
        old2.data.forEach((element2) => {
          if (attrs == element2.field_id) {
            element.children.push({
              value: element2.label_name,
              label: element2.label_name,
            });
          }
        });
      });
    },
  },
};
</script>

<style></style>
