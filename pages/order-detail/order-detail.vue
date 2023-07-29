<template>
	<view class="container">
		<view class="header" :class="'header-bg-' + item.orderStatus">

			<block v-if="item.orderStatus == 1">
				<view class="size-32 white" style="margin-bottom: 5px; font-size: 16px;">待回收</view>
				<view class="size-32 white" style="font-size: 10px;">订单待回收</view>
			</block>

			<!-- 			<block v-if="item.status==2">
				<view class="size-32 white">待评价</view>
				<view class="size-28 white mt-24">上门时间：15：54</view>
			</block> -->

			<block v-if="item.orderStatus == 2">
				<view class="size-32 white">已完成</view>
				<view class="size-26 white">订单已完成,欢迎下次预约</view>
			</block>
			<block v-if="item.orderStatus == 3">
				<view class="size-32 white">已取消</view>
				<view class="size-26 white">订单已取消,欢迎下次预约</view>
			</block>

		</view>
		<view class="userinfo" v-if="item.status != 0">
			<view class="left">
				<img :src="avatarUrl" alt="">
			</view>
			<view class="right">
				<view class="right-top">
					<view class="right-top-name">{{item.userName}}</view>
					<view class="right-top-phone">{{item.userPhone}}</view>
				</view>
				<view class="right-footer">
					<span class="iconfont">&#xe652;</span>
					<view>{{item.userCommunity}}</view>
				</view>
			</view>
		</view>
<!-- 		<view class="px-26 py-32 mt-14 bg-white border-radius-12">
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
		</view> -->
<!-- 		<view class="px-26 py-32 mt-14 bg-white border-radius-12">
			<view class="size-30 gray-2">
				<text>{{ item.userName }}</text>
				<text class="ml-30">{{ item.userPhone }}</text>
			</view>
			<view class="size-30 gray-2 mt-30 flex">
				<image class="icon-1" src="../../static/location-1.png" mode="aspectFill"></image>
				<text class="size-30 gray-9">{{ item.userAreaName }}</text>
				<text class="size-30 gray-9">{{ item.userAddress }}</text>
			</view>
		</view> -->
		<view class="main-contain">
			<view class="main-header">订单详情</view>
<!-- 			<view class="size-30 gray-2 flex">
				<text class="size-30 gray-9">订单号：</text>
				<text class="size-30 gray-3">{{ item.id }}</text>
			</view> -->
			<view class="main-item">
				<view>回收种类</view>
				<view>{{item.recycleCategory}}</view>
			</view>
			<view class="main-item">
				<view>预约时间</view>
				<view>{{dateInit(item.reserveTime)}}</view>
			</view>
			<view class="main-item">
				<view>预约地址</view>
				<view>{{item.userCommunity + item.userAddress}}</view>
			</view>
			<view class="main-item">
				<view>订单编号</view>
				<view>{{item.id}}</view>
			</view>
			<view class="main-item">
				<view>创建时间</view>
				<view>{{dateInit(item.createTime)}}</view>
			</view>
			<view class="main-item">
				<view>回收员</view>
				<view>{{item.riderName}}</view>
			</view>
			<!-- <view class="main-footer" >
				<span>我的评价:</span>
				<view class="footer-input">
					<view class="footer-bg"></view>
					<view class="footer-evaluate">
						<img src="../../static/new-user2.png" alt="评价">
						<span>我的评价</span>
					</view>
				</view>
			</view> -->
		</view>
<!-- 		<view class="order-cancle" @click="handleCancel(id)" v-if="item.orderStatus == 1">
			取消订单
		</view> -->
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
			createTimeDate:'',
			avatarUrl: 'https://pic4.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c'
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
					console.log(res);
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
				phoneNumber: phone,
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
		},
		// 转换日期格式
		dateInit(date) {
			// 有兼容性问题
			// return new Date(date).toLocaleString('zh-CN', {hour12: false})
			const originalDate = new Date(date);
			const formattedDate = `${originalDate.getFullYear()}/${originalDate.getMonth() + 1}/${originalDate.getDate()} ${this.addLeadingZero(originalDate.getHours())}:${this.addLeadingZero(originalDate.getMinutes())}`;
			return formattedDate;
		},
		// 检查时间是否小于10
		addLeadingZero(value) {
		  return value < 10 ? `0${value}` : value;
		}
	}
};
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* Project id 4143017 */
  src: url('//at.alicdn.com/t/c/font_4143017_ulbzv7r9ka.woff2?t=1690008329887') format('woff2'),
	   url('//at.alicdn.com/t/c/font_4143017_ulbzv7r9ka.woff?t=1690008329887') format('woff'),
	   url('//at.alicdn.com/t/c/font_4143017_ulbzv7r9ka.ttf?t=1690008329887') format('truetype');
}
.header-bg-1, .header-bg-2 {
	background: linear-gradient(to right, #4eb777, #04e0b3)
}
.header-bg-3 {
	background: linear-gradient(to right, #8a8a8a, #b4b4b5)
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 26upx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
	padding: 22upx 14upx 100upx;
	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 50px;
		padding: 20px;
		border-radius: 10px;
	}
	.userinfo {
		display: flex;
		align-items: center;
		padding: 20px;
		margin: 20px 0;
		border-radius: 10px;
		background-color: #fff;
		.left {
			img {
				border-radius: 20px;
				width: 40px;
				height: 40px;
			}
		}
		.right {
			display: flex;
			flex-direction: column;
			margin-left: 20px;
			.right-top {
				display: flex;
				.right-top-name {
					margin-right: 5px;
					vertical-align: middle; 
					font-size: 16px; 
					line-height: 21px;
				}
				.right-top-phone {
					font-size: 14px;
					vertical-align: middle; 
					line-height: 23px;
				}  
			}
			.right-footer {
				display: flex;
				align-items: center;
				font-size: 12px;
			}
		}
	}
	.main-contain {
		padding: 20px;
		border-radius: 10px;
		background-color: #fff;
		.main-header {
			padding-bottom: 15px;
			border-bottom: 1px #ccc dashed;
		}
		.main-item {
			display: flex;
			justify-content: space-between;
			margin: 10px 0;
			font-size: 14px;
			view {
				color: #bbb;
			}
		}
		.main-footer {
			margin-top: 20px;
			span {
				font-size: 14px;
			}
			.footer-input {
				display: flex;
				.footer-bg {
					flex: 1;
					border-radius: 5px;
					margin-right: 15px;
					height: 30px;
					background-color: #d1f4e8;
					margin-top: 5px;
					padding: 5px;
				}
				.footer-evaluate {
					display: flex;
					flex-direction: column;
					img {
						margin: 0 auto;
						width: 30px; 
						height: 30px;
					}
					span {
						height: 10px;
						font-size: 10px;
					}
				}
			}
		}
	}
	.order-cancle {
		display: inline-block;
		margin-top: 10px;
		padding: 10px;
		background-color: #ccc;
		border-radius: 5px;
	}

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
