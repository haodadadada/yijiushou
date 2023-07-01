<template>
	<view>
		<view class="section">
			<view class="title">
				结算品类及参考价格
			</view>
			<!-- 			<view class="tabs">
				<view class="item" :class="{cur:item.id==curTab}" v-for="item in tabs" :key="item.id">
					<image :src="item.icon" mode=""></image>
				</view>
			</view> -->
			<scroll-view class="type-list border-b" scroll-x="true">
				<view class="item" :class="{cur:curTab==item.id}" v-for="(item,i) in tabs" :key="item.id"
					@click="selectType(item)">
					<image :src="baseUrl + item.sortimage" mode=""></image>
					<view>{{item.sortname}}</view>
				</view>
			</scroll-view>
			<view class="types">
				<view class="item" :class="{cur:item.id==curType}" v-for="item in types" :key="item.id"
					@click="selectPrice(item)">
					<view>{{item.sortname}}</view>
					<view>￥{{item.min}}<text class="mx-6">~</text>￥{{item.max}}/{{item.unit==1?'个':'公斤'}}</view>
				</view>
			</view>
			<view class="calc">
				<view>
					<view class="text-1">单位(元)</view>
					<u-input type="digit" v-model="price" placeholder="请输入"></u-input>
					<!-- <u-number-box step="0.1" disabledInput="true" class="u-number-box" button-size="38" bgColor="#fff" v-model="price" :min="min" :max="max" decimalLength="2"></u-number-box> -->
				</view>
				<view class="icon">x</view>
				<view>
					<view class="text-1">{{unit==1?'(单位)个':'重量(公斤)'}}</view>
					<u-input type="digit" v-model="weight" placeholder="请输入"></u-input>
				</view>
				<view class="icon">=</view>
				<view>
					<view class="text-1">总价(元)</view>
					<u-input type="digit" v-model="money" :disabled="true" disabledColor="#fff"  placeholder="请输入"></u-input>
				</view>
			</view>
			<view class="btn" @click="add">追加</view>
		</view>
		<view class="section">
			<view class="title">
				已添加
			</view>
			<view class="list">
				<view class="item" v-for="(item,i) in list.list" :key="i">
					<view class="flex-1">{{item.title}}</view>
					<view class="w">{{item.weight}}{{item.unit==1?'个':'公斤'}}</view>
					<view class="w">{{item.price}}元</view>
					<view @click="del(i,item)">
						<u-icon color="#E02D2D" name="minus-circle-fill"></u-icon>
					</view>
				</view>
				<view class="item item-1 border-b">
					<view class="flex-1">合计：</view>
					<view class="mr-10">{{list.totalWeight.toFixed(2)}}公斤</view>
					<view v-if="list.totalNum>0" class="mr-10">{{list.totalNum}}个</view>
					<view>{{list.totalMoney.toFixed(2)}}元</view>
					<view>
						<u-icon color="#fff" name="minus-circle-fill"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex-end py-28">
				<view class="btn btn-1" @click="orderAdd">线下结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: '',
				tabs: [],
				curTab: '',
				curTabTitle: '',
				types: [],
				curType: '',
				price: '',
				weight: '',
				money: '',
				list: {
					id:'',
					list:[],
					totalWeight: 0,
					totalMoney: 0,
					totalNum: 0,
				},
				min:0,
				max:0,
				unit:0
			}
		},
		props:['orderId'],
		watch: {
			price(val) {
				this.money = (val * this.weight).toFixed(2)
			},
			weight(val) {
				this.money = (val * this.price).toFixed(2)
			},
		},
		mounted() {
			this.baseUrl = this.$tools.baseUrl
			this.getTypeList()
			let list = uni.getStorageSync('calc' + this.orderId)
			if(list){
				this.list = list
			}else{
				this.list.id = this.orderId
			}
		},
		methods: {
			// 获取分类
			getTypeList() {
				this.$api.sortList({
					openid: uni.getStorageSync('openid')
				}).then(res => {
					this.tabs = res.data
					this.types = this.tabs[0].sort_list
					this.curTab = this.tabs[0].id
					this.curType = this.tabs[0].sort_list[0].id
					this.curTabTitle = this.tabs[0].sort_list[0].sortname
					this.price = this.tabs[0].sort_list[0].shopprice
					this.min = this.tabs[0].sort_list[0].min
					this.max = this.tabs[0].sort_list[0].max
					this.unit = this.tabs[0].sort_list[0].unit
				})
			},
			// 选择分类
			selectType(e) {
				this.types = e.sort_list
				this.curTab = e.id
				this.curType = ''
				this.price = ''
			},
			// 选择价格
			selectPrice(e) {
				this.curType = e.id
				this.curTabTitle = e.sortname
				this.price = e.shopprice
				this.min = e.min
				this.max = e.max
				this.unit = e.unit
			},
			// 追加
			add() {
				if (!this.$tools.isEmpty(this.price, '请选择类别')) {
					return
				}
				if (!this.$tools.isEmpty(this.weight, '请输入重量')) {
					return
				}
				if(this.unit==0){
					let item = {
						title: this.curTabTitle,
						weight: this.weight,
						price: this.money,
						unit:this.unit
					}
					this.list.totalWeight += Number(this.weight)
					this.list.totalMoney += Number(this.money)
					this.list.list.push(item)
					console.log(this.list)
					uni.setStorageSync('calc' + this.orderId,this.list)
					this.weight = ''
				}else{
					let item = {
						title: this.curTabTitle,
						weight: this.weight,
						price: this.money,
						unit:this.unit
					}
					this.list.totalNum += Number(this.weight)
					this.list.totalMoney += Number(this.money)
					this.list.list.push(item)
					console.log(this.list)
					uni.setStorageSync('calc' + this.orderId,this.list)
					this.weight = ''
				}
			},
			// 删除
			del(i, item) {
				console.log(item)
				if(item.unit==1){
					this.list.totalNum -= Number(item.weight)
					this.list.totalMoney -= Number(item.price)
					this.list.list.splice(i, 1)
				}else{
					this.list.totalWeight -= Number(item.weight)
					this.list.totalMoney -= Number(item.price)
					this.list.list.splice(i, 1)
				}
		
				uni.setStorageSync('calc' + this.orderId,this.list)
			},
			// 提交计算
			orderAdd(){
				uni.showModal({
					title:'提示',
					content:'确认结算',
					success: (res) => {
						if(res.confirm){
							this.$api.orderAdd({
								openid:uni.getStorageSync('openid'),
								id:this.orderId,
								list:JSON.stringify(this.list.list),
								total_money:this.list.totalMoney,
								total_weight:this.list.totalWeight,
							}).then(res=>{
								console.log(res)
								this.$tools.toast(res.msg)
								if(res.code==1){
									uni.removeStorageSync('calc' + this.orderId)
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
								}
							})
						}
					}
				})
				console.log(this.id)
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .u-number-box{
		height: 100upx !important;
	}
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

	.type-list {
		white-space: nowrap;

		.item {
			display: inline-block;
			width: 138upx;
			height: 172upx;
			background: #FFFFFF;
			box-shadow: 0px 0px 10upx 0 rgba(96, 202, 130, 0.29);
			border-radius: 12upx;
			opacity: 1;
			margin: 24upx 7upx;
			text-align: center;
			font-size: 28upx;
			color: #606060;
			line-height: 1.2;
			box-sizing: border-box;
		}

		.cur {
			color: #3BB061;
			border: 1upx solid #3BB061;
		}

		image {
			width: 100upx;
			height: 100upx;
			margin-top: 12upx;
		}
	}

	.types {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40upx;

		.item {
			width: 100%;
			font-size: 28upx;
			font-weight: 500;
			// width: calc(50% - 20upx);
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
			border: 4upx solid #0F7B32;

			view {
				color: #0F7B32;
			}
		}

		:nth-child(odd) {
			// margin-right: 34upx;
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
				width: 25%;
				margin-left: 10upx;
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

	.btn-1 {
		margin: 0;
		width: 244upx;
		line-height: 76upx;
		background: #3BB061;
	}
</style>
