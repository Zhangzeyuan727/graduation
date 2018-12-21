<template>
  <div id="update">
    <div class="logo"></div>
    <el-input v-model="user.name" placeholder="UserName"></el-input>
    <el-input v-model="user.pwd" type="password" placeholder="Password"></el-input>
    <div class="confirm" @click="goUpdate">confirm</div>
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
  },
  methods: {
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
            }
          });
      } else {
        this.$toast({
          message: "用户名、密码不为空!"
        });
      }
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


