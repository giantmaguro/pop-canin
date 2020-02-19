const namespaced = true

const SetLang = ({ commit, state }, locale) => {
  if (state.locales.indexOf(locale) !== -1) {
    commit('SET_LANG', locale)
  }
}

export default {
  namespaced,
  state () {
    return []
  }
  // actions,
  // getters,
  // mutations
}

