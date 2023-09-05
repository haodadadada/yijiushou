<template>
	<view class="container">
		<view class="logo">
			<view class="top-logo">
				<img src="../../static/new logo.png" alt="">
			</view>
			<view class="footer-introduce">
				<span class="intruduce-top">介绍</span>
				<span class="intruduce-bottom">依旧收(浙江)再生资源有限公司( 曾用名: 浙江华绘再生资源技术有限公司), 成立于2018年</span>
			</view>
		</view>
		<view class="process">
			<view class="process-header">
				<span>回收流程</span>
			</view>
			<view class="process-top">
				<view class="process-img">
					<img src="../../static/new1.png" alt="预约">
					<view>预约下单</view>
				</view>
				<view class="line">
					<span>---></span>
				</view>
				<view class="process-img">
					<img src="../../static/new2.png" alt="上门">
					<view>免费上门</view>
				</view>
				<view class="line">
					<span>---></span>
				</view>
				<view class="process-img">
					<img src="../../static/new3.png" alt="完成">
					<view>完成订单</view>
				</view>
		</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	body {
		background-color: #34cd99;
	}
	.container {
		padding-top: 20px;
		.logo {
			border-radius: 20px;
			margin: 0 20px 20px;
			// height: 300px;
			background-color: #fff;
			.top-logo {
				margin: 20px auto;
				width: 200px;
				img {
					width: 200px;
					height: 200px;
					margin-top: 20px;
				}
			}
			.footer-introduce {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.intruduce-top {
					margin-bottom: 20px;  
				}
				.intruduce-bottom {
					margin: 0 20px 20px;
					font-size: 12px;
					line-height: 1.7;
				}
			}
		}
		.process {
			background-color: #fff;
			border-radius: 20px;
			height: 200px;
			margin: 0 20px;
			margin-bottom: 10upx;
			image {
				background-size: 100% 100%
			}
			.process-header {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 25px 15px 15px 15px;
				span {
					margin: 7px;
					font-size: 16px;
				}
			}
			.process-top {
				display: flex;
				margin: 0px 20px 0 20px;
				height: 40%;
				justify-content: space-around;
				padding-top: 30upx;
				.line {
					height: 70%;
					color: #cecece;
				}
				.process-img {
					display: flex;
					// flex-direction: column;
					flex-wrap: wrap;
					justify-content: center;
					// width: 33%;
					height: 70%;
					text-align: center;
					// margin-top: 30upx;
					image {
						width: 60upx;
						height: 60upx;
					}
					view {
						font-size: 20upx;
						color: #ccc;
						flex-basis: 100%;
					}
				}
			}
			
			.process-recycle {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 50%;
				// background-color: red;
				.recycle-top {
					display: flex;
					height: 50%;
					// flex-grow: 1;
					justify-content: center;
					align-items: center;
					width: 60%;
					// height: 33.3%;
					margin: 0 auto;
					background: linear-gradient(to right, #48b97e, #0be0b2);
					border-radius: 15upx;
					span {
						color: #d0fcf5;
					}
					
				}
				.recycle-footer {
					display: flex;
					justify-content: center;
					// flex-grow: 2;
					// background-color: yellow;
					// margin-top: 30upx;
					height: 50%;
					span {
						display: inline-block;
						margin-right: 10upx;
						margin-top: 10upx;
						color: #cecece;
						font-size: 20upx;
					}
				}
			}
		}
	}
</style>