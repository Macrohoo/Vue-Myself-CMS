<script>
export default {
  props: {
    //主盒子宽度，不含label的上下
    width: {
      type: String,
      default: '84px',
    },
    //主盒子高度，不含label的上下
    height: {
      type: String,
      default: '84px',
    },
    //链接图宽度
    srcWidth: {
      type: String,
      default: '64px',
    },
    //链接图长度
    srcHeight: {
      type: String,
      default: '64px',
    },
    //选择内容与<input>双向绑定
    selectData: {
      type: [Array, Object],
    },
    //指定<input>元素value的值
    options: {
      type: Object,
    },
    linkSrc: {
      type: String,
      default: 'http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png',
    },
  },
  computed: {
    //resolve props one-way streaming
    selectVal: {
      get() {
        return this.selectData;
      },
      set(val) {
        this.$emit('selectX', val);
      },
    },
  },
  render(h) {
    const { width, height, srcWidth, srcHeight, options, linkSrc } = this;
    return (
      <label class="ya-label">
        <input type="checkbox" class="ya-select" value={options} v-model={this.selectVal} />
        <div
          class="flex flex-direction justify-center align-center"
          style={{ width: width, height: height }}
        >
          <svg-icon icon-class="ziluobu" class="icon" />
          <el-image style={{ width: srcWidth, height: srcHeight }} src={linkSrc}></el-image>
          <span>{options.name}</span>
        </div>
      </label>
    );
  },
};
</script>

<style></style>
