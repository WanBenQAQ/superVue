import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//1. 安装插件
Vue.use(Vuex)

const state = {
  cartList: [],
  CollectionList: [],
  // 是否开启请求加载
  isLoading: true
}

//2. 创建Store对象
const store = new Vuex.Store({
  //类似data
  state,
  //类似methonds
  mutations,
  actions,
  getters
})

//3. 挂载到实例上
export default store
