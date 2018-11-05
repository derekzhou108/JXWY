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


  </div>

</template>

<script>
  import {Masker, Spinner, TransferDomDirective as TransferDom, ViewBox} from "vux";
  //  import BeforeLast from '@/components/BeforeLast.vue'
  import * as util from './utils'

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
    },
    data() {
      return {
        orientationState: false,
      };
    },
    computed: {},
    created() {
      let data = {
        "invite_id":util.getQueryString('invite_id')
      }
      this.$store.dispatch('gameDownInfo',data) //根据终端获取下载地址
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
      }
    }
  };
</script>

<style lang="less">
  @import "./assets/css/reset.css";
  @import "./assets/css/base.less";
  @import "./assets/css/flex.less";

  @media (min-width: 320px) {
    html {
      font-size: 42.6666px;
    }
  }

  @media (min-width: 360px) {
    html {
      font-size: 48px;
    }
  }

  @media (min-width: 375px) {
    html {
      font-size: 50px;
    }
  }

  @media (min-width: 412px) {
    html {
      font-size: 54.93px;
    }
  }

  @media (min-width: 414px) {
    html {
      font-size: 55.2px;
    }
  }

  @media (min-width: 768px) {
    html {
      font-size: 102.4px;
    }
  }

  @media (min-width: 1024px) {
    html {
      font-size: 136.533px;
    }
  }

  .container {
    margin: 0 auto;
    width: 100%;
    min-width: 6.4rem;
    height: auto;
    position: relative;
  }

  /*@media screen and (min-width:360px) and (max-width:374px) and (orientation:portrait) {*/
  /*html { font-size: 703%; }*/
  /*}*/
  /*@media screen and (min-width:375px) and (max-width:383px) and (orientation:portrait) {*/
  /*html { font-size: 732.4%; }*/
  /*}*/
  /*@media screen and (min-width:384px) and (max-width:399px) and (orientation:portrait) {*/
  /*html { font-size: 750%; }*/
  /*}*/
  /*@media screen and (min-width:400px) and (max-width:413px) and (orientation:portrait) {*/
  /*html { font-size: 781.25%; }*/
  /*}*/
  /*@media screen and (min-width:414px) and (max-width:431px) and (orientation:portrait){*/
  /*html { font-size: 808.6%; }*/
  /*}*/
  /*@media screen and (min-width:432px) and (max-width:479px) and (orientation:portrait){*/
  /*html { font-size: 843.75%; }*/
  /*}*/

  .main {
    height: 100%;
    background: #FFFFFF;
  }

  .loading {
    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    margin-top: -0.5rem;
    margin-left: -0.5rem;
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

  .weui-tab__panel {
    padding-bottom: 0 !important;
  }

  .d-close {
    /*background: url("./assets/img/btn_close.png")no-repeat center;*/
    height: 1rem;
    width: 1rem;
    margin: 0 auto;
    margin-top: 0.5rem;
  }
</style>
