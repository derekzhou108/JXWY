<template>
  <!--顶部-->
  <div class="topHeader">
    <section class="">
      <div class="top-float flex u-bgs100" style="">
        <div class="icon-warp flex-main-end u-mt15 u-ml15 u-bgs100"></div>
        <div class="text flex-item u-ml20 u-mt15">
          <h2>锦绣未央</h2>
          <p>古风恋爱养成手游</p>
        </div>
        <a href="/site/index" class="to_gw flex-main-end  u-mt20 u-ffs u-fs22 u-bgs100"
           style="text-decoration: none;"></a>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    props: {
      href: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState(['downInfo']),
    },
    methods: {}
  }
</script>
<style lang="less" scoped>

  .topHeader {
    display: block;
    background: url("../assets/img/top-bg.png");
    position: relative;
    height: 0.996rem;
    text-align: left;
    .top-float {
      display: flex;
      z-index: 8;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .text {
        margin-top: 0.15rem;
        margin-left: 0.2rem;
        flex: 1;
        color: #fff;
        h2 {
          font-size: .32rem;
          height: .32rem;
          line-height: .32rem;
        }
        p {
          font-size: .22rem;
          margin-top: .05rem;
        }
      }
      .to_gw {
        position: relative;
        right: 0.22rem;
        width: 2.35rem;
        height: 0.63rem;
        line-height: 0.58rem;
        background: url("../assets/img/Mdownload.png") no-repeat center;
        background-size: 100%;
        color: #ffffff;
        font-size: 0.29rem;
        text-align: center;
      }
    }
    .icon-warp {
      background: url("../assets/img/top-logo.png") no-repeat;
      width: 1.29rem;
      height: 1.29rem;
      background-size: 100% 100%;
      margin-top: 0.15rem;
      margin-left: 0.15rem;
    }
  }
</style>
