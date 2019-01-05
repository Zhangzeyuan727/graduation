<template>
  <div id="collection">
    <div class="header">
      <i
        @click="back"
        class="iconfont icon-25"
      ></i>
      <p><i class="iconfont icon-shoucang"></i> 收藏列表 <i class="iconfont icon-shoucang"></i></p>
    </div>
    <div class="contents">
      <div class="content">
        <div class="collection">
          <img
            src="../.././assets/bookImg/book-1.jpg"
            alt=""
          >
          <p>偷书佛挡杀佛三份贼</p>
          <p>偷发的发书贼</p>
          <p>偷书放大范德萨发范德萨贼</p>
          <div>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
        <div class="collection">
          <img
            src="../.././assets/bookImg/book-2.jpg"
            alt=""
          >
          <p>偷书佛挡杀佛三份贼</p>
          <p>偷发的发书贼</p>
          <p>偷书放大范德萨发范德萨贼</p>
          <div>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
        <div class="collection">
          <img
            src="../.././assets/bookImg/book-3.jpg"
            alt=""
          >
          <p>偷书佛挡fdsafdsfsfsdfsdaf杀佛三份贼</p>
          <p>偷发的发书贼</p>
          <p>偷书放大范德萨发范德萨贼</p>
          <div>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
        <div class="collection">
          <img
            src="../.././assets/bookImg/book-4.jpg"
            alt=""
          >
          <p>偷书佛挡杀佛三份贼</p>
          <p>偷发的fdasfafdsafdasfdsadfsd发书贼</p>
          <p>偷书放大范德萨发范德萨贼</p>
          <div>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
#collection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    font-size: 15px;
    background-color: #bcd1c2;
    color: #fff;
    .icon-25 {
      font-size: 20px;
      padding: 10px;
    }
    p {
      width: 100%;
      text-align: center;
      margin-right: 40px;
      .icon-shoucang {
          color: #eb7a77;
      }
    }
  }
  .contents {
    position: absolute;
    top: 58px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    //瀑布流最外层
    .content {
      margin: 0 auto;
      width: 96%;
      column-count: 2;
      column-gap: 4%;
      column-width: 45%;
      //m每一列图片包含层
      .collection {
        margin-bottom: 10px;
        //防止多列布局，分页媒体和多区域上下文的意外中断
        break-inside: avoid;
        // box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        border: 1px solid #eee;
        overflow: hidden;
        img {
          width: 100%;
          vertical-align: middle;
          margin-bottom: 10px;
        }
        p {
          font-size: 12px;
          color: #666;
          text-align: center;
          padding: 0 10px;
        }
        div {
          text-align: right;
          .icon-shoucang {
            margin-right: 10px;
            color: #eb7a77;
          }
        }
      }
    }
  }
}
</style>
