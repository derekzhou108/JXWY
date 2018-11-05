import * as types from '../types'
import api from '@/api'

const state = {
  newsDetail: {},
  gamedataDetail: {}
}

const getters = {
  [types.DONE_NEWS_DETAILS]: ({newsDetail}) => newsDetail,
  [types.DONE_GAME_DETAILS]: ({gamedataDetail}) => gamedataDetail
}

const actions = {
  [types.FETCH_NEWS_DETAILS]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.getNewsDetail(payload).then(res => {
        state.newsDetail = res.data.data
        resolve(res.data)
      },() => console.log('网络异常，请稍后重试'))
    })
  },
  [types.FETCH_GAME_DETAILS]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.gamedataDetail(payload).then(res => {
        state.gamedataDetail = res.data.data
        resolve(res.data)
      },() => console.log('网络异常，请稍后重试'))
    })
  }
}

const mutations ={

}

export default {
  state,
  getters,
  actions,
  mutations
}
