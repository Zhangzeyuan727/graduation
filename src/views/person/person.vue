<template>
  <div id="person">
    <div class="header">关于我</div>
    <div class="content">
      <div class="personHead" @click="goLogin">
        <img src="../../assets/login/default.png" alt>
        <span v-if="user">{{user.name}}</span>
        <span v-else>未登录</span>
      </div>
      <div @click="goUpdate">修改用户信息</div>
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
    //修改用户信息
    goUpdate(){
      this.$router.push({
        path:'/update'
      })
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
  overflow: hidden;
  .header {
    text-align: center;
    line-height: 48px;
    width: 100%;
    height: 48px;
    background-color: #bbd2c2;
    color: white;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 0px;
    overflow-x: hidden;
    overflow-y: scroll;
    .personHead {
      height: 10vh;
      display: flex;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      align-items: center;
      > img {
        height: 80%;
        margin: 0 20px;
      }
    }
  }
}
</style>
