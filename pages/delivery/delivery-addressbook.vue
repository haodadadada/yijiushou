<template>
	<view class="container" v-if="!isLoading">
		<view class="empty" v-if="list.length==0">
			 
		</view>
		<view class="card">
			<view class="item border-b" v-for="item in list" :key="item.id" >
				<view>
					<view class="flex-between">
						<view class="size-30">{{item.name}}<text class="ml-30 gray-2">{{item.phone}}</text></view>
					</view>
					<view class="address mb-15">
						<view class="size-30 gray-9">{{item.address}} {{item.detailAddress}}</view>
					</view>
				</view>
				<view class="flex-end mt-15">
					<view class="size-30 mr-30" style="color: gray;" @click.stop="editAddress(item.id)">编辑</view>
					<view class="size-30" style="color: gray;" @click.stop="delAddress(item.id)">删除</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="addAddress">
			<image src="../../static/address_btn_add_new@2x.png" mode="aspectFill"></image>
			添加地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				isLoading: false,
			};
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			this.getUserAddress()
		},
		onPullDownRefresh() {
			this.list = []
			this.getList()
		},
		methods: {
			// 获取地址列表
			getList() {
				
			},
			// 删除地址
			delAddress(id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除地址吗？',
					confirmColor: '#34cd99',
					success: (res) => {
						if (res.confirm) {
				
						}
					}
				})
			},
			editAddress(id) {
				uni.navigateTo({
					url: '/pages/delivery/delivery-edit'
				})
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/delivery/delivery-edit'
				})
			},
			async getUserAddress() {
				let result = await this.$api.getUserAddress({
					userId: uni.getStorageSync('openid')
				});
				if(result.code !== 200) {
					this.$tools.toast('获取地址失败');
					return;
				}
				else {
					this.list = result.data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 16upx 16upx 5vh;
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
		background-color: #34cd99;
		line-height: 0;
		padding: 10px 0;
	}
	.empty{
		image{
			width: 750upx;
		}
	}
</style>
