<template>
  <div class="reviewView">
    <div class="reviewHead">
      <div>
        <span class="iconfont icon-25" @click="goBack"></span>
        <span class="writeReview">写书评</span>
      </div>
      <span :class="isWrite" @click="goCommit">继续</span>
    </div>
    <div class="reviewContentView">
      <el-rate class="star" v-model="review" show-text style="text-align:center;margin:40px 0"></el-rate>
      <div class="addReviewAd">
        <!-- <img src="../.././assets/review/illustration.jpeg"> -->
      </div>
      <div class="addReviewTitle">
        <input type="text" placeholder="添加标题" v-model="reviewTitle">
      </div>
      <textarea
        class="addReviewContent"
        cols="30"
        rows="10"
        placeholder="添加内容"
        v-model="reviewContent"
      ></textarea>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      review: null,
      reviewTitle: "",
      reviewContent: "",
      bookId: ""
    };
  },
  computed: {
    isWrite() {
      if (this.review && this.reviewTitle && this.reviewContent) {
        return "reviewChecked";
      } else {
        return "reviewUnchecked";
      }
    }
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
    if (this.$route.query.bookId) {
      this.bookId = this.$route.query.bookId;
    }
  },
  methods: {
    goCommit() {
      if (this.review && this.reviewTitle && this.reviewContent) {
        this.$http
          .getUserInfo({
            book_id: this.bookId,
            title: this.reviewTitle,
            star: this.review,
            content: this.reviewContent
          })
          .then(res => {
            if (res.data.statusCode == 1) {
              this.$toast({
                message: "评论成功"
              });
              setTimeout(() => {
                this.$router.push({
                  name: "bookDetail"
                });
              }, 3000);
            }
          });
      } else {
        this.$toast({
          message: "请确认书评是否填全"
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
.reviewView {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../.././assets/person/settingBG.jpg");
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .reviewHead {
    height: 8vh;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      .writeReview {
        font-size: 14px;
        color: #333;
      }
    }
    > span {
      font-size: 14px;
    }
    .icon-25 {
      padding: 10px;
      color: #333;
    }
  }
  .reviewContentView {
    .star {
      position: relative;
      .el-rate__icon {
        font-size: 30px;
      }
      .el-rate__text {
        width: 60px;
        position: absolute;
        left: 50%;
        margin-left: -30px;
        top: -20px;
        text-align: center;
        font-size: 12px;
      }
    }
    .addReviewAd {
      height: 4vh;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      margin: 0;
      img {
        width: 100%;
        height: 14vh;
      }
    }
    .addReviewTitle {
      margin: 0 10px;
      height: 8vh;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      border-bottom: 2px solid #ccc;
      display: flex;
      align-items: center;
      > input {
        width: 100%;
        height: 80%;
        border: 0;
        outline: none;
      }
    }
    .addReviewContent {
      margin: 0 10px;
      margin-top: 10px;
      width: 100%;
    }
  }
}
.reviewChecked {
  color: rgb(97, 97, 58);
}
.reviewUnchecked {
  color: rgba(97, 97, 58, 0.6);
}
</style>


