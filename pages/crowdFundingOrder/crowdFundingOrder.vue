<template>
	<view class="container">
		<header class="navigation">
			<span v-for="(item, index) of navContent" @click="changeNavCurrent(index)" :class="{active: navCurrent === index}">{{item}}</span>
		</header>
		<view class="content">
			<view class="item" v-for="item of newOrder" :key="item.id">
				<view class="top">
					<span>订单编号: {{item.id}}</span>
					<span>{{item.status === 0 ? '众筹中' : item.status === 1 ? '未成团' : '已成团'}}</span>
				</view>
				<view class="middle">
					<view class="img">
						<img :src="item.pinProductImg" alt="" style="width: 100%; height: 100%;" />
					</view>
					<view class="info">
						<span>{{item.pinProductName}}</span>
						<!-- <span>参与成员</span> -->
						<span>{{item.description}}</span>
					</view>
					<view class="count">
						<span style="margin-bottom: 5px;">{{item.donatePoints}}积分</span>
						<img :src="item.status === 0 ? '' : item.status === 1 ? '/static/crowdfunding/fail.png' : '/static/crowdfunding/success.png'" alt="" />
					</view>
				</view>
				<view class="bottom">
					<span @click="goCrowdFundingOrderDetail(item)">订单详情</span>
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
				navContent: ['全部', '众筹中', '未成团', '已完成'],
				userOrder: [],
				newOrder: [],
			}
		},
		methods: {
			goCrowdFundingOrderDetail(item) {
				let itemJson = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/crowdFundingOrderDetail/crowdFundingOrderDetail?item=${itemJson}`
				})
			},
			async getUserOrder() {
				let result = await this.$api.getPointPinOrder({
					userId: uni.getStorageSync('openid')
				})
				console.log(result);
				if(result.code === 200) {
					this.userOrder = result.data.reverse();
					this.filterOrder();
				}
				else {
					this.$tools.toast('获取订单失败');
				}
			},
			changeNavCurrent(index) {
				this.navCurrent = index;
				this.filterOrder();
			},
			filterOrder() {
				if(this.navCurrent === 0) {
					this.newOrder = this.userOrder;
				}
				else if(this.navCurrent === 1) {
					this.newOrder = this.userOrder.filter(ele => {
						return ele.status === 0;
					})
				}
				else if(this.navCurrent === 2) {
					this.newOrder = this.userOrder.filter(ele => {
						return ele.status === 1;
					})
				}
				else if(this.navCurrent === 3) {
					this.newOrder = this.userOrder.filter(ele => {
						return ele.status === 2;
					})
				}
				console.log('111', this.newOrder);
			},
			async getOrderUserAvatar(id) {
				let result = await this.$api.getOrderUserAvatar({
					id
				})
				console.log('useimg', result);
				if(result.code === 200) {
					this.enteringUserImg = result.data;
				}
				else {
					this.$tools.toast('获取参与用户头像失败');
				}
			}
		},
		onShow() {
			this.getUserOrder();
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
				margin-bottom: 20px;
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
					background-color: #eee;
					padding: 10px;
					margin-bottom: 15vw;
					.img {
						margin-right: 5px;
						width: 20vw;
						height: 20vw;
						border-radius: 10px;
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
						text-align: center;
						span {
							color: crimson;
						}
						img {
							width: 15vw;
							height: 15vw;
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