<template>
	<view class="container">
		<image src="../../static/success-apply.png" mode="widthFix"></image>
		<view class="mt-36">申请成功</view>
		<navigator hover-class="none" open-type="switchTab" url="../index/index" class="btn mt-80">返回</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 120upx;
	.btn{
		width: 524upx;
		line-height: 96upx;
		margin-top: 80upx;
	}
}
</style>
