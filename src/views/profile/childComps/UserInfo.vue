<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <span class="privateImage-svg left"><img src="~assets/img/profile/head.svg" alt=""></span>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img class="icon-mobile" src="~assets/img/profile/phone.svg" alt="">
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <span class="arrow-svg right">
        <img src="~assets/img/profile/back.svg" alt="">
      </span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    padding: 15px;
    margin-top: -5px;
  }
  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
  #user-info .privateImage-svg img {
    position: relative;
    left: -4.5px;
    top: -4.5px;
    width: 70px;
    height: 70px;
  }
  .left {
    float: left;
  }
  #user-info .arrow-svg img {
    width: 30px;
    height: 35px;
    margin-top: 5px;
  }
  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }
  #user-info .login-info .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }
  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 22px;
    height: 25px;
    left: -20px;
    top: -2px;
  }
</style>
