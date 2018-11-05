<template>
  <div class="detailComponent">
    <publicTop></publicTop>
    <topNav></topNav>
    <div class="news-details-page">
      <div class="details">
        <div class="details-title">
          <h1 class="u-tc u-break-warp" v-if="!isGameSource">{{DONE_NEWS_DETAILS.title}}</h1>
          <h1 class="u-tc u-break-warp" v-else-if="isGameSource">{{DONE_GAME_DETAILS.title}}</h1>
          <p class="u-tc">
            <span v-if="!isGameSource">发布于&nbsp;{{DONE_NEWS_DETAILS.created_at}}</span>
            <span v-if="isGameSource">发布于&nbsp;{{DONE_GAME_DETAILS.created_at}}</span>
            <!--<span>| 分享到:</span>-->
            <!--<span class="shareWarp" v-html="this.shareHtml"></span>-->
          </p>
        </div>
        <div class="details-content">
          <div v-if="!isGameSource" v-html="DONE_NEWS_DETAILS.context"></div>
          <div v-if="isGameSource" v-html="DONE_GAME_DETAILS.context"></div>
        </div>
      </div>

      <!-- <div style="overflow: hidden">
        <div class="page flex">

          <router-link v-if="!isGameSource" tag="div" class="btn flex-center flex u-fs22" :to="{name:'NewsList'}">
            返回列表页
          </router-link>
        </div>
      </div> -->
    </div>
    <publicFooter></publicFooter>

  </div>
</template>

<script type="text/ecmascript-6">
import publicTop from "../components/publicTop.vue";
import publicFooter from "../components/footer.vue";
import topNav from "../components/topNav.vue";
import { mapGetters } from "vuex";
import "border.css";

export default {
    components: {
        publicTop,
        publicFooter,
        topNav
    },
    data() {
        return {
            id: this.$route.query.id,
            isGameSource: /game-data/gi.test(this.$route.path),
            shareURL: "",
            shareTITLE: "",
            shareWEIBOKEY: "",
            shareIMG: "",
            shareDESCRIPTION: "",
            shareSUMMARY: "",
            shareSOURCE: "",
            shareHtml: ""
        };
    },

    computed: {
        ...mapGetters(["DONE_NEWS_DETAILS", "DONE_GAME_DETAILS"])
    },
    created() {},
    mounted() {
        document.querySelector("#vux_view_box_body").scrollTop = 0;
        if (this.isGameSource) {
            this.fetchGameDetails();
        } else {
            this.fetchNewsDetails();
        }
    },
    methods: {
        fetchNewsDetails() {
            this.$store
                .dispatch("FETCH_NEWS_DETAILS", { id: this.id })
                .then(res => {
                    this.DONE_NEWS_DETAILS.created_at = this.DONE_NEWS_DETAILS.created_at.substring(
                        0,
                        10
                    );
                    var url = window.location.toString();
                    // this.setShareCfg(url,res.data.title,res.data.description);
                });
        },
        fetchGameDetails() {
            this.$store
                .dispatch("FETCH_GAME_DETAILS", { id: this.id, app_id: "JXWY" })
                .then(res => {
                    const data = new Date(
                        parseInt(this.DONE_GAME_DETAILS.created_at) * 1000
                    )
                        .toLocaleDateString()
                        .replace(/\//g, "-");
                    this.DONE_GAME_DETAILS.created_at = data;
                    const url = window.location.toString();
                });
        },
        setShareCfg(url, title, desc) {
            this.shareURL = url;
            this.shareTITLE = title;
            this.shareDESCRIPTION = desc;
            var html = "";
            var html_wb =
                '<a class="shareWb" href="http://service.weibo.com/share/share.php?url=' +
                this.shareURL +
                "&title=" +
                this.shareTITLE +
                "&pic=" +
                this.shareIMG +
                "&appkey=" +
                this.shareWEIBOKEY +
                '"></a>';
            var html_qzone =
                '<a class="shareQzone" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' +
                this.shareURL +
                "&title=" +
                this.shareTITLE +
                "&desc=" +
                this.shareDESCRIPTION +
                "&summary=" +
                this.shareSUMMARY +
                "&site=" +
                this.shareSOURCE +
                '"></a>';
            this.shareHtml = html_wb + html_qzone;
        }
    }
};
</script>

<style lang="less" scoped>
.detailComponent {
    background: #f5f0ec url("../assets/img/public-titile-bg.png") no-repeat
        center 1rem;
    em,
    i {
        font-style: italic;
    }

    .news-details-page {
        min-height: 6.7rem;
        width: 100%;
        margin: 0 auto;
        padding: 0.48rem 0.1rem 0;

        .details {
            .details-title {
                margin-bottom: 0.57rem;
                h1 {
                    font-size: 0.31rem;
                    font-weight: bold;
                    // line-height: 25rem;
                    margin-bottom: 0.26rem;
                    color: #a48d66;
                }
                p {
                    color: #898989;
                    font-size: 0.21rem;
                }
            }
            .details-content {
                word-break: break-all;
                img {
                    display: block;
                    max-width: 100%;
                }
                p {
                    font-size: 0.24rem;
                    text-indent: 0.48rem;
                    img {
                        margin: 0 auto;
                    }
                }
            }
        }
    }
    .details-title h1 {
        /*word-wrap: break-word !important;*/
    }
    .details-content p {
        word-break: break-all;
    }
    .u-bor-b1 {
        position: relative;
    }
    .u-bor-b1:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1rem;
        border-bottom: 1px solid #d9d9d9;
        color: #d9d9d9;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .page {
        margin: 0.6rem 0.2rem;
        justify-content: space-between;
        .btn {
            width: 2.4rem;
            height: 0.6rem;
            border: 1px solid #a48d66;
            color: #a48d66;
            border-radius: 0.1rem;
            font-size: 0.25rem;
            margin: 0 auto;
        }
    }
    .shareWarp {
        a {
            margin: 0 0.05rem;
        }
    }
    .shareWb {
        background: url("../assets/img/share-wb.png") no-repeat;
        width: 0.24rem;
        height: 0.24rem;
        display: inline-block;
        background-size: 100% 100%;
        position: relative;
        top: 4rem;
    }
    .shareQzone {
        background: url("../assets/img/share-qqkone.png") no-repeat;
        width: 0.24rem;
        height: 0.24rem;
        display: inline-block;
        background-size: 100% 100%;
        position: relative;
        top: 0.04rem;
    }
}
</style>
