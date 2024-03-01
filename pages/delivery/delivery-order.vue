<template>
	<view class="container">
		<view class="bgc"></view>
		<view class="classify-content">
			<view class="title">回收品类</view>
			<view class="classify-detail flex-around">
				<div class="flex-1 classify-item">
					<div class="classify-img">
						<img src="/static/delivery/yifu.png" alt="" mode="widthFix"/>
					</div>
					<div class="classify-name">四季衣物</div>
				</div>
				<div class="flex-1 classify-item">
					<div class="classify-img">
						<img src="/static/delivery/xie.png" alt=""  mode="widthFix" />
					</div>
					<div class="classify-name">各类鞋靴</div>
				</div>
				<div class="flex-1 classify-item">
					<div class="classify-img">
						<img src="/static/delivery/bao.png" alt=""  mode="widthFix" />
					</div>
					<div class="classify-name">闲置旧包</div>
				</div>
				<div class="flex-1 classify-item">
					<div class="classify-img">
						<img src="/static/delivery/shoushi.png" alt=""  mode="widthFix" />
					</div>
					<div class="classify-name">各类首饰</div>
				</div>
				<div class="flex-1 classify-item">
					<div class="classify-img">
						<img src="/static/delivery/maorong.png" alt=""  mode="widthFix" />
					</div>
					<div class="classify-name">毛绒玩具</div>
				</div>
			</view>
		</view>
		<view class="delivery-content flex-col">
			<view class="title">快递上门取件</view>
			<view class="item flex-between" @click="handleChooseTime">
				<view>取件时间</view>
				<input type="text" :disabled="true" v-bind:value="reserveTime" style="color: rgba(166, 166, 166, 1); font-size: 14px;"/>
				<view class="icon-right"><img src="/static/icon/dayuhao.png" alt="" /></view>
			</view>
			<view class="item flex-between" @click="handleChooseAddress">
				<view>取件信息</view>
				<input type="text" :disabled="true" v-bind:value="deliveryUserAddress" style="color: rgba(166, 166, 166, 1); font-size: 14px;"/>
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
				<picker-view v-if="true" :indicator-style="indicatorStyle" :value="1" @change="bindChange" class="picker-view">
				     <picker-view-column>
				         <view class="item-picker" v-for="(item,index) in hours" :key="index">{{item}}</view>
				     </picker-view-column>
				 </picker-view>	
				<view class="date-confirm" @click="confirmDate">确定</view>
			</view>
		</u-popup>
		<u-modal :show="showAddress" :closeOnClickOverlay="true" @close="showAddress = false" :showConfirmButton="false">
			<view class="address-order flex-col flex-between">
				<view style="width: 100%;">
					<view class="top-authroize flex-between">
						<span @click="chooseAddress">使用微信地址</span>
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
				<!-- <view class="address-confirm" @click="saveAddressInfo">保存信息</view> -->
				<view class="address-confirm" @click="confirmAddress">确认信息</view>
			</view>
			<!-- 省市区选择 province city area初始省市区设置 show:是否显示  @changeClick：更改省市区事件 @sureSelectArea：确认事件 @hideShow：隐藏事件-->
			<cc-selectDity :province="province" :city="city" :area="area" :show="showPicker" @sureSelectArea="onsetCity" @hideShow="onhideShow"  @changeClick="changeClick"></cc-selectDity>
		</u-modal>
		<u-modal :show="showConfirm" @confirm="handleConfirm()" @cancel="showConfirm = false" confirmColor="#6cf" showCancelButton=true>
			<view style="line-height: 15vh; font-size: 16px;">请确认提交信息</view>
		</u-modal>
	</view>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				indicatorStyle: `height: 50px;`,
				year: '',
				hours: ['09:00-11:00', '11:00-13:00', '13:00-15:00', '17:00-19:00'],
				currentTime: '09:00-11:00',
				
				showDate: false,
				daysDistance: 3,
				totalDays: [],
				currentDayIndex: 0,
				
				showAddress: false,
				
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
				deliveryUserTime: '09:00-11:00',
				province: '浙江省',
				city: '杭州市',
				area: '上城区',
				showPicker: false,
				
				showConfirm: false
			}
		},
		computed: {
			reserveTime() {
				if(this.totalDays.length === 0) return '';
				return this.totalDays[this.deliveryUserDay][0] + ',' + this.deliveryUserTime;
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
			async handleSubmit() {
				if(!this.deliveryUserDay.toString() || !this.currentWeightIndex.toString() || !this.deliveryUserAddress || !this.deliveryUserAddressDetail || !this.deliveryUserName || !this.deliveryUserPhone) {
					this.$tools.toast('请完善信息');
					return;
				}
				if(!this.$tools.verifyTelPhone(this.deliveryUserPhone)) {
					this.$tools.toast('请输入正确的手机号');
					return;
				}
				this.showConfirm = true;
			},
			
			async handleConfirm() {
				this.showConfirm = false;
				let result = await this.$api.deliveryPlaceOrder({
					userId: uni.getStorageSync('openid'),
					userName: this.deliveryUserName,
					userAddress: this.deliveryUserAddress,
					userAddressDetail: this.deliveryUserAddressDetail,
					recycleCategory: this.weight[this.currentWeightIndex].toString(),
					reserveTime: this.year + '-' + this.reserveTime,
					phone: this.deliveryUserPhone,
					userAddreessId: "1751828914228809730",
				})
				if(result.code === 200) {
					this.$tools.toast('提交成功');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/delivery/delivery-orders'
						})
					}, 500)
				}
				else {
					this.$tools.toast('网络繁忙请稍后再试');
					return;
				}
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
				this.deliveryUserTime = this.currentTime;
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
			},
			
			
			async chooseAddress() {
				wx.getSetting({
					success:(result1)=>{
						const scopeAddress = result1.authSetting["scope.address"];
						if(scopeAddress === true || scopeAddress === undefined){
							wx.chooseAddress({
								success:(result2)=>{
									this.address = result2.cityName + ',' + result2.countyName;
									this.addressDetail = result2.detailInfo;
									this.recycleName = result2.userName;
									this.phone = result2.telNumber;
								}
							})
						}
						else {
							this.$tools.toast('请授权获取地址信息');
						}
					}
				})
			},
			bindChange(e) {
				const val = e.detail.value;
				this.currentTime = this.hours[val[0]];
			},

		},
		onShow() {
			moment.locale('zh-cn');
			let currentDay = new Date();
			let currentDifference = currentDay.getTime();
			for(let i = 0; i < this.daysDistance; i++) {
				this.totalDays.push(moment(currentDifference + 1000 * 60 * 60 * 24 * i).format('MM-DD dd').split(" "));
			}
			this.year = moment().format('yyyy');
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
			width: 92vw;
			margin-left: 4vw;
			background-color: #fff;
			border-radius: 10px;
			padding: 10px;
			box-sizing: border-box;
			.title {
				font-size: 16px;
				font-weight: 550;
			}
			.classify-detail {
				margin-top: 10px;
				align-items: flex-end;
				.classify-item {
					margin: 0 8px;
				}
				.classify-img {
					width: 80%;
					margin: 0 auto;
					margin-bottom: 10px;
					img {
						width: 100%;
					}
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
			}
			.weight-choosing {
				background: rgba(120, 206, 162, 0.5);
				color: #34cd99;
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
			display: flex;
			flex-direction: column;
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
				margin: 0 auto;
				margin-top: auto;
				margin-bottom: 10px;
				// left: 50%;
				// transform: translateX(-50%);
				width: 70%;
				padding: 10px 0;
				color: #fff;
				text-align: center;
				background: rgba(120, 206, 162, 1);
				border-radius: 10px;
			}
			.picker-view {
				width: 80%;
				flex-grow: 1;
				margin: 0 auto;
				margin-top: 20rpx;
			}
			.item-picker {
				line-height: 100rpx;
				text-align: center;
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