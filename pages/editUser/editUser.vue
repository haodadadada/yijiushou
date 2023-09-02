<<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="input-group input-group-1">
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar($event)">
				<span style="position: absolute; left: 20px; margin-top: 52px; transform: translateY(-50%); font-size: 16px;">头像</span>
				<image class="avatar" :src="avatarUrl"></image>
			</button>
			<view class="name">
				<span>昵称</span>
				<input type="nickname"  class="weui-input" placeholder="请输入昵称" v-model="name"/>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<view class="input-group input-group-1" style="display: flex; flex-direction: column; justify-content: center; margin-top: 30px;">
			<image style="width: 86px; height: 86px; margin: 0 auto;" :src="avatarUrl"></image>
			<view class="name" >
				<span style="font-size: 16px;">昵称</span>
				<input type="nickname" placeholder="请输入昵称" v-model="name" class="ali-input" />
			</view>
		</view>
		<button
			class="AlipayButton"
		    type="primary"
		    size="default"
		    open-type="getAuthorize"
		    scope="userInfo"
		    @getAuthorize="onGetAuthorize"
		    @error="onAuthError"
			style="border-radius: 15px;"
		>
			点击获取授权信息
		</button>
		<!-- #endif -->


		<view class="m-30">
			<view class="btn" @click="submit">确认修改</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				openid:'',
				name: '',
				status:'',
				userInfo: {},
				avatarUrl: '',
				// canIUseAuthButton: my.canIUse('button.open-type.getAuthorize')
			}
		},
		onLoad() {
			// #ifdef MP-ALIPAY
			this.status = 2;
			// #endif
			// #ifdef MP-WEIXIN
			this.status = 1;
			// #endif
			this.openid=uni.getStorageSync('openid');
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
			if(this.userInfo.avatarUrl) {
				this.avatarUrl = this.userInfo.avatarUrl;
				this.name = this.userInfo.name;
			}
		},
		methods: {
			submit() {
				this.$api.editInfo({
					name: this.name,
					openid: uni.getStorageSync('openid'),
					avatarUrl: this.avatarUrl
				}).then(res => {
					this.$tools.toast(res.msg)
					if (res.code == 200) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
				})
			},
			onGetAuthorize() {
			    my.getOpenUserInfo({
			        fail: (res) => {
			          console.log(res)
			        },
			        success: (res) => {
						console.log(res)
			          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
					  if (userInfo.code == "10000") {
			            this.avatarUrl = userInfo.avatar
			            this.name = userInfo.nickName
			          }
			        }
			      })
			    },
			    // 授权失败回调
			    onAuthError() {
			      uni.showToast({
			        title: "授权失败回调"
			      })
			    },
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail 
				uni.uploadFile({
					url: 'https://www.19so.net/user/user/uploadAvatar',
					filePath: avatarUrl,
					name: 'file',
					success: res => {
						let data = JSON.parse(res.data);
						this.avatarUrl = data.data;
					},
					fail: error => {
						console.log('uploadfile', error)
					}
				})
			},
			hideKeyboard() {
				uni.hideKeyboard();
			},
			getUserInfo() {
				this.$api.getUserInfo({
					openid: this.openid
				}).then(res => {
					this.userInfo = res.data;
					uni.setStorageSync('userInfo', this.userInfo);
				});
			},
		}
	}
</script>

<style lang="scss">
	.AlipayButton {
		width: 50%;
		margin: 0 auto;
	}
	.input-group {
		margin-bottom: 20upx;
		.avatar-wrapper {
			position: relative;
			margin-top: 100px;
			.avatar {
				width: 86px;
				height: 86px;
			}
		}
		.name {
			display: flex;
			align-items: center;
			margin: 20px 20px 30vh;
			span {
				flex: 1;
			}
			input {
				flex: 4;
				background-color: #eee;
				border-radius: 10px;
				padding: 5px 10px;
			}
		}
		
		
		.insuranceimage {
			width: 300upx;
			height: 200upx;
			margin-left: 40upx;
			margin-top: 20upx;
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

	.menu {
		background: #fff;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-radius: 16upx;

		.card {
			width: 100%;
			height: 192upx;
			border-radius: 16upx;
			padding: 32upx 14upx 0;
			box-sizing: border-box;
			position: relative;

			.left {
				position: absolute;
				left: 14upx;
				top: 32upx;
				z-index: 100;

				.text-1 {
					font-size: 32upx;
					font-weight: 500;
				}

				.text-2 {
					font-size: 24upx;
					font-weight: 400;
					margin-top: 6upx;
				}
			}

			.bg {
				width: 94upx;
				height: 94upx;
				position: absolute;
				right: 150upx;
				top: 50upx;
				z-index: 0;
			}

			&-1 {
				background: #FCE1CF;

				.left {
					.text-1 {
						color: #411A00;
					}

					.text-2 {
						color: #8F715D;
					}
				}

				.pic {
					z-index: 1;
					position: absolute;
					right: 0;
					bottom: -24upx;
					width: 162upx;
					height: 154upx;
				}
			}

			&-2 {
				background: #C9FBEF;

				.left {
					.text-1 {
						color: #034435;
					}

					.text-2 {
						color: #4C8678;
					}
				}

				.pic {
					z-index: 1;
					position: absolute;
					right: -30upx;
					bottom: -10px;
					width: 214upx;
					height: 214upx;
				}
			}

			&-3 {
				background: #D1FDDC;

				.left {
					:first-child {
						color: #034814;
					}

					:last-child {
						color: #7CAD89;
					}
				}

				image {
					z-index: 1;
					position: absolute;
					right: 0;
					bottom: -10upx;
					width: 170upx;
					height: 170upx;
				}
			}

			&-4 {

				background: #FBD9D9;

				.left {
					:first-child {
						color: #600303;
					}

					:last-child {
						color: #B99393;
					}
				}

				image {
					z-index: 1;
					position: absolute;
					right: 0;
					bottom: 0;
					width: 192upx;
					height: 108upx;
				}
			}
		}
	}
	.swiper{
		width: 200upx;
		height: 40upx;
		margin-top: 20upx;
		.swiper-item{
			display: flex;
			align-items: center;
			image{
				width: 20upx;
				height: 20upx;
				border-radius: 20upx;
			}
			.size-18{
				font-size: 18upx;
				color: #02C99A;
				margin-left: 10upx;
			}
		}
	}
</style>
