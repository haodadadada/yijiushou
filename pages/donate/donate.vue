<template>
	<view>
		<view class="pic" :style="{'background':'url(' + love + ')','background-size':'cover'}">
			<!-- <view class="text-center size-28 pt-12">你的每一次下单达到20KG以上<br>
			我们都会为你向公益事业捐赠一份爱心</view> -->
			<!-- <view class="text-1 text-center gray-7 size-28">你的爱心积攒数量可以获得随机生活用品<br/>我们会尽快为你邮寄到家</view> -->
		</view>
		<view class="tip">
			您的安心积攒数量可以获得随机生活用品，我们会尽快为您邮寄到家
		</view>
		<view class="section mx-14">
			<view class="title flex-between">
				<view>公益活动</view>
				<navigator url="../activeList/activeList" hover-class="none" class="size-24 gray-9 pr-20">查看更多</navigator>
			</view>
			<scroll-view class="list list-1" scroll-x="true" >
				<view class="card" v-for="item in list.mission_list" :key="item.id" @click="goDetail(item.id)">
					<image :src="baseUrl + item.image" mode="aspectFill">
						<view class="text-1 line-clamp">{{item.mission_type}}</view>
					</image>
				</view>
			</scroll-view>
		</view>
		<view class="section mt-32 mx-14">
			<view class="title">慈善机构</view>
			<view class="list">
				<navigator :url="'../mechanism/mechanism?id=' + item.id" class="item" v-for="(item,i) in mechanismList" :key="i">
					<image class="logo" :src="baseUrl + item.logo" mode=""></image>
					<view class="ml-22">
						<view class="size-30 mt-24 line-clamp">{{item.name}}</view>
						<view class="gray-9 size-28 mt-2 line-clamp-2">{{item.description}}</view>
					</view>
				</navigator>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				mechanismList:[],
				baseUrl:'',
				love:''
			};
		},
		onLoad() {
			this.baseUrl = this.$tools.baseUrl
			this.getList()
			this.getLove()
		},
		onShow() {
			if(!uni.getStorageSync('openid')){
				uni.switchTab({
					url:'../user/user'
				})
				return
			}
		},
		methods:{
			getLove(){
				this.$api.getLove({
					openid:uni.getStorageSync('openid')
				}).then(res=>{
					this.love = res.data.url
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'../benefitDetail/benefitDetail?id=' + id
				})
			},
			getList(){
				this.$api.mechanism({
					openid:uni.getStorageSync('openid')
				}).then(res=>{
					this.mechanismList = res.data
				})
				
				this.$api.mission({
					openid:uni.getStorageSync('openid')
				}).then(res=>{
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.pic{
	width: 750upx;
	height: 630upx;
	position: relative;
	.icon{
		width: 300upx;
		height: 277upx;
		position: absolute;
		top: 102upx;
		left: 304upx;
	}
	.text-1{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 20upx;
	}
}
.tip{
	font-size: 24upx;
	color: #316039;
	padding: 30upx 0;
	text-align: center;
	background: #F8F8F8;
}
.section{
	background: #fff;
	border-radius: 12upx;
	.title{
		padding-top: 24upx;
		margin-left: 18upx;
	}
}
.list{
	padding: 18upx;
	.card{
		position: relative;
		border-radius: 12upx;
		overflow: hidden;
		image{
			width: 332upx;
			height: 204upx;
			background: #111111;
			border-radius: 12upx;
		}
		.text-1{
			color: #fff;
			font-size: 24upx;
			position: absolute;
			padding-left: 12upx;
			left: 0;
			right: 0;
			bottom: 0;
			line-height: 44upx;
			background: rgba(0,0,0,.6);
			border-radius: 0px 0px 12upx 12upx;
			box-sizing: border-box;
		}
	}
	.item{
		display: flex;
		background: #FFFFFF;
		box-shadow: 0px 4upx 12upx 2upx rgba(96, 202, 130, 0.29);
		border-radius: 12upx;
		margin-bottom: 22upx;
		padding: 8upx;
		padding-right: 20upx;
		.logo{
			width: 172upx;
			height: 172upx;
			min-width: 172upx;
		}
	}
}
.list-1{
	white-space: nowrap;
	.card{
		display: inline-block;
		margin-right: 20upx;
	}
}
</style>
