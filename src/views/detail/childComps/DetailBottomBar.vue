<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div class="service">
        <div><img src="~assets/img/detail/server.svg" alt=""></div>
        <span class="text">客服</span>
      </div>
      <div class="shop">
        <div>
          <img src="~assets/img/detail/shopingcart.svg" alt="">
          <div v-if="cartLength > 0">
            <span class="shopingcount">{{cartLength}}</span>
          </div>
        </div>
        <span class="text">购物车</span>
      </div>
      <div @click="isShow" class="select">
        <div v-if="getIsShowimg" @click="addCollection">
          <div class="imgIsTrue"><img src="~assets/img/detail/star.svg" alt=""></div>
          <span class="text">收藏</span>
        </div>
        <div v-else @click="removeCollection">
          <div class="imgIsFalse"><img src="~assets/img/detail/startrue.svg" alt=""></div>
          <span class="text">已收藏</span>
        </div>

      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="toCart">购买</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "DetailBottomBar",
    data() {
      return {
        isShowimg: true
        }
    },
    computed: {
      ...mapGetters([
        'cartLength'
      ]),
      getIsShowimg() {
        const Collection = this.$store.state.CollectionList
        const iid = this.$route.params.iid
        for (let key in Collection) {
          if (Collection[Number(key)].iid === iid) {
            this.isShowimg = Collection[Number(key)].isCollection
          }
        }
        return this.isShowimg
      }
    },
    methods: {
      addToCart() {
        this.$emit('addCart')
      },
      addCollection() {
        this.$emit('addCollection')
      },
      removeCollection() {
        this.$emit('removeCollection')
      },
      toCart() {
        this.addToCart()
        this.$router.push('/cart')
      },
      isShow() {
        if(!this.isShowimg) {
          this.isShowimg = true
        }else {
          this.isShowimg = false
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    background-color: #fff;
    position: relative;
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .service>div {
    text-align: center;
  }
  .bar-left .service img {
    width: 28px;
    height: 28px;
    margin-top: 5px;
    margin-bottom: -5px;
  }
  .bar-left .shop>div {
    text-align: center;
  }
  .bar-left .shop img {
    width: 24px;
    height: 24px;
    margin-top: 8px;
    margin-bottom: -3px;
  }
  .bar-left .shop .shopingcount {
    position: absolute;
    font-size: 8px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    left: 98px;
    top: 3px;
    color: #fff;
    background-color: red;
  }
  .bar-left .select>div {
    text-align: center;
  }
  .bar-left .select .imgIsTrue img {
    width: 28px;
    height: 28px;
    margin-top: 6px;
    margin-bottom: -5px;
  }
  .bar-left .select .imgIsFalse img {
    width: 26.5px;
    height: 26.5px;
    margin-top: 6px;
    margin-bottom: -4px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
    background-image: linear-gradient(to right, #FDEB71 0%, #F8D800 100%);
    color: #999;
  }
  .bar-right .buy {
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    color: #999;
  }
</style>
