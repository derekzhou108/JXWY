<!--
<template>
  <div class="main-container">
    <public-top></public-top>
    <div class="part part1">
      <a href="javascript:void(0);" class="part-1-btn  hh" @click="showAppoint($event)">点击预约</a>
    </div>
    <div class="part part2">
      <div class="gift-warp">
        <p class="number">已有<strong class="num">{{num}}</strong>名小主赴约</p>
        <div class="title"></div>
        <div class="gifts">
          <span class="gift-item gift-1"></span>
          <span class="gift-item gift-2"></span>
          <span class="gift-item gift-3"></span>
        </div>
      </div>

      <div class="progress-wrapper">
        <div class="progress">
          <ul class="progress-list clearfix">
            <li class="item" :class="num>parseInt(item.num)?'open':''" v-for="(item,key) in items">
              <a :class="'hh lb-icon-'+(parseInt(key,10)+1)" @click="showK4($event,item)"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="part part3">
      <div class="container">
        <h2 class="tit3 tit hh" title="十大福利"></h2>
        <div class="fl-box">
          <ul>
            <li v-for="(it,key) in con" @click="showK5($event,it)">
              <span :class="'bag fl-icon-'+parseInt(it.id)"></span>
              <img :src="'/static/zt/m/img/fl/bag-'+it.id+'.png'"/>
              <span class="text1">{{it.text.substring(0,4)}}<br>{{it.text.substring(4)}}</span>
              <span class="text2">{{it.desc}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="part part4">
      <div class="container">
        <h2 class="tit4 tit hh" title="好友集结"></h2>
        <p class="tips">邀请好友在本页面参加公测预约，即可获得<br>
          相应亲友壕礼与奢华奖池抽奖机会</p>
        <div class="hy-box">
          <ul>
            <li v-for="(it,key) in invite" :key="key" :class="key%2===0?'left':'right'">
              <span class="item-title">{{it.title}}</span>
              <ul class="gifts">

                <li v-for="(itc,keyc) in it.gift" class="hy-icon">
                  <img :src="'/static/zt/pc/img/gift/sprite/'+itc.icon+'.png'"/>
                  <span class="hy-text">{{itc.text}}</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="desc-text">
          <p>当前预约手机<span style="margin:0 0.1rem;color: red">{{userInfo.mobile}}</span><a class="chang_user"
                                                                                         href="javascript:void(0);"
                                                                                         @click="changeUser()">切换</a>已邀请人数：<span
            style="color: red;">{{userInfo.invite_num}}</span>人
          </p>
          <p class="user-details" @click="showInviteDetail()">>>查看详情</p>
        </div>
        <a href="javascript:void(0);" class="hy-btn hh"
           @click="showInvite()">邀请好友</a>
      </div>
    </div>
    <div class="part part5">
      <div class="container">
        <h2 class="tit5 tit hh" title="游戏特色"></h2>
        <p class="tips">本页面参与公测预约，即可获得1次抽奖机会！
          <br>
          每邀请一个好友参与公测预约，即可增加1次抽奖机会。
          <br>
          每个账号最多可获6次抽奖机会</p>
        <div class="lott-box">
          <img src="../assets/img/cj-img.jpg"/>
          <a href="javascript:void(0);" class="cj-btn hh"
             @click="showDrawDialog()">立即抽奖</a>
        </div>
        <div class="desc-text">
          <p>当前预约手机<span style="margin:0 0.1rem;color: red">{{userInfo.mobile}}</span><a class="chang_user"
                                                                                         href="javascript:void(0);"
                                                                                         @click="changeUser()">切换</a>剩余抽奖次数：<span
            style="color: red;">{{userInfo.times}}</span>次
          </p>
          <p class="user-details" @click="showDrawList()">>>查看奖励</p>
        </div>
      </div>
    </div>
    <div class="part part6">
      <div class="container">
        <h2 class="tit6 tit hh" title="游戏特色"></h2>
        <p class="tips">金鹰女神唐嫣倾情代言 女神专属古风恋爱手游</p>
        <div class="slide-box-wrap">
          <swiper :options="swiperNewsOption" class="swiper slide-box u-h100 u-w100">
            <swiper-slide v-for="(item, key) in DONE_SCROLL_LIST" :key="key">
              <img class="" :src="item.img_url">
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination list-sw"></div>
        </div>
        <a href="javascript:void(0);" class="rule-btn icon-rule hh"
           @click="showRule($event)">活动规则</a>
      </div>

    </div>
    <public-footer></public-footer>
    &lt;!&ndash;规则弹窗&ndash;&gt;

    &lt;!&ndash;奖品列表&ndash;&gt;
    <div v-transfer-dom>
      <x-dialog :dialog-class="'weui-dialog k-3'"
                v-model="drawList" class="kaiser_dialog" :hideOnBlur="hideOnBlur">
        <span class="close-btn" @click="drawList=false;"></span>
        <div class="list-title">
          <span>中奖记录</span>
        </div>
        <div class="list-inner">
          <ul>
            <li v-for="n in list" class="item u-border-50"><span class="list-text">{{n.name}}</span><span
              class="list-btn"
              @click="doExchange()">立即兑换</span>
            </li>
          </ul>
        </div>
      </x-dialog>
    </div>
    <back-top></back-top>
    <Appointment></Appointment>
    <Ordinary></Ordinary>
    <k-2></k-2>
    <k-6></k-6>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import publicTop from '../components/publicTop.vue'
  import publicFooter from '../components/footer.vue'
  import {mapGetters, mapState} from 'vuex'
  import * as util from '../utils'
  import Appointment from '../components/appointment.vue'
  import Ordinary from '../components/ordinary'
  import BackTop from '../components/BackTop'
  import K2 from "../components/dialog-2";
  import K6 from "../components/dialog-6";

  export default {
    components: {
      K6,
      K2,
      BackTop,
      swiper,
      swiperSlide,
      publicTop,
      publicFooter,
      Appointment,
      Ordinary
    },
    data() {
      return {
        list: [],
        drawList: false,
        items: [
          {
            "desc": "78重生礼包",
            "gnum": "g1",
            "num": "99999"
          },
          {
            "desc": "118缘起礼包",
            "gnum": "g2",
            "num": "299999"
          },
          {
            "desc": "168寄情礼包",
            "gnum": "g3",
            "num": "499999"
          },
          {
            "desc": "208相依礼包",
            "gnum": "g4",
            "num": "799999"
          },
          {
            "desc": "308缘起礼包",
            "gnum": "g5",
            "num": "999999"
          }
        ],
        swiperNewsOption: {
          /* autoplay: 3000,
           autoplayDisableOnInteraction: false,*/
          speed: 800,
          loop: false,
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: '.swiper-pagination'
        },
        invite: [
          {
            "title": "邀请1名好友",
            "gift": [
              {
                "icon": "gift-1",
                "text": "玫瑰*99"
              },
              {
                "icon": "gift-2",
                "text": "银饼*18888"
              },
              {
                "icon": "gift-3",
                "text": "普通诗会函*3"
              }
            ]
          },
          {
            "title": "邀请2名好友",
            "gift": [
              {
                "icon": "gift-4",
                "text": "金饼*20"
              },
              {
                "icon": "gift-2",
                "text": "银饼*28888"
              },
              {
                "icon": "gift-5",
                "text": "高级时装材料礼包*3"
              }
            ]
          },
          {
            "title": "邀请3名好友",
            "gift": [
              {
                "icon": "gift-6",
                "text": "同心结*3"
              },
              {
                "icon": "gift-7",
                "text": "食盒*1"
              },
              {
                "icon": "gift-8",
                "text": "豪华诗会函*3"
              }
            ]
          },
          {
            "title": "邀请5名好友",
            "gift": [
              {
                "icon": "gift-4",
                "text": "金饼*88"
              },
              {
                "icon": "gift-9",
                "text": "李常茹皮肤：执笔相思"
              },
              {
                "icon": "gift-10",
                "text": "百年好合*1"
              }
            ]
          }
        ],
        con: [
          {
            "id": 1,
            "text": "预约即得限定称号",
            "desc": "参与公测预约即可获得",
            "long": "参与公测预约即可获得专属称号:芳华如梦、银饼*50000、金饼*88"
          },
          {
            "id": 2,
            "text": "全民预约赢豪礼",
            "desc": "预约达到指定人数即可获得",
            "long": "参与公测预约，每达到一定人数即可获得丰厚奖励"
          },
          {
            "id": 3,
            "text": "唐嫣代言专属豪礼",
            "desc": "代言人专属活动等丰厚奖励",
            "long": "金鹰女神唐嫣代言，扫码关注微信资讯抢先知！"
          },
          {
            "id": 4,
            "text": "首日登陆至尊归来",
            "desc": "参与删档付费测试玩家神秘大礼",
            "long": "参与删档付费测试小主们，在不删档正式开启后，使用删测同一账号登录同一平台的首个角色即可获得神秘大礼一份！"
          },
          {
            "id": 5,
            "text": "首日登陆双倍返利",
            "desc": "删档付费测试玩家充值双倍返利",
            "long": "参与删档付费测试小主们，在不删档正式开启后，使用删测账号首日登录的首个角色即可获得删档期间的充值金饼及礼包的双倍返还！"
          },
          {
            "id": 6,
            "text": "七日登陆即得强力伙伴",
            "desc": "开服连续七天登陆可获得丰厚豪礼",
            "long": "活动期间，小主们每日登陆游戏，在“精彩活动”中的“七日登录”面板，即可领取强力伙伴太子妃、李敏德等豪华大礼哦~"
          },
          {
            "id": 7,
            "text": "开服冲榜全民邂逅",
            "desc": "星魂、鸾羽、风灵、学识礼包、名流帖、诗会函等",
            "long": "活动期间，小主们参与榜单冲刺活动，达到指定排名即可获得星魂、鸾羽、风灵、学识礼包、名流帖、诗会函、烟花、花魂等丰厚豪礼哦！"
          },
          {
            "id": 8,
            "text": "邀请好友即得橙卡皮肤",
            "desc": "李常茹皮肤:执笔相思",
            "long": "邀请好友即可获得橙卡皮肤：李常茹皮肤:执笔相思 ！"
          },
          {
            "id": 9,
            "text": "幸运抽奖每抽必中",
            "desc": "参与预约，邀请好友即可抽奖",
            "long": "参与公测预约以及邀请好友预约即可获得抽奖机会，每抽必中哦！"
          },
          {
            "id": 10,
            "text": "微信特权福利",
            "desc": "关注官方公众号 更多惊喜豪礼",
            "long": "扫码关注更多福利特权抢先知"
          }
        ],
        showDialog: false,
        hideOnBlur: true,
        inviteId: ''  // 朋友邀请码
      }
    },

    computed: {
      ...mapGetters([
        'num',
        'DONE_SCROLL_LIST'
      ]),
      ...mapState([
        'isIndex',
        'indexTop'
      ]),
      userInfo() {
        return this.$store.state.index.userInfo
      }
    },
    mounted() {
      this.$store.commit('updateUserInfo', null);
      this.inviteId = util.getQueryString('invite_id');

      // const userIfo = util.getStorage('userInfo');

      if (this.inviteId !== '' && this.userInfo.mobile === '') {
        this.$store.dispatch('INVITELIST', {invite_id: this.inviteId})
          .then(res => {
            this.myWapSendInvitation(res.data, false, this.inviteId)
          })
      } else {
        if (this.userInfo.mobile === '') {
          this.$store.commit('updateUserInfo', null);
        } else {
          this.$store.dispatch('USERINFO', {
            phone: this.userInfo.mobile
          }).then(res => {
            if (res.code === 10000) {
              this.$store.commit('updateUserInfo', res.data)
            }
            else if (res.code = 10007) {
              this.$store.commit('updateDialogK6', {show: true, type: 'k-6-2'})
            }

          })
        }
      }

    },
    destroyed() {
    },
    created() {
      if (util.isEmpty(this.DONE_SCROLL_LIST)) {
        //轮播
        this.$store.dispatch('FETCH_SCROLL_LIST')
          .then(() => {
            //  console.log(this.DONE_SCROLL_LIST)
          })
      }
      this.$store.dispatch('APPOINT_NUM')
        .then(() => {
          //  console.log(this.APPOINT_NUM)
        })
    },
    methods: {
      doExchange() {
        this.drawList = false;
        this.$store.commit('updateDialogK2', {show: true, type: 'k-2-4'})
      },

      showDrawList() {
        if (this.userInfo.mobile !== '') {
          this.$store.dispatch('DRAWLIST', this.userInfo.mobile)
            .then(res => {
              this.list = res.data;
              this.drawList = true;
            })
        } else {
          this.$store.commit('updateDialogK6', {show: true, type: 'k-6-2'})
        }

      },

      showInviteDetail() {
        if (this.userInfo.mobile !== '') {
          this.$store.dispatch('INVITELIST', {invite_id: this.userInfo.invite_id})
            .then(res => {
              this.myWapSendInvitation(res.data, true, this.userInfo.invite_id)
            })
        } else {
          this.$store.commit('updateDialogK6', {show: true, type: 'k-6-2'})
        }
      },
      showRule(e) {
        e.preventDefault();
        this.showDialog = true;
      },
      // 点击预约
      showAppoint(e) {
        this.$store.commit('updateDialogStatus', {dialogStatus: true, inviteId: this.inviteId})
      },
      showK5(e, item) {
        e.preventDefault();
        this.$store.commit('updateDialogType', {data: item, show: true, type: 'k-5'})
      },
      showK4(e, item) {
        e.preventDefault();
        this.$store.commit('updateDialogType', {data: item, show: true, type: 'k-4'})
      },
      showInvite() {

        if (this.userInfo.mobile !== '') {
          this.$store.commit('updateDialogType', {data: this.userInfo.mobile, show: true, type: 'k-1'})
        } else {
          this.$store.commit('updateDialogK6', {show: true, type: 'k-6-1'})
        }
      },
      myWapSendInvitation(data, type, inv) {
        this.$store.commit('updateDialogType', {
          inviteId: inv,
          Issend: type,
          data: data,
          show: true,
          type: 'k-3'
        })
      },
      showDrawDialog() {
        if (this.userInfo.mobile !== '') {
          this.$store.dispatch('DRAW', this.userInfo.mobile).then(res => {
            this.$store.dispatch('TIMES', this.userInfo.mobile);
            if (res.code === 10010) {
              this.$store.commit('updateDialogK2', {data: '0', show: true, type: 'k-2-3'})
            } else if (res.code === 10000) {
              this.$store.commit('updateDialogK2', {data: res.data, show: true, type: 'k-2-2'})
            } else {
              alert(res.msg)
            }
          })

        } else {
          this.$store.commit('updateDialogK6', {show: true, type: 'k-6-1'})
        }
      },
      changeUser() {
        this.$store.commit('updateDialogK6', {data: {}, show: true, type: 'k-6-1'})
      }
    }
  }
</script>

<style lang="less">
  @import "~swiper/dist/css/swiper.css";
  @import "../assets/css/mixin";

  .fl-icon-loop(@n, @i:1) when (@i <= @n) {
    .fl-icon-@{i} {
      background: url("../assets/img/num-top-@{i}.png") no-repeat top;
      background-size: 100%;
      width: 0.35rem;
      height: 0.30rem;
      display: block;
    }
    .fl-icon-loop(@n, (@i + 1));
  }

  .lb-icon-loop(@n, @i:1) when (@i <= @n) {
    .lb-icon-@{i} {
      background: url("../assets/img/box-@{i}.png") no-repeat center;
      background-size: 100%;
      width: 1.4rem;
      height: 1.4rem;
      display: block;
    }
    .lb-icon-loop(@n, (@i + 1));
  }

  .weui-dialog {
    max-width: 7.5rem !important;
  }

  .part-loop(@n, @i:1) when (@i <= @n) {
    .part@{i} {
      background: url("../assets/img/bg-@{i}.jpg") center top no-repeat;
      background-size: 100% auto;
      width: 100%;
    }
    .part-loop(@n, (@i + 1));
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
        span {
          display: block;
        }
        .list-text {

        }
        .list-btn {
          border: none;
          color: #fff;
          height: 0.25rem;
          line-height: 0.25rem;
          vertical-align: middle;
          width: 0.9rem;
          background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
          font-size: .14rem;
          display: inline-block;
          border-radius: 2px;
          text-align: center;
        }
      }
    }

  }

  //调用
  .main-container {
    .part-loop(6);
    text-align: center;
  }

  .part1 {
    height: 9.91rem;
    position: relative;
    .part-1-btn {
      width: 3.78rem;
      height: 1.05rem;
      position: absolute;
      left: 50%;
      margin-left: -1.89rem;
      bottom: 0rem;
      background: url("../assets/img/yuyuebtn.png") center top no-repeat;
      display: block;
      background-size: 100% auto;
      font-family: AdobeHeitiStd-Regular;
      font-size: 46px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: -2px;
      color: #ffffff;
    }
  }

  .part2 {
    height: 8.74rem;
    .gift-warp {
      display: block;
      position: relative;
      left: 0;
      text-align: center;
      .number {
        font-size: 0.24rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        /* letter-spacing: -1px; */
        color: #777692;
        padding: .15rem;
      }
      .title {
        width: 2.49rem;
        height: 0.27rem;

        margin: 0 auto;
        background: url("../assets/img/box-desc6.png") no-repeat;
        background-size: 100% 100%;
      }
      .gifts {
        position: relative;
        top: 0.1rem;
        .gift-item {

          display: inline-block;
          &.gift-1 {
            width: 1.06rem;
            height: 1.45rem;
            margin-left: 0.28rem;
            margin-right: 0.76rem;
            background: url(../assets/img/gift3.png) no-repeat;
            background-size: 100% 100%;
          }
          &.gift-2 {
            width: 1.54rem;
            height: 1.43rem;
            background-size: 100% 100%;
            margin: 0 0.14rem;
            background: url(../assets/img/gift2.png) no-repeat;
            background-size: 100% 100%;
          }
          &.gift-3 {
            width: 1.82rem;
            height: 1.45rem;
            margin-left: 0.28rem;
            background-size: 100% 100%;
            background: url(../assets/img/gift1.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .progress-wrapper {

      .progress {
        margin-top: 0.4rem;
      }
      .progress-list {
        display: flex;
        flex-flow: wrap;
        width: 6.87rem;
        height: 5.61rem;
        background: url("../assets/img/yy-back.png") no-repeat;
        background-size: 100%;
        margin: 0 auto;
        .item {
          position: relative;
          width: 2.29rem;
          height: 2.805rem;;
          .lb-icon-loop(5);
          a {
            .posMiddle('', absolute);
            top: 1.05rem;

          }
          &:nth-child(4) {
            width: 3.435rem;
            height: 2.805rem;
            a {
              top: 0.75rem;
              left: 2.4rem;
            }
          }
          &:nth-child(5) {
            width: 3.435rem;
            height: 2.805rem;
            a {
              left: 1.2rem;
              top: 0.75rem;
            }
          }
          &.open {
            a {
              &::after {
                content: "";
                background: url(../assets/img/gf-act.png) no-repeat center;
                background-size: 100%;
                width: 1.51rem;
                height: 0.64rem;
                .posMiddle('', absolute);
              }
            }
          }
        }
      }
    }
  }

  .part3 {
    height: 24.93rem;
    .tit {
      background: url(../assets/img/tit3.png) no-repeat;
      background-size: 100%;
      width: 6.85rem;
      height: 1.06rem;
      margin: 0 auto;
    }
    .fl-box {
      margin-top: 0.35rem;
      text-align: center;
      ul {
        display: flex;
        flex-flow: wrap;
        li {
          width: 3.02rem;
          height: 4.32rem;
          margin: .17rem .365rem;
          display: inline-block;
          position: relative;
          background: url(../assets/img/fl-icon.png) no-repeat;
          background-size: 100%;
          .fl-icon-loop(10);
          .bag {
            .posMiddle(x, absolute);
            top: .2rem;
          }
          img {
            width: 1.3rem;
            height: 1.3rem;
            display: block;
            .posMiddle(x, absolute);
            top: 1.05rem;

          }
          .text1 {
            .posMiddle(x, absolute);
            top: 2.5rem;
            width: 100%;
            font-size: 0.33rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.4rem;
            letter-spacing: 0px;
            color: #ee505f;
          }
          .text2 {
            .posMiddle(x, absolute);
            top: 3.45rem;
            width: 90%;
            font-size: 0.22rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.3rem;
            letter-spacing: 0px;
            color: #606162;
          }
        }
      }
    }
  }

  .part4 {
    height: 12.97rem;
    .tit {
      background: url(../assets/img/tit4.png) no-repeat;
      background-size: 100%;
      width: 7.47rem;
      height: 0.51rem;
      margin: 0 auto;
    }
    .hy-box {
      margin-top: 0.2rem;
      > ul {
        display: flex;
        flex-flow: wrap;
        > li {
          width: 2.94rem;
          height: 4.63rem;
          margin: .07rem .405rem;
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
            top: 0.43rem;
            color: #fdfcfc;
            font-family: Impact;
            left: 50%;
            transform: translateX(-50%);
            .gifts {

            }
          }
          .gifts {
            position: absolute;
            top: 1.3rem;
            width: 100%;
            li {
              display: block;
              color: #606162;
              width: 100%;
              height: 1rem;
              line-height: 1rem;
              padding-left: 0.2rem;
              img {
                width: 0.67rem;
                height: 0.67rem;
                vertical-align: middle;
                display: inline-block;
              }
              .hy-text {
                font-size: .18rem;
                line-height: .3rem;
                display: inline-block;
                width: 1.5rem;
                vertical-align: middle;
                text-align: left;
                margin-left: 0.22rem;
              }
            }
          }
        }
      }
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
      margin: 0 auto;
    }

  }

  .part5 {
    height: 11.85rem;
    .tit {
      background: url(../assets/img/tit5.png) no-repeat;
      background-size: 100%;
      width: 7.47rem;
      height: 0.51rem;
      margin: 0 auto;
    }
    .lott-box {
      width: 6.85rem;
      height: 9rem;
      display: block;
      margin: 0 auto;
      padding-top: 0.3rem;
      position: relative;
      overflow: hidden;
      img {
        width: 6.84rem;
        height: 7.03rem;
        text-align: center;
      }
      .cj-btn {
        background: url(../assets/img/cj-btn.png) no-repeat;
        background-size: 100%;
        width: 4.9rem;
        height: 1.34rem;
        margin: 0.26rem auto 0;
      }
    }
  }

  .part6 {
    height: 7.77rem;
    position: relative;
    .tit {
      background: url(../assets/img/tit6.png) no-repeat;
      background-size: 100%;
      width: 7.13rem;
      height: 0.51rem;
      margin: 0 auto;
    }

    .slide-box-wrap {
      width: 6.65rem;
      position: relative;
      margin: 0.3rem auto 0;
      .slide-box {
        width: 100%;
        height: 4.15rem;
        margin: 0 auto;
        overflow: hidden;
        .swiper-slide {
          width: 6.65rem;
          height: 4.15rem;
          line-height: 4.15rem;
          background: url("../assets/img/border-floor-5.png") no-repeat center;
          background-size: 100% 100%;
          img {
            width: 6.09rem;
            height: 3.65rem;
            vertical-align: middle;
            display: inline-block;
          }
        }
      }
      .list-sw {
        position: relative;
        bottom: -0.05rem;
        .swiper-pagination-bullet {
          margin: 0 0.05rem;
          background: url("../assets/img/banner-icon.png") no-repeat;
          width: 0.16rem;
          height: 0.16rem;
          background-size: 100% 100%;
          opacity: 1;
          vertical-align: middle;
        }
        .swiper-pagination-bullet-active {
          width: 0.28rem;
          height: 0.26rem;
          background: url("../assets/img/banner-icon-active.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .rule-btn {
      margin: 0.09rem auto 0;
    }
    .icon-rule {
      width: 3.78rem;
      height: 1.05rem;
      background: url("../assets/img/rule-btn.png") no-repeat top;
      background-size: 100% 100%;
    }
  }

  .tips {
    padding-top: 0.26rem;
    color: #686868;
    font-size: 0.19rem;
  }

  .desc-text {
    font-size: 0.2rem;
    font-weight: normal;
    letter-spacing: 1px;
    color: #606162;
    padding: 0 0.3rem;
    .user-details {
      text-align: right;
    }
    .lott-btn {

    }
  }

  .chang_user {
    text-decoration: underline;
    margin: 0 0.25rem;
    color: #606162;
  }

  .list-title {
    margin-top: 0.35rem;
    font-size: 0.25rem;
    font-weight: normal;
    letter-spacing: 1px;
    color: #e8656b;
    padding: 0 0.3rem;
  }

  .kaiser_dialog {
    .k-9 {
      overflow: visible;
      background: url("../assets/img/k-9.png") no-repeat center;
      background-size: 100% 100%;
      width: 6.04rem;
      height: 5.95rem;
      padding: 0.2rem;
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
-->
