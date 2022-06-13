<template>

  <el-container>
    <!-- 左侧边栏 -->
    <el-aside class='aside' width="200px">
      <div class="user_box">
        <img :src="avatar" />
        <span>{{username}}</span>
      </div>
      <!-- 侧边栏 -->
      <Menus :menus-list="menusList"></Menus>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="login_out">
          <img :src="$store.state.user.userInfo.user_pic" />
          <span>个人中心</span>
        </div>
        <div>
          <span @click="logout">退出</span>
        </div>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 退出弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>

  </el-container>

</template>

<script>
import Menus from '@/components/menu/menu.vue'
import { menu } from '@/api/login'
export default {
  components: { Menus },
  name: 'Home',
  data () {
    return {
      // 弹窗关闭
      dialogVisible: false,
      menusList: []

    }
  },
  created () {
    this.$store.dispatch('user/initUserInfo')
    this.getMenu()
  },
  computed: {
    avatar () {
      return this.$store.state.user.userInfo.user_pic
    },
    username () {
      return this.$store.state.user.userInfo.username
    }
  },
  methods: {
    logout () {
      this.dialogVisible = true
    },
    handleSure () {
      this.$store.commit('user/updateToken', '')
      localStorage.clear()
      this.$router.push('/login')
    },
    async getMenu () {
      try {
        const res = await menu()
        console.log(res)
        this.menusList = res.data
      } catch (error) {

      }
    }
  }

}
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.el-aside {
  background-color: #001529;
  color: #fff;
  text-align: center;
  line-height: 200px;
  // background-color: #001529;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
  height: 100%;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.user_box {
  box-sizing: border-box;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin-right: 5px;
  }

  span {
    font-size: 14px;
  }
}
.login_out {
  width: 157px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin-right: 5px;
  }
}
.main {
  line-height: 0;
}
.el-menu-vertical-demo el-menu {
  background-color: #001529;
}
</style>
