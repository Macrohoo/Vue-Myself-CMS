<template>
  <el-dialog
    :title="title"
    width="600px"
    :visible.sync="visible"
    destroy-on-close
    @close="closeCallback"
  >
    <el-form
      ref="ruleForm2"
      :model="ruleForm2"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm2.username" autocomplete="off" :disabled="this.$store.getters.role !== '超级管理员'" />
      </el-form-item>
      <el-form-item v-show="!this.userId" label="密码" prop="password">
        <el-input
          v-model="ruleForm2.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item v-show="!this.userId" label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm2.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-if="roleName"
          v-model="ruleForm2.role_id"
          disabled
          placeholder="请选择等级"
        >
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select v-else v-model="ruleForm2.role_id" placeholder="请选择等级">
          <el-option
            v-for="item in roleData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm2.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm2.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm2.age" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile_phone">
        <el-input
          v-model="ruleForm2.mobile_phone"
          autocomplete="off"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item v-show="this.$store.getters.role === '超级管理员'" label="是否启用">
        <el-switch v-model="ruleForm2.status" />
      </el-form-item>
      <el-form-item label="头像上传">
        <el-upload
          class="avatar-uploader"
          action="https://mboke.top/api/qiniu/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm2.avatar" :src="ruleForm2.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
        <el-button @click="resetForm('ruleForm2')">重 置</el-button>
      </el-form-item>
    </el-form>
    <!--    </div>-->
  </el-dialog>
</template>

<script>
import {
  fetchGetUserInfoId,
  fetchRegister,
  fetchEditUser
} from '@/api/apis/user'
import { fetchGetRoleList } from '@/api/apis/role'

export default {
  name: 'UserInfo',
  props: {
    title: {
      type: String,
      default: '账号信息'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      roleName: false,
      roleData: '',
      visible: this.dialogVisible,
      ruleForm2: {
        mobile_phone: '',
        username: '',
        password: '',
        checkPass: '',
        role_id: '',
        status: true,
        sex: '1',
        age: 0,
        name: '',
        avatar: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm2.avatar = res.data.url
    },
    closeCallback() {
      this.$emit('successCallback')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isLt2M && isJPG) || (isPNG && isLt2M)
    },
    getList() {
      if (!this.userId) {
        fetchGetRoleList().then(res => {
          this.roleData = res.data.rows
          for (let i = 0; i < this.roleData.length; i++) {
            if (
              this.$store.getters.role === '超级管理员' &&
              this.$store.getters.uid !== this.userId
            ) { this.roleName = false }
          }
        })
      } else {
        Promise.all([
          fetchGetRoleList(),
          fetchGetUserInfoId({ id: this.userId })
        ]).then(([roleListResponse, userInfoResponse]) => {
          this.roleData = roleListResponse.data.rows
          if (userInfoResponse.data.status === '1') {
            userInfoResponse.data.status = true
          } else {
            userInfoResponse.data.status = false
          }
          this.ruleForm2 = userInfoResponse.data
          this.roleName = true
          for (let i = 0; i < this.roleData.length; i++) {
            if (
              this.$store.getters.role === '超级管理员' &&
              this.$store.getters.uid !== this.userId
            ) { this.roleName = false }
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const newData = {}
          for (const item in this.ruleForm2) {
            if (item === 'age') {
              newData[item] = parseInt(this.ruleForm2[item])
            } else {
              newData[item] = this.ruleForm2[item]
            }
          }
          if (!this.userId) {
            fetchRegister(newData).then(res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
              }
              this.visible = false
            }).catch(err => {
              this.$throw(err)
            })
          } else {
            newData.id = this.userId
            for (const key in newData) {
              if (key === 'username' || key === 'password' || key === 'checkPass') {
                delete newData[key]
              }
            }
            fetchEditUser(newData).then(res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
              }
              this.visible = false
            }).catch(err => {
              this.$throw(err)
            })
          }
        } else {
          this.$message({
            message: '提交失败!',
            type: 'error'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.demo-ruleForm {
  width: 460px;
  padding-top: 25px;
}
.el-select {
  width: 100%;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/ .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
