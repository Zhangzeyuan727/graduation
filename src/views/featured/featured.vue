<template>
  <div id="featured">
    <div class="header">精选</div>
    <div class="content">
      <div class="featured" v-for="item in featured" v-bind:key="item.id">
        <div class="icon">精品</div>
        <div class="bg"></div>
        <img src="../.././assets/bookImg/book-1.jpg">
        <div class="featured-content">
          <h2>{{item.name}}</h2>
          <p>{{item.author.name}}</p>
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#999"
            score-template="{value}"
          ></el-rate>
          <div class="description" style="-webkit-box-orient: vertical;">{{item.description}}</div>
          <div class="btn">
            <button @click="goDetail(item.id)">了解更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value5: 3.7,
      featured: []
    };
  },
  created() {
    this.$http
      .queryQualityBook()
      .then(res => {
        if (res.data.statusCode === 1) {
          this.featured = res.data.results;
          for (let i = 0; i < res.data.results.length; i++) {
            this.featured[i].score = Number(
              parseFloat(this.featured[i].score - 5).toFixed(1)
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goDetail(id) {
      localStorage.setItem("bookDetailId", id);
      this.$router.push({
        path: "/bookDetail"
      });
    }
  }
};
</script>

<style lang="scss">
#featured {
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
    top: 48px;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    background-color: #f1f1f1;
    .featured {
      width: 80%;
      height: 80%;
      margin-left: 5%;
      margin-top: 10%;
      display: inline-block;
      position: relative;
      overflow-x: hidden;
      box-shadow: 0 8px 10px #ccc;
      border-radius: 4px;
      .icon {
        width: 60px;
        height: 60px;
        font-size: 12px;
        color: white;
        background-color: #fc9d8b;
        position: absolute;
        right: -30px;
        top: -30px;
        z-index: 100;
        transform: rotate(45deg);
        text-align: center;
        line-height: 100px;
        font-weight: bold;
      }
      .bg {
        width: 100%;
        height: 100%;
        background-image: url("../.././assets/bookImg/book-1.jpg");
        background-size: 100%;
        -webkit-filter: blur(2px); /* Chrome, Opera 高斯模糊*/
        -moz-filter: blur(2px);
        -ms-filter: blur(2px);
        filter: blur(2px);
      }
      img {
        width: 36%;
        position: absolute;
        left: 32%;
        top: 10%;
        z-index: 2;
      }
      .featured-content {
        width: 100%;
        height: 60%;
        background-color: white;
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        display: flex;
        flex-direction: column;
        h2 {
          color: #333;
          font-size: 18px;
          padding-top: 22px;
          text-align: center;
        }
        p {
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .el-rate {
          margin-top: 10px;
          font-size: 14px;
          text-align: center;
        }
        .description {
          width: calc(100% - 40px);
          margin: 10px 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 12px;
          color: #999;
          white-space: initial;
        }
        .btn {
          text-align: center;
          button {
            width: 120px;
            height: 40px;
            border: 1px solid#91B493;
            color: #91b493;
            border-radius: 18px;
            margin: 20px 0;
            font-size: 14px;
          }
        }
      }
    }
    .featured:first-child {
      margin-left: 10%;
    }
    .featured:last-child {
      margin-right: 10%;
    }
  }
}
</style>