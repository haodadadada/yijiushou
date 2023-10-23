<template>
	<view class="container">
		<image src="/static/new-store-bgc.png" mode="" class="bgc"></image>
		<view class="header">
			<!-- <view class="top">当前积分<span style="margin-left: 30px;" @click="navigateToMiniProgram(openid)">打印</span></view> -->
			<view class="middle">{{userPoint}}</view>
			<view class="bottom" @click="goShopOrder">兑换记录 >></view>
		</view>
		<view class="exchange">
			<img src="/static/exchange.jpg" alt="兑换打印" @click="navigateToMiniProgram">
		</view>
		<view class="tip" style="display: flex; align-items: center; width: 90vw; margin-bottom: 10px; margin-left: 5vw; font-size: 12px; background-color: #34cd99; border-radius: 99999px; padding: 5px 10px; box-sizing: border-box;">
			<span style="color: #fff; display: flex; align-items: center;"><span style="font-size: 10px;">tips：</span>可送货上门，请填写宿舍楼和寝室号</span>
		</view>
		<view class="contain">
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
		<view style="display: flex; justify-content: center; margin-top: 10px;">
			<span style="font-family: Microsoft Yahei; font-weight: 500; color: #107855; text-shadow: 2px 2px 2px 2px grey;">更多商品敬请期待</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: [],
				userPoint: '',
				userPointOrder: [],
				userInfo: {},
				openid: ''
			}
		},
		methods: {
			async getPointProduct() {
				let result = await this.$api.getPointProduct();
				if(result.code === 200)
					this.products = result.data;
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
					envVersion: 'develop',
					success: res => {
						console.log(res);
					}
				})
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
		
		.exchange {
			margin-bottom: 10px;
			margin-left: 5vw;
			width: 90vw;
			img {
				width: 90vw;
				height: 35vw;
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
				margin-left: 5vw;
				margin-right: 4vw;
			}
			.item:nth-child(2n) {
				margin-right: 5vw;
			}
		}
	}

</style>