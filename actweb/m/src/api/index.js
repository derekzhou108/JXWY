require('es6-promise').polyfill()
import Axios from 'axios'
import store from '../store'
import qs from 'qs'
import {param, toastText} from '@/utils'
import jp from 'jsonp';
// Axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   'X-Requested-With': 'XMLHttpRequest'
// }
// Axios.defaults.transformRequest =  [function (data) {
//   return qs.stringify(data)
// }]
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformRequest: [function (data) {
    return qs.stringify(data)
  }],
}
// Axios.defaults.timeout = 20000

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  store.commit('updateLoadingStatus', {isLoading: true})
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  store.commit('updateLoadingStatus', {isLoading: false})
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//正式环境  sdk.uu66.com
//内网开发环境 10.10.40.33:8111
//沙箱环境 115.159.189.146:8001

const url = '115.159.189.146:8001'
const baseUrl = '10.10.40.33:8428'
const jpUrl = '//kssdk.ksgame.com'

function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    jp(jpUrl + url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err)
      }
    })
  })
}

export default {
  //获取新闻列表
  list: data => Axios.post('/news/list-ajax', data, config), //idx(当前页)；cid(分类页id)
  //微信分享
  share: data => Axios.get('/share/wx-share', {params: data}),

  //获取下载地址
  getDownloadInfo: data => Axios.post('/download/download',data,config),

  //轮播图片
  getSwiperImg: data => Axios.get('/game-features/index'),

//抽奖次数
  getPrizeTime: data => Axios.post('/prize/get-times', {
    userId: data.userId,
    type: data.type
  }, config),
  //抽奖
  getPrize: data => Axios.post('/download/get-prize-download', {
    userId: data
  }, config),
  // 邀请二维码
  getInviteCode: data => Axios.post('/download/qrcode', data, config),
  //获取邀请人数
  getReserveNum: data => Axios.post('/download/invite-num', {
    userId: data
  }, config),
  //预约接口
  reserve: data => Axios.post('/reserve/reserve', data, config),

  getInviteList: data => Axios.post('/reserve/get-invite-icon', data, config),
  // 获取验证码
  getSmsCode: data => Axios.post('/reserve/send-sms-code', data, config),

  // 获取预约信息
  getUserInfo: data => Axios.post('/download/app-list', config),
  //获取是否解锁
  getLockIcon:data=>Axios.post('/download/invite-friend-prize-log',data,config),

  getBindPhone:data=>Axios.post('/sdk/get-bind-phone',data,config),

  // 获取已抽到奖品列表
  getDrawList: data => Axios.post('/prize/get-log ', {
    userId: data.userId,
    type: data.type
  }, config),

  sdkLogin: data => jsonp('/sdk-user/login', data),

  sdkLogout: data => jsonp('/sdk-user/logout'),

  sendCode: data => jsonp('/sdk-user/send-sms-code', data),
  reg: data => jsonp('/sdk-user/reg', data),
  findPwd: data => jsonp('/sdk-user/find-pwd', data),
  changePwd: data => jsonp('/sdk-user/change-pwd', data),
  isLogin: data => jsonp('/sdk-user/is-login', data),

  getGameInfo: data => Axios.post('/download/get-role', data, config),

  getPr: data => Axios.post('/download/get-download-prize', data, config),
  InFriP: data => Axios.post('/download/get-invite-friend-prize', data, config),


  //appId  userId  serverId   roleId
  centerPri: data => Axios.post('/prize-center/get-prize-reserve', data, config),
  centerFriend: data => Axios.post('/prize-center/get-prize-friend', data, config),
  getEx: data => Axios.post('/prize-center/prize-exchange', data, config)

}



