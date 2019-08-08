import { getAllNbList } from '../../api/config'

export default {
  state: {
    activeNb: null,
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
          //console.log(res)
          if (res.data.code === 'success') {
            commit('setAsideList', res.data.result)
            // 当前 nbCode不存在时 或者 refresh 为true 时 重置 activeNb
            if (!this.state.app.activeNb || refresh) {
              commit('setActiveNb', res.data.result[0].nbInfoList[0] || { nbCode: 'test' })
              //console.log(this.state.app.activeNb)
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
