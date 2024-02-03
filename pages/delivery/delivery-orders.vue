<template>
	<view>
		<u-modal :show="showModal" :title="title"  showCancelButton=true @confirm="orderCancel" @cancel="orderKeep" confirmColor='#34cd99'>
			<span>确定要取消订单吗?</span>
		</u-modal>
		<view class="tab">
			<view class="item" :class="{cur:index==orderStatus}" 
			v-for="(item,index) in tabs" :key="item.id"
			@click="selectTab(item.id)">
				{{item.name}}
			</view>
		</view>
		
		<view class="card-list">
			<view class="card-item" v-for="item in list" :key="item.id" v-if="orderStatus === 0 || item.orderStatus === orderStatus">
				<view class="card-status">{{getOrderStatus(item.orderStatus)}}</view>
				<view class="card-content">
					<view class="card-left"></view>
					<view class="card-right">
						<view class="card-info">回收品类: 四季衣物</view>
						<view class="card-info">预估重量: 10KG</view>
						<view class="card-info">预约时间: 2023</view>
						<view class="card-info">回收地址: 湖州</view>
						<view class="card-info">联系方式: 123456</view>
					</view>
				</view>
				<view class="card-bottom" v-if="item.orderStatus === 1">
					<view class="bottom-item">订单详情</view>
					<view class="bottom-item">修改信息</view>
					<view class="bottom-item">取消订单</view>
				</view>
				<view class="card-bottom" v-if="item.orderStatus === 2">
					<view class="bottom-item">订单详情</view>
					<view class="bottom-item">查看物流</view>
					<view class="bottom-item">评价</view>
				</view>
			</view>
		</view>
		
		<view class="empty" v-if="list.length==0 && !isLoading">
			<image src="../../static/empty.png" mode="aspectFill"></image>
			<view>暂无相关订单～～</view>
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
				show:false,
				tabs: [
					{
						id: 0,
						name: '全部'
					},
					{
						id: 1,
						name: '待回收'
					},
					{
						id: 2,
						name: '已完成'
					},
					{
						id: 3,
						name: '已取消'
						
					}
				],
				orderStatus: 1,
				list: [],
				isLoading: false,
				showModal:false,
				cancelId: ''
			};
		},
		onShareAppMessage() {},
		onShareTimeline() {},
		onLoad(e) {
			if(!uni.getStorageSync('openid')){
				uni.switchTab({
					url:'../user/user'
				})
				return
			}
			if(e.status) {
				console.log(e.status)
				this.orderStatus = Number(e.status);
			}
			this.getOrders();
		},
		onShow() {
			this.list = []
			this.getList()
		},
		onPullDownRefresh() {
			this.list = []
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods:{
			closePopup(){
				this.show = false
			},
			selectTab(id){
				this.orderStatus = id
				console.log(id)
				this.list = []
				this.getList()
			},
			getList(){
				this.list = [
					{
						id: '111',
						orderStatus: 1,
						reserveTime: new Date(),
						userCommunity: '理塘'
					},
					{
						id: '222',
						orderStatus: 2,
						reserveTime: new Date(),
						userCommunity: '上海'
					}
				]
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
			},
			getOrderStatus(status) {
				if(status === 1) {
					return '待回收';
				}
				else if(status === 2) {
					return '已完成';
				}
				else if(status === 3) {
					return '已取消';
				}
			},
			async getOrders() {
				let result = await this.$api.getOrders({
					userId: uni.getStorageSync('openid')
				})
				console.log(result);
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 100;
		line-height: 88upx;
		display: flex;
		justify-content: space-between;

		.item {
			flex: 1;
			text-align: center;
			font-size: 30upx;
			color: #979797;
		}

		.cur {
			color: rgba(26, 195, 136, 1);
		}
	}
	
	.card-list {
		margin: 10px;
		padding: 88upx 0 0;
		.card-item {
			padding: 20px 10px 10px;
			border-radius: 10px;
			background-color: #fff;
			margin-bottom: 15px;
			.card-status {
				color: rgba(26, 195, 136, 1);
				text-align: right;
				font-size: 14px;
			}
			.card-content {
				display: flex;
				margin-bottom: 30px;
				.card-left {
					width: 70px;
					height: 70px;
					border-radius: 10px;
					background-color: #ddd;
					margin-right: 20px;
				}
				.card-right {
					.card-info {
						font-size: 12px;
						margin-bottom: 10px;
						color: rgba(166, 166, 166, 1);
					}
				}
			}
			.card-bottom {
				display: flex;
				justify-content: flex-end;
				.bottom-item {
					padding: 5px 8px;
					width: 70px;
					height: 30px;
					border-radius: 16px;
					background: rgba(255, 255, 255, 1);
					border: 1px solid rgba(166, 166, 166, 1);
					color:  rgba(166, 166, 166, 1);
					font-size: 12px;
					margin-right: 5px;
					text-align: center;
					box-sizing: border-box;
				}
			}
		}
	}

</style>
