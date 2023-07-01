import store from '../index.js';
import http from '@/common/http.js'

const state = {
	badgenum: 0,
	userInfo: uni.getStorageSync('userInfo') || ''
}

const mutations = {
	getNum: function(state) {
		uni.getStorage({
			key: 'userid',
			success: (res) => {
				http._get({
						url: 'collect/index',
						data: {
							userid: res.data
						}
					})
					.then(res => {
						if (res.code == 1 && res.data != null) {
							state.badgenum = res.data.length;
							// uni.setTabBarBadge({
							// 	index: 1,
							// 	text: String(state.badgenum)
							// })
						}
					})
			},
			fail: (err) => {
				uni.getStorage({
					key: 'localCollect',
					success: (res) => {
						if (res.data.length > 0) {
							state.badgenum = res.data.length;
						}
					}
				})
			}
		})
	},
	addNum: function(state) {
		state.badgenum = state.badgenum + 1;
		// uni.setTabBarBadge({
		// 	index: 1,
		// 	text: String(state.badgenum)
		// })
	},
	reduceNum: function(state) {
		state.badgenum = state.badgenum - 1;
		if (state.badgenum > 0) {
			// uni.setTabBarBadge({
			// 	index: 1,
			// 	text: String(state.badgenum)
			// })
		} else {
			// uni.hideTabBarRedDot({
			// 	index: 1
			// })
		}
	},
	emptyNum: function(state) {
		state.badgenum = 0;
		uni.hideTabBarRedDot({
			index: 1
		})
	},
	setbadge: function(state) {
		if (state.badgenum > 0) {
			uni.setTabBarBadge({
				index: 1,
				text: String(state.badgenum)
			})
		}
	},
	isLogin: function(state, url) {
		uni.getStorage({
			key: 'token',
			fail: (err) => {
				uni.showModal({
					title: '提示',
					content: '请先登录',
					success: (res) => {
						if (res.confirm) {
							uni.redirectTo({
								url: url || '../../login/login-code'
							})
						} else {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		})
	},
	// 更新用户信息
	updateUserInfo: function(state, payLoad) {
		state.userInfo = payLoad.data
		uni.setStorageSync('userInfo', res.data);
	}
}

const actions = {
	async updateUserInfo(context) {
		let res = await http.get({
			url: '/flowUser/flowUser/getByID',
			data: {
				id: uni.getStorageSync('userInfo').id
			}
		})
		context.commit('updateUserInfo', res)
	}
}

export default {
	state,
	mutations,
	actions
}
