const me = (state) => {
  return state.me
}
const getAuth = (state, me) => {
  return state.isLogin
}


export default {
  me,
  getAuth
}
