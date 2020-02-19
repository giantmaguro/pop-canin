import axios from 'axios'
var cookieparser = require("cookieparser")
export default {
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if(!req.headers.cookie){
        return
      }
      let parsed = cookieparser.parse(req.headers.cookie)
      if(parsed.me){
        commit("auth/SAVE_ME", JSON.parse(parsed.me))
        if(parsed.me.token) {
          axios.defaults.headers.common['Authorization'] = (parsed.me.token) ? parsed.me.token : ""
        }
      }
    }
  }
}
