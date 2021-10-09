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
              :data-id="item.id"
              @click.self="checkGroup(index, $event)"
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
                    <el-button size="mini" type="text" @click="item.cancelVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="() => handleDeleteGroup(item)">确定</el-button>
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
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="this.$store.getters.containPagesCount > 0 ? this.$store.getters.containPagesCount : 10"
        background
        class="pageClass"
      >
      </el-pagination>

      <div class="right-tool flex flex-shrink-0 justify-start align-center">
        <el-popover placement="top" width="160" v-model="repeatVisible">
          <p>警告:确定删除?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="repeatVisible = false">取消</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="() => handleDeleteIn({ gp: selectFiles, ml: selectMaterials })"
              >确定</el-button
            >
          </div>
          <el-button
            size="small"
            class="yael-button"
            slot="reference"
            :disabled="
              (selectMaterials.length > 0 && selectFiles.length > 0) ||
                (selectFiles.length === 0 && selectMaterials.length === 0) ||
                selectMaterials.length > 1
            "
            >删除</el-button
          >
        </el-popover>
        <OMCascader
          style="margin: 0px 10px"
          :options="this.$store.getters.cascaderGroups"
          @confirm="(val) => moveGroup(val, { gp: selectFiles, ml: selectMaterials })"
          :disabled="
            (selectMaterials.length > 0 && selectFiles.length > 0) ||
              (selectFiles.length === 0 && selectMaterials.length === 0)
          "
        >
          <el-button
            size="small"
            class="yael-button"
            :disabled="
              (selectMaterials.length > 0 && selectFiles.length > 0) ||
                (selectFiles.length === 0 && selectMaterials.length === 0)
            "
            >移动至</el-button
          >
        </OMCascader>
        <OMDialog
          title="重命名分组"
          @confirm="handlePutGroup"
          :placeholder="selectFiles.length > 0 ? selectFiles[0].name : ''"
          :parent_id="selectFiles.length > 0 ? selectFiles[0].parent_id : ''"
          :id="selectFiles.length > 0 ? selectFiles[0].id : ''"
          :disabled="selectMaterials.length > 0 || selectFiles.length !== 1"
        >
          <el-button size="small" class="yael-button" :disabled="selectMaterials.length > 0 || selectFiles.length !== 1"
            >重命名</el-button
          >
        </OMDialog>
        <OMDialog title="新建子分组" @confirm="handlePostGroup" style="margin: 0px 10px" :parent_id="parentIdNeeded">
          <el-button size="small" class="yael-button" v-show="currentIndex !== -1">新建子分组</el-button>
        </OMDialog>
        <el-upload
          class="upload-demo"
          action="http://localhost:7001/v2/qiniu/upload"
          :multiple="false"
          :on-success="handlethumbnailSuccess"
          :before-upload="beforethumbnailUpload"
          :data="{ type: '1', group_id: `${parentIdNeeded}` }"
          :with-credentials="true"
          :headers="myHeaders"
        >
          <el-button size="small" class="yael-button" v-show="currentIndex !== -1">上传图片</el-button>
        </el-upload>
      </div>
      <div class="right-contain flex flex-grow-1 flex-direction justify-between" v-if="currentIndex === -1">
        <div class="right-contain-flie flex justify-start align-center">
          <div v-for="(item, index) in this.$store.getters.containGroups" :key="index">
            <YaLabel
              @selectX="(val) => (selectFiles = val)"
              :options="item"
              :selectData="selectFiles"
              @dblclick.native.capture="handleDblclick(item.id, $event)"
            ></YaLabel>
          </div>
        </div>
        <div class="right-contain-pv flex flex-wrap">
          <div v-for="(item, index) in this.$store.getters.containMaterials" :key="index">
            <YaLabel
              @selectX="(val) => (selectMaterials = val)"
              :options="item"
              :selectData="selectMaterials"
              :linkSrc="item.type === '1' ? item.url : item.thumbnail"
              :srcWidth="64"
              :srcHeight="64"
              :width="104"
              :height="104"
            ></YaLabel>
          </div>
        </div>
      </div>
      <div v-else class="right-contain flex flex-grow-1 flex-direction justify-between">
        <div class="right-contain-flie flex justify-start align-center">
          <div v-for="(item, index) in this.$store.getters.containGroups" :key="index">
            <YaLabel
              @selectX="(val) => (selectFiles = val)"
              :options="item"
              :selectData="selectFiles"
              @dblclick.native.capture="handleDblclick(item.id, $event)"
            ></YaLabel>
          </div>
        </div>
        <div class="right-contain-pv flex flex-wrap">
          <div v-for="(item, index) in this.$store.getters.containMaterials" :key="index">
            <YaLabel
              @selectX="(val) => (selectMaterials = val)"
              :options="item"
              :selectData="selectMaterials"
              :linkSrc="item.type === '1' ? item.url : item.thumbnail"
              :srcWidth="64"
              :srcHeight="64"
              :width="104"
              :height="104"
            ></YaLabel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OMDialog from '../components/ominiDialog.vue';
import OMCascader from '../components/ominiCascader.vue';
import YaLabel from '../components/yaLabel.vue';
import { mapActions, mapMutations } from 'vuex';
import { getToken } from '@/utils/auth';

export default {
  inject: ['reload'],
  components: {
    OMDialog,
    OMCascader,
    YaLabel,
  },
  data() {
    return {
      myHeaders: { Authorization: `Bearer ${getToken()}` },
      parentIdNeeded: -1, //创建子分组必须要的父分组id
      repeatVisible: false,
      currentIndex: Number,
      selectFiles: [],
      selectMaterials: [],
    };
  },
  watch: {
    selectFiles: {
      handler(newVal) {
        console.log(newVal);
      },
    },
    deep: true,
    selectMaterials: {
      handler(newVal) {
        console.log(newVal);
      },
    },
    deep: true,
    parentIdNeeded: {
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
  methods: {
    ...mapActions({
      handleGroups: 'gallery/handleGroups',
      handleMaterials: 'gallery/handleMaterials',
      handleSingleGroups: 'gallery/handleSingleGroups',
      createMaterials: 'gallery/createMaterials',
    }),
    ...mapMutations({
      resetContainGroups: 'gallery/SET_RESETCONTAINGROUPS',
      resetContainMaterials: 'gallery/SET_RESETCONTAINMATERIALS',
    }),
    //移动至  包含分组的移动和素材的移动
    async moveGroup(val, data) {
      try {
        console.log(val);
        console.log(data);
        let res;
        if (data.gp.length > 0) {
          //当移动素材分组时
          let id = [];
          this.selectFiles.forEach((v) => {
            id.push(v.id);
          });
          res = await this.$yian.gallery(
            'put',
            { id: id.toString() },
            { include: 'group' },
            { behavior: 'batch' },
            { parent_id: val[0] }
          );
        } else {
          //当移动素材时
          let id = [];
          this.selectMaterials.forEach((v) => {
            id.push(v.id);
          });
          res = await this.$yian.gallery(
            'put',
            { id: id.toString() },
            { include: 'material' },
            { behavior: 'batch' },
            { group_id: val[0] }
          );
        }
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          this.reload();
        }
      } catch (err) {
        this.$throw(err);
      }
    },
    async handleDblclick(id, $event) {
      //console.log(id);
      this.parentIdNeeded = id;
      await this.handleSingleGroups({ id: id, page: 1, size: 10 });
      this.selectFiles = [];
      this.selectMaterials = [];
    },
    async checkGroup(index, $event) {
      this.currentIndex = index;
      this.parentIdNeeded = $event.currentTarget.dataset.id;
      await this.handleSingleGroups({ id: $event.currentTarget.dataset.id, page: 1, size: 10 });
      this.selectFiles = [];
      this.selectMaterials = [];
      //console.log(this.$store.getters.containGroups)
    },
    async checkGroupAll($event) {
      this.currentIndex = parseInt($event.currentTarget.dataset.index);
      await this.createMaterials({ page: 1, size: 10 });
      //console.log($event);
      this.resetContainGroups(this.$store.getters.groups);
      this.resetContainMaterials(this.$store.getters.materials);
      this.parentIdNeeded = -1;
      this.selectFiles = [];
      this.selectMaterials = [];
      //console.log(this.$store.getters.materials);
    },
    //新建素材分组
    async handlePostGroup(data) {
      try {
        const res = await this.$yian.gallery(
          'post',
          { include: 'group' },
          { name: data.name, parent_id: parseInt(data.parent_id) }
        );
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          this.reload();
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
          { name: data.name, parent_id: parseInt(data.parent_id) }
        );
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          this.reload();
        }
      } catch (err) {
        this.$throw(err);
      }
    },
    //删除素材分组
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
    //删除按钮入口  可能删素材可能删分组
    async handleDeleteIn(data) {
      try {
        //console.log(data);
        let res;
        if (data.gp.length > 0) {
          //当选择删分组时
          let id = [];
          this.selectFiles.forEach((v) => {
            id.push(v.id);
          });
          res = await this.$yian.gallery('delete', { id: id.toString() }, { include: 'group' }, { behavior: 'batch' });
        } else {
          //当选择删素材时
          let id = [];
          let url = [];
          this.selectMaterials.forEach((v) => {
            id.push(v.id);
            url.push(v.url);
          });
          if (id.length > 1) {
            this.$message({
              type: 'error',
              message: '暂无法支持批量删除素材，请逐一删除!',
            });
          } else {
            res = await this.$yian.gallery(
              'delete',
              { id: id.toString() },
              { include: 'material' },
              { url: url.toString() }
            );
          }
        }
        if (res) {
          this.$message({
            type: 'success',
            message: res.message,
          });
          this.repeatVisible = false;
          this.reload();
        }
      } catch (err) {
        this.$throw(err);
      }
    },
    //分页处理
    async handleCurrentChange(val) {
      console.log(val);
      if (this.parentIdNeeded == -1) {
        await this.handleMaterials({ page: val, size: 10 });
      } else {
        await this.handleSingleGroups({ id: this.parentIdNeeded, page: val, size: 10 });
      }
    },

    //upload
    handlethumbnailSuccess(res, file) {
      console.log(res.data.url);
    },
    beforethumbnailUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error('上传文章缩略图只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文章缩略图大小不能超过 2MB!');
      }
      return (isLt2M && isJPG) || (isPNG && isLt2M);
    },
  },
  async created() {
    try {
      await this.handleGroups();
      await this.createMaterials({ page: 1, size: 10 });
      this.currentIndex = -1;
      this.resetContainGroups(this.$store.getters.groups);
      this.resetContainMaterials(this.$store.getters.materials);
    } catch (err) {
      this.$throw(err);
    }
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
    position: relative;
    .pageClass {
      position: absolute;
      bottom: -46px;
      right: 0px;
    }
    .right-tool {
      width: 100%;
      height: 70px;
      padding: 20px;
    }
    .right-contain {
      .right-contain-flie {
        padding: 10px 0px;
        margin: 0px 20px;
        overflow: scroll;
        height: 30%;
        border-bottom: 2px solid #e3e3e3;
      }
      .right-contain-pv {
        height: 70%;
        padding: 10px 20px;
      }
    }
  }
}
</style>
