<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
        :index="index"
        @reduce="reduce(index)" @add="add(index)"
        @switchCount="switchCount(index)"
        @switchBtn="switchBtn(index)"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList']),
    },
    activated() {
      //刷新，重新计算高度
      this.$refs.scroll.refresh()
    },
    methods: {
      reduce(index) {
        //console.log(this.$store.state.cartList[index].count);
          this.$store.commit('reduce', index)
      },
      add(index) {
        this.$store.commit('add', index)
      },
      switchCount(index) {
        this.$store.commit('switchCount', index)
      },
      switchBtn(index) {
        this.$store.commit('switchBtn', index)
      }
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
