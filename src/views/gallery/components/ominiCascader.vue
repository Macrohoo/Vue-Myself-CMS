<script>
export default {
  props: {
    options: {
      type: [Array, Object],
    },
    title: {
      type: String,
      default: '移动至',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '移动至',
    },
  },
  data() {
    return {
      dialogVisible: false,
      moveGroup_id: [],
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleOpen() {
      if (!this.disabled) {
        this.dialogVisible = true;
      }
    },
    handleConfirm() {
      this.$emit('confirm', this.moveGroup_id);
      this.handleClose();
      this.moveGroup_id = [];
      this.$refs.cascader.clearCheckedNodes(); //清空选中的节点
      this.$refs.cascader.activePath = []; //设置为空可以让节点不高亮显示
    },
    handleChange(e) {
      this.moveGroup_id = e.slice(-1);
      console.log(this.moveGroup_id)
    },
  },
  render(h) {
    const {
      dialogVisible,
      handleOpen,
      handleClose,
      handleConfirm,
      placeholder,
      title,
      options,
    } = this;
    const dialogData = {
      props: {
        title: title,
        width: '660px',
        visible: dialogVisible,
        top: '30vh',
      },
    };
    const cascaderData = {
      props: {
        options: options,
        props: {
          checkStrictly: true,
        },
        placeholder: placeholder,
      },
      ref: "cascader"
    };
    return (
      <div class="yael-dialog" vOn:click_capture={handleOpen}>
        {this.$slots.default}
        <el-dialog on-close={handleClose} {...dialogData}>
          <el-cascader-panel
            {...cascaderData}
            class="yael-cascader"
            on-change={this.handleChange}
          ></el-cascader-panel>
          <span slot="footer" class="dialog-footer">
            <el-button on-click={handleClose} size="small">
              取 消
            </el-button>
            <el-button type="primary" on-click={handleConfirm} size="small">
              确 定
            </el-button>
          </span>
        </el-dialog>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped></style>
