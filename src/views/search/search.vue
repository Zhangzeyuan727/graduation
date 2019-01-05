<template>
  <div id="search">
    <div class="header">
      <i @click="close" class="iconfont icon-25"></i>
      <div style="width:100%;margin-right:20px">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="content">
      <template v-if="showHistory&&!showSearchType">
        <div class="historySearchTop">
          <span class="history">历史搜索记录</span>
          <span @click="deleteBtn" class="iconfont icon-trash-gray"></span>
        </div>
        <div class="histories">
          <div
            v-for="(item,index) in historyList"
            :key="index"
            class="historySearchContent"
            @click="goSelect(item)"
          >{{item}}</div>
        </div>
      </template>
      <template v-if="showSearchType">
        <div class="searchType" @click="goSearch('name')">
          <i class="iconfont icon-search"></i>
          <div class="type">按书名搜索:</div>
          <div class="keyWord">{{keyword}}</div>
        </div>
        <div class="searchType" @click="goSearch('author')">
          <i class="iconfont icon-search"></i>
          <div class="type">按作者搜索:</div>
          <div class="keyWord">{{keyword}}</div>
        </div>
        <div class="searchType" @click="goSearch('isbn')">
          <i class="iconfont icon-search"></i>
          <div class="type">按ISBN搜索:</div>
          <div class="keyWord">{{keyword}}</div>
        </div>
      </template>
      <div v-if="!showSearchType&&!showHistory">
        <div v-for="item in book" :key="item.id" class="searchBook" @click="goDetail(item.id)">
          <img src="../../assets/bookImg/book-1.jpg" alt>
          <div class="searchBookContent">
            <span>{{item.name}}</span>
            <span>{{item.author.name}}</span>
            <span>{{item.publishingFirm}}</span>
          </div>
        </div>
      </div>
      <div class="searchNodata" v-if="showNoData&&book.length==0">
        <img src="../../assets/person/null.png" alt>
        <div class="null">
          暂无此书籍,
          <span @click="close">再逛逛</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  // el: '#demo',
  data() {
    return {
      keyword: "",
      activeName: "first",
      //现实搜索类别页面
      showSearchType: false,
      //历史搜索记录
      historyList: [],
      //显示历史记录
      showHistory: true,
      book: [],
      showNoData: false
    };
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
    let historyBooks = JSON.parse(localStorage.getItem("historySearch"));
    if (historyBooks) {
      this.historyList = historyBooks;
    }
  },
  watch: {
    keyword(val) {
      if (val.replace(/\s*/g, "")) {
        this.showSearchType = true;
      } else {
        this.showSearchType = false;
        let historyBooks = JSON.parse(localStorage.getItem("historySearch"));
        if (historyBooks) {
          this.historyList = historyBooks;
        }
        this.showHistory = true;
      }
    }
  },
  components: {},
  methods: {
    //搜索图书
    goSearch(type) {
      this.showNoData = true;
      this.showSearchType = false;
      this.showHistory = false;
      this.book = [];
      this.$http
        .searchBook(
          "pagination=false&keyname=" + type + "&keyvalue=" + this.keyword
        )
        .then(res => {
          if (res.data.statusCode == 1) {
            if (res.data.results && res.data.results.length > 0) {
              this.book.push(...res.data.results);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      //将搜索记录保存在本地
      let historyBooks = JSON.parse(localStorage.getItem("historySearch"));
      if (historyBooks && historyBooks.length > 0) {
        //判断历史记录里是否有该关键字
        if (historyBooks.indexOf(this.keyword) != -1) {
          let index = historyBooks.findIndex(item => item === this.keyword);
          historyBooks.splice(index, 1);
          historyBooks.unshift(this.keyword);
          localStorage.setItem("historySearch", JSON.stringify(historyBooks));
        } else {
          historyBooks.unshift(this.keyword);
          localStorage.setItem("historySearch", JSON.stringify(historyBooks));
        }
      } else {
        this.historyList.unshift(this.keyword);
        localStorage.setItem("historySearch", JSON.stringify(this.historyList));
      }
    },
    //删除搜索记录
    deleteBtn() {
      this.$messagebox
        .confirm("", {
          message: "确认删除历史记录?",
          confirmButtonClass: "searchconfirmButton",
          confirmButtonText: "删除",
          cancelButtonText: "考虑ing"
        })
        .then(action => {
          if (action == "confirm") {
            this.historyList = [];
            localStorage.removeItem("historySearch");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goSelect(e) {
      this.keyword = e;
    },
    goDetail(e) {
      localStorage.setItem("bookDetailId", e);
      this.$router.push({ path: "/bookDetail" });
      //本地保存跳转路径
      localStorage.setItem("detailFrom", "search");
    },
    close() {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#search {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0px;
  overflow: hidden;
  background-color: #f0f1f5;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    background-color: #bbd2c2;
    color: white;
  }

  .icon-25 {
    font-size: 20px;
    padding: 0 12px;
  }

  .el-input {
    width: 94%;
  }

  .el-input__inner {
    height: 30px;
    border: none;
    text-align: center;
  }

  .el-input-group__append {
    background-color: white;
    border: none;
  }

  .el-button {
    padding: 12px;
  }

  .el-icon-search {
    color: #bbd2c2;
  }

  .el-input-group__prepend {
    background-color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 0px;
    overflow-x: hidden;
    overflow-y: scroll;
    .historySearchTop {
      height: 6vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 1vh 4vw;
      span {
        font-size: 14px;
      }
      .history {
        font-size: 13px;
        color: #333;
      }
      .icon-trash-gray {
        font-size: 20px;
        color: #999;
      }
    }
    .histories {
      margin: 1vh 4vw;
    }
    .historySearchContent {
      margin-left: 2vw;
      padding: 2px 14px;
      border: 1px solid #ccc;
      border-radius: 50px;
      display: inline-block;
      font-size: 13px;
      color: #333;
    }
    .historySearchContent:first-child {
      margin-left: 0;
    }
    .searchType {
      height: 9vh;
      display: flex;
      align-items: center;
      margin-left: 4vw;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      margin-right: 4vw;
      color: #333;
      font-size: 13px;
      > i {
        font-size: 20px;
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 2vw;
      }
      .type {
        width: 80px;
        font-size: 13px;
      }
      .keyWord {
        width: calc(100% - 100px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
      }
    }
    .searchBook {
      display: flex;
      align-items: center;
      height: 15vh;
      margin: 10px 0px;
      background-color: #fff;
      > img {
        height: 80%;
        margin: 15px;
      }
      .searchBookContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 15px;
        span:first-child {
          color: #333;
          font-size: 15px;
        }
        span:nth-child(2),
        span:last-child {
          color: #666;
          font-size: 13px;
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
}
.searchconfirmButton {
  color: #91b493;
}
</style>
