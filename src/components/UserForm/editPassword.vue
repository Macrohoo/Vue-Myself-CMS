<template>
  <el-dialog title="修改密码" width="580px" :visible.sync="visible" destroy-on-close @close="closeCallback">
    <el-form ref="ruleForm2" :model="ruleForm2" status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="ruleForm2.oldPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm2.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm2.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import Cookies from 'js-cookie'
import { fetchEditPassword } from '@/api/apis/user'

export default {
  name: 'EditPassword',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.toString().length < 6) {
        callback(new Error('密码长度不能低于6位'))
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
      } else if (value.toString().length < 6) {
        callback(new Error('密码长度不能低于6位'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      visible: this.dialogVisible,
      ruleForm2: {
        oldPassword: '',
        password: '',
        checkPass: ''
      },
      rules2: {
        oldPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeCallback() {
      this.$emit('editPwdCallback')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetchEditPassword({
            oldPassword: this.ruleForm2.oldPassword,
            newPassword: this.ruleForm2.checkPass
          }).then((res) => {
            if (res) {
              this.$message({
                type: 'success',
                message: res.message
              })
            }
            setTimeout(function() {
              Cookies.remove('access_token')
              location.reload()
            }, 1000)
          }).catch(err => {
            this.$throw(err)
          })
        } else {
          this.$message({
            message: '请注意密码格式！',
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

  .card {
    width: 560px;
    padding-bottom: 15px;
    margin: 0px auto;
  }
</style>
