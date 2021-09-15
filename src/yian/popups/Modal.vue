<template>
  <el-dialog
    class="Ya-dialog"
    title="title"
    :visible.sync="visible"
    :width="`${width}px`"
    :top="top"
    center>
    <component ref="cpo" :is="content" v-model="value"></component>
    <span slot="footer" class="dialog-footer" v-if="!hide_footer">
      <el-button @click="handleClosed" v-if="!hide_cancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">{{sure_btn}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '操作窗口'
    },
    top: {
      type: String,
      default: '15vh'
    },
    hide_footer: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number]
    },
    hide_cancel: {
      type: Boolean,
      default: true
    },
    sure_btn: {
      type: String,
      default: '确定'
    },
    // ComponentConstructor构造函数
    content: {
      type: [Object, Function]
    },
    value: [Object, Number, String]
  },
  data() {
    return {
      visible: true,
      affirm: false
    };
  },
  methods: {
    handleClosed() {
      this.visible = false;
    },
    async handleOk() {
      this.affirm = true;
      try {
        await this.$refs.cpo.affirm(this);
        // 关闭窗口交给子component
      } catch (error) {
        console.error('affirm事件不存在[Please define affirm event in the component]!', error);
      }
    }
  }

};
</script>

<style scoped lang="scss">
.Ya-dialog {
  ::v-deep .el-dialog__headerbtn {
    right: -22px;
    top: -4px;

    .el-dialog__close {
      color: #fff;
      font-size: 18px;
      font-weight: 800;
    }
  }

  ::v-deep .el-dialog__header {
    text-align: center;
    padding: 40px 0 32px 0;

    .el-dialog__title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      line-height: 20px;
      opacity: 0.85;
    }
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
  }

  ::v-deep .el-dialog {
    position: relative;
    background-color: #fff;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    background-clip: padding-box;
    outline: 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  ::v-deep .el-dialog__body {
    padding: 0;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
}
</style>
