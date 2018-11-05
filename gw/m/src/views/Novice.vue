<template>
  <div class="noviceComponent border-top border-current">
    <publicTop></publicTop>
    <topNav></topNav>
    <div class="banner-container">
      <!-- <div class="game-login">
        <img src="../assets/img/novice/banner-logo.png" alt="">
      </div> -->
      <div class="banner-content">
        <img src="../assets/img/novice/banner-txt.png" alt="">
      </div>
      <div class="theme-txt">
          锦绣未央新手专区
      </div>
      <div class="gift" @click="showGiftDialog()">
        <img src="../assets/img/novice/gift.png" alt="">
      </div> 
      <div class="download">

        <a :href="downInfo" v-if="downInfo"><img src="../assets/img/novice/download.jpg" alt=""></a>
        <a v-else @click="wait()"><img src="../assets/img/novice/download.jpg" alt=""></a>

      </div>
    </div>
    <div class="content-box">

      <section class="section-1">
        <div class="section-index first">
        </div>
        <div class="theme-title">
          <span class="txt">捏脸创角</span>
        </div>
        <p class="theme-discribe"> 玩家在首次创造角色时可对自己的角色进行捏脸定制，如果您对自己第一次捏出来的人物不满意，或者想调整自己的人物妆容，可随时进入“外观”点击“易容”重新定制您角色的五官及妆容。</p>
        <div class="theme-content">
          <div class="deviation">
            <div class="pinch">
              <img src="../assets/img/novice/picture.jpg" alt="">
            </div>
            <router-link class="link" :to="{path: '/jxwy/news',query:{id:82}}">查看详情</router-link>

          </div>

        </div>
      </section>

      <section class="section-2">

        <div class="section-index second">
        </div>
        <div class="theme-title">
          <span class="txt">入宫须知</span>
        </div>
        <div class="theme-content">
          <div class="theme-list  clearfix">
            <swiper :options="swiperRGXZOption" ref="swiperRGXZ">
              <swiper-slide>
                <router-link class="link" :to="{path: '/jxwy/news',query:{id:77}}"><img src="../assets/img/novice/picture-interface.jpg" alt=""></router-link>
              </swiper-slide>
              <swiper-slide>
                <router-link class="link" :to="{path: '/jxwy/news',query:{id:76}}"><img src="../assets/img/novice/picture-role.jpg" alt=""></router-link>
              </swiper-slide>
              <swiper-slide>
                <router-link class="link" :to="{path: '/jxwy/news',query:{id:92}}"><img src="../assets/img/novice/picture-plot.jpg" alt=""></router-link>
              </swiper-slide>
              <swiper-slide>
                <router-link class="link" :to="{path: '/jxwy/news',query:{id:94}}"><img src="../assets/img/novice/picture-dress.jpg" alt=""></router-link>
              </swiper-slide>
            </swiper>
            <div class="bullet-box">
              <ul class="bullet-list clearfix">
                <li :class="{'active': activeNotesIndex ===0}" @click="changeNotes(0)">
                  <dl>
                    <dt class="bullet-img interface"></dt>
                    <dd>主界面</dd>
                  </dl>
                </li>
                <li :class="{'active': activeNotesIndex ===1}" @click="changeNotes(1)">
                  <dl>
                    <dt class="bullet-img role"></dt>
                    <dd>游戏角色</dd>
                  </dl>
                </li>
                <li :class="{'active': activeNotesIndex ===2}" @click="changeNotes(2)">
                  <dl>
                    <dt class="bullet-img plot"></dt>
                    <dd>主线剧情</dd>
                  </dl>
                </li>
                <li :class="{'active': activeNotesIndex ===3}" @click="changeNotes(3)">
                  <dl>
                    <dt class="bullet-img dress"></dt>
                    <dd>自由换装</dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>
      <div class="public-bg">
        <section class="section-3">
          <div class="section-index third">
          </div>
          <div class="theme-title">
            <span class="txt">脱离新手</span>
          </div>
          <div class="theme-content">
            <ul class="theme-list clearfix">
              <swiper :options="swiperTLXSOption" ref="swiperTLXS">
                <swiper-slide>
                  <li class="list-item">
                    <div class="title">
                      掌握命运
                    </div>
                    <ul class="sub-list">
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:117}}" tag="span">伙伴收集</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:86}}" tag="span">品级晋升</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:101}}" tag="span">永结情缘</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:94}}" tag="span">百变换装</router-link>
                      </li>
                      <li class="sub-list-item more">
                        <router-link class="link" to="/jxwy/gameData">查看更多</router-link>
                      </li>
                    </ul>

                  </li>
                </swiper-slide>
                <swiper-slide>
                  <li class="list-item">
                    <div class="title">
                      开疆扩土
                    </div>
                    <ul class="sub-list">
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:108}}" tag="span">获得封地</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:107}}" tag="span">获得府邸</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:109}}" tag="span">加入家族</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:100}}" tag="span">获得成就</router-link>
                      </li>
                      <li class="sub-list-item more">
                        <router-link class="link" to="/jxwy/gameData">查看更多</router-link>
                      </li>
                    </ul>
                  </li>
                </swiper-slide>
                <swiper-slide>
                  <li class="list-item">
                    <div class="title">
                      崭露头角
                    </div>
                    <ul class="sub-list">
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:105}}" tag="span">参加比武</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:111}}" tag="span">挑战花冢</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:95}}" tag="span">开启列传</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:96}}" tag="span">勇闯密室</router-link>
                      </li>
                      <li class="sub-list-item more">
                        <router-link class="link" to="/jxwy/gameData">查看更多</router-link>
                      </li>
                    </ul>
                  </li>
                </swiper-slide>
                <swiper-slide>
                  <li class="list-item">
                    <div class="title">
                      玩法攻略
                    </div>
                    <ul class="sub-list">
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:83}}" tag="span">个性捏脸</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:97}}" tag="span">花魂套装</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:122}}" tag="span">伙伴选择</router-link>
                      </li>
                      <li class="sub-list-item">
                        <router-link class="link" :to="{path: '/jxwy/news',query:{id:110}}" tag="span">宫廷纷争</router-link>
                      </li>
                      <li class="sub-list-item more">
                        <router-link class="link" to="/jxwy/gameData">查看更多</router-link>
                      </li>
                    </ul>
                  </li>
                </swiper-slide>
              </swiper>
            </ul>
            <div class="bullet-box">
              <ul class="bullet-list clearfix">
                <li :class="{'active': activeNoviceIndex ===0}" @click="changeNovice(0)">
                </li>
                <li :class="{'active': activeNoviceIndex ===1}" @click="changeNovice(1)">
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="section-4">
          <div class="section-index fourth">
          </div>
          <div class="theme-title">
            <span class="txt">高手之路</span>
          </div>
          <div class="theme-content">
            <ul class="theme-list clearfix">
              <li class="list-item">
                <router-link :to="{path: '/jxwy/news',query:{id:114}}" tag="div" class="introduce role-01">
                  <dl>
                    <dt>锦绣台</dt>
                    <dd>宫廷时装视觉盛宴</dd>
                  </dl>
                </router-link>
              </li>
              <li class="list-item">
                <router-link :to="{path: '/jxwy/news',query:{id:89}}" tag="div" class="introduce role-02">
                  <dl>
                    <dt>阵容搭配</dt>
                    <dd>比武战斗攻防兼备</dd>
                  </dl>
                </router-link>
              </li>
              <li class="list-item">
                <router-link :to="{path: '/jxwy/news',query:{id:98}}" tag="div" class="introduce role-03">
                  <dl>
                    <dt>花魂养成</dt>
                    <dd>培育花魂实力提升</dd>
                  </dl>
                </router-link>
              </li>
              <li class="list-item  adjust  ml-adjust">
                <router-link :to="{path: '/jxwy/news',query:{id:119}}" tag="div" class="introduce role-04">
                  <dl>
                    <dt>伙伴养成</dt>
                    <dd>伙伴连携其利断金</dd>
                  </dl>
                </router-link>
              </li>
              <li class="list-item  adjust">
                <router-link to="/jxwy/gameData" tag="div" class="introduce role-05">
                  <dl>
                    <dt>官方资料库</dt>
                    <dd>变身锦绣宫廷百事通</dd>
                  </dl>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="download-btn">
            <a :href="downInfo" v-if="downInfo">下载游戏</a>
            <a v-else @click="wait()">下载游戏</a>
          </div>
        </section>
      </div>

    </div>
    <publicFooter></publicFooter>

    <!-- 悬浮礼物模态框 -->
        <div v-transfer-dom>
            <x-dialog v-model="showGift" class="dialog-gift-warp" hide-on-blur>
                <div class="dialog-gift-body">
                    <div class="close"><img src="../assets/img/close.png" alt="" @click="showGift = false"></div>
                    <div class="title">锦绣情缘礼包</div>
                    <div class="code-section">
                        <p class="label">礼包码</p>
                        <p class="code">{{giftCode}}</p>
                    </div>
                    <div class="rule-section">
                        <p>
                            <span class="bold">礼包内容：</span>
                            <span class="txt">豪华诗会函*1&nbsp;金饼*99&nbsp;银饼*99999</span>
                        </p>
                        <p>
                            <span class="bold">使用方法：</span>
                            <span class="txt">在游戏主界面左上方点击设置按钮-兑换码，输入或者粘贴礼包码，点击即可</span>
                        </p>
                        <p>
                            <span class="bold">使用须知：</span>
                            <span class="txt">各大应用商店用户皆可使用</span>
                        </p>
                    </div>
                </div>
            </x-dialog>
        </div>

  </div>

</template>

<script>
import publicTop from "../components/publicTop.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import publicFooter from "../components/footer.vue";
import topNav from "../components/topNav.vue";
import { mapGetters, mapState } from "vuex";
// import { XDialog, TransferDomDirective as TransferDom } from "vux";
import { TransferDomDirective as TransferDom, XDialog } from "vux";
import * as util from "../utils";
import api from "@/api";

export default {
    directives: {
        TransferDom
    },
    data() {
        let that = this;
        return {
            showGift: false,
            activeNotesIndex: 0,
            activeNoviceIndex: 0,
            giftCode: "6O1V5W17K",
            swiperRGXZOption: {
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                speed: 800,
                loop: false,
                slidesPerView: 1,
                spaceBetween: 10,
                onSlideChangeStart: function(swiper) {
                    that.activeNotesIndex = swiper.activeIndex;
                }
            },
            swiperTLXSOption: {
                autoplayDisableOnInteraction: false,
                speed: 800,
                loop: false,
                slidesPerView: 2,
                spaceBetween: 0,
                onSlideChangeStart: function(swiper) {
                    that.activeNoviceIndex = swiper.activeIndex;
                }
            }
        };
    },
    components: {
        publicTop,
        publicFooter,
        topNav,
        swiper,
        swiperSlide,
        XDialog,
    },

    computed: {
        ...mapState(["downInfo", "isVideo"]),
        swiperRGXZ() {
            return this.$refs.swiperRGXZ.swiper;
        },
        swiperTLXS() {
            return this.$refs.swiperTLXS.swiper;
        }
    },
    watch: {},
    created() {},
    mounted() {},

    methods: {
        changeNotes(index) {
            this.activeNotesIndex = index;
            this.swiperRGXZ.slideTo(index, 1000, false);
        },
        changeNovice(index) {
            this.activeNoviceIndex = index;
            this.swiperTLXS.slideTo(index, 1000, false);
        },
        wait: function() {
            alert("敬请期待");
        },
        showGiftDialog() {
            this.showGift = true;
        },
    }
};
</script>

<style lang="less" scoped>
.noviceComponent {
    .swiper-pagination-bullet-custom {
        width: 0.2rem;
        height: 0.2rem;
        text-align: center;
        line-height: 0.2rem;
        font-size: 0.12rem;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
    }
    .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
        color: #fff;
        background: #007aff;
    }

    // -------------------------------
    .banner-container {
        background: #662c3b url("../assets/img//novice/banner.png") no-repeat
            left top;
        width: 100%;
        height: 10.47rem;
        text-align: center;
        background-size: cover;
        padding-top: 0.3rem;
        position: relative;
        overflow: hidden;
        .game-login {
            text-align: center;
            width: 1.75rem;
            height: 1.5rem;
            position: relative;
            margin: 0 auto;
            z-index: 99;
        }
        .banner-content {
            margin-top: 4rem;
        }
        .gift {
            width: 1.89rem;
            height: 0.9rem;
            position: fixed;
            right: 0;
            top: 55%;
            bottom: 0;
            margin: auto;
            z-index: 999;
        }
        .theme-txt{
            text-align: center;
            background: url("../assets/img/novice/theme-txt-bg.png") no-repeat left top;
            background-size: 100% 100%;
            height: .49rem;
            width: 3.96rem;
            line-height: .49rem;
            margin: 0 auto .3rem;
            font-size: .16rem;
            color: #514238;
            // font-family: FZQKBYSJW;
        }
        .download {
            width: 2.91rem;
            height: 0.97rem;
            margin: 0.1rem auto 0;
            a {
                display: block;
            }
        }
    }

    // --------------------------------

    .content-box {
        section {
            width: 100%;
            padding: 0.3rem 0.2rem;
            .theme-title {
                font-size: 0.5rem;
                color: #bf440b;
                text-align: center;
                line-height: 1.5;
                .txt {
                    display: inline-block;
                    position: relative;
                    padding: 0 0.2rem;
                    font-weight: bold;
                    &::before {
                        background: url("../assets/img/novice/line-left.png")
                            no-repeat left top;
                        right: 100%;
                    }
                    &::after {
                        background: url("../assets/img/novice/line-right.png")
                            no-repeat left top;
                        left: 100%;
                    }
                    &::before,
                    &::after {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        margin-top: -0.1rem;
                        width: 2.54rem;
                        height: 0.2rem;
                        top: 50%;
                        background-size: cover;
                    }
                }
            }
            .theme-discribe {
                text-indent: 2em;
                font-size: 0.2rem;
                margin-top: 0.15rem;
                color: #000;
            }
        }
        .section-index {
            width: 0.61rem;
            height: 0.71rem;
            margin: 0 auto;
            background-size: contain !important;
        }
        .section-index.first {
            background: url("../assets/img/novice/index-first.png") no-repeat
                left top;
        }
        .section-index.second {
            background: url("../assets/img/novice/index-second.png") no-repeat
                left top;
        }
        .section-index.third {
            background: url("../assets/img/novice/index-three.png") no-repeat
                left top;
        }
        .section-index.fourth {
            background: url("../assets/img/novice/index-fourth.png") no-repeat
                left top;
        }
        .theme-content {
            margin-top: 0.2rem;
        }
        .public-bg {
            background: url("../assets/img/novice/third-bg.jpg") no-repeat left
                top;
            background-size: cover;
        }

        //  -----------------------------------------------
        .section-1 {
            background: url("../assets/img/novice/section-1.jpg") no-repeat left
                top;
            background-size: cover;
            .theme-content {
                background: url("../assets/img/novice/create-bg.png") no-repeat
                    left top;
                background-size: cover;
                width: 100%;
                height: 4.94rem;
                margin: 0 auto;
                position: relative;
                overflow: hidden;
                margin-top: 0.2rem;
                padding: 0.5rem 0.7rem 0;
                .deviation {
                    text-align: center;
                    .link {
                        text-align: center;
                        margin-top: 0.1rem;
                        display: inline-block;
                        background: url("../assets/img/novice/detail.png")
                            no-repeat left top;
                        background-size: cover;
                        width: 2.73rem;
                        height: 0.54rem;
                        line-height: 0.54rem;
                        color: #fff;
                        font-size: 0.15rem;
                        font-weight: bold;
                    }
                }
            }
        }
        .section-2 {
            background: url("../assets/img/novice/section-2.jpg") no-repeat left
                top;
            background-size: cover;
            .bullet-box {
                width: 80%;
                margin: 0.25rem auto 0;
                .bullet-list {
                    font-size: 0.24rem;
                    color: #000;
                    li {
                        width: 25%;
                        float: left;
                        text-align: center;
                        opacity: 0.5;
                        .bullet-img {
                            background: url(../assets/img/novice/icon-notes.png)
                                no-repeat;
                            height: 0.82rem;
                            width: 0.82rem;
                            background-position: 0rem 0;
                            background-size: cover;
                            margin: 0 auto 0.12rem;
                            &.interface {
                                background-position: 0rem 0;
                            }
                            &.role {
                                background-position: -1.55rem 0;
                            }
                            &.plot {
                                background-position: -3.08rem 0;
                            }
                            &.dress {
                                background-position: -4.63rem 0;
                            }
                        }
                        &.active {
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .section-3 {
            .theme-list {
                .swiper-slide-active {
                    .list-item {
                        &::after {
                            content: "";
                            position: absolute;
                            height: 100%;
                            width: 0.02rem;
                            right: 0;
                            top: 0;
                            background: url("../assets/img/novice/gap-line.png")
                                no-repeat left top;
                            background-size: 100% 100%;
                        }
                    }
                }
                .list-item {
                    padding: 0 0.19rem;
                    position: relative;
                    .sub-list-item {
                        font-size: 0.24rem;
                        font-weight: bold;
                        color: #666;
                        margin-top: 0.4rem;
                        text-align: center;
                        cursor: pointer;
                        span {
                            position: relative;
                            display: inline-block;
                            &::before {
                                content: "";
                                display: inline-block;
                                position: absolute;
                                left: -0.3rem;
                                top: 50%;
                                margin-top: -0.1rem;
                                width: 0.21rem;
                                height: 0.2rem;
                                background: url("../assets/img/novice/icon-diamond.png")
                                    no-repeat left top;
                                background-size: cover;
                            }
                        }
                        &.more a {
                            font-size: 0.2rem;
                            color: #c3a970;
                            position: relative;
                            display: inline-block;
                            border-bottom: 1px solid #c3a970;
                            line-height: 1.1;
                            &::after {
                                content: "";
                                display: inline-block;
                                position: absolute;
                                right: -0.2rem;
                                top: 50%;
                                margin-top: -0.07rem;
                                width: 0.14rem;
                                height: 0.14rem;
                                background: url("../assets/img/novice/right-arrow.png")
                                    no-repeat left top;
                                background-size: cover;
                            }
                        }
                    }
                    .title {
                        background: url("../assets/img/novice/title-bg.jpg")
                            no-repeat left top;
                        font-size: 0.3rem;
                        line-height: 0.92rem;
                        height: 0.92rem;
                        text-align: center;
                        color: #bba570;
                        font-weight: bold;
                        background-size: cover;
                    }
                }
            }
            .bullet-box {
                margin-top: 0.3rem;
                .bullet-list {
                    text-align: center;
                    li {
                        background: url("../assets/img/novice/icon-diamond.png")
                            no-repeat left top;
                        width: 0.21rem;
                        height: 0.2rem;
                        background-size: cover;
                        display: inline-block;
                        opacity: 0.5;
                        &.active {
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .section-4 {
            .theme-list {
                margin: 0 -0.2rem;
                .list-item {
                    width: 33.33%;
                    float: left;
                    padding: 0.05rem;
                    &.adjust {
                        margin-top: -0.7rem;
                    }
                    &.ml-adjust {
                        margin-left: 16.66%;
                    }
                    .introduce {
                        // background: url("../img/novice/killer-bg.jpg") no-repeat left top;
                        width: 100%;
                        height: 2.81rem;
                        padding: 0 0.1rem;
                        position: relative;
                        cursor: pointer;
                        background-size: cover !important;
                        &::before {
                            content: "";
                            display: inline-block;
                            vertical-align: middle;
                            height: 100%;
                            width: 0;
                        }
                        &.role-01 {
                            background: url("../assets/img/novice/killer-01.png")
                                no-repeat left top;
                        }
                        &.role-02 {
                            background: url("../assets/img/novice/killer-02.png")
                                no-repeat left top;
                        }
                        &.role-03 {
                            background: url("../assets/img/novice/killer-03.png")
                                no-repeat left top;
                        }
                        &.role-04 {
                            background: url("../assets/img/novice/killer-04.png")
                                no-repeat left top;
                        }
                        &.role-05 {
                            background: url("../assets/img/novice/killer-05.png")
                                no-repeat left top;
                        }
                        dl {
                            display: inline-block;
                            vertical-align: middle;

                            dt {
                                font-size: 0.3rem;
                                font-weight: bold;
                                margin-bottom: 0.05rem;
                                color: #fff;
                                line-height: 1;
                            }
                            dd {
                                font-size: 0.15rem;
                                color: #5f4307;
                            }
                        }
                    }
                }
            }
            .download-btn {
                background: rgba(131, 10, 8, 0.9);
                color: #fff;
                height: 0.78rem;
                width: 2.54rem;
                margin: 0 auto;
                line-height: 0.78rem;
                text-align: center;
                letter-spacing: 0.03rem;
                margin-top: 0.27rem;
                border-radius: 0.08rem;
            }
        }
    }
}
</style>

