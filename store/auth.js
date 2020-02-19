import actions from './modules/auth/actions'
import getters from './modules/auth/getters'
import mutations from './modules/auth/mutations'

const namespaced = true

export default {
  namespaced,
  state () {
    return {
      loading: false,
      me: {},
      isLogin: false
    }
  },
  actions,
  getters,
  mutations
}
