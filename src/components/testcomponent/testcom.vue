<template>
  <div>
    <el-button type="primary" @click="go">按钮</el-button>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data() {
    return {
      list: [{a:1}, {b:2}, {c:3}]
    }
  },
  methods: {
    go() {
      //console.log(this.$route)
      eventBus.$emit('givee', this.list)
    }
  }
};
</script>

<style></style>
