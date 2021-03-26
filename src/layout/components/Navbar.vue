<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <ErrorLog class="errLog-container right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <img :src="avatar == null? 'https://panjiachen.github.io/vue-element-admin-site/home.png': avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <a target="_blank" href="https://github.com/Marhooo/vue-blog-cms">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item command="userInfo">
            <span style="display:block;">个人信息</span>
          </el-dropdown-item> 
          <el-dropdown-item command="editPassword">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>     
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <EditPassword v-if="dialogPassVisible" :dialogVisible="dialogPassVisible" @editPwdCallback="editPwdCallback"/>
    <UserInfo v-if="dialogInfoVisible" :title="title" :dialogVisible="dialogInfoVisible" :userId="userId" @successCallback="successCallback"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'    //单页面顶部导航栏显示面包屑
import Hamburger from '@/components/Hamburger'
import EditPassword from '@/components/UserForm/editPassword'
import UserInfo from '@/components/UserForm/userInfo'
import ErrorLog from '@/components/ErrorLog'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    EditPassword,
    UserInfo,
    ErrorLog
  },
  data () {
    return {
      dialogInfoVisible: false,
      dialogPassVisible: false,
      title: "",
      userId: ""
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      location.reload()  //动态删除路由权限表
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleCommand (command) {
      if (command === "editPassword") {
        this.dialogPassVisible = true
      } else if (command === "userInfo") {
        this.dialogInfoVisible = true
        this.title = "个人信息"
        this.userId = this.$store.getters.uid
      }
    },
    editPwdCallback () {
      this.dialogPassVisible = false
    },
    successCallback () {
      this.dialogInfoVisible = false
    }   
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
