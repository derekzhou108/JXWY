import * as types from '../types'
import api from '@/api'
import * as util from '../../utils'

const state = {
  scrollList: [],
  num: 0,
  invite_num: 0,
  times: 0,
  lockIcon: '',
  userInfo: {
    last_login_time: 0,
    sign: "",
    token: "",
    user_id: "",
    user_name: ""
  }
};

const getters = {
  [types.DONE_SCROLL_LIST]: ({ scrollList }) => scrollList,
  num: ({ num }) => num,
  invite_num: ({ invite_num }) => invite_num,
  times: ({ times }) => times,
  lockIcon: ({ lockIcon }) => lockIcon
};

const actions = {

  [types.FETCH_SCROLL_LIST]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getSwiperImg()
        .then((res) => {
          state.scrollList = res.data.data;
          resolve()
        })
    })
  },
  [types.INVITELIST]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getInviteList(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.POST_APPOINTMENT]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.reserve(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.SMSCODE]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getSmsCode(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.APOCODE]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.sendCode(payload).then(res => {
        resolve(res)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.INVCODE]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getInviteCode(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  // 抽奖
  [types.DRAW]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getPrize(payload).then(res => {
        //  commit('updateUserInfo', res.data);
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  // 邀请人数
  [types.APPOINT_NUM]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getReserveNum(payload).then(res => {
        state.invite_num = res.data.data ? res.data.data.invite_num : 0
        resolve()
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  // 抽奖次数
  [types.TIMES]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getPrizeTime(payload).then(res => {
        state.times = res.data.data ? res.data.data.times : 0
        resolve()
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  //奖品列表
  [types.DRAWLIST]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getDrawList(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  //sdkd登陆
  [types.SDK_LOGIN]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.sdkLogin(payload).then(res => {
        resolve(res)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  // 注册
  [types.SDK_REGISTER]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.reg(payload).then(res => {
        resolve(res)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  //sdkd登出
  [types.SDK_LOGOUT]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.sdkLogout().then(res => {
        resolve(res)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  //sdkd找回密码
  [types.SDK_FORGET]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.findPwd().then(res => {
        resolve(res)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  // 获取游戏区服
  [types.USERINFO]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getUserInfo().then(res => {
        if (res.data.code === 10000) {
          resolve(res.data.data)
        } else {
          reject(res.data.msg)
        }
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.UPDATALOCKICON]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getLockIcon(payload).then(res => {
        if (res.data.code === 10000) {
          commit('updateLockIcon', res.data.data)
        } else {
          reject(res.data.msg)
        }
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.UPDATEBINFPHONE]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getBindPhone(payload).then(res => {
        if (res.data.code === 10000 && !!res.data.data) {
          resolve();
        } else {
          reject()
        }
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  // 获取游戏区服
  [types.GAMEINFO]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getGameInfo(payload).then(res => {
        if (res.data.code === 10000) {
          resolve(res.data.data)
        } else {
          reject(res.data.msg)
        }
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.ONE]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getPr(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.TWO]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.InFriP(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.CenterPri]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.centerPri(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.CenterFriend]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.centerFriend(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
  [types.getEx]({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getEx(payload).then(res => {
        resolve(res.data)
      }, () => console.log('网络异常，请稍后重试'))
    })
  },
};


const mutations = {
  [types.TOGGLE_ROLE_LIST](state, payload) {
    state.roleList = payload
  },
  updateVideoDialog(state, payload) {
    state.videoDialog = payload
  },
  updateLockIcon(state, payload) {
    state.lockIcon = payload
  },
  updateNum() {
    state.num = parseInt(state.num, 10) + 1;
  },
  updateUserInfo(state, payload) {
    if (!payload) {
      const userIfo = util.getStorage('userInfo');

      if (!userIfo) {
        state.userInfo = {
          last_login_time: 0,
          sign: "",
          token: "",
          user_id: "",
          user_name: ""
        }
      } else {
        state.userInfo = userIfo;
      }
    } else {
      util.setStorage('userInfo', payload);
      state.userInfo = payload
    }

  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
