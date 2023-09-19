import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user.js'
import config from './modules/config.js'
import community from './modules/community.js'


const store = new Vuex.Store({
	modules:{
		user,
		config,
		community
	}
})
export default store
