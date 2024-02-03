<template>
	<view class="container">
		<view class="header flex-center">照片上传栏</view>
		<view class="bottom flex-center">
			<view class="upload">上传</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container {
		position: relative;
		margin: 20px 10px;
		height: 70vh;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 15px;
		.header {
			padding: 15px 0;
			opacity: 1;
			font-size: 16px;
			font-weight: 900;
			line-height: 21.95px;
			color: rgba(118, 196, 181, 1);
			vertical-align: top;
		}
		.bottom {
			position: absolute;
			width: 100%;
			bottom: 5%;
			.upload {
				width: 110px;
				border-radius: 10px;
				background-color: rgba(118, 196, 181, 1);
				line-height: 30px;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>