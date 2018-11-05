import Vue from 'vue'
import Vuex from 'vuex'

import index from './modules/index.js'
import api from '@/api'
// import topNav from './modules/'

Vue.use(Vuex)

const state = {
  isLoading: false,
  showVedio:false,
  dialogStatus: false,
  isIndex: false,
  IsIpad: false,
  indexTop: 0,
  dt: { show: false, data: {}, type: '' },
  isVideo: false,
  isIOS: false,
  curHost: '',
  downInfo: {},
  inviteId: '',
  k2: {
    show: false,
    data: {},
    type: ''
  },
  k6: {
    show: false,
    data: {},
    type: ''
  },
  register: {
    show: false,
    data: {},
    type: ''
  },
  forget: {
    show: false,
    data: {},
    type: ''
  },
  login: {
    show: false,
    data: {},
    type: ''
  },
  exdg: {
    show: false,
    data: {},
    type: '',
    pri: {}
  }
}
  ;
const getters = {
  curHost: ({ curHost }) => curHost,
  showVedio:({showVedio})=>showVedio
};
export default new Vuex.Store({
  modules: {
    index
  },
  state,
  getters,
  actions: {
    gameDownInfo({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        api.getDownloadInfo(payload)
          .then((res) => {
            if (state.isIOS) {
              if (res.data.data.ios_download_url) {
                commit('updateDown', res.data.data.ios_download_url)
              } else {
                commit('updateDown', 'http://uri6.com/tkio/iURruma')
              }
            } else {
              commit('updateDown', res.data.data.android_download_url)
            }
            resolve(res.data.data)
          })
      })
    },
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDialogStatus(state, payload) {
      state.dialogStatus = payload.dialogStatus;
      state.inviteId = payload.inviteId || '';
    },
    updateDialogType(state, payload) {
      state.dt = payload
    },
    updateVideo(state, payload) {
      state.showVedio = payload;
    },
    updateDialogK2(state, payload) {
      state.k2 = payload
    },
    updateDialogK6(state, payload) {
      state.k6 = payload
    },
    updateIsVideo(state, payload) {
      state.isVideo = payload
    },
    updateIsIOS(state, payload) {
      state.isIOS = payload
    },
    updateHost(state, payload) {
      state.curHost = payload
    },
    updateDown(state, payload) {
      state.downInfo = payload
    },
    loginDg(state, payload) {
      state.login = payload
    },
    registerDg(state, payload) {
      state.register = payload
    },
    forgetDg(state, payload) {
      state.forget = payload
    },
    chooseSite(state, payload) {
      state.exdg = payload
    }
  },
})
