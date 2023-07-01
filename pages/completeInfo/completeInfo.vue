<template>
	<view>
		<view class="section" v-if="recylerInfo.is_material == -1 || recylerInfo.is_material == 2">
			<!-- <view class="px-38 bg-white mt-18 py-50 primary size-26">
				您可以申请成为回收天使回收员，我们将在收到申请后48小时内审核，
				请确保您所提交信息的真实性，感谢您的支持。
			</view> -->
			<view @click="copy" class="primary px-38 mt-18 size-26">点击复制下载《天使回收员入驻协议》</view>
			<view class="title">提交资料</view>
			<view class="input-group">
				<view class="item" @click="uploadid(3)">
					<view class="label">上传保险单</view>
					<u-input type="text" border="none" placeholder="点击上传" disabled disabledColor="#ffffff"></u-input>
					<u-icon class="icon" name="arrow-right"></u-icon>
				</view>
				<image class="insuranceimage" @click="uploadid(3)" v-if="insuranceimage" :src="baseUrl + insuranceimage"
					mode="aspectFit"></image>
				<view class="item" @click="dateShow1=true">
					<view class="label">保单生效日期</view>
					<u-input type="text" border="none" v-model="time1" placeholder="请选择" disabled
						disabledColor="#ffffff"></u-input>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-datetime-picker :show="dateShow1" v-model="time1" @close="dateShow1 = false"
						@cancel="dateShow1 = false" @confirm="dateShow1 = false" mode="date">
					</u-datetime-picker>
				</view>
				<view class="item" @click="dateShow2=true">
					<view class="label">保单截止日期</view>
					<u-input type="text" border="none" v-model="time2" placeholder="请选择" disabled
						disabledColor="#ffffff"></u-input>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
					<u-datetime-picker :show="dateShow2" v-model="time2" @close="dateShow2 = false"
						@cancel="dateShow2 = false" @confirm="dateShow2 = false" mode="date">
					</u-datetime-picker>
				</view>
				<view class="item" @click="uploadDoc">
					<view class="label">上传协议照片</view>
					<u-input type="text" border="none" placeholder="点击上传" disabled disabledColor="#ffffff"></u-input>
					<u-icon class="icon" name="arrow-right"></u-icon>
				</view>
				<block v-if="images.length>0">
					<view class="flex-wrap">
						<view class="insuranceimage1" v-for="(item,index) in images" :key="index">
							<image :src="baseUrl + item" mode="aspectFit"></image>
							<view class="icon">
								<u-icon @click="del(index)" name="minus-circle-fill" color="red"></u-icon>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="btn" @click="submitApply1">确认</view>
		</view>
		<view class="section" v-else>
			<!-- <view class="px-38 bg-white mt-18 py-50 primary size-26">
				您可以申请成为回收天使回收员，我们将在收到申请后48小时内审核，
				请确保您所提交信息的真实性，感谢您的支持。
			</view> -->
			<view class="title">我的资料</view>
			<view class="input-group">
				<view class="item">
					<view class="label">保险单</view>
				</view>
				<image @click="preImg(recylerInfo.insuranceimage)" class="insuranceimage" :src="baseUrl + recylerInfo.insuranceimage"
					mode="aspectFit"></image>
				<view class="item" @click="dateShow1=true">
					<view class="label">保单生效日期</view>
					<u-input type="text" border="none" v-model="recylerInfo.insurancestarttime" placeholder="请选择" disabled
						disabledColor="#ffffff"></u-input>
				</view>
				<view class="item" @click="dateShow2=true">
					<view class="label">保单截止日期</view>
					<u-input type="text" border="none" v-model="recylerInfo.insuranceendtime" placeholder="请选择" disabled
						disabledColor="#ffffff"></u-input>
				</view>
				<view class="item">
					<view class="label">协议照片</view>
				</view>
					<view class="flex-wrap">
						<view class="insuranceimage1" v-for="(item,index) in recylerInfo.images" :key="index">
							<image @click="preImgs(recylerInfo.images,index)" :src="baseUrl + item" mode="aspectFit"></image>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('../../common/qqmap-wx-jssdk.min.js')
	var qqmapsdk;
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				recylerInfo:'',
				tabCur: 1,
				area: '',
				checked: true,
				dateShow1: false,
				dateShow2: false,
				time1: '',
				time2: '',
				phone: '',
				idnumber: '',
				nickname: '',
				idoneimage: '',
				idtwoimage: '',
				workcity: '',
				province: '',
				city: '',
				district: '',
				insuranceimage: '', //保单照片
				baseUrl: '',
				recylename: '',
				latitude: '',
				longitude: '',
				address: '',
				image: '',
				images: [],
				protocol: '',
			};
		},
		onShow() {
			if (!uni.getStorageSync('openid')) {
				uni.switchTab({
					url: '../user/user'
				})
				return
			}
		},
		onLoad() {
			this.baseUrl = this.$tools.baseUrl
			this.getProtocol()
			this.time1 = Number(new Date())
			this.time2 = Number(new Date())
			qqmapsdk = new QQMapWX({
				key: 'RDYBZ-4CX6P-BUND3-LGDQV-UMAS7-SCBYS-4CX6P-BUND3-LGDQV-UMAS7-SCBYS'
			});
			this.getRecyclerInfo()
		},
		watch: {
			time1(e) {
				var time = new Date(e);
				var y = time.getFullYear();
				var month = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var m = time.getMinutes();
				var s = time.getSeconds();
				month = month < 10 ? ('0' + month) : month;
				m = m < 10 ? ('0' + m) : m;
				d = d < 10 ? ('0' + d) : d;
				this.time1 = `${y}-${month}-${d}`
			},
			time2(e) {
				var time = new Date(e);
				var y = time.getFullYear();
				var month = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var m = time.getMinutes();
				var s = time.getSeconds();
				month = month < 10 ? ('0' + month) : month;
				m = m < 10 ? ('0' + m) : m;
				d = d < 10 ? ('0' + d) : d;
				this.time2 = `${y}-${month}-${d}`
			}
		},
		methods: {
			getRecyclerInfo(){
				this.$api.getRecyclerInfo({
					openid:uni.getStorageSync('openid')
				}).then(res => {
					if(res.code==1){
						this.recylerInfo = res.data
						if(res.data.status==2){
							this.$tools.toast('您的资料审核未通过，请检查后重新提交')
						}
						if(res.data.status==0){
							this.$tools.toast('您的资料正在审核中，请耐心等待')
						}
					}
				})
			},
			getProtocol() {
				this.$api.getProtocol().then(res => {
					this.protocol = res.data.protocol_file
				})
			},
			// 选择地区
			selectArea(e) {
				console.log(e)
				this.workcity = `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
				this.province = `${e.detail.value[0]}`
				this.city = `${e.detail.value[1]}`
				this.district = `${e.detail.value[2]}`
			},
			uploadid(e) {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						this.$api.uploadImg(chooseImageRes).then(res => {
							console.log(res)
							if (e == 1) {
								this.idoneimage = res[0]
							} else if (e == 2) {
								this.idtwoimage = res[0]
							} else if (e == 3) {
								this.insuranceimage = res[0]
							} else if (e == 4) {
								this.image = res[0]
							}
						})
					}
				})
			},
			uploadDoc() {
				uni.chooseImage({
					count: 9,
					success: (chooseImageRes) => {
						this.$api.uploadImg(chooseImageRes).then(res => {
							console.log(res)
							this.images.push(...res)
						})
					}
				})
			},
			del(i) {
				this.images.splice(i, 1)
			},
			copy() {
				uni.setClipboardData({
					data: this.protocol,
					success: () => {
						this.$tools.toast('复制成功，请去下载')
					}
				})
			},
			preImg(url){
				console.log(url)
				uni.previewImage({
					urls:[this.baseUrl + url]
				})
			},
			preImgs(url,i){
				let urls = []
				console.log(i)
				url.forEach(item=>{
					urls.push(this.baseUrl + item)
				})
				uni.previewImage({
					urls,
					count:i
				})
			},
			submitApply1() {
				this.$api.completeInfo({
					openid: uni.getStorageSync('openid'),
					insuranceimage: this.insuranceimage,
					insurancestarttime: this.time1,
					insuranceendtime: this.time2,
					images: this.images.toString(),
					id:this.recylerInfo.id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.$tools.toast('提交成功，请耐心等待')
						setTimeout(() => {
							uni.redirectTo({
								url: '../applySuccess/applySuccess'
							})
						}, 1000)
					} else {
						this.$tools.toast(res.msg)
					}
				})
			},
			selectMap() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.latitude = res.latitude
						this.longitude = res.longitude
						this.address = res.address
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: (res1) => {
								console.log(res1)
								this.city = res1.result.ad_info.district
							},
							fail: err => {
								console.log(err)
							}
						});
					}
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

	.section {
		padding: 10upx 0 40upx;

		.title {
			font-size: 30upx;
			font-weight: 500;
			color: #222222;
			padding: 40upx 40upx 26upx;
		}

		.id-card {
			padding: 0 40upx 18upx;

			.card {
				border-radius: 12upx;

				image {
					width: 308upx;
					height: 184upx;
					padding: 20upx 10upx;
					background: #FFFFFF;
					border-radius: 12upx;
				}

				view {
					text-align: center;
					font-size: 28upx;
					font-weight: 400;
					color: #979797;
					margin-top: 20upx;
				}
			}
		}

		.input-group {
			background: #fff;
			margin-bottom: 20upx;

			.insuranceimage {
				width: 300upx;
				height: 200upx;
				margin-left: 40upx;
				margin-top: 20upx;
				background: #f5f5f5;
				position: relative;
			}

			.item {
				display: flex;
				align-items: center;
				height: 116upx;
				border-bottom: 1upx solid #F6F6F6;
				padding: 0 42upx;
				position: relative;

				.label {
					width: 240upx;
					font-size: 30upx;
					font-weight: 400;
					color: #222222;
				}


				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 100%;
				}

				/deep/ .uni-input {
					flex: 1;
					width: 100%;
				}

				.icon {
					position: absolute;
					right: 40upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			&-1 {
				.item {
					.label {
						width: 140upx;
					}
				}
			}
		}

		.btn {
			width: 524upx;
			line-height: 96upx;
			margin: 20upx auto;
		}
	}

	.flex-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.insuranceimage1 {
		position: relative;
		margin-left: 40upx;
		margin-top: 20upx;


		image {
			width: 300upx;
			height: 200upx;
			background: #f5f5f5;
		}

		.icon {
			position: absolute;
			right: 10upx;
			top: 10upx;
		}
	}
</style>
