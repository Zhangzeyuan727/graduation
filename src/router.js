import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  linkActiveClass: "active",
  routes: [
    { path: "", redirect: "/home" },
    { path: "/home", name: "home", component: resolve => require(['@/views/home/home'], resolve) },
    { path: "/search", name: "search", component: resolve => require(['@/views/search/search'], resolve) },
    { path: "/login", name: "login", component: resolve => require(['@/views/login/login'], resolve) },
    { path: "/register", name: "register", component: resolve => require(['@/views/register/register'], resolve) },
    { path: "/featured", name: "featured", component: resolve => require(['@/views/featured/featured'], resolve) },
    { path: "/books", name: "books", component: resolve => require(['@/views/books/books'], resolve) },
    { path: "/person", name: "person", component: resolve => require(['@/views/person/person'], resolve) },
    { path: "/bookDetail", name: "bookDetail", component: resolve => require(['@/views/bookDetail/bookDetail'], resolve) },
    { path: '/update', name: 'update', component: resolve => require(['@/views/update/update'], resolve) },
    { path: '/review', name: 'review', component: resolve => require(['@/views/bookDetail/review'], resolve) },
    { path: '/setting', name: 'setting', component: resolve => require(['@/views/setting/setting'], resolve) },
    { path: '/collection', name: 'collection', component: resolve => require(['@/views/collection/collection'], resolve) },
    { path: '/advice', name: 'advice', component: resolve => require(['@/views/person/advice'], resolve) },
  ]
});
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const nextRoute = ['collection']
  let isLogin = localStorage.getItem('userInfo') // 获取客户信息
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    // console.log(to)
    // console.log(from)
    if (!isLogin) {
      router.push({ name: 'login', query: { from: to.path } })
    }
  }
  next()
})
export default router;
