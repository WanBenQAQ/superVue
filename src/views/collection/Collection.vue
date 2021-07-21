<template>
  <div id="collection">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/whiteback.svg" alt="">
      </div>
      <div slot="center">我的收藏({{CollectionListLength}})</div>
      <div @click="adminstration" class="administration" slot="right">管理</div>
    </nav-bar>
    <div class="collection-info">
      <scroll class="content" ref="scroll">
        <div class="collection-item-info" v-for="(item, index) in CollectionList" :key="index">
          <div class="collection-item">
            <div v-if="isShowBtn" class="item-selector">
              <check-button @click.native="checkClick(index)" :is-checked="CollectionList[index].checked"></check-button>
            </div>
            <div class="item-img">
              <img :src="item.image" alt="商品图片" @load="imageLoad">
            </div>
            <div class="item-info">
              <div class="item-title">{{item.title}}</div>
              <div class="item-desc">商品描述: {{item.desc}}</div>
              <div class="item-price">¥{{item.price}}</div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <collection-bottom-bar v-show="isShowBtn"/>
  </div>
</template>

<script>
  import collectionBottomBar from "./childComps/collectionBottomBar";

  import NavBar from "components/common/navBar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from 'vuex'
  export default {
    name: "Collection",
    components: {
      collectionBottomBar,
      NavBar,
      Scroll,
      CheckButton
    },
    data() {
      return {
        isShowBtn: false
      }
    },
    computed: {
      ...mapGetters([
        'CollectionListLength',
        'CollectionList'
      ])
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      backClick() {
        this.$router.back()
      },
      checkClick(index) {
        //勾选功能
        this.$store.commit('collectionischecked', index)
      },
      adminstration() {
        this.isShowBtn = !this.isShowBtn
      }
    }
  }
</script>

<style scoped>
  #collection {
    height: 100vh;
    background-color: #fff;
  }
  .nav-bar {
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    font-weight: 700;
    color: #fff;
  }
  .back img {
    margin-top: 12px;
    width: 22px;
    height: 22px;
  }
  .administration {
    margin: 3px 2px 0 0;
    font-size: 16px;
    font-weight: normal;
  }
  .collection-info {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
  .collection-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
  }
  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .collection-item-info {
    display: flex;
  }
  .item-img {
    padding: 5px;
    flex-grow: 1;
  }
  .item-img img {
    width: 130px;
    height: 150px;
    border-radius: 5px;
  }
  .item-info {
    font-size: 14px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-title {
    font-weight: bold;
    max-height: 30px;
    max-width: 210px;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-bottom: 12px;
  }
  .item-desc {
    max-height: 64px;
    max-width: 210px;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-bottom: 15px;
  }
  .item-price {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
