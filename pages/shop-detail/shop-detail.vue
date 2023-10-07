<template>
	<div class="content">
		<view class="bgc"></view>
		<view class="img">
			<img :src="productImg" alt="">
		</view>
		<view class="contain" style="width: 100%;">
			<view class="input">
				<text>商品名称</text>
				<input type="text" value="" :value="productName" :disabled="true" />
			</view>
			<view class="input">
				<text>商品价格</text>
				<input type="text" value=""  :value="productPrice + '分'" :disabled="true" />
			</view>
			<view class="input">
			  <text>收件人</text>
			  <input type="text" v-model="userName" placeholder="请输入姓名" />
			</view>
		
			<view class="input">
				<text>手机号</text>
				<input type="text" value="" placeholder="请输入手机号" v-model="userPhone" />
			</view>
			<view class="input">
				<text>收件地址</text>
				<input type="text" value="" placeholder="请输入地址" v-model="userCommunity" />
			</view>
			<view class="input">
				<text>具体地址</text>
				<input type="text" value="" placeholder="请输入详细地址" v-model="userAddress" />
			</view>
			<view class="footer">
				<view class="address"><span @click="addressPopupShow = true">地址簿</span></view>
				<view class="submit"><span @click="submit">兑换</span></view>
			</view>
		</view>
		<u-modal :show="show" showCancelButton=true confirmColor="#34cd99" @confirm="confirm" @cancel="show = false">
			<view style="text-align: center;">确定要兑换吗?</view>
		</u-modal>
		
		<u-popup :show="addressPopupShow" mode="bottom" @close="addressPopupShow = false">
			<view class="empty" v-if="list.length == 0">
				<image src="../../static/empty.png" mode="aspectFill"></image>
				<view>添加地址, 送货上门</view>
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
	</div>
</template>

<script>
import community from '../../store/modules/community';
	export default {
		data() {
			return {
				show: false,
				productName: '',
				productPrice: '',
				productImg: '',
				productId: '',
				userName: '',
				userPhone: '',
				userAddress: '',
				userCommunity: '',
				addressPopupShow: false,
				list: [],
				latitude: '',
				longitude: '',
				site: false
			}
		},
		methods: {
			async submit() {
				if(!this.userName && !this.userPhone && !this.userAddress && !this.userCommunity) {
					this.$tools.toast('请填写完整信息');
					return;
				}
				if(!this.$tools.verifyTelPhone(this.userPhone)) {
					this.$tools.toast('请填写正确的手机号码');
					return;
				}
				// await this.searchAddress(this.userCommunity);
				// if(!this.site) 
				// 	return;
				this.show = true;
			},
			confirm() {
				const {productId, productName, productPrice, productImg, userName, userPhone, userCommunity, userAddress} = this;
				this.show = false;
				this.$api.buyProduct(JSON.stringify({
					userId: uni.getStorageSync('openid'),
					productId,
					productName,
					community: userCommunity,
					address: userAddress,
					phone: userPhone,
					payPoints: productPrice,
					productImg,
					userName
				}))
				.then(res => {
					console.log(res)
					if(res.code === 200) {
						this.$tools.toast('兑换成功, 客服会稍后联系您');
						const {address, community, payPoints, phone, productName, productImg, userName} = this;
						const id = res.data;
						// 跳转到shop页面
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/shopOrder-detail/shopOrder-detail?address=${userAddress}&community=${userCommunity}&id=${id}&payPoints=${productPrice}&phone=${userPhone}&productName=${productName}&productImg=${productImg}&userName=${userName}`
							})
						}, 1000)
					}
					if(res.code === 404) {
						this.$tools.toast('积分不足');
					}
				})
				.catch(error => {
					if(error.statusCode === 400) {
						this.$tools.toast('系统错误请稍后再试');
					}
				})
			},
			getList() {
				this.$api
					.userAddress({
						userId: uni.getStorageSync('openid')
					})
					.then(res => {
						this.list = res.data;
					});
			},
			selectAddress(item) {
				this.userName = item.userName;
				this.userAddress = item.address;
				this.userCommunity = item.community;
				this.userPhone = item.userPhone;
				this.addressPopupShow = false;
			},
			addAddress() {
				this.addressPopupShow = false;
				uni.navigateTo({
					url: '../addAddress/addAddress?source=shop-detail'
				});
			},
			searchAddress() {
			    this.qqMap.geocoder({
			        address: '浙江省湖州市'+this.userCommunity, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
					sig:'4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
			              success: (res) => {//成功后的回调
			                // console.log(res);
			                this.latitude = res.result.location.lat;
			                this.longitude = res.result.location.lng;
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
					  this.site = false;
					}
					this.site = true;
				  });
				
				  function toRad(value) {
					return value * Math.PI / 180;
				  }
			},
		},
		onLoad(option) {
			this.productName = option.productName;
			this.productImg = option.productImg;
			this.productId = option.productId;
			this.productPrice = option.productPrice;
		},
		onShow() {
			this.getList();
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		.bgc {
			position: absolute;
			top: 0;
			width: 100%;
			height: 15vh;
			background-color: #34cd99;
			z-index: 0;
		}
		.img {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			height: 20vh;
			width: 90vw;
			margin: 5vh auto 5vh;
			background-color: #fff;
			border-radius: 10px;
			box-shadow: 2px 2px 4px #ccc;
			img {
				width: 15vh;
				height: 15vh;
			}
		}
	
		.input {
			margin: 0 5vw;
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
			
			.text-1 {
				padding-right: 50upx;
				line-height: 1.6;
				margin: 10upx 0;
			}
	
			input {
				font-size: 28upx;
				color: #999999;
			}
		}
		.footer {
			display: flex;
			justify-content: space-between;
			width: 90vw;
			margin: 0 auto;
			.address {
				text-align: center;
				margin: 20px 0 20px;
				span {
					padding: 10px 30px;
					background: linear-gradient(to left, #4eb777, #00e1b4);
					border-radius: 20px;
				}
			}
			.submit {
				text-align: center;
				margin: 20px 0 20px;
				span {
					padding: 10px 40px;
					background: linear-gradient(to left, #4eb777, #00e1b4);
					border-radius: 20px;
				}
			}
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
	}
</style>