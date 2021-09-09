<template>
  <div>
    <!-- <el-button @click="cc">按钮啊</el-button> -->
    我是一个虚假的组件页面
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus';
export default {
  data() {
    return {
      give: []
    }
  },
  created() {
    this.testbro()
  },
  methods: {
    // cc() {
    //   console.log(this.give);
    // },
    testbro() {
      //如果是两个路由间是无法用这种方式传值的，因为 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。所以两个路由组件还未被渲染，所以事件总线无法使用。
      eventBus.$off('givee')  //移除上一个事件监听器，不移除会导致兄弟传值确实会无线增长dep
      eventBus.$on('givee', (res) => {
        console.log(res);
        this.give = res;
      });
    },
  }
};
</script>

<style></style>
