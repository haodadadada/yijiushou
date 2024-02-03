<template>
	<view class="container">
		<div class="bgc-top"></div>
		<div class="bgc-bottom"></div>
		<div class="classify-content">
			<div class="title">回收品类</div>
			<div class="classify-detail flex-around">
				<div class="flex-1">
					<div class="classify-img"></div>
					<div class="classify-name">四季衣物</div>
				</div>
				<div class="flex-1">
					<div class="classify-img"></div>
					<div class="classify-name">各类鞋靴</div>
				</div>
				<div class="flex-1">
					<div class="classify-img"></div>
					<div class="classify-name">闲置旧包</div>
				</div>
				<div class="flex-1">
					<div class="classify-img"></div>
					<div class="classify-name">各类首饰</div>
				</div>
				<div class="flex-1">
					<div class="classify-img"></div>
					<div class="classify-name">毛绒玩具</div>
				</div>
			</div>
		</div>
		<div class="booking flex-center" :class="{enter: isEnter === true}" @touchstart="isEnter = true" @touchend="isEnter = false" @click="handleBooking">
			<div class="booking-detail">
				<div style="font-size: 20px; font-weight: 600; margin-bottom: 10px; color: #fff;">预约旧物回收</div>
				<div style="font-size: 12px; color: #fff;">覆盖全国城市</div>
			</div>
			<div class="booking-icon"></div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEnter: false
			}
		},
		methods: {
			handleBooking() {
				if(!uni.getStorageSync('openid')) {
					this.$tools.toast('请先登录');
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/user/user'
						})
					}, 500)
					return;
				}
				uni.navigateTo({
					url: "/pages/delivery/delivery-order"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		position: relative;
		height: 100vh;
		.bgc-top {
			position: absolute;
			top: 0;
			width: 100vw;
			height: 50vw;
			background-color: pink;
		}
		.bgc-bottom {
			position: absolute;
			bottom: 0;
			width: 100vw;
			height: 40vh;
			background: linear-gradient(to bottom, #f6f6f6, #34cd99);
		}
		.classify-content {
			transform: translateY(calc(50vw - 50%));
			width: 90vw;
			margin-left: 5vw;
			height: 100px;
			background-color: #6cf;
			border-radius: 10px;
			padding: 10px;
			box-sizing: border-box;
			.title {
				font-size: 16px;
				font-weight: 550;
			}
			.classify-detail {
				.classify-img {
					width: 100%;
					height: 20px;
					margin-bottom: 10px;
				}
				.classify-name {
					font-size: 12px;
					text-align: center;
				}
			}
		}
		.booking {
			transform: translateY(50vw);
			width: 90vw;
			margin-left: 5vw;
			box-sizing: border-box;
			background-color: #34cd99;
			border-radius: 10px;
			height: 100px;
			margin-top: 20px;
			.booking-detail {
				text-align: center;
				margin-right: 10px;
			}
			.booking-icon {
				width: 46px;
				height: 46px;
				border-radius: 23px;
				background-color: #fff;
			}
		}
		.enter {
			box-shadow: 0px 0px 3px #aaa;
		}
	}
</style>