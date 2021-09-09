<template>
  <div>
    orderShipping主内容块
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    affirm(vlm) {
      vlm.handleClosed();
      console.log('关闭');
      console.log(vlm);
      console.log(this.value)
    },
  },
};
</script>

<style></style>
