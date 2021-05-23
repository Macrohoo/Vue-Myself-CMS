<template>
  <div class="block">
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
  </div>
</template>

<script>
import { fetchGetAcademicField } from '@/api/apis/academicfield';
import { fetchGetArticleLabel } from '@/api/apis/articlelabel';

export default {
  data() {
    return {
      options: [],
      value: []
    };
  },
  methods: {
    handleChange() {
      console.log(this.value);
      this.$emit("translabel", this.value)
    },
    handleOptions(old1, old2) {
      old1.forEach((element) => {
        this.options.push({
          value: element.academic_name,
          label: element.academic_name,
          id: element.id,
          children: [],
        });
      });
      this.options.forEach((element) => {
        const attrs = element.id;
        old2.forEach((element2) => {
          if (attrs == element2.field_id) {
            element.children.push({
              value: element2.label_name,
              label: element2.label_name
            });
          }
        });
      });
    },
  },
  async created() {
    const old1 = await fetchGetAcademicField();
    const old2 = await fetchGetArticleLabel();
    this.handleOptions(old1, old2);
    console.log(this.options);
  },
};
</script>

<style></style>
