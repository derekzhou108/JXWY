import * as types from '../types'
import api from '../../api'

const state = {
  list: [],
  types: []
}

const getters = {
  [types.DONE_LIST]: ({ list }) => list,
  [types.DONE_TYPES]: ({ types }) => types
}

const actions = {
  [types.FETCH_TYPES]({ commit, state}){
    return new Promise((resolve, reject) => {
      api.getNewsType().then(res => {
        commit(types.TOGGLE_TYPES, res.data.data)
        resolve()
      })
    })
  },
  [types.FETCH_LIST]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.list(payload).then(res => {
        commit(types.TOGGLE_LIST, res.data)
        resolve()
      },() => console.log('网络异常，请稍后重试'))
    })
  }
}

const mutations = {
  [types.TOGGLE_TYPES](state, payload){
    payload.forEach(v => {
      v.firstLoading = true
    })
    state.types = payload
    payload.forEach((v,k) => {
      state.list.splice(k,0,{
        idx: 0,   //当前页
        cid: v.id,    //栏目ID
        news: [],
        pageCount: 0,
        pageIndex: 0
      })
    })
  },
  [types.TOGGLE_LIST](state, payload){
    state.list.forEach(v => {
      if(v.cid == payload.cid){
        if(payload.news.length >0){
            payload.news.forEach(item=>{
                v.news.push( item)
            })
        }
        v.pageCount = payload.pageCount
        v.pageIndex = payload.pageIndex
      }
    })
    state.types.forEach(v => {
      if(v.id == payload.cid){
        v.firstLoading = false
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
