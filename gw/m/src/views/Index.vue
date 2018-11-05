<template>
    <div class="indexComponent">

        <!-- 顶部下载 -->
        <publicTop></publicTop>

        <!-- 导航栏 -->
        <topNav></topNav>

        <!-- 首页banner -->
        <div class="top-role">
            <div class="play-wrapper" id="playVideo" @click="playVideo()">
                <button type="button" class="circle"></button>
            </div>
        </div>

        <!-- 下载按钮以及新闻轮播 -->
        <div class="index-bg-2">
            <div class="yyWarp">
                <div class="yy-btn">
                    <a :href="curHost" class="yy-btn-andorid">
                    </a>
                    <!-- <a href="/share/index" class="yy-btn-ios">
          </a> -->
                </div>
            </div>
            <div class="news-banner d_jump" id="xwzx">
                <swiper :options="swiperNewsOption" class=" swiper newsBanner u-h100 u-w100">
                    <swiper-slide v-for="(item, key) in DONE_SCROLL_LIST" :key="key">
                        <router-link v-if="item.jump_type ==='1' " class="u-db u-h100 u-w100" :to="{name: 'NewsDetails', query: {id: item.new_id} }">
                            <img class="u-db u-h100 u-w100" :src="item.img_url">
                        </router-link>
                        <a v-if="item.jump_type !=='1' " :href="item.jump_to" target="_blank" class="u-db u-h100 u-w100">
                            <img class="u-db u-h100 u-w100" :src="item.img_url">
                        </a>
                    </swiper-slide>
                </swiper>
                <div class="swiper-pagination news-pagination"></div>
            </div>
        </div>

        <!-- 综合新闻 -->
        <div class="news-content">
            <div class="news-tab">
                <span class="tabs" v-for="(item,index) in DONE_NEWS_LIST.cates" :class="{'active': currentNewsList == index}" @click="updateIndexTab(index)">{{item}}</span>
                <!-- <router-link tag="span" class="btn-more" :to="{name: 'NewsList'}"></router-link> -->
            </div>
            <div class="news-list">
                <!-- <div class="border-top1"></div> -->
                <!-- <div class="border-top2"></div> -->
                <router-link v-if="context_type === '1'" tag="div" class="top-news" :to="{name: 'NewsDetails', query: {id : topNewsId}}">
                    <!-- <span class="title top-news-bg">推荐</span>
<span class="u-ell u-dib top-news-title u-c000">主要内容 · </span> -->
                    <span class=" u-fwb u-c000 u-ell u-dib top-news-content">{{topTitle}}</span>
                </router-link>
                <a v-if="context_type !== '1'" :href="jumpUrl">
                    <div class="top-news">
                        <!-- <span class="title top-news-bg">推荐</span>
<span class="u-ell u-dib top-news-title u-c000">主要内容 · </span> -->
                        <span class=" u-fwb  u-ell u-dib top-news-content">{{topTitle}}</span>
                    </div>

                </a>
                <div class="news-view">
                    <div class="list" v-for="(news, index) in DONE_NEWS_LIST.news" v-show="currentNewsList == index">
                        <div v-for="(item, key) in news">
                            <router-link class="flex" v-if="(key < 4 ) && item.context_type ==='1'" tag="li" :to="{name: 'NewsDetails', query: {id : item.id}}" :key="key">
                                <span class="u-ell flex-col-70">
                                    <i class="icon-tab"></i>{{ item.title }}</span>
                                <span class="flex-item u-tr">{{ item.created_at.substring(0,10) }}</span>
                            </router-link>
                            <li class="flex" v-if="(key < 4 ) && item.context_type !=='1'">
                                <a :href="item.context" target="_blank" class="u-w100">
                                    <span class="u-ell flex-col-70">
                                        <i class="icon-tab"></i>{{ item.title }}</span>
                                    <span class="flex-item u-tr">{{ item.created_at.substring(0,10) }}</span>
                                </a>
                            </li>
                        </div>
                    </div>

                </div>
            </div>
            <div class="more-new">
                <router-link tag="span" class="btn" :to="{name: 'NewsList'}"></router-link>
            </div>

            <div class="sub-nav flex flex-center">
                <router-link to="/jxwy/novice" tag="dl" class="flex-item">
                    <dt><img src="../assets/img/nav-xszq.png" alt="新手专区"></dt>
                    <dd>新手专区</dd>
                </router-link>
                <router-link to="/jxwy/gameData" tag="dl" class="flex-item">
                    <dt><img src="../assets/img/nav-gfzl.png" alt="官方资料库"></dt>
                    <dd>官方资料库</dd>
                </router-link>
                <router-link :to="{path:'/jxwy/news/list',query: {type: 'gl'}}" tag="dl" class="flex-item">
                    <dt><img src="../assets/img/nav-yxgl.png" alt="攻略中心"></dt>
                    <dd>攻略中心</dd>
                </router-link>

            </div>

        </div>

        <!-- 游戏特色 -->
        <div class="yxts-warp d_jump" id="yxts">
            <div class="title-yxts"></div>
            <div class="yxts-banner">
                <swiper :options="swiperYXTSOption" class="swiper" v-if="isShowYXTS">
                    <swiper-slide v-for="(item, key) in DONE_GAME_FEATURES" :key="key">
                        <img :src="item.img_url" alt="">
                    </swiper-slide>
                </swiper>
                <div class="swiper-pagination yxts-pagination"></div>
            </div>
        </div>

        <!-- 伙伴图鉴 -->
        <div class="hbtj-warp">
            <div class="title-hbtj"></div>
            <div class="hbtj-banner">
                <swiper :options="swiperHBTJOption" class="swiper">
                    <swiper-slide v-for="item in partnerData" :key="item.id">

                        <router-link :to="{ name:'partnerDetail',params:{id:item.id}}" tag="div">
                            <span class="clip-bg"></span>
                            <p class="view"><img alt="" :data-src="require(`../assets/img/huoban/people-m/${item.id}.png`)" class="swiper-lazy"></p>
                            <p class="name">{{item.name}}</p>
                        </router-link>

                        <!-- <div class="swiper-lazy-preloader"></div> -->
                    </swiper-slide>
                </swiper>
                <!-- <div class="swiper-pagination hbtj-pagination"></div> -->
            </div>
            <div class="more-detail">
                <router-link tag='span' :to="{name:'PartnerList'}" class="btn">
                </router-link>

            </div>
        </div>

        <!-- 时装图鉴 -->
        <div class="xhjzr-warp d_jump" id="xhjzr">
            <div class="title-xhjzr "></div>
            <div class="xhjzr-banner ">
                <swiper :options="swiperXHJZROption" class="swiper" ref="swiperXHJZR">
                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg lf"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-lf.png`)" class="swiper-lazy"></div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg qt"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-qt.png`)" class="swiper-lazy"></div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg ylfy"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-ylfy.png`)" class="swiper-lazy"></div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg zz"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-zz.png`)" class="swiper-lazy"></div>
                    </swiper-slide>

                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg gx"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-gx.png`)" class="swiper-lazy"></div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg ll"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-ll.png`)" class="swiper-lazy"></div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="banner-img">
                            <div class="dress-bg mzy"></div>
                            <img alt="" :data-src="require(`../assets/img/dress/dress-role-mzy.png`)" class="swiper-lazy"></div>
                    </swiper-slide>

                </swiper>
            </div>
        </div>

        <!-- 视听阁 -->
        <div class="jxstg-warp d_jump" id="jxstg">
            <div class="title-jxstg"></div>
            <div class="tab-warp">
                <span class="tab tab-video" :class="{'active': activeAudioVisualIndex === 0}" @click="changeTab(0)"></span>
                <span class="tab tab-image" :class="{'active': activeAudioVisualIndex === 1}" @click="changeTab(1)"></span>
            </div>
            <div class="jxstg-content">
                <div class="video-warp flex-wrap" v-show="activeAudioVisualIndex == 0">
                    <div class="flex-col-50 pd10" v-for="(item,index) in DONE_INDEX_VIDEO_LIST" v-if="index < 4" :key="index">
                        <div class="video-item" @click.stop="openVideos(item.video_url)">
                            <img class="u-w100 u-h100" :src="item.thumbnail" alt="">
                        </div>
                    </div>

                </div>
                <div class="image-warp flex-wrap" v-show="activeAudioVisualIndex == 1">
                    <div class="flex-col-50 pd10" v-for="(item,index) in DONE_INDEX_IMAGE_LIST" v-if="index < 4" :key="index">
                        <div class="image-item " @click.stop="showImageDialog(item.img_url)">
                            <img class="u-w100 u-h100" :src="item.img_url" alt="">
                        </div>
                    </div>

                    <!--<div class="image-item"><img class="u-w100 u-h100" src="../assets/img/img2.jpg" alt=""></div>-->
                </div>
            </div>
            <router-link tag="div" class="btn-more-video" :to="{name: 'VideoList',query: {type: 0}}" v-show="activeAudioVisualIndex == 0">
                <img class="u-w100 u-h100" src="../assets/img/more-new.png" alt="">
            </router-link>
            <router-link tag="div" class="btn-more-image" :to="{name: 'VideoList',query: {type: 1}}" v-show="activeAudioVisualIndex == 1">
                <img class="u-w100 u-h100" src="../assets/img/more-new.png" alt="">
            </router-link>
        </div>

        <!-- 悬浮礼物 -->
        <div class="fixed-gift" @click.stop="showGiftDialog()">
             <img src="../assets/img/gift.png" alt="悬浮礼物">
         </div>

        <!-- 底部版权区 -->
        <publicFooter></publicFooter>

        <!-- 图片模态框 -->
        <div v-transfer-dom>
            <x-dialog v-model="showImage" class="dialog-image-warp" hide-on-blur>
                <div class="dialog-image-body">
                    <div class="dialog-content">
                        <div class="dialog-image"></div>
                        <div class="dialog-image-content">
                            <div class="u-w100 u-h100"><img class="u-w100 u-h100" :src="imageUrl" alt=""></div>
                        </div>
                    </div>
                </div>
            </x-dialog>
        </div>

        <!-- 视频模态框 -->
        <div v-transfer-dom>
            <x-dialog v-model="showVideo" class="dialog-image-warp">
                <div class="dialog-image-body">
                    <div class="dialog-content">
                        <div class="close-warp">
                            <div class="btn-close" @click="closeVideoDialog()"></div>
                        </div>
                        <div class="dialog-image">
                            <div id="videoContainer" class="video"></div>
                        </div>
                    </div>
                </div>
            </x-dialog>
        </div>

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
require("swiper/dist/css/swiper.css");
import { swiper, swiperSlide } from "vue-awesome-swiper";
import publicTop from "../components/publicTop.vue";
import publicFooter from "../components/footer.vue";
import topNav from "../components/topNav.vue";
import { mapGetters, mapState } from "vuex";
import { TransferDomDirective as TransferDom, XDialog } from "vux";
import * as util from "../utils";
import { partnerData } from "../assets/js/partner-list.js";

export default {
    directives: {
        TransferDom
    },
    components: {
        XDialog,
        swiper,
        swiperSlide,
        publicTop,
        publicFooter,
        topNav
    },
    data() {
        let that = this;
        return {
            // href: "",
            imageUrl: "",
            showImage: false,
            showVideo: false,
            player: "",
            videoUrl: "",
            topNewsId: "",
            topTitle: "",
            context_type: "",
            jumpUrl: "",
            currentNewsList: 0,
            activeRoleIndex: 0,
            activeAudioVisualIndex: 0,
            showGift: false,
            giftCode: "6O1V5W17K",
            partnerData: partnerData.data,

            swiperNewsOption: {
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                speed: 800,
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: ".news-pagination"
            },
            swiperHBTJOption: {
                // autoplay: 3000,
                autoplayDisableOnInteraction: false,
                speed: 800,
                slidesPerView: "auto",
                spaceBetween: 10,
                watchSlidesVisibility: true,
                // pagination: ".hbtj-pagination",
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                lazyLoadingInPrevNextAmount: 4 // 设置在延迟加载图片时提前多少个slide
            },
            swiperYXTSOption: {
                pagination: ".yxts-pagination",
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                initialSlide: 0,
                coverflow: {
                    rotate: 0, // 旋转的角度
                    stretch: 80, // 拉伸   图片间左右的间距和密集度
                    depth: 100, // 深度   切换图片间上下的间距和密集度
                    modifier: 3, // 修正值 该值越大前面的效果越明显
                    slideShadows: true // 页面阴影效果
                }
            },
            swiperXHJZROption: {
                // autoplay: 3000,
                autoplayDisableOnInteraction: false,
                speed: 800,
                slidesPerView: 1,
                spaceBetween: 20,
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                lazyLoadingInPrevNextAmount: 1 // 设置在延迟加载图片时提前多少个slide
                // onSlideChangeStart: function(swiper) {
                //     that.activeRoleIndex = swiper.activeIndex;
                // }
            }
        };
    },
    // beforeRouteEnter(to, from, next) {
    //     let href = document.querySelector("#href").value;
    //     next(vm => {
    //         vm.href = href;
    //     });
    // },
    computed: {
        ...mapGetters([
            "DONE_INDEX_VIDEO_LIST",
            "DONE_INDEX_IMAGE_LIST",
            "DONE_SCROLL_LIST",
            "DONE_NEWS_LIST",
            "DONE_VIDEO",
            "DONE_GAME_FEATURES",
            "DONE_PARTNER_LIST",
            "imgIndex",
            "isShowYXTS",
            "isShowHBTJ",
            "curHost"
        ]),
        ...mapState(["isIndex", "indexTop"]),
        swiperXHJZR() {
            return this.$refs.swiperXHJZR.swiper;
        }
    },
    swiperBottom() {
        return this.$refs.mySwiperBottom.swiper;
    },
    mounted() {
        this.$store.commit("updateIsIndex", true);
        if (this.indexTop) {
            this.jump(this.indexTop);
        }
    },
    destroyed() {
        this.$store.commit("updateIsIndex", false);
        this.$store.commit("updateIndexTop", 0);
    },
    async created() {
        let self = this;

        if (util.isEmpty(this.DONE_SCROLL_LIST)) {
            //新闻轮播
            this.$store.dispatch("FETCH_SCROLL_LIST").then(() => {});
        }
        if (util.isEmpty(this.DONE_NEWS_LIST)) {
            //新闻列表
            this.$store.dispatch("FETCH_NEWS_LIST").then(function() {
                self.topTitle = self.DONE_NEWS_LIST.top.title;
                self.topNewsId = self.DONE_NEWS_LIST.top.id;
                self.context_type = self.DONE_NEWS_LIST.top.context_type;
                self.jumpUrl = self.DONE_NEWS_LIST.top.context;
            });
        } else {
            self.topTitle = self.DONE_NEWS_LIST.top.title;
            self.topNewsId = self.DONE_NEWS_LIST.top.id;
            self.context_type = self.DONE_NEWS_LIST.top.context_type;
            self.jumpUrl = self.DONE_NEWS_LIST.top.context;
        }

        //视频列表
        if (util.isEmpty(this.DONE_INDEX_VIDEO_LIST)) {
            this.$store.dispatch("FETCH_INDEX_VIDEO_LIST");
        }
        //原画列表
        if (util.isEmpty(this.DONE_INDEX_IMAGE_LIST)) {
            this.$store.dispatch("FETCH_INDEX_IMAGE_LIST");
        }
        if (util.isEmpty(this.DONE_VIDEO)) {
            this.$store.dispatch("FETCH_VIDEO").then(res => {
                if (res.data.video_url) {
                    this.videoUrl = res.data.video_url;
                } else {
                    this.videoUrl = "";
                }
            });
        }

        //游戏特色图片获取
        if (util.isEmpty(this.DONE_GAME_FEATURES)) {
            await this.$store.dispatch("FETCH_GAME_FEATURES");
            const index = Math.floor(this.DONE_GAME_FEATURES.length / 2);
            this.$store.commit("updateImgIndex", index);
            this.$store.commit("updateSwiper", {
                name: "isShowYXTS",
                value: true
            });
        }
        this.swiperYXTSOption.initialSlide = this.imgIndex;

        // //获取伙伴图鉴
        // if (util.isEmpty(this.DONE_PARTNER_LIST)) {
        //     await this.$store.dispatch("FETCH_PARTNER_LIST");
        //
        // }
        // this.$store.commit("updateSwiper", {
        //         name: "isShowHBTJ",
        //         value: true
        //     });
    },
    methods: {
        updateIndexTab(index) {
            this.currentNewsList = index;
            this.$store.commit("updateIndexTab", index);
        },
        changeTab(index) {
            this.activeAudioVisualIndex = index;
        },
        playVideo() {
            this.showVideo = true
            this.player = new TcPlayer("videoContainer", {
                hls: "0.8.1",
                m3u8:"//1255423641.vod2.myqcloud.com/7bfdbe68vodtransgzp1255423641/1ccde54e5285890782458130770/v.f230.m3u8", //请替换成实际可用的播放地址
                autoplay: true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                //"coverpic" : ,
                width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
                height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
                controls: "system",
                listener(msg) {
                    //            if(msg.type === 'fullscreen'){
                    //              document.querySelector('.top').style.top =  msg.detail.isFullscreen ? '-.95rem' : '0'
                    //              document.querySelector('.main').style.paddingTop =  msg.detail.isFullscreen ? '0' : '0.95rem'
                    //            }
                }
            });
        },
        jump(name) {
            if (name === "top") {
                window.scrollTo(0, 0);
                return;
            }
            // let jump = document.getElementById(name),
            //     distance = jump.offsetTop;
            //     window.scrollTo(0,distance);
            // 用 class="d_jump" 添加锚点
            let jump = document.getElementById(name);
            let total = jump.offsetTop;
            let distance =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 40;
            if (total > distance) {
                total = total - 10;
                smoothDown();
            } else {
                let newTotal = distance - total;
                step = newTotal / 50;
                smoothUp();
            }
            function smoothDown() {
                if (distance < total) {
                    distance += step;
                    //                        document.body.scrollTop = distance
                    window.scrollTo(0, distance);
                    setTimeout(smoothDown, 10);
                } else {
                    //                        document.body.scrollTop = total
                    window.scrollTo(0, total);
                }
            }
            function smoothUp() {
                if (distance > total) {
                    distance -= step;
                    window.scrollTo(0, distance);
                    setTimeout(smoothUp, 10);
                } else {
                    window.scrollTo(0, distance);
                }
            }
        },
        showGiftDialog() {
            this.showGift = true;
        },
        changeRole(index) {
            this.activeRoleIndex = index;
            this.swiperXHJZR.slideTo(index, 0, false);
        },
        showImageDialog(imageUrl) {
            this.imageUrl = imageUrl;
            this.showImage = true;
        },
        openVideoDialog() {
            if (this.videoUrl !== "") {
                this.$router.push({
                    name: "video",
                    query: {
                        url: this.videoUrl
                    }
                });
            } else {
                alert("暂无视频，敬请期待！");
            }
        },
        openVideos(url) {
            if (url !== "") {
                this.$router.push({
                    name: "video",
                    query: {
                        url: url
                    }
                });
            } else {
                alert("暂无视频，敬请期待！");
            }
        },
        closeVideoDialog() {
            this.player.destroy();
            this.showVideo = false;
        }
    }
};
</script>

<style lang="less" scoped>
.indexComponent {
    background: #f2f2f2;

    // 首页banner
    .top-role {
        background: url("../assets/img/banner-index.jpg") no-repeat;
        width: 100%;
        height: 8.04rem;
        background-size: 100% 100%;
        margin: 0 auto;
        position: relative;
        .play-wrapper {
            position: absolute;
            top: 5.4rem;
            left: 5.6rem;
        }
        .play-wrapper {
            .circle {
                width: 0.8rem;
                height: 0.72rem;
                background-image: url(../assets/img/play-circle.png);
                background-size: contain;
                background-repeat: no-repeat;
                animation: video 2s infinite linear;
                border: none;
                background-color: transparent;
            }
            &:after {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 0.13rem;
                height: 0.2rem;
                background: url(../assets/img/play-btn.png) no-repeat;
                background-size: contain;
                content: "";
            }
        }
    }

    //  下载按钮以及新闻轮播
    .index-bg-2 {
        background: url("../assets/img/index-bg-2.jpg") no-repeat;
        width: 100%;
        padding: 0 0.2rem 0.5rem;
        background-size: 100% 100%;
        .yyWarp {
            text-align: center;
            margin: 0 auto;
            width: 6.01rem;
            .yy-btn {
                font-size: 0;
                // margin-top: 25rem;
                margin-bottom: 0.41rem;
                .yy-btn-andorid,
                .yy-btn-ios {
                    width: 2.87rem;
                    height: 0.68rem;
                    display: inline-block;
                }
                .yy-btn-andorid {
                    background: url("../assets/img/download-two.png") no-repeat;
                    margin-right: 0.27rem;
                    background-size: 100% 100%;
                }
                .yy-btn-ios {
                    background: url("../assets/img/btn-ios.png") no-repeat;
                    background-size: 100% 100%;
                }
            }

            .time {
                text-align: center;
                font-size: 0.24rem;
                color: #6d2a3c;
            }
        }
        .news-banner {
            width: 100%;
            height: 3.69rem;
            margin: 0.15rem auto 0;
            position: relative;
            // background-color: #626262;
            position: relative;
        }
    }

    // 综合新闻
    .news-content {
        // width: 701rem;
        margin: 0 auto;
        .news-tab {
            position: relative;
            height: 0.65rem;
            // margin-bottom: 21rem;
            background-color: #fff;
            font-size: 0;
            box-shadow: 0.02rem 0.02rem 0.02rem #acbcc6;
            .tabs {
                width: 1.5rem;
                height: 0.65rem;
                display: inline-block;
                text-align: center;
                line-height: 0.65rem;
                font-size: 0.26rem;
                color: #1e3b4d;
                /*margin: 0 0.1rem;*/
                &.active {
                    background-color: #a48d66;
                    color: #ffffff;
                }
            }
            .btn-more {
                background: url("../assets/img/btn-more.png") no-repeat;
                width: 0.35rem;
                height: 0.36rem;
                background-size: 100% 100%;
                display: inline-block;
                position: absolute;
                right: 0.1rem;
                top: 0.1rem;
            }
        }
        .more-new {
            text-align: center;
            margin-top: 0.2rem;
            .btn {
                background: url("../assets/img/more-new.png") no-repeat;
                width: 4.49rem;
                height: 0.66rem;
                display: inline-block;
                background-size: 100% 100%;
            }
        }
        .news-list {
            padding: 0 0.2rem;
            .border-top1 {
                background: #000000;
                height: 0.02rem;
                width: 100%;
                margin-top: 0.02rem;
            }
            .border-top2 {
                background: #000000;
                height: 1rem;
                width: 100%;
                margin-top: 1rem;
            }
            .top-news {
                height: 0.76rem;
                width: 100%;
                position: relative;
                font-size: 0.29rem;
                text-align: center;
                color: #1e3b4d;
                &:after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    display: inline-block;
                    height: 1px;
                    width: 100%;
                    background: url("../assets/img/new-split.png") no-repeat;
                }
                .title {
                    font-size: 0.29rem;
                    color: #3a2d03;
                    font-weight: bold;
                    text-align: center;
                    line-height: 0.76rem;
                    line-height: 0.76rem;
                }
                .top-news-bg {
                    background: url("../assets/img/top-news-bg.png") no-repeat;
                    width: 0.97rem;
                    height: 100%;
                    background-size: 100% 100%;
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .top-news-title {
                    margin-left: 1.25rem;
                    height: 100%;
                    line-height: 0.76rem;
                }
                .top-news-content {
                    // width: 54%;
                    height: 100%;
                    width: 100%;
                    line-height: 0.76rem;
                }
            }
            .news-view {
                height: 2.68rem;
                // border-top: 1px dashed #999999;
                margin-top: 0.2rem;
                padding: 0 0.33rem;
                .list {
                    li {
                        height: 0.62rem;
                        line-height: 0.62rem;
                        font-size: 0.23rem;
                        // border-bottom: 1Px dashed #999999;
                        color: #1e3b4d;
                        .icon-tab {
                            background: url("../assets/img/news-tab.png")
                                no-repeat;
                            width: 0.2rem;
                            height: 0.19rem;
                            background-size: 100% 100%;
                            display: inline-block;
                            margin-right: 0.1rem;
                        }
                    }
                }
            }
        }
        .sub-nav {
            height: 1.92rem;
            width: 100%;
            margin-top: 0.35rem;
            background: url("../assets/img/sub-nav-bg.jpg") no-repeat left top;
            background-size: 100% 100%;
            color: #fff;
            text-align: center;
            font-size: 0.26rem;
            img {
                height: 1.05rem;
                width: 1.05rem;
            }
            dd {
                margin-top: 0.1rem;
            }
        }
    }

    // 游戏特色
    .yxts-warp {
        margin-top: 0.38rem;
        .title-yxts {
            background: url("../assets/img/titile-feature.png") no-repeat;
            width: 100%;
            height: 1.2rem;
            background-size: 100% 100%;
            margin-bottom: 0.56rem;
        }
        .yxts-banner {
            position: relative;
            width: 100%;
            // height: 4.01rem;
            margin: 0 auto;
            img {
                height: 100%;
                width: 100%;
            }
            .swiper-slide {
                width: 6.05rem;
                height: 3.62rem;
            }
        }
    }

    // 伙伴图鉴
    .hbtj-warp {
        margin-top: 0.8rem;
        .title-hbtj {
            background: url("../assets/img/titile-partner.png") no-repeat left
                top;
            height: 1.2rem;
            width: 100%;
            background-size: 100% 100%;
        }
        .hbtj-banner {
            margin: 0.6rem auto 0.82rem;
            .swiper-slide {
                width: 2.07rem;
                height: 2.48rem;
                text-align: center;

                // position: relative;

                .clip-bg {
                    display: inline-block;
                    width: 100% !important;
                    height: 2.04rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: url(../assets/img/partner-box.png) no-repeat
                        left top;
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
                img {
                    position: relative;
                    z-index: 19;
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .more-detail {
            text-align: center;
            .btn {
                background: url("../assets/img/more-new.png") no-repeat;
                width: 4.49rem;
                height: 0.66rem;
                display: inline-block;
                background-size: 100% 100%;
            }
        }
    }

    // 时装图鉴
    .xhjzr-warp {
        position: relative;
        padding-top: 0.86rem;
        background: url("../assets/img/index-bg-3.jpg") no-repeat left top;
        background-size: 100% 100%;
        .title-xhjzr {
            background: url("../assets/img/title-dress.png") no-repeat left top;
            height: 1.2rem;
            width: 100%;
            background-size: 100% 100%;
        }
        .xhjzr-banner {
            margin-top: 0.3rem;
            .banner-img {
                position: relative;
                text-align: center;
                .dress-bg {
                    background: url("../assets/img/dress/dress-bg.png")
                        no-repeat left top;
                    width: 7.33rem;
                    height: 4.91rem;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 0.8rem;
                    z-index: 4;
                    left: 0;
                    right: 0;
                    margin: auto;
                    &::before {
                        content: "";
                        position: absolute;
                        width: 1.32rem;
                        height: 2.44rem;
                        top: 1rem;
                        left: 0.7rem;
                    }
                    &.gx::before {
                        background: url("../assets/img/dress/dress-txt-gx.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                    &.ll::before {
                        background: url("../assets/img/dress/dress-txt-ll.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                    &.mzy::before {
                        background: url("../assets/img/dress/dress-txt-mzy.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                    &.qt::before {
                        background: url("../assets/img/dress/dress-txt-qt.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                    &.ylfy::before {
                        background: url("../assets/img/dress/dress-txt-ylfy.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                    &.zz::before {
                        background: url("../assets/img/dress/dress-txt-zz.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                    &.lf::before {
                        background: url("../assets/img/dress/dress-txt-lf.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                }
                img {
                    position: relative;
                    z-index: 5;
                    width: 5.7rem;
                    height: 6.31rem;
                    margin-left: 0.5rem;
                }
            }
        }
        .line-bottom {
            background: url("../assets/img/line-bottom.png") no-repeat;
            width: 6.87rem;
            height: 0.23rem;
            background-size: 100% 100%;
            margin: 0 auto;
            margin-top: 0.6rem;
        }
    }

    // 视听阁
    .jxstg-warp {
        padding: 0.6rem 0 0.5rem;
        background: url("../assets/img/index-bg-4.jpg") no-repeat left top;
        background-size: 100% 100%;
        .title-jxstg {
            background: url("../assets/img/title-visual.png") no-repeat left top;
            height: 1.2rem;
            width: 100%;
            background-size: 100% 100%;
            margin-bottom: 0.3rem;
        }

        .tab-warp {
            width: 100%;
            text-align: center;
            font-size: 0;
            .tab {
                width: 3.16rem;
                display: inline-block;
                height: 0.65rem;
                margin: 0 0.02rem;
            }
            .tab-image {
                background: url("../assets/img/tab-image.png") no-repeat left
                    top;
                background-size: 100% 100%;
            }
            .tab-video {
                background: url("../assets/img/tab-video.png") no-repeat left
                    top;
                background-size: 100% 100%;
            }
            .tab-image.active {
                background-image: url("../assets/img/tab-image-active.png");
            }
            .tab-video.active {
                background-image: url("../assets/img/tab-video-active.png");
            }
        }
        .jxstg-content {
            margin-top: 0.42rem;
            .image-warp,
            .video-warp {
                display: flex;
                width: 100%;
                // margin: 0 10rem;
                .pd10 {
                    padding: 0.1rem;
                }
                .image-item,
                .video-item {
                    height: 2.35rem;
                    // padding: 10rem;
                    position: relative;
                    overflow: hidden;
                }
                .video-item:after,
                .video-item:before {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                }
                .video-item:after {
                    background: rgba(0, 0, 0, 0.5);
                    width: 100%;
                    height: 100%;
                    z-index: 19;
                }
                .video-item:before {
                    background: url("../assets/img/video-start.png") no-repeat
                        left top;
                    height: 1.5rem;
                    width: 1.5rem;
                    background-size: 100% 100%;
                    z-index: 20;
                }
            }
        }
        .btn-more-image,
        .btn-more-video {
            width: 4.49rem;
            height: 0.65rem;
            margin: 0.75rem auto 0;
        }
    }

    .fixed-gift {
        width: 1.12rem;
        height: 1.45rem;
        position: fixed;
        right: 0;
        top: 55%;
        bottom: 0;
        margin: auto;
        z-index: 999;
    }
}
</style>
<style lang="less">
// 图片模态框
.dialog-image-warp {
    .weui-dialog {
        width: 7.5rem !important;
        height: 4.74rem !important;
        max-width: 7.5rem !important;
        background-color: rgba(0, 0, 0, 0) !important;

    }
    .dialog-image-body {
        position: relative;
        z-index: 999999;
        .close-warp {
            height: 0.61rem;
            .btn-close {
                background: url("../assets/img/btn-close.png") no-repeat;
                width: 0.5rem;
                height: 0.5rem;
                background-size: 100% 100%;
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 998;
            }
        }
        .dialog-content {
            width: 7.14rem;
            height: 4.13rem;
            margin: 0 auto;
            text-align: center;
            background: rgba(0, 0, 0, 0) !important;
            position: relative;
        }
        .dialog-image {
            width: 7.03rem;
            height: 4.02rem;
            background-size: 100% 100%;
            margin: 0 auto;
            margin-top: 0.04rem;
            z-index: 0.1;
            position: absolute;
            left: 0.03rem;
        }
        .dialog-image-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 0.04rem;
        }
    }
}

//轮播图切换图标
.news-pagination {
    position: relative;
    bottom: 0;
    margin: 0 auto;
    width: 100%;
    .swiper-pagination-bullet {
        margin: 0 0.05rem;
        background: url("../assets/img/bullet-icon.png") no-repeat;
        width: 0.26rem;
        height: 0.26rem;
        background-size: 100% 100%;
        opacity: 1;
    }
    .swiper-pagination-bullet-active {
        background: url("../assets/img/bullet-icon-active.png") no-repeat;
        background-size: 100% 100%;
    }
}

.yxts-pagination {
    bottom: -0.4rem;
    margin: 0 auto;
    width: 100%;
    .swiper-pagination-bullet {
        margin: 0 0.05rem;
        background: url("../assets/img/bullet-icon.png") no-repeat;
        width: 0.14rem;
        height: 0.14rem;
        background-size: 100% 100%;
        opacity: 1;
    }
    .swiper-pagination-bullet-active {
        background: url("../assets/img/bullet-icon-active.png") no-repeat;
        background-size: 100% 100%;
    }
}

.dialog-gift-warp {
    .weui-dialog {
        width: 6.57rem !important;
        height: 7.35rem !important;
        max-width: 6.57rem !important;
        background: url("../assets/img/gift-bg.png") left top no-repeat;
        background-size: 100% 100%;
        padding: 0.66rem 0.98rem 0;
        overflow: initial;
        .close {
            position: absolute;
            top: -0.3rem;
            right: -0.2rem;
            img {
                width: 0.35rem;
                height: 0.35rem;
            }
        }
    }
    .title {
        text-align: center;
        color: #d1a62d;
        font-weight: bold;
        font-size: 0.34rem;
        margin-bottom: 0.25rem;
    }
    .code-section {
        text-align: center;
        margin-bottom: 0.4rem;
        .label {
            color: #d1a62d;
            font-size: 0.28rem;
            margin-bottom: 0.14rem;
        }
        .code {
            font-size: 0.26rem;
            border: solid 2px #e9d49d;
            color: #6c520b;
            width: 3rem;
            height: 0.52rem;
            line-height: 0.52rem;
            border-radius: 0.1rem;
            margin: 0 auto;
        }
    }
    .rule-section {
        text-align: left;
        color: #989898;
        font-size: 0.26rem;
        p {
            margin-bottom: 0.2rem;
            .bold {
                font-weight: bold;
                color: #d1a62d;
                float: left;
            }
            .txt {
                display: block;
                overflow: hidden;
            }
        }
    }
}
</style>

