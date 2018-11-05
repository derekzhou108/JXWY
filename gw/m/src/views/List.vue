<template>
  <div class="newsListComponent">
    <publicTop></publicTop>
    <topNav></topNav>
    <div class="news-list-page">
      <div class="title">
        <span>新闻资讯</span>
      </div>
      <div class="news-list">

        <ul class=" news-tab flex" ref="types">
          <li href="javascript:;" class="tab flex-item" v-for="(item, index) in DONE_TYPES"
              :class="{'active': currentNewsList == index}"
              @click="currentNewsList = index;firstFetchList({cid: item.id, idx: 0, firstLoading: item.firstLoading})">
            {{ item.category}}
          </li>
        </ul>

        <div class="list" v-show="currentNewsList == index" v-for="(item, index) in newsListArr">
          <ul>
            <router-link class="flex" tag="li" :to="{name: 'NewsDetails', query: {id : news.id}}" :key="key"
                         v-for="(news, key) in item.news">
              <!--<span class=""></span>-->
              <span class="u-ell flex-col-80">
                                <i class="tab-icon"></i>{{ news.title}}</span>
              <span class="flex-item u-tr time">{{ news.created_at }}</span>
            </router-link>
          </ul>
          <div style="overflow: hidden">
            <div class="page flex">
              <!--<div class="btn flex-center flex u-fs22" :class="item.pageIndex > 0 ? 'u-vshow':'u-vhide' "-->
              <!--@click="fetchList({cid: item.cid, idx: item.pageIndex - 1})">上一页-->
              <!--</div>-->
              <!--<div class="btn flex-center flex u-fs22"-->
              <!--:class="(item.pageCount - item.pageIndex > 1) ? 'u-vshow':'u-vhide' "-->
              <!--@click="fetchList({cid: item.cid, idx: item.pageIndex + 1})">下一页-->
              <!--</div>-->
              <div class="btn flex-center flex u-fs22 load-more"
                   :class="(item.pageCount - item.pageIndex > 1) ? 'u-vshow':'u-vhide' "
                   @click="fetchList({cid: item.cid, idx: item.pageIndex + 1})">

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import publicTop from "../components/publicTop.vue";
  import publicFooter from "../components/footer.vue";
  import topNav from "../components/topNav.vue";
  import {mapGetters} from "vuex";

  export default {
    name: "newsList",
    components: {
      publicTop,
      publicFooter,
      topNav
    },
    data() {
      return {
        currentNewsList: 0,
        newsListArr: []
      };
    },
    computed: {
      ...mapGetters(["DONE_LIST", "DONE_TYPES"])
    },
    methods: {
      firstFetchList(payload) {
        if (!payload.firstLoading) return;
        this.$store.dispatch("FETCH_LIST", payload).then(() => {
          this.newsListArr = this.DONE_LIST;
        });
      },
      fetchList(payload) {
        this.$store.dispatch("FETCH_LIST", payload).then(() => {
          //                    this.DONE_LIST[this.currentNewsList].news.forEach(function(v,k){
          //                        self.newsListArr[self.currentNewsList].news.splice(0,0,v)
          //                    })
        });
      },
      fetchTypes() {
        const type = this.$route.query.type;
        this.$store.dispatch("FETCH_TYPES").then(() => {
          let obj = type === 'gl' ? this.DONE_TYPES[4] : this.DONE_TYPES[0];
          this.currentNewsList = type === 'gl' ? 4 : 0;
          this.firstFetchList({
            cid: obj.id,
            idx: 0,
            firstLoading: obj.firstLoading
          });
        });
      }
    },
    created() {
      this.fetchTypes();
    }
  };
</script>

<style lang="less" scoped>
  .newsListComponent {
    background: #f5f0ec url("../assets/img/public-titile-bg.png") no-repeat center 1rem;
    .news-list-page {
      min-height: 6.7rem;
      width: 100%;
      & > .title {
        color: #a48d66;
        font-size: 0.51rem;
        padding: 0.3rem 0;
        text-align: center;
        span {
          display: inline-block;
          position: relative;
          &::before, &::after {
            content: "";
            background: url("../assets/img/news/icon-title.png") no-repeat left top;
            background-size: 100% 100%;
            position: absolute;

            top: 0;
            bottom: 0;
            display: inline-block;
            width: 1.42rem;
            margin: auto;
            height: 0.21rem;
          }
          &::before {
            right: 110%;
          }
          &::after {
            left: 110%;
            transform: rotate(-180deg)
          }
        }
      }
      .current-news {
        font-size: 0.26rem;
        // text-indent: .2rem;
      }
      .news-list {
        background: url("../assets/img/news/news-bg.png") no-repeat center top;
        padding: 0 0.1rem;
        .news-tab {
          width: 100%;
          height: 0.52rem;
          line-height: 0.52rem;
          background-color: #a48d66;
          color: #fff;
          .tab {
            text-align: center;
            position: relative;
            &.active {
              background: url("../assets/img/news/tab-active.png") no-repeat center top;
              background-size: 100% 100%;
            }
            &:after {
              content: "";
              position: absolute;
              display: inline-block;
              width: 1px;
              right: 0;
              background-color: rgba(255, 255, 255, 0.3);
              height: 50%;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            &:last-child:after,
            &.active:after {
              display: none;
            }
          }
        }
        .list {
          margin-top: 0.2rem;
          padding: 0 0.1rem;
          color: #000000;
          & li {
            height: 0.65rem;
            line-height: 0.65rem;
            font-size: 0.18rem;
            border-bottom: 1px dashed #aaaaaa;
            .tab-icon {
              background: url("../assets/img/news/new-item-icon.png") no-repeat;
              width: 0.37rem;
              height: 0.17rem;
              background-size: 100% 100%;
              display: inline-block;
              margin-right: 0.16rem;
            }
          }
        }
      }
      .page {
        margin: 0.6rem 0.2rem;
        .btn {
          width: 4.49rem;
          margin: 0 auto;
          height: 0.66rem;
          background: url("../assets/img/more-new.png");
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
