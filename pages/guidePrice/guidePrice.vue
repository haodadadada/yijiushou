<template>
	<view class="p-30">
		<view class="title flex mt-20">
			<view>今日指导价</view>
			<picker mode="region" @change="selectArea">
				<view class="primary mx-10">{{ area }}</view>
				<image src="../../static/down.png" mode=""></image>
			</picker>
		</view>
		<view class="list">
			<view class="item" v-for="item in tabs" :key="item.id" @click="getDetail(item.id)">
				<image :src="baseUrl + item.sortimage" mode="aspectFit"></image>
				<view class="title-1">{{ item.sortname }}</view>
				<view class="info"><view class="text-1">查看价格</view></view>
			</view>
		</view>

		<!-- <view class="step">
			<view class="title-1">回收流程</view>
			<view class="list-1">
				<view class="item">
					<image src="../../static/icon-1.png" mode=""></image>
					<view>手机下单</view>
				</view>
				<view class="item">
					<image src="../../static/icon-2.png" mode=""></image>
					<view>预约上门</view>
				</view>
				<view class="item">
					<image src="../../static/icon-3.png" mode=""></image>
					<view>上门回收</view>
				</view>
				<view class="item">
					<image src="../../static/icon-4.png" mode=""></image>
					<view>完成结算</view>
				</view>
			</view>
		</view> -->

		<!-- <view class="step">
			<view class="title-1">回收要求和注意事项</view>
			<view class="list-2">
				<view class="item" v-for="(item, i) in claim" :key="i">
					<view class="text-1">{{ item.title }}</view>
					<view class="text-2">{{ item.content }}</view>
				</view>
			</view>
		</view> -->

		<u-popup :show="guidePopupShow" mode="center" round="5" closeable="true" @close="guidePopupShow = false">
			<view class="n-title">今日指导价</view>
			<view class="info-1">
				<view class="empty" v-if="detail.length==0">
					<image src="../../static/empty.png" mode=""></image>
					<view>暂无相关指导价～～</view>
				</view>
				<view class="flex-between" v-for="item in detail" :key="item.id">
					<view class="text-1">{{ item.sortname }}</view>
					<view class="text-2 flex">
						￥
						<view>
							{{ item.min }}
							<text class="mx-6">~</text>
							￥{{ item.max }}/{{ item.unit == 1 ? '个' : '公斤' }}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			guidePopupShow: false,
			area: uni.getStorageSync('area'),
			tabs: [],
			baseUrl: '',
			detail: [],
			banner: '',
			claim: ''
		};
	},
	onLoad() {
		this.getPirce();
		this.getBanner();
		this.baseUrl = this.$tools.baseUrl;
	},
	methods: {
		// 选择地区
		selectArea(e) {
			console.log(e);
			this.area = `${e.detail.value[2]}`;
			this.getPirce();
		},
		getBanner() {
			this.$api.guideBanner().then(res => {
				this.banner = res.data;
				this.claim = res.data.claim;
			});
		},
		getPirce() {
			this.$api
				.guidanceList({
					city: this.area
				})
				.then(res => {
					this.tabs = res.data;
					console.log(res);
				});
		},
		getDetail(id) {
			this.$api
				.guidancePrice({
					sid: id,
					city: this.area
				})
				.then(res => {
					this.detail = res.data;
					this.guidePopupShow = true;
				});
		},
		goUrl(url) {
			uni.navigateTo({
				url,
				fail: () => {
					uni.switchTab({
						url
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: linear-gradient(180deg, #f4f8f7 0%, #daf1e7 100%);
}
.banner {
	image {
		height: 164rpx;
		width: 100%;
	}
}
.title {
	border-radius: 12upx;
	padding-left: 40upx;
	font-size: 30upx;
	font-weight: 400;
	color: #000000;

	@include flex-col;
	.primary {
		font-size: 42upx;
		font-weight: bold;
		color: #333333;
		letter-spacing: 5upx;
	}
	image {
		width: 68upx;
		height: 48upx;
		display: block;
		margin: 30upx auto 0;
	}
}
.list {
	margin-top: 30upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	border-radius: 12upx;
	@include menu-list(3);
	.item {
		margin-bottom: 6upx;
		width: 228upx;
		height: 300upx;
		background: #ffffff;
		@include flex-center;
		flex-direction: column;
		image {
			width: 100upx;
			height: 100upx;
		}
		.title-1 {
			font-size: 30upx;
			color: #141414;
			margin-top: 26upx;
		}
		.info {
			width: 180upx;
			line-height: 50upx;
			background: #eaefeb;
			border-radius: 18upx;
			font-weight: bold;
			color: #316039;
			margin: 10upx auto 0;
			.text-1 {
				font-size: 22upx;
				color: #316039;
				text {
					font-weight: bold;
					font-size: 36upx;
					color: #316039;
				}
			}
		}
	}
}

.step {
	background: #fff;
	margin-top: 30upx;
	border-radius: 12upx;
	.title-1 {
		text-align: center;
		font-size: 32upx;
		padding-top: 30upx;
	}
	.list-1 {
		padding: 40upx 30upx 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list-2 {
		display: flex;
		.item {
			text-align: left;
			width: 33.333%;
			padding: 15upx;
			box-sizing: border-box;
			background: #f7fcf9;
			margin: 12upx;
			border-radius: 10upx;
			.text-1 {
				text-align: center;
				margin: 10upx 0 15upx;
			}
			.text-2 {
				font-size: 24upx;
				color: #666;
			}
		}
	}
	image {
		width: 60upx;
		height: 60upx;
	}
	font-size: 28upx;
	text-align: center;
}

.n-title {
	padding: 30upx;
	text-align: center;
}
.info-1 {
	width: 680upx;
	height: 61vh;
	overflow-y: scroll;
	.flex-between {
		padding: 30upx;
		margin: 20upx 40upx;
		background: #f7fcf9;
		border-radius: 30upx;
		border: 1upx solid #eef4f0;
		.text-1 {
			font-size: 26upx;
			color: #666;
		}
		.text-2 {
			font-size: 26upx;
			color: #333;
		}
	}
}
</style>
