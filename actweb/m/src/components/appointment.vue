<template>
  <div class="">
    <!--创建预约-->
    <div v-transfer-dom>
      <x-dialog @on-show="dialogShow()" v-model="dialogStatus" class="kaiser_dialog"
                :dialog-class="'weui-dialog dialog_yy k-3'">
        <div class="bground">
          <span class="close-btn" @click="closeDialog()"></span>
          <div class="d-title">
            <h4 class="main-title"></h4>
            <span class="sub-title">请选择您的手机系统，以便正常接收礼包激活码</span>
          </div>
          <div class="content">
            <section class="tab-menu">
              <ul class="menu">
                <li class="item" :class="{active:isPhoneSelect===1}"
                    @click="isPhoneSelect=1;phone_type = 1"><em class="text">ios用户</em></li>
                <li class="item" :class="{active:isPhoneSelect===2}"
                    @click="isPhoneSelect =2;phone_type = 2"><em
                  class="text">安卓用户</em></li>
              </ul>
            </section>
            <section class="form-wrapper">
              <input type="text" class="data-text" id="tel" placeholder="输入手机号码" v-model="phone_num" maxlength="11"/>
            </section>
            <section class="form-wrapper">
              <input type="text" class="data-text" id="code" placeholder="输入验证码" maxlength="6" v-model="ewm_code"/>
              <button type="button" class="get-code" @click="getCode()">{{code_text}}</button>
            </section>
          </div>
          <div class="confirm-wrapper">
            <button type="button" class="vote" @click="appointmentCreate()">立即预约</button>
          </div>
          <p class="error-msg">{{error_msg}}</p>
        </div>

      </x-dialog>
    </div>

    <!--预约失败-->
    <div v-transfer-dom>
      <x-dialog v-model="showError" class="dialog_error">
        <div class="d-body">
          <div ref="errorBox" class="mes">{{showErrorMsg}}</div>
        </div>
      </x-dialog>
    </div>

    <!--预约成功-->
    <div v-transfer-dom>
      <x-dialog v-model="showSuccess" class="kaiser_dialog" :dialog-class="'weui-dialog k-3'">
        <span class="close-btn" @click="showSuccess=false"></span>
        <div class="k3-success-title">
          <strong>恭喜您</strong>
          <p>已经成功参与公测预约</p>
        </div>
        <div class="k3-success-subtitle">
          <p>您还可以邀请好友获得</p>
          <p>更多福利以及抽奖机会哦</p>
        </div>
        <div class="k3-success-invite-btn">
          <button type="button" @click="showInviteDialog()">立即邀请好友</button>
        </div>

        <div class="k3-success-qr">
          <img alt="二维码" title="公众号二维码" src="../assets/img/share-qr.png">
          <p>扫码关注微信更多福利抢先知</p>
        </div>
      </x-dialog>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import * as util from '../utils'
  import {mapState} from 'vuex'
  import {TransferDomDirective as TransferDom, XDialog} from 'vux'

  export default {
    directives: {
      TransferDom,
    },
    components: {
      XDialog
    },
    data() {
      return {
        isPhoneSelect: 1,
        showSuccess: false,
        showError: false,
        showIsExit: false,
        showErrorMsg: "",
        phone_num: "",
        ewm_code: "",
        phone_type: 1,
        error_msg: '',
        isAbled: true,
        code_text: '获取验证码'
      }
    },
    computed: {
      ...mapState([
        'dialogStatus',
        'inviteId'
      ])
    },
    methods: {
      dialogShow() {
        this.phone_num = "";
        this.ewm_code = "";
        this.error_msg = "";

      },
      closeDialog() {
        this.$store.commit('updateDialogStatus', {dialogStatus: false})
      },
      appointmentCreate() {
        if (!this.phone_num || !this.ewm_code) {
          this.error_msg = '手机号码或验证码不能为空';
          return;
        }
        if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone_num)) {
          this.error_msg = '手机号码格式不正确';
          return;
        }
        let data = {
          "mobile": this.phone_num,
          "code": this.ewm_code,
          "platform": this.isPhoneSelect,
          "friend_id": this.inviteId,
          "qq": ""
        };
        this.$store.dispatch('POST_APPOINTMENT', data)
          .then(res => {
            if (res.code == 10000) {
              const values = util.deepClone(res.data, {
                mobile: this.phone_num
              });
              this.$store.commit('updateUserInfo', values);
              this.closeDialog();
              this.$store.commit('updateNum');
              this.showSuccess = true
            } else {
              this.error_msg = res.msg
            }
          }, ({mes}) => {
            this.error_msg = mes
          })
      },

      getCode() {
        const tel = this.phone_num;
        if (tel) {
          if (!/^1(3|4|5|7|8)\d{9}$/.test(tel)) {
            this.error_msg = '手机号码格式不正确';
          } else {
            this.doCode(tel)
          }
        } else {
          this.error_msg = '手机号码不能为空！';
        }
      },
      doCode(tel) {
        if (this.isAbled) {
          this.$store.dispatch('SMSCODE', {mobile: tel}).then(res => {
            if (res.code === 10000) {
              let i = 60;
              this.isAbled = false;
              const timer = setInterval(() => {
                if (i > 0) {
                  i--;
                  this.code_text = "已发送(" + i + ")";
                } else {
                  this.code_text = "点击重新发送";
                  clearInterval(timer);
                  this.isAbled = true;
                }
              }, 1000);
              this.error_msg = res.msg;
            } else if (10001 === res.code) {
              // 该号码已经预约过
              this.error_msg = res.msg
            } else {
              this.error_msg = res.msg
            }
          });
        }
      },

      showInviteDialog() {
        this.showSuccess = false;
        this.$store.commit('updateDialogType', {data: this.phone_num, show: true, type: 'k-1'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/base.less";

  .kaiser_dialog {
    .k-3 {
      overflow: visible;
      background: url("../assets/img/k-3.png") no-repeat center;
      background-size: 100%;
      width: 4.38rem;
      height: 4.9rem;
      .bground {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0.42rem;
        .d-title{
          text-align: center;
        }
      }
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
        &:hover {
          transform: rotate(180deg)
        }
      }
      .main-title {
        vertical-align: middle;
        position: relative;
        text-align: center;
        width: 2.66rem;
        height: 0.65rem;
        margin: 0 auto 0.01rem;
        background-image: url(../assets/img/g-title-1.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      .sub-title {
        font-size: 8px;
        line-height: 10px;
        color: #989898;
        -webkit-text-size-adjust: none;
      }
      .content {
        margin-top: 0.1rem;
      }
      .error-msg {
        text-align: center;
        color: #d8b247;
        font-weight: 600;
        font-size: 0.24rem;
        &.error-tag {
          font-size: 0.18rem;
        }
      }

      .k3-success-title {
        color: #d1a62d;
        margin-top: 0.3rem;
        strong {
          font-size: 0.44rem;
        }
        p {
          font-size: 0.28rem;
        }
      }
      .k3-success-subtitle {
        text-align: center;
        p {
          font-size: 0.16rem;
          color: #989898;
        }
      }
      .k3-success-invite-btn {
        height: 0.54rem;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        padding: 0;
        border: none;
        width: 2.5rem;
        margin: 0.2rem auto 0.1rem;

        > button {
          border: none;
          color: #fff;
          height: 100%;
          width: 100%;
          background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
          font-size: 0.3rem;
          font-weight: bold;
        }

      }
      .k3-success-qr {
        img {
          width: 1.7rem;
          height: 1.7rem;
        }
        p {
          font-size: 0.14rem;
          color: #989898;
          opacity: 0.8;
        }
      }
    }
  }

  .tab-menu {
    font-size: 0;
    text-align: center;
    position: relative;
    margin-bottom: 0.25rem;
    &::after {
      content: "";
      z-index: 1;
      width: 80%;
      .posMiddle(x, absolute);
      border-top: 0.04rem solid rgb(235, 215, 159);
    }
    .menu {
      position: relative;
      &::before,
      &::after {
        content: "";
        position: absolute;
        z-index: 2;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        bottom: 0;
        background: rgb(235, 215, 159);
      }
      &::before {
        left: -10px;
      }
      &::after {
        right: -10px;
      }
    }
    .item {
      position: relative;
      cursor: pointer;
      z-index: 2;
      display: inline-block;
      vertical-align: top;
      width: 1.0rem;
      margin: 0 0.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      .text {
        vertical-align: middle;
        display: inline-block;
        color: rgb(152, 152, 152);
        font-weight: bold;
        font-size: 0.2rem;
      }
      &.active {
        border-bottom: 3px solid rgb(216, 178, 71);
        .text {
          color: rgb(216, 178, 71)
        }
        &::before,
        &::after {
          .posMiddle(y, absolute);
          //  @extend %d-decorate;
          content: "";
        }
        &::before {
          left: -20px;
        }
        &::after {
          right: -20px;
        }
      }
    }

  }

  .form-wrapper {
    position: relative;
    line-height: 0.54rem;
    margin: 0 auto 0.17rem;
    overflow: hidden;

    .data-text {
      border: 2px solid #e5b220;
      border-radius: 0.15rem;
      vertical-align: top;
      height: 0.54rem;
      width: 2.66rem;
      padding-left: .12rem;
      font-size: 0.16rem;
      outline: none;
    }
    .get-code {
      position: absolute;
      right: .45rem;
      top: 0px;
      background: #e5b220;
      color: #fff;
      width: 1.2rem;
      height: 0.54rem;
      line-height: 0.54rem;
      margin: 0;
      padding: 0;
      border-top-right-radius: 0.15rem;
      border-bottom-right-radius: 0.15rem;
      border: none;
      font-size: 0.16rem;
      &:hover {
        background: #d8b247;
      }
    }
  }

  .confirm-wrapper {
    height: 0.54rem;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    border: none;
    width: 2.26rem;
    margin: 0.2rem auto 0.1rem;
    & > button {
      border: none;
      color: #fff;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
      font-size: 0.3rem;
      font-weight: bold;
    }
  }

  .dialog_error {

    .weui-dialog {
      background: url("../assets/img/k-6.png") no-repeat center;
      width: 4.38rem;
      height: 2.37rem;
      background-size: 100% 100%;
      .d-body {
        position: relative;
        width: 100%;
        height: 100%;
        .mes {
          .posMiddle('', absolute);
          text-align: center;
          font-size: 0.2rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.4rem;
          letter-spacing: 0px;
          color: #606162;
        }
      }
    }
  }
</style>
