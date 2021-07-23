import {ADD_COUNTER, ADD_TO_CART, ADD_TO_COLLECTION} from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) { //增加数量
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else { //添加商品
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
        // context.state.cartList.push(payload)
      }
    })
  },
  addCollection(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.CollectionList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) {
        for (let key in context.state.CollectionList) {
          if (context.state.CollectionList[Number(key)].iid === payload.iid) {
            // context.commit('isChecked', Number(key))
            resolve('该商品已被收藏')
          }
        }
      } else { //添加商品
        payload.isCollection = false
        payload.checked = false
        context.commit(ADD_TO_COLLECTION, payload)
        resolve('收藏成功')
      }
    })
  }
}
