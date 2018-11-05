import Vue from 'vue'
import Vuex from 'vuex'

import index from './modules/index.js'
import list from './modules/list.js'
import detail from './modules/detail.js'
import appointment from './modules/appointment'
import videoList from './modules/video-list'
import partnerDetail from './modules/partner-detail'

import api from '@/api'
// import topNav from './modules/'

Vue.use(Vuex)

const state = {
  isLoading: false,
  dialogStatus: false,
  isIndex: false,
  IsIpad: false,
  indexTop: 0,
  indexTab: 0,
  isVideo: false,
  isIOS: false,
  curHost: '',
  downInfo: {}
}
const getters = {
  curHost:({curHost})=>curHost
};
export default new Vuex.Store({
  modules: {
    index,
    list,
    appointment,
    detail,
    videoList,
    partnerDetail
  },
  state,
  getters,
  actions:{
    gameDownInfo({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        api.getDownloadInfo()
          .then(
            (res) => {
              if(res.data.data && res.data.data.ios_download_url){
                commit('updateDown',res.data.data.ios_download_url)
              }else{
                commit('updateDown','')
              }
              if(res.data.data && res.data.data.android_download_url){
                commit('updateDown',res.data.data.android_download_url)
              }else{
                commit('updateDown','')
              }
              // if(res.data.code === 10000){
              //   if(state.isIOS ){
              //     if(res.data.data.ios_download_url){
              //       commit('updateDown',res.data.data.ios_download_url)
              //     }else{
              //       commit('updateDown','http://uri6.com/tkio/iURruma')
              //     }
              //   }else{
              //     commit('updateDown',res.data.data.android_download_url)
              //   }
              // }else{
              //   commit('updateDown','http://uri6.com/tkio/iURruma')
              // }
          },
          (err) => {
            commit('updateDown','')
          }
        )
      })
    },
  },
  mutations: {
    updateIsIndex(state,payload){
      state.isIndex = payload
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDialogStatus (state, payload){
      state.dialogStatus = payload.dialogStatus
    },
    updateIndexTop(state, payload){
      state.indexTop = payload
    },
    updateIndexTab(state, payload){
      state.indexTab = payload
    },
    updateIphoneInfo (state, payload){
      state.IsIpad = payload.IsIpad
    },
    updateIsVideo (state, payload) {
      state.isVideo = payload
    },
    updateIsIOS(state, payload) {
      state.isIOS = payload
    },
    updateHost(state, payload) {
      state.curHost = payload
    },
    updateDown(state, payload){
      state.downInfo = payload;
    }
  },
})
