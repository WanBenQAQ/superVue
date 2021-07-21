import {ADD_COUNTER,
  ADD_TO_CART,
  ADD_TO_COLLECTION,
  COLLECTION_IS_CHECKED,
  REMOVE_TO_COLLECTION} from "./mutation-types";

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每一个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [ADD_TO_COLLECTION](state, payload) {
    state.CollectionList.push(payload)
  },
  removeToCollection(state, payload) {
    for (let key in state.CollectionList) {
      if (state.CollectionList[Number(key)].iid === payload) {
        //state.CollectionList[Number(key)].isCollection = true
        state.CollectionList.splice(key, 1)
      }
    }
  },
  isChecked(state, payload) {
    state.CollectionList[payload].isCollection = !state.CollectionList[payload].isCollection
  },
  reduce(state, payload) {
    state.cartList[payload].count--
  },
  add(state, payload) {
    state.cartList[payload].count++
  },
  switchCount(state, payload) {
    state.cartList[payload].isShow = true
  },
  switchBtn(state, payload) {
    state.cartList[payload].isShow = false
  },
  [COLLECTION_IS_CHECKED](state, payload) {
    state.CollectionList[payload].checked = !state.CollectionList[payload].checked
  }
}
