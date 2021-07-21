<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!--<toast :message="message" :isShow="isShow"/>-->
    <detail-bottom-bar @addCart="addToCart"
                       @addCollection="addToCollection"
                       @removeCollection="removeToCollection"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  /*import Toast from "components/common/toast/Toast";*/

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      /*Toast*/
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // isShowBackTop: false,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        /*message: '',
        isShow: false*/
      }
    },
    created() {
      //1. 保存传入的iid
      this.iid = this.$route.params.iid

      //2. 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 获取数据
        const data = res.result
        //1. 获取顶部的轮播图片数据
        this.topImages = data.itemInfo.topImages
        //2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3. 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4. 保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5. 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6. 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        /*//获取商品、参数、评论、推荐的坐标信息
        this.$nextTick(() => {
          // 根据最新的数据，对应的DOM已经被渲染出来了
          // 但是图片依然是没有加载完成的
          // offsetTop值不正确，一般情况下都是图片的问题
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          console.log(this.themeTopYs)
        })*/
      })

      //3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 防抖，避免themeTopYs被重复加载多次
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      })
    },
    methods: {
      imageLoad() {
        // 图片加载完毕后进行回调
        this.$refs.scroll.refresh()

        // 在这里获取商品、参数、评论、推荐的坐标信息
        // 因为图片加载完毕后这些坐标一定是正确的
        this.getThemeTopY()
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.isShow = true
        product.iid = this.iid

        // 2.将商品添加到购物车中
        this.$store.dispatch('addCart', product).then(res => {
          /*this.isShow = true
          this.message = res
          setTimeout(() => {
            this.isShow = false
            this.message = ''
          }, 1500)*/
          this.$toast.show(res, 1500)
        })
      },
      addToCollection() {
        const Collection = {}
        Collection.image = this.topImages[0]
        Collection.title = this.goods.title
        Collection.desc = this.goods.desc
        Collection.price = this.goods.realPrice
        Collection.iid = this.iid
        // 2.将商品添加到收藏中
        this.$store.dispatch('addCollection', Collection).then(res => {
          this.$toast.show(res, 1500)
        })
      },
      removeToCollection() {
        this.$store.commit('removeToCollection', this.iid)
      },
/*      backClick() {
        // 点击返回顶部
        this.$refs.scroll.scrollTo(0, 0)
      },*/
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if(this.currentIndex !== i &&
            ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        /*const positionY = -position.y
        if (positionY > this.themeTopYs[0] && positionY <= this.themeTopYs[1]) {
          this.$refs.nav.currentIndex = 0
        }else if (positionY > this.themeTopYs[1] && positionY <= this.themeTopYs[2]) {
          this.$refs.nav.currentIndex = 1
        }else if (positionY > this.themeTopYs[2] && positionY <= this.themeTopYs[3]) {
          this.$refs.nav.currentIndex = 2
        }else if (positionY > this.themeTopYs[3]) {
          this.$refs.nav.currentIndex = 3
        }*/

        //3. 是否显示回到顶部
        /*this.isShowBackTop = (-position.y) > 1000*/
        this.listenShoBackTop(position)
      },
      titleClick(index) {
        //点击跳转到对应位置
        this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]), 300)
      }
    },
/*    mounted() {
      //1. 图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.itemImgListener = () => { refresh() }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
    },*/
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
