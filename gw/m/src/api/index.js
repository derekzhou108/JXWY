require('es6-promise').polyfill()
import Axios from 'axios'
import store from '../store'
import qs from 'qs'
import {toastText} from '@/utils'

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

export default {
  //获取首页新闻分类
  getNewsType: data => Axios.get('/news/get-news-type'),
  //新闻轮播图
  getRollNews: data => Axios.get('/news/get-roll-news'),
  //新闻列表
  getNewsList: data => Axios.get('/news/get-news-list'),
  //获取游戏特色
  getGameFeatures: data => Axios.get('/game-features'),
  // //提交预约
  // appointmentCreate :data => Axios.post('/appointment/create',data,config),
  //获取新闻详情
  getNewsDetail: data => Axios.post('/news/detail', data, config),
  //获取新闻列表
  list: data => Axios.post('/news/list-ajax', data, config), //idx(当前页)；cid(分类页id)
  //微信分享
  share: data => Axios.get('/share/wx-share', {params: data}),
  //首页视频
  video: data => Axios.post('/video/top-index'),


  //首页视频列表
  indexVideoList: data => Axios.get('/video/video-list'),
  //首页原画列表
  indexImageList: data => Axios.get('/original/wap-index'),
  //二级页面 原画列表
  imageList: data => Axios.post('/original/ajax-wap-list', data, config),
  //二级页面 视频列表
  videoList: data => Axios.post('/video/ajax-video-list', data, config),
  //获取下载地址
  getDownloadInfo: data => Axios.post('/download/info'),
  //资料库列表
  gamedataList: data => Axios.post('/game-database/list?res_format=html', data, config),
  //获取游戏资料库页内容
  gamedataDetail: data => Axios.post('/game-database/detail?res_format=html', data, config),

}

