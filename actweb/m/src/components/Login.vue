<template>
  <div v-transfer-dom>
    <x-dialog v-model="login.show" @on-show="error_msg='';" class="kaiser_dialog"
              :dialog-class="'weui-dialog k-'+login.type"
              :hideOnBlur="true">
      <span class="close-btn" @click="closeDialog()"></span>
      <div class="login">
        <div class="login-header"><span></span></div>
        <div class="username dg-input "><input class="data-text" type="text" name="username" placeholder="请输入帐号或手机号"
                                               autocomplete="off" v-model="username"></div>
        <div class="password dg-input "><input class="data-text" v-model="password" type="password" name="password"
                                               placeholder="请输入密码"
                                               autocomplete="off"></div>
        <div class="link">
          <a class="f-psd" @click="forget">忘记密码</a>
          <span class="line">丨</span>
          <a class="reg-a" @click="register">注册</a>
        </div>
        <div class="btn">
          <button type="button" class="login-btn" @click="subInfo">登&nbsp;&nbsp;录</button>
        </div>
        <p class="error-msg">{{error_msg}}</p>
      </div>
    </x-dialog>
  </div>

</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        error_msg: ''
      }
    },
    computed: {
      ...mapState([
        'login'
      ]),
      userInfo() {
        return this.$store.state.index.userInfo
      }
    },
    methods: {
      closeDialog() {
        this.$store.commit('loginDg', {data: {}, show: false, type: 'login'})
      },
      subInfo() {
        if (!this.username || !this.password) {
          this.error_msg = '请输入帐号和密码！';
          return;
        }
        let data = {
          "username": this.username,
          "password": this.password
        };
        this.$store.dispatch('SDK_LOGIN', data)
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
      },

      register() {
        this.closeDialog();
        this.$store.commit('registerDg', {data: {}, show: true, type: 'register'})
      },
      forget() {
        this.closeDialog();
        this.$store.commit('forgetDg', {data: {}, show: true, type: 'forget'})
      }
    }
  }
</script>
<style lang="less">
  .kaiser_dialog {
    .k-login {
      overflow: visible;
      background: url("../assets/img/download/k-login.png") no-repeat center;
      background-size: 100% 100%;
      width: 4.38rem;
      height: 4.9rem;
      max-width: 4.38rem;
      .login {
        overflow: hidden;
        .error-msg {
          text-align: center;
          color: #d8b247;
          font-weight: 600;
          font-size: 0.24rem;
          &.error-tag {
            font-size: 0.18rem;
          }
        }
        .link {
          color: #555;
          font-size: 0.14rem;
          text-align: right;
          margin: 0 auto;
          margin-top: 0.15rem;
          width: 2.66rem;
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
      .login-header {
        margin-top: 0.66rem;
        span {
          background: url("../assets/img/download/login-title.png") no-repeat;
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
