<template>
	<view>
		<view class="tab">
			<view class="item" :class="{cur:tabCur==item.id}" v-for="item in tabs" :key="item.id"
				@click="selectTab(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="card-list">
			<view class="card" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
				<view class="header flex-between size-28" :class="'status-bg-' + item.status">
					<view class="white">下单时间：{{item.create_time}}</view>
					<view class="white" v-if="item.status==1 || item.status==6">服务中</view>
					<view class="white" v-if="item.status==3">已完成</view>
				</view>
				<view class="body px-26">
					<view class="pt-36">
						订单号：{{item.ordernum}}
					</view>
				</view>
				<view class="p-20 mt-6">
					<view class="size-32">{{item.address}}</view>
					<view class="size-24 gray-9 mt-2">距你{{item.distance}}米</view>
				</view>
			</view>
			<view class="empty" v-if="list.length == 0">
				<image src="../../static/empty.png" mode=""></image>
				<view>暂无相关订单～～</view>
			</view>
		</view>
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
	</view>
</template>

<script>
	import orderStatus from '../../components/onTakeOrder/onTakeOrder.vue'

	export default {
		components: {
			orderStatus
		},
		data() {
			return {
				show: false,
				tabs: [
					{
						id: 1,
						name: '全部'
					},
					{
						id: 3,
						name: '服务中'
					},
					{
						id: 5,
						name: '已完成'
					},
					
				],
				tabCur: 1,
				list: [],
				page: 1
			};
		},
		onShareAppMessage() {},
		onShareTimeline() {},
		onShow() {
			if (!uni.getStorageSync('openid')) {
				uni.switchTab({
					url: '../user/user'
				})
				return
			}
			this.$api.orderov({
				openid: uni.getStorageSync('openid')
			}).then(res => {
				if (res.code == 1) {
					if (res.data.status == 1) {
						this.show = true
					}
				}
			})
			this.page = 1
			this.tabCur = 1
			this.list = []
			this.getList()
		},
		onPullDownRefresh() {
			this.page = 1
			this.list = []
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
			closePopup() {
				this.show = false
			},
			selectTab(id) {
				this.page = 1
				this.tabCur = id
				this.list = []
				this.getList()
			},
			getList() {
				this.$api.recyleOrder({
					page: this.page,
					openid: uni.getStorageSync('openid'),
					status: this.tabCur
				}).then(res => {
					if (res.code == 1) {
						this.list.push(...res.data)
					}
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../recycleOrderDetail/recycleOrderDetail?id=' + id
				})
			},
			// 催单
			handldeReminder(id) {
				console.log('催单', id)
			},
			// 联系天使员
			handldeChat(id) {
				console.log('联系天使员', id)
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: var(--staus-bar);
		/* #endif */
		right: 0;
		z-index: 100;
		line-height: 88upx;
		display: flex;
		justify-content: space-between;
		background: #fff;

		.item {
			flex: 1;
			text-align: center;
			font-size: 30upx;
			color: #979797;
		}

		.cur {
			font-size: 32upx;
			font-weight: bold;
			color: #333333;
			position: relative;
		}
		.cur:after{
			content: '';
			position: absolute;
			left: 50%;
			margin-left: -18upx;
			bottom: 0;
			width: 36upx;
			height: 8upx;
			border-radius: 8upx;
			background: #02613E;
		}
	}

	.card-list {
		padding: 88upx 14upx 0;

		.card {
			border-radius: 12upx;
			margin-top: 20upx;
			background: #FFFFFF;
			overflow: hidden;

			.header {
				padding: 22upx 26upx;
			}


			.body {
				font-size: 28upx;
				color: #979797;

				.user {
					image {
						width: 68upx;
						height: 68upx;
					}

					.time {
						text-align: right;
						flex: 1;
						font-size: 36upx;
						font-weight: 500;
						color: #E2581C;
						justify-self: flex-end;
					}
				}
			}

			.footer {
				display: flex;
				justify-content: flex-end;

				.btn {
					text-align: center;
					font-size: 28upx;
					color: #606060;
					line-height: 66upx;
					width: 228upx;
					background: #FFFFFF;
					border-radius: 68upx;
					border: 1upx solid #DADADA;
					margin-right: 16px;
				}
			}
		}
	}
</style>
