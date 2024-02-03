<template>
		<view class="center">
			<view class="back">
				<img src="/static/cat/back.png" alt=""  class="img" @click='back()'>
				<span class="word" @click='back()'>投喂指南</span>
			</view>
			
			<img src="https://www.19so.net/miniapp/info.png" alt="" @click='go()' class="info">	
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			go(){
				uni.navigateTo({
					url:'/pages-second/cat/cat-info-detail/cat-info-detail'
				})
			}
		}
	}
</script>

<style>
.back{
	padding-top: 20px;	
	}
.center{
	/* background-color: red; */
	height: 100vh;
	width: 90vw;
	margin: 0 auto;
	/* background-color: aquamarine; */
}
.img{
	width: 8px;
	height: 16px;
	vertical-align: middle;
}
.word{
	color:rgba(118, 196, 181, 1);
	font-size: 20px;
	font-weight: 700;
	font-family: 阿里妈妈数黑体;
	vertical-align: middle;
	padding-left: 10px;
}
.info{
	width: 90vw;
	height: 50vw;
	border-radius: 10px;
	margin: 20px 0 0;
}
</style>
