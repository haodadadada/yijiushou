<template>
	<view>
		<u-popup :show="show" bgColor="transparent" mode="center" @close="close">
			<u-icon @click="close" class="flex-end mb-10" color="#fff" size="30" name="close-circle"></u-icon>
			<view class="success-popup">
				<image src="../../static/popup_notice@2x.png" mode=""></image>
				<view class="text">
					<view class="text-1">暂无接单、请重新预约回收天使</view>
					<view class="btn" @click="close">
						<view>确认</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"onTakeOrder",
		data() {
			return {
				successShow:true,
			};
		},
		props:['show'],
		methods:{
			close(){
				this.$emit('closePopup')
			}
		}
	}
</script>

<style lang="scss">
.success-popup{
		width: 604upx;
		height: 558upx;
		position: relative;
		image{
			width: 604upx;
			height: 558upx;
		}
		.text{
			position: absolute;
			left: 0;
			right: 0;
			top:0;
			text-align: center;
			&-1{
				font-size: 30upx;
				font-weight: 400;
				color: #222222;
				margin-top: 320upx;
			}
			.btn{
				text-align: center;
				width: 316upx;
				height: 88upx;
				background: #E9FFF0;
				border-radius: 88upx;
				border: 2upx solid #9EE3C3;
				padding: 6upx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 60upx auto 0;
				view{
					color: #fff;
					background: #3BB061;
					width: 100%;
					height: 100%;
					border-radius: 88upx;
					line-height: 88upx;
				}
			}
		}
	}
</style>
