<template>
    <div id="videoContainer" style="width: 100%;height: 100%"></div>
</template>
<script>
  export default {
    props: {
      url: {
        type: String,
        default : '',
      }
    },
    mounted(){
      new TcPlayer('videoContainer', {
        "m3u8": this.url, //请替换成实际可用的播放地址
        "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        //"coverpic" : this.img,
        "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
        "height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
        listener: function(msg){
          if(msg.type === 'fullscreen'){
            if(msg.detail.isFullscreen){
            }else{

            }
          }
        }
      });
    }
  }
</script>
