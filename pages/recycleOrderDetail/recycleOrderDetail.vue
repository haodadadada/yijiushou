<template>
	<view class="container">
		<view class="p-36 border-radius-12" :class="'status-bg-' + item.status">

			<!-- 			<block v-if="item.status==0">
				<view class="size-32 white">等待接单</view>
				<view class="size-28 white mt-24">{{item.appointmenttime | dateFormat}}</view>
			</block> -->

			<block v-if="item.status==1">
				<view class="size-32 white">服务中</view>
			</block>

			<block v-if="item.status==6">
				<view class="size-32 white">等待客户确认订单</view>
			</block>

			<!-- 			<block v-if="item.status==2">
				<view class="size-32 white">待评价</view>
				<view class="size-28 white mt-24">上门时间：15：54</view>
			</block> -->

			<block v-if="item.status==3">
				<view class="size-32 white">已完成</view>
			</block>
			<!-- 			<block v-if="item.status==4">
				<view class="size-32 white">已取消</view>
				<view class="size-28 white mt-24">{{item.delcontent}}</view>
			</block> -->

		</view>
		<!-- <view class="px-26 py-32 mt-14 bg-white border-radius-12" v-if="(item.status!=0) && (item.status!=4)">
			<view class="size-30 text-bold">本次服务天使</view>
			<view class="flex">
				<image class="avatar" :src="item.recycler.headimage" mode=""></image>
				<view class="ml-18 size-32">{{item.recycler.nickname}}</view>
			</view>
		</view> -->
		<view class="px-26 py-32 mt-14 bg-white border-radius-12">
			<view class="flex mb-20" v-for="(_item,_i) in item.sort" :key="_i">
				<image class="icon mr-16" :src="_item.sortimage" mode="aspectFill"></image>
				<view>
					<view class="size-28 gray-2">{{_item.sortname}}</view>
				</view>
			</view>
			<view class="size-28 mt-30 flex-between">
				<view>预估重量：</view>
				<view>{{item.weight}}</view>
			</view>
		</view>
		<view class="px-26 py-46 mt-14 bg-white border-radius-12" v-if="item.category.length>0">
			<view class="size-30 gray-2 flex mb-30" v-for="(_item,i) in item.category" :key="i">
				<text class="size-30 gray-9">{{_item.title}}</text>
				<text v-if="_item.unit==0" class="size-30 text-right gray-3 flex-1">重量{{_item.weight}}kg，</text>
				<text v-else class="size-30 text-right gray-3 flex-1">{{_item.weight}}个，</text>
				<text class="size-30 gray-3">金额{{_item.price}}元</text>
			</view>
			<view class="size-28 mt-30 flex-between">
				<view>总金额：</view>
				<view>{{item.total_money}}元</view>
			</view>
		</view>
		<view class="user-info">
			<image class="avatar" :src="item.userinfo.avatar" mode=""></image>
			<view class="flex-1 pl-20">
				<view class="name">{{item.userinfo.nickname}}</view>
				<view class="text mt-6">累计{{item.userinfo.order_num || 0}}单</view>
			</view>
			<image @click="makePhone(item.phone)" class="icon" src="../../static/dianhua.png" mode=""></image>
		</view>
		<view class="px-26 py-32 mt-14 bg-white border-radius-12">
			<view class="size-30 gray-2">
				<text>{{item.name}}</text>
				<text class="ml-30" @click="makePhone(item.phone)">{{item.phone}}</text>
			</view>
			<view class="size-30 gray-2 mt-30 flex pb-60">
				<image class="icon-1" src="../../static/map-pin@2x.png" mode="aspectFill"></image>
				<text class="size-30 gray-9" @click="viewMapLocation(item.latitude,item.longitude,item.address)">{{item.address}}</text>
			</view>
		</view>
		<view class="px-26 py-46 mt-14 bg-white border-radius-12">
			<view class="size-30 gray-2 flex">
				<text class="size-30 gray-9">订单号：</text>
				<text class="size-30 gray-3">{{item.ordernum}}</text>
			</view>
			<view class="size-30 gray-2 mt-40 flex">
				<text class="size-30 gray-9">下单时间：</text>
				<text class="size-30 gray-3">{{item.create_time}}</text>
			</view>
			<!-- <view class="size-30 gray-2 mt-40 flex" v-if="item.del_time">
				<text class="size-30 gray-9">取消时间：</text>
				<text class="size-30 gray-3">{{item.del_time | dateFormat}}</text>
			</view> -->
		</view>
		<!-- 计算 -->
		<calc v-if="item.status==1" :orderId="id"></calc>
		<view class="flex-between">
			<view class="flex-1 flex-center" v-if="item.status==1">
				<view @click="cancelOrder" class="btn cancel-btn mt-28">取消订单</view>
			</view>
			<view class="flex-1 flex-center" v-if="item.status==1">
				<view @click="makePhone(item.phone)" class="btn chat-btn mt-28">联系客户</view>
			</view>
		</view>
	</view>
</template>

<script>
	import calc from '../../components/calc/calc.vue'
	export default {
		data() {
			return {
				id: '',
				item: {},
			};
		},
		components: {
			calc
		},
		onLoad(e) {
			this.getOrderDetail(e.id)
			this.id = e.id
		},
		methods: {
			// 这里传入的三个参数分别是  要去的  经度 纬度 以及 地址信息
			viewMapLocation(latitude1,longitude1, address) {
				// 获取定位信息
				let latitude = Number(latitude1)   
				let longitude = Number(longitude1)
				uni.getLocation({
					type: 'wgs84', //返回可以用于uni.openLocation的经纬度
					// 用户允许获取定位
					success: function(res) {
						console.log(res, '经纬度')
						if (res.errMsg == "getLocation:ok") {
							console.log(latitude)
							console.log(longitude)
							uni.openLocation({
								// 传入你要去的纬度
								latitude: latitude,
								// 传入你要去的经度
								longitude: longitude,
								// 缩放大小
								address,
								scale: 18,
								success: function() {
									console.log('success');
								}
							});
						}
					},
					// 用户拒绝获取定位后 再次点击触发
					fail: function(res) {
						console.log(res)
						if (res.errMsg == "getLocation:fail auth deny") {
							uni.showModal({
								content: '检测到您没打开获取信息功能权限，是否去设置打开？',
								confirmText: "确认",
								cancelText: '取消',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({
											success: (res) => {
												console.log('确定');
											}
										})
									} else {
										console.log('取消');
										return false;
									}
								}
							})
						}
					}
				})
			},
			getOrderDetail(id) {
				this.$api.userOrderDetail({
					openid: uni.getStorageSync('openid'),
					id,
				}).then(res => {
					console.log(res)
					this.item = res.data
				})
			},
			// 取消订单
			cancelOrder() {
				this.$api.cancelOrder({
					order_id: this.id,
				}).then(res => {
					console.log()
					if (res.code == 1) {
						this.$tools.toast('取消订单成功')
						setTimeout(() => {
							uni.switchTab({
								url: '../recycler/recycler'
							})
						}, 1000)
					} else {
						this.$tools.toast('取消订单失败,请稍后重试')
					}
				})
			},
			makePhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			feedback(id) {
				uni.navigateTo({
					url: '../feedback/feedback?source=order&id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 22upx 14upx;

		.icon {
			width: 100upx;
			height: 100upx;
		}

		.badge {
			font-size: 24upx;
			font-weight: 400;
			color: #0F7B32;
			line-height: 44upx;
			background: #EBFFF1;
			border-radius: 22upx;
			padding: 0 20upx;
		}

		.icon-1 {
			min-width: 30upx;
			width: 30upx;
			height: 30upx;
		}

		.avatar {
			width: 68upx;
			height: 68upx;
		}

	}

	.btn {
		width: calc(100% - 20upx);
		line-height: 92upx;
	}

	.cancel-btn {
		background: #FFF5F5;
		border: 1upx solid #FF8E8E;
		color: #EF2626;
	}

	.chat-btn {
		background: #E7FFEE;
		border: 1upx solid #9DEDB7;
		color: #0F7B32;
	}

	.popup {
		padding: 0 30upx;

		.header {
			padding: 32upx;
			font-size: 30upx;
			font-weight: 500;
			color: #222222;
			border-bottom: 1upx solid #EFEFEF;
		}

		.body {
			.u-input {
				background: #F5F5F5;
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
					background: #FFFFFF;
					border-radius: 66upx;
					border: 1upx solid #E2E2E2;
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
				color: #FFFFFF;
				line-height: 74upx;
				width: 198upx;
				background: #3BB061;
				border-radius: 12upx;
			}

			.btn-2 {
				font-size: 30upx;
				color: #222222;
				line-height: 74upx;
				width: 198upx;
				background: #DADADA;
				border-radius: 12upx;
				margin-left: 38upx;
			}
		}
	}
	.user-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx;
		border-radius: 18upx;
		background: #fff;
		margin-top: 14upx;
		.avatar{
			width: 90upx;
			height: 90upx;
			border-radius: 100%;
		}
		.name{
			font-size: 32upx;
			font-weight: 500;
		}
		.text{
			font-size: 24upx;
			color: #999;
		}
		.icon{
			width: 50upx;
			height: 50upx;
		}
	}
</style>
