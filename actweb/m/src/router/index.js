import Vue from 'vue'
import Router from 'vue-router'
import Download from '@/views/Download.vue'
import Exchange from '@/views/Exchange.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/down/',
  routes: [
    {
      path: '/',
      name: 'download',
      component: Download
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: Exchange
    },
    {
      path: '**',
      redirect: '/'
    }
  ]
})
