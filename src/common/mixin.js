import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  components: {
    BackTop
  },
  mounted() {
    //1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    //对监听的事件进行保存
    this.itemImgListener = () => { refresh() }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // 点击返回顶部
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShoBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
