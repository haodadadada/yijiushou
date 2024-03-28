<template>
	<view class="content pb-30">
		<view class="contain" style="width: 100%;">
			<view class="input">
				<text>回收人</text>
				<input class="flex-1" type="text" value="" placeholder="请输入联系人姓名" v-model="userName" />
			</view>
			<view class="input">
				<text>手机号</text>
				<input class="flex-1" type="text" value="" placeholder="请输入手机号码" v-model="userPhone" />
			</view>
			<view class="input" @click="handleShowPicker">
			  <text>地区</text>
			  <input class="flex-1" type="text" v-model="address" placeholder="请选择地址信息" disabled="true"  :disabled="true"/>
			</view>
		
			<view class="input">
				<text>详细地址</text>
				<textarea v-model="addressDetail"></textarea>
			</view>
			<view v-if="id" class="btn" @click="edit">确认修改</view>
			<view v-else class="btn" @click="submit">保存地址</view>
		</view>
		<cc-selectDity :province="province" :city="city" :area="area" :show="showPicker" @sureSelectArea="onsetCity" @hideShow="onhideShow"  @changeClick="changeClick"></cc-selectDity>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				userName: '',
				userPhone: '',
				address: '',
				addressDetail: '',
				id: '',
				
				province: '浙江省',
				city: '杭州市',
				area: '上城区',
				showPicker: false,
			};
		},
		computed: {
		},
		onLoad(e) {

		},
		onShow() {

		},
		methods: {
			async submit() {
				if (this.userName && this.userPhone && this.address && this.addressDetail) {
					if(!this.$tools.verifyTelPhone(this.userPhone)) {
						this.$tools.toast('请填写正确的手机号');
						return;
					}
					let result = await this.$api.deliverySaveAddress({
						userId: uni.getStorageSync('openid'),
						name: this.userName,
						phone: this.userPhone,
						address: this.address,
						detailAddress: this.addressDetail
					})
					if(result.code === 200) {
						this.$tools.toast('保存成功');
						uni.navigateBack(-1);
					}
						
				} else {
					uni.showToast({
						title: '请填写地址信息',
						icon: 'none'
					});
				}
			},
			// 修改地址
			edit() {
				if (this.userName && this.userPhone && this.address && this.addressDetail) {
					if(!this.$tools.verifyTelPhone(this.userPhone)) {
						this.$tools.toast('请输入正确的手机格式');
						return
					}
				} else {
					uni.showToast({
						title: '请填写地址信息',
						icon: 'none'
					});
				}
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
			
			handleShowPicker() {
				this.showPicker = true;
				// 默认值
				this.province = '浙江省';
				this.city = '湖州市';
				this.area = '吴兴区';
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
			padding: 10px 20upx;
			display: flex;
			justify-content: space-between;
			font-size: 30upx;
			color: #999999;
			border-bottom: 2upx solid #ededed;
			position: relative;
			input {
				background-color: #fff;
				padding: 10px;
				border-radius: 10px;
				
			}
			textarea {
				background-color: #fff;
				padding: 10px;
				border-radius: 10px;
				height: 68px;
			}
			text {
				font-size: 30upx;
				padding-top: 10px;
				width: 140upx;
				min-width: 140upx;
				margin-right: 10px;
				color: #222;
				text-align-last: justify;
				text-align: justify;
			}
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
