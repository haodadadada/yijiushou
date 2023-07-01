<template>
	<view class="px-14 py-30">
		<view class="card mb-14 border-radius-12" v-for="(item,i) in list" :key="i">
			<view class="title flex-between">
				<view class="flex">
					<image class="icon" src="../../static/hsz_icon_address@2x.png" mode=""></image>
					<view>{{item.recylename}}</view>
				</view>
				<view class="size-26 gray-c">距离你{{item.distance}}</view>
			</view>
			<view class="list" v-if="item.category">
				<view class="item" v-for="_item in item.category" :key="_item.id" @click="getDetail(_item.two)">
					<image :src="_item.sortimage" mode="aspectFit"></image>
					<view class="info">
						<view class="text-1">{{_item.sortname}}</view>
						<!-- <view class="text-2">￥<text>{{_item.price}}/kg</text></view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="empty" v-if="list.length==0">
			<image src="../../static/empty.png" mode=""></image>
			<view>暂无相关回收站～～</view>
		</view>
		
		<u-popup :show="guidePopupShow"
		 mode="center" round="5"
		 closeable="true" @close="guidePopupShow = false">
		 <view class="n-title">指导价</view>
			<view class="info-1">
				<view class="flex-between" v-for="item in detail" :key="item.id">
					<view class="text-1">{{item.sortname}}</view>
					<view class="text-2 flex">￥<view>{{item.min}}<text class="mx-6">~</text>￥{{item.max}}/{{item.unit==1?'个':'公斤'}}</view></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				guidePopupShow:false,
				detail:'',
				list: [],
				baseUrl:'',
				page:1,
				latitude:'',
				longitude:'',
			};
		},
		onLoad() {
			this.baseUrl = this.$tools.baseUrl
			this.getLocation()
		},
		onReachBottom() {
			this.getList()
		},
		methods:{
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						console.log(res)
						this.getList()
					}
				});
			},
			getList(){
				this.$api.getRecycle1({
					longitude:this.longitude,
					latitude:this.latitude,
					openid:uni.getStorageSync('openid'),
					page:this.page
				}).then(res=>{
					console.log(res)
					this.list.push(...res.data.data)
				})
			},
			getDetail(e){
				this.detail = e
				this.guidePopupShow = true
			}
		}
	}
</script>

<style lang="scss">
	.card{
		overflow: hidden;
	}
	.title {
		background: #fff;
		background: #FFFFFF;
		padding: 30upx 20upx;
		font-size: 30upx;
		font-weight: 400;
		color: #000000;

		.icon {
			width: 38upx;
			height: 40upx;
			margin-right: 10upx;
		}
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20upx 30upx 20upx;
		background: #fff;

		.item {
			margin-bottom: 24upx;
			display: flex;
			align-items: center;

			image {
				width: 100upx;
				height: 100upx;
			}

			.info {
				padding-left: 22upx;
				width: 220upx;
				height: 100upx;
				background: #F7FCF9;
				border-radius: 0px 52upx 52upx 0px;
				border: 1upx solid #EEF4F0;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.text-1 {
					font-size: 28upx;
					color: #222222;
				}

				.text-2 {
					font-size: 20upx;
					color: #E2581C;

					text {
						font-size: 28upx;
					}
				}
			}
		}
	}
	
	.n-title{
		padding: 30upx;
		text-align: center;
	}
	.info-1{
		width: 600upx;
		max-height: 840upx;
		overflow-y: scroll;
		.flex-between{
			padding: 30upx;
			margin: 20upx 40upx;
			background: #F7FCF9;
			border-radius: 30upx;
			border: 1upx solid #EEF4F0;
		}
	}
</style>
