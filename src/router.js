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
    { path: '/setting', name: 'setting', component: resolve => require(['@/views/setting/setting'], resolve) }
    // { path: '/featured', name: 'featured', component: featured},
  ]
});

export default router;
