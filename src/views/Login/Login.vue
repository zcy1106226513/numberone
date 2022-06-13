<template>
  <div class="container-login">
    <!-- 登录的盒子 -->
    <div class="box-login">
      <!-- 标题 -->
      <div class="box-login-title"></div>
      <!-- 登录的表单 -->
      <el-form :inline="false" :model="rulseForm" :rules="rules" ref="rulseForm" class="demo-form-inline">
        <el-form-item label="" prop="username">
          <el-input v-model="rulseForm.username" placeholder="请输入账号">
            <i class="el-icon-user el-input__icon" slot="prefix" style="color:black;font-weight: bold;font-size: 18px;">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="rulseForm.password" placeholder="请输入密码">
            <i class="el-icon-lock el-input__icon" slot="prefix" style="color:black;font-weight: bold;font-size: 18px;">
            </i>
            <span class="iconfont icon-eye" slot="suffix" style="padding-right:10px" @click='eye=!eye' v-if="eye"></span>
            <span class="iconfont icon-eye-close" slot="suffix" style="padding-right:10px" v-else @click="eye=!eye"></span>
          </el-input>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handlelogin(rulseForm)">登录</el-button>
        </el-form-item>
      </el-form>
      <el-link type="primary" class="login-register" @click="$router.push('/reg')">去注册</el-link>

    </div>

  </div>

</template>

<script>
import { login } from '../../api/login'
export default {
  name: 'Login',
  data () {
    return {
      // 密码显示与影藏的图标
      eye: true,
      rulseForm: {
        // 用户名
        username: 'zcy141',
        // 用户密码
        password: '654321'

      },

      // 用户登录校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handlelogin (rulseForm) {
      this.$refs.rulseForm.validate(async (valid) => {
        if (!valid) {
          return false
        } else {
          const data = await login(this.rulseForm)
          console.log(data)
          this.$router.push('/home')
          this.$store.commit('user/updateToken', data.token)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') no-repeat;
  background-size: cover;

  .box-login {
    box-sizing: border-box;
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;

    .box-login-title {
      height: 60px;
      background: url('../../assets/images/login_title.png') no-repeat;
      background-position: center;
    }
  }
}
.login-btn {
  width: 100%;
}
.login-register {
  margin-top: -25px;
}
</style>
