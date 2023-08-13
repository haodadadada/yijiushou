<template>
	<view class="container">
		<view class="header">
			<view class="img">
				<img src="../../static/zhifubao.png" alt="">
			</view>
		</view>
		<view class="contain">
			<view class="username">
				<span>姓名</span>
				<input type="text" placeholder="请输入真实姓名" v-model="alipayName">
			</view>
			<view class="alipy">
				<span>账户</span>
				<input type="text" placeholder="请输入支付宝账户" v-model="alipayAccount">
			</view>
		</view>
		<view class="footer" @click="bind">
			<view class="bind"><span>一键绑定</span></view>
		</view>
		<view class="reading">
			<view class="right">
				<view :class="isChecked? 'agree' : 'refuse'" @click="isChecked=!isChecked"></view>
				<text>已阅读并同意 《用户协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alipayName: '',
				alipayAccount: '',
				isChecked: true,
				id: ''
			}
		},
		methods: {
			bind() {
				if(!uni.getStorageSync('openid')) {
					this.$tools.toast('请先登录');
					return;
				}
				if(!this.alipayName && !this.alipayAccount) {
					this.$tools.toast('请填写完整信息');
					return;
				}
				if(!this.isChecked) {
					this.$tools.toast('请同意用户协议');
					return;
				}
				this.$api.bindAlipay({
					alipayName: this.alipayName,
					alipayAccount: this.alipayAccount,
					id: this.id
				}).then(res => {
					console.log(res)
					if(res.code === 200) {
						setTimeout(() => {
							//跳转到成功页面
							uni.navigateTo({
								url: '../bind-detail/bind-detail'
							})
						}, 10);
					} else {
						this.$tools.toast('系统错误请稍后再试');
					}
				})
			}
		},
		onShow() {
			this.id = uni.getStorageSync('openid');
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		.header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40vh;
			.img {
				width: 64px;
				height: 64px;
				border-radius: 10px;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.contain {
			margin: 50px 20px 0;
			view {
				display: flex;
				align-items: center;
				padding: 15px;
				background-color: #fff;
				border-radius: 10px;
				span {
					flex: 1;
				}
				input {
					margin-left: 10px;
					flex: 3;
				}
			}
			.alipy {
				margin-top: 15px;
			}
		}
		.footer {
			margin: 40px 20px 0;
			text-align: center;
			border-radius: 10px;
			.bind {
				padding: 10px;
				background: linear-gradient(to left, #4eb777, #00e1b4);
				border-radius: 10px;
				color: #fff;
			}
		}
		.reading {
			display: flex;
			justify-content: flex-end;
			margin: 20px 20px 0;
			font-size: 14px;
			color: #666;
			.right {
				display: flex;
				align-items: center;
				view {
					width: 18px;
					height: 18px;
					border-radius: 9px;
					margin-right: 5px;
				}
				.agree {
					background-color: #34cd99;
				}
				.refuse {
					background-color: #fff;
				}
			}
		}
	}
</style>