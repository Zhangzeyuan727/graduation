import http from './http'

export default {
    //获取图书
    queryBook(data) {
        return http.http.get(`/book/queryBook?${data}`)
    },
    //根据id获取图书
    queryBookById(data) {
        return http.http.get(`/book/queryBookById?${data}`)
    },
    //获取精选图书
    queryQualityBook(data) {
        return http.http.get(`/book/queryQualityBook`, data)
    },
    //根据id获取评论
    queryReviewByBook(data) {
        return http.http.get(`/reviews/queryReviewByBook?${data}`)
    },
    //用户登录
    userLogin(data) {
        return http.http.post('/user/login', data)
    },
    //用户注册
    userRegister(data) {
        return http.http.post('/user/register', data)
    },
    //图书搜索
    searchBook(data) {
        return http.http.get(`/book/searchBook?${data}`)
    },
    //根据id查询用户信息
    getUserInfo(data) {
        return http.http.get(`/user/queryUserById?${data}`)
    },
    //添加评论
    getUserInfo(data) {
        return http.http.post("/reviews/addReviewByBook", data)
    },
    //修改用户信息
    updateUserInfo(data) {
        return http.http.post("/user/modfiyUserInfo", data)
    }
}