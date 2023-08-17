<template>
	<view>
		<view class="tab">
			<view class="item" :class="{cur:tabCur==item.id}" 
			v-for="item in tabs" :key="item.id"
			@click="selectTab(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="card-list">
			<!-- <view class="card" v-for="item in list" :key="item.id" @click="goDetail(item.id)"> -->
			<view class="card" v-for="item in list" :key="item.id">
				<view class="header flex-between size-28 white" >
				<!-- :class="'status-bg-' + item.orderStatus" -->
					<view>{{item.recycleCategory}}</view>
					<!-- <view class="white" v-if="item.orderStatus==1">骑手待上门</view> -->
					<view v-if="item.orderStatus==3" class="item-font">已取消</view>
					<view v-if="item.orderStatus==1" class="item-font">待回收</view>
					<!-- <view class="white" v-if="item.status==2">待评价</view> -->
					<view v-if="item.orderStatus==2" class="item-font">已完成</view>
					<!-- <view class="white" v-if="item.orderStatus==3">已取消</view> -->
				</view>
				<view class="main-contain">
					<view class="body px-26" >
						<view class="py-16 item-font">
							预约时间: {{dateInit(item.reserveTime)}}
						</view>
						<view class="py-16 item-font">
							预约地址: {{item.userCommunity}}
						</view>
						<view class="py-16 item-font" >
							物品称重: {{item.estimateWeight || ''}}
						</view>
						<view class="py-16 item-font">
							创建时间: {{dateInit(item.createTime)}}
						</view>
						<view class="py-16 item-font">
							订单号：{{item.id}}
						</view>
					<!--	<view class="user flex mb-36" v-if="item.status!=3">
							<view class="ml-18 size-32 gray-2">{{item.userName}}</view>
						</view> -->
					</view>
					<view class="main-icon">
						<view class="item-icon" @click="delOrder(item.id)">
							<img src="../../static/new-order2.png" alt="">
							<span class="item-font">取消订单</span>
						</view>
						<view class="item-icon">
							<img src="../../static/new-order1.png" alt="" @click="goDetail(item.id)">
							<span class="item-font">详情</span>
						</view>
					</view>
				</view>

				<!-- <view class="footer pb-32 " v-if="item.orderStatus==1">
					<view class="btn" @click.stop="handldeReminder(item.id)">催单</view>
					<view class="btn" @click.stop="handldeChat(item.riderPhone)">联系骑手</view>
				</view> -->
			</view>
			<view class="empty" v-if="list.length==0">
				<image src="../../static/empty.png" mode="aspectFill"></image>
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
				orderStatus: 0,
				list: []
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
			this.$api.orderov({
				openid: uni.getStorageSync('openid')
			}).then(res => {
				if (res.code == 1) {
					if (res.data.status == 1) {
						this.show = true
					}
				}
			})
			if(e.status){
				this.tabCur = e.status
			}else{
				this.tabCur = 1
			}
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
				this.list = []
				this.getList()
			},
			getList(){
				this.$api.userOrder({
					userId:uni.getStorageSync('openid'),
					orderStatus:this.orderStatus
				}).then(res=>{
					// this.list.push(...res.data)
					// 翻转数组按创建时间从上到下排列
					this.list = [...res.data].reverse();
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'../order-detail/order-detail?id=' + id
				})
			},
			// 催单
			handldeReminder(id){
				console.log('催单',id)
			},
			// 联系天使员
			handldeChat(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
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
			// 清除订单
			delOrder(id) {
				// console.log(id)
				// this.$api.delOrder({orderId: id}).then(res => this.list = this.list.filter(item => item.id !== res.data))
				this.$api.delOrder({orderId: id}).then(
				res => {
					this.list = [] 
					this.getList()
				})
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
			color: #fff;
			background: $color-primary;
		}
	}

	.card-list {
		padding: 88upx 14upx 0;

		.card {
			border-radius: 12upx;
			margin-top: 20upx;
			background: #FFFFFF;
			overflow: hidden;
		
			.item-font {
				color: #bbb;
				font-size: 25upx
			}
		
			.header {
				padding: 22upx 26upx;
				border-bottom: 1upx #bbb dashed;
			}

			
			.body{
				font-size: 28upx;
				color: #979797;
				.user{
					image{
						width: 68upx;
						height: 68upx;
						border-radius: 100%;
					}
				}
			}
			.footer{
				display: flex;
				justify-content: flex-end;
				.btn{
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
			
			.main-contain {
				display: flex;
				justify-content: space-between;
				
				.main-icon {
					display: flex;
					flex-direction: column;
					margin-right: 20upx;
					margin-top: 20upx;
					.item-icon {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-top: 20upx;
						text-align: center;
						img {
							margin: 0 auto;
							width: 52upx;
							height: 52upx;
						}
					}
					

				}
			}
			

		}
	}
</style>
