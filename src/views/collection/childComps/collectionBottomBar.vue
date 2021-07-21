<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-btn"
        @click.native="checkClick"
        :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="col-check">
      <div class="add-cart" @click="addToCart"><span class="add-span">加入清单</span></div>
      <div class="del-collection" @click="removeCollection"><span class="del-span">删除</span></div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from "vuex"
  export default {
    name: "collectionBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['CollectionList']),
      isSelectAll() {
        if (this.CollectionList.length === 0) return false
        for (let item of this.CollectionList) {
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
          this.CollectionList.forEach(item => item.checked = false)
        } else {
          this.CollectionList.forEach(item => item.checked = true)
        }
      },
      //删除选中的商品
      removeCollection() {
        for(let i in this.CollectionList) {
          if(this.CollectionList[Number(i)].checked === true) {
            this.$store.commit('removeToCollection', this.CollectionList[Number(i)].iid)
            this.$toast.show('商品删除成功')
          }
        }
      },
      //从收藏中旋转商品添加到购物车中，并删除收藏的商品
      addToCart() {
        for(let i in this.CollectionList) {
          if(this.CollectionList[Number(i)].checked === true) {
            const product = {}
            product.image = this.CollectionList[Number(i)].image
            product.title = this.CollectionList[Number(i)].title
            product.desc = this.CollectionList[Number(i)].desc
            product.price = this.CollectionList[Number(i)].price
            product.isShow = true
            product.iid = this.CollectionList[Number(i)].iid
            // 2.将商品添加到购物车中
            this.$store.dispatch('addCart', product).then(res => {
              this.$toast.show(res, 1500)
              this.$store.commit('removeToCollection', product.iid)
            })
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
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #eee;
    top: -11px;
    z-index: 999;
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
  .col-check {
    margin-left: 100px;
  }
  .col-check .add-cart {
    width: 90px;
    height: 30px;
    font-size: 16px;
    display: inline-block;
    top: -6.8px;
    border: 1px solid #8a8a8a;
    text-align: center;
    position: relative;
    border-radius: 15px;
  }
  .col-check .add-cart>span {
    color: black;
    position: absolute;
    top: -15px;
    left: 12px;
  }
  .col-check .del-collection {
    margin-left: 10px;
    width: 90px;
    height: 30px;
    font-size: 16px;
    display: inline-block;
    margin-top: 15px;
    border: 1px solid red;
    text-align: center;
    border-radius: 15px;
  }
  .col-check .del-collection>span {
    color: red;
    position: relative;
    top: -15px;
    left: -1px;
  }
</style>
