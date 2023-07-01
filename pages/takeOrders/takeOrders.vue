<template>
	<view>
		<view class="card">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="address pb-16 border-b">
					<view class="size-28 ml-14">{{item.address}}</view>
				</view>
				<view class="flex-between mt-16">
					<view class="text-1"> <image src="../../static/location-1.png" mode=""></image> 距你{{item.distance}}</view>
					<view class="btn" @click="openOrderPopup(item)">立即抢单</view>
				</view>
			</view>
			<view class="empty" v-if="list.length==0">
				<image src="../../static/empty.png" mode=""></image>
				<view>暂无相关订单～～</view>
			</view>
		</view>
		<!-- 接单弹窗 -->
		<u-popup :show="orderShow" mode="bottom" @close="orderShow = false">
			<view class="card">
				<view class="item">
					<view class="primary size-30 text-bold border-b pb-34">下单时间：{{detail.create_time}}</view>
					<view class="user flex border-b py-30" v-for="item in detail.category" :key="item.id">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="ml-18">
							<view class="size-32 gray-2">{{item.name}}</view>
						</view>
					</view>
					<view class="mt-16">预估重量：{{detail.weight}}</view>
					<view class="address py-16 border-b">
						<u-icon name="map" size="18" color="#222222"></u-icon>
						<view class="size-28 ml-14">{{detail.address}}</view>
					</view>
					<view class="flex-between mt-16 py-24">
						<view class="text-1">距你{{detail.distance}}</view>
						<view v-if="userInfo.mobile" class="btn" @click="confirmOrder(detail.id)">确认接单</view>
						<button v-else open-type='getPhoneNumber' @getphonenumber="getPhoneNumber($event,detail.id)" hover-class='button-hover' class="btn">确认接单</button>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 抢单成功弹窗 -->
		<u-popup :show="successShow" bgColor="transparent" mode="center" @close="successShow = false">
			<u-icon @click="successShow = false" class="flex-end mb-10" color="#fff" size="30" name="close-circle"></u-icon>
			<view class="success-popup">
				<image src="../../static/popup_order_success@2x.png" mode=""></image>
				<view class="text">
					<view class="text-1">抢单成功</view>
					<view class="btn" @click="successShow = false">
						<view>确认</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderShow:false,
				successShow:false,
				page:1,
				list: [],
				baseUrl:'',
				detail:'',
				userInfo:''
			};
		},
		onPullDownRefresh() {
			this.page=1
			this.list = []
			this.getList()
		},
		onShow() {
			if(!uni.getStorageSync('openid')){
				uni.switchTab({
					url:'../user/user'
				})
				return
			}
			this.userInfo = uni.getStorageSync('userInfo')
		},
		onLoad() {
			this.getLocation()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods:{
			getUserInfo(){
				this.$api.getUserInfo({
					openid:uni.getStorageSync('openid')
				}).then(res=>{
					this.userInfo = res.data
					uni.setStorageSync('userInfo',this.userInfo)
				})
			},
			getPhoneNumber(e,item){
			 console.log(e)
			 uni.login({
			 	provider: 'weixin',
			 	success: loginInfo => {
			 		console.log(loginInfo, 'loginInfo');
			 		this.$api.phoneAuth({
			 			openid:uni.getStorageSync('openid'),
			 			code:loginInfo.code,
			 			iv:e.detail.iv,
			 			encryptedData:e.detail.encryptedData
			 		}).then(res=>{
			 			console.log(res)
			 			if(res.code==1){
							this.getUserInfo()
			 				this.confirmOrder(item)
			 			}else{
			 				uni.showToast({
			 					title:'获取失败，请重试',
			 					icon:'none'
			 				})
			 			}
			 		})
			 	}
			 });
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						const latitude = res.latitude;
						const longitude = res.longitude;
						this.latitude = latitude
						this.longitude = longitude
						this.getList()
					}
				});
			},
			getList(){
				this.$api.hallOrderList({
					openid:uni.getStorageSync('openid'),
					page:this.page,
					longitude:this.longitude,
					latitude:this.latitude,
				}).then(res=>{
					this.list.push(...res.data.data)
				})
			},
			// 打开接单弹窗
			openOrderPopup(item){
				this.detail = item
				this.orderShow = true
			},
			// 确认接单
			confirmOrder(id){     
				this.$api.saveOrder({
					openid:uni.getStorageSync('openid'),
					orderid:id
				}).then(res=>{
					if(res.code==1){
						this.orderShow = false
						this.successShow = true
						this.page = 1
						this.list = []
						this.getList()
					}else{
						this.$tools.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.card {
		.item {
			background: #fff;
			padding: 26upx 26upx 16upx;
			margin-top: 16upx;
			border-radius: 12upx;

			.address {
				display: flex;
				align-items: center;
			}
		}
		.text-1{
			font-size: 24upx;
			font-weight: 400;
			color: #FF7003;
			@include flex;
			image{
				width: 31upx;
				height: 37upx;
				margin-right: 10upx;
			}
		}
		.btn {
			width: 198upx;
			height: 72upx;
			background: #0B8F3A;
			border-radius: 72upx;
			font-size: 30upx;
			font-weight: 600;
			box-shadow: 0 10upx 10px 10upx rgba(0,0,0,.1);
		}
		.user {
			image {
				width: 100upx;
				height: 100upx;
			}
		}
	}
	.success-popup{
		width: 604upx;
		height: 558upx;
		position: relative;
		image{
			width: 604upx;
			height: 558upx;
		}
		.text{
			position: absolute;
			left: 0;
			right: 0;
			top:0;
			text-align: center;
			&-1{
				font-size: 30upx;
				font-weight: 400;
				color: #222222;
				margin-top: 320upx;
			}
			.btn{
				text-align: center;
				width: 316upx;
				height: 88upx;
				background: #E9FFF0;
				border-radius: 88upx;
				border: 2upx solid #9EE3C3;
				padding: 6upx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 60upx auto 0;
				view{
					color: #fff;
					background: #3BB061;
					width: 100%;
					height: 100%;
					border-radius: 88upx;
					line-height: 88upx;
				}
			}
		}
	}
</style>
