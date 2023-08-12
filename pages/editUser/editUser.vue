<template>
	<view>
		<view class="input-group input-group-1">
			<view class="item">
				<view class="label">昵称</view>
				<u-input type="text" v-model="name" border="none" placeholder="请输入您的昵称"></u-input>
			</view>
			<view class="item">
				<view class="label">手机号</view>
				<u-input type="number" maxlength="11" v-model="phone" border="none" placeholder="请输入您的手机号"></u-input>
			</view>
<!-- 			<view class="item">
				<view class="label">性别</view>
				<view @click="show = true">{{gender==0?'女':'男'}}</view>
				<u-picker :show="show" :columns="columns" @cancel="show=false" @close="show=false" @confirm="selectSex">
				</u-picker>
			</view> -->
		</view>

		<view class="menu">
			<view class="card card-1" :class="'card-' + item.id" v-for="item in menuList" :key="item.id"
				@click="routerPush(item.url,item.id)">
				<view class="left">
					<view class="text-1">{{item.title}}</view>
					<view class="text-2">{{item.desc}}</view>
					<!-- <swiper class="swiper" :autoplay="true" :vertical="true" :interval="3000" :duration="1000">
						<swiper-item v-for="item in noticeList" :key="item.id">
							<view class="swiper-item">
								<image :src="item.avatar" mode="aspectFill"></image>
								<view class="size-18">{{item.nickname}}</view>
							</view>
						</swiper-item>
					</swiper> -->
				</view>
				<image class="pic" :src="item.icon" mode=""></image>
				<image class="bg" :src="item.icon1" mode=""></image>
			</view>
		</view>


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
				gender: 0,
				columns: [
					['女', '男']
				],
				baseUrl: '',
				// menuList: [{
				// 	id: 2,
				// 	title: '接单大厅',
				// 	desc: '快速接单 高效执行',
				// 	icon: require('../../static/img2@2x(1).png'),
				// 	icon1: require('../../static/home_img_gx@2x.png'),
				// 	url: '../takeOrders/takeOrders'
				// }, ],
				noticeList: [],
				phone:''
			};
		},
		onLoad() {
			this.getUserInfo()
			this.baseUrl = this.$tools.baseUrl
			this.openid=uni.getStorageSync('openid')
		},
		methods: {
			submit() {
				if(!this.$tools.verifyTelPhone(this.phone)){
					return
				}
				console.log(uni.getStorageSync('openid'))
				this.$api.editInfo({
					name: this.name,
					// gender: this.gender,
					phone: this.phone,
					openid: uni.getStorageSync('openid')
				}).then(res => {
					console.log(res)
					this.$tools.toast(res.msg)
					if (res.code == 200) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				})
			},
			getUserInfo() {
				this.$api.getUserInfo({
					openid: uni.getStorageSync('openid')
				}).then(res => {
					let userInfo = res.data;
					this.name = userInfo.name
					this.gender = userInfo.gender
					this.phone = userInfo.phone
					// console.log(res.data.user)
				})
			},
			selectSex(e) {
				this.show = false
				this.gender = e.indexs[0]
				// console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.input-group {
		background: #fff;
		margin-bottom: 20upx;

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
