<template>
	<div class="content">
		<view class="bgc"></view>
		<view class="img">
			<img :src="productImg" alt="">
			<img src="/static/duihuan.png" alt="">
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
			  <input type="text" :value="userName" />
			</view>
		
			<view class="input">
				<text>手机号</text>
				<input type="text" :value="userPhone" />
			</view>
			<view class="input">
				<text>收件地址</text>
				<input type="text" :value="userAddress" />
			</view>
			<view class="input">
				<text>订单编号</text>
				<input type="text" :value="productNumber" />
			</view>
			<view class="input">
				<text>下单时间</text>
				<input type="text" :value="createTime" />
			</view>
		</view>
	
		

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
				productNumber: '',
				userName: '',
				userPhone: '',
				userAddress: '',
				userCommunity: '',
				createTime: ''
			}
		},
		onLoad(option) {
			this.productNumber = option.id;
			this.productName = option.productName;
			this.productPrice = option.payPoints;
			this.userPhone = option.phone;
			this.userName = option.userName;
			this.userAddress = option.address + ',' + option.community;
			this.createTime = option.createTime;
			this.productImg = option.productImg;
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
			img:nth-child(1) {
				width: 15vh;
				height: 15vh;
			}
			img:nth-child(2) {
				position: absolute;
				right: 0;
				bottom: 2vh;
				width: 12vh;
				height: 8vh;
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