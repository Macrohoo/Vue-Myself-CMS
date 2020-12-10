<template>
  <el-dialog
    title="注册用户"
    width="600px"
    :visible.sync="visible"
    destroy-on-close
    @close="closeCallback"
  >
    <el-form
      :model="registerForm"
      status-icon
      :rules="rules"
      ref="registerForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="registerForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="registerForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile_phone">
        <el-input
          v-model="registerForm.mobile_phone"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')"
          >注 册</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { fetchRegister } from "@/api/apis/user";
export default {
  name: "registerUser",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      visible: this.dialogVisible,
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
        role_id: "4a2454a024a911eba5d24967bddcd6f8",
        age: "",
        name: "",
        mobile_phone: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    closeCallback() {
      this.$emit("successCallback");
    },
    submitForm(Form) {
      this.$refs[Form].validate(valid => {
        if (valid) {
          fetchRegister(this.registerForm)
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              this.visible = false;
            })
            .catch(err => {
              this.$message({
                message: "添加用户失败!",
                type: "error"
              });
            });
        } else {
          this.$message({
            message: "注册失败!请按规定格式输入信息！",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.demo-ruleForm {
  width: 460px;
  padding-top: 25px;
}
</style>
