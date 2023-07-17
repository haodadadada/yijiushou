<template>
	<view class="container">
		<view class="bgc">
		</view>
		<view class="navbar"></view>
		<view class="location flex">
			<image src="../../static/location-1.png" mode="aspectFill" class="headerImg"></image>
			<span> {{community}}</span>
			<text class="size-30 ml-8">{{ area }}</text>
		</view>
		<view>
			<view class="main-banner">
				<img src="../../static/new15.png" alt="" class="img-banner">
<!-- 				<view class="left pl-10">
					<view class="title">环保公益 你我同行</view>
					<view class="btn-1 flex-center">
						<navigator url="../placeOrder/placeOrder" open-type="switchTab"><image src="../../static/home-btn.png" mode="aspectFill"></image></navigator>
					</view>
				</view> -->
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
<!-- 
			<view class="menu">
				<view class="item" v-for="item in menuList" :key="item.id" @click="routerPush(item.url,item.id)">
					<image :src="item.icon" mode="aspectFill"></image>
					<view class="title">{{ item.title }}</view>
					<view class="title">{{ item.prize }} 元/公斤</view>
				</view>
			</view> -->
			<view class="clearfix" style="">
				<view class="menu" >
					<view class="item">
						<img src="../../static/new4.png" alt="指南">
						<span class="title">回收指南</span>
					</view>
					<view class="item">
						<img src="../../static/new5.png" alt="分类">
						<span class="title">回收分类</span>
					</view>
					<view class="item">
						<img src="../../static/new6.png" alt="客服">
						<span class="title">客服中心</span>
					</view>
				</view>
				
				<view class="process">
					<view class="process-top">
						<view class="process-img">
							<img src="../../static/new1.png" alt="预约">
							<view>预约下单</view>
						</view>
						<view class="line">
							<span>----></span>
						</view>
						<view class="process-img">
							<img src="../../static/new2.png" alt="上门">
							<view>免费上门</view>
						</view>
						<view class="line">
							<span>----></span>
						</view>
						<view class="process-img">
							<img src="../../static/new3.png" alt="完成">
							<view>完成订单</view>
						</view>
					</view>
					<view class="process-recycle">
						<view class="recycle-top" @click="navTo">
							<!-- <span>预约回收</span> -->
							<span>预约回收</span>
						</view>
						<view class="recycle-footer">
							<span>专业回收</span>
							<span>免费上门</span>
							<span>保护隐私</span>
						</view>
					</view>
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
		<!-- <orderStatus :show="show" @closePopup="closePopup"></orderStatus> -->
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
			userInfo: '',
			longitude: 0,
			latitude: 0,
			community: ''
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
		this.initMap();
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
		},
		navTo() {
			uni.switchTab({
				url: "../placeOrder/placeOrder"
			})
		},
		getLocation(){
			const params = {
			  location: this.latitude+','+this.longitude,
			  sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
			};
			// 调用定位方法
			this.qqMap.reverseGeocoder({
				...params,
			  success: (res) => {
			    // 获取定位成功的结果
			    const community = res.result.address_component.district;
				this.community = community;
				// console.log(community)
			    // 其他逻辑处理
			    // ...
			  },
			  fail: (error) => {
			    // 定位失败的处理
			    console.log('定位失败', error)
			  }
			})
		},
		initMap(){
			uni.getLocation({
			    type: 'gcj02',
			    success: res => {
			        this.longitude = res.longitude;
			        this.latitude = res.latitude;
					// 等待异步回调结果返回后再调用
					this.getLocation()
					
			    },
			    fail: res => {
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
	.clearfix::after {
	  content: "";
	  display: table;
	  clear: both;
	}
	.bgc {
		position: absolute;
		background: linear-gradient(to top, #80f9bc, #ffffff);
		background-clip: content-box;
		top: 560upx;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
	.container {
		// background-color: #02c99a;
		background-size: 100% auto;
		overflow-x: hidden;
		margin: 0 20upx 0 20upx;
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
				width: 29upx;
				height: 33upx;
			}
		}
			
		.main-banner {
			// background: url(https://youjin.phpcaff.cn/uploads/20220503/2d46dd07ab6430295e32156d08fbe588.png) no-repeat;
			background-size: 100% 100%;
			color: #fff;
			display: flex;
			justify-content: center;
			overflow: hidden;
			// height: 480upx;
			.img-banner {
				margin-top: 30upx;
				width: 100%;
				border-radius: 30upx;
				height: 300upx;
				max-height: 100%;
			}
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
			display: flex;
			justify-content: space-between;
			overflow: hidden;
			margin: 0 auto;
			// background-color: red;
			width: 90%;
			margin-top: 40upx;
			margin-bottom: 40upx;
			// @include menu-list(4);
			// background: #f8f8f8;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				margin-top: 40upx;
				image {
					margin: 0 auto;
					width: 64upx;
					height: 64upx;
				}
				.title {
					margin-top: 10upx;
					font-size: 28upx;
					font-weight: 400;
					color: #333333;
				}
			}
		}
	
		.process {
			background-color: #fff;
			border-radius: 30upx;
			width: 100%;
			height: 350upx;
			margin-bottom: 10upx;
			image {
				background-size: 100% 100%
			}
			.process-top {
				display: flex;
				margin: 30upx 30upx 0 30upx;
				height: 40%;
				justify-content: space-around;
				padding-top: 30upx;
				.line {
					height: 70%;
					color: #cecece;
				}
				.process-img {
					display: flex;
					// flex-direction: column;
					flex-wrap: wrap;
					justify-content: center;
					// width: 33%;
					height: 70%;
					text-align: center;
					// margin-top: 30upx;
					image {
						width: 60upx;
						height: 60upx;
					}
					view {
						font-size: 20upx;
						color: #ccc;
						flex-basis: 100%;
					}
				}
			}
			
			.process-recycle {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 50%;
				// background-color: red;
				.recycle-top {
					display: flex;
					height: 50%;
					// flex-grow: 1;
					justify-content: center;
					align-items: center;
					width: 60%;
					// height: 33.3%;
					margin: 0 auto;
					background: linear-gradient(to right, #48b97e, #0be0b2);
					border-radius: 15upx;
					span {
						color: #d0fcf5;
					}
					
				}
				.recycle-footer {
					display: flex;
					justify-content: center;
					// flex-grow: 2;
					// background-color: yellow;
					// margin-top: 30upx;
					height: 50%;
					span {
						display: inline-block;
						margin-right: 10upx;
						margin-top: 10upx;
						color: #cecece;
						font-size: 20upx;
					}
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
