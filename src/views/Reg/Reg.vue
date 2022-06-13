<template>
  <div class="container-reg">
    <!-- 注册的盒子 -->
    <div class="box-reg">
      <!-- 标题 -->
      <div class="box-reg-title"></div>
      <!-- 注册的表单 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg'
}
</script>

<style lang="less" scoped>
.container-reg {
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') no-repeat;
  background-size: cover;

  .box-reg {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .box-reg-title {
      height: 60px;
      background: url('../../assets/images/login_title.png') no-repeat;
      background-position: center;
    }
  }
}
</style>
