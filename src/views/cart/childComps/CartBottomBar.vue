<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-btn"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：<span class="totalPrice">{{totalPrice}}</span>
    </div>
    <div v-if="isShow" class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
    <div class="user" v-else>
      <div class="addCollection" @click="addCollection">移入收藏夹</div>
      <div class="removeCollection" @click="deleteCart">删除</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from "vuex"
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((pre, item) => {
          return pre += item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        //求商品类型数量
        return this.cartList.filter(item => item.checked).length

        //求商品总数量
        /*return this.cartList.filter(item => {
          return item.checked
        }).reduce((pre, item) => {
          return pre += item.count
        }, 0)*/
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        //return !this.cartList.filter(item => !item.checked).length
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }else {
          }
        }
        return true
      },
      isSelectCheck() {
        if(this.cartList.length === 0) return false
        for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }else {
            return true
          }
        }
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.isSelectCheck) {
          this.$toast.show('请选择购买的商品')
        }
      },
      addCollection() {
        if (!this.isSelectCheck) {
          this.$toast.show('请选择收藏商品')
        }else {
          for (let item of this.cartList) {
            if (item.checked) {
              // console.log(item);
              const Collection = {}
              Collection.image = item.image
              Collection.title = item.title
              Collection.desc = item.desc
              Collection.price = item.price
              Collection.iid = item.iid
              // 2.将商品添加到收藏中
              this.$store.dispatch('addCollection', Collection).then(res => {
                this.$toast.show(res, 1500)
                this.$store.commit('removeToCart', item.iid)
              })
            }
          }
        }
      },
      deleteCart() {
        if (!this.isSelectCheck) {
          this.$toast.show('请选择删除商品')
        }else {
          for(let item of this.cartList) {
            if(item.checked) {
              this.$store.commit('removeToCart', item.iid)
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    background-color: #fff;
    box-shadow: 0 -1px 0 rgba(100, 100, 100, 0.1);
    height: 40px;
    line-height: 40px;
    top: -8px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
    width: 55px;
  }
  .check-btn {
    width: 20px;
    height: 20px;
    margin-right: 3px;
    line-height: 20px;
  }
  .price {
    margin-left: 10px;
    font-size: 14px;
    flex: 1;
  }
  .price .totalPrice {
    color: red;
  }
  .calculate {
    width: 110px;
    height: 35px;
    font-size: 17px;
    line-height: 37px;
    margin: 2px 5px 0 0;
    border-radius: 18px;
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    text-align: center;
    color: #fff;
  }
  .addCollection {
    border: 1px solid #666666;
    color: #666666;
    font-size: 12px;
    height: 28px;
    line-height: 26px;
    padding: 0 8px;
    margin: 0 10px 0 0;
    border-radius: 15px;
    display: inline-block;
  }
  .removeCollection {
    border: 1px solid #FF3366;
    display: inline-block;
    height: 28px;
    line-height: 26px;
    font-size: 12px;
    margin: 5px 8px 0 0;
    color: #FF3366;
    padding: 0 10px;
    border-radius: 15px;
  }
</style>
