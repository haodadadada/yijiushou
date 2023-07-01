<template>
	<view class="container">
		<view class="empty" v-if="list.length==0">
			<image src="../../static/no-address.png" mode="widthFix"></image>
			<view>添加地址，预约你的回收天使～</view>
		</view>
		<view class="card">
			<view class="item" v-for="item in list" :key="item.id" @click="editAddress(item.id)">
				<view class="flex-between">
					<view class="size-30">{{item.userName}}<text class="ml-30 gray-2">{{item.userPhone}}</text></view>
					<image class="icon" src="../../static/edit@2x.png" mode=""></image>
				</view>
				<view class="address mt-30 pb-38 border-b">
					<image class="icon mr-8" src="../../static/map-pin@2x.png" mode=""></image>
					<view class="size-30 gray-9">{{item.areaName}}{{item.address}}</view>
				</view>
				<view class="flex-between mt-32">
					<view class="error size-30" @click.stop="delAddress(item.id)">删除</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="addAddress">
			<image src="../../static/address_btn_add_new@2x.png" mode=""></image>
			添加地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1
			};
		},
		onLoad() {
			this.getList()
		},
		// onReachBottom() {
		// 	this.page++
		// 	this.getList()
		// },
		onPullDownRefresh() {
			// this.page=1
			this.list = []
			this.getList()
		},
		methods: {
			// 获取地址列表
			getList() {
				this.$api.userAddress({
					userId: uni.getStorageSync('openid'),
					// page:this.page
				}).then(res => {
					this.list.push(...res.data)
					console.log(res)
				})
			},
			// 删除地址
			delAddress(id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除地址吗？',
					success: (res) => {
						if (res.confirm) {
							this.$api.delAddress({
								id: id
							}).then(res => {
								console.log(res)
								if (res.code == 200) {
									this.page = 1
									this.list = []
									this.getList()
								}
							})
						}
					}
				})
			},
			editAddress(id) {
				uni.navigateTo({
					url: '../addAddress/addAddress?id=' + id
				})
			},
			addAddress() {
				uni.navigateTo({
					url: '../addAddress/addAddress'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 16upx;
	}

	.card {
		.item {
			background: #fff;
			padding: 28upx;
			margin-bottom: 16upx;
			border-radius: 12upx;

			.address {
				display: flex;

				.icon {
					margin-top: 4upx;
				}
			}

			.icon {
				min-width: 32upx;
				width: 32upx;
				height: 32upx;
			}

			.radio {
				transform: scale(.9);
			}
		}
	}

	.btn {
		margin-top: 28upx;
	}
	.empty{
		image{
			width: 750upx;
		}
	}
</style>
