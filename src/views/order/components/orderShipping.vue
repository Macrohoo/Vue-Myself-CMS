<template>
  <div>
    orderShipping主内容块
  </div>
</template>

<script>
export default {
  methods: {
    affirm(vlm) {
      vlm.handleClosed()
      console.log('关闭')
      console.log(vlm)
    }
  }
}
</script>

<style>

</style>
