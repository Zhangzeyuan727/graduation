<template>
  <div id="home">
    <div class="header">
      <div @click="showSearch" style="width:100%;margin-right: 20px;margin-left: 35px">
        <el-input placeholder="请输入内容" class="input-with-select" readonly>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="content">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <img src="../.././assets/bookImg/banner-1.jpg" alt>
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="../.././assets/bookImg/banner-2.jpg" alt>
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="../.././assets/bookImg/banner-3.jpg" alt>
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="../.././assets/bookImg/banner-4.jpg" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="recommend">
        <div class="title">
          <div class="hot">
            <i class="iconfont icon-fire"></i>
            <span>推荐读物</span>
          </div>
          <div class="more">
            <router-link to="/books">
              <span>更多</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </div>
        </div>
        <div class="books">
          <div class="book" v-for="item in recommend" :key="item.id" @click="goDetail(item.id)">
            <img :src="'/bookImg'+item.img_url">
            <p class="name">{{item.name}}</p>
            <p class="author">{{item.author.name}}</p>
          </div>
        </div>
      </div>

      <div class="recommend">
        <div class="title">
          <div class="hot">
            <i class="iconfont icon-new"></i>
            <span>新书推荐</span>
          </div>
          <div class="more">
            <router-link to="/books">
              <span>更多</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </div>
        </div>
        <div class="books">
          <div class="book" v-for="item in news" :key="item.id" @click="goDetail(item.id)">
            <img :src="'/bookImg'+item.img_url">
            <p class="name">{{item.name}}</p>
            <p class="author">{{item.author.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      recommend: [],
      news: []
    };
  },
  created() {
    if (!this.$store.state.showTab) {
      this.$store.commit("change");
    }
    this.loadData();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    goDetail(id) {
      localStorage.setItem("bookDetailId", id);
      //本地保存跳转路径
      localStorage.setItem("detailFrom", "home");
      this.$router.push({ path: "/bookDetail" });
    },
    showSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    loadData() {
      let temporaryArr = [];
      this.$http.queryBook(`limit=30&page=1&pagination=false`).then(res => {
        res.data.results.forEach(it => {
          if (it.binding === "精装") {
            temporaryArr.push(it);
          }
          this.news = this.getRandomArrayElements(res.data.results,8);
        });
        this.recommend = this.getRandomArrayElements(temporaryArr, 8);
      });
    },
    //随机从数组中截取固定长度的数组
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#home {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 52px;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    background-color: #bbd2c2;
    color: white;
  }

  .icon-iclistgrid {
    font-size: 20px;
    margin-left: 12px;
    margin-right: 12px;
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
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f1f1f1;
    /* 轮播图 */
    .banner {
      width: 100%;
      height: 40vw;
      .mint-swipe-indicators {
        position: absolute;
        bottom: 1vw;
        left: 50%;
        .mint-swipe-indicator {
          width: 6px;
          height: 6px;
          background-color: rgba($color: #000000, $alpha: 0.6);
        }
        .is-active {
          background-color: rgba($color: #91b493, $alpha: 1);
        }
      }
    }

    .banner img {
      width: 100%;
      height: 100%;
    }

    .recommend {
      // width: calc(100% - 20px);
      // margin: 0 auto;
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        font-size: 13px;
        padding: 0 10px;
        .hot {
          color: #333;
          .icon-fire {
            color: #fa7c61;
            margin-right: 5px;
          }
          .icon-new {
            color: #f9bf45;
            margin-right: 5px;
          }
        }
        .more {
          a {
            color: #91b493;
            .icon-right {
              font-size: 12px;
            }
          }
        }
      }
      .books {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .book {
          width: 25%;
          box-sizing: border-box;
          padding: 0 10px 10px 10px;
          img {
            width: 100%;
            height: 100px;
          }
          .name {
            color: #333;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .author {
            color: #666;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        // .book:nth-child(4n + 1) {
        //   padding-left: 0;
        // }
      }
    }
  }
}
</style>
