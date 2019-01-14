<template>
  <div id="setting">
    <div class="header">
      <i
        @click="back"
        class="iconfont icon-25"
      ></i>
    </div>

    <div class="content">
      <div @click="goUpdata()">
        <div class="contentWord">
          <span class="iconfont icon-caidaniconwodehui"></span>
          <span>修改个人信息</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div @click="signOut()">
        <div class="contentWord">
          <span class="iconfont icon-tuichu"></span>
          <span>退出登录</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    
  }
};
</script>

<style lang="scss">
#setting {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../.././assets/person/settingBG.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    font-size: 15px;
    .icon-25 {
      color: #c7d0b9;
      font-size: 20px;
      padding: 10px;
    }
  }
  .content {
    > div {
      height: 8vh;
      box-sizing: border-box;
      margin: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        border-bottom: 1px solid #f0eff4;
      }
      .contentWord {
        font-size: 13px;
        display: flex;
        align-items: center;
        color: #333;
        > span {
          &:last-child {
            margin-left: 15px;
          }
        }
        .iconfont {
          font-size: 22px;
          width: 22px;
          height: 22px;
          color: #c7d0b9;
        }
      }
      .icon-right {
        color: #999;
      }
    }
  }
  .searchconfirmButton {
    color: #91b493;
  }
}
</style>


