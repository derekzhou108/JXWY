<template>
  <div v-transfer-dom @touchmove.prevent>
      <x-dialog v-model="showVedio.show" class="kaiser_dialog">
          <div id="videoContainer" :class="videoClass">
          </div>
          <div class="close-warp">
                <div class="btn-close" @click="closeVideoDialog()"></div>
            </div>
      </x-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      orientationState: false,
      player:''
    };
  },
  mounted() {
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.orientation
    );
    // this.initVideoPlayer();
  },
  computed: {
    ...mapState({
      showVedio: state => state.showVedio
    }),
    videoClass() {
      return {
        "video-container": this.orientationState
      };
    }
  },
  watch:{
    showVedio(val){
      if(val.show==true){
        this.initVideoPlayer();
      }
    }
  },
  methods: {
    closeVideoDialog() {
      this.player.destroy();
      this.$store.commit("updateVideo", { show: false });
    },
    orientation() {
      if (window.orientation === 180 || window.orientation === 0) {
        this.orientationState = false;
      }
      if (window.orientation === 90 || window.orientation === -90) {
        this.orientationState = true;
      }
    },
    initVideoPlayer() {
      this.player=new TcPlayer("videoContainer", {
        hls: "0.8.1",
        m3u8:
          "//1255423641.vod2.myqcloud.com/7bfdbe68vodtransgzp1255423641/1ccde54e5285890782458130770/v.f230.m3u8", // 请替换成实际可用的播放地址
        autoplay: true, // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        width: "100%", // 视频的显示宽度，请尽量使用视频分辨率宽度
        height: "100%", // 视频的显示高度，请尽量使用视频分辨率高度
        controls: "system"
      });
      /*        var player = cyberplayer("videoContainer").setup({
                  width: '100%',
                  height: 250,
                  file: Url,
                  type: "m3u8",
                  autostart: true,
                  stretching: "uniform",
                  repeat: true,
                  volume: 50,
                  controls: true,
                  controlbar: {
                    barLogo: false
                  },
                  starttime: 0,
                 // primary: "flash", // 强制使用flash来播放，不设置的话则默认高优使用H5进行播放
                  ak: "d449b511727048688d176818023afa54"
                });*/
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/base.less";
.video-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  bottom: 0;
  width: 100%;
}
.weui-dialog{
   overflow: visible !important;
}
.btn-close {
  background: url("../assets/img/dialog-close.png") no-repeat;
  width: 0.5rem;
  height: 0.5rem;
  background-size: 100% 100%;
  display: inline-block;
  position: absolute;
  top: -0.5rem;
  right: 0;
  z-index: 998;
}
</style>
