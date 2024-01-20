<template>
	<view class="container" :class="windowHeight >= rootHeight ? 'bgc-window' : 'bgc-root'">
		<view class="bgc"></view>
		<view class="contain" :style="{'--height-bgc': bgcHeight + 'px'}">
			<view class="info">
				<view class="name">碰瓷</view>
				<view class="info-item">
					<span class="info-item-key">常驻地</span>
					<span class="info-item-value">翻斗花园55号</span>
				</view>
				<view class="info-item">
					<span class="info-item-key">身体状况</span>
					<span class="info-item-value">良好</span>
				</view>
				<view class="info-item">
					<span class="info-item-key">毛色特征</span>
					<span class="info-item-value">xxxxxxxxxx</span>
				</view>
				<view class="info-item">
					<span class="info-item-key">性格</span>
					<span class="info-item-value">xxxxxxx</span>
				</view>
				<view class="info-item">
					<span class="info-item-key">注意事项</span>
					<span class="info-item-value">xxxxxxx</span>
				</view>
			</view>
			<view class="upload-img" :style="{'--height-info': infoHeight + 'px'}" @click="goUploadImg"></view>
			<view class="photos">
				<view class="title">xx的照片墙(共xx张)</view>
				<view>
					<view class="time">2023/12/31</view>
					<view class="main-photo flex-between">
						<view class="photo-item" v-for="(item, index) in 6" :key="index"></view>
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
				windowHeight: '',
				rootHeight: '',
				bgcHeight: '',
				infoHeight: '',
				catId: ''
			}
		},
		methods: {
			goUploadImg() {
				uni.navigateTo({
					url: '/pages/cat-upload-img/cat-upload-img'
				})
			},
			async getCatInfo() {
				let res = await this.$api.getCatInfo({id: this.id});
				console.log(res);
			}
		},
		onLoad(e) {
			this.catId = e.id;
			this.getCatInfo();
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			})
			uni.createSelectorQuery().select('.container').boundingClientRect().exec(data => {
				this.rootHeight = data[0].height;
			})
			uni.createSelectorQuery().select('.bgc').boundingClientRect().exec(data => {
				this.bgcHeight = data[0].height;
			})
			uni.createSelectorQuery().select('.info').boundingClientRect().exec(data => {
				this.infoHeight = data[0].height;
			})
		}
	}
</script>

<style lang="scss">
	.bgc-window {
		height: 100vh;
	}
	.bgc-root {
		height: 100%;
	}
	.container {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #fff;
		.bgc {
			position: absolute;
			width: 100vw;
			height: 30vh;
			background-color: palegoldenrod;
			z-index: 0;
		}
		.contain {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-top: calc(var(--height-bgc) - 70px);
			border-radius: 30px 30px 0 0;
			background-color: pink;
			z-index: 99;
			box-sizing: border-box;
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 20px 15px 0;
				margin-bottom: 20px;
				.name {
					font-size: 20px;
					font-weight: 550;
					color: rgba(118, 196, 181, 1);
					margin-bottom: 10px;
				}
				.info-item {
					display: flex;
					align-items: center;
					margin-bottom: 10px;
					.info-item-key {
						width: 60px;
						font-size: 14px;
						font-weight: 530;
						margin-right: 10px;
						color: rgba(118, 196, 181, 1);
					}
					.info-item-value {
						font-weight: 530;
						font-size: 12px;
					}
				}
			}
			.upload-img {
				position: absolute;
				right: 20px;
				top: calc(var(--height-info) + 30vh - 70px);
				width: 32px;
				height: 32px;
				border-radius: 9999px;
				background-color: rgba(118, 196, 181, 1);
			}
			.photos {
				flex: 1;
				padding:0 10px 0;
				.title {
					text-align: center;
				}
				.time {
					font-size: 14px;
					margin-bottom: 5px;
				}
				.main-photo {
					flex-wrap: wrap;
					margin-left: 5px;
					.photo-item {
						width: 100px;
						height: 100px;
						border-radius: 10px;
						background-color: grey;
						margin-bottom: 10px;
					}
				}
			}
		}
	}
</style>