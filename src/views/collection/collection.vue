<template>
  <div id="collection">
    <div class="header">
      <i
        @click="back"
        class="iconfont icon-25"
      ></i>
      <p>
        <i class="iconfont icon-shoucang"></i> 收藏列表
        <i class="iconfont icon-shoucang"></i>
      </p>
    </div>
    <div class="contents">
      <div class="content">
        <div
          class="collection"
          v-for="item in bookList"
          :key="item.id"
          @click="goDetail(item.book.id)"
        >
          <img
            src="../.././assets/bookImg/book-1.jpg"
            alt
          >
          <p>{{item.book.name}}</p>
          <p>{{item.book.author.name}}</p>
          <p>{{item.book.publishingFirm}}</p>
          <div>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
      </div>
    </div>
    <div
      class="searchNodata"
      v-if="bookList.length==0"
    >
      <img
        src="../../assets/person/null.png"
        alt
      >
      <div class="null">
        还没有书哦,
        <span @click="goBooks">去收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookList: []
    };
  },
  async created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$store.commit("addToken", userInfo.uid);
    this.$indicator.open({
      spinnerType: "fading-circle"
    });
    await this.getCollectBook();
    this.$indicator.close();
  },
  methods: {
    //获取收藏图书列表
    getCollectBook() {
      this.$http.getlCollectBook("pagination=false").then(res => {
        if (res.data.statusCode == 1) {
          if (res.data.results && res.data.results.length > 0) {
            this.bookList.push(...res.data.results);
          }
        }
      });
    },
    goDetail(id) {
      localStorage.setItem("bookDetailId", id);
      //本地保存跳转路径
      localStorage.setItem("detailFrom", "collection");
      this.$router.push({ path: "/bookDetail" });
    },
    back() {
      this.$router.push({
        name: "person"
      });
    },
    goBooks() {
      this.$router.push({
        name: "books"
      });
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
  background-color: #f0f1f5;
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
      //每一列图片包含层
      .collection {
        margin-bottom: 10px;
        //防止多列布局，分页媒体和多区域上下文的意外中断
        break-inside: avoid;
        // box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        border: 1px solid #ddd;
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
  .searchNodata {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 13px;
    color: #333;
    .null {
      text-align: center;
      margin-top: 3vh;
    }
    span {
      color: #91b493;
    }
  }
}
</style>
