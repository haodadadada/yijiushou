<template>
	<view class="content pb-30">
		<map :longitude="longitude" :latitude="latitude" :scale="16" style="width: 100%; height: 50vh;" :markers="covers" @click="clickMap" v-if="isShowMap"></map>
		<view class="mylocation" @click.stop="initMap" v-if="isShowMap">
			<!-- <span class="iconfont">&#xec32;</span> -->
			<img src="../../static/icon/dingwei.png" alt="" style="width: 30px; height: 30px;">
		</view>
		<view class="tolocation" v-if="!isShowMap && !isLoading">
			<view>无法定位到您</view>
			<view>请在手机中查看是否开启定位功能并且授权定位</view>
			<button @click="getAuthorize">刷新定位</button>
		</view>
<!-- 		 <view class="search-container">
			 <view class="search-button"><span @click="searchAddress(searchKeyword)" class="iconfont">&#xeafe;</span></view>
		      <input class="search-input" type="text" placeholder="例:湖州万达广场" v-model="searchKeyword" @confirm="searchAddress(searchKeyword)"/>
		</view> -->
		<view class="contain" style="width: 100%;">
			<view class="input">
					<text>联系人</text>
					<input type="text" value="" placeholder="请输入联系人姓名" v-model="userName" />
				</view>
			<!-- 	<view class="input">
					<text>性别</text>
					<view class="sex-check">
						<view class="sex" v-for="item in sexList" :key="item.id">
							<view class="item" :class="{cur:gender==item.id}"
							@click="gender=item.id">{{item.name}}</view>
						</view>
					</view>
				</view> -->
				<view class="input">
					<text>手机号码</text>
					<input type="text" value="" placeholder="请输入手机号码" v-model="userPhone" />
				</view>
				<view class="input" @click="goSuggest">
				  <text>地址信息</text>
				  <input type="text" v-model="userCommunity" placeholder="请输入地址信息" disabled="true" />
				</view>
			
				<view class="input">
					<text>门牌号</text>
					<input type="text" value="" placeholder="例:xx号xx楼xx门牌" v-model="address" />
				</view>
				<view v-if="id" class="btn" @click="edit">确认修改</view>
				<view v-else class="btn" @click="submit">保存地址</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				longitude: 0, // 经度
				latitude: 0, // 纬度

				region: '',
				txt: '选择社区',
				customItem: '',
				userCommunity: '', // 存储选中的社区
				areaId:'',
				userId:'',
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
				userName: '',
				userPhone: '',
				address: '',				
				id:'',
				source:'',
				searchKeyword:'',
				covers: [{
					latitude: 0,
					longitude: 0,
					id: 1,
					width: 0,
					height: 0,
					iconPath: '/static/location-map.png',
				}],
				isShowMap: false,
				isLoading: true,
				flag: 0
			};
		},
		computed: {
			...mapState({
				community: state => state.community.community
			})
		},
		onLoad(e) {
			this.baseUrl = this.$tools.baseUrl			
			if(e.source){
				this.source = e.source
			}
			// if(e.id){
			// 	this.getAddress(e.id)
			// }else{
			// 	this.getAuthorize();
			// }
			// this.getSite();
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					if (!res.locationEnabled || !res.locationAuthorized) {
						if(this.flag == 0) {
							uni.showModal({
								title: '提示',
								content: '请打开手机定位服务功能',
							})
						}
						this.flag++;
						this.isLoading = false;
						this.getLocation();
						return;
					}
					else if(res.hostName == 'WeChat'){
						this.systemInfo = 'WeChat';
						uni.authorize({
						  scope: 'scope.userLocation',
						  success: () => {
							  this.initMap();
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
								if(res.authSetting.location) {
									this.initMap()
								}
								else {
									this.isLoading = false;
								}
							}
						})
					}
				}
			})
			this.$store.commit('CLEARKEEPADDRESS');
			// this.getSite();
		},
		methods: {
			initMap(){
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
							width: 20,
							height: 20,
							iconPath: '/static/location-map.png',	
						}]
						// 等待异步回调结果返回后再调用
						this.getLocation()
						this.isLoading = false;
				    },
				    fail: res => {
				        }
				      });
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
					if(this.community) {
						this.userCommunity = this.community;
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
					if(this.community) {
						this.userCommunity = this.community;
						this.searchAddress(this.userCommunity);
						this.getSite();
						this.$store.dispatch('clearAddress');
						return;
					}
				    console.log('定位失败', error)
				  }
				})
			},
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
				
					  if (distance <= 5 && distance >= -5) {
						this.areaId = location.id;
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

			// 获取修改地址信息
			getAddress(id){
				this.id = id;
				this.$api.getAddress({
					id:id
				}).then(res=>{
					this.userName = res.data.userName
					this.userPhone = res.data.userPhone
					this.gender = res.data.gender
					this.areaId = res.data.areaId
					this.userCommunity = res.data.community
					this.address = res.data.address
					this.userId = res.data.userId
					var location = res.data.location
					var location1 = location.split(',');
					this.latitude = location1[0];
					this.longitude = location1[1];
					this.covers = [{
						latitude: this.latitude,
						longitude: this.longitude,
						id: 1,
						width: 20,
						height: 20,
						iconPath: '/static/location-map.png',	
					}];
					this.getSite();
				})
				// 
			},
			change(data) {
				this.txt = data.data.join('');
				console.log(data.data.join(''));
			},
			submit() {
				if (this.userName && this.userPhone && this.address&&this.areaId) {
						if(!this.$tools.verifyTelPhone(this.userPhone)) {
							return
						}
						this.$api.addAddress({
							userId: uni.getStorageSync('openid'),
							id : this.id,
							userName : this.userName,
							userPhone : this.userPhone,
							gender : this.gender,
							areaId : this.areaId,
							community : this.userCommunity,
							address : this.address,
							location : this.latitude+','+this.longitude
						}).then(res=>{
							// this.$tools.toast(res.msg)
							if(res.code==200){
								if(this.source=='placeOrder'){
									uni.navigateBack({
										delta:1
									})
								}else{
									uni.redirectTo({
										url:'../address/address'
									})
								}
							}
						})
				} else {
					uni.showToast({
						title: '请填写地址信息',
						icon: 'none'
					});
				}
			},
			// 修改地址
			edit() {
				if (this.userName && this.userPhone && this.address &&this.areaId) {
					if(!this.checkTelephone(this.userPhone)) {
						this.$tools.toast('请输入正确的手机格式');
						return
					}
					this.$api.siteAddres({
						userId: uni.getStorageSync('openid'),
						userName: this.userName,
						userPhone: this.userPhone,
						gender: this.gender,
						areaId:this.areaId,
						community: this.userCommunity,
						address: this.address,  
						id:this.id,
						location: this.latitude+','+this.longitude
					}).then(res=>{
						this.$tools.toast(res.msg)
						if(res.code==200){
							uni.redirectTo({
								url:'../address/address'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请填写地址信息',
						icon: 'none'
					});
				}
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
				// this.getSite()
				this.getLocation()
				this.covers = [{
					latitude: this.latitude,
					longitude: this.longitude,
					id: 1,
					width: 20,
					height: 20,
					iconPath: '/static/location-map.png',	
				}]
			},
			searchAddress(keyword) {
				// console.log(this.latitude)
				this.searchKeyword = ''
			    this.qqMap.geocoder({
			        address: '浙江省湖州市'+keyword, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
					sig:'4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
			              success: (res) => {//成功后的回调
			                this.latitude = res.result.location.lat;
			                this.longitude = res.result.location.lng;
							this.userCommunity = res.result.title;
							this.covers = [{
								latitude: res.result.location.lat,
								longitude: res.result.location.lng,
								id: 0,
								width: 20,
								height: 20,
								iconPath: '/static/location-map.png',	
							}];
							console.log(this.latitude)
							this.getSite()
			              },
			              fail: function(error) {
			                uni.showToast({
			                	title: '地址有误，请输入完整',
			                	icon: 'none'
			                });
			              },
			      })
			},
			checkTelephone(telephone) {
			    var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
			    if (!reg.test(telephone)) {
			        return false;
			    } else {
			        return true;
			    }
			},
			goSuggest() {
				uni.navigateTo({
					url: '/pages/map-suggest/map-suggest'
				})
			},
		}
	};
</script>

<style lang="scss">
	@font-face {
	  font-family: 'iconfont';  /* Project id 4207593 */
	  src: url('//at.alicdn.com/t/c/font_4207593_wya1fcygdz.woff2?t=1693219668648') format('woff2'),
		   url('//at.alicdn.com/t/c/font_4207593_wya1fcygdz.woff?t=1693219668648') format('woff'),
		   url('//at.alicdn.com/t/c/font_4207593_wya1fcygdz.ttf?t=1693219668648') format('truetype');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 26upx;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.mylocation {
		position: absolute;
		width: 30px;
		height: 30px;
		border-radius: 15px;
		right: 10px;
		top: 44vh;
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
		padding: 10vh 0;
		width: 100%;
		border: none;
		button {
			margin-top: 10px;
			background-color: #34cd99;
			color: #fff;
		}
	}
	.search-container {
	  display: flex;
	  align-items: center;
	  margin-bottom: 10px;
	  // background-color: #34cd99;
	}
	
	.search-input {
	  flex: 1;
	  height: 36px;
	  margin-right: 20px;
	  padding: 0 20px;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
	
	.search-button {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 36px;
	  padding: 20px 5px 20px 20px;
	  // background-color: #007AFF;
	  border: none;
	  // border-radius: 4px;
	  // cursor: pointer;
	  color: #ccc;
	  span {
		  font-size: 26px;
	  }
	}

	page {
		background-color: #fff;
	}

	.map {
		width: 100%;
		height: 588upx;
	}

	.address {
		border-radius: 16upx;
		margin-top: -16upx;
		padding: 32upx 0;

		.icon {
			width: 32upx;
			height: 32upx;
		}
	}

	.content {
		width: 100%;
		.addAddress {
			width: 80%;
			margin-left: 10%;
			// margin-left: 10%;
			height: 80upx;
			background-color: #eabd66;
			border-radius: 40upx;
			font-size: 32upx;
			color: #ffffff;
			line-height: 80upx;
			text-align: center;
		}
		
		.icon {
			position: absolute;
			right: 20upx;
			top: 50%;
			transform: translateY(-50%);
			width: 30upx;
		}

		.input {
			margin: 0 20upx;
			padding: 0 20upx;
			line-height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			color: #999999;
			border-bottom: 2upx solid #ededed;
			background: #fff;
			position: relative;
			.sex-check {
				display: flex;
				.sex{
					display: flex;
					margin: 20upx 0;
					.item{
						font-size: 25upx;
						color: #C4C4C4;
						width: 128upx;
						line-height: 50upx;
						text-align: center;
						background: #FFFFFF;
						border-radius: 20upx;
						border: 1upx solid #C4C4C4;
						margin-right: 32upx;
					}
					.cur{
						color: #3BB061;
						border: 1upx solid #3BB061;
					}
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

		.input1 {
			width: 90%;
			height: 100upx;
			margin-left: 5%;
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #999999;
			border-bottom: 2upx solid #ededed;

			text {
				font-size: 30upx;
			}

			input {
				font-size: 28upx;
				color: #999999;
			}
		}
	}
	.option-item{
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btn{
		margin: 20px auto;
		background: linear-gradient(to right, #48b97e, #0be0b2);
		line-height: 68rpx;
	}
</style>
