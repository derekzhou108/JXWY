<template>
  <div class="footBlock">
    <div class="footer">
      <div class="footer-item flex flex-center">
        <span @click="openQR" class="item-icon icon-ewm"></span>&nbsp;关注公众号
        <span @click="openWB" class="item-icon icon-wb"></span>&nbsp;关注微博
        <span @click="openShare" class="item-icon icon-share"></span>&nbsp;分享小伙伴
      </div>
      <div class="text">
        <div class="info" style="padding: 0.4rem 0px;">
          <p style="border:none;cursor: pointer;">联系我们：0755-86531031</p>
          <p class="copyright u-fs20">
            <a href="http://www.ccm.gov.cn/" style="margin-right: 0.15rem;text-decoration: none;"
               target="_blank">粤网文（2017）3800-729号</a>
          </p>
          <p class="copyright u-fs20">
            <a href="http://www.miitbeian.gov.cn" style=";text-decoration: none;" target="_blank">粤ICP备17047563号-2</a>
          </p>
          <p class="u-fs20" style="line-height: 100%; margin-bottom: 0.07rem;margin-top: 0.05rem">
            <a target="_blank"
               href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001339"><img
              style="width: 0.16rem;position: relative;top: 0.03rem;"
              src="//cdn.ksgame.com/ksgame/pc2/dist/img/foreground/icon_yuewangga1.png" alt=""></a>
            <a target="_blank"
               href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001339"
               style="color: #d4d4d4;text-decoration: underline;">粤公网安备 44030502001339号</a>
            <span style="margin-left:10px">深圳金翅鸟信息科技有限公司</span>
          </p>
          <p class="u-fs20">增值电信业务经营许可证：粤B2-20170497</p>
          <p class="copyright u-fs20">Copyright © 2017 jinchiniao. All rights reserved.</p>
        </div>
      </div>


    </div>

    <div class="dialog-ewm" v-transfer-dom @touchmove.prevent>
      <x-dialog v-model="showQR" :hideOnBlur="true" class="kaiser_dialog" :dialog-class="'weui-dialog k-1'">
          <div class="ewm-img">
            <img alt="二维码" title="公众号二维码" src="../assets/img/share-qr.png">
          </div>
          <p class="ewm-txt">长按关注官方公众号</p>
      </x-dialog>
    </div>
    <div class="dialog-share" v-transfer-dom @touchmove.prevent>
      <x-dialog v-model="showShare" :hideOnBlur="true" :dialog-class="'weui-dialog k-share'">
        <share :config="config"></share>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showQR: false,
        showShare: false,
        config: {
          url: window.location.href, // 网址，默认使用 window.location.href
          source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title: '锦绣未央手游抢先预约', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          description: '', // 描述, 默认读取head标签：<meta name="description" content="" />
          image: '', // 图片, 默认取网页中第一个img标签
          sites: ['weibo', 'qq', 'wechat', 'qzone'], // 启用的站点
          wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper: '<p>微信扫一扫打开网站，</p><p>点击右上角"···"按钮分享给好友们~</p>'
        }
      }
    },
    mounted() {

    },
    methods: {
      openQR() {
        this.showQR = true
      },
      openShare() {
        this.showShare = true
      },
      openWB() {
        window.location.href = "https://weibo.com/jxwysy"
      }
    }

  }
</script>
<style lang="less">
  @import "../assets/css/mixin.less";
  @import "../assets/css/flex.less";

  .dialog-ewm {
    .ewm-img {
      img {
        .px2rem(width, 150);
        .px2rem(height, 150);
      }
    }
    .ewm-txt {
      .px2rem(font-size, 24);
      .px2rem(margin-top, 20);
       margin-top: -0.2rem;
    }
  }

  .footBlock {
    display: block;
    background: #ffffff;
    .flex-col-50 {
      flex: 1;
    }
    .flex-center {
      justify-content: center;
      align-items: center;
    }
    .flex {
      display: -webkit-box;
      display: flex;
    }
    .flex-ver {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
    }
    .contact {
      height: 2.57rem;
      width: 100%;
      color: #3a4550;
    }
    .u-fs20 {
      font-size: .2rem;
    }
    .u-fs25 {
      font-size: 0.25rem;
    }
    .u-ml15 {
      margin-left: .15rem;
    }
    .contact {
      height: 1.65rem;
      border-bottom: 1px solid #dfe4e7;
    }
    .follow {
      margin-top: 0.42rem;
    }
    .text {
      position: relative;
      width: 100%;
      background: #1e1f20;
      .info {
        text-align: center;
      }
      p {
        font-size: 0.18rem;
        color: #747474;
      }
      .icon-top-wrap {
        position: absolute;
        bottom: 0.57rem;
        right: 0.23rem;
      }
      .icon-top-wrap img {
        width: 0.94rem;
      }
    }
  }

  .footer-item {
    background: url("../assets/img/share-bg.png") no-repeat center;
    background-size: 100% 100%;
    width: 7.50rem;
    height: 1.99rem;
    border-top: 5px solid #c1965a;
    font-size: 0.28rem;
    /* line-height: 22px; */
    letter-spacing: -1px;
    color: #d4d4d4;
    .item-icon {
      margin-left: 0.4rem;
      margin-right: 0.04rem;
    }
    .icon-ewm {
      background: url("../assets/img/share-gz.png") no-repeat;
      width: 0.61rem;
      height: 0.61rem;
      background-size: 100% 100%;
      display: inline-block;
    }
    .icon-wb {
      background: url("../assets/img/share-wb.png") no-repeat;
      width: 0.6rem;
      height: 0.6rem;
      background-size: 100% 100%;
      display: inline-block;
    }
    .icon-share {
      background: url("../assets/img/share-3.png") no-repeat;
      width: 0.6rem;
      height: 0.6rem;
      background-size: 100% 100%;
      display: inline-block;
    }
  }

  .kaiser_dialog {
    .k-1 {
      overflow: visible;
      background: url("../assets/img/k-1.png") no-repeat center;
      background-size: 100% 100%;
      width: 4.38rem;
      height: 4.4rem;
      max-width: 4.38rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .dialog-share {
    .k-share {
      overflow: visible;
      background-color: transparent;
      width: 80%;
      max-width: 80%;
      .social-share {
        display: flex;
        justify-content: space-around;
      }
      .social-share a {
      }
      .social-share .icon-qq:before, .social-share .icon-wechat:before {
        content: none;
      }
      .social-share .icon-qq {
        background: url("../assets/img/share_qq.png") no-repeat;
      }
      .social-share .icon-weibo {
        background: url("../assets/img/share_wb.png") no-repeat;
      }
      .social-share .icon-wechat {
        background: url("../assets/img/share_wx.png") no-repeat;
      }
      .social-share .icon-qzone {
        background: url("../assets/img/share_qqkone.png") no-repeat;
      }
      .social-share .social-share-icon {
        background-size: 100% 100%;
        width: 1.05rem;
        height: 1.05rem;
        display: inline-block;
        position: relative;
      }
      .social-share .icon-wechat .wechat-qrcode {
        display: none;
        border: 1px solid #eee;
        position: absolute;
        z-index: 80000;
        top: -205px;
        left: -84px;
        width: 200px;
        height: 192px;
        color: #666;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 2px 10px #aaa;
        transition: all 200ms;
        -webkit-tansition: all 350ms;
        -moz-transition: all 350ms
      }
      .social-share .icon-wechat .wechat-qrcode.bottom {
        top: 40px;
        left: -84px
      }
      .social-share .icon-wechat .wechat-qrcode.bottom:after {
        display: none
      }
      .social-share .icon-wechat .wechat-qrcode h4 {
        font-weight: normal;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        background-color: #f3f3f3;
        margin: 0;
        padding: 0;
        color: #777
      }
      .social-share .icon-wechat .wechat-qrcode .qrcode {
        width: 105px;
        margin: 10px auto
      }
      .social-share .icon-wechat .wechat-qrcode .qrcode table {
        margin: 0 !important
      }
      .social-share .icon-wechat .wechat-qrcode .help p {
        font-weight: normal;
        line-height: 16px;
        padding: 0;
        margin: 0
      }
      .social-share .icon-wechat .wechat-qrcode:after {
        content: '';
        position: absolute;
        left: 50%;
        margin-left: -6px;
        bottom: -13px;
        width: 0;
        height: 0;
        border-width: 8px 6px 6px 6px;
        border-style: solid;
        border-color: #fff transparent transparent transparent
      }
      .social-share .icon-wechat:hover .wechat-qrcode {
        display: block
      }
    }
  }

</style>
