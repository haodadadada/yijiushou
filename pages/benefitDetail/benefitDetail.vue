<template>
	<view>
<!-- 		<u-navbar title="爱心公益" leftIconColor="#fff" color="#fff" :autoBack="true" :bgColor="bgColor">
		</u-navbar> -->
		<view class="banner">
			<image class="banner" :src="item.image" mode="aspectFill"></image>
		</view>
		<view class="section py-38 px-32">
			<view class="size-36 text-bold">{{item.name}}</view>
			<view class="size-30 gray-9 mt-40">
				{{item.description}}
			</view>
			<view class="size-32 text-bold mt-70">活动详情</view>
			<view class="item" v-html="item.content"></view>
			
			<view class="size-32 text-bold mt-70">慈善机构</view>
			<view class="list">
				<view class="item">
					<image class="logo" :src="item.mechanism.logo" mode=""></image>
					<view class="ml-22">
						<view class="size-30 mt-24 line-clamp">{{item.mechanism.name}}</view>
						<view class="gray-9 size-28 mt-2 line-clamp-2">{{item.description}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: 'transparent',
				item:''
			};
		},
		onLoad(e) {
			this.getDetail(e.id)
		},
		methods:{
			getDetail(id){
				this.$api.missionDesc({
					activity_id:id
				}).then(res=>{
					this.item = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .u-navbar__content__title {
		color: #fff !important;
	}

	.banner {
		height: 438upx;
		width: 750upx;
	}

	.section {
		position: relative;
		z-index: 100;
		margin-top: -24upx;
		border-radius: 24upx 24upx 0px 0px;
		background: #fff;
		.item{
			margin: 30upx 0;
			font-size: 30upx;
			font-weight: 400;
			color: #474747;
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
				.logo{
					width: 172upx;
					height: 172upx;
					min-width: 172upx;
				}
			}
		}
	}
</style>
