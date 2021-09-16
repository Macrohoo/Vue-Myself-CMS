<template>
  <div class="gallery-contain flex justify-around align-center">
    <el-card class="left">
      <div slot="header">
        <span>素材分组</span>
        <span style="float: right; padding: 0">操作</span>
      </div>
      <div class="left-groups">
        <el-scrollbar style="height: 100%">
          <div
            class="left-groups-row"
            @click.self="checkGroupAll"
            data-index="-1"
            :class="{ current: currentIndex === -1 }"
          >
            <div class="flex align-center">
              <svg-icon icon-class="wenjian" style="width:20px; height:20px" />
              <span>全部</span>
            </div>
          </div>
          <div v-for="(item, index) in this.$store.getters.groups" :key="index">
            <div
              class="left-groups-row"
              :class="{ current: index === currentIndex }"
              @click.self="checkGroup(index)"
            >
              <div class="flex align-center">
                <svg-icon icon-class="wenjian" style="width:20px; height:20px" />
                <span>{{ item.name }}</span>
              </div>
              <div class="flex align-center justify-between" style="width: 78px">
                <OMDialog
                  title="修改素材分组"
                  @confirm="handlePutGroup"
                  :placeholder="item.name"
                  :parent_id="item.parent_id"
                  :id="item.id"
                >
                  <el-button type="text">编辑</el-button>
                </OMDialog>
                <el-popover placement="top" width="160" v-model="item.cancelVisible">
                  <p>警告:确定删除素材分组?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="item.cancelVisible = false"
                      >取消</el-button
                    >
                    <el-button type="primary" size="mini" @click="() => handleDeleteGroup(item)"
                      >确定</el-button
                    >
                  </div>
                  <el-button slot="reference" type="text">删除</el-button>
                </el-popover>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <OMDialog
        title="新建素材分组"
        @confirm="handlePostGroup"
        class="flex align-center justify-center"
        style="margin-top: 12px"
      >
        <el-button size="small" class="yael-button">新建分组</el-button>
      </OMDialog>
    </el-card>
    <div class="right flex flex-direction">
      <div class="right-tool flex flex-shrink-0 justify-start align-center">
        <el-button size="small" class="yael-button" v-show="currentIndex !== -1"
          >上传图片</el-button
        >
        <el-button size="small" class="yael-button" v-show="currentIndex !== -1"
          >新建子分组</el-button
        >
        <!--         <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          style="margin: 0 20px"
          >全选</el-checkbox
        > -->
        <el-button size="small" class="yael-button" :disabled="true">删除</el-button>
        <OMCascader style="margin: 0px 10px" :options="this.$store.getters.cascaderGroups" @confirm="nm">
          <el-button size="small" class="yael-button">移动至</el-button>
        </OMCascader>
        <el-button size="small" class="yael-button">重命名</el-button>
      </div>
      <div
        class="right-contain flex flex-grow-1 flex-direction justify-between"
        v-if="currentIndex === -1"
      >
        <div class="right-contain-flie flex justify-start" style="height: 30%; border-bottom: 2px solid #E3E3E3;">
          <div v-for="(item, index) in this.$store.getters.groups" :key="index">
            <YaLabel @selectX="(val) => selectFiles = val" :options="item" :selectData="selectFiles"></YaLabel>
<!--             <label class="ya-label">
              <input type="checkbox" class="ya-select" :value="item" v-model="selectFiles" />
              <div class="file-contain-item flex flex-direction justify-center align-center">
                <svg-icon icon-class="ziluobu" class="icon" />
                <el-image
                  style="width:64px; height:64px;"
                  src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png"
                ></el-image>
                <span>{{ item.name }}</span>
              </div>
            </label> -->
          </div>
        </div>

        <div class="right-contain-pv flex flex-wrap" style="height: 70%; padding: 40px 20px;">
          <div v-for="(item, index) in this.$store.getters.materials" :key="index">
            <div class="flex flex-direction justify-center align-center">
              <el-image style="width:84px; height:84px; margin: 10px" :src="item.url"></el-image>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OMDialog from '../components/ominiDialog.vue';
import OMCascader from '../components/ominiCascader.vue'
import YaLabel from '../components/yaLabel.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    OMDialog,
    OMCascader,
    YaLabel
  },
  data() {
    return {
      currentIndex: Number,
      selectFiles: [],
      selectMaterials: []
      //groupList: [],
    };
  },
  watch: {
    selectFiles: {
      handler(newVal) {
        console.log(newVal)
      }
    },
    deep: true
  },
  methods: {
    ...mapActions({
      handleGroups: 'gallery/handleGroups',
      handleMaterials: 'gallery/handleMaterials',
    }),
    nm(val) {
      console.log(val)
    },
    async checkGroup(index) {
      console.log(index);
      this.currentIndex = index;
    },
    async checkGroupAll($event) {
      this.currentIndex = parseInt($event.currentTarget.dataset.index);
      console.log(this.currentIndex);
      await this.handleMaterials({ page: 1, size: 10 });
      console.log(this.$store.getters.materials);
    },
    async handlePostGroup(data) {
      try {
        const res = await this.$yian.gallery(
          'post',
          { include: 'group' },
          { name: data.name, parent_id: data.parent_id }
        );
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          await this.handleGroups();
        }
      } catch (err) {
        this.$throw(err);
      }
    },
    async handlePutGroup(data) {
      try {
        const res = await this.$yian.gallery(
          'put',
          { id: `${data.id}` },
          { include: 'group' },
          { name: data.name, parent_id: data.parent_id }
        );
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          await this.handleGroups();
        }
      } catch (err) {
        this.$throw(err);
      }
    },
    async handleDeleteGroup(data) {
      try {
        const res = await this.$yian.gallery('delete', { id: `${data.id}` }, { include: 'group' });
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          data.cancelVisible = false;
          await this.handleGroups();
        }
      } catch (err) {
        this.$throw(err);
      }
    },
  },
  async created() {
    try {
      await this.handleGroups();
    } catch (err) {
      this.$throw(err);
    }

    //this.getList();
  },
};
</script>

<style scoped lang="scss">
.gallery-contain {
  width: 100%;
  height: 80vh;
  border-radius: 16px;
  background-color: white;
  border: 1px solid #e4e7ed;
  .left {
    height: 70vh;
    width: 26%;
    ::v-deep .el-card__header {
      background: #f3f5f7;
      text-align: left;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 500;
      font-size: 14px;
    }
    ::v-deep .el-card__body {
      padding: 10px;
    }
    .left-groups {
      border: 1px solid #e4e7ed;
      width: 100%;
      height: 56vh;
      overflow: scroll;
      .left-groups-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 48px;
        width: 100%;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 500;
        font-size: 14px;
        cursor: pointer; //变一只手
        span {
          margin-left: 10px;
        }
        &:hover {
          background-color: rgba(98, 60, 235, 0.05);
        }
        &.current {
          background-color: rgba(98, 60, 235, 0.05);
          color: #623ceb;
        }
      }
    }
  }
  .right {
    height: 60vh;
    width: 60%;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .right-tool {
      width: 100%;
      height: 70px;
      padding: 20px;
      // ::v-deep .el-checkbox__inner {
      //   border-color: #623ceb;
      // }
      // ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
      // .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      //   background-color: #623ceb;
      //   border-color: #623ceb;
      // }
      // ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
      //   color: #623ceb;
      // }
    }
    .right-contain {
      .right-contain-flie {
        padding: 10px 0px;
        margin: 0px 20px;
        overflow: scroll;
      }
    }
  }
}
</style>
