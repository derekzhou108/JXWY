<template>
  <div class="appointmentComponent">
    <!--创建预约-->
    <div v-transfer-dom>
      <x-dialog v-model="dialogStatus" class="dialog_yy">
        <div class="yy-container">
          <div class="d-body u-bgs-100">
            <div class="d-ewm">
              <img class="ewm_img" src="../assets/img/ewm_img.jpg" alt="">
            </div>
            <div class="d-info">
              <input type="text" class="yym" placeholder="请输入预约码" v-model="ewm_code">
              <input type="text" class="phone" placeholder="请输入手机号" maxlength="11" v-model="phone_num">
            </div>
            <div class="d-btn flex flex-center">
              <div class="btn btn_az u-bgs-100" :class="{active:isAZSelected}" @click="isAZSelected = true,isIOSSelected=false,phone_type = 1"></div>
              <div class="btn btn_ios u-bgs-100" :class="{active:isIOSSelected}" @click="isAZSelected = false,isIOSSelected=true,phone_type = 0"></div>
            </div>
            <div class="d-btn_yy">
              <div class="d-btn_yy_btn" @click="appointmentCreate"></div>
            </div>
            <div class="d-gift flex flex-center">
              <div class="gift gift1 u-bgs-100"></div>
              <div class="gift gift2 u-bgs-100"></div>
              <div class="gift gift3 u-bgs-100"></div>
              <div class="gift gift4 u-bgs-100"></div>
            </div>
          </div>
          <div class="d-footer">
            <div class="d-close u-bgs-100" @click="closeDialog()"></div>
          </div>
        </div>
      </x-dialog>
    </div>

    <!--预约失败-->
    <div v-transfer-dom>
      <x-dialog v-model="showError" class="dialog_error">
        <div>
          <div class="d-body u-bgs-100">
            <div class="mes">{{showErrorMsg}}</div>
          </div>
          <div class="d-footer">
            <div class="d-close u-bgs-100" @click="showError=false"></div>
          </div>
        </div>
      </x-dialog>
    </div>

    <!--预约成功-->
    <div v-transfer-dom>
      <x-dialog v-model="showSuccess" class="dialog_succ">
        <div>
          <div class="d-body u-bgs-100">
            <div class="msg">
              <p>亲爱的守墓人，恭喜预约成功！</p>
              <p>预约礼包将在测试时发放，请等待盗墓者游戏发布吧。</p>
            </div>
          </div>
          <div class="d-footer">
            <div class="d-close u-bgs-100" @click="showSuccess=false"></div>
          </div>
        </div>
      </x-dialog>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import { XDialog, TransferDomDirective as TransferDom } from "vux";
export default {
    directives: {
        TransferDom
    },
    components: {
        XDialog
    },
    data() {
        return {
            isAZSelected: false,
            isIOSSelected: false,
            showSuccess: false,
            showError: false,
            showIsExit: false,
            showErrorMsg: "",
            phone_type: -1,
            phone_num: "",
            ewm_code: ""
        };
    },
    computed: {
        ...mapState(["dialogStatus", "IsIpad"])
    },
    methods: {
        closeDialog() {
            this.$store.commit("updateDialogStatus", { dialogStatus: false });
        },
        appointmentCreate() {
            var self = this;
            let data = {
                app_label: self.phone_type,
                mobile: self.phone_num,
                code: self.ewm_code
            };
            console.log(data);
            this.$store.dispatch("POST_APPOINTMENT", data).then(
                res => {
                    this.closeDialog();
                    if (res.code == 1) {
                        this.showSuccess = true;
                        this.showError = false;
                    } else {
                        this.showError = true;
                        this.showSuccess = false;
                        this.showErrorMsg = res.msg;
                    }
                },
                ({ mes }) => {
                    console.log(mes);
                    this.closeDialog();
                    this.showError = true;
                    this.showErrorMsg = mes;
                }
            );
        }
    }
};
</script>

<style lang="less" scoped>
.appointmentComponent {
    .isIpad {
        /*transform: scale(.8);*/
    }
    .yy-container {
        /*transform: scale(.85);*/
    }

    .d-footer {
        .d-close {
            background: url("../assets/img/btn_close.png") no-repeat center;
            height: 1.01rem;
            width: 0.88rem;
            margin: 0 auto;
            margin-top: 0.1rem;
        }
    }

    /*.isIpad{*/
    /*.weui-dialog{*/
    /*background-color: transparent!important;*/
    /*border-radius: 0!important;*/
    /*width: 5.2rem!important;*/
    /*max-width: 5.2rem!important;*/
    /*overflow: visible!important;*/
    /*}*/
    /*.d-body{*/
    /*background: url("../assets/img/dialog_yy.jpg")no-repeat center;*/
    /*width: 5.2rem;*/
    /*height: 6.6rem;*/
    /*.d-ewm{*/
    /*padding-top: 0.8rem;*/
    /*.ewm_img{*/
    /*height: 1.3rem;*/
    /*width: 1.3rem;*/
    /*}*/
    /*}*/
    /*.d-info{*/
    /*padding-top: 0.45rem;*/
    /*margin-left: 0.3rem;*/
    /*!*margin-bottom: 0rem;*!*/
    /*.yym{*/
    /*!*margin-top: 0.1rem;*!*/
    /*!*padding-top: 0.1rem;*!*/
    /*!*margin-top: 0.1rem;*!*/

    /*}*/
    /*.phone{*/
    /*!*padding-top: 0.1rem;*!*/
    /*}*/
    /*input{*/
    /*display: inline-block;*/
    /*width: 3.2rem;*/
    /*background: rgba(255, 0, 0, 0);*/
    /*font-size: 0.14rem;*/
    /*height: 0.2rem!important;*/
    /*line-height: 0.2rem!important;*/
    /*margin: 0;*/
    /*padding: 0.02rem;*/
    /*margin-left: 0.6rem;*/
    /*}*/
    /*}*/
    /*.d-btn{*/
    /*margin-left: 0.1rem;*/
    /*.btn{*/
    /*margin: 0rem 0.2rem 0.2rem 0rem;*/
    /*height: 0.3rem;*/
    /*width: 1.1rem;*/
    /*}*/
    /*.btn_az{*/
    /*background: url("../assets/img/btn_android1.png")no-repeat center;*/
    /*&.active{*/
    /*background: url("../assets/img/btn_android2.png")no-repeat center;*/
    /*}*/
    /*}*/
    /*.btn_ios{*/
    /*background: url("../assets/img/btn_ios1.png")no-repeat center;*/
    /*&.active{*/
    /*background: url("../assets/img/btn_ios2.png")no-repeat center;*/
    /*}*/
    /*}*/
    /*}*/
    /*.d-btn_yy{*/
    /*.d-btn_yy_btn{*/
    /*height: 0.6rem;*/
    /*width: 2.4rem;*/
    /*margin: 0 auto;*/
    /*}*/
    /*}*/
    /*.d-gift{*/
    /*padding-top: 0.8rem;*/
    /*.gift{*/
    /*height: 1rem;*/
    /*width: 1rem;*/
    /*}*/
    /*.gift1{*/
    /*background: url("../assets/img/gift1.png")no-repeat center;*/
    /*}*/
    /*.gift2{*/
    /*background: url("../assets/img/gift2.png")no-repeat center;*/
    /*}*/
    /*.gift3{*/
    /*background: url("../assets/img/gift3.png")no-repeat center;*/
    /*}*/
    /*.gift4{*/
    /*background: url("../assets/img/gift4.png")no-repeat center;*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/
    /*@media (min-width: 767px){*/
    /*.yy-container{*/
    /*transform: scale(.65);*/
    /*}*/
    /*}*/
}
</style>

<style lang="less">
.appointmentComponent {
    .dialog_yy {
        .weui-dialog {
            background-color: transparent !important;
            border-radius: 0 !important;
            width: 5.21rem !important;
            max-width: 5.6rem !important;
            overflow: visible !important;
        }
        .d-body {
            /*background: url("../assets/img/dialog_yy.jpg")no-repeat center;*/
            width: 5.21rem;
            height: 9.66rem;
            .d-ewm {
                padding-top: 1.3rem;
                .ewm_img {
                    height: 1.57rem;
                    width: 1.57rem;
                }
            }
            .d-info {
                padding-top: 1.1rem;
                margin-left: 0.3rem;
                margin-bottom: 0.2rem;
                input {
                    display: block;
                    width: 3.25rem;
                    padding: 0 0.1rem;
                    margin-left: 1.14rem;
                    background: none;
                    font-size: 0.2rem;
                    height: 0.4rem;
                    border: none;
                }
                .phone {
                    margin-top: 0.15rem;
                }
            }
            .d-btn {
                margin-left: 0.05rem;
                .btn {
                    margin: 0rem 0.2rem 0.2rem 0rem;
                    height: 0.26rem;
                    width: 0.99rem;
                }
                .btn_az {
                    /*background: url("../assets/img/btn_android1.png")no-repeat center;*/
                    &.active {
                        /*background: url("../assets/img/btn_android2.png")no-repeat center;*/
                    }
                }
                .btn_ios {
                    /*background: url("../assets/img/btn_ios1.png")no-repeat center;*/
                    &.active {
                        /*background: url("../assets/img/btn_ios2.png")no-repeat center;*/
                    }
                }
            }
            .d-btn_yy {
                .d-btn_yy_btn {
                    height: 0.6rem;
                    width: 2.4rem;
                    margin: 0 auto;
                }
            }
            .d-gift {
                padding-top: 1.8rem;
                .gift {
                    height: 0.83rem;
                    width: 0.85rem;
                }
                .gift1 {
                    background: url("../assets/img/gift1.png") no-repeat center;
                }
                .gift2 {
                    background: url("../assets/img/gift2.png") no-repeat center;
                }
                .gift3 {
                    background: url("../assets/img/gift3.png") no-repeat center;
                }
                .gift4 {
                    background: url("../assets/img/gift4.png") no-repeat center;
                }
            }
        }
    }
    .dialog_error {
        .weui-dialog {
            background-color: transparent !important;
            border-radius: 0 !important;
            width: 6rem !important;
            max-width: 6rem !important;
            overflow: visible !important;
        }
        .d-body {
            background: url("../assets/img/dialog_failed.jpg") no-repeat center;
            height: 3.2rem;
            width: 6rem;
            .mes {
                padding-top: 1.8rem;
                font-size: 0.22rem;
            }
        }
    }
    .dialog_succ {
        .weui-dialog {
            background-color: transparent !important;
            border-radius: 0 !important;
            width: 6rem !important;
            max-width: 6rem !important;
            overflow: visible !important;
        }
        .d-body {
            background: url("../assets/img/dialog_succ.jpg") no-repeat center;
            height: 3.2rem;
            width: 6rem;
            .msg {
                padding-top: 1.8rem;
                font-size: 0.22rem;
            }
        }
    }
}
</style>