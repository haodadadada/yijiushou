<template>
	<view class="container">
		<view class="header flex">
			<view class="icon"></view>
			<view class="title">众筹说明</view>
		</view>
		<view class="tips">在此我们将为您详细介绍众筹池相关说明，若阅读完仍有疑问，欢迎联系校园猫咪协会或联系客服。</view>
		<view class="contain">
			<view class="item">
				<view class="top flex">
					<view class="icon"></view>
					<view class="item-word">众筹池用途</view>
				</view>
				<view class="content">xxxxxxx</view>
			</view>
			<view class="item">
				<view class="top flex">
					<view class="icon"></view>
					<view class="item-word">众筹池来源</view>
				</view>
				<view class="content">xxxxxxx</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container {
		padding: 15px;
		.header {
			.icon {
				width: 45px;
				height: 50px;
				background-color: pink;
				margin-right: 10px;
			}
			.title {
				font-size: 24px;
				font-weight: 400;
				color: rgba(118, 196, 181, 1);
			}
		}
		.tips {
			font-size: 11px;
			font-weight: 500;
			letter-spacing: 1.1px;
			line-height: 15px;
			text-align: left;
			vertical-align: top;
			margin: 15px 0;
		}
		.contain {
			.item {
				padding: 10px 10px 30px;
				border-radius: 15px;
				background-color: #fff;
				margin-bottom: 15px;
				.top {
					.icon {
						width: 11px;
						height: 16px;
						background-color: pink;
						margin-right: 10px;
					}
					.item-word {
						color: rgba(118, 196, 181, 1);
					}
				}
			}
		}

	}
</style>