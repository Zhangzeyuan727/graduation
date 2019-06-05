<template>
  <div id="bookDetail">
    <div
      class="header"
      v-for="item in bookDetail"
      v-bind:key="item.name"
    >
      <i
        @click="back"
        class="iconfont icon-25"
      ></i>
      <p>{{item.name}}</p>
    </div>
    <div
      class="content"
      v-for="item in bookDetail"
      v-bind:key="item.id"
    >
      <div class="bookInfo">
        <img :src="'/bookImg'+item.img_url" />
        <div class="info">
          <p>书名：<span>{{item.name}}</span></p>
          <p>作者：<span>{{item.author.name}}</span></p>
          <p>出版社：<span>{{item.publishingFirm}}</span></p>
          <p>价格：<span>{{item.price}}</span></p>
          <p>页数：<span>{{item.pagecount}}</span></p>
          <p>装帧：<span>{{item.binding}}</span></p>
          <p>ISBN：<span>{{item.isbn}}</span></p>
        </div>
        <div
          class="collection"
          v-if="isCollect"
        ><i
            style="font-size:28px;color:#eb7a77"
            class="iconfont icon-shoucang"
            @click="goCollect"
          ></i></div>
        <div
          class="collection"
          v-else
        ><i
            class="iconfont icon-shoucang1"
            @click="goCollect"
          ></i></div>
      </div>
      <div class="descriptionTitle">
        <div
          @click="change('content')"
          :class="{isActived:active=='content'}"
        >内容简介</div>
        <div
          @click="change('author')"
          :class="{isActived:active=='author'}"
        >作者简介</div>
      </div>
      <mt-tab-container
        v-model="active"
        :swipeable="true"
      >
        <mt-tab-container-item id="content">
          <P class="descriptionCon">{{item.description}}</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="author">
          <P class="descriptionCon">{{item.author.description}}</p>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="description">
        <div class="title">评分&评论</div>
        <!-- <div
          class="score"
          v-for="item in bookDetail"
          v-bind:key="item.score"
        >
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#999"
            score-template="{value}"
          ></el-rate>
        </div> -->
        <div
          v-for="(reviewItem,index) in bookReview"
          :class="'review ' + 'reviewContents' + index"
          :key="index"
        >
          <div class="reviewTitle">
            <img
              v-if="reviewItem.user_id==1"
              src="../../assets/login/reviewer1.jpg"
              alt=""
            >
            <img
              v-else
              src="../../assets/login/reviewer2.jpg"
              alt=""
            >
            <span
              style="font-size:13px;color:#61613a;"
              v-if="reviewItem.user"
            >{{reviewItem.user.name}}</span>
            <span class="reviewTime">{{reviewItem.time}}</span>
          </div>
          <el-rate
            v-model="reviewItem.star"
            disabled
            text-color="#999"
          ></el-rate>

          <div
            style="font-size:14px;color:#4d513a;margin-bottom:4px;"
            v-if="reviewItem.title"
          >{{reviewItem.title}}</div>
          <div
            v-show="reviewItem.content"
            class="reviewContent"
          >{{reviewItem.content}}</div>
          <div
            class="ellipsis"
            v-show="reviewItem.content && reviewItem.isAppear && !reviewItem.isShow"
          >{{reviewItem.isAppear ? '...' : ''}}</div>
          <button
            @click="seeAll(reviewItem, index)"
            v-if="reviewItem.isAppear"
          >{{!reviewItem.isShow ? '展开' : '收起'}}</button>
        </div>
        <div class="myReview">
          <div
            style="text-align:right"
            @click="goReview"
            class="goReview"
          >我要评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "content",
      value: 0,
      bookDetail: [],
      bookReview: [],
      //收藏列表
      collectList: [],
      reviewContentHeight: [],
      isCollect: false
    };
  },
  async created() {
    if (!this.$store.state.showTab) {
      this.$store.commit("change");
    }
    let id = localStorage.getItem("bookDetailId");
    await this.loadData(id);
    await this.checkCollect(id);
  },
  mounted() {},
  methods: {
    back() {
      this.$router.push({
        name: localStorage.getItem('detailFrom')
      });
    },
    //判断该图书是否已被该读者收藏
    async checkCollect(id) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let temporaryArr = [];
      if (userInfo) {
        this.$store.commit("addToken", userInfo.uid);
        await this.$http.getlCollectBook("pagination=false").then(res => {
          if (res.data.statusCode == 1) {
            if (res.data.results && res.data.results.length > 0) {
              temporaryArr.push(...res.data.results);
            }
          }
        });
        if (temporaryArr.length > 0) {
          temporaryArr.forEach(item => {
            if (item.book.id == id) {
              this.isCollect = true;
            }
          });
        } else {
          this.isCollect = false;
        }
      }
    },
    change(e) {
      this.active = e;
    },
    async loadData(id) {
      await this.$http.queryBookById("id=" + id).then(res => {
        if (res.data.statusCode === 1) {
          this.bookDetail = res.data.results;
          this.value = Number(
            parseFloat(this.bookDetail[0].score - 5).toFixed(1)
          );
        }
      });
      //获取书评
      await this.$http
        .queryReviewByBook("book_id=" + id + "&pagination=false")
        .then(res => {
          if (res.data.statusCode === 1) {
            this.bookReview = res.data.results;
            this.bookReview.forEach(item => {
              this.$set(
                item,
                "time",
                this.dateFormat(item.created_at, "yyyy-mm-dd HH:MM:SS")
              );
            });
          }
        });

      let self = this;
      this.$nextTick(function() {
        //文章元素div
        let reviewContentArr = document.querySelectorAll(
          ".review .reviewContent"
        );
        console.log("reviewContentArr", reviewContentArr);
        //获取元素真正高度
        for (let i = 0; i < reviewContentArr.length; i++) {
          self.reviewContentHeight[i] = reviewContentArr[i].offsetHeight;
        }
        for (let i = 0; i < reviewContentArr.length; i++) {
          //给元素定下显示高度
          if (reviewContentArr[i].offsetHeight > 54) {
            reviewContentArr[i].style.height = "54px";
            this.$set(this.bookReview[i], "isAppear", true);
          } else {
            this.$set(this.bookReview[i], "isAppear", false);
          }
        }
      });
    },
    //评论
    goReview() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.$store.commit("addToken", userInfo.uid);
        this.$router.push({
          path: "/review",
          query: {
            bookId: this.bookDetail[0].id
          }
        });
      } else {
        this.$router.push({ path: "/login", query: { from: "/bookDetail" } });
      }
    },
    //收藏
    goCollect() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.$store.commit("addToken", userInfo.uid);
        if (this.isCollect) {
          this.$http
            .cancelCollectBook({
              book_id: this.bookDetail[0].id
            })
            .then(res => {
              if (res.data.statusCode == 1) {
                this.isCollect = false;
                this.$toast({
                  message: "取消收藏"
                });
              }
            });
        } else {
          this.$http
            .collectBook({
              book_id: this.bookDetail[0].id
            })
            .then(res => {
              if (res.data.statusCode == 1) {
                this.isCollect = true;
                this.$toast({
                  message: "收藏成功"
                });
              } else if (res.data.statusCode == 2) {
                this.$toast({
                  message: "此图书已被收藏"
                });
              }
            });
        }
      } else {
        this.$router.push({ path: "/login", query: { from: "/bookDetail" } });
      }
    },
    //改变时间格式
    dateFormat(date, fmt) {
      if (date === null || date === "") {
        return "";
      }
      date = new Date(date);

      var o = {
        "m+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "M+": date.getMinutes(),
        "S+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      }
      return fmt;
    },
    //展开
    seeAll(item, index) {
      if (!item.isShow) {
        this.$set(this.bookReview[index], "isShow", true);
        //获取显示content的元素
        let reviewContent = document.querySelector(
          ".reviewContents" + index + " .reviewContent"
        );
        console.log("reviewContents " + index + " reviewContent");
        //元素变为真正的高度显示
        reviewContent.style.height = this.reviewContentHeight[index] + "px";
        console.log(this.reviewContentHeight);
        console.log("item----" + item);
      } else {
        this.$set(this.bookReview[index], "isShow", false);
        let reviewContent = document.querySelector(
          ".reviewContents" + index + " .reviewContent"
        );
        //元素高度变为54px
        reviewContent.style.height = "54px";
      }
    }
  }
};
</script>

<style lang="scss">
#bookDetail {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0px;
  overflow: hidden;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    background-color: #bbd2c2;
    color: white;
    font-size: 15px;
    .icon-25 {
      font-size: 20px;
      padding: 0 12px;
    }
    p {
      width: 100%;
      text-align: center;
      margin-right: 44px;
    }
  }
  .content {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 0px;
    overflow-x: hidden;
    overflow-y: scroll;
    // background-color: #f1f1f1;
    .isActived {
      background-color: #bbd2c2;
      color: white !important;
    }
    .descriptionTitle {
      height: 36px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      background-color: #f1f1f1;
      display: flex;
      align-items: center;
      div {
        color: #333;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex: 1;
      }
    }
    .descriptionCon {
      margin: 10px 10px;
      font-size: 12px;
      color: #666;
    }
    .bookInfo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 100px;
        margin: 10px;
      }
      .info {
        margin-right: 10px;
        p {
          color: #333;
          font-size: 14px;
          span {
            color: #666;
          }
        }
      }
      .collection {
        width: 100%;
        color: #666;
        text-align: center;
        padding-top: 10vh;
        .icon-shoucang1 {
          font-size: 26px;
        }
      }
    }
    .description {
      width: 100%;
      .title {
        width: 100%;
        height: 36px;
        line-height: 36px;
        background-color: #f1f1f1;
        color: #333;
        padding-left: 10px;
        font-size: 14px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
      p {
        margin: 10px 10px;
        font-size: 12px;
        color: #666;
      }
      .score {
        margin: 10px;
      }
      .review,
      .reviewContents {
        width: 100%;
        margin: 0 10px;
        width: calc(100% - 20px);
        border-bottom: 1px solid #eee;
        padding-bottom: 12px;
        padding-top: 6px;
        .reviewTitle {
          display: flex;
          height: 40px;
          align-items: center;
          position: relative;
          img {
            width: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .reviewTime {
            font-size: 12px;
            position: absolute;
            right: 0;
            color: #89906d;
          }
        }
        .el-rate {
          margin-bottom: 10px;
        }
        .reviewContent {
          width: 100%;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical; //子元素应该被水平或垂直排列
          -webkit-line-clamp: 3; //3行后显示省略号
          font-size: 13px;
          color: #666;
        }
        .ellipsis {
          color: #666;
        }
      }
      .myReview {
        padding: 0 10px;
        box-sizing: border-box;
        .goReview {
          height: 30px;
          line-height: 30px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>


