<template>
	<view>
		<view class="tabs">
			<view class="item" :class="{'cur':curTab==item.id}" v-for="(item,index) in tabs" :key="index"
				@click="selectTab(item.id)">
				{{item.title}}
			</view>
		</view>
		<view class="item-1" v-show="curTab==1">
			<view class="card">
				<image class="avatar" :src="userInfo.avatar" mode=""></image>
			</view>
			<view class="qrcode">
				<image class="logo" src="../../static/logo.png" mode=""></image>
				<image class="qr-pic" :src="userInfo.qrcode" mode=""></image>
				<view class="mt-27">扫描二维码</view>
				<view>发现更多精彩</view>
			</view>
			<view class="btn-wrap">
				<button open-type="share" class="item">
					分享
				</button>
				<view class="item btn-2" @click="save">
					<view>保存到相册</view>
				</view>
			</view>
		</view>
		<view v-show="curTab==2">
			<view class="record">
				<view class="header">
					<view class="num">{{total}}</view>
					<view class="title">推广用户 </view>
				</view>
				<view class="empty" v-if="list.length==0">
					<image src="../../static/empty.png" mode="widthFix"></image>
					<view>添加地址，预约你的回收天使～</view>
				</view>
				<view class="list">
					<view class="item" v-for="item in list" :key="item.id">
						<image class="avatar" :src="item.avatar" mode=""></image>
						<text class="name">{{item.nickname}}</text>
						<view class="time">{{item.createtime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						id: 1,
						title: '推广二维码'
					},
					{
						id: 2,
						title: '推广记录'
					}
				],
				curTab: 1,
				page: 1,
				list: [],
				total: [],
				userInfo: uni.getStorageSync('userInfo')
			};
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/user/user?scene=' + this.userInfo.id,
			}
		},
		methods: {
			selectTab(e) {
				this.curTab = e
			},
			getList() {
				this.$api.promoteList({
					openid: uni.getStorageSync('openid'),
					page: this.page
				}).then(res => {
					this.total = res.data.total
					this.list.push(...res.data.data)
				})
			},
			//点击保存图片
			save() {
				let that = this
				//若二维码未加载完毕，加个动画提高用户体验
				wx.showToast({
					icon: 'loading',
					title: '正在保存图片',
					duration: 1000
				})
				//判断用户是否授权"保存到相册"
				wx.getSetting({
					success(res) {
						//没有权限，发起授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							wx.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //用户允许授权，保存图片到相册
									that.savePhoto();
								},
								fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
									wx.openSetting({
										success() {
											wx.authorize({
												scope: 'scope.writePhotosAlbum',
												success() {
													that.savePhoto();
												}
											})
										}
									})
								}
							})
						} else { //用户已授权，保存到相册
							that.savePhoto()
						}
					}
				})
			},
			//保存图片到相册，提示保存成功
			savePhoto() {
				let that = this
				wx.downloadFile({
					url: that.userInfo.qrcode,
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								wx.showToast({
									title: '保存成功',
									icon: "success",
									duration: 1000
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		display: flex;
		justify-content: space-around;
		background: #fff;

		.item {
			font-size: 30upx;
			color: #606060;
			line-height: 68upx;
			padding: 0 100upx;
			margin: 20upx 0;
		}

		.cur {
			color: #fff;
			line-height: 68upx;
			background: #0B8F3A;
			border-radius: 20upx;
			
		}
	}
	.item-1{
		background: url(https://youjin.phpcaff.cn/uploads/20220503/660b6cf8fd033264926841940f68af46.png) no-repeat #08846F;;
		background-size: contain;
		min-height: 100vh;
	}
	.card {
		position: relative;
		padding-top: 1upx;

		.avatar {
			width: 144upx;
			height: 144upx;
			box-shadow: 0px 8upx 8upx 2upx rgba(124, 124, 124, 0.25);
			border-radius: 100%;
			margin: 50upx auto;
			display: block;
		}

		
	}
	.qrcode {
		width: 660upx;
		height: 620upx;
		background: #FFFFFF;
		border-radius: 16upx;
		margin: 460upx auto 0;
		text-align: center;
		.qr-pic{
			width: 284upx;
			height: 284upx;
			background: #FFFFFF;
			border: 1px solid #707070;
			display: block;
			margin: 0 auto;
		}
		.logo{
			width: 251upx;
			height: 64upx;
			padding: 50upx 0 40upx;
		}
		view{
			font-size: 28upx;
			color: #666666;
			letter-spacing: 5upx;
		}
	}

	.btn-wrap {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff;
		.item {
			line-height: 98upx;
			width: 375upx;
			min-width: 375upx;
			text-align: center;
			font-size: 30upx;
			color: #000000;
			padding-left: 0;
			padding-right: 0;
			margin-left: 0;
			margin-right: 0;
		}
		.btn-2{
			background: #0B8F3A;
			view{
				color: #fff;
			}
		}
		.item:after {
			border: none;
		}
	}

	.record {
		margin: 30upx;
		.header {
			background-image: url(https://youjin.phpcaff.cn/uploads/20220503/b097bad01b4a16e1871db89222bf5cc3.png);
			text-align: center;
			background-size: 100% 100%;
			height: 200upx;
			@include flex-center;
			flex-direction: column;
			.num {
				font-size: 48upx;
				font-weight: bold;
				color: #FFFFFF;
			}
			.title{
				font-size: 28upx;
				color: #FFFFFF;
				margin-top: 14upx;
			}
		}

		.list {
			border-radius: 12upx;
			background: #fff;
			margin-top: -40upx;
			width: 720upx;
			margin-left: 15upx;

			.item {
				padding: 38upx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.avatar {
					width: 64upx;
					height: 64upx;
					margin-right: 24upx;
					border-radius: 100%;
				}

				.name {
					font-size: 30upx;
					color: #222222;
					flex: 1;
				}

				.time {
					font-size: 28upx;
					color: #999;
				}
			}
		}
	}
</style>
