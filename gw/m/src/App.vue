<template>

  <div class="main" id="jxwy-warp">
    <view-box id="">
      <router-view class="router-view"></router-view>
      <!--<BeforeLast></BeforeLast>-->
    </view-box>
    <!--<Appointment></Appointment>-->

    <div class="cross-screen flex flex-center flex-ver" v-show="orientationState && !isVideo">
      <div class="icon u-bgs-100"></div>
      <div class="u-mt20">为了更好的体验，请将手机／平板竖过来</div>
    </div>



    <!--<div v-transfer-dom style="z-index:9999998;position: fixed;width: 100%;height: 100%;top:0;left:0;background: rgba(0,0,0,.5);" v-show="doneVideoDialog" @click="closeVideo"></div>-->

    <!--<div v-transfer-dom style="z-index:9999999;width: 100%;height:70%;position: fixed;left: 0;top:15%;"  v-show="doneVideoDialog">-->
      <!--<div v-show="doneVideoDialog" style="width: 100%;height:100%;">-->
        <!--&lt;!&ndash;<iframe frameborder="0" style="width:100%;height:100%;" src="https://v.qq.com/iframe/player.html?vid=f0528di6dbu&tiny=0&auto=0" allowfullscreen></iframe>&ndash;&gt;-->
        <!--<tcplayer :url="DONE_VIDEO.video_url" v-if="doneVideoDialog"></tcplayer>-->
      <!--</div>-->
    <!--</div>-->

  </div>

</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  ViewBox,
  Masker,
  Spinner,
  TransferDomDirective as TransferDom
} from "vux";
import * as util from "@/utils";
//  import Appointment from './components/appointment.vue'
//  import BeforeLast from '@/components/BeforeLast.vue'
import tcplayer from "@/components/tcplayer.vue";

export default {
  name: "app",
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    Masker,
    Spinner,
    //      BeforeLast,
    //      Appointment,
    tcplayer
  },
  data() {
    return {
      orientationState: false,
    };
  },
  computed: {
    ...mapGetters(["doneVideoDialog", "DONE_VIDEO"]),
    ...mapState(["isVideo"])
  },
  created() {
    if (util.isEmpty(this.DONE_VIDEO)) {
      //        this.$store.dispatch('FETCH_VIDEO')
    }
    // let ua = window.navigator.userAgent.toLowerCase();
    //   let isWeixin = false;
    //   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //       // 是来自微信内置浏览器
          let cur = window.location.host
          cur="//"+cur+"/download/scan"
          this.$store.commit('updateDown',cur)
      // } else {
      // // 不是来自微信内置浏览器
      //     this.$store.dispatch('gameDownInfo') //根据终端获取下载地址
      // }

  },
  mounted() {
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.orientation
    );
    this.orientation();

  },
  methods: {
    orientation() {
      if (window.orientation === 180 || window.orientation === 0) {
        this.orientationState = false;
      }
      if (window.orientation === 90 || window.orientation === -90) {
        this.orientationState = true;
      }
      //        setTimeout(() => {
      //          util.setHtmlFontSize()
      //      }, 300)
    },
    closeVideo() {
      this.$store.commit("updateVideoDialog", false);
    },
  }
};
</script>

<style lang="less">
@import "./assets/css/reset.css";
@import "./assets/css/base.less";
@import "./assets/css/flex.less";

.main {
  // height: 100%;
}
.loading {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin-top: -.5rem;
  margin-left: -.5rem;
  .spinner,
  .spinner svg {
    fill: #fd6001;
    stroke: #fd6001;
    width: 1rem;
    height: 1rem;
  }
}
.cross-screen {
  z-index: 1000000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #212429;
  color: #ff9300;
  .icon {
    background: url(./assets/img/crossScreen.png) no-repeat center;
    background-size: 100% 100%;
    width: 2rem;
    height: 1.73rem;
  }
}
.weui-tab{
  height: auto !important
}
.weui-tab__panel {
  height: auto !important;
  padding-bottom: 0 !important;
}
.d-close {
  /*background: url("./assets/img/btn_close.png")no-repeat center;*/
  height: 1;
  width: 1rem;
  margin: 0 auto;
  margin-top: .5rem;
}
</style>
