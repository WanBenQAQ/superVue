<template>
  <div id="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <slide-bar :slide-bar-list="categoryList" @slideBarItemClick="slideBarItemClick" />
      <scroll class="scroll-height" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <subcategory :category-list="subcategoryList" @image-load="imageLoad" />
        <tab-control :titles="titleList" @tabClick="tabClick" ref="tabControl" />
        <goods-list :goods="categoryDetailList" :goods-height="false" />
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import SlideBar from "./childComps/SlideBar";
  import Subcategory from "./childComps/Subcategory";

  import NavBar from "components/common/navBar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import { getCategory, getCategoryDetail, getSubcategory } from "network/category";
  import { backTopMixin, itemListenerMixin } from "common/mixin";

  export default {
    name: "Category",
    components: {
      SlideBar,
      Subcategory,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    mixins: [ backTopMixin, itemListenerMixin ],
    data() {
      return {
        // 分类内容数据
        subcategoryList: [],
        categoryDetailList: [],
        // 分类侧边栏数据
        categoryList: [],
        titleList: ["流行", "新款", "精选"],
        currentIndex: 0
      }
    },
    methods: {
      slideBarItemClick({ maitKey, index }) {
        // 防止反复请求
        if (this.currentIndex === index) return;
        this.currentIndex = index;
        // 每次切换分类初始化tabControl的下标
        this.$refs.tabControl.curIndex = 0;
        // 请求对应的推荐列表
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
        this.getSubcategory(maitKey);
      },
      getCategory() {
        getCategory().then(res => {
          // console.log(res.data.category.list);
          this.categoryList = res.data.category.list;
          this.$nextTick(() => {
            this.getSubcategory(this.categoryList[0].maitKey);
            this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
          });
        });
      },
      getSubcategory(key) {
        getSubcategory(key).then(res => {
          // console.log(res.data.list);
          this.subcategoryList = [...res.data.list];
        });
      },
      getCategoryDetail(key, type) {
        getCategoryDetail(key, type).then(res => {
          // console.log(res);
          this.categoryDetailList = [...res];
        });
      },
      tabClick(index) {
        const typeList = ["pop", "new", "sell"];
        // 切换类型数据
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
      },
      //监听bscroll，判断何时显示/隐藏 BackTop按钮
      contentScroll(position) {
        this.listenShoBackTop(position)
      },
      //图片加载完成进行刷新
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    created() {
      this.getCategory();
    },
    activated() {
      this.$store.commit("setLoading", true);
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .category-nav-bar {
    font-weight: 600;
    color: #fff;
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .scroll-height {
    height: calc(100% - 44px - 49px);
    position: fixed;
    right: 0;
    left: 100px;
    overflow: hidden;
  }
</style>
