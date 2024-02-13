<template>
	<view class="container">
		<view class="bgc"></view>
		<view class="classify-content">
			<view class="title">回收品类</view>
			<view class="classify-detail flex-around">
				<view class="flex-1">
					<view class="classify-img"></view>
					<view class="classify-name">四季衣物</view>
				</view>
				<view class="flex-1">
					<view class="classify-img"></view>
					<view class="classify-name">各类鞋靴</view>
				</view>
				<view class="flex-1">
					<view class="classify-img"></view>
					<view class="classify-name">闲置旧包</view>
				</view>
				<view class="flex-1">
					<view class="classify-img"></view>
					<view class="classify-name">各类首饰</view>
				</view>
				<view class="flex-1">
					<view class="classify-img"></view>
					<view class="classify-name">毛绒玩具</view>
				</view>
			</view>
		</view>
		<view class="delivery-content flex-col">
			<view class="title">快递上门取件</view>
			<view class="item flex-between" @click="handleChooseTime">
				<view>取件时间</view>
				<input type="text" :disabled="true" v-bind:value="totalDays[deliveryUserDay][0] + ' 周' + totalDays[deliveryUserDay][1]" style="color: rgba(166, 166, 166, 1); font-size: 14px;"/>
				<view class="icon-right"><img src="/static/icon/dayuhao.png" alt="" /></view>
			</view>
			<view class="item flex-between" @click="handleChooseAddress">
				<view>取件信息</view>
				<view class="icon-right"><img src="/static/icon/dayuhao.png" alt="" /></view>
			</view>
			<view class="item" style="flex-grow: 1;">
				<view style="margin-bottom: 10px;">请选择预估重量</view>
				<view class="flex-between">
					<view class="weight-item flex-col flex-1" :class="currentWeightIndex === index ? 'weight-choosing' : ''" v-for="(item, index) in weight" :key="index" @click="currentWeightIndex = index">
						<span>{{item[0]}}</span>
						<span>{{item[1]}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="submit" @click="handleSubmit">确认提交</view>
		
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
		<u-modal :show="showAddress" :closeOnClickOverlay="true" @close="showAddress = false" :showConfirmButton="false">
			<view class="address-order flex-col flex-between">
				<view style="width: 100%;">
					<view class="top-authroize flex-between">
						<span @click="getAuthorize">授权使用微信地址</span>
						<span @click="chooseAddress">选择地址</span>
					</view>
					<view class="address-title">新增回收信息</view>
					<view class="address-content">
						<view class="address-item flex-between">
							<view style="flex: 1.5; color: rgba(128, 128, 128, 1); text-align: justify; text-align-last: justify; margin-right: 10px;">回收人</view>
							<input type="text"  placeholder="请输入用户姓名" style="flex: 4; font-size: 12px; color: rgba(166, 166, 166, 1);" placeholder-style="color: rgba(166, 166, 166, 1);" v-model="recycleName"/>
						</view>
						<view class="address-item flex-between">
							<view style="flex: 1.5; color: rgba(128, 128, 128, 1); text-align: justify; text-align-last: justify; margin-right: 10px;">手机号</view>
							<input type="number"  placeholder="请输入真实手机号" style="flex: 4; font-size: 12px; color: rgba(166, 166, 166, 1);" placeholder-style="color: rgba(166, 166, 166, 1);" v-model="phone"/>
						</view>
						<view class="address-item flex-between">
							<view style="flex: 1.5; color: rgba(128, 128, 128, 1); text-align: justify; text-align-last: justify; margin-right: 10px;">地区</view>
							<view style="flex: 4;" class="flex-between" @click="handleShowPicker">
								<input type="text"  placeholder="请选择地区" style="flex: 4; font-size: 12px; color: rgba(166, 166, 166, 1);" placeholder-style="color: rgba(166, 166, 166, 1);" v-model="address" :disabled="true"/>
								<view style="width: 10px; height: 20px;">
									<img src="/static/icon/dayuhao.png" alt=""  style="width: 100%; height: 100%;"/>
								</view>
							</view>
						</view>
						<view class="address-item flex-between">
							<view style="flex: 1.5; color: rgba(128, 128, 128, 1); text-align: justify; text-align-last: justify; margin-right: 10px;">详细地址</view>
							<input type="text"  placeholder="请输入详细地址" style="flex: 4; font-size: 12px; color: rgba(166, 166, 166, 1);" placeholder-style="color: rgba(166, 166, 166, 1);" v-model="addressDetail"/>
						</view>
					</view>
				</view>
				<view class="address-confirm" @click="saveAddressInfo">保存信息</view>
				<view class="address-confirm" @click="confirmAddress">确认信息</view>
			</view>
			<!-- 省市区选择 province city area初始省市区设置 show:是否显示  @changeClick：更改省市区事件 @sureSelectArea：确认事件 @hideShow：隐藏事件-->
			<cc-selectDity :province="province" :city="city" :area="area" :show="showPicker" @sureSelectArea="onsetCity" @hideShow="onhideShow"  @changeClick="changeClick"></cc-selectDity>
		</u-modal>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				showDate: false,
				daysDistance: 7,
				currentDifference: 0,
				daysItem: [],
				totalDays: [],
				currentDayIndex: 0,
				
				showAddress: false,
				
				longitude: '',
				latitude: '',
				address: '',
				addressDetail: '',
				recycleName: '',
				phone: '',
				
				weight: [['5-10kg', '约20件'], ['10-20kg', '约40件'], ['20-50kg', '约60件'], ['50kg以上', '约150件']],
				currentWeightIndex: 0,
				
				deliveryUserAddress: '',
				deliveryUserAddressDetail: '',
				deliveryUserName: '',
				deliveryUserPhone: '',
				deliveryUserDay: 0,
				
				province: '浙江省',
				city: '杭州市',
				area: '上城区',
				showPicker: false
			}
		},
		methods: {
			resetData() {
				this.deliveryUserAddress = '';
				this.deliveryUserAddressDetail = '';
				this.deliveryUserName = '';
				this.deliveryUserPhone = '';
				this.deliveryUserDay = 0;
				this.currentWeightIndex = 0;
			},
			closeDate() {
				this.showDate = false;
			},
			openDate() {
				
			},
			handleChooseTime() {
				this.showDate = true;
				this.currentDayIndex = this.deliveryUserDay;
			},
			handleChooseAddress() {
				this.showAddress = true;
				this.address = this.deliveryUserAddress;
				this.addressDetail = this.deliveryUserAddressDetail;
				this.recycleName = this.deliveryUserName;
				this.phone = this.deliveryUserPhone;
			},
			handleShowPicker() {
				this.showPicker = true;
				// 默认值
				this.province = '浙江省';
				this.city = '湖州市';
				this.area = '吴兴区';
			},
			getLatitudeAndLongitude() {
				uni.getLocation({
				    type: 'gcj02',
				    success: res => {
				        this.longitude = res.longitude;
				        this.latitude = res.latitude;
						// 等待异步回调结果返回后再调用
						this.getLocation()
				    },
				    fail: res => {
						this.$tools.toast('请打开定位功能并授权定位');
					}
				});
			},
			getLocation() {
				const params = {
				  location: this.latitude+','+this.longitude,
				  sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
				};
				// 调用定位方法
				this.qqMap.reverseGeocoder({
					...params,
					success: (res) => {
					this.address = res.result.address_component.province + res.result.address_component.city + res.result.address_component.district;
					this.addressDetail = res.result.address_component.street;
						// 获取定位成功的结果
						// const address = res.result.address_component.district;
						// this.address = address;
				  },
				  fail: (error) => {
				    // 定位失败的处理
				    console.log('定位失败', error)
				  }
				})
			},
			getAuthorize() {
				uni.getSystemInfo({
					success: (res) => {
						if (!res.locationEnabled || !res.locationAuthorized) {
							uni.showModal({
								title: '提示',
								content: '请打开手机定位服务功能',
							})
							return;
						}
						else if(res.hostName == 'WeChat'){
							uni.authorize({
								scope: 'scope.userLocation',
								success: () => {
									this.getLatitudeAndLongitude()
								},
								fail: (err) => {
									err = err['errMsg']
									uni.showModal({
										content: '需要授权位置信息',
										confirmText: '确认授权'
									}).then(res => {
										if (res[1]['confirm']) {
											uni.openSetting({
												success: (res) => {
													if (res.authSetting['scope.userLocation'] || res.authSetting['location']) {
														// 授权成功
														uni.showToast({
															title: '授权成功',
															icon: 'none'
														})
														this.getLatitudeAndLongitude();
													} else {
														// 未授权
														uni.showToast({
															title: '授权失败',
															icon: 'none'
														})
													}
												}	
											})
										}
										if (res[1]['cancel']) {
											// 取消授权
											console.log('取消');
											this.$tools.toast('请开启定位功能并授权获取地图服务');
										}
									})
								}
							})
						}
					}
				})
			},
			async handleSubmit() {
				if(!this.deliveryUserDay.toString() || !this.currentWeightIndex.toString() || !this.deliveryUserAddress || !this.deliveryUserAddressDetail || !this.deliveryUserName || !this.deliveryUserPhone) {
					this.$tools.toast('请完善信息');
					return;
				}
				// uni.navigateTo({
				// 	url: '/pages/delivery/delivery-orders'
				// })
				let result = await this.$api.holdOrders({
					userId: uni.getStorageSync('openid'),
					userAddress: this.deliveryUserAddress,
					userAddressDetail: this.deliveryUserAddressDetail,
					recycleCategory: this.weight[this.currentWeightIndex].toString(),
					reserveTime: this.totalDays[this.currentDayIndex].toString(),
					phone: this.deliveryUserPhone
				})
				console.log(result);
				this.resetData();
			},
			async confirmAddress() {
				if(!this.address || !this.addressDetail || !this.recycleName || !this.phone) {
					this.$tools.toast('请完整填写信息');
					return;
				}
				this.deliveryUserAddress = this.address;
				this.deliveryUserAddressDetail = this.addressDetail;
				this.deliveryUserName = this.recycleName;
				this.deliveryUserPhone = this.phone;
				this.showAddress = false;
			},
			async saveAddressInfo() {
				if(!this.address || !this.addressDetail || !this.recycleName || !this.phone) {
					this.$tools.toast('请完整填写信息');
					return;
				}
				let result = await this.$api.saveUserAddress({
					useId: uni.getStorageSync('openid'),
					name: this.recycleName,
					phone: this.phone,
					address: this.address,
					detailAddress: this.addressDetail
				})
				if(result.code === 200) {
					this.$tools.toast('保存成功');
				}
				else {
					this.$tools.toast('网络繁忙请稍后再试');
				}
			},
			confirmDate() {
				this.deliveryUserDay = this.currentDayIndex;
				this.showDate = false;
			},
			onsetCity(e) {
				// e 表示的地址为默认值
				this.address = e.detail.target.dataset.province + e.detail.target.dataset.city + e.detail.target.dataset.area
				this.showPicker = false;
			},
			onhideShow() {
				this.showPicker = false;
			},
			changeClick(value1, value2, value3) {
				// 修改默认值
				this.province = value1;
				this.city = value2;
				this.area = value3;
			},
			async getUserAddress() {
				let result = await this.$api.getUserAddress({
					userId: uni.getStorageSync('openid')
				})
				console.log(result);
			},
			async chooseAddress() {
				await this.getUserAddress();
			}

		},
		onShow() {
			moment.locale('zh-cn');
			let currentDay = new Date();
			this.currentDifference = currentDay.getTime();
			for(let i = 0; i < this.daysDistance; i++) {
				this.totalDays.push(moment(this.currentDifference + 1000 * 60 * 60 * 24 * i).format('MM-DD dd').split(" "));
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-modal__content {
		padding: 0 !important;
	}
	.container {
		position: relative;
		height: 100vh;
		.bgc {
			position: absolute;
			top: 0;
			width: 100vw;
			height: 30vw;
			background-color: #34cd99;
		}
		.classify-content {
			transform: translateY(calc(30vw - 50%));
			width: 90vw;
			margin-left: 5vw;
			height: 100px;
			background-color: #6cf;
			border-radius: 10px;
			padding: 10px;
			box-sizing: border-box;
			.title {
				font-size: 16px;
				font-weight: 550;
			}
			.classify-detail {
				.classify-img {
					width: 100%;
					height: 20px;
					margin-bottom: 10px;
				}
				.classify-name {
					font-size: 12px;
					text-align: center;
				}
			}
		}
		.delivery-content {
			width: 90vw;
			margin-left: 5vw;
			padding: 10px 10px 20px;
			box-sizing: border-box;
			border-radius: 10px;
			height: 300px;
			background-color: #fff;
			transform: translateY(30vw);
			.title {
				font-size: 16px;
				font-weight: 550;
				padding: 10px 0;
				border-bottom: 1px solid #ccc;
			}
			.item {
				padding: 10px 0;
				border-bottom: 1px solid #ccc;
				.icon-right {
					width: 10px;
					height: 20px;
					margin-right: 10px;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.weight-item {
				padding: 7px 5px;
				background-color: #ddd;
				font-size: 12px;
				margin-right: 10px;
				text-align: center;
				box-sizing: border-box;
			}
			.weight-choosing {
				background-color: #ccc;
			}
		}
		.submit {
			position: absolute;
			bottom: 20px;
			width: 90vw;
			margin-left: 5vw;
			border-radius: 10px;
			background-color: #34cd99;
			padding: 10px 0;
			text-align: center;
			color: #fff;
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
		.address-order {
			// height: 70vh;
			width: 100%;
			.top-authroize {
				padding: 20px 15px;
				width: 100%;
				box-sizing: border-box;
				background: rgba(229, 229, 229, 1);
				span:nth-child(1) {
					font-size: 14px;
					font-weight: 700;
					line-height: 14.48px;
					color: rgba(120, 206, 162, 1);
				}
				span:nth-child(2) {
					padding: 5px 10px;
					text-align: center;
					font-size: 14px;
					width: 56px;
					height: 21px;
					opacity: 1;
					border-radius: 20px;
					background: rgba(120, 206, 162, 1);
					color: #fff;
				}
			}
			.address-title {
				margin: 15px 0;
				font-size: 16px;
				font-weight: 550;
				text-align: center;
			}
			.address-content {
				.address-item {
					padding: 10px 0;
					margin: 0 10px;
					border-bottom: 1px solid #ccc;
				}
			}
			.address-confirm {
				width: 70%;
				border-radius: 15px;
				background: rgba(120, 206, 162, 1);
				color: #fff;
				box-sizing: border-box;
				text-align: center;
				margin-bottom: 15px;
				margin-top: 15px;
				padding: 5px 0;
			}
		}
	}
</style>