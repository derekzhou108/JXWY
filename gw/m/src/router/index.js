import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import NewsDetail from '@/views/Detail.vue'
import NewsList from '@/views/List.vue'
import Video from '@/views/Video.vue'
import VideoList from '@/views/VideoList.vue'
import Download from '@/views/Download.vue'
import GameData from '@/views/GameData.vue'
import Novice from '@/views/Novice.vue'
import PartnerList from '@/views/PartnerList.vue'
import PartnerDetail from '@/views/PartnerDetail.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/site/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/jxwy/news',
      name: 'NewsDetails',
      component: NewsDetail
    },
    {
      path: '/jxwy/game-database',
      name: 'GameDataDetails',
      component: NewsDetail
    },
    {
      path: '/jxwy/news/list',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/video',
      name: 'video',
      component: Video,
    },
    {
      path: '/jxwy/videoList',
      name: 'VideoList',
      component: VideoList
    },
    {
      path: '/download/do',
      name: 'Download',
      component: Download
    },
    {
      path: '/jxwy/gameData',
      name: 'GameData',
      component: GameData
    },
    {
      path: '/jxwy/novice',
      name: 'Novice',
      component: Novice,
      meta: {scrollToTop: true}
    },
    {
      path: '/jxwy/partnerList',
      name: 'PartnerList',
      component: PartnerList
    },
    {
      path: '/jxwy/partnerDetail/:id',
      name: 'partnerDetail',
      component: PartnerDetail
    },
    {
      path: '**',
      redirect: '/'
    }

  ]
})
