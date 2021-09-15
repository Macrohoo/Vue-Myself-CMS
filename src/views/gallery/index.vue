<template>
  <div class="gallery">
    <el-tabs type="card" class="yael-tabs" v-model="activeName">
      <el-tab-pane label="图片素材" name="image">
        <pictureSelect></pictureSelect>
      </el-tab-pane>
      <el-tab-pane label="视频素材" name="video">
        <videoSelect></videoSelect>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pictureSelect from '@/views/gallery/pictureSelect/index.vue';
import videoSelect from '@/views/gallery/videoSelect/index.vue';

export default {
  components: {pictureSelect, videoSelect},
  data() {
    return {
      activeName: 'image',
    };
  },
};
</script>

<style scoped lang="scss">
.gallery {
  padding: 24px;
}
</style>
