<template>
	<view class="container">
		<header>
			<view style="font-weight: 530; font-size: 20px; margin-bottom: 10px;">{{itemDetail.status === 0 ? '众筹中' : itemDetail.status === 1 ? '未成团' : '已成团'}}</view>
		</header>
		<view class="content">
			<view class="top">
				<view class="img">
					<img :src="itemDetail.pinProductImg" alt="" style="width: 100%; height: 100%;" />
				</view>
				<view class="info">
					<view style="margin-bottom: 10px; font-size: 18px;">{{itemDetail.pinProductName}}</view>
					<view>{{itemDetail.description}}</view>
				</view>
			</view>
			<view class="item">
				<span>众筹积分</span>
				<span>{{itemDetail.donatePoints}}分</span>
			</view>
			<view class="item">
				<span>订单编号</span>
				<span>{{itemDetail.id}}</span>
			</view>
			<view class="item">
				<span>结束时间</span>
				<span>{{itemDetail.endTime}}</span>
			</view>
			<view class="item">
				<span>活动快照</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemDetail: {}
			}
		},
		onLoad(e) {
			this.itemDetail = JSON.parse(e.item);
			console.log(this.itemDetail)
		}
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