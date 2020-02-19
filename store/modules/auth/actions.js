import axios from 'axios'
import Vue from 'vue'
import types from './types'
import Cookies from 'js-cookie'
import _ from 'lodash'

const loggingInTest = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    const tempMe = {
      id: '1',
      Domain: 'Cementhai',
      Username: 'ekkachac',
      Name: 'เอกชัย',
      Surname: 'ชาญสิริรัตนกุล',
      Email: '',
      Mobile: '',
      Region: 'M1',
      Province: 'ZM0002',
      Province_name: 'ZM0002',
      Amphur: 'MMT1040',
      Zone: '1',
      Role: 'sales',
      Active_Flag: 'Active',
      Create_Timestamp: '0000-00-00 00:00:00'
    }
    Vue.ls.set('me', tempMe)
    commit(types.SAVE_ME, tempMe)
    resolve()
  })
}

const login = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    axios.post(`api_frontend/member/login`, form).then((res) => {
      switch (res.data.response_code) {
        case 200:
          let setupTime = localStorage.getItem('setupTime')
          let dateSetup = ''
          dateSetup = new Date().getTime() + (60 * 60 * 1000 * 24)
          if (setupTime == null) {
            localStorage.setItem('setupTime', dateSetup)
          }
          localStorage.setItem('me', JSON.stringify(res.data.result))
          Cookies.set('me',res.data.result)
          commit('SAVEME', res.data.result)
          axios.defaults.headers.common['Authorization'] = res.data.result.token
          break
        case 3011:
          commit(types.SAVE_ME, { fail: 1, msg: res.data.response_msg })
          break
        case 3012:
          commit(types.SAVE_ME, { fail: 3012, msg: res.data.response_msg, result: res.data.result })
          break
        case 3006:
          commit(types.SAVE_ME, { fail: 3006, msg: res.data.response_msg, result: res.data.result })
          break
        default:
          console.log(res)
          commit(types.SAVE_ME, JSON.stringify({ fail: true, msg: res.data.response_msg }))
      }
      resolve()
    })
  })
}

const autologin = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    let setupTime = localStorage.getItem('setupTime')
    let dateSetup = ''
    dateSetup = new Date().getTime() + (60 * 60 * 1000 * 24)
    if (setupTime == null) {
      localStorage.setItem('setupTime', dateSetup)
    }
    localStorage.setItem('me', JSON.stringify(form))
    Cookies.set('me',form)
    commit(types.SAVE_ME, form)
    axios.defaults.headers.common['Authorization'] = form.token
    resolve()
  })
}
const setviewAs = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    var cookiedata = JSON.parse(Cookies.get('me'))
    var newCookie = _.merge(cookiedata, { 'viewAs': data})
    Cookies.set('me', newCookie)
    console.log(typeof newCookie)
    commit('SAVEME', newCookie)
    resolve()
  })
}

const adminlogin = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    axios.post(`api_backend/admin/login`, form).then((res) => {
      switch (res.data.response_code) {
        case 200:
          let setupTime = localStorage.getItem('setupTime')
          let dateSetup = ''
          dateSetup = new Date().getTime() + (60 * 60 * 1000 * 24)
          if (setupTime == null) {
            localStorage.setItem('setupTime', dateSetup)
          }
          localStorage.setItem('admin', JSON.stringify(res.data.result))
          console.log(res.data.result)
          Cookies.set('admin',res.data.result)
          commit(types.SAVE_ME, res.data.result)
          break
        case 3011:
          commit(types.SAVE_ME, { fail: 1, msg: res.data.response_msg })
          break
        case 3012:
          commit(types.SAVE_ME, { fail: 3012, msg: res.data.response_msg, result: res.data.result })
          break
        default:
          console.log(res)
          commit(types.SAVE_ME, JSON.stringify({ fail: true, msg: res.data.response_msg }))
      }
      resolve()
    })
  })
}

const loginFB = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    axios.post(`api_frontend/member/login_fb`, form).then((res) => {
      switch (res.data.response_code) {
        case 200:
          let setupTime = localStorage.getItem('setupTime')
          let dateSetup = ''
          dateSetup = new Date().getTime() + (60 * 60 * 1000 * 24)
          if (setupTime == null) {
            localStorage.setItem('setupTime', dateSetup)
          }
          localStorage.setItem('me', JSON.stringify(res.data.result))
          Cookies.set('me',res.data.result)
          console.log(res.data.result)
          commit(types.SAVE_ME, res.data.result)
          axios.defaults.headers.common['Authorization'] = res.data.result.token
          break
        case 3012:
          commit(types.SAVE_ME, { fail: 3012, msg: res.data.result.response_msg, result: res.data.result})
          break
        case 3013:
          commit(types.SAVE_ME, { fail: 3013, msg: res.data.result.response_msg })
          break
        case 3103:
          commit(types.SAVE_ME, { fail: 3103, msg: res.data.result.response_msg })
          break
        case 3109:
          commit(types.SAVE_ME, { fail: 3109, msg: res.data.result.response_msg })
          break
        case 5004:
          commit(types.SAVE_ME, { fail: 5004, msg: res.data.result.response_msg })
		  break
        case 3006:
          commit(types.SAVE_ME, { fail: 3006, msg: res.data.result.response_msg })
          break
        default:
          console.log(res)
          commit(types.SAVE_ME, JSON.stringify({ fail: true, msg: res.data.result.response_msg }))
      }
      resolve()
    })
  })
}
const bindFbAuto = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    axios.post(`api_frontend/member/bind_fb_auto`, form).then((res) => {
      switch (res.data.response_code) {
        case 200:
          let setupTime = localStorage.getItem('setupTime')
          let dateSetup = ''
          dateSetup = new Date().getTime() + (60 * 60 * 1000 * 24)
          if (setupTime == null) {
            localStorage.setItem('setupTime', dateSetup)
          }
          localStorage.setItem('me', JSON.stringify(res.data.result))
          Cookies.set('me',res.data.result)
          console.log(res.data.result)
          commit(types.SAVE_ME, res.data.result)
          break
        case 1021:
          commit(types.SAVE_ME, { fail: 1021, msg: res.data.result.response_msg })
          break
        case 2121:
          commit(types.SAVE_ME, { fail: 2121, msg: res.data.result.response_msg })
          break
        case 3103:
          commit(types.SAVE_ME, { fail: 3103, msg: res.data.result.response_msg })
          break
        case 3109:
          commit(types.SAVE_ME, { fail: 3109, msg: res.data.result.response_msg })
          break
        case 5004:
          commit(types.SAVE_ME, { fail: 5004, msg: res.data.result.response_msg })
          break
        case 3006:
          commit(types.SAVE_ME, { fail: 3006, msg: res.data.result.response_msg })
          break
        default:
          console.log(res)
          commit(types.SAVE_ME, JSON.stringify({ fail: true, msg: res.data.result.response_msg }))
      }
      resolve()
    })
  })
}
const ChangePassword = ({commit}, data) => {
  commit(types.CHANGEPASS, data)
}
const ChangeAgree = ({commit}, data) => {
  var cookiedata = JSON.parse(Cookies.get('me'))
  cookiedata.agree = data
  Cookies.set('me', cookiedata)
  localStorage.setItem('me', JSON.stringify(cookiedata))
  commit(types.CHANGEAGREE, data)
}
const ChangePic = ({commit}, data) => {
  var cookiedata = JSON.parse(Cookies.get('me'))
  cookiedata.pic = data
  Cookies.set('me', cookiedata)
  commit(types.CHANGEPIC, data)
}
const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    //localStorage.clear()
    localStorage.removeItem('me')
    localStorage.removeItem('setupTime')
    localStorage.removeItem('accessToken')
    commit(types.SAVE_ME, {})
    Cookies.remove('me')
    resolve()
  })
}
const adminlogout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    //localStorage.clear()
    localStorage.removeItem('admin')
    commit(types.SAVE_ME, 'admin')
    Cookies.remove('admin')
    resolve()
  })
}

// const relogin = ({ commit }, me) => {
//   let now = Date.now()
//   let setupTime = localStorage.getItem('setupTime')
//   if (now > setupTime) {
//     localStorage.clear()
//   }
//   commit(types.SAVE_ME, me)
// }

export default {
  loggingInTest,
  login,
  loginFB,
  logout,
  //relogin,
  ChangePassword,
  ChangeAgree,
  ChangePic,
  adminlogin,
  autologin,
  adminlogout,
  setviewAs,
  bindFbAuto
}
