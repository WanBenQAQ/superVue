<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @imageLoad="imageLoad"/>
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick"/>
          <tab-content-detail :categoryDetail="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabControl from "components/content/tabControl/TabControl";
  import TabContentDetail from "./childComps/TabContentDetail";

  import NavBar from "components/common/navBar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import { getCategory, getSubcategory, getCategoryDetail } from "network/category";
  import { POP, SELL, NEW } from "common/const";
  import { tabControlMixin, itemListenerMixin, backTopMixin } from "common/mixin";

  export default {
    name: "Category",
    components: {
      TabMenu,
      TabContentCategory,
      TabControl,
      TabContentDetail,
      NavBar,
      Scroll,
      BackTop
    },
    mixins: [ tabControlMixin, itemListenerMixin, backTopMixin ],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1
      }
    },
    created() {
      this.getCategory()
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this.getSubcategories(0)
        })
      },
      contentScroll(position) {
        this.listenShoBackTop(position)
      },
      getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this.getCategoryDetail(POP)
          this.getCategoryDetail(SELL)
          this.getCategoryDetail(NEW)
        })
      },
      getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this.getSubcategories(index)
      },
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  * { touch-action: pan-y; }
  #category {
    height: 100vm;
  }
  .nav-bar {
    background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%);
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
