<template>
  <div class="gallery">
    <el-tabs v-model="activeName" type="card" class="yael-tabs">
      <el-tab-pane label="图片视频" name="image">
        <pvSelect />
      </el-tab-pane>
      <el-tab-pane label="其他素材" name="video">
        <otherSelect />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pvSelect from '@/views/gallery/pvSelect/index.vue'
import otherSelect from '@/views/gallery/otherSelect/index.vue'

export default {
  components: { pvSelect, otherSelect },
  data() {
    return {
      activeName: 'image'
    }
  }
}
</script>

<style scoped lang="scss">
.gallery {
  padding: 24px;
}
</style>
