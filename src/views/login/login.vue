<template>
  <div id="login">
    <div class="loginBg"></div>
    <div class="loginTitle">
      <i
        class="iconfont icon-25"
        @click="goBack"
      ></i>
      <span>登录</span>
      <span @click="goRegister">注册</span>
    </div>
    <div class="loginHeader">
      <img
        src="../../assets/login/header.jpg"
        alt
      >
    </div>
    <div
      class="loginName"
      style="margin-bottom:20px"
    >
      <span>用户名</span>
      <div>
        <input
          type="text"
          v-model="user.name"
          class="loginInput"
        >
      </div>
    </div>
    <div class="loginName">
      <span>密码</span>
      <div>
        <input
          type="password"
          v-model="user.pwd"
          class="loginInput"
        >
      </div>
    </div>
    <div
      class="loginBtn"
      @click="goLogin"
    >登录</div>
    <div
      class="loginPlus"
      @click="goRegister"
    >
      <i class="iconfont icon-jia1"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        pwd: "",
        uid: ""
      }
    };
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
  },
  methods: {
    goLogin() {
      if (
        this.user.name.replace(/\s*/g, "") &&
        this.user.pwd.replace(/\s*/g, "")
      ) {
        this.$http
          .userLogin({
            name: this.user.name,
            password: this.user.pwd
          })
          .then(res => {
            if (res.data.statusCode == 3) {
              this.$toast({
                message: res.data.error
              });
            }
            if (res.data.statusCode == 1) {
              this.user.uid = res.data.results;
              //将用户信息保存至本地
              localStorage.setItem("userInfo", JSON.stringify(this.user));
              this.$router.push({ path: this.$route.query.from });
            }
          });
      } else {
        this.$toast({
          message: "用户名密码不能为空"
        });
      }
    },
    goRegister() {
      this.$router.push({
        path: "/register",
        query: { from: this.$route.query.from }
      });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
#login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .loginBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/login/loginBg.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(3px);
    filter: brightness(80%);
    z-index: -1;
  }
  .loginTitle {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 4vw;
    // color: #616138;
    color: #fff;
    &span:nth-child(2) {
      font-size: 15px;
    }
    .icon-25 {
      font-size: 20px;
      padding: 10px;
    }
  }
  .loginHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15vh;
    margin: 60px 0 60px 0;
    img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
  }
  .loginName {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0 10vw;
    > span {
      font-size: 13px;
      color: #fff;
    }
    > div {
      height: 6vh;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      input {
        border: 0;
        height: 80%;
        outline: none;
        color: #fff;
      }
    }
  }
  .loginBtn {
    width: 80%;
    color: #fff;
    height: 6vh;
    margin-left: 10%;
    margin-top: 40px;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2);
    line-height: 6vh;
    border: 1px solid #eee;
  }
  .loginPlus {
    width: 8vw;
    height: 8vw;
    border: 1px solid #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 6vw;
    bottom: 5vh;
    > i {
      color: #fff;
      font-size: 14px;
      line-height: 6vh;
    }
  }
}
</style>


