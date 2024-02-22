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
					<view class="card-left"></view>
					<view class="card-right">
						<view class="card-info">回收品类: 四季衣物</view>
						<view class="card-info">预估重量: {{judgeNull(item.recycleCategory)}}</view>
						<view class="card-info">预约时间: {{judgeNull(initTime(item.reserveTime))}}</view>
						<view class="card-info">回收地址: {{judgeNull(item.userAddress + item.userAddressDetail)}}</view>
						<view class="card-info">联系方式: {{judgeNull(item.phone)}}</view>
					</view>
				</view>
				<view class="card-bottom" v-if="item.orderStatus === 1">
					<view class="bottom-item" @click="handleChangeInfo(item)">修改信息</view>
					<view class="bottom-item" @click="goLogistics">查看物流</view>
					<view class="bottom-item">取消订单</view>
				</view>
				<view class="card-bottom" v-if="item.orderStatus === 2">
					<view class="bottom-item" @click="goLogistics">查看物流</view>
					<view class="bottom-item">评价</view>
				</view>
			</view>
		</view>
		
		<view class="empty" v-if="list.length==0 && !isLoading">
			<image src="../../static/empty.png" mode="aspectFill"></image>
			<view>暂无相关订单～～</view>
		</view>
		
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
		<u-popup :show="showDate" :round="10" mode="bottom" @close="closeDate" @open="openDate">
			<view class="date-order">
				<view class="date-title flex-between">
					<span class="title-left">请选择预约时间</span>
					<span class="title-right">*可左右滑动选择其它时间</span>
				</view>
				<view class="date-scroll">
					<scroll-view :scroll-x="true" style="white-space: nowrap;">
						<view class="date-item flex-col flex-center" v-for="(item, index) in totalDays" :key="index" :class="currentDayIndex === index ? 'item-choosing' : 'item-notchoosing'" @click="currentDayIndex = index">
							<view>{{item[0]}}</view>
							<view>(周{{item[1]}})</view>
						</view>
					</scroll-view>
				</view>
				<view style="line-height: 23px; margin-top: 15px;">请选择预约时间段</view>
				<view class="date-confirm" @click="confirmDate">确定</view>
			</view>
		</u-popup>
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
				orders: [],
				isLoading: false,
				showModal:false,
				cancelId: '',
				
				showDate: false,
				daysDistance: 7,
				currentDifference: 0,
				totalDays: [],
				currentDayIndex: 0,
				
				currentItem: []
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
				console.log(this.list);
			},
			initTime(time) {
				return moment(time).format('lll');
			},
			handleChangeInfo(item) {
				
				this.currentDayIndex = 0;
				this.showDate = true;
				this.currentItem = item;
				let time = moment(item.reserveTime).format('MM-DD dd').split(" ")[0];
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
					userAddressId: this.currentItem.userAddreessId,
					reserveTime: moment().add(this.currentDayIndex, 'days').format()
				})
				console.log(result);
				this.showDate = false;
			},
			goLogistics() {
				uni.navigateTo({
					url: "/pages/delivery/delivery-logistics"
				})
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
	.date-order {
		position: relative;
		height: 60vh;
		padding: 5vh 15px 10px;
		box-sizing: border-box;
		.date-title {
			margin-bottom: 15px;
			.title-left {
				font-size: 16px;
				font-weight: 550;
			}
			.title-right {
				font-size: 12px;
				color: rgba(120, 206, 162, 1);
			}
		}
		.date-scroll {
			.date-item {
				display: inline-block;
				padding: 5px;
				width: 65px;
				line-height: 22.5px;
				margin-right: 15px;
				font-size: 14px;
				text-align: center;
				box-sizing: border-box;
			}
			.item-choosing {
				opacity: 1;
				border-radius: 2px;
				background: rgba(120, 206, 162, 0.5);
				border: 1px solid rgba(120, 206, 162, 1);
				color: #34cd99;
			}
			.item-notchoosing {
				opacity: 1;
				border-radius: 2px;
				background: rgba(229, 229, 229, 1);
	
			}
		}
		.date-confirm {
			position: absolute;
			bottom: 10px;
			left: 50%;
			transform: translateX(-50%);
			width: 70%;
			padding: 10px 0;
			color: #fff;
			text-align: center;
			background: rgba(120, 206, 162, 1);
			border-radius: 10px;
		}
	}

</style>
