import api from './api'
const install = (Vue) => {
    if ('installed' in install) return
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return api
            },
        },
    })
}

export default {
    install,
}