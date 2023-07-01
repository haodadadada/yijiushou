<template>
	<view class="container">
		<view class="p-36 border-radius-12" :class="'status-bg-' + item.orderStatus">

			<block v-if="item.orderStatus == 1"><view class="size-32 white">等待骑手上门收货</view></block>

			<!-- 			<block v-if="item.status==2">
				<view class="size-32 white">待评价</view>
				<view class="size-28 white mt-24">上门时间：15：54</view>
			</block> -->

			<block v-if="item.orderStatus == 2"><view class="size-32 white">已完成</view></block>
			<block v-if="item.orderStatus == 3">
				<view class="size-32 white">已取消</view>
			</block>

		</view>
		<view class="px-26 py-32 mt-14 bg-white border-radius-12" v-if="item.status != 0 && item.status != 3">
			<view class="size-30 text-bold">骑手</view>
			<view class="flex mt-20">
				<view class="ml-18 size-32">{{ item.riderName }}</view>
			</view>
		</view>
		<view class="px-26 py-32 mt-14 bg-white border-radius-12">
			<view class="size-28 mt-30 flex-between">
				<view>预估重量：</view>
				<view>{{ item.estimateWeight }}kg</view>
			</view>
		</view>
		<view class="px-26 py-46 mt-14 bg-white border-radius-12">
			<view class="size-28 mt-30 flex-between">
				<view>总金额：</view>
				<view v-if="item.orderStatus==2">{{ item.price }}元</view>
			</view>
		</view>
		<view class="px-26 py-32 mt-14 bg-white border-radius-12">
			<view class="size-30 gray-2">
				<text>{{ item.userName }}</text>
				<text class="ml-30">{{ item.userPhone }}</text>
			</view>
			<view class="size-30 gray-2 mt-30 flex">
				<image class="icon-1" src="../../static/location-1.png" mode="aspectFill"></image>
				<text class="size-30 gray-9">{{ item.userAreaName }}</text>
				<text class="size-30 gray-9">{{ item.userAddress }}</text>
			</view>
		</view>
		<view class="px-26 py-46 mt-14 bg-white border-radius-12">
			<view class="size-30 gray-2 flex">
				<text class="size-30 gray-9">订单号：</text>
				<text class="size-30 gray-3">{{ item.id }}</text>
			</view>
			<view class="size-30 gray-2 mt-40 flex">
				<text class="size-30 gray-9">下单时间：</text>
				<text class="size-30 gray-3">{{ createTimeDate }}</text>
			</view>
			<view class="size-30 gray-2 mt-40 flex" v-if="item.del_time">
				<text class="size-30 gray-9">取消时间：</text>
				<text class="size-30 gray-3">{{ item.del_time | dateFormat }}</text>
			</view>
		</view>
		<view class="flex-between fixed-btn">
			<!-- <view class="flex-end" v-if="item.orderStatus == 1"><view class="btn cancel-btn mt-28" @click="cancelPopupShow = true">取消订单</view></view> -->
			<view class="flex-end" v-if="item.orderStatus == 1"><view @click="makePhone(item.riderPhone)" class="btn chat-btn mt-28">联系骑手</view></view>
		</view>
		<!-- 取消订单 弹窗 -->
		<u-popup :show="cancelPopupShow" mode="bottom" @close="cancelPopupShow = false">
			<view class="popup">
				<view class="header">取消订单</view>
				<view class="body mt-36">
					<view class="flex">
						<text class="size-33 gray-2">取消原因：</text>
						<u-input v-model="cancelContent" type="text"></u-input>
					</view>
					<view class="list">
						<view class="item" v-for="(_item, i) in item.delreason" :key="i" @click="cancelContent = _item">{{ _item }}</view>
					</view>
				</view>
				<view class="footer">
					<view class="btn-1" @click="handleCancel(item.id)">确认</view>
					<view class="btn-2" @click="cancelPopupShow = false">取消</view>
				</view>
			</view>
		</u-popup>

		<u-popup :show="successShow" bgColor="transparent" mode="center" @close="successShow = false">
			<u-icon @click="successShow = false" class="flex-end mb-10" color="#fff" size="30" name="close-circle"></u-icon>
			<view class="success-popup">
				<view class="text">
					<view class="text-1">订单已完成</view>
					<image src="../../static/popup_heart@2x.png" mode=""></image>
					<navigator open-type="switchTab" url="../index/index" class="btn" @click="successShow = false"><view>确认</view></navigator>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			item: {},
			cancelPopupShow: false,
			cancelContent: '',
			successShow: false,
			value: '',
			createTimeDate:''
		};
	},
	onLoad(e) {
		this.getOrderDetail(e.id);
		this.id = e.id;
	},
	methods: {
		getOrderDetail(id) {
			this.$api
				.userOrderDetail({
					id
				})
				.then(res => {
					console.log(res);
					this.item = res.data;
					const date = new Date(this.item.createTime);
					this.createTimeDate = date.toLocaleString();
				});
		},
		// 取消订单
		handleCancel(id) {
			this.cancelPopupShow = false;
			this.$api
				.delOrder({
					orderid: this.id,
					content: this.cancelContent,
					openid: uni.getStorageSync('openid')
				})
				.then(res => {
					console.log();
					if (res.code == 200) {
						this.$tools.toast('取消订单成功');
						setTimeout(() => {
							uni.switchTab({
								url: '../order/order'
							});
						}, 1000);
					} else {
						this.$tools.toast('取消订单失败,请稍后重试');
					}
				});
		},
		makePhone(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			});
		},
		feedback(id) {
			uni.navigateTo({
				url: '../feedback/feedback?source=order&id=' + id
			});
		},
		confirmOrder(id) {
			uni.showModal({
				title: '提示',
				content: '确认完成',
				success: res1 => {
					if (res1.confirm) {
						this.$api
							.orderk({
								oid: id,
								openid: uni.getStorageSync('openid')
							})
							.then(res => {
								if (res.code == 1) {
									if (res.data.is_love) {
										this.value = res.data.love_num;
										this.successShow = true;
									} else {
										this.$tools.toast(res.msg);
										setTimeout(() => {
											uni.switchTab({
												url: '../order/order'
											});
										});
									}
								} else {
									this.$tools.toast(res.msg);
								}
							});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	padding: 22upx 14upx 100upx;

	.icon {
		width: 100upx;
		height: 100upx;
	}

	.badge {
		font-size: 24upx;
		font-weight: 400;
		color: #0f7b32;
		line-height: 44upx;
		background: #ebfff1;
		border-radius: 22upx;
		padding: 0 20upx;
	}

	.icon-1 {
		min-width: 30upx;
		width: 30upx;
		height: 36upx;
		margin-right: 20upx;
	}

	.avatar {
		width: 68upx;
		height: 68upx;
		border-radius: 100%;
	}
}
.fixed-btn {
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	height: 98upx;
	background: #ffffff;
	@include flex;
	justify-content: flex-end;
}
.btn {
	width: 200upx;
	border-radius: 34upx;
	line-height: 68upx;
	box-shadow: none;
	margin-right: 30upx;
}

.cancel-btn {
	background: #fff;
	border: 1px solid #aaaaaa;
	color: #aaaaaa;
}

.chat-btn {
	background: #0b8f3a;

	color: #ffffff;
}

.popup {
	padding: 0 30upx;

	.header {
		padding: 32upx;
		font-size: 30upx;
		font-weight: 500;
		color: #222222;
		border-bottom: 1upx solid #efefef;
	}

	.body {
		.u-input {
			background: #f5f5f5;
			border: 0;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30upx;

			.item {
				padding: 0 40upx;
				font-size: 28upx;
				color: #606060;
				line-height: 66upx;
				background: #ffffff;
				border-radius: 66upx;
				border: 1upx solid #e2e2e2;
				margin-bottom: 30upx;
				margin-right: 20upx;
			}
		}
	}

	.footer {
		text-align: center;
		display: flex;
		justify-content: flex-end;
		padding-bottom: 28upx;

		.btn-1 {
			font-size: 30upx;
			color: #ffffff;
			line-height: 74upx;
			width: 198upx;
			background: #0b8f3a;
			border-radius: 12upx;
		}

		.btn-2 {
			font-size: 30upx;
			color: #222222;
			line-height: 74upx;
			width: 198upx;
			background: #dadada;
			border-radius: 12upx;
			margin-left: 38upx;
		}
	}
}

.success-popup {
	width: 604upx;
	height: 558upx;
	position: relative;

	image {
		width: 562upx;
		height: 450upx;
	}

	.text {
		text-align: center;

		&-1 {
			font-size: 30upx;
			font-weight: 400;
			color: #fff;
		}

		.btn {
			text-align: center;
			width: 316upx;
			height: 88upx;
			background: #ffcfbb;
			border-radius: 88upx;
			border: 2upx solid #ffcfbb;
			padding: 6upx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 60upx auto 0;

			view {
				color: #fff;
				background: #e2581c;
				width: 100%;
				height: 100%;
				border-radius: 88upx;
				line-height: 88upx;
			}
		}
	}
}
</style>
