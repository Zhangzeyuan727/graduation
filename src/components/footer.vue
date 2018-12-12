<template>
  <div id="footer">
    <router-link to="/home">
      <i class="iconfont icon-caidaniconshouyehui"></i>首页
    </router-link>
    <router-link to="/featured">
      <i class="iconfont icon-diamond24"></i>精选
    </router-link>
    <router-link to="/books">
      <i class="iconfont icon-bookshu"></i>书城
    </router-link>
    <router-link to="/person">
      <i class="iconfont icon-caidaniconwodehui"></i>我的
    </router-link>
  </div>
</template>

<script>
</script>

<style>
#footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #eee;
}

#footer > a {
  display: block;
  width: 25%;
  text-align: center;
  color: #999;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

#footer > a.active {
  color: #bbd2c2;
}

.iconfont {
  font-size: 18px;
}
</style>