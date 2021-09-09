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
    <div
      class="flex justify-center align-center"
      style="width:300px; height: 200px background-color: #34D4E9"
    >
      这是一个方块
    </div>
    <svg-icon icon-class="shouye" />
    <svg-icon icon-class="https://panjiachen.github.io/vue-element-admin-site/home.png" />
    <svg-icon icon-class="bug" />
    <el-button v-popup.orderShipping="0" type="primary" vvbb="12" module="order"
      >主要按钮</el-button
    >
    <el-button
      id="12"
      v-popup.orderShipping="{ a: 1, b: 1 }"
      type="primary"
      module="order"
      width="1200"
      >主要按钮</el-button
    >
    <testcom></testcom>
    <testcom2></testcom2>
  </div>
</template>

<script>
import { fetchGetAcademicField } from '@/api/apis/academicfield';
import { fetchGetArticleLabel } from '@/api/apis/articlelabel';
import testcom from './testcom.vue'
import testcom2 from './testcom2.vue'

export default {
  //inject: ['reload'],
  components: {
    testcom, testcom2
  },
  data() {
    return {
      options: [],
      value: [],
    };
  },
  async created() {
    // const old1 = await fetchGetAcademicField();
    // const old2 = await fetchGetArticleLabel();

    const s1 = [1, 2, 3, 4, 5];
    const s2 = this.$yian.utils.deepClone(s1);
    console.log(s2);
    const old2 = await this.$yian
      .articlelabel('get', { behavior: 'getArticleLabel' })
      .page({ page: 1, size: 10 });
    const old1 = await this.$yian.axios({ url: '/academic/getAcademicField', method: 'get' });

    this.handleOptions(old1, old2);

    const res = await this.$yian.admin(
      'post',
      { behavior: 'user/login' },
      { loginuser: '18768105049', password: '18768105049' }
    );
    console.log(res);
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
};
</script>

<style></style>
