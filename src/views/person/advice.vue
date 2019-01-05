<template>
  <div>
    <div class="adviceHead">
      <i class="iconfont icon-25 adviceBack" @click="goBack"></i> 意见反馈
    </div>
    <p class="adviceWord">如果您在使用本APP的过程中遇到任何问题，请留下您的宝贵意见和联系方式，我们会及时与您取得联系:</p>
    <textarea
      class="adviceMessage"
      id
      cols="30"
      rows="10"
      placeholder="请填写意见反馈"
      v-model="advice.message"
    ></textarea>
    <input class="advicePhone" type="text" placeholder="请填写11位手机号码" v-model="advice.phone">
    <p class="star">
      <span>请为我们评分:</span>
      <el-rate v-model="advice.star" show-text></el-rate>
    </p>
    <div class="adviceConfirmButton" :class="isWrite" @click="goConfirm">确认提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      advice: {
        message: "",
        phone: "",
        star: null
      }
    };
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
  },
  computed: {
    isWrite() {
      if (
        this.advice.message.replace(/\s*/g, "") &&
        this.advice.phone.replace(/\s*/g, "") &&
        this.advice.star
      ) {
        return "adviceChecked";
      } else {
        return "adviceUnchecked";
      }
    }
  },
  methods: {
    goConfirm() {
      if (
        this.advice.message.replace(/\s*/g, "") &&
        this.advice.phone.replace(/\s*/g, "") &&
        this.advice.star
      ) {
        if (!/^1[34578]\d{9}$/.test(this.advice.phone)) {
          this.$toast({
            message: "请填写正确的手机格式!"
          });
        } else {
          this.$indicator.open({
            spinnerType: "fading-circle"
          });
          setTimeout(() => {
            this.$indicator.close();
            this.$toast({
              message: "评价成功,感谢您的评价!"
            });
            this.$router.go(-1);
          }, 1500);
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.adviceHead {
  height: 8vh;
  box-sizing: border-box;
  border-bottom: 1px solid #f0eff4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.adviceBack {
  position: absolute;
  left: 4vw;
  color: #bbd2c2;
}
.adviceWord {
  margin: 15px 4vw;
  font-size: 12px;
}
.adviceMessage,
.advicePhone {
  margin-left: 4vw;
  width: calc(100% - 8vw);
  border: 1px solid #f0eff4;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  padding-left: 8px;
}
.adviceMessage::-webkit-input-placeholder {
  line-height: 20px;
  font-size: 12px;
}
.adviceMessage {
  height: 15vh;
  line-height: 20px;
}
.advicePhone {
  height: 6vh;
  margin-top: 15px;
}
.star {
  margin-left: 4vw;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.star > span {
  font-size: 12px;
  margin-bottom: 30px;
}
.adviceConfirmButton {
  margin-left: 4vw;
  margin-top: 20px;
  width: calc(100% - 8vw);
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
}
.adviceChecked {
  background-color: rgb(189, 210, 194);
}
.adviceUnchecked {
  background-color: rgba(189, 210, 194, 0.4);
}
.el-rate {
  text-align: center;
  position: relative;
}
.el-rate__text {
  width: 30px;
  text-align: center;
  position: absolute;
  left: 50%;
  margin-left: -15px;
  top: -20px;
}
</style>


