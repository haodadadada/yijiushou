<template>
	<view class="container">
		<view style="background-color: #fff; padding-bottom: 10px;">
			<image src="/static/new-store-bgc.png" mode="" class="bgc"></image>
			<view class="header">
				<!-- <view class="top">当前积分<span style="margin-left: 30px;" @click="navigateToMiniProgram(openid)">打印</span></view> -->
				<view class="middle">{{userPoint}}</view>
				<view class="bottom" @click="goShopOrder">兑换记录 >></view>
			</view>
			<view class="tip" style="display: flex; align-items: center; width: 90vw; margin-bottom: 10px; margin-left: 5vw; font-size: 12px; background-color: #34cd99; border-radius: 99999px; padding: 5px 10px; box-sizing: border-box;">
				<span style="color: #fff; display: flex; align-items: center;"><span style="font-size: 10px;">tips：</span>可送货上门，请填写宿舍楼和寝室号</span>
			</view>
			<view class="nav">
				<span v-for="(item, index) in nav" :key="item.id" :class="{choose: navStatus === index}" @click="selectNavStatus(index)">{{item.title}}</span>
			</view>
		</view>
		
		<view class="contain" v-if="navStatus === 0">
			<view class="item" v-for="item in products" :key="item.id">
				<view class="img">
					<image :src="item.productImg" mode=""></image>
				</view>
				<view class="footer">
					<view class="name">{{item.productName}}</view>
					<view class="price">
						<span>{{item.productPrice}}积分</span>
						<!-- <span @click="buyProduct(item.id, item.productImg, item.productName, item.productPrice)">马上换</span> -->
						<span @click="buyProduct(item)">马上换</span>
					</view>
				</view>
			</view>
			<!-- <view style="text-align: center;">敬请期待</view> -->
		</view>
		
		<view class="contain" v-if="navStatus === 1">
			<view class="item" v-for="item in printProducts" :key="item.index">
				<view class="img">
					<image :src="item.productImg" mode=""></image>
				</view>
				<view class="footer">
					<view class="name">{{item.productName}}</view>
					<view class="price">
						<span>1积分</span>
						<!-- <span @click="buyProduct(item.id, item.productImg, item.productName, item.productPrice)">马上换</span> -->
						<span @click="navigateToMiniProgram">马上换</span>
					</view>
				</view>
			</view>
		</view>
		
		<view class="crowd-funding" v-if="navStatus === 2">
			<view class="item" v-for="item of crowdfunding" :key="item.index" @click="forCrowdFunding(item.index)">
				<view class="left">
					<img :src="item.imgUrl" alt="" style="width: 32px; height: 32px;" />
				</view>
				<view class="middle">
					<span>{{item.title}}</span>
					<span>{{item.content}}</span>
				</view>
				<view class="right" >
					<img src="/static/crowdfunding/right-arrow.png" alt="" style="width: 20px; height: 20px;"/>
				</view>
			</view>
		</view>
		
		<view style="display: flex; justify-content: center; margin-top: 10px;">
			<span v-if="navStatus === 0 || navStatus === 1" style="font-family: Microsoft Yahei; font-weight: 500; color: #107855; text-shadow: 2px 2px 2px 2px grey;">更多商品敬请期待</span>
			<!-- <span v-if="navStatus === 2" style="font-family: Microsoft Yahei; font-weight: 500; color: #107855; text-shadow: 2px 2px 2px 2px grey;">功能待上线</span> -->
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: [],
				printProducts: [
					{productImg: '/static/print/print.jpg', productName: '自助打印', id: '001'}
				],
				userPoint: '',
				userPointOrder: [],
				userInfo: {},
				openid: '',
				nav: [
					{title: '积分商品', id: '001'},
					{title: '兑换服务', id: '002'},
					{title: '趣味众筹', id: '003'}
				],
				navStatus: 0,
				crowdfunding: [
					{
						index: 0,
						title: '众筹广场',
						content: '众多商品, 马上参与',
						imgUrl: '/static/crowdfunding/gift.png'
					},
					{
						index: 1,
						title: '新建众筹',
						content: '建立众筹, 发布商品',
						imgUrl: '/static/crowdfunding/add-circle.png'
					},
					{
						index: 2,
						title: '众筹订单',
						content: '参与众筹的商品订单',
						imgUrl: '/static/crowdfunding/copy.png'
					},
				],
			}
		},
		methods: {
			async getPointProduct() {
				let result = await this.$api.getPointProduct();
				if(result.code === 200)
					this.products = result.data;
				console.log(this.products)
			},
			
			async getUserPoint() {
				let result = await this.$api.getUserPoint({
					id: uni.getStorageSync('openid')
				});
				if(result.code === 200)
					this.userPoint = result.data;
			},
			
			buyProduct(item) {
				console.log(item)
				const {id, productImg, productName, productPrice} = item;
				uni.navigateTo({
					url: `/pages/shop-detail/shop-detail?productId=${id}&productImg=${productImg}&productName=${productName}&productPrice=${productPrice}`
				})
			},
			
			goShopOrder() {
				uni.navigateTo({
					url: '/pages/shopOrder/shopOrder'
				})
			},
			
			navigateToMiniProgram() {
				uni.navigateToMiniProgram({
					appId: 'wx0051ea7ec7ed0ae8',
					// 可在ws.getLaunchOptionsSync()获得
					extraData: {
						openid: this.openid
					},
					envVersion: 'trial',
					success: res => {
						console.log(res);
					}
				})
			},
			
			selectNavStatus(index) {
				this.navStatus = index;
			},
			
			forCrowdFunding(index) {
				if(index === 0) {
					uni.navigateTo({
						url: '/pages-second/funding/fundingSquare/fundingSquare'
					})
				}
				else if(index === 1) {
					uni.navigateTo({
						url: '/pages-second/funding/addCrowdFunding/addCrowdFunding'
					})
				} else if(index === 2) {
					uni.navigateTo({
						url: '/pages-second/funding/crowdFundingOrder/crowdFundingOrder'
					})
				}
			}
			
		},
		onLoad(e) {
			if(e.status) {
				this.navStatus = Number(e.status);
			}
		},
		onShow() {
			if (!uni.getStorageSync('openid')) {
				this.$tools.toast('请先登录');
				setTimeout(() => {
					uni.switchTab({
						url: '../user/user'
					});
				}, 500);
				return;
			}
			this.getPointProduct();
			this.getUserPoint();
			this.openid = uni.getStorageSync('openid');
		}
	}
</script>

<style lang="scss">
	@keyframes identifier {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	.tip {
		background: linear-gradient(to left, #80f9bc, #34cd99);
		background-size: 200% 200%;
		animation: identifier 5s linear infinite;
	}
	.container {
		.bgc {
			position: absolute;
			top: 10px;
			width: 100%;
			height: 15vh;
			z-index: 0;
			width: 90vw;
			margin-left: 5vw;
			margin-top: 15px;
			border-radius: 20px;
		}
		.header {
			position: relative;
			margin: 20px 12vw 0px;
			border-radius: 10px;
			height: 18vh;
			.top {
				position: absolute;
				top: 2vh;
				color: #fff;
				font-size: 12px;
			}
			.middle {
				position: absolute;
				top: 5vh;
				font-size: 30px;
				font-weight: 700;
				color: #fff;
			}
			.bottom {
				position: absolute;
				top: 12vh;
				font-size: 12px;
				color: #fff;
			}
		}
		
		.nav {
			display: flex;
			width: 90vw;
			margin-left: 5vw;
			.choose {
				border-bottom: #34cd99 2px solid;
			}
			span {
				flex: 1;
				padding: 10px 0;
				text-align: center;
				color: #34cd99;
			}
		}
		
		.exchange {
			margin-bottom: 10px;
			margin-left: 5vw;
			width: 90vw;
			img {
				width: 90vw;
				height: 23vw;
				border-radius: 20px;
			}
		}
		
		.contain {
			overflow: hidden;
			.item {
				// display: inline-block;
				float: left;
				width: 42vw;
				// height: 150px;
				background-color: pink;
				margin-bottom: 20px;
				border-radius: 15px;
				overflow: hidden;
				.img {
					height: 42vw;
					background-color: #ccc;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.footer {
					display: flex;
					flex-direction: column;
					align-items: start;
					padding: 10px;
					// height: 50px;
					background-color: #fff;
					// 元素不在同一水平线上的原因是这个有文字的div的vertical-align默认为baseline
					.name {
						// vertical-align: top;
						font-size: 14px;
					}
					.price {
						display: flex; 
						justify-content: space-between; width: 100%;
						span:nth-child(1) {
							padding: 5px 0;
							color: coral;
						}
						span:nth-child(2) {
							padding: 5px 7px;
							color: #fff;
							background-color: #34cd99;
							border-radius: 5px;
						}
					}
				}
	
			}
			.item:nth-child(2n+1) {
				margin-left: 6vw;
				margin-right: 4vw;
			}
			.item:nth-child(2n) {
				margin-right: 6vw;
			}
		}
		.crowd-funding {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 20px;
			.item {
				display: flex;
				align-items: center;
				background-color: #fff;
				width: 90vw;
				padding: 25px 15px;
				margin-bottom: 10px;
				border-radius: 15px;
				box-sizing: border-box;
				.left {
					flex: 1;
					margin-right: 10px;
				}
				.middle {
					flex: 8;
					display: flex;
					flex-direction: column;
					justify-content: center;
					span:first-child {
						font-size: 16px;
						font-weight: 550;
						margin-bottom: 5px;
					}
					span:last-child {
						font-size: 12px;
						font-weight: 400;
					}
				}
				.right {
					flex: 1;
				}
			}
		}
	}

</style>