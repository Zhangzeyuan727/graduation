<template>
  <div id="register">
    <div class="registerBg"></div>
    <div class="RegisterTitle">
      <i class="iconfont icon-25" @click="goBack"></i>
      <span>注册</span>
    </div>
    <div class="registerHeader">
      <img src="../../assets/login/header.jpg" alt>
    </div>
    <div class="registerName" style="margin-bottom:20px">
      <span>用户名</span>
      <div>
        <input type="text" v-model="user.name" class="registerInput">
      </div>
    </div>
    <div class="registerName">
      <span>密码</span>
      <div>
        <input type="password" v-model="user.pwd" class="registerInput">
      </div>
    </div>
    <div class="registerBtn" @click="goRegister">注册</div>
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
    goRegister() {
      if (
        this.user.name.replace(/\s*/g, "") &&
        this.user.pwd.replace(/\s*/g, "")
      ) {
        this.$http
          .userRegister({
            name: this.user.name,
            password: this.user.pwd
          })
          .then(res => {
            if (res.data.statusCode == 1) {
              //查询用户将用户信息保存至本地
              this.$http
                .userLogin({
                  name: this.user.name,
                  password: this.user.pwd
                })
                .then(res => {
                  if (res.data.statusCode == 1) {
                    this.user.uid = res.data.results;
                    //将用户信息保存至本地
                    localStorage.setItem("userInfo", JSON.stringify(this.user));
                    this.$toast({
                      message: "注册成功",
                      duration: 1500
                    });
                    setTimeout(() => {
                      this.$router.push({ path: this.$route.query.from });
                    }, 1500);
                  }
                });
            } else if (res.data.statusCode == -1) {
              this.$toast({
                message: "用户名已注册"
              });
            }
          });
      } else {
        this.$toast({
          message: "用户名密码不能为空"
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
#register {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .registerBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/person/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(3px);
    filter: brightness(80%);
    z-index: -1;
  }
  .RegisterTitle {
    height: 8vh;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding-right: 4vw;
    color: #fff;
    > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .icon-25 {
      padding: 10px;
      font-size: 20px;
    }
  }
  .registerHeader {
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
  .registerName {
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
  .registerBtn {
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
}
</style>