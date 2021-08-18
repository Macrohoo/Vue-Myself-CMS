<template>
  <div class="userList">
    <div v-show="this.$store.getters.role === '超级管理员'">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        plain
        @click="addUserFn"
        >添加账号</el-button
      >
    </div>
    <el-table :data="userListData">
      <el-table-column fixed prop="created_at" label="创建时间" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="mobile_phone" label="手机" />
      <el-table-column prop="roleName" label="角色" />
      <el-table-column prop="status" label="状态" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '启用' ? 'primary' : 'danger'" disable-transitions
            >{{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            :disabled="scope.row.roleName == '超级管理员'"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.roleName == '超级管理员'"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      hide-on-single-page
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    />
    <UserInfo
      v-if="dialogVisible"
      :title="title"
      :dialog-visible="dialogVisible"
      :user-id="userId"
      @successCallback="successCallback"
    />
  </div>
</template>

<script>
import UserInfo from '@/components/UserForm/userInfo';
import { fetchUserList, fetchDelUser } from '@/api/apis/user';

export default {
  name: 'UserList',
  components: { UserInfo },
  data() {
    return {
      total: 0,
      currentPage: 1,
      //sort: null,
      userListData: [],
      dialogVisible: false,
      title: '',
      userId: '',
    };
  },
  mounted() {
    this.getList({
      currentPage: 1,
      pageSize: 10,
    });
  },
  methods: {
    addUserFn() {
      this.dialogVisible = true;
      this.title = '添加账号';
      this.userId = '';
    },
    handleEdit(index, row) {
      if(this.$store.getters.role === '超级管理员' || this.$store.getters.uid === row.id) {
        this.dialogVisible = true;
        this.title = '编辑信息';
        this.userId = row.id;
      } else {
        this.$message({
          message: '您无权限编辑其他用户!',
          type: 'error',
        });
      }
    },
    successCallback() {
      this.dialogVisible = false;
      this.getList({ currentPage: this.currentPage, pageSize: 10 });
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          fetchDelUser({
            id: row.id,
          })
            .then((response) => {
              if (response) {
                this.$message({
                  message: response.message,
                  type: 'success',
                });
                this.getList({
                  currentPage: this.currentPage,
                  pageSize: 10,
                });
              }
            })
            .catch((err) => {
              this.$throw(err);
              this.$message({
                message: err.message,
                type: 'error',
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作!',
          });
        });
    },
    currentChange(page) {
      // console.log(page)
      this.currentPage = page;
      this.getList({
        currentPage: page,
        pageSize: 10,
      });
    },
    getList(postdata) {
      fetchUserList(postdata)
        .then((response) => {
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].created_at = this.$getDateDiff(response.data.rows[i].created_at);
            response.data.rows[i].username = response.data.rows[i].username.substring(0, 3) + '***'
            response.data.rows[i].mobile_phone = response.data.rows[i].mobile_phone.substring(0, 5) + '*****'
            if (response.data.rows[i].status === '1') {
              response.data.rows[i].status = '启用';
            } else {
              response.data.rows[i].status = '禁用';
            }
          }
          this.total = response.data.count;
          this.userListData = response.data.rows;
        })
        .catch((err) => {
          this.$throw(err);
        });
    },
  },
};
</script>

<style scoped>
.userList {
  margin-top: 20px;
}

.pagination {
  margin: 30px auto;
  text-align: center;
  width: 50%;
  border: 1px solid rgb(64, 158, 255);
}
</style>
