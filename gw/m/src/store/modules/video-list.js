import * as types from '../types'
import api from '../../api'

const state = {
    ajaxVideoList: [],
    ajaxImageList: []
}

const getters = {
    [types.DONE_AJAX_VIDEO_LIST]: ({ ajaxVideoList }) => ajaxVideoList,
    [types.DONE_AJAX_IMAGE_LIST]: ({ ajaxImageList }) => ajaxImageList
}

const actions = {

    [types.FETCH_AJAX_IMAGE_LIST]({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            api.imageList(payload)
                .then((res) => {
                    res.data.data.forEach((v)=>{
                        state.ajaxImageList.push(v)
                    })
                    // state.ajaxImageList = res.data.data
                    resolve(res.data)
                })
        })
    },
    [types.FETCH_AJAX_VIDEO_LIST]({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            api.videoList(payload)
                .then((res) => {
                    res.data.data.forEach((v)=>{
                        state.ajaxVideoList.push(v)
                    })
                    // state.ajaxVideoList = res.data.data
                    resolve(res.data)
                })
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
