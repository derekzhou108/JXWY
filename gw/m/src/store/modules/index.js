import * as types from '../types'
import api from '@/api'

const state = {
    roleList: [],
    scrollList: [],
    activityList: [],
    newsList: [],
    videoDialog: false,
    video: {},
    indexVideoList: {},
    gameDownInfo: {},
    indexImageList: {},
    indexGameFeatures: [],
    imgIndex: 0,
    isShowYXTS:false,
}

const getters = {

    [types.DONE_ROLE_LIST]: ({ roleList }) => roleList,
    [types.DONE_GAME_DOWNLOAD]: ({ gameDownInfo }) => gameDownInfo,
    [types.DONE_SCROLL_LIST]: ({ scrollList }) => scrollList,
    [types.DONE_NEWS_LIST]: ({ newsList }) => newsList,
    doneVideoDialog: ({ videoDialog }) => videoDialog,
    imgIndex:({ imgIndex }) => imgIndex,
    isShowYXTS:({isShowYXTS}) => isShowYXTS,
    [types.DONE_VIDEO]: ({ video }) => video,
    [types.DONE_INDEX_VIDEO_LIST]: ({ indexVideoList }) => indexVideoList,
    [types.DONE_INDEX_IMAGE_LIST]: ({ indexImageList }) => indexImageList,
    [types.DONE_GAME_FEATURES]: ({ indexGameFeatures }) => indexGameFeatures,
}

const actions = {
    [types.FETCH_GAME_DOWNLOAD]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.getDownloadInfo()
                .then((res) => {
                    state.gameDownInfo = res.data.data
                    resolve(res.data)
                })
        })
    },
    [types.FETCH_ROLE_LIST]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.getRoleList()
                .then((res) => {
                    commit(types.TOGGLE_ROLE_LIST, res.data.data)
                    resolve()
                })
        })
    },
    [types.FETCH_SCROLL_LIST]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.getRollNews()
                .then((res) => {
                    state.scrollList = res.data.data
                    resolve()
                })
        })
    },
    [types.FETCH_NEWS_LIST]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.getNewsList()
                .then((res) => {
                    state.newsList = res.data
                    resolve()
                })
        })
    },
    [types.FETCH_VIDEO]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.video()
                .then((res) => {
                    state.video = res.data.data
                    resolve(res.data)
                })
        })
    },
    [types.FETCH_INDEX_VIDEO_LIST]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.indexVideoList().then((res) => {
                state.indexVideoList = res.data.data
                resolve(res.data)
            })
        })
    },
    [types.FETCH_INDEX_IMAGE_LIST]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.indexImageList().then((res) => {
                state.indexImageList = res.data.data
                resolve(res.data)
            })
        })
    },
    [types.FETCH_GAME_FEATURES]({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            api.getGameFeatures().then((res) => {
                state.indexGameFeatures = res.data.data
                resolve(res.data)
            })
        })
    }
}


const mutations = {
    [types.TOGGLE_ROLE_LIST](state, payload) {
        state.roleList = payload
    },
    updateImgIndex(state, payload){
        state.imgIndex = payload
    },
    updateSwiper(state, payload){
        state[payload.name] = payload.value
    },
    updateVideoDialog(state, payload) {
        state.videoDialog = payload
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
