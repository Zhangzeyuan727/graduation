<template>
  <div id="books">
    <div class="header">书城</div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-immediate-check="true"
      infinite-scroll-distance="10"
      class="content"
    >
      <div class="book" v-for="item in bookList" v-bind:key="item.id" @click="goDetail(item.id)">
        <img src="../.././assets/bookImg/book-1.jpg">
        <div class="bookInfo">
          <p>{{item.name}}</p>
          <p>{{item.author.name}}</p>
          <p style="-webkit-box-orient: vertical;">{{item.description}}</p>
        </div>
      </div>
    </div>
    <div class="loading-box" v-if="isLoading">
      <mt-spinner type="triple-bounce" :size="20"></mt-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      bookList: [],
      pageInfo: {
        page: 1,
        size: 10,
        //总条数
        total: 0,
        //分页数
        totalPage: 1
      },
      isLoading: false
    };
  },
  created() {
    if (!this.$store.state.showTab) {
      this.$store.commit("change");
    }
    this.$indicator.open({
      spinnerType: "fading-circle"
    });
    setTimeout(() => {
      this.loadData();
      this.$indicator.close();
    }, 200);
  },
  methods: {
    goDetail(id) {
      localStorage.setItem("bookDetailId", id);
      //本地保存跳转路径
      localStorage.setItem("detailFrom", "books");
      this.$router.push({ path: "/bookDetail" });
    },
    loadData() {
      // this.$Indicator.open('加载中...');
      this.$http
        .queryBook(
          `limit=${this.pageInfo.size}&page=${
            this.pageInfo.page
          }&pagination=false`
        )
        .then(res => {
          if (res.data.statusCode === 1) {
            this.pageInfo.total = 30;
            this.pageInfo.totalPage = Math.ceil(
              this.pageInfo.total / this.pageInfo.size
            );
            // console.log(res.data);
            this.bookList.push(...res.data.results);
            this.isLoading = false;
            // console.log(this.bookList);
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.$Indicator.close();
    },
    loadMore() {
      this.pageInfo.page++;
      this.loading = true;
      this.isLoading = true;
      if (this.pageInfo.page > this.pageInfo.totalPage) {
        this.isLoading = false;
        this.noMore = true;
        return;
      }
      setTimeout(() => {
        this.loadData();
      }, 1500);
    }
  }
};
</script>


<style lang="scss">
#books {
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
    background-color: #f1f1f1;
    .book {
      width: 100%;
      height: 120px;
      background-color: white;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin: 10px 0;
      display: flex;
      justify-content: flex-end;
      img {
        width: 80px;
        height: 100px;
        margin: 10px;
      }
      .bookInfo {
        width: calc(100% - 100px);
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        margin-top: 10px;
        p:first-child {
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }
        p:nth-child(2) {
          font-size: 12px;
          color: #666;
          margin-bottom: 2px;
        }
        p:last-child {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .book:first-child {
      margin-top: 16px;
    }
  }
  .loading-box {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 40px;
  }
}
</style>