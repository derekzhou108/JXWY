<template>
  <div class="partnerDetailComponent">

    <!-- 顶部下载 -->
    <publicTop></publicTop>

    <!-- 导航栏 -->
    <topNav></topNav>

    <!-- 人物视图 -->
    <v-touch class="view-warp" @swipeleft="switchPag(1)" @swiperight="switchPag(-1)" tag="div" :swipe-options="{direction: 'horizontal'}">
      <div class="character">
        <img :src="require(`../assets/img/huoban/people-l/${this.DONE_CURPARTNER_DATA.id}.png`)" alt="">
      </div>
      <div class="voice-fun" @click="audioPaly">
        <span class="txt">{{DONE_CURPARTNER_DATA.name || ''}}{{DONE_CURPARTNER_DATA.cv && 'cv'}}{{DONE_CURPARTNER_DATA.cv || ''}}</span>
        <audio ref="audio" :src="require(`../assets/audio/${this.DONE_CURPARTNER_DATA.id}.mp3`)"
               v-if="DONE_CURPARTNER_DATA.cv">
          <!-- Your browser does not support the audio tag. -->
        </audio>
        <i class="icon-audio" v-if="DONE_CURPARTNER_DATA.cv"></i>
      </div>

      <div class="switch-fun">
        <div class="switch-pre" @click.stop="switchPag(-1)" v-if="showPre">
        </div>
        <div class="switch-next" @click.stop="switchPag(1)" v-if="showNext">

        </div>
      </div>
    </v-touch>

    <!-- 人物介绍 -->
    <div class="character-introduce">

      <div class="title">
        <img src="../assets/img/partnerDetail/title-1.png" alt="">
      </div>
      <div class="introduce-box">
        <div class="name">
          <span class="u-fwb">{{DONE_CURPARTNER_DATA.name}}&nbsp;</span>{{DONE_CURPARTNER_DATA.cv?'CV：'+DONE_CURPARTNER_DATA.cv:''}}
        </div>
        <div class="type flex">
          <div class="flex-col-33">
            <span class="u-fwb">定位：</span>{{DONE_CURPARTNER_DATA.typeNmae}}
          </div>
          <div class="flex-col-33">
            <span class="u-fwb">品质：</span>{{DONE_CURPARTNER_DATA.color}}
          </div>
        </div>
        <div class="txt">
          <span class="u-fwb">伙伴介绍：</span>{{DONE_CURPARTNER_DATA.desc}}
        </div>
      </div>

    </div>

    <!-- 技能介绍 -->
    <div class="skill-introduce">
      <div class="title">
        <img src="../assets/img/partnerDetail/title-2.png" alt="">
      </div>
      <div class="introduce-box">
        <div class="skill-view flex">
          <div class="flex-item" v-for="item in DONE_CURPARTNER_DATA.skill" :key="item.skill_id"
               @click="curSkillId = item.skill_id">
            <img :src="require(`../assets/img/huoban/jn/${DONE_CURPARTNER_DATA.id}/${item.skill_id}.png`)" alt="">
          </div>
        </div>
        <div class="skill-txt">
          <dl v-for="item in DONE_CURPARTNER_DATA.skill" :key="item.skill_id" v-if="item.skill_id === curSkillId">
            <dt class="u-fwb">{{item.name}}</dt>
            <dd>{{item.desc}}</dd>
          </dl>
        </div>
      </div>
    </div>

    <!-- 更多 -->
    <div class="more-role">
      <div class="title">
        <img src="../assets/img/partnerDetail/title-3.png" alt="">
      </div>
      <div class="role-list">
        <swiper :options="option" class="swiper">
          <swiper-slide v-for="item in partnerData" :key="item.id">
            <router-link :to="{ name:'partnerDetail',params:{id:item.id}}" tag="div">
              <span class="clip-bg"></span>
              <p class="view"><img alt="" :data-src="require(`../assets/img/huoban/people-m/${item.id}.png`)"
                                   class="swiper-lazy"></p>
              <p class="name">{{item.name}}</p>
            </router-link>

          </swiper-slide>
        </swiper>
      </div>
      <router-link tag="div" :to="{name:'PartnerList'}" class="more-btn">
        <img src="../assets/img/more-new.png" alt="">
      </router-link>
    </div>

    <!-- 底部版权区 -->
    <publicFooter></publicFooter>
  </div>
</template>
<script>
  require("swiper/dist/css/swiper.css");
  import {partnerData} from "../assets/js/partner-list.js";
  import publicTop from "../components/publicTop.vue";
  import publicFooter from "../components/footer.vue";
  import {mapGetters} from "vuex";
  import topNav from "../components/topNav.vue";
  import {swiper, swiperSlide} from "vue-awesome-swiper";

  export default {
    components: {
      publicTop,
      publicFooter,
      topNav,
      swiper,
      swiperSlide
    },
    data() {
      return {
        navList: ["全部", "橙色", "紫色", "蓝色"],
        partnerData: partnerData.data,
        curSkillId: "",
        curIndex: 0,
        option: {
          autoplayDisableOnInteraction: false,
          speed: 800,
          slidesPerView: "auto",
          spaceBetween: 10,
          watchSlidesVisibility: true,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          lazyLoadingInPrevNextAmount: 4 // 设置在延迟加载图片时提前多少个slide
        }
      };
    },
    computed: {
      ...mapGetters([
        "DONE_CURPARTNER_DATA",
        "showPre",
        "showNext",
        "audioSrc"
      ])
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        const param = this.$route.params.id;
        const curData = this.partnerData.find((item, index) => {
          if (item.id === param) {
            this.curIndex = index;
            return true;
          }
        });

        this.$store.commit("TOGGLE_CURPARTNER_DATA", curData);
        this.curSkillId = this.DONE_CURPARTNER_DATA
          ? this.DONE_CURPARTNER_DATA.skill[0] &&
          this.DONE_CURPARTNER_DATA.skill[0].skill_id
          : "";

        this.$store.commit("updateShowNext", {
          index: this.curIndex,
          length: this.partnerData.length || 0
        });
      },
      updateIndex(index) {
        this.curIndex = index;
      },
      audioPaly() {
        if (this.DONE_CURPARTNER_DATA.cv) {
          this.$refs.audio.play();
        }
      },
      switchPag(number) {
        const index = this.curIndex + number;
        const length = this.partnerData.length;
        this.$store.commit("updateShowNext", {index, length});
        if (index < 0 || index >= length - 1) return;
        const id = this.partnerData[index].id;
        this.$router.push({name: "partnerDetail", params: {id}});
      }
    },
    watch: {
      $route: "init"
    }
  };
</script>
<style lang="less" scoped>
  .partnerDetailComponent {
    background-color: #f3f0e9;

    .view-warp {
      background: url("../assets/img/partnerDetail/view-bg.jpg") no-repeat left top;
      height: 7.75rem;
      background-size: 100% 100%;
      position: relative;
      .switch-fun {
        position: absolute;
        left: 0;
        bottom: 2.2rem;
        width: 100%;
        height: 0.44rem;
        .switch-pre,
        .switch-next {
          background: url("../assets/img/partnerDetail/switch-icon.png") no-repeat;
          background-size: 100% 100%;
          width: 0.87rem;
          height: 100%;
        }
        .switch-pre {
          float: left;
        }
        .switch-next {
          float: right;
          transform: rotate(180deg);
        }
      }
      .voice-fun {
        position: absolute;
        right: 1.8rem;
        top: 0.5rem;
        background: url("../assets/img/partnerDetail/name-bg.png") no-repeat left top;
        width: 0.5rem;
        // height: 2.97rem;
        line-height: 1.3;
        font-size: 0.28rem;
        padding: 0.2rem 0 0.2rem;
        text-align: center;
        color: #4c3829;
        background-size: 100% 100%;
        .icon-audio {
          display: inline-block;

          margin: auto;
          background: url("../assets/img/partnerDetail/btn-voice.png") no-repeat center;
          background-size: 100% 100%;
          width: 0.44rem;
          height: 0.44rem;
        }
      }
      .character {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: -0.2rem;
        text-align: center;
        img {
          width: 4.8rem;
          height: 7.37rem;
        }
      }
    }

    .character-introduce {
      padding: 0.8rem 0.1rem 0.8rem;
      background: url("../assets/img/partnerDetail/bg-01.jpg") no-repeat left top;
      background-size: 100%;
      .title {
        margin-bottom: 0.44rem;
      }
      .introduce-box {
        border: 0.1rem solid transparent;
        background-color: #fffaeb;
        border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10 10 round;
        -webkit-border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10 10 round;
        -o-border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10 10 round;
        background-size: 100% 100%;
        height: 3.91rem;
        padding: 0.34rem 0.4rem 0.1rem;
        font-size: 0.23rem;
        color: #514238;
        .name {
          padding-bottom: 0.27rem;
          border-bottom: dashed 1px #d3c4b1;
          margin-bottom: 0.2rem;
        }
        .type {
          padding-bottom: 0.27rem;
          border-bottom: dashed 1px #d3c4b1;
          margin-bottom: 0.2rem;
        }
        .txt {
          height: 1.15rem;
          overflow-y: auto;
        }
      }
    }

    .skill-introduce {
      padding: 0 0.1rem 0;
      .title {
        margin-bottom: 0.42rem;
      }
      .introduce-box {
        border: 0.1rem solid transparent;
        background-color: #fffaeb;
        border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10 10 round;
        -webkit-border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10 10 round;
        -o-border-image: url("../assets/img/partnerDetail/introduce-bg.png") 10 10 round;
        background-size: 100% 100%;
        height: 3.85rem;
        padding: 0.38rem 0.4rem 0.1rem;
        color: #514238;
        .skill-view {
          margin-bottom: 0.5rem;
          text-align: center;
          img {
            width: 1.15rem;
            height: 1.15rem;
          }
        }
        .skill-txt {
          dt {
            font-size: 0.31rem;
            margin-bottom: 0.17rem;
          }
          dd {
            font-size: 0.21rem;
          }
        }
      }
    }

    .more-role {
      background: url("../assets/img/partnerDetail/bg-02.jpg") no-repeat left top;
      background-size: 100% 100%;
      padding-bottom: 0.82rem;
      margin-top: 0.65rem;
      .role-list {
        margin: 0.6rem auto 0.82rem;
        .swiper-slide {
          width: 2.05rem !important;
          height: 2.48rem;
          text-align: center;
          .clip-bg {
            display: inline-block;
            position: absolute;
            width: 100% !important;
            height: 2.04rem;
            position: absolute;
            top: 0;
            left: 0;
            background: url(../assets/img/partner-box.png) no-repeat left top;
            background-size: 100% 100%;
            z-index: 20;
          }
          .view {
            position: relative;
            z-index: 19;
            height: 2.04rem;
            width: 100%;
            overflow: hidden;
          }
        }
      }
      .more-btn {
        margin: 0 auto;
        width: 4.48rem;
        height: 0.65rem;
      }
    }
  }
</style>

