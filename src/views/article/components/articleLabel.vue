<template>
  <div>
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
  </div>
</template>

<script>
import { fetchGetAcademicField } from '@/api/apis/academicfield'
import { fetchGetArticleLabel } from '@/api/apis/articlelabel'

export default {
  data() {
    return {
      options: [],
      value: []
    }
  },
  async created() {
    const old1 = await fetchGetAcademicField()
    const old2 = await fetchGetArticleLabel()
    this.handleOptions(old1, old2)
  },
  methods: {
    handleChange() {
      this.$emit('translabel', this.value)
    },
    handleOptions(old1, old2) {
      old1.data.forEach((element) => {
        this.options.push({
          value: element.academic_name,
          label: element.academic_name,
          id: element.id,
          children: [],
          disabled: true
        })
      })
      this.options.forEach((element) => {
        const attrs = element.id
        old2.data.forEach((element2) => {
          if (attrs == element2.field_id) {
            element.children.push({
              value: element2.label_name,
              label: element2.label_name
            })
          }
        })
      })
    }
  }
}
</script>

<style></style>
