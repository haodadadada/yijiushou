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
		
		<view class="card-list" v-if="!isLoading">
			<view class="card-item" v-for="item in list" :key="item.id">
				<view class="card-status">{{getOrderStatus(item.orderStatus)}}</view>
				<view class="card-content">
					<view class="card-left flex-center">
						<img src="/static/delivery/yifu.png" alt="" style="width: 70%;" mode="widthFix" />
					</view>
					<view class="card-right">
						<view class="card-info">回收品类: 四季衣物</view>
						<view class="card-info">预估重量: {{judgeNull(item.recycleCategory)}}</view>
						<view class="card-info">预约时间: {{judgeNull(item.reserveTime)}}</view>
						<view class="card-info">回收地址: {{judgeNull(item.userAddress + item.userAddressDetail)}}</view>
						<view class="card-info">联系方式: {{judgeNull(item.phone)}}</view>
					</view>
				</view>
				<view class="card-bottom" >
					<view class="bottom-item" @click="goLogistics(item)" v-if="item.orderStatus !== 1">查看物流</view>
					<view class="bottom-item" v-if="item.orderStatus === 1" @click="cancelOrder(item)">取消订单</view>
				</view>
			</view>
		</view>
		
		<view class="empty" v-if="list.length==0 && !isLoading">
			<image src="../../static/empty.png" mode="aspectFill"></image>
			<view>暂无相关订单～～</view>
		</view>
		
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
		
		<u-modal :show="isCancel" @confirm="confirmCancel()" @cancel="isCancel = false" showCancelButton=true>
			<view style="font-size: 20px; margin: 0 auto;">你确定取消订单吗?</view>
		</u-modal>
		
	</view>
</template>

<script>
	import orderStatus from '../../components/onTakeOrder/onTakeOrder.vue'
	import moment from 'moment';
	export default {
		components: {
			orderStatus
		},
		data() {
			return {
				indicatorStyle: `height: 50px;`,
				show:false,
				tabs: [
					{
						id: 0,
						name: '全部'
					},
					{
						id: 1,
						name: '待取货'
					},
					{
						id: 2,
						name: '物流中'
					},
					{
						id: 3,
						name: '已取消'
					},
					{
						id: 4,
						name: '已完成'
					},
					{
						id: 5,
						name: '已入库'
					}
				],
				orderStatus: 1,
				list: [],
				orders: [],
				isLoading: false,
				showModal:false,
				cancelId: '',
				
				showDate: false,
				daysDistance: 3,
				currentDifference: 0,
				totalDays: [],
				currentDayIndex: 0,
				
				currentItem: [],
				
				isCancel: false,
				currentId: null
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
				this.orderStatus = Number(e.status);
			}
		},
		onShow() {
			moment.locale('zh-cn');
			let currentDay = new Date();
			this.currentDifference = currentDay.getTime();
			for(let i = 0; i < this.daysDistance; i++) {
				this.totalDays.push(moment(this.currentDifference + 1000 * 60 * 60 * 24 * i).format('MM-DD dd').split(" "));
			}
			this.orders = [];
			this.getOrders();
		},
		onPullDownRefresh() {
			this.orders = []
			this.getOrders();
		},
		onReachBottom() {
			this.getOrders();
		},
		computed: {
			reserveTime() {
				if(this.totalDays.length === 0) return '';
				return this.totalDays[this.currentDayIndex][0] + ',' + this.currentTime;
			}
		},
		methods:{
			closePopup(){
				this.show = false
			},
			selectTab(id){
				this.orderStatus = id;
				this.getList(id);
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
					return '待取货';
				}
				else if(status === 2) {
					return '待收货';
				}
				else if(status === 3) {
					return '已取消';
				}
				else if(status === 4) {
					return '已完成';
				}
				else if(status === 5) {
					return '已入库';
				}
			},
			async getOrders() {
				let result = await this.$api.getOrders({
					userId: uni.getStorageSync('openid')
				})
				if(result.code === 200) {
					this.orders = result.data;
					this.orders = this.orders.reverse();
					this.getList(this.orderStatus)
				}
			},
			getList(id) {
				this.list = [];
				if(id === 0) {
					this.list = this.orders;
					return;
				}
				this.list = this.orders.filter(ele => {
					return ele.orderStatus === id;
				})
			},
			handleChangeInfo(item) {
				this.currentDayIndex = 0;
				this.showDate = true;
				this.currentItem = item;
				let time = item.reserveTime.split(',')[0];
				this.totalDays.some((ele, index) => {
					if(ele[0] === time) {
						this.currentDayIndex = index;
						return true;
					}
				})
			},
			judgeNull(value) {
				if(value === null || value === 'null') {
					return '';
				}
				return value;
			},
			
			closeDate() {
				this.showDate = false;
			},
			openDate() {
				
			},
			handleChooseTime() {
				this.showDate = true;
			},
			async confirmDate() {
				let result = this.$api.updateInfo({
					id: this.currentItem.id,
					reserveTime: this.reserveTime
				})
				this.showDate = false;
			},
			async goLogistics(item) {
				uni.navigateTo({
					url: `/pages/delivery/delivery-logistics?id=${item.id}`
				})
			},
			bindChange(e) {
				const val = e.detail.value;
				this.currentTime = this.hours[val[0]];
			},
			cancelOrder(item) {
				this.currentId = item.id;
				this.isCancel = true;
			},
			async confirmCancel() {
				let result = await this.$api.deliveryCancelOrder({
					orderId: this.currentId
				})
				if(result.code === 200 && result.data) {
					this.$tools.toast('取消成功');
				}
				else if(!result.data){
					this.$tools.toast('快递已接单无法取消');
				}
				this.isCancel = false;
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		position: absolute;
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
