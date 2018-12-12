<template>
  <div id="update">
    <div class="title">修改用户信息</div>
    <el-input v-model="user.name" placeholder="请输入新的用户名"></el-input>
    <el-input v-model="user.pwd" type="password" placeholder="请输入新的密码"></el-input>
    <div @click="goUpdate">确认修改</div>
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
  .title {
    height: 48px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>


