<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @imageLoad="imageLoad"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";

  import NavBar from "components/common/navBar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import { getCategory, getSubcategory, getCategoryDetail } from "network/category";
  /*import { POP, SELL, NEW } from "common/const";*/

  export default {
    name: "Category",
    components: {
      TabMenu,
      TabContentCategory,
      NavBar,
      Scroll
    },
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
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          this.categories = res.data.category.list
          let length = this.categories.length
          for (let i = 0; i < length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              /*categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }*/
            }
          }
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentIndex = index
        const mailKey = this.categories[index].maitKey
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          /*this.getCategoryDetail(POP)
          this.getCategoryDetail(SELL)
          this.getCategoryDetail(NEW)*/
        })
      },
      /*getCategoryDetail(type) {
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      }*/
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
