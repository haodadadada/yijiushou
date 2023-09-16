<template>
	<div class="content">
		<view class="bgc"></view>
		<view class="img">
			<img :src="productImg" alt="">
		</view>
		<view class="contain" style="width: 100%;">
			<view class="input">
				<text>商品名称</text>
				<input type="text" value="" v-model="productName" :disabled="true" />
			</view>
			<view class="input">
				<text>商品价格</text>
				<input type="text" value=""  v-model="productPrice" :disabled="true" />
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
				<input type="text" value="" placeholder="请输入地址" v-model="userAddress" />
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				productName: '',
				productPrice: '',
				productImg: '',
				productId: '',
				userName: '',
				userPhone: '',
				userAddress: '',
			}
		},
		onLoad(option) {
			console.log(option)
			this.productName = option.productName;
			this.productImg = option.productImg;
			this.productId = option.productId;
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
</style>