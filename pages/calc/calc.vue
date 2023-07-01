<template>
	<view>
		<view class="section">
			<view class="title">
				结算品类及参考价格
			</view>
			<view class="tabs">
				<view class="item" :class="{cur:item.id==curTab}" v-for="item in tabs" :key="item.id">
					<image :src="item.icon" mode=""></image>
				</view>
			</view>
			<view class="types">
				<view class="item" :class="{cur:item.id==curType}" v-for="item in types" :key="item.id">
					<view>{{item.title}}</view>
					<view>{{item.price}}/公斤</view>
				</view>
			</view>
			<view class="calc">
				<view>
					<view class="text-1">单位(元/公斤)</view>
					<u-input type="digit" v-model="price" placeholder="请输入"></u-input>
				</view>
				<view class="icon">x</view>
				<view>
					<view class="text-1">重量(公斤)</view>
					<u-input type="digit" v-model="weight" placeholder="请输入"></u-input>
				</view>
				<view class="icon">=</view>
				<view>
					<view class="text-1">总价(元)</view>
					<u-input type="digit" v-model="money" placeholder="请输入"></u-input>
				</view>
			</view>
			<view class="btn">追加</view>
		</view>
		<view class="section">
			<view class="title">
				已添加
			</view>
			<view class="list">
				<view class="item" v-for="(item,i) in list" :key="i">
					<view class="flex-1">{{item.title}}</view>
					<view class="w">{{item.weight}}公斤</view>
					<view class="w">{{item.price}}元</view>
					<view>
						<u-icon color="#E02D2D" name="minus-circle-fill"></u-icon>
					</view>
				</view>
				<view class="item item-1 border-b">
					<view class="flex-1">合计：</view>
					<view class="w">{{totalWeight}}公斤</view>
					<view class="w">{{totalMoney}}元</view>
					<view>
						<u-icon color="#fff" name="minus-circle-fill"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex-end py-28">
				<view class="btn btn-1">线下结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						id: 1,
						icon: require('../../static/station_icon_list_paper@2x.png')
					},
					{
						id: 2,
						icon: require('../../static/station_icon_list_clothes@2x.png')
					},
					{
						id: 3,
						icon: require('../../static/station_icon_list_nail@2x.png')
					},
					{
						id: 4,
						icon: require('../../static/station_icon_list_bottle@2x.png')
					},
					{
						id: 5,
						icon: require('../../static/station_icon_list_electrical@2x.png')
					}
				],
				curTab: 1,
				types: [{
						id: 1,
						title: '黄纸',
						price: 1.60
					},
					{
						id: 2,
						title: '黄纸',
						price: 122.60
					},
					{
						id: 3,
						title: '黄纸',
						price: 11.60
					},
					{
						id: 4,
						title: '黄纸',
						price: 12.60
					},
					{
						id: 5,
						title: '黄纸',
						price: 3.60
					},
				],
				curType: 1,
				price: '',
				weight: '',
				money: '',
				list: [{
						title: '黄纸',
						price: 1.60,
						weight: 10.12
					},
					{
						title: '黄纸',
						price: 122.60,
						weight: 10.12
					},
					{
						title: '黄纸',
						price: 11.60,
						weight: 10.12
					},
					{
						title: '黄纸',
						price: 12.60,
						weight: 10.12
					},
					{
						title: '黄纸',
						price: 3.60,
						weight: 10.12
					},
				],
				totalWeight: 0,
				totalMoney: 0 ,
			}
		},
		watch: {
			price(val) {
				this.money = val * this.weight
			},
			weight(val) {
				this.money = val * this.price
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.section {
		background: #fff;
		margin-bottom: 18upx;
		padding: 0 18upx 40upx;

		.title {
			padding: 32upx 10upx;
			font-size: 28upx;
			font-weight: 500;
			color: #000000;
		}
	}

	.tabs {
		display: flex;
		justify-content: space-between;

		.item {
			width: 136upx;
			height: 136upx;
			border-radius: 12upx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1upx solid #DFDFDF;
			box-sizing: border-box;

			image {
				width: 100upx;
				height: 100upx;
			}
		}

		.cur {
			border: 1upx solid #0F7B32;
		}
	}

	.types {
		display: flex;
		flex-wrap: wrap;
		margin-top: 46upx;

		.item {
			font-size: 28upx;
			font-weight: 500;
			width: 340upx;
			height: 84upx;
			border-radius: 12upx;
			border: 1upx solid #DFDFDF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 24upx;
			box-sizing: border-box;
			margin-top: 12upx;

			view {
				color: #979797;
			}
		}

		.cur {
			border: 1upx solid #0F7B32;

			view {
				color: #0F7B32;
			}
		}

		:nth-child(odd) {
			margin-right: 34upx;
		}
	}

	.calc {
		display: flex;
		margin-top: 48upx;

		.text-1 {
			text-align: center;
			font-size: 26upx;
			font-weight: 500;
			color: #979797;
			margin-bottom: 10upx;
		}

		.icon {
			padding: 0 18upx;
			font-size: 28upx;
			font-weight: 500;
			color: #000000;
			align-self: flex-end;
			margin-bottom: 22upx;
		}

		.u-border {
			border-color: #000 !important;
		}

		/deep/ .uni-input-input {
			text-align: center;
		}

		/deep/ .uni-input-placeholder {
			text-align: center;
		}
	}

	.btn {
		width: 304upx;
		margin: 32upx auto 0;
		line-height: 84upx;
	}

	.list {
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: left;
			height: 80upx;
			background: #F6F6F6;
			border-radius: 12upx;
			padding: 0 24upx;
			margin-bottom: 8upx;

			.w {
				width: 30%;
			}

			view {
				font-size: 28upx;
				font-weight: 400;
				color: #606060;
			}
		}

		.item-1 {
			background: #fff;

			view {
				font-size: 32upx;
				font-weight: 500;
				color: #000000;
			}
		}
	}
	.btn-1{
		margin: 0;
		width: 244upx;
		line-height: 76upx;
		background: #3BB061;
	}
</style>
