import { getAllNbList } from '../../api/config'

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
    getAsideList ({ commit }, refresh) {
      return new Promise((resolve, reject) => {
        getAllNbList().then(res => {
          console.log(res)
          if (res.data.code === 'success') {
            commit('setAsideList', res.data.result)
            if (!this.state.app.activeNb || refresh) {
              commit('setActiveNb', res.data.result[0])
            }
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
