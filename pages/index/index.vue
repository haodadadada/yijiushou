<template>
	<view class="container">
		<view class="navbar"><image src="../../static/logo.png" mode="aspectFill"></image></view>
		<view class="location flex">
			<image src="../../static/location.png" mode="aspectFill"></image>
			<text class="size-30 ml-8">{{ area }}</text>
		</view>
		<view>
			<view class="main-banner">
				<view class="left pl-10">
					<view class="title">环保公益 你我同行</view>
					<view class="btn-1 flex-center">
						<navigator url="../placeOrder/placeOrder" open-type="switchTab"><image src="../../static/home-btn.png" mode="aspectFill"></image></navigator>
					</view>
				</view>
			</view>
			<!-- <swiper class="swiper" :autoplay="true" :vertical="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in noticeList" :key="item.id">
					<view class="swiper-item">
						<view class="title">接单大厅</view>
						<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="size-18">{{ item.nickname }}</view>
						<view class="size-18">预约上门回收成功</view>
					</view>
				</swiper-item>
			</swiper> -->

			<view class="menu">
				<view class="item" v-for="item in menuList" :key="item.id" @click="routerPush(item.url,item.id)">
					<image :src="item.icon" mode="aspectFill"></image>
					<view class="title">{{ item.title }}</view>
					<view class="title">{{ item.prize }} 元/公斤</view>
				</view>
			</view>

			<!-- <view class="menu">
				<view class="card" :class="'card-' + item.id" v-for="item in menuList" :key="item.id"
					@click="routerPush(item.url,item.id)">
					<view class="left">
						<view>{{item.title}}</view>
						<view>{{item.desc}}</view>
						<block v-if="item.id==2">
							<swiper  class="swiper" :autoplay="true" :vertical="true" :interval="3000" :duration="1000">
								<swiper-item v-for="item in noticeList" :key="item.id">
									<view class="swiper-item">
										<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
										<view class="size-18">{{item.nickname}}</view>
									</view>
								</swiper-item>
							</swiper>
						</block>
					</view>
					<image :src="item.icon" mode=""></image>
					<image class="bg" :src="item.icon1" mode=""></image>
				</view>
			</view> -->

			<!-- <view class="banner mt-40 px-30"><u-swiper @click="goDetail" height="200rpx" keyName="bannerimage" indicator circular :list="bannerList"></u-swiper></view> -->
		</view>
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
	</view>
</template>

<script>
var QQMapWX = require('../../common/qqmap-wx-jssdk.min.js');
var qqmapsdk;
import orderStatus from '../../components/onTakeOrder/onTakeOrder.vue';
export default {
	components: {
		orderStatus
	},
	data() {
		return {
			show: false,
			area: '',
			bannerList: [], //轮播图
			kehuMobile: '',
			menuList: [
				{
					id: 1,
					title: '衣物',
					prize: '1.1',
					icon: '../../static/clothes.png',
				},
				{
					id: 2,
					title: '鞋子',
					prize: '60',
					icon: '../../static/shoe.png',
				},
				{
					id: 3,
					title: '被子',
					prize: '1.2',
					icon: '../../static/beizi.png',
				},
				{
					id: 4,
					title: '窗帘',
					prize: '1.6',
					icon: '../../static/curtain.png',
				},
			],
			noticeList: [],
			userInfo: ''
		};
	},
	onShareAppMessage() {},
	onShareTimeline() {},
	onShow() {
		this.$api
			.orderov({
				openid: uni.getStorageSync('openid')
			})
			.then(res => {
				if (res.code == 1) {
					if (res.data.status == 1) {
						this.show = true;
					}
				}
			});
		this.userInfo = uni.getStorageSync('userInfo');
	},
	onLoad() {
		this.baseUrl = this.$tools.baseUrl;
		this.getNoticeList();
	},
	methods: {
		getNoticeList() {
			this.$api.newOrder().then(res => {
				this.noticeList = res.data;
			});
		},
		makePhone() {
			uni.makePhoneCall({
				phoneNumber: this.kefuphone
			});
		},
		closePopup() {
			this.show = false;
		},
		goDetail(e) {
			let url = this.bannerList[e].linkurl;
			uni.navigateTo({
				url,
				fail: () => {
					uni.switchTab({
						url
					});
				}
			});
		},
		getUserInfo() {
			this.$api
				.getUserInfo({
					openid: uni.getStorageSync('openid')
				})
				.then(res => {
					uni.setStorageSync('userInfo', this.userInfo);
				});
		},
		routerPush(url, id) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	background: url(https://youjin.phpcaff.cn/uploads/20220503/2d46dd07ab6430295e32156d08fbe588.png) no-repeat;
	background-size: 100% auto;
	overflow-x: hidden;

	.navbar {
		font-size: 34upx;
		font-weight: 500;
		color: #ffffff;
		padding: 20upx 30upx;
		padding-top: calc(var(--status-bar-height) + 50upx);
		image {
			width: 250upx;
			height: 64upx;
		}
	}
	.location {
		padding-left: 30upx;
		image {
			width: 58upx;
			height: 66upx;
		}
	}

	.main-banner {
		color: #fff;
		display: flex;
		justify-content: center;
		height: 480upx;

		.left {
			padding-top: 30upx;
			flex: 1;
			text-align: center;
			.title {
				font-size: 58upx;
				font-weight: 400;
				color: #141414;
			}
			.text-1 {
				image {
					width: 36upx;
					height: 36upx;
				}
			}

			.text-2 {
				font-size: 26upx;
				font-weight: 400;
				color: #ffffff;
			}

			.btn-1 {
				width: 270upx;
				height: 82upx;
				line-height: 82upx;
				margin: 50upx auto;

				image {
					width: 270upx;
					height: 82upx;
				}
			}
		}

		.right {
			min-width: 360upx;
			position: relative;

			.ball {
				min-width: 360upx;
				min-height: 360upx;
				width: 360upx;
				height: 360upx;
				animation: turn 10s linear infinite;
			}

			.hand {
				position: absolute;
				width: 380upx;
				height: 200upx;
				bottom: 4upx;
				left: -6px;
			}
		}

		@keyframes turn {
			0% {
				-webkit-transform: rotate(0deg);
			}

			25% {
				-webkit-transform: rotate(90deg);
			}

			50% {
				-webkit-transform: rotate(180deg);
			}

			75% {
				-webkit-transform: rotate(270deg);
			}

			100% {
				-webkit-transform: rotate(360deg);
			}
		}
	}

	.menu {
		margin-top: 40upx;
		@include menu-list(4);
		background: #f8f8f8;
		.item {
			image {
				width: 96upx;
				height: 107upx;
			}
			.title {
				font-size: 28upx;
				font-weight: 400;
				color: #333333;
			}
		}
	}

	.tools {
		border-radius: 16upx;
		padding: 30upx 30upx 20upx;
		background: #f8f8f8;
		.title {
			font-size: 36upx;
			font-weight: 500;
			color: #222222;
		}

		.card {
			width: 335upx;
			height: 160upx;
			background-image: linear-gradient(90deg, #fff, #f7fff3, #fff);
			padding: 20upx;
			box-sizing: border-box;
			@include flex-between;
			.title-1{
				font-size: 36upx;
				font-weight: bold;
				color: #333333;
			}
			.text{
				font-size: 24upx;
				color: #AAAAAA;
				letter-spacing: 2upx;
				margin-top: 10upx;
			}
			image {
				width: 75upx;
				height: 75upx;
			}
		}
	}
}

.swiper {
	height: 42upx;
	padding: 20upx;
	background: #fff;
	.swiper-item {
		display: flex;
		align-items: center;
		.title {
			font-size: 26upx;
			color: #111;
			margin-right: 20upx;
		}
		.avatar {
			position: relative !important;
			right: 0 !important;
			top: 0 !important;
			width: 42upx !important;
			height: 42upx !important;
			margin-top: 0 !important;
			border-radius: 20upx;
		}
		.size-18 {
			color: #02c99a;
			margin-left: 10upx;
			margin-top: 0 !important;
			font-size: 26upx;
			color: #999999;
		}
	}
}
</style>
