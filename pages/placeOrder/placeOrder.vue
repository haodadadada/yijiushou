<template>
	<view class="container">
		<map :longitude="longitude" :latitude="latitude" :scale="16" style="width: 100%; height: 60%; position: absolute; z-index: 0;" :markers="covers" @click="clickMap" v-if="isShowMap"></map>
		<view class="mylocation" @click.stop="initMap" v-if="isShowMap">
			<!-- <span class="iconfont">&#xec32;</span> -->
			<img src="../../static/icon/dingwei.png" alt="" style="width: 30px; height: 30px;">
		</view>
		<view class="tolocation" v-if="!isShowMap && !isLoading">
			<view>无法定位到您</view>
			<view>请在手机中查看是否开启定位功能并且授权定位</view>
			<button @click="getAuthorize">刷新定位</button>
		</view>
		<view class="contain">
	<!-- 		<view class="search">
				<span class="iconfont span-icon" >&#xeafe;</span>
				<input type="text" v-model="searchKeyword" placeholder="浙江省湖州市" @confirm="searchAddress(searchKeyword)" @input="getSuggest($event.detail.value)">
				<view @click="searchAddress(searchKeyword)">搜索</view>
			</view> -->
			<view class="info">
				<view class="info-contain">
					<view class="info-header">
						<span style="font-weight: 600;">{{userName}}</span>
						<!-- <span class="iconfont" style="color: green;">&#xe628;1.2km</span> -->
					</view>
					<view class="info-community" @click="goSuggest">
						<!-- <span class="iconfont">&#xe652;</span> -->
						<img src="../../static/icon/dizhi.png" alt="" style="width: 17px; height: 17px;">
						<!-- <span style="margin-left: 1upx;">浙江省湖州市</span> -->
						<input type="text" style="margin-left: 5px; flex-grow: 1;" placeholder="浙江省湖州市" v-model="userCommunity" @confirm="searchAddress(userCommunity)"  disabled="true">
					</view>
					<view class="info-address">
						<!-- <span class="iconfont">&#xe624;</span>-->
						<img src="../../static/icon/jia.png" alt="" style="width: 17px; height: 17px;">
						<input type="text" style="margin-left: 5px; flex-grow: 1;" placeholder="请输入门牌号" v-model="userAddress">
					</view>
					<view class="info-phone">
						<!-- <span class="iconfont">&#xe88b;</span> -->
						<img src="../../static/icon/dianhua.png" alt="" style="width: 17px; height: 17px;">
						<input type="tel" style="margin-left: 5px; flex-grow: 1;" placeholder="请输入手机号" v-model="userPhone">
					</view>
					<view class="info-date" @click="this.isShow=true">
						<!-- <span class="iconfont">&#xe64d;</span> -->
						<img src="../../static/icon/yuyue.png" alt="" style="width: 17px; height: 17px;">
						<!-- <u-input v-model="currentTime" placeholder="请选择" disabled disabledColor="#ffffff" style="margin-left: 1upx; padding: 0;"></u-input>				 -->
						<input type="text" style="margin-left: 5px; flex-grow: 1;" disabled="true" :placeholder="isShow ? '' : '请选择时间'" v-model="currentTime">
						<hTimeAlert title="预约时间" subhead='请选择需要上门服务的时间' rangeDay="5" intervalTime="60" :isShow="isShow" @closeAlert="handelClose" class="hTimeAlert"></hTimeAlert>
					</view>
					<view class="info-category" @click="showCategory">
						<!-- <span class="iconfont">&#xe62a;</span> -->
						<img src="../../static/icon/fenzu.png" alt="" style="width: 17px; height: 17px;">
						<input type="text" style="margin-left: 5px; flex-grow: 1;" placeholder="请输入旧物种类" v-model="recycleCategory" disabled="true" >
					</view>
				</view>

				<view class="info-footer">
					<view class="info-footer-left" @click="addressPopupShow = true">
						<!-- <span class="iconfont">&#xe74c;</span> -->
						<img src="../../static/icon/dizhibu.png" alt="" style="width: 17px; height: 17px;">
						<span style="margin-left: 1upx;">地址簿</span>
					</view>
<!-- 					<view class="info-footer-middle">
						<span class="iconfont">&#xe625;</span>
						<span style="margin-left: 1upx;" @click="goBooking">预约</span>
					</view> -->
					<view class="info-footer-right" @click="submit(2)">
						<span class="iconfont">&#xec36;</span>
						<span style="margin-left: 1upx;">下单</span>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择种类 -->
		<u-popup :show="categoryShow" @close="categoryShow = false">
			<view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #ccc;">
				<view style="line-height: 10vh; font-weight: 500; margin-left: 5vw;">物品分类</view>
				<view class="decision" @click="decideCategory">
					<span>确定</span>
				</view>
			</view>
<!-- 			<view class="popup-header">
				<span class="item" v-for="(item, index) in categoryList" :key="index" v-if="isChooseList[index]">
					<u-tag :text="item.name" :show="true" borderColor="#34cd99" closeColor="#34cd99" color="#34cd99" plain=true closable=true @close="changeChoose(index)"></u-tag>
				</span>
			</view> -->
			<view class="popup-contain">
				<span class="item" v-for="(item, index) in categoryList" :key="index">
					<u-tag :text="item.name" :bgColor="isChooseList[index] ?  '#34cd99' : '#C6C7CB'" :show="true" :borderColor="isChooseList[index] ?  '#34cd99' : '#C6C7CB'" @click="changeChoose(index)"></u-tag>
				</span>
			</view>

		</u-popup>
		
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
import {mapState} from 'vuex';
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
			recycleCategory: '',
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
				iconPath: '../../static/location-map.png',
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
			searchKeyword: '',
			systemInfo: '',
			showInalipay: false,
			categoryShow: false,
			isChooseList: [],
			categoryList: [],
			chooseList: [],
			isShowMap: false,
			isLoading: true,
			flag: 0
		};
	},
	computed: {
		...mapState({
			community: state => state.community.community,
			oldCommunity: state => state.community.oldCommunity
		})
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
			// console.log(this.time);
		}
	},
	onLoad() {
		this.baseUrl = this.$tools.baseUrl;
		this.getSystemInfo();
	},
	onShareTimeline() {},
	onShareAppMessage() {},
	onShow() {
		if (!uni.getStorageSync('openid')) {
			this.$tools.toast('请先登录');
			setTimeout(() => {
				uni.switchTab({
					url: '../user/user'
				});
			}, 500);
			return;
		}
		// this.initMap();
		uni.getSystemInfo({
			success: (res) => {
				if (!res.locationEnabled || !res.locationAuthorized) {
					if(this.flag == 0) {
						uni.showModal({
							title: '提示',
							content: '请打开手机定位服务功能',
						})
					}
					this.isLoading = false;
					this.flag++;
					this.getLocation();
					return;
				}
				else if(res.hostName == 'WeChat'){
					this.systemInfo = 'WeChat';
					uni.authorize({
					  scope: 'scope.userLocation',
					  success: () => {
						  this.keepMap();
					  },
					  fail: (error) => {
						  this.isLoading = false;
					  }
					})
				}
				else if(res.hostName == 'alipay'){
					this.systemInfo = 'alipay'
					my.getSetting({
						success: (res) => {
							console.log(res)
							if(res.authSetting.location) {
								this.keepMap()
							}
							else {
								this.isLoading = false;
							}
						}
					})
				}
				console.log('systeminfo', this.systemInfo);
			},
			fail: (error) => {
				console.log('systemfail:', error)
			}
		})

		this.getList();
		this.resetData();
		// this.getLocation();
		// 在onload中uni.getStorageSync('userInfo').name可能还未设置完毕
		if(uni.getStorageSync('userInfo').name) {
			this.userName = uni.getStorageSync('userInfo').name;
		} else if(this.showInalipay === true) {
			this.userName = '支付宝用户';
		} else {
			this.userName = '微信用户'
		}
		// 切换页面时清空选中的标签
		this.isChooseList = [];
		// this.userName = uni.getStorageSync('userInfo').name || this.showInalipay ? '支付宝用户' : '微信用户';
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
		    iconPath: '../../static/location-map.png',
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
		  this.recycleCategory = '';
		},
		clickMap(p) {
		  if(this.systemInfo == 'WeChat') {
			  this.longitude = p.detail.longitude;
			  this.latitude = p.detail.latitude;
		  }
		  else if(this.systemInfo == 'alipay') {
			  this.longitude = p.longitude;
			  this.latitude = p.latitude;
		  }
		  // this.getSite();
		  this.covers = [{
		    latitude: this.latitude,
		    longitude: this.longitude,
		    id: 1,
		    width: 30,
		    height: 30,
		    iconPath: '../../static/location-map.png',	
		  }];
		  
		  this.getLocation();
		},
		
		// 更改地址，用于更改或点击地图之后
		getLocation(){
			const params = {
			  location: this.latitude+','+this.longitude,
			  sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
			};
			console.log('params',params);
			// 调用定位方法
			this.qqMap.reverseGeocoder({
				...params,
			  success: (res) => {
			    // 获取定位成功的结果
				if(this.community) {
					this.userCommunity = this.community;
					this.searchAddress(this.userCommunity);
					this.getSite();
					this.$store.dispatch('clearAddress');
					return;
				}
			    const community = res.result.formatted_addresses.recommend;
				this.userCommunity = community;
				this.getSite();
			    // 其他逻辑处理
			    // ...
			  },
			  fail: (error) => {
			    // 定位失败的处理
			    console.log('定位失败', error)
			  }
			})
		},
		// 保存上次选择的地址在切换页面时
		keepLocation() {
				const params = {
				  location: this.latitude+','+this.longitude,
				  sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
				};
				// 调用定位方法
				this.qqMap.reverseGeocoder({
					...params,
				  success: (res) => {
				    // 获取定位成功的结果
					if(this.oldCommunity) {
						this.userCommunity = this.oldCommunity;
						// 这里调用了getSite
						this.searchAddress(this.userCommunity);
						this.$store.dispatch('clearAddress');
						return;
					}
				    const community = res.result.formatted_addresses.recommend;
					this.userCommunity = community;
					this.getSite();
				    // 其他逻辑处理
				    // ...
				  },
				  fail: (error) => {
				    // 定位失败的处理
				    console.log('定位失败', error)
				  }
				})
		},
		// 定位当前位置
		initMap() {
		  this.isShowMap = true;
		  uni.getLocation({
		    type: 'gcj02',
		    success: res => {
		      this.longitude = res.longitude;
		      this.latitude = res.latitude;
		      this.covers = [{
		        latitude: res.latitude,
		        longitude: res.longitude,
		        id: 1,
		        width: 30,
		        height: 30,
		        iconPath: '../../static/location-map.png',
		      }];
		
		      // 等待异步回调结果返回后再调用
		      this.getLocation();
		      // this.getSite();
		    },
		    fail: (res) => {
		      // 处理错误情况
		    },
		  });
		},
		keepMap() {
			this.isShowMap = true;
			this.isLoading = true;
			uni.getLocation({
			  type: 'gcj02',
			  success: res => {
			    this.longitude = res.longitude;
			    this.latitude = res.latitude;
			    this.covers = [{
			      latitude: res.latitude,
			      longitude: res.longitude,
			      id: 1,
			      width: 30,
			      height: 30,
			      iconPath: '../../static/location-map.png',
			    }];
					
			    // 等待异步回调结果返回后再调用
			    this.keepLocation();
			    // this.getSite();
				this.isLoading = false;
			  },
			  fail: (res) => {
			    // 处理错误情况
			  },
			});
		},
		// 拉取授权
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
								this.initMap()
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
													this.initMap();
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
					else if(res.hostName == 'alipay') {
						my.getSetting({
							success: (res) => {
								console.log('success:',res)
								if(res.authSetting.location) {
									this.initMap()
								}
								else {
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
														this.initMap();
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
							},
							fail: (err) => {
								console.log('err:', err)
							}
						})
					}
				}
			})
		},
		// 比较范围
		getSite() {
			var ok = 0;
			this.$api.getAllArea().then(res => {
				const locationList = res.data;
				// console.log("data:",locationList)
				for (const location of locationList) {
				  const location1 = location.location.split(',');
				  const lat1 = parseFloat(location1[0]);
				  const lon1 = parseFloat(location1[1]);
				  // 获得经纬度比较
				  const lat2 = parseFloat(this.latitude);
				  const lon2 = parseFloat(this.longitude);
				  const R = 6371; // 地球半径（单位：公里）
			
				  const dLat = toRad(lat2 - lat1);
				  const dLon = toRad(lon2 - lon1);
				  // console.log(dLat);
				  // console.log(dLon);
			
				  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
					Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
					Math.sin(dLon / 2) * Math.sin(dLon / 2);
			
				  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				  const distance = R * c;
				  // console.log(distance)
				  if (distance <= location.distance) {
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
				width: 30,
				height: 30,
				iconPath: '../../static/location-map.png',	
			}]
			this.getSite();
		},
		async submit(type) {
			if(this.userName && this.recycleCategory && this.currentTime){
				if(!this.$tools.verifyTelPhone(this.userPhone)) {
					return
				}
				
				let result = await this.$api.getAlipay({
					openid: this.id
				})
				
				console.log(result)
				if(result.data === null) {
					this.$tools.toast('请在我的钱包中绑定支付宝账户再预约');
					return;
				}
					
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
					recycleCategory:this.recycleCategory
				})
				.then(res => {
					if (res.code == 200) {
						this.$tools.toast('下单成功');
							this.$store.commit('CLEARKEEPADDRESS');
							setTimeout(() => {
								//跳转到订单页面
								uni.navigateTo({
									url: '../order/order',
									success() {
										var page = getCurrentPages().pop();
										if (page == undefined || page == null) return;
									},
									fail(error) {
										console.log(error)
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
		},
		goBooking() {
			uni.navigateTo({
				url: '../booking/booking'
			})
		},
		// 逆地址解析
		searchAddress(keyword) {
			// console.log(this.latitude)
			this.searchKeyword = ''
		    this.qqMap.geocoder({
		        address: '浙江省湖州市'+keyword, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
				sig:'4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
		              success: (res) => {//成功后的回调
		                // console.log(res);
		                this.latitude = res.result.location.lat;
		                this.longitude = res.result.location.lng;
						this.userCommunity =  res.result.title;
						// this.community = res.result.title;
						this.covers = [{
							latitude: res.result.location.lat,
							longitude: res.result.location.lng,
							id: 0,
							width: 30,
							height: 30,
							iconPath: '../../static/location-map.png',	
						}];
						this.getSite();
		              },
		              fail: function(error) {
		                uni.showToast({
		                	title: '地址有误，请输入完整',
		                	icon: 'none'
		                });
		              },
		      })
		},
		// 点击分类
		showCategory() {
			this.categoryShow = true;
			this.$api.guidancePrice().then(res => {
				if(res.code === 200) {
					this.categoryList = res.data;
					for(let i = 0; i < this.categoryList.length; i++) {
						this.isChooseList[i] = false;
					}
				}
				else {
					this.$tools.toast('网络异常请稍后再试');
					this.categoryShow = false;
				}
			})
		},
		// 修改分类
		changeChoose(index) {
			this.isChooseList.splice(index, 1, !this.isChooseList[index]);
			// console.log(index, this.isChooseList)
		},
		// 确定分类
		decideCategory() {
			this.categoryShow = false;
			this.chooseList = [];
			this.recycleCategory = '';
			this.categoryList.forEach((item, index) => {
				if(this.isChooseList[index] == true) {
					this.chooseList.unshift(this.categoryList[index]);
				}
			})
			this.chooseList.forEach((item, index) => {
				if(index != this.chooseList.length - 1) {
					this.recycleCategory += item.name + '、';
				}
				else {
					this.recycleCategory += item.name;
				}
			})
			// console.log(this.chooseList)
		},
		goSuggest() {
			uni.navigateTo({
				url: '/pages/map-suggest/map-suggest'
			})
		},
		getSuggest(keyword) {
			this.qqMap.getSuggestion({
				sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
				keyword,
				region: '湖州市',
				region_fix: 1,
				success: res => {
					console.log(res);
				},
				fail: error => {
					console.log('fail:',error);
				}
			})
		},
		/** 获取设备 */
		getSystemInfo() {
			if(uni.getSystemInfoSync() === 'mp-alipay') {
				this.showInalipay = true
			}
		},
	}
};
</script>

<style lang="scss">
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: 'iconfont';  /* Project id 4143017 */
	  src: url('//at.alicdn.com/t/c/font_4143017_zxfqs47n4y.woff2?t=1693274620110') format('woff2'),
		   url('//at.alicdn.com/t/c/font_4143017_zxfqs47n4y.woff?t=1693274620110') format('woff'),
		   url('//at.alicdn.com/t/c/font_4143017_zxfqs47n4y.ttf?t=1693274620110') format('truetype');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 30upx;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.empty {
		text-align: center;
		margin: 100upx auto 120upx;
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
	.btn {
		width: 320upx;
		border-radius: 12upx;
		font-size: 32upx;
		font-weight: 400;
		color: #ffffff;
		line-height: 88upx;
	}
	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.mylocation {
			position: absolute;
			width: 30px;
			height: 30px;
			border-radius: 15px;
			right: 10px;
			bottom: 48vh;
			// background-color: #34cd99;
			opacity: 0.5;
			span {
				display: inline-block;
				font-size: 30px;
			}
		}
		.tolocation {
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 10vh;
			width: 100%;
			border: none;
			button {
				margin-top: 10px;
				background-color: #34cd99;
				color: #fff;
			}
		}
		.contain {
			// 相对定位让子元素有间隔但是地图组件没法拖动
			position: absolute;
			width: 95%;
			// bottom: 10vh;
			bottom: 0;
			// height: 340px;
			margin: 0 2.5%;
			.search {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				top: -35px;
				// bottom: 450upx;
				width: 213px;
				// height: 40upx;
				height: 28px;
				border-radius: 10px;
				background-color: #fff;
				overflow: hidden;
				.span-icon {
					margin-left: 10px;
				}
				input {
					padding: 5px 0 5px 5px;
					height: 100%;
					box-sizing: border-box;
					font-size: 12px;
				}
				view {
					display: flex;
					justify-content: center;
					align-items: center;
					// flex: 1; 
					// height: 100%; 
					background-color: #34cd99; 
					border-radius: 10px;
					width: 100upx;
					height: 100%;
						font-size: 24upx;
						color: #fff;
				}
			}
			
			.info {
				position: absolute;
				// height: 319px;
				height: 45vh;
				width: 100%;
				bottom: 1vh;
				border-radius: 20upx;
				background-color: #fff;
				box-sizing: border-box;
				overflow: hidden;
				font-size: 24upx;
				.info-contain {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding:20upx 20upx 100upx;
					height: 100%;
					box-sizing: border-box;
					view {
						input{
							font-size: 28upx;
							color: #898989;
						}
					}
					.info-header {
						display: flex;
						justify-content: space-between;
						font-size: 35upx;
					}
					.info-community {
						display: flex;
						align-items: center;
						color: #898989;
					}
					.info-phone {
						display: flex;
						align-items: center;
						color: #898989;
					}
					.info-date {
						display: flex;
						align-items: center;
						color: #898989;
					}
					.info-category {
						display: flex;
						align-items: center;
						color: #898989;
						padding: 0 0 10px;
					}
					.info-address {
						display: flex;
						align-items: center;
						color: #898989;
					}
				}

				.info-footer {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					padding: 3% 0;
					bottom: 0;
					width: 100%;
					height: 40upx;
					background: linear-gradient(to right, #4eb777, #00e1b4);
					text-align: center;
					.info-footer-left {
						display: flex;
						align-items: center;
						justify-content: center;
						flex: 1;
						border-right: 1upx #fff dashed;
						color: #fff;
					}
					.info-footer-right {
						display: flex;
						align-items: center;
						justify-content: center;
						flex: 1;
						color: #fff;
					}
					.info-footer-middle {
						display: flex;
						align-items: center;
						justify-content: center;
						flex: 1;
						border-right: 1upx #fff dashed;
						color: #fff;
					}
				}
			}
		}
		.popup-header {
			margin: 0 5vw 10vh;
			border-radius: 5vh;
			span {
				display: inline-block;
			}
		}
		.popup-contain {
			margin: 0 5vw;
			margin-bottom: 20px;
			.item {
				display: inline-block;
				margin-right: 10px;
				padding: 10px;
				line-height: 22px;
			}
		}
		.decision {
			text-align: center;
			margin-right: 5vw;
			background-color: #34cd99;
			border-radius: 10px;
			padding: 10px 30px;
			span {
				color: #fff;
			}
		}
	}


// .address {
// 	border-radius: 16upx;
// 	margin-top: -16upx;
// 	padding: 32upx 0;

// 	.icon {
// 		width: 31upx;
// 		height: 37upx;
// 		min-width: 31upx;
// 		margin-right: 20upx;
// 	}
// }

// .user {
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;

// 	.icon {
// 		font-size: 24upx;
// 		color: #3bb061;
// 		text-align: center;

// 		image {
// 			width: 40upx;
// 			height: 40upx;
// 		}
// 	}
// }

// .border-b {
// 	border-bottom: 1upx solid #efefef;
// }
// .input {
// 			margin: 0 20upx;
// 			padding: 0 20upx;
// 			line-height: 100upx;
// 			display: flex;
// 			align-items: center;
// 			font-size: 30upx;
// 			color: #999999;
// 			border-bottom: 2upx solid #ededed;
// 			background: #fff;
// 			position: relative;
// 			.sex{
// 				display: flex;
// 				margin: 20upx 0;
// 				.item{
// 					font-size: 32upx;
// 					color: #C4C4C4;
// 					width: 128upx;
// 					line-height: 72upx;
// 					text-align: center;
// 					background: #FFFFFF;
// 					border-radius: 12upx;
// 					border: 1upx solid #C4C4C4;
// 					margin-right: 32upx;
// 				}
// 				.cur{
// 					color: #3BB061;
// 					border: 1upx solid #3BB061;
// 				}
// 			}
// 			text {
// 				font-size: 30upx;
// 				width: 170upx;
// 				min-width: 170upx;
// 				color: #222;
// 			}
			
// 			.text-1{
// 				padding-right: 50upx;
// 				line-height: 1.6;
// 				margin: 10upx 0;
// 			}

// 			input {
// 				font-size: 28upx;
// 				color: #999999;
// 			}
// 		}

// .type-list {
// 	white-space: nowrap;

// 	.item {
// 		display: inline-block;
// 		width: 138upx;
// 		height: 172upx;
// 		background: #ffffff;
// 		box-shadow: 0px 0px 10upx 0 rgba(96, 202, 130, 0.29);
// 		border-radius: 12upx;
// 		margin: 24upx 7upx;
// 		text-align: center;
// 		font-size: 28upx;
// 		color: #606060;
// 		line-height: 1.2;
// 		box-sizing: border-box;
// 	}

// 	.cur {
// 		color: #3bb061;
// 		border: 4upx solid #3bb061;
// 	}

// 	image {
// 		width: 100upx;
// 		height: 100upx;
// 		margin-top: 12upx;
// 	}
// }

// .weight-list {
// 	display: flex;
// 	// justify-content: space-between;
// 	flex-wrap: wrap;

// 	.item {
// 		margin-bottom: 14upx;
// 		text-align: center;
// 		font-size: 30upx;
// 		color: #c4c4c4;
// 		width: 216upx;
// 		line-height: 80upx;
// 		background: #ffffff;
// 		border-radius: 16upx;
// 		border: 2upx solid #c4c4c4;
// 	}

// 	.item:not(:nth-child(3n)) {
// 		margin-right: 12upx;
// 	}

// 	.cur {
// 		color: #3bb061;
// 		border: 2upx solid #3bb061;
// 	}
// }

// .btn-group {
// 	display: flex;
// 	justify-content: space-between;
// 	padding: 32upx 0;

// 	.btn {
// 		width: 320upx;
// 		border-radius: 12upx;
// 		font-size: 32upx;
// 		font-weight: 400;
// 		color: #ffffff;
// 		line-height: 88upx;
// 	}

// 	.btn-1 {
// 		background: #f3f3f3;
// 		color: #666666;
// 	}
// 	.btn-1:after {
// 		border: 0;
// 	}

// 	.btn-2 {
//  		background: #0b8f3a;
// 	}
// }

// .empty {
// 	text-align: center;
// 	margin: 100upx auto 120upx;

// 	image {
// 		width: 196upx;
// 		height: 196upx;
// 		margin-bottom: 36upx;
// 	}

// 	view {
// 		font-size: 28upx;
// 		font-weight: 400;
// 		color: #c4c4c4;
// 	}
// }

// .card {
// 	.item {
// 		background: #fff;
// 		padding: 28upx;
// 		margin-bottom: 16upx;
// 		border-radius: 12upx;

// 		.address {
// 			display: flex;

// 			.icon {
// 				margin-top: 4upx;
// 			}
// 		}

// 		.icon {
// 			min-width: 32upx;
// 			width: 32upx;
// 			height: 32upx;
// 		}

// 		.radio {
// 			transform: scale(0.9);
// 		}
// 	}
// }

// .btn-3 {
// 	width: 700upx;
// 	margin: 0 auto 30upx;
// }
</style>
