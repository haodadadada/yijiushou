<template>
	<view class="container">
		<header class="navigation">
			<span v-for="(item, index) of navContent" @click="navCurrent = index" :class="{active: navCurrent === index}">{{item}}</span>
		</header>
		<view class="content">
			<view class="item">
				<view class="top">
					<span>订单编号: 1234567890</span>
					<span>待发货</span>
				</view>
				<view class="middle">
					<view class="img"></view>
					<view class="info">
						<span>校园流浪猫救助</span>
						<span>参与成员</span>
						<span>xxxxxxxxxxxxxxxxxxx</span>
					</view>
					<view class="count">
						<span>400积分</span>
						<img src="" alt="" />
					</view>
				</view>
				<view class="bottom">
					<span @click="goCrowdFundingOrderDetail">订单详情</span>
					<span>联系平台</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navCurrent: 0,
				navContent: ['全部', '众筹中', '未成团', '待收货', '已完成']
			}
		},
		methods: {
			goCrowdFundingOrderDetail() {
				uni.navigateTo({
					url: '/pages/crowdFundingOrderDetail/crowdFundingOrderDetail'
				})
			}
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 15px 0;
		.navigation {
			display: flex;
			justify-content: space-around;
			padding: 0 10px;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			color: #666;
			span {
				padding: 10px 0;
			}
			.active {
				color: #34cd99;
				border-bottom: #34cd99 solid 1px;
			}
		}
		.content {
			margin-top: 10px;
			.item {
				background-color: #fff;
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px;
					span:first-child {
						font-size: 14px;
						color: #222;
					}
					span:last-child {
						font-size: 16px;
						color: crimson;
					}
				}
				.middle {
					display: flex;
					justify-content: space-between;
					background-color: #ccc;
					padding: 10px;
					margin-bottom: 15vw;
					.img {
						margin-right: 5px;
						width: 20vw;
						height: 20vw;
						border-radius: 10px;
						background-color: pink;
					}
					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						width: 50vw;
						span:nth-child(1) {
							font-size: 16px;
						}
						span:nth-child(2) {
							font-size: 12px;
						}
						span:nth-child(3) {
							font-size: 12px;
						}
					}
					.count {
						display: flex;
						flex-direction: column;
						span {
							color: crimson;
						}
						img {
							width: 15vw;
							height: 15vw;
							background-color: pink;
						}
					}
				}
				.bottom {
					display: flex;
					justify-content: flex-end;
					padding: 0 10px;
					border-top: 1px solid #ccc;
					span {
						padding: 10px;
						margin: 10px 0;
					}
					span:nth-child(1) {
						margin-right: 10px;
						border-radius: 5px;
						border: 1px solid #ccc
					}
					span:nth-child(2) {
						border-radius: 5px;
						background-color: orangered;
						color: #fff;
					}
				}
			}
		}
	}
</style>