import * as types from '../types'


const state = {
    curData: {},
    showPre:true,
    showNext:true,
    audioSrc:true,
}

const getters = {
    [types.DONE_CURPARTNER_DATA]: ({ curData }) => curData,
    showPre:({ showPre }) => showPre,
    showNext:({ showNext }) => showNext,
    audioSrc:({ audioSrc }) => audioSrc,
}

const actions = {

}

const mutations = {
    [types.TOGGLE_CURPARTNER_DATA](state, payload) {
        let addObject = {
            typeNmae: "",
            color: ""
        }
        if (payload) {
            switch (payload.type) {
                case 1:
                    addObject.typeNmae = "防御";
                    break;
                case 2:
                    addObject.typeNmae = "辅助";
                    break;
                case 3:
                    addObject.typeNmae = "输出";
                    break;
            }
            switch (payload.color) {
                case 1:
                    addObject.color = "金";
                    break;
                case 2:
                    addObject.color = "蓝";
                    break;
                case 3:
                    addObject.color = "紫";
                    break;
            }
   
        }
        state.curData = Object.assign({},payload,addObject)

    },
    updateShowNext(state, {index,length}){
        if(index <= 0){
            state.showPre= false
        }else {
            state.showPre = true
        }
        if(index >= length-1){
            state.showNext = false
        }else {
            state.showNext = true
        }

    }

}

export default {
    state,
    getters,
    actions,
    mutations
}
