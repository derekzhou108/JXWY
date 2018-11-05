<template>
  <div v-transfer-dom>
    <x-dialog :dialog-class="'weui-dialog k-9'" class="kaiser_dialog"
              v-model="isShow" :hideOnBlur="hideOnBlur">
      <div class="close-btn" @click="isShow=false"></div>
      <div class="rule-title">
        <span>活动规则</span>
      </div>
      <div class="rule-content">
        <ul>

          <li><span class="icon-rule">1</span>
            <p>即日起至12月31日</p></li>

          <li><span class="icon-rule">2</span>
            <p>活动期间，完成下载并注册角色的玩家，即可获得一份“下载专属礼”。</p></li>

          <li><span class="icon-rule">3</span>
            <p>活动期间，玩家成功邀请1位、2位、3位、5位亲友注册并在此页面领取“下载专属礼”，可分别获得对应礼包；</p></li>

          <li><span class="icon-rule">4</span>
            <p>活动期间，玩家在本页面下载并成功注册游戏，即可获得一次抽奖机会。每邀请一个好友下载并成功注册游戏即可获得一次抽奖机会；每个账号最多可获6次抽奖机会！</p></li>

          <li><span class="icon-rule">5</span>
            <p>道具礼包将于领取后24小时内通过游戏邮箱发放，活动结束后，实物礼品逾期未填写或误填写收件信息，视为放弃奖励资格处理。</p></li>

          <li><span class="icon-rule">6</span>
            <p>6、如使用外挂、作弊器以及其他不正当的方式参与活动，官方将有权取消用户参与资格、获奖资格。</p></li>
        </ul>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hideOnBlur: true,
        isShow: this.showDialog
      }
    },
    props: {
      showDialog: {
        type: Boolean,    //传入的类型
        default: false//这样可以指定默认的值
      }
    },
    methods: {},
    watch: {
      showDialog(val) {
        this.isShow = val;
      },
      isShow(val) {
        this.$emit('show', val)
      }
    }
  }

</script>
<style lang="less">

  .kaiser_dialog {
    .k-9 {
      overflow: visible;
      background: url("../assets/img/k-9.png") no-repeat center;
      background-size: 100% 100%;
      width: 6.04rem;
      // height: 5.95rem;
      padding: 0.2rem;
      max-width: 6.04rem;
      .rule-title {
        line-height: 1rem;
        span {
          line-height: 0.32rem;
          letter-spacing: 0px;
          color: #ee505f;
        }
      }
      .rule-content {
        padding: 0 0.5rem;
        ul {
          li {
            line-height: 0.3rem;
            font-size: 0.22rem;
            text-align: left;
            .icon-rule {
              display: inline-block;
              background: url("../assets/img/rule.png") no-repeat center;
              background-size: 100% 100%;
              width: 0.2rem;
              height: 0.22rem;
              color: #efe6e8;
              font-size: 0.16rem;
              border-radius: 100%;
              line-height: 0.25rem;
              text-align: center;
            }
            p {
              display: inline-block;
              width: 94%;
              padding-left: 0.05rem;
              vertical-align: top;
            }
          }
        }
      }
    }
  }

</style>
