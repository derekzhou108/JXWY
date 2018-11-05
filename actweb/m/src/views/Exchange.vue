<template>
  <div class="exc">
    <public-top></public-top>
    <div class="part part1">
      <div class="container">
        <div class="login">
          <template v-if="userInfo.user_id===''">
            <div>欢迎小主，请<a href="javascript:void(0);" @click="login">【登录】</a></div>
          </template>
          <template v-else>
            <div>欢迎小主，{{userInfo.user_name.substring(0,3)}}...<a href="javascript:void(0);" @click="loginOut">【注销】</a></div>

          </template>
        </div>
        <div class="part1-title u-pa">
        </div>
        <!--<div class="ex-inner  u-pa">
          <div class="gift-box">
            <div class="g-item">
              <p class="g-icon"><img src="../assets/img/exchange/icon-g1.png"/></p>
              <p class="g-text">金饼*88</p>
            </div>

            <div class="g-item">
              <p class="g-icon"><img src="../assets/img/exchange/icon-g2.png"/></p>
              <p class="g-text">银饼*50000</p>
            </div>
            <div class="g-item">
              <p class="g-icon spec"><img src="../assets/img/exchange/icon-g3.png"/></p>
              <p class="g-text">称号：芳华如梦</p>
            </div>
          </div>
          <a href="javascript:void(0);" class="pub-btn"></a>
        </div>-->
      </div>
    </div>
    <div class="part part2">
      <div class="container">
        <!--<div class="box-inner box-1">

        </div>-->
        <div class="box-inner  box-2">
          <h2 class="tit2 bg hh" title="邀请好友集结礼包"></h2>
          <div class="hy-box">
            <ul>
              <li v-for="(it,key) in invite" :key="key" :class="key%2===0?'left':'right'">
                <span class="item-title">邀请<span>{{it.title}}</span>名好友</span>
                <ul class="gifts">

                  <li :key="keyc" v-for="(itc,keyc) in it.gift" class="hy-icon">
                    <!-- <img :src="'/static/zt/pc/img/gift/sprite/'+itc.icon+'.png'"/> -->
                    <img :src="itc.img"/>
                    <span class="hy-text">{{itc.text}}</span></li>
                </ul>
              </li>
            </ul>
          </div>
          <a href="javascript:void(0);" class="hy-btn hh"
             @click="showDrawDialog('dj-1')">立即领取</a>
        </div>

        <div class="box-inner box-3">
          <h2 class="tit3 bg hh" title="预约抽奖礼包"></h2>
          <div class="lott-box">
            <img src="../assets/img/cj-img.jpg"/>
            <a href="javascript:void(0);" class="hy-btn hh"
               @click="showDrawDialog('dj-2')">立即领取</a>
          </div>
        </div>

        <div class="box-inner box-4">
          <div class="rule-content">
            <ul>

              <li><span class="icon-rule">1</span>
                <p>活动时间：即日起至全平台公测当天</p></li>

              <li><span class="icon-rule">2</span>
                <p>活动期间，玩家成功邀请1位、2位、3位、5位亲友预约，分别获得对应礼包；</p></li>

              <li><span class="icon-rule">3</span>
                <p>活动期间，玩家在本页面参与公测预约，即可获得一次抽奖机会。每邀请一名好友预约即可获得一次抽奖机会；每个账号最多可获6次抽奖机会！</p></li>

              <li><span class="icon-rule">4</span>
                <p>所有奖励将于公测后统一发放，届时请留意官方公告，玩家实物礼品逾期未填写或误填写收件信息，视为放弃奖励资格处理。</p></li>

              <li><span class="icon-rule">5</span>
                <p>如使用外挂、作弊器以及其他不正当的方式参与活动，官方将有权取消用户参与资格、获奖资格。</p></li>

            </ul>
          </div>
        </div>
      </div>
    </div>
    <public-footer></public-footer>
    <login></login>
    <Exdialog @afterSub="subEx"></Exdialog>
    <back-top></back-top>
    <forget></forget>
    <Register></Register>
    <k-2></k-2>
    <k-6></k-6>
    <!--奖品列表-->
    <div v-transfer-dom>
      <x-dialog :dialog-class="'weui-dialog k-draw'"
                v-model="drawList" class="kaiser_dialog" :hideOnBlur="true">
        <span class="close-btn" @click="drawList=false;"></span>
        <div class="list-title">
          <span class="get-gift">已经获得奖励</span>
          <span class="gift-num">数量</span>
        </div>
        <div class="list-inner">
          <ul>
            <li :key="k" v-for="(n,k) in list" class="item u-border-50">
              <span class="gift-name">{{n.name}}</span>
              <span class="list-text">{{n.p_num}}</span>
              <span v-if="n.exchange_status=='1'" class="already-ex">已兑换</span>
              <span v-else class="list-btn" @click="doExchange(n)">立即兑换</span>
            </li>
          </ul>
        </div>
      </x-dialog>
    </div>
  </div>

</template>
<script>
import publicTop from "../components/publicTop.vue";
import BackTop from "../components/BackTop";
import publicFooter from "../components/footer.vue";
import Login from "../components/Login";
import Exdialog from "../components/ExchangeDialog";
import { clearStorage, confirm, reload } from "@/utils";
import K2 from "../components/dialog-2";
import K6 from "../components/dialog-6";
import Register from "../components/Register";
import Forget from "../components/Forget";

export default {
  components: {
    K6,
    K2,
    Exdialog,
    Login,
    publicTop,
    BackTop,
    Forget,
    Register,
    publicFooter
  },
  data() {
    return {
      invite: [
        {
          title: "1",
          gift: [
            {
              icon: "gift-1",
              img: require("../assets/img/gift/sprite/gift-1.png"),
              text: "玫瑰*99"
            },
            {
              icon: "gift-2",
              img: require("../assets/img/gift/sprite/gift-2.png"),
              text: "银饼*18888"
            },
            {
              icon: "gift-3",
              img: require("../assets/img/gift/sprite/gift-3.png"),
              text: "普通诗会函*3"
            }
          ],
          num: 1
        },
        {
          title: "2",
          gift: [
            {
              icon: "gift-4",
              img: require("../assets/img/gift/sprite/gift-4.png"),
              text: "金饼*20"
            },
            {
              icon: "gift-2",
              img: require("../assets/img/gift/sprite/gift-2.png"),
              text: "银饼*28888"
            },
            {
              icon: "gift-5",
              img: require("../assets/img/gift/sprite/gift-5.png"),
              text: "高级时装材料礼包*3"
            }
          ],
          num: 2
        },
        {
          title: "3",
          gift: [
            {
              icon: "gift-6",
              img: require("../assets/img/gift/sprite/gift-6.png"),
              text: "同心结*3"
            },
            {
              icon: "gift-7",
              img: require("../assets/img/gift/sprite/gift-7.png"),
              text: "食盒*1"
            },
            {
              icon: "gift-8",
              img: require("../assets/img/gift/sprite/gift-8.png"),
              text: "豪华诗会函*3"
            }
          ],
          num: 3
        },
        {
          title: "5",
          gift: [
            {
              icon: "gift-4",
              img: require("../assets/img/gift/sprite/gift-4.png"),
              text: "金饼*88"
            },
            {
              icon: "gift-9",
              img: require("../assets/img/gift/sprite/gift-9.png"),
              text: "李常茹皮肤：执笔相思"
            },
            {
              icon: "gift-10",
              img: require("../assets/img/gift/sprite/gift-10.png"),
              text: "百年好合*1"
            }
          ],
          num: 5
        }
      ],
      drawList: false,
      list: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.index.userInfo;
    }
  },
  methods: {
    login() {
      this.$store.commit("loginDg", { show: true, type: "login" });
    },
    loginOut() {
      confirm("提示", "确认要注销吗？", () => {
        this.$store.dispatch("SDK_LOGOUT").then(
          res => {
            if (res.code === 10000) {
              clearStorage();
              reload();
            }
          },
          ({ mes }) => {}
        );
      });
    },
    showDrawDialog(e) {
      if (this.userInfo.user_id !== "") {
        if (e === "dj-2") {
          let pd={
            userId:this.userInfo.user_id,
            type:1
          }
          this.$store.dispatch("DRAWLIST", pd).then(res => {
            if(res.code===10000){
              this.list = res.data;
              this.drawList = true;
            }else{
              this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
            }
          });
        } else {
          this.$store.dispatch('UPDATEBINFPHONE',{userId:this.userInfo.user_id}).then(res=>{
              this.$store.commit("chooseSite", {
              data: this.userInfo.user_id,
              show: true,
              type: e
            });
          }).catch(err=>{
              this.$store.commit('updateDialogK6', {data: '需在游戏内绑定预约手机号才能兑换哦！', show: true, type: 'k-6-2'})
          })
          
        }
      } else {
        this.login();
      }
    },
    subEx(val) {
      if (val.type === "dj-1") {
        this.$store
          .dispatch("CenterFriend", {
            appId: val.appId,
            userId: this.userInfo.user_id,
            serverId: val.serverId,
            roleId: val.role.roleId
          })
          .then(res => {
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
            // if (res.code === 10000) {
            //   // TODO 奖励兑换成功提示
            //   this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
            // } else {
            //   // TODO 奖励兑换失败提示
            // }
          });
      } else if (val.type === "dj-2") {
        this.$store
          .dispatch("getEx", {
            appId: val.appId,
            userId: this.userInfo.user_id,
            serverId: val.serverId,
            roleId: val.role.roleId,
            type: 1,
            id: val.pri.pId,
            pType: val.pri.pType
          })
          .then(res => {
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
            // if (res.code === 10000) {
            //   // TODO 奖励兑换成功提示
            // } else {
            //   // TODO 奖励兑换失败提示
            // }
          });
      }
    },

    doExchange(n) {
      const pType = n.p_type;
      const pId = n.id;
      this.drawList = false;
      if (pType === "2") {
        this.$store.commit("chooseSite", {
          data: this.userInfo.user_id,
          show: true,
          type: "dj-2",
          pri: {
            pType,
            pId
          }
        });
      } else {
        this.$store.commit("updateDialogK2", {
          data: {
            type: "ex",
            pType,
            pId
          },
          show: true,
          type: "k-2-4"
        });
      }
    }
  },
  mounted() {
    this.$store.commit("updateUserInfo", null);
  }
};
</script>
<style lang="less">
@import "~swiper/dist/css/swiper.css";
@import "../assets/css/mixin";

.part-loop(@n, @i:1) when (@i <= @n) {
  .part@{i} {
    background: url("../assets/img/exchange/bg-@{i}.jpg") center top no-repeat;
    background-size: 100% auto;
    width: 100%;
  }
  .part-loop(@n, (@i + 1));
}

.lb-icon-loop(@n, @i:1) when (@i <= @n) {
  .lb-icon-@{i} {
    background: url("../assets/img/exchange/box-@{i}.png") no-repeat center;
    background-size: 100%;
    width: 1.4rem;
    height: 1.4rem;
    display: block;
  }
  .lb-icon-loop(@n, (@i + 1));
}

.exc {
  width: 100%;
  overflow-x: hidden;
  text-align: center;
  .part-loop(2);
  .part1 {
    height: 6.83rem;
    .login {
      color: #000000;
      font-size: 0.18rem;
      position: absolute;
      right: 0.18rem;
      top: 0.28rem;
      a {
        color: #e64f73;
        height: 0.8rem;
        display: inline-block;
        line-height: 0.5rem;
      }
    }
    .part1-title {
      background: url(../assets/img/exchange/tit.png) no-repeat;
      background-size: 7.29rem auto;
      width: 7.29rem;
      height: 3.47rem;
      top: 3.8rem;
      left: 0rem;
    }
    .ex-inner {
      background: url("../assets/img/exchange/ex.bg.png");
      background-size: 100% 100%;
      width: 100%;
      height: 4.1rem;
      overflow: hidden;
      top: 6.36rem;
      .gift-box {
        width: 6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1.4rem auto 0;
        .g-item {
          width: 2rem;
        }
        p.g-icon {
          background: url("../assets/img/download/gift-bg.png");
          background-size: 100%;
          height: 1.05rem;
          width: 1.06rem;
          line-height: 1.05rem;
          margin: 0 auto;
          position: relative;
          &.spec {
            &:after {
              content: "";
              background: url(../assets/img/exchange/spec.png) no-repeat center;
              background-size: 100%;
              width: 0.48rem;
              height: 0.51rem;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          img {
            width: 0.85rem;
            //  height: 0.85rem;
            vertical-align: middle;
          }
        }
        .g-text {
          color: #777692;
          font-size: 0.24rem;
        }
      }
    }
  }
  .part2 {
    height: 26.22rem;
    margin-top: -0.6rem;
    .tit1 {
      background: url(../assets/img/exchange/tit1.png) no-repeat;
      background-size: 100%;
      width: 7.5rem;
      height: 0.45rem;
    }
    .tit2 {
      background: url(../assets/img/exchange/tit2.png) no-repeat;
      background-size: 100%;
      width: 7.5rem;
      height: 0.45rem;
    }
    .tit3 {
      background: url(../assets/img/exchange/tit3.png) no-repeat;
      background-size: 100%;
      width: 7.5rem;
      height: 0.45rem;
    }
    .hy-btn {
      width: 3.7rem;
      height: 0.97rem;
      background: url(../assets/img/hy-btn.png) no-repeat;
      background-size: 100%;
      font-size: 0.46rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.97rem;
      color: #ffffff;
      text-indent: 0;
      margin: 0.5rem auto 0;
    }
    .box-inner {
      margin-top: 0.5rem;
    }
    .box-2 {
      .hy-box {
        margin-top: 0.2rem;
        > ul {
          display: flex;
          flex-flow: wrap;
          > li {
            width: 2.94rem;
            height: 4.63rem;
            margin: 0.07rem 0.405rem;
            display: inline-block;
            position: relative;
            &.left {
              background: url(../assets/img/fr-left.png) no-repeat;
              background-size: 100%;
            }
            &.right {
              background: url(../assets/img/fr-right.png) no-repeat;
              background-size: 100%;
            }
            .item-title {
              font-size: 0.26rem;
              font-weight: normal;
              font-stretch: normal;
              position: absolute;
              top: 0.42rem;
              color: #fdfcfc;
              font-family: Impact;
              left: 50%;
              transform: translateX(-50%);
              width: 100%;
              span{
                font-size: 0.28rem;
                padding: 0.05rem;
              }
            }
            .gifts {
              position: absolute;
              top: 0.9rem;
              width: 100%;
              li {
                display: block;
                color: #606162;
                width: 100%;
                height: 1.2rem;
                line-height: 1.2rem;
                padding-left: 0.2rem;
                img {
                  width: 0.67rem;
                  height: auto;
                  vertical-align: middle;
                  display: inline-block;
                }
                .hy-text {
                  font-size: 0.18rem;
                  line-height: 0.3rem;
                  display: inline-block;
                  width: 1.5rem;
                  vertical-align: middle;
                  text-align: left;
                  margin-left: 0.22rem;
                }
              }
            }
            .gift-type {
              position: absolute;
              top: 4rem;
              width: 100%;
            }
          }
        }
      }
    }
    .box-3 {
      .lott-box {
        margin-top: 0.4rem;
        img {
          width: 6.84rem;
          height: 7.03rem;
          text-align: center;
        }
      }
      .dl-cj-btn {
        width: 4.9rem;
        height: 1.34rem;
        background: url("../assets/img/download/cj-btn.png") no-repeat top;
        background-size: 100% 100%;
        margin: 0.25rem auto 0;
      }
    }

    .box-4 {
      .rule-content {
        padding: 0 0.5rem;
        ul {
          li {
            color: #686868;
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
}

.kaiser_dialog {
  .k-draw {
    overflow: visible;
    // background: url("../assets/img/k-3.png") no-repeat center;
    background: url("../assets/img/download/k7-bg.png") no-repeat center;
    background-size: 100% 100%;
    width: 5.74rem;
    height: 4.5rem;
    max-width: 5.74rem;
    .list-title {
      margin-top: 0.35rem;
      font-size: 0.25rem;
      font-weight: normal;
      letter-spacing: 1px;
      color: #e8656b;
      padding: 0 0.3rem;
      .get-gift{
        font-weight: bold;
        width: 2.4rem;
        display: inline-block;
        padding-left: 0.3rem;
      }
      .gift-num{
        margin-left: 0.4rem;
        font-weight: bold;
        display: inline-block;
        width: 0.8rem;
        text-align: center
      }
    }
    .list-inner {
      margin-top: 0.2rem;
      ul {
        padding: 0 0.6rem;
        li {
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.1rem;
          span {
            display: block;
          }
          .gift-name {
              width: 2.6rem;
          }
          .list-text{
              display: inline-block;
              width: 0.75rem;
              text-align: center;
            }
          .list-btn {
            border: none;
            color: #fff;
            height: 0.3rem;
            line-height: 0.3rem;
            vertical-align: middle;
            width: 1.2rem;
            background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
            font-size: 0.14rem;
            display: inline-block;
            border-radius: 2px;
            text-align: center;
          }
           .already-ex{
              border: none;
              color: #fff;
              height: 0.3rem;
              line-height: 0.3rem;
              vertical-align: middle;
              width: 1.2rem;
              background: #dcdcdc;
              font-size: .14rem;
              display: inline-block;
              border-radius: 2px;
              text-align: center;
            }
        }
      }
    }
  }
}
</style>
