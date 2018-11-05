import Vue from 'vue'
//import FastClick from 'fastclick'
import {sync} from 'vuex-router-sync'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import api from '@/api'
import FastClick from 'fastclick'
import VueClipboard from 'vue-clipboard2'
import * as util from "./utils";
import {AlertPlugin, ConfirmPlugin, ToastPlugin, WechatPlugin} from 'vux'
import 'babel-polyfill';
import VueTouch from 'vue-touch';
import Share from 'vue-social-share';
import 'vue-social-share/dist/client.css';
FastClick.attach(document.body);
Vue.use(VueTouch, {name: 'v-touch'});
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(VueClipboard)

Vue.use(Share);
sync(store, router)


Vue.config.productionTip = false


// ;(function(){
//   const html = document.querySelector('html')
//   const htmlWidth = window.innerWidth
//   html.style.fontSize = htmlWidth / (750 / 100) + 'px'
// })()


router.beforeEach(function (to, from, next) {
  // document.title = to.meta.title ='银之守墓人'
/*
  api.share().then((res) => {
    util.initShare(res.data.data);
  }, (err) => {
    util.initShare({});
    console.log(err)
  });*/


  if (to.name === 'video') {
    store.commit('updateIsVideo', true)
  } else {
    store.commit('updateIsVideo', false)
  }



  //判断终端
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  store.commit('updateIsIOS', isiOS)

  let curHost = process.env.NODE_ENV == 'production' ? window.location.host : '//jxwy.ksgame.com'
  curHost="//"+curHost+"/download/scan"
  store.commit('updateHost', curHost)
  next()

});
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
