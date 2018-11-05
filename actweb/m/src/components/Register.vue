<template>
  <div v-transfer-dom>
    <x-dialog v-model="register.show" @on-show="error_msg='';" class="kaiser_dialog"
              :dialog-class="'weui-dialog k-'+register.type"
              :hideOnBlur="true">
      <span class="close-btn" @click="closeDialog()"></span>
      <div class="login">
        <div class="login-header"><span></span></div>
        <div class="content">
          <section class="tab-menu">
            <ul class="menu">
              <li class="item" :class="{active:isPhoneSelect===1}"
                  @click="isPhoneSelect=1;error_msg=''"><em class="text">手机</em></li>
              <li class="item" :class="{active:isPhoneSelect===2}"
                  @click="isPhoneSelect =2;error_msg=''"><em
                class="text">用户名</em></li>
            </ul>
          </section>
          <template v-if="isPhoneSelect === 1">
            <section class="form-wrapper">
              <input type="text" class="data-text" placeholder="请输入手机号" v-model="username" maxlength="11"/>
              <button type="button" class="get-code" @click="getCode">{{code_text}}</button>
            </section>
            <section class="form-wrapper">
              <input type="text" class="data-text" id="code" placeholder="请输入验证码" maxlength="6" v-model="sms_code"/>
            </section>
            <section class="form-wrapper">
              <input type="text" class="data-text" placeholder="请输入密码" v-model="password" maxlength="11"/>
            </section>
          </template>
          <template v-else-if="isPhoneSelect === 2">
            <section class="form-wrapper">
              <input type="text" class="data-text" placeholder="请输入用户名" v-model="username" maxlength="11"/>
            </section>
            <section class="form-wrapper">
              <input type="text" class="data-text" placeholder="请输入密码" v-model="password" maxlength="11"/>
            </section>
          </template>
        </div>
        <div class="arg">注册表示您同意<a href="http://kscdn.ksgame.com/adminIP/home.html"
                                    target="_blank">《凯撒用户协议》</a><br/>
        </div>
        <div class="arg">
          <a @click="gotoLogin" class="account-has">已有帐号</a>
        </div>
        <div class="btn">
          <button type="button" class="login-btn" @click="subInfo">注册并登录</button>
        </div>
        <p class="error-msg">{{error_msg}}</p>
      </div>
    </x-dialog>
  </div>

</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: 'register',
    data() {
      return {
        username: '',
        password: '',
        isAbled: true,
        error_msg: '',
        isPhoneSelect: 1,
        phone_num: '',
        sms_code: '',
        code_text: '发送验证码'
      }
    },
    computed: {
      ...mapState([
        'register'
      ]),
      userInfo() {
        return this.$store.state.index.userInfo
      }
    },
    methods: {
      gotoLogin(){
        this.closeDialog();
        this.$store.commit('loginDg', {show: true, type: 'login'})
      },
      closeDialog() {
        this.$store.commit('registerDg', {data: {}, show: false, type: 'register'})
      },
      getCode() {
        const tel = this.username;
        if (tel) {
          if (!/^1(3|4|5|7|8)\d{9}$/.test(tel)) {
            this.error_msg = '手机号码格式不正确';
          } else {
            this.doCode(tel, 'reg')
          }
        } else {
          this.error_msg = '手机号码不能为空！';
        }
      },
      subInfo() {
        if (!this.username || !this.password) {
          this.error_msg = '请输入帐号和密码！';
          return;
        }
        let data =this.isPhoneSelect===1? {
          "username": this.username,
          "sms_code": this.sms_code,
          "password": this.password
        }:{
          "username": this.username,
          "password": this.password
        };
        this.$store.dispatch('SDK_REGISTER', data)
          .then(res => {
            if (res.code === 10000) {
              //this.$store.commit('updateUserInfo', res.data);
              this.closeDialog();
              this.$store.dispatch('SDK_LOGIN', {"username": this.username,
                "password": this.password})
                .then(res => {
                  if (res.code === 10000) {
                    this.$store.commit('updateUserInfo', res.data);
                    this.closeDialog();
                  } else {
                    this.error_msg = res.msg
                  }
                }, ({mes}) => {
                  this.error_msg = mes
                })
            } else {
              this.error_msg = res.msg
            }
          }, ({mes}) => {
            this.error_msg = mes
          })
      },
      doCode(tel, type) {
        if (this.isAbled) {
          this.$store.dispatch('APOCODE', {
            phone: tel,
            type: type
          }).then(res => {
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
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/css/base.less";

  .kaiser_dialog {
    .k-register {
      overflow: visible;
      background: url("../assets/img/k-9.png") no-repeat center;
      background-size: 100% 100%;
      width: 4.38rem;
      height: 5.95rem;
      max-width: 4.38rem;
      .arg{
        color: #565656;
        font-size: 0.16rem;
        text-align: left;
        margin: 0.1rem auto;
        padding-left: 0.4rem;
        a{
          color: #fd6443
        }
        .account-has{
          color: #565656;
          font-size: 0.16rem;
        }
      }
      .login {
        overflow: hidden;
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
            width: 3.6rem;
            padding-left: .12rem;
            font-size: 0.16rem;
            outline: none;
          }
          .get-code {
            position: absolute;
            right: 0.4rem;
            top: 0px;
            background: #e5b220;
            color: #fff;
            width: 1.4rem;
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
        .error-msg {
          text-align: center;
          color: #d8b247;
          font-weight: 600;
          font-size: 0.24rem;
          width: 80%;
          margin: 0 auto;
          &.error-tag {
            font-size: 0.18rem;
          }
        }
        .link {
          color: #555;
          padding-right: 15%;
          font-size: 0.14rem;
          text-align: right;
          margin-top: 0.15rem;
        }
        .line {
          color: #d9dce1
        }
        .btn {
          height: 0.54rem;
          box-sizing: border-box;
          border-radius: 10px;
          overflow: hidden;
          padding: 0;
          border: none;
          width: 2.3rem;
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
      .login-header {
        margin-top: 0.4rem;
        span {
          background: url("../assets/img/download/register.png") no-repeat;
          background-size: 100% 100%;
          width: 2.66rem;
          height: 0.65rem;
          display: inline-block;
        }

      }
    }
    .dg-input {
      position: relative;
      line-height: 0.54rem;
      margin: 0.2rem auto 0;
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

    }
  }
</style>
