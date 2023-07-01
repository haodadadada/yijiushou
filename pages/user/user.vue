<template>
	<view class="container">
		<u-navbar title="个人中心" leftIconSize="0" :bgColor="bgColor"></u-navbar>
		<view class="header">
			<view class="userInfo" @click="editUser" v-if="openid">
				<view class="name" v-if="userInfo.name!=null" style="text-align: center; font-size: 40px; color: #29D8D0;">{{ userInfo.name }}</view>
				<view v-else></view>
			</view>
			<view class="userInfo" v-else><view @click="getCode" class="login-btn">立即登录</view></view>
		</view>
		<view class="order">
			<view class="flex-between">
				<view class="title">我的订单</view>
				<navigator url="../order/order" hover-class="none" class="flex">全部<u-icon name="arrow-right" color="#999999"></u-icon></navigator>
			</view>
			<view class="list">
				<view class="item" v-for="item in orders" :key="item.id" @click="goOrder(item.id)">
					<image :src="item.icon" mode="aspectFill"></image>
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
						<image :src="item.icon" mode="aspectFill"></image>
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
					icon: require('../../static/order-1.png'),
					title: '全部',
				},
				{
					id: 2,
					icon: require('../../static/order-2.png'),
					title: '待服务',
				},
				{
					id: 3,
					icon: require('../../static/order-5.png'),
					title: '已完成',
				},
				/* {
					id: 4,
					icon: require('../../static/order-4.png'),
					title: '已取消',
				} */
			],
			tools: [
				{
					url: '../address/address',
					icon: require('../../static/tools-2.png'),
					title: '地址管理',
					show: true
				},
				{
					url: '../feedback/feedback',
					icon: require('../../static/tools-3.png'),
					title: '意见反馈',
					show: true
				}
			],
			bannerList: [],
			user_id: ''
		};
	},
	onShareAppMessage() {},
	onShareTimeline() {},
	onLoad(e) {
		this.openid = uni.getStorageSync('openid');
		console.log(this.openid);
		this.getBanner();
		console.log(e);
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
			uni.navigateTo({
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
								name: '微信用户'
							})
							.then(res1 => {
							if (res1.code == 200) {
								console.log(res1);
								this.openid = res1.data;
								uni.setStorageSync('openid', this.openid);
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
					});

			    }
			  },
			  fail: function (error) {
			    console.log('获取系统信息失败', error);
			  }
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
					if (res.data.rstatus == 1) {
						this.tools[5].show = true;
						this.tools[6].show = true;
					}
					uni.setStorageSync('userInfo', this.userInfo);
				});
		}
	}
};
</script>

<style lang="scss">
.header{
	background: url(https://youjin.phpcaff.cn/uploads/20220503/38638bc88a85e10507bdffbbacd1fff8.png) no-repeat;
	background-size: cover;
	padding-top: var(--status-bar-height);
}
.userInfo {
	padding: 60px 30upx 0;
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

	.login-btn {
		flex: 1;
		font-size: 32upx;
		font-weight: 500;
		color: #3bb061;
		line-height: 176upx;
		text-align: center;
	}
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
	margin: 30upx;
	.title {
		font-size: 34upx;
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
		padding-bottom: 30upx;
		.item{
			image{
				width: 52upx;
				height: 52upx;
			}
			view{
				font-size: 26upx;
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
	margin: 30upx;
	.title {
		font-size: 34upx;
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
		font-size: 28upx;
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
			width: 60upx;
			height: 60upx;
			margin-bottom: 10upx;
		}
	}
}
</style>
