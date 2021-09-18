<script>
export default {
  props: {
    //主盒子宽度，不含label的上下
    width: {
      type: Number,
      default: 84,
    },
    //主盒子高度，不含label的上下
    height: {
      type: Number,
      default: 84,
    },
    //链接图宽度
    srcWidth: {
      type: Number,
      default: 64,
    },
    //链接图长度
    srcHeight: {
      type: Number,
      default: 64,
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
  data() {
    return {
      hoverKey: false,
    };
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
  methods: {
    hoverChange() {
      this.hoverKey ? this.hoverKey = false : this.hoverKey = true
    },
  },
  render(h) {
    const { width, height, srcWidth, srcHeight, options, linkSrc } = this;
    let linkImgStyle;
    this.hoverKey
      ? (linkImgStyle = { width: `${srcWidth + 4}px`, height: `${srcHeight + 4}px`})
      : (linkImgStyle = { width: `${srcWidth}px`, height: `${srcHeight}px`});
    return (
      <label class="ya-label">
        <input type="checkbox" class="ya-select" value={options} v-model={this.selectVal} />
        <div
          class="flex flex-direction justify-center align-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <svg-icon icon-class="ziluobu" class="icon" />
          <img
            class="imageH"
            style={linkImgStyle}
            src={linkSrc}
            vOn:mouseenter={this.hoverChange.bind(this)}
            vOn:mouseleave={this.hoverChange.bind(this)}
          ></img>
          <span>{options.name}</span>
          <span>{options.title}</span>
        </div>
      </label>
    );
  },
};
</script>

<style lang="scss">
</style>
