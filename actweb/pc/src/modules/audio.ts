// 播放视频
declare const layer: any;
declare const TcPlayer: any;

class AudioController {
  private static _instance: AudioController;

  private constructor() {
    // 预处理
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public videoShow(ele: string, w: number, h: number) {
    $(ele).on('click', function () {
      const videoUrl = $(this).data('video');
      layer.open({
        type: 1,
        title: 0,
        closeBtn: 1,
        shadeClose: 1,
        area: [`${w}px`, `${h}px`],
        skin: 'video-dialog',
        content: '<div id="videoContainer"></div>',
        anim: '-1',
        success: function () {
          new TcPlayer('videoContainer', {
            m3u8: videoUrl, // video路径
            autoplay: !0,
            width: `${w}`,
            height: `${h - 15}`,
            wording: {5: '您的Flash插件已过期，无法播放视频，请升级Flash插件'},
            listener(i: any) {
              'fullscreen' === i.type && i.detail.isFullscreen;
            }
          });
          // 剔除layer弹窗溢出背景
          $('.layui-layer').css({
            boxShadow: 'none',
            background: 'transparent',
            left: '50%',
            marginLeft: `${-w / 2}px`
          });
        }
      });
    });
  }
}

export default AudioController;
