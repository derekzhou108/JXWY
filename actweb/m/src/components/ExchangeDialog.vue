<template>
  <div v-transfer-dom>
    <x-dialog v-model="exdg.show" @on-show="err='';" class="kaiser_dialog"
              :dialog-class="'weui-dialog k-ex '+exdg.type"
              :hideOnBlur="true">
      <span class="close-btn" @click="closeDialog"></span>
      <div class="title"><span>请小主选择系统和服务器</span></div>
      <div class="subtitle"><span>奖励将通过邮件发放，请注意查收</span></div>
      <group>
        <selector class="input-h" placeholder="请选择系统" v-model="appId" title="选择系统" name="appId" :options="list1" ref="gameArea"
                  :value-map="['appid','app_name']"
                  @on-change="onChange"></selector>
        <selector class="input-h" placeholder="请选择大区" v-model="serverId" title="选择区服" name="serverId" :options="list2"
                  :value-map="['id','serverName']"
                  @on-change="onChange2"></selector>
        <x-input class="input-h" title="角色名称" v-model="partName" :readonly="true"></x-input>
      </group>
      <div class="loading-tips">{{loadingTips}}</div>
      <div class="footer-qu">
        <button type="button" class="dialog-btn" @click="exSubmit">确 认</button>
      </div>
      <div class="msg-container"><span class="error-msg">{{err}}</span></div>
    </x-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Group, Selector } from "vux";
import XInput from "vux/src/components/x-input/index";

export default {
  name: "exdialog",
  components: {
    XInput,
    Group,
    Selector
  },
  data() {
    return {
      appId: "",
      serverId: "",
      list1: [],
      list2: [],
      partName: "",
      err: "",
      defaultList: [],
      role: "",
      loadingTips: ""
    };
  },
  computed: {
    ...mapState(["exdg"])
  },
  methods: {
    closeDialog() {
      this.$store.commit("chooseSite", { data: {}, show: false, type: "k-ex" });
    },
    onChange(val) {
      this.list2 = this.defaultList[val].serverList;
      this.partName = "";
      this.loadingTips = "";
    },
    onChange2(val) {
      this.loadingTips = "正在为小主查询角色，请稍后~";
      this.err = "";
      setTimeout(() => {
        this.$store
          .dispatch("GAMEINFO", {
            appId: this.appId,
            userId: this.exdg.data,
            serverId: val
          })
          .then(res => {
            this.loadingTips = "";
            this.partName = res[0].roleName;
            this.role = res[0];
          })
          .catch(err => {
            this.loadingTips = err;
          });
      }, 500);
    },
    exSubmit() {
      this.loadingTips = '';
      if (this.appId === "") {
        this.err = "请选择系统";
        return;
      }
      if (this.serverId === "") {
        this.err = "请选择区服";
        return;
      }
      if (this.role === "") {
        this.err = "未查询到角色";
        return;
      }
      if (this.exdg.type === "dj-2") {
        this.$emit("afterSub", {
          appId: this.appId,
          serverId: this.serverId,
          role: this.role,
          type: this.exdg.type,
          button_id: this.exdg.button_id,
          pri: this.exdg.pri
        });
      } else {
        this.$emit("afterSub", {
          appId: this.appId,
          serverId: this.serverId,
          role: this.role,
          type: this.exdg.type,
          button_id: this.exdg.button_id
        });
      }
      this.closeDialog();
    }
  },
  mounted() {
    this.$store.dispatch("USERINFO").then(
      res => {
        this.defaultList = res;
        Object.keys(res).forEach(name => {
          this.list1.push(res[name]);
        });
      },
      e => {
        this.err = e;
      }
    );
  }
};
</script>

<style lang="less">
.kaiser_dialog {
  .k-ex {
    overflow: visible;
    background: url("../assets/img/download/k7-bg.png") no-repeat center;
    background-size: 100% 100%;
    width: 5.74rem;
    height: 3.78rem;
    padding-top: 0.2rem;
    max-width: 5.74rem;
    .input-h {
      height: 0.6rem;
    }
    .title {
      padding: 0.15rem 0 0;
      span {
        font-size: 0.3rem;
        line-height: 0.32rem;
        letter-spacing: 1px;
        color: #ee2323;
      }
    }
    .subtitle {
      line-height: 0.5rem;
      span {
        font-size: 0.2rem;
        color: #8d8c8c;
      }
    }
    .weui-cells {
      transform: scale(0.75);
      margin-top: -0.25rem;
      background-color: transparent;
      .weui-label {
        width: 1.4rem;
        font-size: 0.28rem;
      }
      .weui-select {
        font-size: 0.28rem;
      }
      .weui-cell__bd {
        font-size: 0.28rem;
      }
    }
    .loading-tips {
      font-size: 0.24rem;
      color: #ee2323;
      margin-top: -0.2rem;
    }
    .footer-qu {
      height: 0.54rem;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      padding: 0;
      border: none;
      width: 1.6rem;
      position: absolute;
      bottom: 0.2rem;
      left: 50%;
      margin-left: -0.8rem;
      & > button {
        border: none;
        color: #fff;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to bottom, #fbdf8f, #e5b220);
        font-size: 0.26rem;
        font-weight: bold;
      }
    }
    .msg-container {
      margin-top: -0.3rem;
    }
  }
}
</style>
