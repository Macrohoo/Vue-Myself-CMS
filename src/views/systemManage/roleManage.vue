<template>
  <div class="roleListTable">
    <div>
      <el-button
        v-roleBtn="'btn_100002'"
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        plain
        @click="addRole"
      >新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" />
      <el-table-column prop="name" label="角色名" />
      <el-table-column prop="describe" label="角色描述" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '启用' ? 'primary' : 'danger'"
            disable-transitions
          >{{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.name == '超级管理员'"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="success"
            :disabled="scope.row.name == '超级管理员'"
            @click="roleEdit(scope.$index, scope.row)"
          >权限分配
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.name == '超级管理员'"
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色信息" width="700px" class="dialog1" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" maxlength="8" show-word-limit autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.describe" maxlength="15" show-word-limit autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否开启" :label-width="formLabelWidth">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="权限分配"
      class="dialog2"
      :visible.sync="dialogFormVisible2"
      @opened="setRoleData"
    >
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="margin-bottom: 20px" />
      <el-tree
        ref="permission"
        :data="roleTree"
        node-key="r_id"
        show-checkbox
        check-on-click-node
        default-expand-all
        check-strictly
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :props="defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="rolePermissionSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchGetRoleList,
  fetchAddRole,
  fetchDelRole,
  fetchRolePermissions,
  fetchSearchRolePermissions
} from '@/api/apis/role'

export default {
  name: 'RoleManage',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: '',
        describe: '',
        id: '',
        status: true
      },
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectRoleId: '',
      filterText: ''
    }
  },
  computed: {
    roleTree: function() {
      const roleTree = this.$store.getters.roleTree
      return roleTree
    }
  },
  watch: {
    filterText(val) {
      this.$refs.permission.filter(val)
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleEdit(index, row) {
      this.form.name = row.name
      this.form.describe = row.describe
      this.form.status = row.status === '启用'
      this.form.id = row.id
      this.dialogFormVisible = true
    },
    addRole() {
      this.form = {
        name: '',
        describe: '',
        status: true
      }
      this.dialogFormVisible = true
    },
    addRoleSubmit() {
      if (!this.form.name) {
        this.$message({
          showClose: true,
          message: '角色名称不能为空',
          type: 'error'
        })
        return false // 为了跳出函数结束
      }
      fetchAddRole(this.form)
        .then(res => {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible = false
          this.getList()
        })
        .catch(err => {
          this.$throw(err)
          this.$message({
            showClose: true,
            message: err.message,
            type: 'error'
          })
        })
    },
    rolePermissionSubmit() {
      const rolePermissionData = {
        selectPermission: this.$refs.permission.getCheckedKeys(),
        rid: this.selectRoleId
      }
      fetchRolePermissions(rolePermissionData)
        .then(res => {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible2 = false
          this.getList()
          location.reload()
        })
        .catch(err => {
          this.$throw(err)
          this.$message({
            showClose: true,
            message: '该角色权限分配失败!',
            type: 'error'
          })
        })
    },
    roleEdit(index, row) {
      this.selectRoleId = row.id
      this.dialogFormVisible2 = true
    },
    setRoleData() {
      fetchSearchRolePermissions({ rid: this.selectRoleId }).then(res => {
        const permissionData = res.data.permissionPage + ',' + res.data.permissionButton
        this.$refs.permission.setCheckedKeys(permissionData.split(','))
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fetchDelRole({ id: row.id })
            .then(response => {
              if (response) {
                this.$message({
                  type: 'success',
                  message: response.message
                })
                this.getList()
              }
            })
            .catch(err => {
              this.$throw(err)
              this.$message({
                message: '角色删除失败!',
                type: 'error'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作!'
          })
        })
    },
    getList() {
      fetchGetRoleList()
        .then(response => {
          for (let i = 0; i < response.rows.length; i++) {
            if (response.rows[i].status) {
              response.rows[i].status = '启用'
            } else {
              response.rows[i].status = '禁用'
            }
          }
          this.tableData = response.rows
        })
        .catch(err => {
          this.$throw(err)
          this.$message({
            showClose: true,
            message: '获取角色权限列表失败!',
            type: 'error'
          })
        })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>

<style scoped>
.roleListTable {
  margin-top: 20px;
}

.nameinput {
  width: 150px;
}

.phoneinput {
  width: 120px;
}

.datepicker {
  width: 260px;
}
.dialog1 .el-dialog {
  width: 35%;
}

.dialog1 .el-dialog .el-form {
  width: 500px;
  margin: 0 auto;
}

.el-form-item__content {
  margin-left: 120px;
  width: 300px;
}
</style>
