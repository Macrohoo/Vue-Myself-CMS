<script>
export default {
  props: {
    title: {
      type: String,
      default: '分组'
    },
    placeholder: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 8
    },
    disabled: {
      type: Boolean,
      default: false
    },
    parent_id: {
      type: [Number, String]
    },
    id: {
      type: [Number, String]
    }
  },
  data() {
    return {
      dialogVisible: false,
      inputData: ''
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      // 当parent_id父组件中没有传入值时，this.parent_id拿到是undefined，不需要进一步判断，最终携带body对象请求时，对象中的属性如果是undefined会自动删除这个属性
      // 当parent_id父组件中传入的是null时，this.parent_id拿到的是null，可以去判定parent_id是否存在
      if (this.parent_id) {
        this.$emit('confirm', { name: this.inputData, parent_id: this.parent_id, id: this.id })
      } else {
        this.$emit('confirm', { name: this.inputData, id: this.id })
      }
      this.handleClose()
      this.inputData = ''
    },
    handleOpen() {
      if (!this.disabled) {
        this.dialogVisible = true
      }
    }
  },
  render(h) {
    const { dialogVisible, handleOpen, handleClose, handleConfirm, placeholder, title } = this
    const dialogData = {
      // VNode 数据对象中有自己的顶级字段。此对象还允许您绑定普通的 HTML 属性以及 DOM 属性
      // 注意区分attrs和domProps
      // Normal HTML attributes
      // attrs: {
      //   id: 'foo'
      // },
      // Component props
      // props: {
      //   myProp: 'bar'
      // },
      // DOM properties
      // domProps: {
      //   innerHTML: 'baz'
      // },
      props: {
        title: title,
        width: '360px',
        visible: dialogVisible,
        top: '30vh'
      }
    }

    return (
      <div on={{ '!click': handleOpen }} class='yael-dialog'>
        {this.$slots.default}
        <el-dialog on-close={handleClose} {...dialogData}>
          <el-input
            v-model={this.inputData}
            placeholder={placeholder}
            maxlength={this.max}
            show-word-limit
            style='padding: 0 20px'
          ></el-input>
          <span slot='footer' class='dialog-footer'>
            <el-button on-click={handleClose} size='small'>
              取 消
            </el-button>
            <el-button type='primary' on-click={handleConfirm} size='small'>
              确 定
            </el-button>
          </span>
        </el-dialog>
      </div>
    )
  }
}
</script>

<style></style>
