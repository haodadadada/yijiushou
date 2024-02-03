import http from '../common/http.js'
import { data } from '../uni_modules/uview-ui/libs/mixin/mixin.js'

// 上传图片
const uploadImg = data => {
	return new Promise((resolve, reject) => {
		let imgList = []
		try {
			data.tempFilePaths.forEach((item, i) => {
				uni.uploadFile({
					url: http.BASE_URL + '/api/Common/upload',
					formData: {
						'token': uni.getStorageSync('token'),
					},
					name: 'file',
					// #ifdef MP
					filePath:data.tempFilePaths[i],
					// #endif
					// #ifdef H5
					files: [{
						name: 'file',
						file: data.tempFiles[i],
						uri: data.tempFilePaths[i],
					}],
					// #endif
					success: res => {
						console.log(res)
						let info = JSON.parse(res.data)
						if (info.code == 1) {
							imgList.push(info.data.url)
						}
						console.log(imgList)
						if (data.tempFiles.length == imgList.length) {
							resolve(imgList)
						}
					},
					fail(err) {
						console.log(err)
					},
					template() {
						console.log('1231311312')
					}
				});
			})
		} catch (e) {
			uni.hideLoading()
			uni.showToast({
				title: '服务器或网络异常，请稍候重试',
				icon: 'none'
			})
		}
	})
}
// 首页接口
const index = (data) => {
	return http.post({
		url: 'api/Index/index',
		data: {
			...data
		}
	})
}
// 今日指导价
const guidanceList = (data) => {
	return http.post({
		url: 'api/Index/guidanceList',
		data: {
			...data
		}
	})
}
// 今日指导价详情
// const guidancePrice = (data) => {
// 	return http.post({
// 		url: 'api/Index/guidancePrice',
// 		data: {
// 			...data
// 		}
// 	})
// }
// 获取价格列表
const guidancePrice = () => {
	return http.get({
		url: '/price/getAll',
	})
}
// 回收站列表
const recycle = (data) => {
	return http.post({
		url: 'api/Index/recycle',
		data: {
			...data
		}
	})
}

// 爱心积攒
const mission = (data) => {
	return http.post({
		url: 'api/Index/mission',
		data: {
			...data
		}
	})
}

// 商品分类
const shopSort = () => {
	return http.post({
		url: 'api/Index/shopSort',
	})
}

// 立即下单
const placeOrder = (data) => {
	return http.post({
		url: '/order/add',
		header:'application/json',
		data:{
			...data
		}
	})
}

// 地址簿
const userAddress = (data) => {
	return http.post({
		url: '/address/getUserAll',
		data:{
			...data
		}
	})
}

// 预估重量
const weight = (data) => {
	return http.post({
		url: 'api/Index/weight',
		data:{
			...data
		}
	})
}

// 添加地址
const addAddress = (data) => {
	return http.post({
		url: '/address/add',
		header:'application/json',
		data:{
			...data
		}
	})
}

// 删除地址
const delAddress = (data) => {
	return http.post({
		url: '/address/delete',
		data:{
			...data
		}
	})
}

// 设置默认地址
const setAddress = (data) => {
	return http.post({
		url: 'api/Index/setAddress',
		data:{
			...data
		}
	})
}

// 取消订单
const delOrder = (data) => {
	return http.get({
		url: '/order/cancelOrder',
		data:{
			...data
		}
	})
}

// 编辑地址
const siteAddres = (data) => {
	return http.post({
		url: '/address/update',
		header: 'application/json',
		data:{
			...data
		}
	})
}

const getCommunity = (data) => {
	return http.get({
		url:'/community/getAll'
	})
}

// 回收员入驻
const recyclerApply = (data) => {
	return http.post({
		url: 'api/Settled/index',
		data:{
			...data
		}
	})
}

// 回收员入驻
const recycleBinApply = (data) => {
	return http.post({
		url: 'api/Settled/recycle',
		data:{
			...data
		}
	})
}

// 系统消息
const message = (data) => {
	return http.post({
		url: 'api/Settled/message',
		data:{
			...data
		}
	})
}

// 接单大厅
const orderList = (data) => {
	return http.post({
		url: 'api/Settled/orderList',
		data:{
			...data
		}
	})
}

// 确认接单
const saveOrder = (data) => {
	return http.post({
		url: 'api/Settled/saveOrder',
		data:{
			...data
		}
	})
}

// 用户信息
const getUserInfo = (data) => {
	return http.post({
		url: '/user/info',
		data:{
			...data
		}
	})
}

// 个人中心修改
const editInfo = (data) => {
	return http.post({
		url: '/user/update',
		header:'application/json',
		data:{
			...data
		}
	})
}

// vxopenid
const getVxOpenid = (data) => {
	return http.post({
		url: '/login/wx',
		data:{
			...data
		}
	})
}

// aliopenid
const getAliOpenid = (data) => {
	return http.post({
		url: '/login/ali',
		data:{
			...data
		}
	})
}

const getAllArea = (data) => {
	return http.post({
		url: '/area/getAll',
	})
}

// 存储用户信息
const saveUserInfo = (data) => {
	return http.post({
		url: '/user/info',
		data:{
			...data
		}
	})
}

// 会员卡
const getVip = (data) => {
	return http.post({
		url: 'api/User/pay',
		data:{
			...data
		}
	})
}

// 够买
const payVip = (data) => {
	return http.post({
		url: 'api/Pay/pay',
		data:{
			...data
		}
	})
}

// 获取默认地址
const getDefaultAddress = (data) => {
	return http.post({
		url: 'api/Index/getSaddress',
		data:{
			...data
		}
	})
}

// 订单列表
const userOrder = (data) => {
	return http.post({
		url: '/order/getUserAll',
		data:{
			...data
		}
	})
}

// 订单详情
const userOrderDetail = (data) => {
	return http.post({
		url: '/order/getOrderDetail',
		data:{
			...data
		}
	})
}

// 回收员订单
const recyleOrder = (data) => {
	return http.post({
		url: 'api/Order/recyleOrder',
		data:{
			...data
		}
	})
}

// 订单投诉
const complaint = (data) => {
	return http.post({
		url: 'api/Order/complaint',
		data:{
			...data
		}
	})
}

// 订单评价
const evaluate = (data) => {
	return http.post({
		url: 'api/Order/evaluate',
		data:{
			...data
		}
	})
}

// 反馈信息
const feedback = (data) => {
	return http.post({
		url: '/opinion/create',
		data:{
			...data
		}
	})
}

// 账户统计
const statistics = (data) => {
	return http.post({
		url: 'api/User/statistics',
		data:{
			...data
		}
	})
}

// 消息通知读取状态
const noticeStatus = (data) => {
	return http.post({
		url: 'api/User/show',
		data:{
			...data
		}
	})
}

// 回收站列表
const recyle = (data) => {
	return http.post({
		url: 'api/Recyle/index',
		data:{
			...data
		}
	})
}


// 垃圾分类
const sortList = (data) => {
	return http.post({
		url: 'api/Recyle/sortList',
		data:{
			...data
		}
	})
}

// 公益详情
const missionDesc = (data) => {
	return http.post({
		url: 'api/mechanism/activityDetail',
		data:{
			...data
		}
	})
}

// 获取地址信息
const getAddress = (data) => {
	return http.post({
		url: '/address/getAddress',
		data:{
			...data
		}
	})
}

// 计算提交
const orderAdd = (data) => {
	return http.post({
		url: 'api/Order/orderAdd',
		data:{
			...data
		}
	})
}

// 确认订单
const orderk = (data) => {
	return http.post({
		url: 'api/order/orderk',
		data:{
			...data
		}
	})
}

// 协议
const regaggrement = (data) => {
	return http.post({
		url: 'api/settled/regaggrement',
		data:{
			...data
		}
	})
}
// 协议
const orderov = (data) => {
	return http.post({
		url: 'api/Order/orderov',
		data:{
			...data
		}
	})
}

const mechanism = (data) => {
	return http.post({
		url: 'api/mechanism/lists',
		data:{
			...data
		}
	})
}

const mechanismDetail = (data) => {
	return http.get({
		url: 'api/mechanism/detail',
		data:{
			...data
		}
	})
}
const activity = (data) => {
	return http.get({
		url: 'api/mechanism/activity',
		data:{
			...data
		}
	})
}
const newOrder = (data) => {
	return http.get({
		url: 'api/order1/newOrder',
		data:{
			...data
		}
	})
}
const angelApply = (data) => {
	return http.post({
		url: 'api/angel/apply',
		data:{
			...data
		}
	})
}
const banner = (data) => {
	return http.get({
		url: 'api/usercenter/banner',
		data:{
			...data
		}
	})
}
const hallOrderList = (data) => {
	return http.get({
		url: 'api/order1/hallOrderList',
		data:{
			...data
		}
	})
}
const promoteList = (data) => {
	return http.get({
		url: 'api/promote/lists',
		data:{
			...data
		}
	})
}

const guideBanner = () => {
	return http.get({
		url: 'api/config/banner',
	})
}

const getRecycle1 = (data) => {
	return http.post({
		url: 'api/index/recycle1',
		data:{
			...data
		}
	})
}

const getProtocol = () => {
	return http.post({
		url: 'api/config/protocol'
	})
}

const getLove = (data) => {
	return http.post({
		url: 'api/config/love',
		data
	})
}

const completeInfo = (data) => {
	return http.post({
		url: 'api/apply/recycler',
		data
	})
}

const getRecyclerInfo = (data) => {
	return http.post({
		url: 'api/apply/getRecyclerInfo',
		data
	})
}

const phoneAuth = (data) => {
	return http.post({
		url: 'api/phone/auth',
		data
	})
}

const saveAddress= (data) => {
	return http.post({
		url: 'api/user/saveUserInfo',
		data
	})
}

// 回收员取消订单
const cancelOrder= (data) => {
	return http.post({
		url: 'api/order/cancel',
		data
	})
}

// 配置文件 是都展示身份证
const configCard= (data) => {
	return http.get({
		url: 'api/config/card',
		data
	})
}

// 绑定支付宝
const bindAlipay = (data) => {
	return http.post({
		url: '/user/updateAccount',
		header:'application/json',
		data
	})
}

const getAlipay = (data) => {
	return http.get({
		url: '/user/getAccount',
		data
	})
}

// 获取积分商城商品
const getPointProduct = () => {
	return http.get({
		url: '/points/getPointProduct'
	})
}

// 获取积分订单
const getUserPointsOrder = (data) => {
	return http.get({
		url: '/points/getUserPointsOrder',
		data
	})
}

// 获取用户积分
const getUserPoint = (data) => {
	return http.post({
		url: '/points/getUserPoints',
		data
	})
}

// 购买积分商品
const buyProduct = (data) => {
	return http.post({
		url: '/points/buyProduct',
		data,
		header:'application/json',
	})
}

// 问卷
const sendQuestionnaire = (data) => {
	return http.post({
		url: '/survey/create',
		data,
		header:'application/json'
	})
}

// 赠送积分
const givePoints = (data) => {
	return http.post({
		url: '/points/givePoints',
		data
	})
}

// 双十一活动接口

// 参与抽奖
const lotteryDraw = (data) => {
	return http.post({
		url: '/lottery/join',
		data
	})
}

// 获取参与奖券
const getLotterCoupon = (data) => {
	return http.post({
		url: '/lottery/getAllLottery',
		data
	})
}

// 获取参与人数
const getLotterUserCount = (data) => {
	return http.get({
		url: '/lottery/getUserCount',
		data
	})
}

// 获取邀请成功人数
const getUserCountInvited = (data) => {
	return http.post({
		url: '/lottery/getCountInvited',
		data
	})
}

// 获取中奖状态
const getLotteryStatus = (data) => {
	return http.get({
		url: '/lottery/getLotteryStatus',
		data
	})
}

const getPointPinProduct = () => {
	return http.get({
		url: '/pin/getPointPinProduct'
	})
}

const joinPinProduct = (data) => {
	return http.post({
		header:'application/json',
		url: '/pin/joinPinProduct',
		data
	})
}

const startPinProduct = data => {
	return http.post({
		header:'application/json',
		url: '/pin/startPinProduct',
		data
	})
}

const getPointPinOrder = data => {
	return http.get({
		url: '/pin/getPointPinOrder',
		data
	})
}

const getOrderUserAvatar = data => {
	return http.get({
		url: '/pin/getOrderUserAvatar',
		data
	})
}

const homepageDisplay = () => {
	return http.get({
		url: '/cat/homepageDisplay'
	})
}

const catAdd = data => {
	return http.post({
		url: '/cat/upload/catAdd',
		data,
		header:'application/json',
	})
}

const picturesToCat = data => {
	return http.put({
		url: '/cat/upload/picturesToCat',
		data
	})
}

const setUserInputRatio = data => {
	return http.post({
		url: '/cat/setUserInputRatio',
		data
	})
}

const setUserInputScore = data => {
	return http.put({
		url: '/cat/inputPoints',
		data
	})
}

const getCatInfo = data => {
	return http.get({
		url: '/cat/getCatInfo',
		data
	})
}

// 物流
const getOrders = data => {
	return http.get({
		url: '/getOrders',
		data
	})
}

const saveUserAddress = data => {
	return http.post({
		url: '/saveUserAddress',
		data,
		header:'application/json',
	})
}

const getUserAddress = data => {
	return http.get({
		url: '/getUserAddress',
		data
	})
}
export default {
	angelApply,
	cancelOrder,
	saveAddress,
	phoneAuth,
	getRecyclerInfo,
	completeInfo,
	getLove,
	getProtocol,
	getRecycle1,
	guideBanner,
	promoteList,
	hallOrderList,
	banner,
	newOrder,
	activity,
	mechanismDetail,
	mechanism,
	orderov,
	regaggrement,
	orderk,
	orderAdd,
	getAddress,
	missionDesc,
	sortList,
	recyle,
	payVip,
	noticeStatus,
	index,
	guidancePrice,
	guidanceList,
	recycle,
	mission,
	shopSort,
	placeOrder,
	userAddress,
	weight,
	addAddress,
	delAddress,
	setAddress,
	delOrder,
	siteAddres,
	recyclerApply,
	recycleBinApply,
	message,
	orderList,
	saveOrder,
	getUserInfo,
	editInfo,
	getVxOpenid,
	getAliOpenid,
	saveUserInfo,
	getVip,
	getDefaultAddress,
	uploadImg,
	userOrder,
	userOrderDetail,
	recyleOrder,
	complaint,
	evaluate,
	feedback,
	statistics,
	configCard,
	getCommunity,
	getAllArea,
	bindAlipay,
	getAlipay,
	getPointProduct,
	getUserPointsOrder,
	getUserPoint,
	buyProduct,
	sendQuestionnaire,
	givePoints,
	lotteryDraw,
	getLotterCoupon,
	getLotterUserCount,
	getUserCountInvited,
	getLotteryStatus,
	getPointPinProduct,
	joinPinProduct,
	startPinProduct,
	getPointPinOrder,
	getOrderUserAvatar,
	homepageDisplay,
	catAdd,
	picturesToCat,
	setUserInputRatio,
	setUserInputScore,
	getCatInfo,
	getOrders,
	saveUserAddress,
	getUserAddress
}
