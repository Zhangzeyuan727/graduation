<template>
  <div id="person">
    <div class="header">
      <template v-if="user">
        <img src="../../assets/login/login.jpeg" alt class="personPic">
        <span>{{user.userName}}</span>
      </template>
      <template v-if="!user">
        <img src="../../assets/login/default.jpeg" alt class="personPic">
        <span>未知的人类</span>
      </template>
      <template v-if="!user">
        <div class="loginButton" @click="goLogin">登录</div>
        <p @click="goRegister">注册新账号</p>
      </template>
      <!-- <div
        class="headerTop"
        v-if="user"
      >
        <img
          src="../../assets/login/login.jpeg"
          alt
        >
        <span class="loginWord">{{user.name}}</span>
      </div>
      <div
        class="headerTop"
        @click="goLogin"
        v-else
      >
        <img
          src="../../assets/login/default.jpeg"
          alt
        >
        <span class="loginWord">请先登录</span>
      </div>
      <div class="headerContent">
        <div>
          <span class="iconfont icon-caidaniconshouyehui"></span>
          <span class="personWord">我的作品</span>
        </div>
        <div>
          <span class="iconfont icon-diamond24"></span>
          <span class="personWord">精彩评论</span>
        </div>
        <div>
          <span class="iconfont icon-bookshu"></span>
          <span class="personWord">我的搜索</span>
        </div>
        <div>
          <span class="iconfont icon-caidaniconwodehui"></span>
          <span class="personWord">我的消息</span>
        </div>
      </div>-->
    </div>
    <div class="content">
      <!-- <div> -->
      <router-link to="/setting">
        <div class="contentWord">
          <span class="iconfont icon-shezhi"></span>
          <span>个人设置</span>
        </div>
        <span class="iconfont icon-right"></span>
      </router-link>
      <!-- </div> -->
      <div>
        <div class="contentWord">
          <span class="iconfont icon-guanzhu"></span>
          <span>关注我们</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div>
        <div class="contentWord">
          <span class="iconfont icon-share"></span>
          <span>分享应用</span>
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
      <div>
        <div class="contentWord">
          <span class="iconfont icon-huojian"></span>
          <span>检查更新</span>
        </div>
        <span class="iconfont icon-right"></span>
      </div>
      <div>
        <div class="contentWord">
          <span class="iconfont icon-tuichu"></span>
          <span>退出登录</span>
        </div>
        <!-- <span class="iconfont icon-right"></span> -->
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
    //修改用户信息
    goUpdate() {
      this.$router.push({
        path: "/update"
      });
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
    // .headerTop {
    //   margin-left: 5%;
    //   padding-top: 4vh;
    //   display: flex;
    //   align-items: flex-start;
    //   > img {
    //     width: 18vw;
    //     height: 18vw;
    //     border-radius: 50%;
    //     border: 3px solid #fff;
    //     margin-right: 20px;
    //   }
    //   .loginWord {
    //     font-size: 18px;
    //     color: #fff;
    //     font-weight: bold;
    //     margin-top: 5px;
    //   }
    // }
    // .headerContent {
    //   background-color: #fff;
    //   width: 90%;
    //   height: 10vh;
    //   position: absolute;
    //   left: 5%;
    //   bottom: 14px;
    //   border-radius: 8px;
    //   box-shadow: 0 0 2px 2px rgb(210, 210, 210);
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   > div {
    //     flex: 1;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    //     color: #666;
    //     .iconfont {
    //       font-size: 28px;
    //     }
    //     .personWord {
    //       font-size: 12px;
    //       margin-top: 4px;
    //     }
    //   }
    // }
  }
  .content {
    > div,
    > a {
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
</style>
