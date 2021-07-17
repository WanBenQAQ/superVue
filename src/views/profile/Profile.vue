<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">商城系统</div>
    </nav-bar>
    <user-info/>
    <account/>
    <list-view :list-data="orderList" class="order-list"/>
    <list-view :list-data="serviceList" class="service-list"/>
  </div>
</template>

<script>
  import UserInfo from "./childComps/UserInfo";
  import Account from "./childComps/Account";
  import ListView from "./childComps/ListView";

  import NavBar from "components/common/navBar/NavBar";
  export default {
    name: "Profile",
    components: {
      UserInfo,
      Account,
      ListView,
      NavBar
    },
    data() {
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .nav-bar {
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    font-weight: 700;
    color: #fff;
  }
  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
