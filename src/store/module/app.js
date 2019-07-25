import { getAllNbList } from '../../api/config'
import { login } from '../../api/login'

export default {
  state: {
    activeNb: {},
    asideList: []
  },
  getters: {
  },
  mutations: {
    setActiveNb (state, item) {
      state.activeNb = item
    },
    setAsideList (state, list) {
      state.asideList = list
    }
  },
  actions: {
    getAsideList ({ commit }) {
      return new Promise((resolve, reject) => {
        getAllNbList().then(res => {
          if (res.data.code === 'success') {
            commit('setAsideList', res.data.result)
            commit('setActiveNb', res.data.result[0])
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
