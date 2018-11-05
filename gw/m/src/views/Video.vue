<template>
    <div>
      <div id="videoContainer" class="video"></div>
        <div class="footer-bg"></div>
        <publicFooter></publicFooter>
    </div>
</template>

<script>
    import publicFooter from '../components/footer.vue'
    export default {
        components:{
            publicFooter
        },
      computed: {
      },
      data(){
        return {
          url: this.$route.query.url
        }
      },
      created(){
      },
      mounted(){
        var player = new TcPlayer('videoContainer', {
          "m3u8": this.url, //请替换成实际可用的播放地址
          "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          //"coverpic" : ,
          "width" : '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
          "height" : '100%' ,//视频的显示高度，请尽量使用视频分辨率高度
          listener(msg){
//            if(msg.type === 'fullscreen'){
//              document.querySelector('.top').style.top =  msg.detail.isFullscreen ? '-.95rem' : '0'
//              document.querySelector('.main').style.paddingTop =  msg.detail.isFullscreen ? '0' : '0.95rem'
//            }
          }
        });
      }
    }
</script>

<style>

</style>
