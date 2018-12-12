<template>
  <div id="register">
    <div class="registerTitle">用户注册</div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="user.name"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.pwd"></mt-field>
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
        uid: ""
      }
    };
  },
  methods: {
    goRegister() {
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
                    duration: 3000
                  });
                  setTimeout(() => {
                    this.$router.push({ path: this.$route.query.from });
                  }, 3000);
                }
              });
          }
        });
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
  .registerTitle {
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
