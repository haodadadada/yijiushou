<template>
	<view class="center">
		<view class="science">
			<img src="/static/cat/item2.png" alt="" class="img">
			<span class="title">猫咪科普中心</span>
		</view>
		<view class="text">
			解锁猫咪的神秘世界，带你深入了解猫咪的生活习性，让你成为猫咪的知心朋友，一起关爱猫咪，共创美好家园。
		</view>
		<view class="top">
			<img src="https://www.19so.net/miniapp/food.png" alt=""class="box" @click="info(1)">
			<img src="https://www.19so.net/miniapp/weak.png" alt=""class="box" @click="info(2)">
		</view>
		<view class="button">
			<img src="https://www.19so.net/miniapp/talk.png" alt=""class="box" @click="info(3)">
			<img src="https://www.19so.net/miniapp/sex.png" alt=""class="box" @click="info(4)">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			info(e){
				if(e==1){
					uni.navigateTo({
						url:'/pages/cat-info/cat-info'
					})
				}else if(e==2){
					
				}else if(e==3){
					
				}else if(e==4){
					
				}
			}
		}
	}
</script>

<style>
.science{
		padding: 20px 0 10px;
	}
.img1{
		width: 20vw;
		height: 20vw;
		margin: 0 auto;
	}
.word{
	color: azure;
	font-size: 20px;
	font-family: 阿里巴巴普惠体;
	/* font-weight: 700; */
	margin:0 auto;
}
.title{ 
	    padding-left: 10px;
		color: rgba(118, 196, 181, 1);
		font-size: 20px;
		font-family: 阿里妈妈数黑体;
		font-weight: 900;
		vertical-align: middle;
	}
.img{
	width: 50px;
	height: 50px;
	vertical-align: middle;
}
.text{
	font-weight:700;
	font-size: 11px;
}
.center{
	/* background-color: red; */
	height: 100vh;
	width: 86vw;
	margin: 0 auto;
}
.box{
	border-radius: 10px;
	background-color:aquamarine;
	width: 40vw;
	height: 40vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.top{
	display: flex;
	justify-content: space-between;
	margin: 30px 0;
}
.button{
	display: flex;
	justify-content: space-between;
}
</style>
