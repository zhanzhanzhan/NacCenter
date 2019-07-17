import { login, loginOut } from '../../api/login'
import { setUserInfoCookie, clearUserInfoCookie } from '@/libs/util'

export default {
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setUserInfoCookie(userInfo)
    },
    clearUserInfo (state) {
      state.userInfo = {}
      clearUserInfoCookie()
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userNo, password }) {
      return new Promise((resolve, reject) => {
        login({
          userNo,
          password
        }).then(res => {
          const data = res.data.result
          commit('setUserInfo', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLoginOut ({ commit }) {
      return new Promise((resolve, reject) => {
        loginOut().then(res => {
          console.log(res)
          commit('clearUserInfo')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
