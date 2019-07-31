import Vue from 'vue'
import Router from 'vue-router'
import { routers } from './routers'
import store from '@/store'
import iView from 'iview'
import { canTurnTo, setTitle, getToken } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes: routers,
  mode: 'history',
  base: '/NacCenter/'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const TOKEN = getToken()
  if (!TOKEN) {
    // 未登录且要跳转的页面不是登录页 也不是注册页 也不是用户绑定页面
    if (to.name !== LOGIN_PAGE_NAME && to.name !== 'register' && to.name !== 'bind') {
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    }

  } else if (!TOKEN && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (TOKEN && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
  }
  next() //
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
