<template>
  <div v-transfer-dom>
    <x-dialog :dialog-class="'weui-dialog k-6 '+k6.type"
              v-model="k6.show" class="kaiser_dialog" :hideOnBlur="true">
      <span class="close-btn" @click="closeDialog()"></span>
      <template v-if="k6.type === 'k-6-1'">
        <div class="k6-body">
          <div class="dialog-btn">
            <button type="button" @click="showK2()">我已预约</button>
          </div>
          <div class="dialog-btn">
            <button type="button" @click="showK3()">立即预约</button>
          </div>
        </div>

      </template>
      <template v-else-if="k6.type === 'k-6-2'">
        <div class="body"><span class="dialog-body-6-2">{{k6.data}}</span></div>
        <div class="footer footer-dialog">
          <button type="button" class="dialog-btn-6-2" @click="closeDialog()">确 认</button>
        </div>
      </template>
    </x-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "k-6",
  data() {
    return {};
  },
  computed: {
    ...mapState(["k6"])
    // ...mapState({
    //  k6: state => {
    //    state.k6
    //  }
    // })
  },
  methods: {
    closeDialog() {
      this.$store.commit("updateDialogK6", { show: false, type: "" });
    },
    showK3() {
      this.closeDialog();
      this.$store.commit("updateDialogStatus", { dialogStatus: true });
    },
    showK2() {
      this.closeDialog();
      this.$store.commit("updateDialogK2", {
        data: {},
        show: true,
        type: "k-2-1"
      });
    }
  }
};
</script>
<style lang="less">
.kaiser_dialog {
  .k-6 {
    overflow: visible;
    background: url("../assets/img/k-6.png") no-repeat center;
    background-size: 100%;
    width: 4.38rem;
    height: 2.37rem;
    max-width: 4.38rem;
    .k6-body {
      padding: 0.33rem 0;
    }
  }
}

.k-6 {
  .dialog-btn {
    height: 0.54rem;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    border: none;
    width: 2.5rem;
    margin: 0.25rem auto 0px;
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
      padding: 0 0.4rem;
      display: block;
    }
  }
}
.dialog-body-6-2 {
  display: inline-block;
  padding-top: 0.6rem;
  width: 78%;
  font-size: 0.26rem;
}
.footer-dialog{
    position: absolute;
    bottom: 0.3rem;
    left: 50%;
    margin-left: -0.8rem;
    .dialog-btn-6-2 {
      color: #fff;
      background-image: -webkit-linear-gradient(top, #fbdf8f, #e5b220);
      background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
      font-size: 0.26rem;
      font-weight: bold;
      height: 0.54rem;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      padding: 0;
      border: none;
      width: 1.6rem;
  }
}

</style>
