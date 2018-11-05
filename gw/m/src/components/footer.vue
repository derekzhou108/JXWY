<template>
  <div class="footerComponent">

    <!-- 分享 -->
    <div class="share-warp flex  flex-center">
      <a class="flex-col-33" @click="showQR = true">
        <img src="../assets/img/share-gz.png" alt="关注公众号">
        <span>关注公众号</span>
      </a>
      <a class="flex-col-33" href="//weibo.com/jxwysy">
        <img src="../assets/img/share-wb.png" alt="关注微博">
        <span>关注微博</span>
      </a>
      <a class="flex-col-33" @click="showShare = true">
        <img src="../assets/img/share-xhb.png" alt="分享小伙伴">
        <span>分享小伙伴</span>
      </a>
    </div>

    <!-- 底部版权 -->
    <div class="footer-warp">
      <div class="footer-border"></div>
      <div class="clearfix footer-info">
        <div class="info">
          <p>
            <a style="border:none;color: #000;">联系我们：0755-86531031</a>
          </p>
          <p class="copyright">
            <a href="//www.ccm.gov.cn/" style="color:#333333;margin-right: .15rem;" target="_blank">粤网文（2017）3800-729号</a>
          </p>
          <p class="copyright">
            <a href="//www.miitbeian.gov.cn" style="color:#333333;" target="_blank">粤ICP备17047563号-2</a>
          </p>
          <p class="u-fs20" style="line-height: 100%; margin-bottom: .07rem;margin-top: .05rem">
            <a target="_blank" href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001339"><img
              style="width: .16rem;position: relative;top: .03rem;"
              src="//cdn.ksgame.com/ksgame/pc2/dist/img/foreground/icon_yuewangga1.png" alt=""></a>
            <a target="_blank" href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001339"
               style="color: #333333;text-decoration: underline;">粤公网安备 44030502001339号</a>
            <span style="margin-left:.010rem">深圳金翅鸟信息科技有限公司</span>
          </p>
          <p class="u-fs20">增值电信业务经营许可证：粤B2-20170497</p>
          <p class="copyright">Copyright © 2017 jinchiniao. All rights reserved.</p>
        </div>
      </div>
    </div>

    <!-- 分享模态框 -->
    <div v-transfer-dom>
      <x-dialog v-model="showShare" class="dialog-share-warp" hide-on-blur :dialog-class="'weui-dialog k-share'">
        <div class="dialog-share-body">
          <!-- <div class="close-warp">
  <div class="btn-close" @click="closeVideoDialog"></div>
</div> -->
          <div class="share-copy-component">
            <a href="javascript:void(0);" v-clipboard:copy="message" v-clipboard:success="onCopy"
               class="icon-copy"></a>
          </div>
          <share :config="config"></share>
          <!--<div class="dialog-content flex  ">
            <dl class="flex-item" v-clipboard:copy="message" v-clipboard:success="onCopy">
              <dt><img src="../assets/img/share-alert-lj.png" alt="复制链接"></dt>
              <dd>复制链接</dd>
            </dl>
            <dl class="flex-item">
              <dt><img src="../assets/img/share-alert-wx.png" alt="微信" @click="callShare('wechatFriend')"></dt>
              <dd>微信</dd>
            </dl>
            <dl class="flex-item">
              <dt><img src="../assets/img/share-alert-wb.png" alt="微博" @click="callShare('weibo')"></dt>
              <dd>微博</dd>
            </dl>
            <dl class="flex-item">
              <dt><img src="../assets/img/share-alert-kj.png" alt="空间" @click="callShare('qZone')"></dt>
              <dd>空间</dd>
            </dl>

          </div>-->
        </div>
      </x-dialog>
    </div>

    <!-- 关注公众号 -->
    <div v-transfer-dom>
      <x-dialog v-model="showQR" class="dialog-QR-warp" hide-on-blur>
        <img src="../assets/img/ewm_jxwy_new.png" alt="关注公众号">
        <p>长按二维码关注公众号</p>
        <p>jxwygame</p>
      </x-dialog>
    </div>
  </div>

</template>
<script>
  import {Toast, TransferDomDirective as TransferDom, XDialog} from "vux";
  import Vue from "vue";
  // import NativeShare from 'nativeshare'
  export default {
    directives: {
      TransferDom,
      Toast
    },
    components: {
      XDialog
    },
    data() {
      return {
        showShare: false,
        showQR: false,
        message: "//jxwy.ksgame.com/",
        config: {
          url: '//jxwy.ksgame.com', // 网址，默认使用 window.location.href
          source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title: '《锦绣未央》手游官网-电视剧正版授权-精英技术封测预约开启', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          description: '', // 描述, 默认读取head标签：<meta name="description" content="" />
          image: '', // 图片, 默认取网页中第一个img标签
          sites: ['wechat', 'weibo', 'qzone'], // 启用的站点
          wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper: '<p>微信扫一扫打开网站，</p><p>点击右上角"···"按钮分享给好友们~</p>'
        }
      };
    },
    methods: {
      onCopy: function (e) {
        this.$vux.toast.text("复制成功");
      },
      callShare: name => {
        try {
          Vue.nativeShare.call(name);
        } catch (err) {
          alert(err)
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .footerComponent {
    //分享
    .share-warp {
      height: 1.15rem;
      background-color: #a48d66;
      color: #ffeec6;
      font-size: 0.26rem;
      text-align: center;
      img {
        vertical-align: middle;
        height: 0.42rem;
        width: 0.42rem;
      }
    }

    // 底部版权
    .footer-warp {
      text-align: center;
      width: 100%;
      min-height: 3.22rem;
      background: #ded6d4;
      .footer-border {
        background: url("../assets/img/border-bottom.jpg") repeat-x;
        height: 0.2rem;
        width: 100%;
        background-size: contain;
      }
      .footer-info {
        .logo {
          margin-top: 0.33rem;
          margin-left: 0.32rem;
          margin-right: 0.3rem;
          background: url("../assets/img/logo-zy.png") no-repeat;
          width: 2.13rem;
          height: 0.79rem;
          background-size: 100% 100%;
        }
        .info {
          margin: 0.3rem 0;
          p {
            font-size: 0.18rem;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  // 分享模态框
  .icon-copy {
    background: url("../assets/img/share-alert-lj.png") no-repeat;
    background-size: 100% 100%;
    width: 1.05rem;
    height: 1.05rem;
    display: inline-block;
    position: relative;
    font-size: 20px;
    line-height: 32px;
    color: #666;
    text-align: center;
    vertical-align: middle;
    transition: background 0.6s ease-out 0s;
  }

  .dialog-share-body {
    display: flex;
    justify-content: space-around;
    .share-component {
      flex: 3;
    }
    .share-copy-component {
      flex: 1;
    }
  }

  .dialog-share-warp {
    .k-share {
      overflow: visible;
      background-color: transparent;
      width: 80%;
      max-width: 7.5rem;
      .social-share {
        display: flex;
        justify-content: space-around;
      }
      .social-share a {
      }
      .social-share .icon-qq:before, .social-share .icon-wechat:before {
        content: none;
      }
      .social-share .icon-copy {

      }
      .social-share .icon-weibo {
        background: url("../assets/img/share-alert-wb.png") no-repeat;
      }
      .social-share .icon-wechat {
        background: url("../assets/img/share-alert-wx.png") no-repeat;
      }
      .social-share .icon-qzone {
        background: url("../assets/img/share-alert-kj.png") no-repeat;
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

  .dialog-QR-warp {
    .weui-dialog {
      background-color: rgba(0, 0, 0, 0) !important;
      color: #fff;
    }
    p {
      margin-top: 0.08rem;
      font-size: 0.24rem;
    }
  }
  .social-share .icon-wechat,.social-share .icon-weibo,.social-share .icon-qzone{
    color: inherit !important;
    border-color: inherit  !important;
    border:none !important;
  }
  .social-share .icon-weibo:before,.social-share .icon-qzone:before{
    display:none;
  }
</style>

