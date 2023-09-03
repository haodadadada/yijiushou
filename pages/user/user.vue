<template>
	<view class="container">
		<!-- <u-navbar title="个人中心" leftIconSize="0" :bgColor="bgColor"></u-navbar> -->
		<view class="bgc1" :class="showInalipay? 'bgcali1': ''">
		</view>
		<view class="bgc2" :class="showInalipay? 'bgcali2': ''">
		</view>
		<view class="info-container">
			<view class="header">
			<view class="userInfo" @click="editUser" v-if="openid">
				<!-- <img src="../../static/new-user2.png" alt="指南" class="user-img"> -->
				<img :src="userInfo.avatarUrl? userInfo.avatarUrl : oldAvatarUrl" alt="头像" class="user-img">
				<view class="name" v-if="userInfo.name">{{ userInfo.name }}</view>
				<view v-else-if="showInalipay">支付宝用户</view>
				<view v-else>微信用户</view>
			</view>
			<view class="userInfo" v-else>
				<view @click="getCode" class="login-btn">
					<img :src="oldAvatarUrl" alt="头像" class="user-img">
					<span>立即登录</span>
					<span class="header-right">></span>
				</view>
			</view>
		</view>
		<!-- <view class="information">
			<ul class="shadow">
				<li>
					<view>
						<span class="info-header">我的收入</span>
					</view>
					<view>
						<span class="info-login" v-if="!openid">登录后可查看</span>
					</view>
				</li>
				<li>
					<view>
						<span class="info-header">回收次数</span>
					</view>
					<view>
						<span class="info-login" v-if="!openid">登录后可查看</span>
					</view>
				</li>				
				<li>
					<view>
						<span class="info-header">活跃天数</span>
					</view>
					<view>
						<span class="info-login" v-if="!openid">登录后可查看</span>
					</view>
				</li>
			</ul>
		</view> -->
		<view class="order">
			<view class="flex-between">
				<view class="title">我的订单</view>
				<!-- <navigator url="../order/order" hover-class="none" class="flex" @click="goOrder(0)">全部<u-icon name="arrow-right" color="#999999"></u-icon></navigator> -->
			</view>
			<view class="list">
				<!-- <view class="item" v-for="item in orders" :key="item.id" @click="goOrder(item.id)"> -->
		<!-- 		<view class="item" v-for="item in orders" :key="item.id" @click="goOrder()">
					<image :src="this.openid === '' ? item.icon1 : item.icon2" mode="aspectFill"></image>
					<view>{{item.title}}</view>
					</view> -->
				<view class="item" @click="goOrder()">
					<image :src="this.openid === '' ? orders[0].icon1 : orders[0].icon2" mode="aspectFill"></image>
					<view>{{orders[0].title}}</view>
				</view>
<!-- 				<view class="item" @click="goBind()">
					<image :src="this.openid === '' ? orders[1].icon1 : orders[1].icon2" mode="aspectFill"></image>
					<view>{{orders[1].title}}</view>
				</view> -->
				<view class="item" @click="makePhone('4001100019')">
					<image :src="this.openid === '' ? orders[2].icon1 : orders[2].icon2" mode="aspectFill"></image>
					<view>{{orders[2].title}}</view>
				</view>
			</view>
		</view>
		<view class="tool-list">
			<view class="title">常用工具</view>
			<view class="flex">
				<view class="item" v-for="(item, index) in tools" :key="index" @click="goDetail(item.url)">
					<block v-if="item.show">
						<block v-if="item.statusFlag"><view v-if="item.status == 1" class="tip"></view></block>
						<image :src="this.openid === '' ? item.icon1 : item.icon2" mode="aspectFill"></image>
						<view>{{ item.title }}</view>
					</block>
				</view>
			</view>
		</view>
		</view>
			
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
	</view>
</template>

<script>
import orderStatus from '../../components/onTakeOrder/onTakeOrder.vue';
import userVue from './user.vue';
export default {
	components: {
		orderStatus
	},
	data() {
		return {
			bgColor:'transparent',
			show: false,
			openid: '',
			userInfo: {},
			orders:[
				{
					id: 1,
					icon1: require('../../static/new-user9.png'),
					icon2: require('../../static/new-user10.png'),
					title: '我的订单',
				},
				{
					id: 3,
					icon1: require('../../static/new-user7.png'),
					icon2: require('../../static/new-user8.png'),
					title: '我的钱包',
				},
				// {
				// 	id: 2,
				// 	icon1: require('../../static/new-user9.png'),
				// 	icon2: require('../../static/new-user10.png'),
				// 	title: '待回收',
				// },
				// {
				// 	id: 3,
				// 	icon1: require('../../static/new-user11.png'),
				// 	icon2: require('../../static/new-user12.png'),
				// 	title: '已取消',
				// },
				{
					id: 4,
					url: "#",
					icon1: require('../../static/new-user15.png'),
					icon2: require('../../static/new-user16.png'),
					title: '找回物品',
				}
			],
			tools: [
				{
					url: '../address/address',
					icon1: require('../../static/new-user5.png'),
					icon2: require('../../static/new-user6.png'),
					title: '我的地址',
					show: true
				},
				// {
				// 	url: '../feedback/feedback',
				// 	icon1: require('../../static/new-user1.png'),
				// 	icon2: require('../../static/new-user2.png'),
				// 	title: '意见反馈',
				// 	show: true
				// },
				// {
				// 	url: '../balance/balance',
				// 	icon1: require('../../static/new-user3.png'),
				// 	icon2: require('../../static/new-user4.png'),
				// 	title: '常见问题',
				// 	show: true
				// },
				{
					url: '../about/about',
					icon1: require('../../static/new-user13.png'),
					icon2: require('../../static/new-user14.png'),
					title: '关于我们',
					show: true
				}
			],
			bannerList: [],
			user_id: '',
			oldAvatarUrl: 'https://pic4.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c',
			systemInfo: '',
			showInalipay: false
		};
	},
	onShareAppMessage() {},
	onShareTimeline() {},
	onLoad(e) {
		this.openid = uni.getStorageSync('openid');
		if (e.scene) {
			this.user_id = e.scene;
			uni.setStorageSync('invition_id', this.user_id);
		}
		this.getSystemInfo()
	},
	onShow() {
		this.getUserInfo();
		this.handleTabBarShow(2)

		if (uni.getStorageSync('invition_id')) {
			this.user_id = uni.getStorageSync('invition_id');
		}
	},
	methods: {
		closePopup() {
			this.show = false;
		},
		// uni.switchTab无法传递参数
		goOrder(){
			if (!uni.getStorageSync('openid')) {
				this.$tools.toast('请先登录');
				return;
			}
			uni.navigateTo({
				url:'../order/order'
			});
		},
		goBind() {
			if (!uni.getStorageSync('openid')) {
				this.$tools.toast('请先登录');
				return;
			}
			uni.navigateTo({
				url: '../bind/bind'
			})
		},
		goBanner(e) {
			let url = this.bannerList[e].url;
			uni.navigateTo({
				url,
				fail: () => {
					uni.switchTab({
						url
					});
				}
			});
		},
		goDetail(url) {
			if (!uni.getStorageSync('openid')) {
				this.$tools.toast('请先登录');
				return;
			}
			uni.navigateTo({
				url
			});
		},
		editUser() {
			uni.navigateTo({
				url: '../editUser/editUser'
			});
		},
		getCode() {
			uni.getSystemInfo({
				success: (res) => {
					// 获取平台信息
					var platform = res.uniPlatform;
					// 判断平台
					if (platform === 'mp-weixin') {
						uni.login({
							onlyAuthorize: true,
							success: res => {
								this.$api.getVxOpenid({
										code: res.code
									})
								.then(res1 => {
									if (res1.code == 200) {
										this.openid = res1.data;
										uni.setStorageSync('openid', this.openid);
										if(res1.msg == '未注册'){
											uni.navigateTo({
												url: '../editUser/editUser'
											});
										}else{
											this.getUserInfo();
										}
										// this.editUser();
										} else {
											this.$tools.toast('登录失败，请稍后重试');
										}
								});
							}
						});
					}  else {
						uni.login({
						  provider: 'alipay',
						  success: loginRes => {
							var authCode = loginRes.code;
							console.log('支付宝用户的 code:', authCode);
							this.$api.getAliOpenid({
							  code: authCode,
							  name: '支付宝用户',
							  avatarUrl: this.oldAvatarUrl
							}).then((res) => {
							  if (res.code == 200) {
								this.openid = res.data;
								uni.setStorageSync('openid', this.openid);
							  } else {
								this.$tools.toast('登录失败，请稍后重试');
							  }
							}).catch(error => {
								console.log(222, error);
							});
						  },
						  fail: function (error) {
							console.log('获取支付宝用户的 code 失败:', error);
						  }
						});
						// uni.setStorageSync('openid', 'oOw3S5P0_8c9kTQz58gwiqj1YqvE');
					}
				  },
			  fail: function (error) {
			    console.log('获取系统信息失败', error);
			  },
			});
			return;
		},
		getUserInfo() {
			this.$api
				.getUserInfo({
					openid: this.openid
				})
				.then(res => {
					this.userInfo = res.data;
					console.log(11,this.userInfo)
					uni.setStorageSync('userInfo', this.userInfo);
				});
		},
		makePhone(phone) {
			uni.makePhoneCall({
				phoneNumber: phone,
				success(res) {
					console.log('success:',res)
				},
				fail(res) {
					console.log('fail:',res)
				}
			});
		},
		/** 获取设备 */ 
		getSystemInfo() {
			this.systemInfo = uni.getSystemInfoSync()
			if(this.systemInfo.uniPlatform === 'mp-alipay') {
				this.showInalipay = true
			}
		},
		/** 自定义tabbar时切换高亮显示 */
		handleTabBarShow (index) {
				const page = this.$mp.page  
				if (typeof page.getTabBar === 'function' && page.getTabBar()) {
						page.getTabBar().setData({  
								selected: index
						})  
				}
			}
	}
};
</script>

<style lang="scss">
body {
	background-color: #fff;
}
.container {
	margin: 0 20upx;
}

.bgc1 {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 400upx;
	background: linear-gradient(45deg, #70c9ae, #77c9b0);
}
.bgcali1{
	background: none;
	background-image: url('../../static/bg-user-alipay-1.jpg');

}

.bgc2 {
	position: absolute;
	top: 500upx;
	bottom: 0;
	left: 0;
	right: 0;
	// height: 850upx;
	background: linear-gradient(to top, #9fe6ce, #fff);
}
.bgcali2 {
	background: none;
	background-image: url('../../static/bg-user-alipay-2.jpg');
	background-size: 100% 100%;
}

.header{
	// background: url(https://youjin.phpcaff.cn/uploads/20220503/38638bc88a85e10507bdffbbacd1fff8.png) no-repeat;
	// background-size: cover;
	// padding-top: var(--status-bar-height);
	padding-top: 90upx;
}
.userInfo {
	padding: 60px 10upx 0;
	border-radius: 12upx 12upx 0px 0px;
	height: 160upx;
	display: flex;
	align-items: center;

	.avatar {
		width: 130upx;
		height: 130upx;
		border-radius: 100%;
		position: relative;

		.level {
			width: 32upx;
			height: 32upx;
			position: absolute;
			right: 0;
			top: 0;
		}
	}

	.name {
		margin-left: 28upx;
		font-size: 36upx;
		font-weight: 500;
		color: #000000;
	}
	
	.user-img {
		border-radius: 80upx;
		width: 80upx;
		height: 80upx;
		margin-right: 10upx;
		margin-left: 20upx;
	}
	
	.login-btn {
		display: flex;
		position: relative;
		align-items: center;
		// padding-left: 20upx;
		height: 100%;
		width: 100%;
		flex: 1;
		font-size: 32upx;
		font-weight: 600;
		// color: #3bb061;
		color: #fff;
		// line-height: 176upx;
		// text-align: center;
		.header-right {
			position: absolute;
			right: 20upx;
		}
	}
}

.information {
	width: 100%;
	border-radius: 20upx;
	background-color: #fff;
	margin-bottom: 80upx;
	ul {
		position: relative;
		display: flex;
		flex-direction: row;
		li {
			flex-basis: 0;
			flex-grow: 1;
			margin: 25upx 0;
			padding: 0 25upx;
			text-align: center;
			.info-header {
				font-size: 27upx;
				color: #9f9f9f;
			}
			.info-login {
				font-size: 20upx;
				color: #1bc488;
			}
		}
	}
	ul > li:not(:last-child) {
		border-right: 1upx dashed #7bc8b1;
	}
}

.shadow::after {
	  content: '';
	  position: absolute;
	  left: 0;
	  top: 50%;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.4);
	  transform: translateY(-45%) rotate(0deg);
	  filter: blur(8px);
	  z-index: -1;
}

.card-group {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20upx 8upx;
	border-radius: 0px 0px 12upx 12upx;

	.item {
		width: 172upx;
		padding-bottom: 38upx;
		border-radius: 12upx;
		text-align: center;

		.num {
			font-size: 42upx;
			font-weight: bold;
			color: #333333;
			line-height: 1;
			margin-top: 20upx;
		}

		.title {
			font-size: 24upx;
			font-weight: 500;
			color: #999999;
			line-height: 1;
			margin-top: 20upx;
		}
	}
}
.order{
	background: #FFFFFF;
	border-radius: 16upx;
	margin: 10upx 0;
	padding: 15upx 0;
	.title {
		font-size: 25upx;
		font-weight: bold;
		color: #333333;
		padding: 42upx 32upx 46upx;
	}
	.flex{
		font-size: 26upx;
		font-weight: 400;
		color: #999999;
	}
	.list{
		@include menu-list(5);
		display: flex;
		// justify-content: space-between;
		// padding: 0 40upx;
		padding-bottom: 30upx;
		.item{
			width: 25%;
			image{
				width: 52upx;
				height: 52upx;
			}
			view{
				font-size: 20upx;
				color: #666666;
				margin-top: 10upx;
			}
		}
	}
}
.banner {
	margin: 20upx 0;
	image {
		width: 100%;
		height: 164upx;
	}
}
.tool-list {
	background: #fff;
	border-radius: 16upx;
	margin: 20upx 0;
	padding: 15upx 0;
	.title {
		font-size: 25upx;
		font-weight: bold;
		color: #333333;
		padding: 42upx 32upx 46upx;
	}
	.flex {
		flex-wrap: wrap;
	}
	.item {
		width: 25%;
		text-align: center;
		margin-bottom: 60upx;
		font-size: 20upx;
		font-weight: 400;
		color: #222222;
		position: relative;
		.tip {
			position: absolute;
			right: 60upx;
			top: 0;
			z-index: 100;
			width: 20upx;
			height: 20upx;
			border-radius: 100%;
			background: $color-error;
		}
		image {
			width: 52upx;
			height: 52upx;
			margin-bottom: 10upx;
		}
	}
}
.info-container{
	position: relative;
}
</style>
