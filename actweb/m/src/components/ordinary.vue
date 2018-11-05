<template>
  <div v-transfer-dom>
    <x-dialog v-model="dt.show" class="kaiser_dialog" :dialog-class="'weui-dialog '+dt.type"
              @on-show="beforeShow()"
              :hideOnBlur="true">
      <span class="close-btn" @click="closeDialog()"></span>
      <template v-if="dt.type === 'k-4'">
        <div class="k4-title">
          <span :class="'title-'+dt.data.gnum"></span>
        </div>
        <div class="k4-subtitle">
          <span class="sub-title-k-4" :class="'sub-title-'+dt.data.gnum"></span>
        </div>
        <div class="giftBox clearfix">
          <div class="item">
            <p class="dialogGiftBg">
              <img :src="'/static/zt/pc/img/icon/'+dt.data.gnum+'1.png'"
                   alt=""></p>
            <p>{{giftDescs[dt.data.gnum][0]}}</p></div>
          <div class="item">
            <p class="dialogGiftBg">
              <img :src="'/static/zt/pc/img/icon/'+dt.data.gnum+'2.png'"
                   alt=""></p>
            <p>{{giftDescs[dt.data.gnum][1]}}</p></div>
          <div class="item">
            <p class="dialogGiftBg">
              <img :src="'/static/zt/pc/img/icon/'+dt.data.gnum+'3.png'"
                   alt="">
            </p>
            <p>{{giftDescs[dt.data.gnum][2]}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="dt.type === 'k-5'">
        <div class="t1"><span>{{dt.data.text}}</span></div>
        <div class="t2">
          <span class="t2-text">{{dt.data.long}}</span>
          <template v-if="dt.data.id == 3 || dt.data.id == 10">
            <span class="icon-bag-10">
            </span>
          </template>
        </div>


      </template>
      <template v-else-if="dt.type === 'k-3'">
        <div class="k3-title-1">
          <span></span>
        </div>
        <div class="k3-subtitle-1">
        </div>
        <div class="k3-inner-1">
          <template v-if="dt.data.length===0">
            <span class="desc">{{dt.Issend?'暂无好友接受邀请！':'接受好友邀请参与公测预约即可获得限定称号等豪礼！并可参与抽奖，每抽必中哦！'}}</span>
          </template>
          <template v-else>
            <ul>
              <li v-for="n in dt.data" class="item u-border-50">小主 {{n}}<span>已入宫</span>
              </li>
            </ul>
            <p class="invitedNum">已有 <span style="color: #d8b247">{{dt.data.length}}</span> / 5 名小主赴约</p>
          </template>
        </div>
        <button class="k3-btn-1" type="button" @click="acceptInv()">{{dt.Issend?'携友入宫':'接受好友邀请'}}</button>

      </template>
      <template v-else-if="dt.type === 'k-1'">
        <div class="k1-title">
          <span></span>
        </div>
        <div class="k1-subtitle"><span>分享下方二维码邀请好友</span></div>
        <div class="k1-container">
          <img style="width: 2.5rem;height: auto;" :src="qrSrc" alt="">
        </div>
      </template>
    </x-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        giftDescs: {
          "g1": ["银饼*18888", "豪华诗会函*3", "玫瑰*10"],
          "g2": ["金饼*20", "银饼*28888", "学识礼包*5"],
          "g3": ["金饼*30", "仙柳露*3", "花魂养成礼包*10"],
          "g4": ["金饼*50", "诰命*300", "学识礼包*5"],
          "g5": ["金兰*10", "君桃*1", "学识礼包*3"]
        },
        qrSrc: ''
      }
    },
    computed: {
      ...mapState([
        'dt'
      ]),
      userInfo() {
        return this.$store.state.index.userInfo
      }
    },
    mounted() {
    },
    methods: {
      closeDialog() {
        this.$store.commit('updateDialogType', {data: {}, show: false, type: ''})
      },
      acceptInv() {
        if (this.dt.Issend) {
          //   this.closeDialog();
          this.$store.commit('updateDialogType', {data: this.userInfo.mobile, show: true, type: 'k-1'});
          this.beforeShow();
        } else {
          const inv = this.dt.inviteId;
          this.closeDialog();
          this.$store.commit('updateDialogStatus', {dialogStatus: true, inviteId: inv});

        }
      },
      beforeShow() {
        if (this.dt.type === 'k-1') {
          this.$store.dispatch('INVCODE', {userId: this.dt.data}).then(res => {
            if (res.code === 10000) {
              this.qrSrc = res.data.imgUrl
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/css/base.less";

  .close-btn {
    width: 0.7rem;
    height: 0.7rem;
    right: auto;
    top: auto;
    bottom: -1rem;
    .posMiddle(x, absolute);
    cursor: pointer;
    border: 2px solid #d8b247;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    background: url('../assets/img/dialog-close.png') no-repeat;
    background-size: contain;
  }

  .kaiser_dialog {
    .k-1 {
      overflow: visible;
      background: url("../assets/img/k-1.png") no-repeat center;
      background-size: 100% 100%;
      width: 4.38rem;
      height: 4.4rem;
      .k1-title {
        span {
          background: url("../assets/img/invite-title.png") no-repeat center;
          background-size: 100% 100%;
          width: 2.66rem;
          height: 0.65rem;
          display: inline-block;
        }
      }
      .k1-subtitle {
        span {
          text-align: center;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.4rem;
          letter-spacing: 0px;
          color: #606162;
          padding: 0 0.40rem;
          display: block;
        }
      }
    }
    .k-3 {
      overflow: visible;
      background: url("../assets/img/k-3.png") no-repeat center;
      background-size: 100% 100%;
      width: 4.38rem;
      height: 4.9rem;
      .k3-title-1 {
        margin-top: 0.55rem;
        span {
          background: url(../assets/img/g-title-3.png) no-repeat center;
          background-size: 100% 100%;
          width: 2.66rem;
          height: 0.65rem;
          display: inline-block;
        }
      }
      .k3-subtitle-1 {
        span {
          text-align: center;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.4rem;
          letter-spacing: 0px;
          color: #606162;
          padding: 0 0.40rem;
          display: block;
        }
      }
      .k3-inner-1 {
        padding: 0 0.42rem;
        ul {
          list-style: none outside none;
          min-height: 1.7rem;
          li {
            font-size: .25rem;
            span {
              border: none;
              color: #fff;
              height: 0.25rem;
              line-height: 0.25rem;
              vertical-align: middle;
              width: 0.8rem;
              background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
              font-size: .14rem;
              display: inline-block;
              margin-left: 3px;
              border-radius: 2px;
            }
          }
        }
        .invitedNum {
          text-align: center;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.4rem;
          letter-spacing: 0px;
          color: #606162;
          padding: 0 0.40rem;
          display: block;
        }
      }
      .k3-btn-1 {
        border-radius: 10px;
        border: none;
        color: #fff;
        height: 0.54rem;
        width: 2.46rem;
        background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
        font-size: 0.3rem;
      }
      .desc {
        min-height: 1.7rem;
        text-align: center;
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.4rem;
        letter-spacing: 0px;
        color: #606162;
        display: block;
        padding: 0 0.40rem;
      }
    }
    .k-4 {
      overflow: visible;
      background: url("../assets/img/k-4.png") no-repeat center;
      background-size: 100% 100%;
      width: 8.2rem;
      height: 4.4rem;
      .k4-title {
        margin-top: 0.6rem;
        span {
          display: inline-block;
        }
      }
      .k4-subtitle {
        span {
          display: inline-block;
        }
      }
      .giftBox {
        width: 100%;
        margin: 0.2rem auto 0;
        display: flex;
        justify-content: center;
        .item {
          text-align: center;
          color: #000000;
          width: 1.24rem;
          font-size: 0.14rem;
          padding: 0 0.1rem;
          .dialogGiftBg {
            width: 1.04rem;
            height: 1.05rem;
            text-align: center;
            background: url(../assets/img/giftBg.png) no-repeat center;
            background-size: 100%;
            margin: 0 auto;
            img {
              width: 0.7rem;
              position: relative;
              top: 0.19rem;
            }
            p {

            }
          }
        }
      }
    }
    .k-5 {
      overflow: visible;
      background: url("../assets/img/k-5.png") no-repeat center;
      background-size: 100% 100%;
      width: 5.74rem;
      height: 3.08rem;
      .t1 {
        margin-top: 0.25rem;
        span {
          font-size: 0.25rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.32rem;
          letter-spacing: 0px;
          color: #ee505f;
        }
      }
      .t2 {
        height: 1.90rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        span.t2-text {
          text-align: center;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.4rem;
          letter-spacing: 0px;
          color: #606162;
          padding: 0 0.40rem;
          display: block;
        }

      }
    }
  }

  .title-g1 {
    background: url(../assets/img/d-title-1.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.43rem;
    height: 0.77rem;
  }

  .title-g2 {
    background: url(../assets/img/d-title-2.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.43rem;
    height: 0.77rem;
  }

  .title-g3 {
    background: url(../assets/img/d-title-3.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.43rem;
    height: 0.77rem;
  }

  .title-g4 {
    background: url(../assets/img/d-title-4.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.43rem;
    height: 0.77rem;
  }

  .title-g5 {
    background: url(../assets/img/d-title-5.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.43rem;
    height: 0.77rem;
  }

  .sub-title-g1 {
    background: url(../assets/img/k4-subtitle-1.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.99rem;
    height: 0.22rem;
  }

  .sub-title-g2 {
    background: url(../assets/img/k4-subtitle-2.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.99rem;
    height: 0.22rem;
  }

  .sub-title-g3 {
    background: url(../assets/img/k4-subtitle-3.png) no-repeat center;
    background-size: 100% 100%;
    width: 4.01rem;
    height: 0.22rem;
  }

  .sub-title-g4 {
    background: url(../assets/img/k4-subtitle-4.png) no-repeat center;
    background-size: 100% 100%;
    width: 3.99rem;
    height: 0.22rem;
  }

  .sub-title-g5 {
    background: url(../assets/img/k4-subtitle-5.png) no-repeat center;
    background-size: 100% 100%;
    width: 4.12rem;
    height: 0.22rem;
  }

  .icon-bag-10 {
    display: inline-block;
    background-image: url(../assets/img/bag-10.png);
    background-size: 100%;
    width: 1.18rem;
    height: 1.18rem;
  }

</style>
