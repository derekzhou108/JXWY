<template>
    <div class="downloadComponent">
        <div class="down-load-warp" v-if="showDownload">
            <div class="down-mask"></div>
            <div class="download"><img src="../assets/img/download.png" alt=""></div>
        </div>
        <div class="game-download-warp">
            <div class="download"><img src="../assets/img/download-title.png" alt=""></div>
            <div class="game-download-az u-tc">
                <a id="btn-game-download" v-bind:href="downloadFiles" style="display: inline-block" class=" u-h100 u-w100">
                    <!--<img class="btn-game-download" src="../assets/img/btn-game-android.png" alt="">-->
                    <span class="btn-download">{{download_text}}</span>
                </a>
            </div>
        </div>
    </div>

</template>
<script>
import { mapGetters } from "vuex";
import * as util from "../utils";
let _this = this;
export default {
    data() {
        return {
            showDownload: false,
            downloadFiles: "",
            isiOS: false,
            download_text: "",
            is_weixn: false
        };
    },
    computed: {
        ...mapGetters(["DONE_GAME_DOWNLOAD"])
    },
    created() {
        let self = this;
        self.getDeviceInfo();
        this.$store.dispatch("FETCH_GAME_DOWNLOAD").then(res => {
            if (this.isiOS) {
                self.downloadFiles = res.data.ios_download_url;
                self.download_text = "下载IOS版";
                window.open(res.data.ios_download_url, "_self");
            } else {
                self.downloadFiles = res.data.android_download_url;
                self.download_text = "下载Android版";
                window.open(res.data.android_download_url, "_self");
            }
        });
    },
    methods: {
        getDeviceInfo: function() {
            var userAgentInfo = navigator.userAgent;
            this.isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var isAndroid =
                userAgentInfo.indexOf("Android") > -1 ||
                userAgentInfo.indexOf("Adr") > -1; //android终端
            this.is_weixn =
                userAgentInfo.toLowerCase().match(/MicroMessenger/i) ==
                "micromessenger";
            if (!this.isiOS && this.is_weixn) {
                this.showDownload = true;
            } else {
                this.showDownload = false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.downloadComponent {
    .down-load-warp {
        position: absolute;
        z-index: 99;
        height: 100%;
        width: 100%;
        top: 0;
        .down-mask {
            background: #000000;
            height: 100%;
            opacity: 90;
            position: absolute;
            width: 100%;
        }
        .download {
            z-index: 100;
            position: relative;
            text-align: center;
            img {
                width: 6.97rem;
                height: 0.69rem;
            }
        }
    }
    .game-download-warp {
        .download {
            margin-top: 0.99rem;
            text-align: center;
            img {
                height: 3.46rem;
                width: 6.55rem;
            }
        }
        .game-download-az {
            margin-top: 0.72rem;
            img {
                width: 6.08rem;
                height: 1.04rem;
            }
        }
        .btn-download {
            display: inline-block;
            width: 6.08rem;
            font-size: 0.31rem;
            height: 1.04rem;
            background: #a48d66;
            color: #ffffff;
            border-radius: 10rem;
            line-height: 104rem;
        }
    }
}
</style>
