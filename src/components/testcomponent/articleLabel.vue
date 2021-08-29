<template>
  <div class="">
    <el-cascader
      ref="label"
      placeholder="文章标签"
      v-model="value"
      :options="options"
      :show-all-levels="false"
      @change="handleChange"
      :props="{ multiple: true, checkStrictly: true, emitPath: false }"
      clearable
    ></el-cascader>
    <div
      class="flex justify-center align-center"
      style="width:300px; height: 200px background-color: #34D4E9"
    >
      这是一个方块
    </div>
    <svg-icon icon-class="shouye" />
    <svg-icon icon-class="https://panjiachen.github.io/vue-element-admin-site/home.png" />
    <svg-icon icon-class="bug" />
    <el-button type="primary" vvbb="12" module="order" v-popup.orderShipping="{a:12, b:13}">主要按钮</el-button>
    <el-button type="primary" id="12" module="order" v-popup.orderShipping="{a:1, b:1}" width="1200">主要按钮</el-button>
  </div>
</template>

<script>
import { fetchGetAcademicField } from '@/api/apis/academicfield';
import { fetchGetArticleLabel } from '@/api/apis/articlelabel';

export default {
  data() {
    return {
      options: [],
      value: [],
    };
  },
  methods: {
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
  async created() {
    //const old1 = await fetchGetAcademicField();
    //const old2 = await fetchGetArticleLabel();

    let s1 = [1,2,3,4,5]
    let s2 = this.$yian.utils.deepClone(s1)
    console.log(s2)
    const old2 = await this.$yian.articlelabel('get', {behavior: 'getArticleLabel'}).page({page: 1, size: 10})
    const old1 = await this.$yian.axios({url: '/academic/getAcademicField', method: 'get'})

    this.handleOptions(old1, old2);

    const res = await this.$yian.admin('post', {behavior: 'user/login'}, {loginuser: '18768105049', password: '18768105049'})
    console.log(res)
  },
};
</script>

<style></style>
