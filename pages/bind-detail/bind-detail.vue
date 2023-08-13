<template>
	<view class="container">
		<view class="header">
			<img src="../../static/bind-success.png" alt="">
			<span>绑定支付宝成功</span>
		</view>
		<view class="footer" @click="close">
			<view class="close"><span>关闭</span></view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			close() {
				uni.switchTab({
					url: '../user/user'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		.header {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 100%;
			height: 40vh;
			img {
				width: 78px;
				height: 78px;
				margin-bottom: 15px;
			}
		}
		.footer {
			position: absolute;
			bottom: 10vh;
			left: 20%;
			width: 60%;
			text-align: center;
			border-radius: 10px;
			overflow: hidden;
			.close {
				padding: 7px;
				background: linear-gradient(to left, #4eb777, #00e1b4);
				color: #fff;
			}
		}
	}
</style>