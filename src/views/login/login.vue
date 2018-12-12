<template>
  <div id="login">
    <div class="loginTitle">用户登录</div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="user.name"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.pwd"></mt-field>
    <div class="loginBtn" @click="goLogin">登录</div>
    <div class="loginBtn" @click="goRegister">注册</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        pwd: "",
        uid:''
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
            this.user.uid=res.data.results;
            //将用户信息保存至本地
            localStorage.setItem("userInfo", JSON.stringify(this.user));
            this.$router.push({ path: this.$route.query.from });
          }
        });
    },
    goRegister() {
      this.$router.push({
        path: "/register",
        query: { from: this.$route.query.from }
      });
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
  .loginTitle {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginBtn {
    width: 80%;
    height: 6vh;
    margin-left: 10%;
    margin-top: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 6vh;
    background-color: #bbd2c2;
  }
}
</style>


