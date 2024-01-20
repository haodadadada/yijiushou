<template>
	<view class="container">
		<view class="header">
			<view class="top">留言反馈</view>
			<view class="bottom">每一条反馈我们都会认真查看，欢迎你留下关于猫猫的信息，或者对小程序的一些建议～ </view>
		</view>
		<view class="content flex-col">
			<view class="title flex">
				<view class="icon">
					<img src="/static/cat/cat-icon.png" alt="" style="width: 100%; height: 100%;" />
				</view>
				<view style="color: rgba(118, 196, 181, 1);">留言板</view>
			</view>
			<textarea name="" id="" maxlength="200" class="textarea" v-model="feedbackWords"></textarea>
			<view class="flex-center">
				<view class="submit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedbackWords: ''
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px 20px;
		.header {
			margin-bottom: 20px;
			.top {
				font-size: 24px;
				font-weight: 550;
				letter-spacing: 0px;
				line-height: 34px;
				color: rgba(118, 196, 181, 1);
				text-align: center;
				vertical-align: top;
				margin-bottom: 15px;
			}
			.bottom {
				font-size: 13px;
				font-weight: 500;
			}
		}
		.content {
			height: 40vh;
			padding: 20px;
			background-color: #fff;
			border-radius: 15px;
			.title {
				margin-bottom: 10px;
				.icon {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
			}
			.textarea {
				flex: 1; 
				border-radius: 10px; 
				background-color: #ddd; 
				padding: 20px; 
				box-sizing: border-box; 
				margin-bottom: 10px; 
				width: 100%;
			}
			.submit {
				width: 40vw;
				background-color: rgba(118, 196, 181, 1);
				border-radius: 15px;
				font-size: 16px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				padding: 10px 0;
			}
		}
	}
</style>