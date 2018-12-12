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
          <span>历史搜索记录</span>
          <span @click="deleteBtn">删除</span>
        </div>
        <div>
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
            <span>{{item.price}}</span>
            <span>{{item.publishingFirm}}</span>
          </div>
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
      book: []
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
      this.showSearchType = false;
      this.showHistory = false;
      this.book = [];
      this.$http
        .searchBook(`pagination=false&keyname=${type}&keyvalue=${this.keyword}`)
        .then(res => {
          if (res.data.statusCode == 1) {
            if (res.data.results && res.data.results.length > 0) {
              this.book.push(...res.data.results);
            }
          }
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
      this.historyList = [];
      localStorage.removeItem("historySearch");
    },
    goSelect(e) {
      this.keyword = e;
    },
    goDetail(e) {
      localStorage.setItem('bookDetailId',e);
      this.$router.push({
        path: "/bookDetail"
      });
    },
    close() {
      this.$router.go(-1);
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
  background-color: #fff;
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
      span {
        font-size: 14px;
      }
    }
    .historySearchContent {
      padding: 3px 15px;
      border: 1px solid #ccc;
      border-radius: 50px;
      display: inline-block;
    }
    .searchType {
      height: 10vh;
      display: flex;
      align-items: center;
      margin-left: 10vw;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      > i {
        font-size: 20px;
        display: block;
        width: 20px;
        height: 20px;
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
      }
    }
    .searchBook {
      display: flex;
      align-items: center;
      height: 15vh;
      margin: 15px 10px;
      > img {
        height: 80%;
        margin-right: 20px;
      }
      .searchBookContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
