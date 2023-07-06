<template>
	<view>
		<view class="p-32 bg-white">
			<view class="flex address mt-20" @click="addressPopupShow = true">
				<image class="icon" src="../../static/location-1.png" mode="aspectFill"></image>
				<view>请选择地址</view>
			</view>
			<view class="user pb-20 border-b">
				<view class="icon" @click="addressPopupShow = true">
					<image src="../../static/cae_list_btn_more@2x.png" mode="aspectFill"></image>
					<view>地址簿</view>
				</view>
				<view>{{ userName }}</view>
				<view>{{ userAreaName }}</view>
				<view>{{ userAddress }}</view>
			</view>
			<view @click="this.isShow=true">
				<view class="size-30 gray-2 py-28">预约上门时间</view>
				<u-input v-model="currentTime" placeholder="请选择" disabled disabledColor="#ffffff"></u-input>				
				<hTimeAlert title="预约时间" subhead='请选择需要上门服务的时间' rangeDay="5" intervalTime="60" :isShow="isShow" @closeAlert="handelClose"></hTimeAlert>
			</view>
			<view>
			  <view class="size-30 gray-2 py-28">预估重量</view>
			  <input type="text" class="input-field" v-model="estimateWeight" placeholder="请输入预估重量">
			</view>
			<!-- <view @click="dateShow = true">
				<view class="size-30 gray-2 py-28">预约上门时间</view>
				<u-input v-model="reserveTime" placeholder="请选择" disabled disabledColor="#ffffff"></u-input>
				<u-datetime-picker
					ref="datetimePicker"
					:show="dateShow"
					v-model="reserveTime"
					:minDate="curTime"
					@close="dateShow = false"
					@cancel="dateShow = false"
					@confirm="dateShow = false"
					mode="time"
				></u-datetime-picker>

			</view> -->
			<view class="btn-group">
				<view @click="submit(2)" class="btn btn-2">立即下单</view>
			</view>
		</view>
		<!-- 选择地址 -->
		<u-popup :show="addressPopupShow" mode="bottom" @close="addressPopupShow = false">
			<view class="empty" v-if="list.length == 0">
				<image src="../../static/empty.png" mode="aspectFill"></image>
				<view>添加地址，预约你的回收天使～</view>
			</view>
			<view class="card">
				<view class="item" v-for="item in list" :key="item.id" @click="selectAddress(item)">
					<view class="flex-between">
						<view class="size-30">
							{{ item.userName }}
							<text class="ml-30 gray-2">{{ item.userPhone }}</text>
						</view>
						<!-- <image class="icon" src="../../static/edit@2x.png" mode=""></image> -->
					</view>
					<view class="address mt-30 pb-38 border-b">
						<image class="icon mr-8" src="../../static/map-pin@2x.png" mode="aspectFill"></image>
						<view class="size-30 gray-9">{{ item.areaName }}{{ item.address }}</view>
					</view>
				</view>
			</view>
			<view class="btn-3 btn" @click="addAddress">
				<image src="../../static/address_btn_add_new@2x.png" mode="aspectFill"></image>
				添加地址
			</view>
		</u-popup>
		<orderStatus :show="show" @closePopup="closePopup"></orderStatus>
	</view>
</template>

<script>
import orderStatus from '../../components/onTakeOrder/onTakeOrder.vue';
import hTimeAlert from '../../components/h-time-alert/h-time-alert.vue';
export default {
	components: {
		orderStatus,
		hTimeAlert
	},
	data() {
		return {
			show: false,
			addressPopupShow: false,
			list: '',
			userId: '',
			userName: '',
			userPhone: '',
			userArea: '',
			userAreaName: '',
			userAddress: '',
			dateShow: false,
			curTime: Number(new Date()),
			estimateWeight:'',
			baseUrl: '',
			userInfo: '',
			isShow: true,
			maskHide: true,
			closeBtn: true,
			rangeType: true,
			currentTime:'',
			currentTimeDate:''
		};
	},
	watch: {
		time(e) {
			var time = new Date();
			var choosetime = new Date(e);
			var y = time.getFullYear();
			var month = time.getMonth() + 1;
			var d = time.getDate();
			var h = choosetime.getHours();
			var m = choosetime.getMinutes();
			month = month < 10 ? '0' + month : month;
			m = m < 10 ? '0' + m : m;
			d = d < 10 ? '0' + d : d;
			this.reserveTime = `${y}/${month}/${d} ${h}:${m}`;
			console.log(this.time);
		}
	},
	onLoad() {
		this.baseUrl = this.$tools.baseUrl;
		this.userInfo = uni.getStorageSync('userInfo')
	},
	onShareTimeline() {},
	onShareAppMessage() {},
	onShow() {
		if (!uni.getStorageSync('openid')) {
			uni.switchTab({
				url: '../user/user'
			});
			return;
		}
		this.getList();
		this.$api
			.orderov({
				openid: uni.getStorageSync('openid')
			})
			.then(res => {
				if (res.code == 200) {
					if (res.data.status == 1) {
						this.show = true;
					}
				}
			});
	},
	methods: {
		showMask() {
		    this.isShow = true;
		    console.log(this.isShow);
		},
		
		handelClose(data) {
		    this.isShow = false;
			this.currentTime = data.dateRange;
			this.currentTimeDate = data.timeStamp;
		    console.log(data); 
		},
		// 获取地址列表
		getList() {
			this.$api
				.userAddress({
					userId: uni.getStorageSync('openid')
				})
				.then(res => {
					this.list = res.data;
					console.log(res);
				});
		},
		addAddress() {
			this.addressPopupShow = false;
			uni.navigateTo({
				url: '../addAddress/addAddress?source=placeOrder'
			});
		},
		selectAddress(item) {
			this.userName = item.userName;
			this.userPhone = item.userPhone;
			this.userAreaName = item.areaName;
			this.userAddress = item.address;
			this.userArea = item.areaId;
			this.addressPopupShow = false;
		},
		submit(type) {
			console.log(this.areaId);
			if(this.userName && this.estimateWeight && this.currentTime){
				this.$api
				.placeOrder({
					userId: uni.getStorageSync('openid'),
					userName: this.userName,
					userPhone: this.userPhone,
					userArea: this.userArea,
					userAreaName: this.userAreaName,
					userAddress: this.userAddress,
					reserveTime: this.currentTimeDate,
					estimateWeight:this.estimateWeight
				})
				.then(res => {
					if (res.code == 200) {
						this.$tools.toast('下单成功');
							setTimeout(() => {
								uni.switchTab({
									url: '../order/order',
									success() {
										var page = getCurrentPages().pop();
										if (page == undefined || page == null) return;
										page.onLoad();
									}
								});
							}, 1000);
						}
					else {
						this.$tools.toast(res.msg);
					}
				});
				}else{
					uni.showToast({
						title: '请准确填写信息',
						icon: 'none'
					});
				}
		}
	}
};
</script>

<style lang="scss">
.map {
	width: 100%;
	height: 588upx;
}

.address {
	border-radius: 16upx;
	margin-top: -16upx;
	padding: 32upx 0;

	.icon {
		width: 31upx;
		height: 37upx;
		min-width: 31upx;
		margin-right: 20upx;
	}
}

.user {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.icon {
		font-size: 24upx;
		color: #3bb061;
		text-align: center;

		image {
			width: 40upx;
			height: 40upx;
		}
	}
}

.border-b {
	border-bottom: 1upx solid #efefef;
}

.type-list {
	white-space: nowrap;

	.item {
		display: inline-block;
		width: 138upx;
		height: 172upx;
		background: #ffffff;
		box-shadow: 0px 0px 10upx 0 rgba(96, 202, 130, 0.29);
		border-radius: 12upx;
		margin: 24upx 7upx;
		text-align: center;
		font-size: 28upx;
		color: #606060;
		line-height: 1.2;
		box-sizing: border-box;
	}

	.cur {
		color: #3bb061;
		border: 4upx solid #3bb061;
	}

	image {
		width: 100upx;
		height: 100upx;
		margin-top: 12upx;
	}
}

.weight-list {
	display: flex;
	// justify-content: space-between;
	flex-wrap: wrap;

	.item {
		margin-bottom: 14upx;
		text-align: center;
		font-size: 30upx;
		color: #c4c4c4;
		width: 216upx;
		line-height: 80upx;
		background: #ffffff;
		border-radius: 16upx;
		border: 2upx solid #c4c4c4;
	}

	.item:not(:nth-child(3n)) {
		margin-right: 12upx;
	}

	.cur {
		color: #3bb061;
		border: 2upx solid #3bb061;
	}
}

.btn-group {
	display: flex;
	justify-content: space-between;
	padding: 32upx 0;

	.btn {
		width: 320upx;
		border-radius: 12upx;
		font-size: 32upx;
		font-weight: 400;
		color: #ffffff;
		line-height: 88upx;
	}

	.btn-1 {
		background: #f3f3f3;
		color: #666666;
	}
	.btn-1:after {
		border: 0;
	}

	.btn-2 {
 		background: #0b8f3a;
	}
}

.empty {
	text-align: center;
	margin: 100upx auto 120upx;

	image {
		width: 196upx;
		height: 196upx;
		margin-bottom: 36upx;
	}

	view {
		font-size: 28upx;
		font-weight: 400;
		color: #c4c4c4;
	}
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
			transform: scale(0.9);
		}
	}
}

.btn-3 {
	width: 700upx;
	margin: 0 auto 30upx;
}
</style>
