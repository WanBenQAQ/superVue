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
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
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
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        //return !this.cartList.filter(item => !item.checked).length
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
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
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    background-color: #eee;
    height: 40px;
    line-height: 40px;

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
  .calculate {
    width: 90px;
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    text-align: center;
    color: #fff;
  }
</style>
