<template>
	<view class="container">
		<u-navbar title="个人中心" leftIconSize="0" :bgColor="bgColor"></u-navbar>
		<view class="bgc1">
		</view>
		<view class="bgc2">
		</view>
		<view class="header">
			<view class="userInfo" @click="editUser" v-if="openid">
				<!-- <img src="../../static/new-user2.png" alt="指南" class="user-img"> -->
				<img :src="avatarUrl" alt="头像" class="user-img">
				<view class="name" v-if="userInfo.name!=null" style="text-align: center; font-size: 40px; color: #29D8D0;">{{ userInfo.name }}</view>
				<view v-else>admin</view>
			</view>
			<view class="userInfo" v-else>
				<view @click="getCode" class="login-btn">
					<img :src="avatarUrl" alt="头像" class="user-img">
					<span>立即登录</span>
					<span class="header-right">></span>
				</view>
			</view>
		</view>
		<view class="information">
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
		</view>
		<view class="order">
			<view class="flex-between">
				<view class="title">我的回收</view>
				<!-- <navigator url="../order/order" hover-class="none" class="flex" @click="goOrder(0)">全部<u-icon name="arrow-right" color="#999999"></u-icon></navigator> -->
			</view>
			<view class="list">
				<!-- <view class="item" v-for="item in orders" :key="item.id" @click="goOrder(item.id)"> -->
				<view class="item" v-for="item in orders" :key="item.id" @click="goDetail(item.url)">
					<image :src="this.openid === '' ? item.icon1 : item.icon2" mode="aspectFill"></image>
					<view>{{item.title}}</view>
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
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
	</view>
</template>

<script>
import orderStatus from '../../components/onTakeOrder/onTakeOrder.vue';
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
					url: "/pages/balance/balance",
					icon1: require('../../static/new-user7.png'),
					icon2: require('../../static/new-user8.png'),
					title: '我的钱包',
				},
				{
					id: 2,
					url: "#",
					icon1: require('../../static/new-user9.png'),
					icon2: require('../../static/new-user10.png'),
					title: '回收记录',
				},
				{
					id: 3,
					url: "#",
					icon1: require('../../static/new-user11.png'),
					icon2: require('../../static/new-user12.png'),
					title: '我的评价',
				},
				{
					id: 4,
					url: "#",
					icon1: require('../../static/new-user15.png'),
					icon2: require('../../static/new-user16.png'),
					title: '我的售后',
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
				{
					url: '../feedback/feedback',
					icon1: require('../../static/new-user1.png'),
					icon2: require('../../static/new-user2.png'),
					title: '意见反馈',
					show: true
				},
				{
					url: '../balance/balance',
					icon1: require('../../static/new-user3.png'),
					icon2: require('../../static/new-user4.png'),
					title: '常见问题',
					show: true
				},
				{
					url: '#',
					icon1: require('../../static/new-user13.png'),
					icon2: require('../../static/new-user14.png'),
					title: '关于我们',
					show: true
				}
			],
			bannerList: [],
			user_id: '',
			avatarUrl: 'https://pic4.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c'
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
	},
	onShow() {
		this.getUserInfo();
		if (uni.getStorageSync('invition_id')) {
			this.user_id = uni.getStorageSync('invition_id');
		}
	},
	methods: {
		closePopup() {
			this.show = false;
		},
		goOrder(id){
			if (!uni.getStorageSync('openid')) {
				this.$tools.toast('请先登录');
				return;
			}
			uni.switchTab({
				url:'../order/order?status=' + id
			});
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
										code: res.code,
										name: '微信用户',
										avatarUrl: this.avatarUrl
									})
								.then(res1 => {
									if (res1.code == 200) {
										this.openid = res1.data;
										uni.setStorageSync('openid', this.openid);
										} else {
											this.$tools.toast('登录失败，请稍后重试');
										}
								});
							}
						});
					}  else {
						/* uni.login({
						  provider: 'alipay',
						  success: loginRes => {
							var authCode = loginRes.code;
							console.log('支付宝用户的 code:', authCode);
							this.$api.getAliOpenid({
							  code: authCode,
							  name: '支付宝用户'
							})
							.then((res) => {
							  if (res.code == 200) {
								console.log(res);
								this.openid = res.data;
								uni.setStorageSync('openid', this.openid);
							  } else {
								this.$tools.toast('登录失败，请稍后重试');
							  }
							});
						  },
						  fail: function (error) {
							console.log('获取支付宝用户的 code 失败:', error);
						  }
						}); */
						uni.setStorageSync('openid', 'oOw3S5P0_8c9kTQz58gwiqj1YqvE');
					}
				  },
			  fail: function (error) {
			    console.log('获取系统信息失败', error);
			  },
			});
			this.getUserProfile()
			return;
		},
		getUserInfo() {
			this.$api
				.getUserInfo({
					openid: this.openid
				})
				.then(res => {
					this.userInfo = res.data;
					if (res.data.rstatus == 1) {
						this.tools[5].show = true;
						this.tools[6].show = true;
					}
					uni.setStorageSync('userInfo', this.userInfo);
				});
		},
		getUserProfile() {
			uni.getUserProfile({
			      provider: 'weixin',
				  desc: '用于展示',
			      success: (infoRes) => {
					  console.log(infoRes.userInfo.avatarUrl)
					  // this.avatarUrl = infoRes.userInfo.avatarUrl
			      },
				  fail(res) {
					  console.log(res)
				  }
			});
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
	height: 415upx;
	background: linear-gradient(45deg, #70c9ae, #77c9b0);
	z-index: -1;
}

.bgc2 {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 850upx;
	background: linear-gradient(to top, #9fe6ce, #fff);
	z-index: -2;
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
		justify-content: space-between;
		padding: 0 40upx;
		padding-bottom: 30upx;
		.item{
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
</style>
