<template>
	<view>
		<view class="p-32 bg-white">
			<map :longitude="longitude" :latitude="latitude" :scale="16" style="width: 100%; height: 250px;" :markers="covers" @click="clickMap"></map>
			<view class="flex address mt-20" @click="addressPopupShow = true">
				<image class="icon" src="../../static/location-1.png" mode="aspectFill"></image>
				<view>请选择地址</view>
			</view>
			<view class="user pb-20 border-b">
				<view class="icon" @click="addressPopupShow = true">
					<image src="../../static/cae_list_btn_more@2x.png" mode="aspectFill"></image>
					<view>地址簿</view>
				</view>
			</view>
			<view>
			  <view class="size-30 gray-2 py-28">联系人</view>
			  <input type="text" class="input-field" v-model="userName" placeholder="请输入姓名">
			</view>
			<view>
			  <view class="size-30 gray-2 py-28">联系号码</view>
			  <input type="text" class="input-field" v-model="userPhone" placeholder="请输入手机号">
			</view>
			<view>
			  <view class="size-30 gray-2 py-28">社区信息</view>
			  <input type="text" class="input-field" v-model="userCommunity" placeholder="">
			</view>
			<view>
			  <view class="size-30 gray-2 py-28">详细地址</view>
			  <input type="text" class="input-field" v-model="userAddress" placeholder="例如:1幢1单元">
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
						<view class="size-30 gray-9">{{ item.community }}{{ item.address }}</view>
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
			userLocation: '',
			userCommunity: '',
			userAddress: '',
			dateShow: false,
			curTime: Number(new Date()),
			estimateWeight:'',
			baseUrl: '',
			userInfo: '',
			isShow: false,
			maskHide: true,
			closeBtn: true,
			rangeType: true,
			currentTime:'',
			currentTimeDate:'',
			covers: [{
				latitude: 0,
				longitude: 0,
				id: 1,
				width: 0,
				height: 0,
				iconPath: '../../static/location-1.png',
			}],
			longitude: 0, // 经度
			latitude: 0, // 纬度
			sexList:[
				{
					id:0,
					name:'先生'
				},
				{
					id:1,
					name:'女士'
				}
			],
			gender:0,
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
		if (!uni.getStorageSync('openid')) {
			uni.switchTab({
				url: '../user/user'
			});
		}
		else{
			this.getAuthorize();
			this.initMap();
		}

		this.baseUrl = this.$tools.baseUrl;
		this.userInfo = uni.getStorageSync('userInfo');
		
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
		this.resetData();
		this.initMap();
	},
	methods: {
		
		resetData() {
		  this.show = false;
		  this.addressPopupShow = false;
		  this.list = '';
		  this.userId = '';
		  this.userName = '';
		  this.userPhone = '';
		  this.userArea = '';
		  this.userLocation = '';
		  this.userCommunity = '';
		  this.userAddress = '';
		  this.dateShow = false;
		  this.curTime = Number(new Date());
		  this.estimateWeight = '';
		  this.baseUrl = '';
		  this.userInfo = '';
		  this.isShow = false;
		  this.maskHide = true;
		  this.closeBtn = true;
		  this.rangeType = true;
		  this.currentTime = '';
		  this.currentTimeDate = '';
		  this.covers = [{
		    latitude: 0,
		    longitude: 0,
		    id: 1,
		    width: 0,
		    height: 0,
		    iconPath: '../../static/location-1.png',
		  }];
		  this.longitude = 0;
		  this.latitude = 0;
		  this.sexList = [
		    {
		      id: 0,
		      name: '先生',
		    },
		    {
		      id: 1,
		      name: '女士',
		    },
		  ];
		  this.gender = 0;
		},
		clickMap(p) {
		  this.longitude = p.detail.longitude;
		  this.latitude = p.detail.latitude;
		  this.getSite();
		  this.covers = [{
		    latitude: p.detail.latitude,
		    longitude: p.detail.longitude,
		    id: 1,
		    width: 20,
		    height: 20,
		    iconPath: '../../static/location-1.png',	
		  }];
		  
		  this.getLocation();
		},

		getLocation(){
			const params = {
			  location: this.latitude+','+this.longitude,
			  sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
			};
			// 调用定位方法
			this.qqMap.reverseGeocoder({
				...params,
			  success: (res) => {
			    // 获取定位成功的结果
			    const community = res.result.formatted_addresses.recommend;
				this.userCommunity = community;
			    // 其他逻辑处理
			    // ...
			  },
			  fail: (error) => {
			    // 定位失败的处理
			    console.log('定位失败', error)
			  }
			})
		
		},
		initMap() {
		  uni.getLocation({
		    type: 'gcj02',
		    success: (res) => {
		      this.longitude = res.longitude;
		      this.latitude = res.latitude;
		      this.covers = [{
		        latitude: res.latitude,
		        longitude: res.longitude,
		        id: 1,
		        width: 20,
		        height: 20,
		        iconPath: '../../static/location-1.png',
		      }];
		
		      // 等待异步回调结果返回后再调用
		      this.getLocation();
		      this.getSite();
		    },
		    fail: (res) => {
		      // 处理错误情况
		    },
		  });
		},
		getAuthorize() {
		            uni.authorize({
		              scope: 'scope.userLocation',
		              success: () => {
		                this.initMap()
		              },
		              fail: (err) => {
		                err = err['errMsg']
		                uni
		                  .showModal({
		                    content: '需要授权位置信息',
		                    confirmText: '确认授权'
		                  })
						  .then((res) => {
						        if (res[1]['confirm']) {
									uni.openSetting({
						            success: (res) => {
						            if (res.authSetting['scope.userLocation']) {
						                // 授权成功
										uni.showToast({
						                    title: '授权成功',
						                    icon: 'none'
						                })
						            } else {
						                // 未授权
										uni.showToast({
						                    title: '授权失败',
						                    icon: 'none'
						                })
						            }
						            this.initMap()
						        }
						    })
						}
						if (res[1]['cancel']) {
						// 取消授权
						console.log('取消')
						this.initMap()
						}
					})
				}
			})
		},
		getSite() {
		var ok = 0;
		this.$api.getAllArea().then(res => {
		    const locationList = res.data;
			console.log("data:",locationList)
		    for (const location of locationList) {
		      const location1 = location.location.split(',');
		      const lat1 = parseFloat(location1[0]);
		      const lon1 = parseFloat(location1[1]);
		      const lat2 = parseFloat(this.latitude);
		      const lon2 = parseFloat(this.longitude);
		      const R = 6371; // 地球半径（单位：公里）
		
		      const dLat = toRad(lat2 - lat1);
		      const dLon = toRad(lon2 - lon1);
			  console.log(dLat);
			  console.log(dLon);
		
		      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		        Math.sin(dLon / 2) * Math.sin(dLon / 2);
		
		      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		      const distance = R * c;
			  console.log(distance)
		
		      if (distance <= 5 && distance >= -5) {
		        this.userArea = location.id;
				ok=1;
		        break;
		      }else{
				  ok = 2;
			  }
		    }
			if (ok==2) {
			  uni.showToast({
			    title: '当前位置未开通服务',
			    icon: 'none'
			  });
			}
		  });
		
		  function toRad(value) {
		    return value * Math.PI / 180;
		  }
		},
		showMask() {
		    this.isShow = true;
		    // console.log(this.isShow);
		},
		
		handelClose(data) {
		    this.isShow = false;
			this.currentTime = data.dateRange;
			this.currentTimeDate = data.timeStamp;
		    // console.log(data); 
		},
		// 获取地址列表
		getList() {
			this.$api
				.userAddress({
					userId: uni.getStorageSync('openid')
				})
				.then(res => {
					console.log(res.data)
					this.list = res.data;
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
			this.userCommunity = item.community;
			this.userAddress = item.address;
			this.userArea = item.areaId;
			const location1 = item.location.split(',');
			this.latitude = location1[0];
			this.longitude = location1[1];
			this.addressPopupShow = false;
			this.covers = [{
				latitude: this.latitude,
				longitude: this.longitude,
				id: 1,
				width: 20,
				height: 20,
				iconPath: '../../static/location-1.png',	
			}]
			this.getSite();
		},
		submit(type) {
			if(this.userName && this.estimateWeight && this.currentTime){
				this.$api
				.placeOrder({
					userId: uni.getStorageSync('openid'),
					userName: this.userName,
					userPhone: this.userPhone,
					userArea: this.userArea,
					userLocation: this.latitude+','+this.longitude,
					userCommunity: this.userCommunity,
					userAddress: this.userAddress,
					reserveTime: this.currentTimeDate,
					estimateWeight:this.estimateWeight
				})
				.then(res => {
					if (res.code == 200) {
						this.$tools.toast('下单成功');
							setTimeout(() => {
								//跳转到订单页面
								uni.switchTab({
									url: '../order/order',
									success() {
										var page = getCurrentPages().pop();
										if (page == undefined || page == null) return;
									}
								});
							}, 10);
						}
					else {
						this.$tools.toast('当前所在地区未在服务范围内');
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
.input {
			margin: 0 20upx;
			padding: 0 20upx;
			line-height: 100upx;
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #999999;
			border-bottom: 2upx solid #ededed;
			background: #fff;
			position: relative;
			.sex{
				display: flex;
				margin: 20upx 0;
				.item{
					font-size: 32upx;
					color: #C4C4C4;
					width: 128upx;
					line-height: 72upx;
					text-align: center;
					background: #FFFFFF;
					border-radius: 12upx;
					border: 1upx solid #C4C4C4;
					margin-right: 32upx;
				}
				.cur{
					color: #3BB061;
					border: 1upx solid #3BB061;
				}
			}
			text {
				font-size: 30upx;
				width: 170upx;
				min-width: 170upx;
				color: #222;
			}
			
			.text-1{
				padding-right: 50upx;
				line-height: 1.6;
				margin: 10upx 0;
			}

			input {
				font-size: 28upx;
				color: #999999;
			}
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
