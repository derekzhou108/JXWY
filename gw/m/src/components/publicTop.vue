<template>
  <div class="publicTopComponent">
    <div class=" publicTop clearfix">
      <div class="top-icon u-fl"><img class="top-icon-img" src="../assets/img/nav-icon.png" alt=""></div>
      <div class="u-fl title">
        <p class="u-fs28 title-name">锦绣未央</p>
        <p class="u-fs20 desc">古风恋爱养成手游</p>
      </div>
      <div class="btn-download u-fr">
        <!-- <a href="http://jxwy.ksgame.com/download/scan" class="appointment"></a> -->
        <a :href="curHost" class="appointment"></a>
        <!-- <a v-else @click="wait()"><img src="../assets/img/btn-download.png" alt=""></a> -->
      </div>
      <!--<div class="btn-download u-fr " @click="wait()" ><img src="../assets/img/btn-download.png" alt=""></div>-->
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters} from "vuex";

  export default {
    props: {
      href: {
        type: String,
        default: ""
      }
    },
    computed: {
      ...mapState(["downInfo"]),
      ...mapGetters([
        'curHost'
      ])
    },
    methods: {
      toDownload: function () {
        this.$router.push({
          name: "Download"
        });
      },
      wait: function () {
        alert("敬请期待");
      }
    }
  };
</script>

<style lang="less" scoped>
  .publicTopComponent {
    .publicTop {
      background: #f3f3f3;
      height: 1.07rem;
      width: 100%;
      position: relative;
      z-index: 9;
      overflow: hidden;
      .top-icon {
        img {
          border-radius: 0.14rem;
          margin: 0.09rem 0.31rem 0.12rem 0.23rem;
          width: 0.86rem;
          height: 0.86rem;
        }
      }
      .title {
        margin-top: 0.12rem;
        .title-name {
          color: #7a6849;
          font-size: 0.31rem;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 0.1rem;
        }
        .desc {
          height: 0.4rem;
          line-height: 0.4rem;
          color: #7a6849;
          font-size: 0.21rem;
          margin-top: 0.07rem;
          position: relative;
          &::before,
          &::after {
            content: "";
            display: inline-block;
            background: url("../assets/img/txt-line.png") no-repeat center;
            width: 100%;
            height: 1px;
            position: absolute;
            left: 0;
            background-size: 100% 100%;
          }
          &::before {
            top: 0;
          }
          &:after {
            bottom: 0;
          }
        }
      }
      .btn-download {
        // img {
        //     width: 2.35rem;
        //     height: 0.63rem;
        //
        // }
        .appointment {
          display: inline-block;
          width: 2.35rem;
          height: 0.63rem;
          background: url("../assets/img/download-one.png") left top;
          line-height: 0.63rem;
          text-align: center;
          color: #fff;
          margin: 0.2rem 0.22rem 0.24rem 0;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
