<template>
  <div id="person">
    <div class="header">
      <template v-if="user">
        <img
          src="../../assets/login/login.jpeg"
          alt
          class="personPic"
        >
        <span>{{user.name}}</span>
      </template>
      <template v-if="!user">
        <img
          src="../../assets/login/default.jpeg"
          alt
          class="personPic"
        >
        <span>未知的人类</span>
      </template>
      <template v-if="!user">
        <div
          class="loginButton"
          @click="goLogin"
        >登录</div>
        <p @click="goRegister">注册新账号</p>
      </template>
    </div>
    <div class="content">
      <div @click="goSetting()">
        <div class="contentWord">
          <span class="iconfont icon-shezhi"></span>
          <span>个人设置</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div @click="goCollection()">
        <div class="contentWord">
          <span class="iconfont icon-shoucang1"></span>
          <span>我的收藏</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div>
        <div class="contentWord">
          <span class="iconfont icon-6"></span>
          <span>意见反馈</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div @click="clearBtn()">
        <div class="contentWord">
          <span class="iconfont icon-clear"></span>
          <span>清除缓存</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div @click="check()">
        <div class="contentWord">
          <span class="iconfont icon-huojian"></span>
          <span>检查更新</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    if (!this.$store.state.showTab) {
      this.$store.commit("change");
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      this.user = userInfo;
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ path: "/login", query: { from: "/person" } });
    },
    goRegister() {
      this.$router.push({ path: "/register", query: { from: "/person" } });
    },
    goSetting() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.$store.commit("addToken", userInfo.uid);
        this.$router.push({
          path: "/setting"
        });
      } else {
        this.$router.push({ path: "/login", query: { from: "/person" } });
      }
    },
    goCollection() {
      this.$router.push({
        path: '/collection'
      })
    },
    check() {
      this.$toast({
        message: "当前是最新版本了！"
      });
    },
    //清除缓存
    clearBtn() {
      if (localStorage.getItem("userInfo")) {
        this.$messagebox
          .confirm("", {
            message: "确认清除缓存?",
            confirmButtonClass: "searchconfirmButton",
            confirmButtonText: "确认",
            cancelButtonText: "考虑考虑"
          })
          .then(action => {
            if (action == "confirm") {
              this.$indicator.open({
                text: "加载中...",
                spinnerType: "fading-circle"
              });
              setTimeout(() => {
                localStorage.removeItem("userInfo");
                this.user = null;
                this.$indicator.close();
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast({
          message: "缓存已经清了哟！"
        });
      }
    }
  }
};
</script>

<style lang="scss">
#person {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 52px;
  overflow: scroll;
  .header {
    width: 100%;
    height: 45vh;
    background-image: url(../../assets/person/bg.jpeg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .personPic {
      width: 22vw;
      height: 22vw;
      border-radius: 50%;
      border: 3px solid #fff;
      margin-top: 9vh;
    }
    span {
      font-size: 16px;
      margin: 15px 0;
      color: #fff;
      font-weight: bold;
    }
    .loginButton {
      width: 80%;
      height: 6vh;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bolder;
      font-size: 15px;
    }
    p {
      margin-top: 15px;
      color: #fff;
      font-weight: bolder;
      font-size: 15px;
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
}
.searchconfirmButton {
  color: #91b493;
}
</style>
