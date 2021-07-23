<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div class="slot-cart" slot="center">购物车({{cartLength}})</div>
      <div slot="right" @click="isShowClick">
        <div v-if="isShow" class="slot-user">
          管理
        </div>
        <div v-else>
          <div class="slot-user-active">管理&times;</div>
        </div>
      </div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list/>
    <!--底部的汇总-->
    <cart-bottom-bar :is-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    data() {
      return {
        isShow: true
      }
    },
    computed: {
      ...mapGetters([
        'cartLength'
      ])
    },
    methods: {
      isShowClick() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .slot-cart {
    font-size: 18px;
  }
  .slot-user {
    font-size: 15px;
    position: relative;
    top: 2px;
  }
  .slot-user-active {
    font-size: 15px;
    position: relative;
    top: 2px;
    border: 1px solid #FF3366;
    margin-top: 9px;
    line-height: 23px;
    height: 23px;
    width: 53px;
    border-radius: 15px;
    color: #F36;
  }
  .nav-bar {
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    color: #fff;
  }
</style>
