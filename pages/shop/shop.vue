<template>
	<view class="container">
		<image src="/static/new-store-bgc.png" mode="" class="bgc"></image>
		<view class="header">
			<view class="top">当前积分</view>
			<view class="middle">{{userPoint}}</view>
			<view class="bottom" @click="goShopOrder">兑换记录 >></view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: [],
				userPoint: '',
				userPointOrder: [],
				userInfo: {}
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
				const {id, productImg, productName, productPrice} = item;
				uni.navigateTo({
					url: `/pages/shop-detail/shop-detail?productId=${id}&productImg=${productImg}&productName=${productName}&productPrice=${productPrice}`
				})
			},
			
			goShopOrder() {
				uni.navigateTo({
					url: '/pages/shopOrder/shopOrder'
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
		}
	}
</script>

<style lang="scss">
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
			margin: 20px 12vw;
			border-radius: 10px;
			height: 20vh;
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
		
		.contain {
			.item {
				display: inline-block;
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
							font-size: 18px;
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