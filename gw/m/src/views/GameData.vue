<template>
    <div class="gameDatacomponent border-top border-current" >
        <publicTop></publicTop>
        <topNav></topNav>
        <div class="banner">

        </div>
        <div class="game-detail">
            <section class="section" v-for="levelOne of result" :key="levelOne.id">
                <h4 class="detail-title">{{levelOne.name}}</h4>
                <ul class="detail-line flex flex-wrap" v-for="levelTwo of levelOne.children" :key="levelTwo.id">
                    <li class="detail-title-s flex-col-100" ><div class="txt">{{levelTwo.name}}</div></li>

                    <template v-for="levelThree of levelTwo.children" >
                        <li class="list-item" :key="levelThree.id">
                            <a v-if="levelThree.content && levelThree.content.type === '1'" :href="levelThree.content.title">{{levelThree.name}}</a>
                            <router-link v-else-if="levelThree.content && levelThree.content.type === '2'" :to="{path: '/jxwy/news',query:{id:levelThree.content.title}}">{{levelThree.name}}</router-link>
                            <router-link v-else-if="levelThree.content && levelThree.content.type === '3'" :to="{path: '/jxwy/game-database',query:{id:levelThree.content.id}}">{{levelThree.name}}</router-link>
                            <span v-else-if="!levelThree.content">{{levelThree.name}}</span>
                            <i v-if="levelThree.tag_status === '1' && levelThree.tag" class="tag">{{levelThree.tag}}</i>
                        </li>
                    </template>

                </ul>
            </section>
        </div>  
        <publicFooter></publicFooter>
    </div>
</template>

<script>
import publicTop from "../components/publicTop.vue";
import publicFooter from "../components/footer.vue";
import topNav from "../components/topNav.vue";
import { mapGetters, mapState } from "vuex";
import { XDialog, TransferDomDirective as TransferDom } from "vux";
import * as util from "../utils";
import api from "@/api";

export default {
  data() {
    return {
      result: {}
    };
  },
  components: {
    publicTop,
    publicFooter,
    topNav
  },
  mounted() {
    api.gamedataList({ app_id: "JXWY" }).then(res => {
      if (res.data.code === 10000) {
        this.result = res.data.data;
      }
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.gameDatacomponent {
  .banner {
    background: url("../assets/img/zlk-banner.png") no-repeat left top;
    height: 6.89rem;
    width: 100%;
    // margin-top: -1.65rem;
    background-size: 100%;
  }
  background-size: cover;
  .game-detail {
    margin-top: .45rem;
    padding: 0 .24rem;
    & > section {
      padding-bottom: .5rem;
      color: #1a1a1a;
      .detail-title {
        padding-bottom: .2rem;
        border-bottom: 1px solid #a48d66;
        margin-bottom: .2rem;
        position: relative;
        padding-left: .44rem;
        font-size: .18rem;
        // font-family: FZQKBYSJW;
        font-size: .34rem;
        color: #1a1a1a;
        &::before {
          content: "";
          display: inline-block;
          background: url("../assets/img/diamond-icon.png") no-repeat left top;
          width: .24rem;
          height: .24rem;
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -.26rem;
        }
      }
      .detail-title-s {
        font-size: .18rem;
        line-height: .62rem;
        margin: 0 0 .30rem -.1rem !important;
        &::after {
          display: none !important;
        }
        .txt {
          color: #514238;
          text-align: center;
          background: url("../assets/img/title-s-bg.png") no-repeat;
          width: 2.1rem;
          height: .62rem;
          background-size: 100% 100%;
        }
      }
      .detail-line {
        overflow: hidden;
        margin-bottom: .45rem;
        padding-left: .1rem;
        li {
          position: relative;
          text-align: center;
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            right: 0;
            border: 1px solid #343434;
            height: .3rem;
            top: 0;
            bottom: 0;
            margin: auto;
          }
          &:last-child::after {
            display: none;
          }
          .tag {
            display: inline-block;
            position: relative;
            padding: 0rem .1rem;
            font-size: .12rem;
            background: #e60012;
            color: #fff;
            line-height: 1.5;
            margin-left: 1em;
            border-radius: 0;
            top: -.2rem;
            right: 0;
            z-index: 99;
            &::before {
              content: "";
              position: absolute;
              border: transparent 0.75em solid;
              border-right-color: #e60012;
              top: 0;
              left: -1.5em;
              height: 0em;
              width: 0em;
            }
          }
        }
        .list-item {
          display: inline-block;
          padding: .2rem;
        }
        &:last-child {
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>

