<template>
	<view class="px-12">
		<view class="time" @click="timeShow=true">
			{{time/1000 | dateFormat('y-m') }}
			<image src="../../static/chevron-down@2x.png" mode=""></image>
		</view>
		<view class="list">
			<view class="item p-28" v-for="(item,i) in list" :key="i">
				<view class="flex-between">
					<view class="gray-0 size-30">完成订单</view>
					<view class="primary size-28">共计一单</view>
				</view>
				<view class="size-28 mt-30">订单号：{{item.ordernum}}</view>
			</view>
		</view>
		<view class="no-more" v-if="list.length==0">暂无数据</view>
		<view class="no-more" v-else>已加载完成</view>
		<u-datetime-picker :show="timeShow" v-model="time" mode="year-month" :closeOnClickOverlay="true"
			@close="timeShow = false" @cancel="timeShow = false" @confirm="timeShow = false"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: Number(new Date()),
				timeShow: false,
				list: [],
				page:1,
			};
		},
		watch:{
			time(){
				this.list = []
				this.page = 1
				this.getList()
			}
		},
	
		onReachBottom() {
			this.page++
			this.getList()
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$api.statistics({
					openid:uni.getStorageSync('openid'),
					time:this.time
				}).then(res => {
					this.list.push(...res.data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.time {
		padding: 30upx 10upx;
		display: flex;
		align-items: center;

		image {
			width: 48upx;
			height: 48upx;
		}
	}

	.list {
		.item {
			border-radius: 12upx;
			background: #fff;
			border-bottom: 10upx;
		}
	}
</style>
