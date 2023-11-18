<template>
	<view class="container">
		<header>
			<view style="font-weight: 530; font-size: 20px;">活动已完成</view>
			<view style="font-size: 12px;">完成时间：2023-11-14 17:56</view>
		</header>
		<view class="content">
			<view class="top">
				<view class="img"></view>
				<view class="info">
					<view style="margin-bottom: 10px; font-size: 14px;">流浪猫救助</view>
					<view>xxxxxxxxx</view>
				</view>
			</view>
			<view class="item">
				<span>众筹积分</span>
				<span>400分</span>
			</view>
			<view class="item">
				<span>订单编号</span>
				<span>1234567890</span>
			</view>
			<view class="item">
				<span>完成时间</span>
				<span>2023-11-14 17:56</span>
			</view>
			<view class="item">
				<span>活动快照</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss">
	.container {
		padding: 30px 15px;
		.content {
			background-color: #fff;
			border-radius: 10px;
			padding: 5px;
			.top {
				display: flex;
				margin-bottom: 20px;
				.img {
					width: 30vw;
					height: 30vw;
					margin-right: 10px;
					background-color: pink;
					border-radius: 10px;
				}
				.info {
					width: 40vw;
				}
			}
			.item {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				padding: 0 10px;
				font-size: 14px;
			}
		}
	}
</style>