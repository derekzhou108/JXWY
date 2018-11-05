import Vue from 'vue'
//import FastClick from 'fastclick'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { AlertPlugin, ConfirmPlugin, ToastPlugin, TransferDom, WechatPlugin, XDialog } from 'vux';
import Share from 'vue-social-share';

Vue.component('x-dialog', XDialog);
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.directive('transfer-dom', TransferDom)
Vue.use(Share);
sync(store, router);

//FastClick.attach(document.body)

Vue.config.productionTip = false


router.beforeEach(function (to, from, next) {
  // document.title = to.meta.title ='银之守墓人'

  /*  api.share().then((res) => {
      util.initWX(res.data.data);
    });*/

  //判断终端
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  store.commit('updateIsIOS', isiOS)
  let curHost = process.env.NODE_ENV == 'production' ? window.location.host : 'sb.jxwy.ksgame.com'
  curHost="//"+curHost+"/download/scan"
  store.commit('updateHost', curHost)

  next()

})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
