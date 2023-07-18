import Vue from "vue"
let startTestModel = true //开启测试模式
let BASE_URL=''
const DEV_BASE_URL = 'http://110.42.228.141:9090'
const PROD_BASE_URL = 'http://110.42.228.141:9090'// 接口域名
// const DEV_BASE_URL = 'https://user.19so.net'
// const PROD_BASE_URL = 'https://user.19so.net'// 接口域名
const IMG_URL = ''  // 图片域名
// 声明 测试模式
console.log("%c".concat("开发模式开启", "%c"),
	"background:#35495E; padding: 4px 8px; border-radius: 3px 0 0 3px; color: #fff;",
	"background:".concat("#1E90FF", "; padding:4px 8px; border-radius: 0 3px 3px 0; color: #fff;"),
	"background:transparent");

// 封装get方法
const get = async (options) => {
	return new Promise((resolve, reject) => {
		if (options.loading)
			uni.showLoading({
				title: '加载中..'
			})
		try {
			if (process.env.NODE_ENV === 'development') {
				BASE_URL=DEV_BASE_URL;
			} else {
				BASE_URL=PROD_BASE_URL;
			}
			uni.request({
				url: (options.BASE_URL || BASE_URL) + options.url,
				method: 'GET',
				data: options.data,
				success: res => {
					uni.stopPullDownRefresh()
					if (res.statusCode == 200) {
						resolve(res.data)
					}
					if (res.data.code == 401) {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
					}
					if (res.statusCode == 500) {
						uni.showToast({
							title: '系统错误，请稍后重试',
							icon: 'none'
						})
					}
				},
				fail: err => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					reject(err.data)
				},
				complete: () => {}
			})
		} catch (e) {
			uni.stopPullDownRefresh()
			uni.hideLoading()
			uni.showToast({
				title: '服务器或网络异常，请稍候重试',
				icon: 'none'
			})
		}
	})
}

// 封装post方法
const post = async (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中..'
		})
		try {
			if (process.env.NODE_ENV === 'development') {
				BASE_URL=DEV_BASE_URL;
			} else {
				BASE_URL=PROD_BASE_URL;
			}
			uni.request({
				url: (options.BASE_URL || BASE_URL) + options.url,
				method: 'POST',
				data: options.data,
				header: {
					'content-Type': options.header || 'application/x-www-form-urlencoded',
				},
				success: res => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					if (res.statusCode == 200) {
						if(res.data.code==-1){
							uni.showModal({
								title:'请先登录',
								showCancel:false,
								success: (res) => {
									if(res.confirm){
										uni.navigateTo({
											url:'/pages/login/login'
										})
									}
								}
							})
						}else{
							resolve(res.data)
						}
					}
					if (res.statusCode == 401) {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
					}
					if (res.statusCode == 500) {
						uni.showToast({
							title: '系统错误，请稍后重试',
							icon: 'none'
						})
					}
				},
				fail: err => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					reject(err.data)
				},
				complete: () => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
				}
			})
		} catch (e) {
			uni.stopPullDownRefresh()
			uni.hideLoading()
			uni.showToast({
				title: '服务器或网络异常，请稍候重试',
				icon: 'none'
			})
		}
	})
}

export default {
	BASE_URL,
	get,
	post,
	IMG_URL
}
