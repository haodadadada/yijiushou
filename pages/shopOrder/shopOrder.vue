<template>
	<view class="content">
		<view class="item" v-for="item in order" :key="item.id" @click="goShopOrderDetail(item)">
			<view class="top">
				<view style="font-size: 14px;">{{item.productName}}</view>
				<view style="font-size: 14px;"><span style="color: #34cd99; margin-right: 3px;">-{{item.payPoints}}</span>积分</view>
			</view>
			<view class="bottom">
				<view style="font-size: 12px; color: #888;">共1件商品</view>
				<view style="font-size: 12px; color: #888;">{{dateInit(item.createTime)}}</view>
			</view>
		</view>
		<view v-if="order.length == 0 && !isLoading" style=" position: absolute; top: 30vh; text-align: center; width: 100%;">暂无记录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: [],
				isLoading: true
			}
		},

		methods: {
			// async getUserPointsOrder() {
			// 	let result = await this.$api.getUserPointsOrder({
			// 		id: uni.getStorageSync('openid')
			// 	});
			// 	if(result.code === 400)
			// 		this.$tool.toast('暂无订单');
			// 		return;
			// 	if(result.code === 200) 
			// 		console.log(result);
			// }
			getUserPointsOrder() {
				this.isLoading = true;
				this.$api.getUserPointsOrder({
					id: uni.getStorageSync('openid')
				}).then(res => {
					this.order = res.data.reverse();
					this.isLoading = false;
				}).catch(error => {
					console.log(222, error);
				})
			},
			goShopOrderDetail(item) {
				const {address, community, id, payPoints, phone, productName, createTime, productImg, userName} = item;
				const realCreateTime = this.dateInit(createTime)
				uni.navigateTo({
					url: `/pages/shopOrder-detail/shopOrder-detail?address=${address}&community=${community}&id=${id}&payPoints=${payPoints}&phone=${phone}&productName=${productName}&createTime=${realCreateTime}&productImg=${productImg}&userName=${userName}`
				})
			},
			dateInit(date) {
				const originalDate = new Date(date);
				const formattedDate = `${originalDate.getFullYear()}-${originalDate.getMonth() + 1}-${originalDate.getDate()} ${this.addLeadingZero(originalDate.getHours())}:${this.addLeadingZero(originalDate.getMinutes())}`;
				return formattedDate;
			},
			// 检查时间是否小于10
			addLeadingZero(value) {
			  return value < 10 ? `0${value}` : value;
			},
		},
		onShow() {
			this.getUserPointsOrder();
		}
	}
</script>

<style lang="scss">
	.content {
		margin-top: 10px;
		.item {
			width: 90vw;
			margin-left: 5vw;
			box-shadow: 0px 0px 2px #ccc;
			padding: 10px 15px;
			box-sizing: border-box;
			margin-bottom: 7px;
			background-color: #fff;
			border-radius: 10px;
			.top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
			}
			.bottom {
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>