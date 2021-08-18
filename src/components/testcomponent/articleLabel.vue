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
    <svg-icon icon-class="bug" />
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
    const old1 = await this.$yian.get('/academic/getAcademicField')
    const old2 = await this.$yian.get('/articlelabel/getArticleLabel')
    this.handleOptions(old1, old2);
  },
};
</script>

<style></style>
