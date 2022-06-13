import { userInfo } from '.././api/login'
export default {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  // 更新token
  mutations: {
    updateToken(state, token) {
      state.token = token
    },
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    async initUserInfo(ctx) {
      const res = await userInfo()
      console.log(res)
      if (res.code === 0) {
        ctx.commit('updateUserInfo', res.data)
      }
    }
  }
}
