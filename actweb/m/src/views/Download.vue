<template>
  <div class="dl-container">
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
        <div @click="openVideo" class="part1-video">
        </div>
        <div class="part1-angle"></div>
        <!-- <div class="part1-subtit u-pa">
        </div> -->
        <div class="down-group u-pa">
          <!-- <a href="http://sb.jxwy.ksgame.com/download/scan" class="ios-btn"></a> -->
          <a :href="curHost" class="ios-btn"></a>
          <!-- <a href="javascript:void (0);" class="az-btn"></a> -->
        </div>
      </div>
    </div>
    <div class="part part2">
      <div class="container">
        <div class="dl-inner">
          <div class="gift-box">
            <div class="g-item">
              <p class="g-icon"><img src="../assets/img/download/icon-g1.png"/></p>
              <p class="g-text">限定手持</p>
            </div>

            <div class="g-item">
              <p class="g-icon"><img src="../assets/img/download/icon-g2.png"/></p>
              <p class="g-text">金饼*99</p>
            </div>
            <div class="g-item">
              <p class="g-icon"><img src="../assets/img/download/icon-g3.png"/></p>
              <p class="g-text">银饼*99999</p>
            </div>
          </div>
          <a href="javascript:void(0);" class="pub-btn" @click="priReceive"></a>
        </div>
        <h2 class="tit1 tit hh" title="十大福利"></h2>
        <div class="fl-box">
          <ul>
            <li :key="key" v-for="(it,key) in con" @click="showK5($event,it)">
              <span :class="'bag fl-icon-'+parseInt(it.id)"></span>
              <!--<img :src="'/static/zt/m/img/download/fl/bag-'+it.id+'.png'"/>-->
              <!-- <img :src="'/static/img/dl/bag-'+it.id+'.png'"/> -->
              <img :src="it.img"/>
              <span class="text1">{{it.text.substring(0,4)}}<br>{{it.text.substring(4)}}</span>
              <span class="text2">{{it.desc}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="part part3">
      <div class="container">
        <h2 class="tit2 tit hh" title="好友集结"></h2>
        <p class="tips">邀请好友在本页面下载游戏，即可获得<br>
          相应亲友壕礼与奢华奖池抽奖机会</p>
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
              <div class="gift-type">
                        <!-- <span :class="invite_num==0 ? 'icon-lock' : lockIcon[key+1]===1 ? 'icon-hadRec' : 'icon-noRec'"
                      @click="friendPri(invite_num-it.num>=0,key+1)"></span> -->
                      <span :class="invite_num < it.title ? 'icon-lock' :'icon-noRec'"
                      @click="friendPri(invite_num-it.num>=0,key+1)"></span>
              </div>
            </li>
          </ul>
        </div>
        <a href="javascript:void(0);" class="hy-btn hh"
           @click="showInvite">邀请好友</a>
        <div class="desc-text">
          已邀请好友数量：<span
          style="color: red;">{{invite_num>10?10:invite_num}}</span> 名
        </div>

      </div>
    </div>
    <div class="part part4">
      <div class="container">
        <h2 class="tit5  hh" title="游戏特色"></h2>
        <p class="tips">本页面下载游戏即可获得1次抽奖机会！
          <br>
          每邀请一个好友下载游戏，即可增加1次抽奖机会。
          <br>
          每个账号最多可获6次抽奖机会。</p>
        <div class="lott-box">
          <img src="../assets/img/cj-img.jpg"/>
          <a href="javascript:void(0);" class="dl-cj-btn hh"
             @click="showDrawDialog">立即抽奖</a>
        </div>
        <div class="desc-text">
          剩余抽奖次数：<span
          style="color: red;">{{times}}</span> 次<a href="javascript:void(0);" class="lott-btn" @click="showDrawList">
          兑换奖品</a>
          <!--<p>当前预约手机<span style="margin:0 0.1rem;color: red">{{userInfo.mobile}}</span><a class="chang_user"
                                                                                         href="javascript:void(0);"
                                                                                         @click="changeUser()">切换</a>
          </p>-->
        </div>
      </div>
    </div>
    <div class="part part5">
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
    <back-top></back-top>
    <Ordinary></Ordinary>
    <Exdialog @afterSub="subEx"></Exdialog>
    <Register></Register>
    <ks-video></ks-video>
    <K2></K2>
    <k-6></k-6>
    <login></login>
    <forget></forget>
    <!--规则弹窗-->
    <ActRole :show-dialog="showDialog" @show="changeDg"></ActRole>
    <!--奖品列表-->
    <div v-transfer-dom>
      <x-dialog :dialog-class="'weui-dialog k-draw'"
                v-model="drawList" class="kaiser_dialog" :hideOnBlur="hideOnBlur">
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
  import publicTop from '../components/publicTop.vue';
  import Ordinary from '../components/ordinary'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapGetters, mapState} from 'vuex'
  import publicFooter from '../components/footer.vue'
  import * as util from '../utils'
  import BackTop from '../components/BackTop'
  import ActRole from '../components/ActRole'
  import Login from "../components/Login";
  import {clearStorage, confirm, reload} from '@/utils'
  import K2 from "../components/dialog-2";
  import Exdialog from "../components/ExchangeDialog";
  import Register from "../components/Register";
  import Forget from "../components/Forget";
  import K6 from "../components/dialog-6";
  import KsVideo from "../components/video";

  export default {
    components: {
      Forget,
      Register,
      KsVideo,
      Exdialog,
      K2,
      K6,
      Login,
      publicTop,
      Ordinary,
      swiper,
      swiperSlide,
      publicFooter,
      BackTop,
      ActRole
    },
    computed: {
      ...mapState(['downInfo']), // TODO下载数据格式未知，尚未给下载按钮赋值
      ...mapGetters([
        'DONE_SCROLL_LIST', 'invite_num', 'times','curHost','lockIcon'
      ]),
      userInfo() {
        return this.$store.state.index.userInfo
      }
    },
    data() {
      return {
        con: [
          {
            "id": 1,
            "text": "下载即得限定手持",
            "img": require('../assets/img/dl/bag-1.png'),
            "desc": "在官网下载游戏即可获得",
            "long": "官网下载游戏即可获得限定手持、金饼*99、银饼*99999"
          },
          {
            "id": 2,
            "text": "开服狂欢全民好礼",
            "img": require('../assets/img/dl/bag-2.png'),
            "desc": "金饼、学识书、诗会函等",
            "long": "活动期间，小主们完成每日目标任务，即可获得丰厚奖励"
          },
          {
            "id": 3,
            "text": "唐嫣代言专属豪礼",
            "img": require('../assets/img/dl/bag-3.png'),
            "desc": "代言人专属活动等丰厚奖励",
            "long": "金鹰女神唐嫣代言，扫码关注微信资讯抢先知！"
          },
          {
            "id": 4,
            "text": "首日登陆至尊归来",
            "img": require('../assets/img/dl/bag-4.png'),
            "desc": "参与删档付费测试玩家神秘大礼",
            "long": "参与删档付费测试小主们，在不删档正式开启后，使用删测同一账号登录同一平台的首个角色即可获得神秘大礼一份！"
          },
          {
            "id": 5,
            "text": "首日登陆双倍返利",
            "img": require('../assets/img/dl/bag-5.png'),
            "desc": "删档付费测试玩家充值双倍返利",
            "long": "参与删档付费测试小主们，在不删档正式开启后，使用删测账号首日登录的首个角色即可获得删档期间的充值金饼及礼包的双倍返还！"
          },
          {
            "id": 6,
            "text": "七日登陆即得强力伙伴",
            "img": require('../assets/img/dl/bag-6.png'),
            "desc": "开服连续七天登陆可获得丰厚豪礼",
            "long": "活动期间，小主们每日登陆游戏，在“精彩活动”中的“七日登录”面板，即可领取强力伙伴太子妃、李敏德等豪华大礼哦~"
          },
          {
            "id": 7,
            "text": "开服冲榜全民邂逅",
            "img": require('../assets/img/dl/bag-7.png'),
            "desc": "星魂、鸾羽、风灵、学识礼包、名流帖、诗会函等",
            "long": "活动期间，小主们参与榜单冲刺活动，达到指定排名即可获得星魂、鸾羽、风灵、学识礼包、名流帖、诗会函、烟花、花魂等丰厚豪礼哦！"
          },
          {
            "id": 8,
            "text": "邀请好友即得豪礼",
            "img": require('../assets/img/dl/bag-8.png'),
            "desc": "金饼、银饼、精致烟花等",
            "long": "邀请好友下载游戏即可获得丰厚豪礼！"
          },
          {
            "id": 9,
            "text": "幸运抽奖每抽必中",
            "img": require('../assets/img/dl/bag-9.png'),
            "desc": "下载游戏，邀请好友即可抽奖",
            "long": "在官网下载游戏以及邀请好友下载即可获得抽奖机会，每抽必中哦！"
          },
          {
            "id": 10,
            "text": "微信特权福利",
            "img": require('../assets/img/dl/bag-10.png'),
            "desc": "关注官方公众号 更多惊喜豪礼",
            "long": "扫码关注更多福利特权抢先知"
          }
        ],
        showDialog: false,
        hideOnBlur: true,
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
            "title": "1",
            "gift": [
              {
                "icon": "gift-1",
                "img": require('../assets/img/gift/sprite/gift-1.png'),
                "text": "玫瑰*99"
              },
              {
                "icon": "gift-2",
                "img": require('../assets/img/gift/sprite/gift-2.png'),
                "text": "银饼*18888"
              },
              {
                "icon": "gift-3",
                "img": require('../assets/img/gift/sprite/gift-3.png'),
                "text": "普通诗会函*3"
              }
            ],
            "num": 1
          },
          {
            "title": "2",
            "gift": [
              {
                "icon": "gift-4",
                "img": require('../assets/img/gift/sprite/gift-4.png'),
                "text": "金饼*20"
              },
              {
                "icon": "gift-2",
                "img": require('../assets/img/gift/sprite/gift-2.png'),
                "text": "银饼*28888"
              },
              {
                "icon": "gift-5",
                "img": require('../assets/img/gift/sprite/gift-5.png'),
                "text": "高级时装材料礼包*3"
              }
            ],
            "num": 2
          },
          {
            "title": "3",
            "gift": [
              {
                "icon": "gift-6",
                "img": require('../assets/img/gift/sprite/gift-6.png'),
                "text": "同心结*3"
              },
              {
                "icon": "gift-7",
                "img": require('../assets/img/gift/sprite/gift-7.png'),
                "text": "食盒*1"
              },
              {
                "icon": "gift-8",
                "img": require('../assets/img/gift/sprite/gift-8.png'),
                "text": "豪华诗会函*3"
              }
            ],
            "num": 3
          },
          {
            "title": "5",
            "gift": [
              {
                "icon": "gift-4",
                "img": require('../assets/img/gift/sprite/gift-4.png'),
                "text": "金饼*88"
              },
              {
                "icon": "gift-11",
                "img": require('../assets/img/gift/sprite/gift-11.png'),
                "text": "精致烟花*3"
              },
              {
                "icon": "gift-10",
                "img": require('../assets/img/gift/sprite/gift-10.png'),
                "text": "百年好合*1"
              }
            ],
            "num": 5
          }
        ],
        inviteNum: 5,
        drawList: false,
        list: []
      }
    },
    methods: {
      openVideo(){
        this.$store.commit('updateVideo',{show:true});
      },
      showK5(e, item) {
        this.$store.commit('updateDialogType', {data: item, show: true, type: 'k-5'})
      },
      showRule(e) {
        this.showDialog = true;
      },
      changeDg(val) {
        this.showDialog = val
      },
      login() {
        this.$store.commit('loginDg', {show: true, type: 'login'})
      },
      priReceive() {
        if (this.userInfo.user_id !== '') {
          this.$store.commit('chooseSite', {data: this.userInfo.user_id, show: true, type: 'k-ex-1'})
        } else {
          this.login();
        }
      },
      loginOut() {
        confirm('提示', '确认要注销吗？', () => {
          this.$store.dispatch('SDK_LOGOUT')
            .then(res => {
              if (res.code === 10000) {
                clearStorage();
                reload();
              }
            }, ({mes}) => {

            })
        })

      },
      //兑换奖品
      showDrawList() {
        if (this.userInfo.user_id !== '') {
          let pd={
            userId:this.userInfo.user_id,
            type:2
          }
          this.$store.dispatch('DRAWLIST', pd)
            .then(res => {
              if(res.code===10000){
                this.list = res.data;
                this.drawList = true;
              }else{
                this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
              }
            })
        } else {
          this.login()
        }

      },
      // 弹窗点击兑换
      doExchange(n) {
        let pType = n.p_type;
        let pId = n.id;
        this.drawList = false;
        if (pType === "2") {
          this.$store.commit('chooseSite', {
            data: this.userInfo.user_id, show: true, type: 'dj-2', pri: {
              pType: pType,
              pId: pId
            }
          })
        } else {
          this.$store.commit('updateDialogK2', {
            data: {
              type: 'dl',
              pType,
              pId
            }, show: true, type: 'k-2-4'
          })
        }
        // this.$store.commit('updateDialogK2', {show: true, type: 'k-2-4'})
      },
      subEx(val) {
        if (val.type === 'k-ex-1') {
          this.$store.dispatch('ONE', {
            appId: val.appId,
            userId: this.userInfo.user_id,
            serverId: val.serverId,
            roleId: val.role.roleId
          }).then(res => {
            // this.$store.dispatch('UPDATALOCKICON',{appId:val.appId,userId:this.userInfo.user_id})
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
          });
        } else if (val.type === 'k-ex-2') {
          this.$store.dispatch('TWO', {
            button_id:val.button_id,
            appId: val.appId,
            userId: this.userInfo.user_id,
            serverId: val.serverId,
            roleId: val.role.roleId
          }).then(res => {
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
          });
        } else if (val.type === 'dj-2') {
          this.$store.dispatch('getEx', {
            appId: val.appId,
            userId: this.userInfo.user_id,
            serverId: val.serverId,
            roleId: val.role.roleId,
            type: 2,
            id: val.pri.pId,
            pType: val.pri.pType
          }).then(res => {
            this.$store.commit('updateDialogK6', {data: res.msg, show: true, type: 'k-6-2'})
          });
        }

      },
      showInvite() {

        if (this.userInfo.user_id !== '') {
          this.$store.commit('updateDialogType', {data: this.userInfo.user_id, show: true, type: 'k-1'})
        } else {
          this.login();
        }
      },
      // 抽奖
      showDrawDialog() {
        if (this.userInfo.user_id !== '') {
          this.$store.dispatch('DRAW', this.userInfo.user_id).then(res => {
            this.$store.dispatch('TIMES', {userId:this.userInfo.user_id,type:2});
            if (res.code === 10010) {
              this.$store.commit('updateDialogK2', {data: '0', show: true, type: 'k-2-3'})
            } else if (res.code === 10000) {
              this.$store.commit('updateDialogK2', {data: res.data, show: true, type: 'k-2-2'})
            } else {
              alert(res.msg)
            }
          })

        } else {
          this.login();
        }
      },

      friendPri(type,button_id) {
        if (type) {
          if (this.userInfo.user_id !== '') {
            this.$store.commit('chooseSite', {data: this.userInfo.user_id, button_id:button_id, show: true, type: 'k-ex-2'})
          } else {
            this.login();
          }
        }

      }
    },
    created() {
      if (util.isEmpty(this.DONE_SCROLL_LIST)) {
        //轮播
        this.$store.dispatch('FETCH_SCROLL_LIST')
          .then(() => {
            //  console.log(this.DONE_SCROLL_LIST)
          })
      }
    },
    watch: {
      userInfo: {
        handler(curVal, oldVal) {
          if (curVal.user_id !== '') {
            this.$store.dispatch('APPOINT_NUM', curVal.user_id);
            this.$store.dispatch('TIMES', {userId:curVal.user_id,type:2})
          }
        },
        deep: true
      }
    },
    mounted() {
      this.$store.commit('updateUserInfo', null);
    }
  }

</script>


<style lang="less">
  @import "~swiper/dist/css/swiper.css";
  @import "../assets/css/mixin";

  .part-loop(@n, @i:1) when (@i <= @n) {
    .part@{i} {
      background: url("../assets/img/download/bg-@{i}.jpg") center top no-repeat;
      background-size: 100% auto;
      width: 100%;
    }
    .part-loop(@n, (@i + 1));
  }

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

  .icon-hadRec {
    background: url("../assets/img/hadRec.png") no-repeat;
    background-size: 100% auto;
    width: 1.77rem;
    height: 0.32rem;
    display: inline-block;
  }
  .icon-noRec{
    background: url("../assets/img/noRec.png") no-repeat;
      background-size: 100% auto;
      width: 1.77rem;
      height: 0.32rem;
      display: inline-block;
  }
  .icon-lock {
    background: url("../assets/img/download/lock.png") no-repeat;
    background-size: 100% auto;
    width: 1.77rem;
    height: 0.32rem;
    display: inline-block;
  }

  .pub-btn {
    display: block;
    background: url("../assets/img/download/ljlq-btn.png");
    background-size: 100%;
    width: 2.82rem;
    height: 0.64rem;
    margin: 0.3rem auto 0;
  }

  .dl-container {
    width: 100%;
    overflow-x: hidden;
    text-align: center;
    .tit {
      margin: 0.4rem auto 0;
    }
    .part-loop(5);
    .part1 {
      height: 9.90rem;
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
    }
    .part2 {
      height: 18.86rem;
      .dl-inner {
        background: url("../assets/img/download/dl-bg.png");
        background-size: 100%;
        width: 100%;
        height: 4.1rem;
        overflow: hidden;
        .gift-box {
          width: 5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 1.4rem auto 0;
          p.g-icon {
            background: url("../assets/img/download/gift-bg.png");
            background-size: 100%;
            height: 1.05rem;
            width: 1.06rem;
            line-height: 1.05rem;
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
      .tit1 {
        background: url(../assets/img/download/tit1.png) no-repeat;
        background-size: 100%;
        width: 7.5rem;
        height: 1.05rem;
      }
      .fl-box {
        margin-top: 0.35rem;
        text-align: center;
        ul {
          display: flex;
          flex-flow: wrap;
          padding: 0 0.38rem;
          li {
            width: 2.1rem;
            height: 3rem;
            display: inline-block;
            position: relative;
            background: url(../assets/img/download/fl-bg.png) no-repeat;
            background-size: 100%;
            margin: 0.05rem;
            &:nth-child(1) {
              margin-left: 1.2rem;
            }
            &:nth-child(2) {
              margin-right: 1.2rem;
            }
            &:nth-last-of-type(1) {
              margin-right: 1.2rem;
            }
            &:nth-last-of-type(2) {
              margin-left: 1.2rem;
            }
            .fl-icon-loop(10);
            .bag {
              .posMiddle(x, absolute);
              top: .2rem;
            }
            img {
              height: 0.8rem;
              display: block;
              .posMiddle(x, absolute);
              top: 0.78rem;

            }
            .text1 {
              .posMiddle(x, absolute);
              top: 1.65rem;
              width: 100%;
              font-size: 0.24rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.3rem;
              letter-spacing: 0px;
              color: #ee505f;
            }
            .text2 {
              .posMiddle(x, absolute);
              top: 2.15rem;
              width: 100%;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.3rem;
              letter-spacing: 0px;
              color: #606162;
              transform: translateX(-50%) scale(0.625);
            }
          }
        }
      }
    }
    .part3 {
      height: 13.45rem;
      overflow: hidden;
      .tit2 {
        background: url(../assets/img/download/tit4.png) no-repeat;
        background-size: 100%;
        width: 7.5rem;
        height: 0.51rem;
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
                height: 0.9rem;
                line-height: 0.9rem;
                padding-left: 0.2rem;
                img {
                  width: 0.67rem;
                  height: auto;
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
            .gift-type {
              position: absolute;
              top: 4rem;
              width: 100%;
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
    .part4 {
      height: 11.75rem;
      .desc-text {
        margin-top: 0.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
      }
      .lott-btn {
        border-radius: 10px;
        border: solid 1px #898989;
        color: #686868;
        margin-left: 0.48rem;
        font-size: 0.2rem;
        padding: 0.06rem 0.2rem;
      }
      .tit5 {
        background: url(../assets/img/download/tit5.png) no-repeat;
        background-size: 100%;
        width: 7.5rem;
        height: 0.51rem;
        margin: 0 auto;
      }
      .lott-box {

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
    .part5 {
      height: 7.96rem;
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
      .tit6 {
        background: url(../assets/img/download/tit6.png) no-repeat;
        background-size: 100%;
        width: 7.13rem;
        height: 0.51rem;
        margin: 0 auto;
      }
      .icon-rule {
        width: 3.7rem;
        height: 0.97rem;
        background: url("../assets/img/download/dl-rule.png") no-repeat top;
        background-size: 100% 100%;
        margin: 0.25rem auto 0;
      }
    }
  }

  .part1-title {
    background: url(../assets/img/download/part1-title.png) no-repeat;
    background-size: 100% 100%;
    width: 5.38rem;
    height: 2.7rem;
    top: 5.8rem;
    left: 1rem;
  }
  .part1-video{
    background: url("../assets/img/download/play-circle.png") no-repeat;
    width: 0.80rem;
    height: 0.72rem;
    background-size: 100% 100%;
    position: absolute;
    left: 5.5rem;
    top: 6.2rem;
    animation:video 5s infinite;
    -webkit-animation:video 5s infinite; /* Safari 和 Chrome */
  }
  .part1-angle{
    background: url("../assets/img/download/play-btn.png") no-repeat;
    width: 0.13rem;
    height: 0.2rem;
    background-size: 100% 100%;
    position: absolute;
    left: 5.8rem;
    top: 6.42rem;
  }
  .part1-subtit {
    background: url("../assets/img/download/sub-title.png") no-repeat;
    background-size: 6.59rem auto;
    width: 6.59rem;
    height: 0.52rem;
    top: 7.9rem;
    left: 0.44rem;
  }

  .down-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 7.5rem;
    top: 9rem;
    a {
      width: 3.05rem;
      height: 0.75rem;
      margin: 0 0.09rem;
      &.az-btn {
        background: url("../assets/img/download/az.png") no-repeat;
        background-size: 2.40rem .59rem;
      }
      &.ios-btn {
        background: url("../assets/img/download/download.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .tips {
    padding-top: 0.26rem;
    color: #686868;
    font-size: 0.2rem;
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
        text-align: left;
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
            .gift-name{
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
              font-size: .14rem;
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

@-webkit-keyframes video {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-moz-keyframes video {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-ms-keyframes video {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-o-keyframes video {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes video {
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
