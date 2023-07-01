import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user.js'
import config from './modules/config.js'

const store = new Vuex.Store({
	modules:{
		user,
		config
	}
})
export default store
