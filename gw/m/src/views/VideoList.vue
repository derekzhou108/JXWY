<template>
    <div class="videoListComponent">
        <publicTop></publicTop>
        <topNav></topNav>
        <div class="video-content">
            <div class="tab-warp u-tc">
                <span class="tab tab-video" :class="{'active':!showImage}" @click="showImage=false"></span>
                <span class="tab tab-image" :class="{'active':showImage}" @click="showImage=true"></span>

            </div>
            <div class="video-image-list " v-if="showImage">
                <div class="clearfix ">
                    <div class="list  image u-fl" v-for="(item,index) in DONE_AJAX_IMAGE_LIST" @click="openImageDialog(item.img_url)">
                        <img class="u-w100 u-h100" :src="item.img_url" alt="">
                        <div class="desc">{{item.img_desc}}</div>
                    </div>
                </div>
                <div class="backToIndex" :class="(this.moreImage) ? 'u-vshow':'u-vhide' ">
                    <span class="btn-to-index" @click="this.fetchImage()">加载更多</span>
                </div>
            </div>
            <div class="video-image-list " v-if="!showImage">
                <div class="clearfix ">
                    <div class="list video u-fl" v-for="(item,index) in DONE_AJAX_VIDEO_LIST" @click="openVideos(item.video_url)">
                        <img class="u-w100 u-h100" :src="item.thumbnail" alt="">
                        <div class="desc">{{item.desc}}</div>
                    </div>
                </div>
                <div class="backToIndex" :class="(this.moreVideo) ? 'u-vshow':'u-vhide' ">
                    <div class="btn-to-index" @click="fetchVideo()">加载更多</div>
                </div>
            </div>
        </div>
        <publicFooter></publicFooter>
        <div v-transfer-dom>
            <x-dialog v-model="showImageDialog" class="dialog-image-warp">
                <div class="dialog-image-body">
                    <div class="close-warp">
                        <div class="btn-close" @click="showImageDialog=false"></div>
                    </div>
                    <div class="dialog-content">
                        <div class="dialog-image"></div>
                        <div class="dialog-image-content">
                            <div class="u-w100 u-h100"><img class="u-w100 u-h100" :src="imageUrl" alt=""></div>
                        </div>
                    </div>
                </div>
            </x-dialog>
        </div>
    </div>
</template>
<script>
import publicTop from "../components/publicTop.vue";
import publicFooter from "../components/footer.vue";
import topNav from "../components/topNav.vue";
import { mapGetters, mapState } from "vuex";
import { XDialog, TransferDomDirective as TransferDom } from "vux";
import * as util from "../utils";
export default {
    directives: {
        TransferDom
    },
    components: {
        XDialog,
        publicTop,
        publicFooter,
        topNav
    },
    data() {
        return {
            imageUrl: "",
            currVideoIndex: 0,
            currImageIndex: 0,
            moreImage: false,
            moreVideo: false,
            showImageDialog: false,
            showImage: this.$route.query.type === 1
        };
    },
    computed: {
        ...mapGetters(["DONE_AJAX_VIDEO_LIST", "DONE_AJAX_IMAGE_LIST"])
    },
    mounted() {
        document.querySelector("#vux_view_box_body").scrollTop = 0;
    },
    created() {
        //视频列表
        if (util.isEmpty(this.DONE_AJAX_VIDEO_LIST)) {
            this.$store
                .dispatch("FETCH_AJAX_VIDEO_LIST", { idx: 0 })
                .then(res => {
                    if (10000 === res.code) {
                        this.moreVideo =
                            res.pageCount - res.pageIndex > 1 ? true : false;
                        this.currVideoIndex = parseInt(res.pageIndex);
                    }
                });
        }
        //原画列表
        if (util.isEmpty(this.DONE_AJAX_IMAGE_LIST)) {
            this.$store
                .dispatch("FETCH_AJAX_IMAGE_LIST", { idx: 0 })
                .then(res => {
                    if (10000 === res.code) {
                        this.moreImage =
                            res.pageCount - res.pageIndex > 1 ? true : false;
                        this.currImageIndex = parseInt(res.pageIndex);
                    }
                });
        }
    },
    methods: {
        fetchVideo() {
            this.$store
                .dispatch("FETCH_AJAX_VIDEO_LIST", {
                    idx: this.currVideoIndex + 1
                })
                .then(res => {
                    if (10000 === res.code) {
                        this.moreVideo =
                            res.pageCount - res.pageIndex > 1 ? true : false;
                        this.currVideoIndex = parseInt(res.pageIndex);
                    }
                });
        },
        fetchImage() {
            this.$store
                .dispatch("FETCH_AJAX_IMAGE_LIST", {
                    idx: this.currImageIndex + 1
                })
                .then(res => {
                    if (10000 === res.code) {
                        this.moreImage =
                            res.pageCount - res.pageIndex > 1 ? true : false;
                        this.currImageIndex = parseInt(res.pageIndex);
                    }
                });
        },
        openImageDialog(imageUrl) {
            this.imageUrl = imageUrl;
            this.showImageDialog = true;
        },
        openVideos(url) {
            if (url !== "") {
                this.$router.push({ name: "video", query: { url: url } });
            } else {
                alert("暂无视频，敬请期待！");
            }
        }
    }
};
</script>
<style lang="less" scoped>
.videoListComponent {
    background: #f5f0ec url("../assets/img/public-titile-bg.png") no-repeat center 1rem;
    .video-content {
        padding-top: 0.48rem;
        .tab-warp {
            margin-bottom: 0.68rem;
            font-size: 0;
            .tab {
                width: 3.16rem;
                display: inline-block;
                height: 0.65rem;
                margin: 0 0.02rem;
            }
            .tab-image {
                background-image: url("../assets/img/tab-image.png");
                background-repeat: no-repeat;
                background-position: left top;
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
        .video-image-list {
            width: 7.41rem;
            margin: 0 auto;
            .video:after,
            .video:before {
                content: "";
                display: inline-block;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
            }
            .video:after {
                background: rgba(0, 0, 0, 0.5);
                width: 100%;
                height: 100%;
                z-index: 19;
            }
            .video:before {
                background: url("../assets/img/video-start.png") no-repeat left
                    top;
                height: 1rem;
                width: 1rem;
                background-size: 100% 100%;
                z-index: 20;
            }
            .list {
                margin: 0 0.1rem;
                margin-bottom: 0.29rem;
                position: relative;
                width: 3.49rem;
                height: 2.08rem;
                .desc {
                    position: absolute;
                    height: 0.5rem;
                    width: 100%;
                    color: #ffffff;
                    background: #000000;
                    bottom: 0;
                    line-height: 0.5rem;
                    text-align: center;
                    font-size: 0.2rem;
                }
            }
        }

        .backToIndex {
            margin-bottom: 1rem;
            margin-top: 0.5rem;
            text-align: center;
            .btn-to-index {
                width: 2.4rem;
                height: 0.6rem;
                line-height: 0.58rem;
                border: 1rem solid #a48d66;
                color: #a48d66;
                border-radius: 0.1rem;
                font-size: 0.25rem;
                margin: 0 auto;
            }
        }
    }
}
</style>
