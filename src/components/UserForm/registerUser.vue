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
      ref="ruleForm2"
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
          >确 定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "registerUser",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
        role_id: "fb9c440024a811eba5d24967bddcd6f8",
        age: "",
        name: "",
        mobile_phone: ""
      },
    //   rules: {
    //     username: [
    //       { required: true, message: "请输入用户名", trigger: "blur" },
    //       { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
    //     ],
    //     password: [
    //       { required: true, validator: validatePass, trigger: "blur" }
    //     ],
    //     checkPass: [
    //       { required: true, validator: validatePass2, trigger: "blur" }
    //     ]
    //   }
    };
  },
  methods: {
    closeCallback() {
      this.$emit("successCallback");
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
