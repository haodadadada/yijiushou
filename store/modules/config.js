import store from "../index.js"
import http from '@/common/http.js'
import Vue from 'vue'

const state = {
	commissionSwitch: 1,
	configSwitch: {
		serviceSwitch:1,
	}, //开关项
	config:''
}

const mutations = {
	setCommissionSwitch(state, payLoad) {
		state.commissionSwitch = payLoad.data.commission
	},
	// 设置开关项
	setConfigSwitch(state, payLoad) {
		/* 
		*
		*	{Object | Array} target
		*	{string | number} propertyName/index
		*	{any} value 
		* 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，
		* 且触发视图更新。它必须用于向响应式对象上添加新 property，
		* 因为 Vue 无法探测普通的新增 property 
		* (比如 this.myObject.newProperty = 'hi')
		* 
		*/
		Vue.set(state.configSwitch, 'serviceSwitch', payLoad.data.kf_on_off)
		state.config = payLoad.data
	}
}

const actions = {
	async getCommissionSwitch(context) {
		let res = await http._get({
			url: 'agent/cfg'
		})
		context.commit('setCommissionSwitch', res)
	},
	// 获取开关项
	async getConfigSwitch(context) {
		let res = await http._get({
			url: 'agent/cfg'
		})
		context.commit('setConfigSwitch', res)
	}
}



export default {
	state,
	mutations,
	actions
}
