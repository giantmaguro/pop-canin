import types from './types'

const SaveMe = (state, me) => {
  state.me = me
  state.isLogin = true
}
const ChangePassword = (state, token) => {
  state.me.token = token
}
const ChangeAgree = (state, agree) => {
  console.log('myagree = '+agree)
  state.me.agree = agree
}
const ChangePic = (state, data) => {
  state.me.pic = data
}
export default {
  [types.SAVE_ME]: SaveMe,
  'SAVEME': SaveMe,
  [types.CHANGEPASS]: ChangePassword,
  [types.CHANGEAGREE]: ChangeAgree,
  [types.CHANGEPIC]: ChangePic
}
