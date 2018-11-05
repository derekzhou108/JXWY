<template>
  <div v-transfer-dom>
    <x-dialog v-model="k2.show" @on-show="error_msg='';phone_num=''" class="kaiser_dialog"
              :dialog-class="'weui-dialog k-2 '+k2.type"
              :hideOnBlur="true">
      <span class="close-btn" @click="closeDialog()"></span>
      <template v-if="k2.type === 'k-2-1'">
        <div class="title">
          <p>请填写您的预约手机号</p>
        </div>
        <div class="body">
          <section class="form-wrapper">
            <input type="text" class="data-text" id="tel2" placeholder="输入手机号码" v-model="phone_num" maxlength="11"/>
          </section>
        </div>
        <div class="footer">
          <div class="button-wrap">
            <button type="button" @click="submitTel()">确认</button>
          </div>
        </div>
        <p class="error-msg">{{error_msg}}</p>
      </template>
      <template v-else-if="k2.type === 'k-2-2'">
        <div class="title">
          <strong class="pub-title">恭喜小主中奖</strong>
        </div>
        <div class="body">
          <span :class="'gf-item-'+k2.data.index"></span>
          <p>{{k2.data.name}}</p>
        </div>
        <div class="button-wrap">
          <button type="button" @click="closeDialog()">确认</button>
        </div>
      </template>
      <template v-else-if="k2.type === 'k-2-3'">
        <div class="title">
          <p>抽奖次数剩余：<span style="color: red"> {{k2.data}}</span></p>
        </div>
        <div class="body">
          <p>邀请好友参与公测预约即可获得抽奖机会哦！</p>
        </div>
        <div class="button-wrap">
          <button type="button" @click="invite()">立即邀请好友</button>
        </div>
      </template>
      <template v-else-if="k2.type === 'k-2-4'">
        <div class="title"><span>请小主填写邮寄地址哦！</span></div>
        <div class="body">
          <div class="item">
            <label for="exchangeAddress">收件人地址</label>
            <input type="text" class="data-text" id="exchangeAddress" v-model="exchangeAddress"/>
          </div>
          <div class="item">
            <label for="exchangePhone">联系电话</label>
            <input type="text" class="data-text" id="exchangePhone" v-model="exchangePhone"/>
          </div>
        </div>
        <div class="msg-container"><span class="error-msg">{{error_msg}}</span></div>
        <div class="footer">
          <button type="button" class="dialog-btn" @click="sub1">确认</button>
        </div>
      </template>
    </x-dialog>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'k-2',
    data() {
      return {
        phone_num: '',
        error_msg: '',
        exchangeAddress: '',
        exchangePhone: ''

      }
    },
    computed: {
      ...mapState([
        'k2'
      ]),
      userInfo() {
        return this.$store.state.index.userInfo
      }
    },
    methods: {
      closeDialog() {
        this.$store.commit('updateDialogK2', {data: {}, show: false, type: ''})
      },
      submitTel() {
        if (!this.phone_num) {
          this.error_msg = '手机号码不能为空';
          return;
        }
        if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone_num)) {
          this.error_msg = '手机号码格式不正确';
          return;
        }
        this.$store.dispatch('USERINFO', {
          phone: this.phone_num
        }).then(res => {
          this.closeDialog();
          if (res.code === 10000) {
            this.$store.commit('updateUserInfo', res.data)
          }
          else if (res.code = 10007) {
            this.$store.commit('updateDialogK6', {show: true, type: 'k-6-2'})
          }

        })
      },
      invite() {
        this.closeDialog();
        this.$store.commit('updateDialogType', {data: this.userInfo.user_id, show: true, type: 'k-1'})
      },

      sub1() {
        if (!this.exchangeAddress) {
          this.error_msg = '收件人地址不能为空';
          return;
        }
        if (!/^1(3|4|5|7|8)\d{9}$/.test(this.exchangePhone)) {
          this.error_msg = '手机号码格式不正确';
          return;
        }
        if (this.k2.data.type === 'dl') {
          this.$store.dispatch('getEx', {
            userId: this.userInfo.user_id,
            type: 2,
            id: this.k2.data.pId,
            exchangeAddress: this.exchangeAddress,
            exchangePhone: this.exchangePhone,
            pType: this.k2.data.pType
          }).then(res => {
            this.closeDialog();
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
          });
        } else if (this.k2.data.type === 'ex') {
          this.$store.dispatch('getEx', {
            userId: this.userInfo.user_id,
            type: 1,
            id: this.k2.data.pId,
            exchangeAddress: this.exchangeAddress,
            exchangePhone: this.exchangePhone,
            pType: this.k2.data.pType
          }).then(res => {
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
          });
        }
      }
    }

  }
</script>

<style lang="less">
  .kaiser_dialog {
    .k-2 {
      overflow: visible;
      background: url("../assets/img/k-2.png") no-repeat center;
      background-size: 100% 100%;
      width: 4.38rem;
      height: 3.12rem;
      max-width: 4.38rem;
    }
  }

  .k-2-1 {
    padding-top: 0.25rem;
    .title {
      margin-top: 0.35rem;
      p {
        text-align: center;
        font-size: 0.26rem;
        font-weight: bold;
        font-stretch: normal;
        line-height: 0.4rem;
        letter-spacing: 0px;
        color: #606162;
        padding: 0 0.40rem;
        display: block;
        &.pub-title {

        }
      }
    }
    .body {
      margin-top: 0.2rem;
    }
    .footer {
      .button-wrap {
        height: 0.54rem;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        padding: 0;
        border: none;
        width: 1.3rem;
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
    }
    .error-msg {
      text-align: center;
      color: #d8b247;
      font-weight: 600;
      font-size: 0.24rem;
    }
  }

  .k-2-2 {
    padding: 0.3rem;
    .title {
      color: #d1a62d;
      .pub-title {
        font-size: 0.36rem;
      }
    }
    .body {
      min-height: 1rem;
      p {
        font-size: .24rem;
      }
    }
    .button-wrap {
      height: 0.54rem;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      padding: 0;
      border: none;
      width: 1.3rem;
      margin: 0 auto;

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
  }

  .k-2-3 {
    padding: 0.4rem;
    .title {
      margin-top: 0.15rem;
      p {
        text-align: center;
        font-size: 0.26rem;
        font-weight: bold;
        font-stretch: normal;
        line-height: 0.4rem;
        letter-spacing: 0px;
        color: #606162;
        padding: 0 0.40rem;
        display: block;
        &.pub-title {

        }
      }
    }
    .body {
      margin-top: 0.15rem;
      p {
        font-size: 0.22rem;
      }
    }
    .button-wrap {
      height: 0.54rem;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      padding: 0;
      border: none;
      width: 2.3rem;
      margin: 0.2rem auto 0.1rem;

      > button {
        border: none;
        color: #fff;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
        font-size: 0.26rem;
        font-weight: bold;
      }
    }
  }

  .k-2-4 {
    padding-top: 0.25rem;
    .title {
      margin-top: 0.35rem;
      span {
        font-size: 0.25rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.32rem;
        letter-spacing: 0px;
        color: #ee505f;
      }
    }
    .body {
      .item {
        margin-top: 0.1rem;
        label {
          font-size: 0.24rem;
          color: #606162;
          // margin-right: 14px;
          display: inline-block;
          width: 1.3rem;
          text-align: right;
        }
        select, input {
          width: 2.16rem;
          height: 0.36rem;
          box-shadow: 0px 1px 0px 0px #ffffff;
          border: solid 1px #edd495;
        }
        input {
          text-indent: 6px;
        }
      }
    }
    .footer {
      height: 0.54rem;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      padding: 0;
      border: none;
      width: 1.3rem;
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
  }

  .gf-item-loop(@n, @i:1) when (@i <= @n) {
    .gf-item-@{i} {
      background: url("../assets/img/pri-item-@{i}.png") no-repeat center;
      background-size: 100%;
      width: 0.88rem;
      height: 0.92rem;
      display: inline-block;
    }
    .gf-item-loop(@n, (@i + 1));
  }

  .gf-item-loop(12);
</style>
