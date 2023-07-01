<template>
	<view>
		<view class="header"><image src="https://youjin.phpcaff.cn/uploads/20220505/1b8f1eb7fd9230685ad1147878cb23ca.png" mode=""></image></view>
		<view class="title-1">会员专属</view>
		<view class="section">
			<view class="vips">
				<view class="item" :class="{ cur: item.id == curVip }" v-for="(item, index) in vips" :key="index" @click="selectVip(item)">
					<view class="text-1">{{ item.card_name }}</view>
					<view class="text-2 flex">
						<span>￥</span>
						{{ item.now_price }}
					</view>
					<view class="text-3">¥{{ item.old_price }}</view>
					<view class="text-4">立即领取</view>
				</view>
			</view>
			<view class="btn" @click="payVip">立即开通</view>
		</view>
		<view class="section-1">
			<view class="title-2">会员专属</view>
			<view class="list">
				<view class="item">
					<image src="../../static/vip-1.png" mode=""></image>
					<view class="text-1">免费培训</view>
				</view>
				<view class="item">
					<image src="../../static/vip-2.png" mode=""></image>
					<view class="text-1">在线接单</view>
				</view>
				<view class="item">
					<image src="../../static/vip-3.png" mode=""></image>
					<view class="text-1">站点查询</view>
				</view>
				<view class="item">
					<image src="../../static/vip-4.png" mode=""></image>
					<view class="text-1">价格查看</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bgColor: 'transparent',
			vips: [],
			curVip: '',
			money: ''
		};
	},
	onLoad() {
		this.getVipList();
	},
	methods: {
		getVipList() {
			this.$api.getVip().then(res => {
				console.log(res);
				this.vips = res.data;
				this.curVip = res.data[0].id;
				this.money = res.data[0].now_price;
			});
		},
		selectVip(e) {
			this.curVip = e.id;
			this.money = e.now_price;
		},
		payVip() {
			this.$api
				.payVip({
					openid: uni.getStorageSync('openid'),
					card_id: this.curVip
				})
				.then(res => {
					console.log(res);
					if (res.code == 1) {
						let order = res.data;
						console.log(order.timeStamp);
						console.log(order.nonceStr);
						console.log(order.package);
						console.log(order.signType);
						console.log(order.paySign);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: order.timeStamp.toString(),
							nonceStr: order.nonceStr,
							package: order.package,
							signType: order.signType,
							paySign: order.paySign,
							success: payInfo => {
								console.log(payInfo);
								this.$tools.toast('会员开通成功');
							},
							fail: err => {
								console.log(err);
							}
						});
					} else {
						this.$tools.toast(res.msg);
					}
				});
		}
	}
};
</script>

<style lang="scss">
/deep/ .u-navbar__content__title {
	color: #fff !important;
}

.header {
	text-align: center;
	margin-top: 30upx;
	image {
		width: 690upx;
		height: 192upx;
	}
}
.title-1 {
	font-size: 40upx;
	font-weight: 600;
	color: $color-primary;
	text-align: center;
	padding: 50upx 0 40upx;
}
.section {
	padding: 0 10upx 0;
	border-radius: 0px 0px 24upx 24upx;
	background: #fff;
}

.vips {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;

	.item {
		width: 210upx;
		height: 280upx;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 26upx;
		background: url(../../static/vip-card.png);
		background-size: cover;
		transition: 300ms;
		.text-1 {
			font-size: 24upx;
			font-weight: 400;
			color: #333333;
			margin-top: 30upx;
		}

		.text-2 {
			font-size: 42upx;
			font-weight: bold;
			color: $color-primary;
			margin-top: 10upx;

			span {
				font-size: 32upx;
				font-weight: 400;
				color: $color-primary;
			}
		}

		.text-3 {
			font-size: 28upx;
			font-weight: 400;
			color: #979797;
			margin-top: 12upx;
			text-decoration: line-through;
		}
		.text-4 {
			font-size: 24upx;
			color: #31683d;
			padding-top: 40upx;
		}
	}
	.cur {
		margin-top: -20upx;
	}
}

.btn {
	width: 604upx;
	line-height: 140upx;
	border-radius: 88upx;
	margin: 100upx auto 0;
	background: #0b8f3a;
	font-size: 40upx;
	font-weight: 600;
}
.title-2 {
	font-size: 40upx;
	font-weight: 600;
	color: #815d3e;
	text-align: center;
	padding: 50upx 0 40upx;
}
.section-1 {
	background: linear-gradient(205deg, #fefefe 0%, #f7ebdf 100%);
	border-radius: 16upx;
	margin: 70upx 30upx 30upx;
}
.list {
	border-radius: 16px;
	border-radius: 24upx;
	padding: 0 30upx 50upx;
	display: flex;
	justify-content: space-between;
	text-align: center;
	image {
		width: 58upx;
		height: 58upx;
	}
	.text-1 {
		font-size: 26upx;
		color: #333333;
		margin-top: 20upx;
	}
}
</style>
