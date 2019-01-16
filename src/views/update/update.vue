<template>
  <div id="update">
    <div class="updateTitle">
      <i
        class="iconfont icon-25"
        @click="goBack"
      ></i>修改密码
    </div>
    <div class="logo"></div>
    <el-input
      v-model="user.name"
      placeholder="UserName"
    ></el-input>
    <el-input
      v-model="user.pwd"
      type="password"
      placeholder="Password"
    ></el-input>
    <div
      class="confirm"
      @click="goUpdate"
    >confirm</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "",
        pwd: ""
      }
    };
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$store.commit("addToken", userInfo.uid);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goUpdate() {
      if (
        this.user.name.replace(/\s*/g, "") &&
        this.user.pwd.replace(/\s*/g, "")
      ) {
        this.$http
          .updateUserInfo({
            name: this.user.name,
            password: this.user.pwd
          })
          .then(res => {
            if (res.data.statusCode == 1) {
              this.$toast({
                message: "修改成功!"
              });
              setTimeout(() => {
                localStorage.removeItem("userInfo");
                this.$router.push({
                  name: "person"
                });
              }, 1500);
            }
          });
      } else {
        this.$toast({
          message: "用户名或密码不为空!"
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
#update {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../.././assets/bg/bg-01.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  .updateTitle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    > i {
      position: absolute;
      left: 0;
      padding: 10px;
      font-size: 20px;
    }
  }
  .el-input__inner {
    width: 90%;
    height: 7vh;
    margin-left: 5%;
    border: none;
    border-bottom: 1px solid #eee;
    color: rgba(0, 0, 0, 0.2);
    padding: 0;
    margin-bottom: 20px;
    background-color: rgba(255, 255, 255, 0.1);

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
      position: absolute;
      top: 48px;
      left: 0;
      right: 0;
      bottom: 100px;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      .el-input__inner {
        width: 90%;
        height: 7vh;
        margin-left: 5%;
        border: none;
        border-bottom: 1px solid #eee;
        color: rgba(0, 0, 0, 0.2);
        padding: 0;
        margin-bottom: 20px;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  .confirm {
    color: rgba(0, 0, 0, 0.2);
    width: 90%;
    margin-left: 5%;
    text-align: center;
    height: 7vh;
    line-height: 7vh;
    border: 1px solid #eee;
    margin-top: 20px;
  }
}
</style>


