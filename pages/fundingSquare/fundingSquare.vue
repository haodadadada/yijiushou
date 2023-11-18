<template>
	<view class="container">
		<view class="contain">
			<view class="item" v-for="item in products" :key="item.id">
				<view class="img">
					<image :src="item.productImg" mode=""></image>
					<view class="statusDetail"><span>{{item.isEnd ? item.isFull ? '已成功' : '未成团' : '众筹中'}}</span></view>
				</view>
				<view class="footer">
					<view class="name">{{item.productName}}</view>
					<view class="price">
						<span>{{item.pointsRequire}}积分</span>
						<span @click="enterCrowdFundingDetail(item.index)" v-if="!item.isEnd">马上参与</span>
						<span v-if="item.isEnd" style="background-color: #666;">已结束</span>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="showCrowdFunding" :show-confirm-button="false" :showCancelButton="false" width="90vw">
			<view class="model-info">
				<img src="/static/icon/cha.png" alt="" style="position: absolute; right: 0; top: 0; width: 16px; height: 16px;" @click="closeCrowdFundingDetail"/>
				<view class="top">
					<view class="user-img">
						<img :src="startUserInfo.avatarUrl" alt=""  style="width: 100%; height: 100%; border-radius: 9999px;"/>
					</view>
					<view class="user-info">
						<span style="font-size: 16px;">{{startUserInfo.name}}</span>
						<span style="font-size: 12px;">联系方式: {{productsDetail.startUserPhone}}</span>
					</view>
				</view>
				<view class="main-about">
					<view class="left">
						<img :src="productsDetail.productImg" alt="" style="width: 100%; height: 100%;" />
					</view>
					<view class="right">
						<view class="item" style="font-size: 16px;">{{productsDetail.productRemark}}</view>
						<view class="item" style="font-size: 12px;">众筹价：{{productsDetail.pointsRequire}}积分</view>
						<view class="item" style="font-size: 12px;">当前积分：{{productsDetail.donateTotal}} / {{productsDetail.pointsRequire}}积分</view>
						<view class="process">
							<span style="width: 16px; height: 16px; background-color: #fff; border-radius: 10px; padding: 2px; z-index: 1;"></span>
							<span style="position: absolute; left: 8px;  flex-grow: 1; height: 20px; border-radius: 99999px; background-color: orangered;" :style="'width:' + `${processFunding}%`"></span>
							<span style="flex-grow: 1; height: 20px; transform: translateX(-10px); border-radius: 99999px; background-color: orangered; opacity: .3;"></span>
						</view>
					</view>
				</view>
				<view style="text-align: center; color: #34cd99; font-weight: 600; font-family: sans-serif; margin-bottom: 10px;">第12期</view>
				<view v-if="!isAccded">
					<view style="text-align: center; margin-bottom: 10px;">{{`剩余时间：${remainingTime}`}}</view>
					<view style="display: flex; justify-content: center; margin-bottom: 10px;">
						<img src="" alt="" style="width: 32px; height: 32px; background-color: #ccc; border-radius: 16px;"/>
					</view>
					<view class="enter" @click="isAccded = true">马上加入众筹</view>
					<view class="invite">邀请好友参团</view>
				</view>
				<view v-if="isAccded" >
					<view style="margin-bottom: 40px;">
						<view style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; margin-bottom: 10px;">
							<span style="flex: 1; font-weight: 500; margin-left: 20px;">当前积分</span>
							<span style="flex: 1; text-align: center;">{{productsDetail.donateTotal}}</span>
						</view>
						<view style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; margin-bottom: 10px;">
							<span style="flex: 1; font-weight: 500; margin-left: 20px;">投入积分</span>
							<input type="text" style="flex: 1; caret-color: #ccc; color: #ccc;" placeholder-style="color: #ccc; font-size: 12px;" placeholder="请输入指定的积分" v-model="donatingPoints"/>
						</view>
					</view>
					<view style="display: flex; justify-content: space-between; margin-bottom: 10px;">
						<view style="width: 30vw; background-color: #ccc; padding: 10px 0; text-align: center; color: #fff; border-radius: 9999px;" @click="isAccded = false">取消</view>
						<view style="width: 30vw; background-color: #34cd99; padding: 10px 0; text-align: center; color: #fff; border-radius: 9999px;" @click="joinFunding">加入众筹</view>
					</view>
					
				</view>
				<view style="text-align: center; font-size: 12px; color: #666;">众筹须知：人满开奖，人未满退分</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				products: [],
				productsDetail: {},
				processFunding: 0,
				showCrowdFunding: false,
				startUserInfo: {},
				remainingTime: '',
				timer: null,
				timeToEnd: '',
				isAccded: false,
				donatingPoints: ''
			}
		},
		methods: {
			async getPointPinProduct() {
				let result = await this.$api.getPointPinProduct();
				if(result.code == 200) {
					this.products = result.data;
					this.products.forEach((ele, index) => {
						ele.index = index;
					})
					console.log('pointproduct', this.products);
				}
				else {
					this.$tools.toast('获取众筹信息失败');
				}
			},
			enterCrowdFundingDetail(index) {
				this.showCrowdFunding = true;
				this.productsDetail = this.products[index];
				this.processFunding = this.productsDetail.donateTotal / this.productsDetail.pointsRequire * 100;
				this.timeToEnd = this.timeToTimestamp(this.productsDetail.endTime);
				this.remainingTime = this.countDown(this.timeToEnd);
				if(!this.productsDetail.isEnd) {
					this.countRemainingTime();
				}
				this.getUserInfo();
				this.isAccded = false;
			},
			async getUserInfo() {
				let result = await this.$api.getUserInfo({
					openid: this.productsDetail.startUser
				}) 
				console.log('startuserinfo', result);
				if(result.code === 200) {
					this.startUserInfo = result.data;
				}
				else {
					this.$tools.toast('获取用户信息失败');
				}
			},
			closeCrowdFundingDetail() {
				this.showCrowdFunding = false;
				clearInterval(this.timer);
				this.timer = null;
			},
			// 开启定时器
			countRemainingTime() {
				this.timer = setInterval(() => {
					this.timeToEnd -= 1;
					this.remainingTime = this.countDown(this.timeToEnd);
				}, 1000);
			},
			// 转为时间戳
			timeToTimestamp(time){
			    let timestamp = Date.parse(new Date(time).toString());
			    //timestamp = timestamp / 1000; //时间戳为13位需除1000，时间戳为13位的话不需除1000
			    // console.log(time + "的时间戳为：" + timestamp);
			    return timestamp;
			},
			// 转为时间格式
			timestampToTime(timestamp) {
			    timestamp = timestamp ? timestamp : null;
			    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			    let Y = date.getFullYear() + '-';
			    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			    return Y + M + D + h + m + s;
			},
			countDown(time) {
			    var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
			    var inputTime = +new Date(time); // 返回的是用户输入时间总的毫秒数
			    var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
			    var d = parseInt(times / 60 / 60 / 24); // 天
			    d = d < 10 ? '0' + d : d;
			    var h = parseInt(times / 60 / 60 % 24); //时
			    h = h < 10 ? '0' + h : h;
			    var m = parseInt(times / 60 % 60); // 分
			    m = m < 10 ? '0' + m : m;
			    var s = parseInt(times % 60); // 当前的秒
			    s = s < 10 ? '0' + s : s;
			    return d + '天' + h + '时' + m + '分' + s + '秒';
			},
			async joinFunding() {
				if(!this.donatingPoints) {
					this.$tools.toast('请输入积分');
					return;
				}
				let result = await this.$api.joinPinProduct({
					userId: uni.getStorageSync('openid'),
					pinProductId: this.productsDetail.id,
					donatePoints: Number(this.donatingPoints)
				})
				if(result.code === 200) {
					this.$tools.toast('加入成功');
				}
				else if(result.code === 2) {
					this.$tools.toast('积分已满');
				}
				this.isAccded = false;
				console.log(result);
			}
		},
		onShow() {
			this.getPointPinProduct();
		},
		onPullDownRefresh() {
			this.getPointPinProduct();
		}
	}
</script>

<style lang="scss">
	/deep/ .u-popup__content {
		border-radius: 10px !important;
	}
	.container {
		padding: 15px 0;
		.contain {
			overflow: hidden;
			.item {
				// display: inline-block;
				float: left;
				width: 42vw;
				// height: 150px;
				background-color: pink;
				margin-bottom: 20px;
				border-radius: 15px;
				overflow: hidden;
				.img {
					position: relative;
					height: 42vw;
					background-color: #ccc;
					image {
						width: 100%;
						height: 100%;
					}
					.statusDetail {
						position: absolute;
						bottom: 0;
						width: 100%;
						line-height: 10vw;
						text-align: center;
						background-color: #ddd;
						opacity: .5;
						color: #000;
						font-weight: 550;
					}
				}
				.footer {
					display: flex;
					flex-direction: column;
					align-items: start;
					padding: 10px;
					// height: 50px;
					background-color: #fff;
					// 元素不在同一水平线上的原因是这个有文字的div的vertical-align默认为baseline
					.name {
						// vertical-align: top;
						font-size: 14px;
					}
					.price {
						display: flex; 
						justify-content: space-between; width: 100%;
						span:nth-child(1) {
							padding: 5px 0;
							color: coral;
						}
						span:nth-child(2) {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 5px 7px;
							color: #fff;
							background-color: #34cd99;
							border-radius: 5px;
							font-size: 12px;
						}
					}
				}
			
			}
			.item:nth-child(2n+1) {
				margin-left: 6vw;
				margin-right: 4vw;
			}
			.item:nth-child(2n) {
				margin-right: 6vw;
			}
		}
		.model-info {
			position: relative;
			width: 100%;
			box-sizing: border-box;
			.top {
				display: flex;
				margin-bottom: 10px;
				.user-img {
					height: 52px;
					width: 52px;
					background-color: #ccc;
					margin-right: 15px;
					border-radius: 9999px;
				}
				.user-info {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 5px 0;
					box-sizing: border-box;
				}
			}
			.main-about {
				display: flex;
				padding: 10px 5px;
				background-color: #ddd;
				border-radius: 10px;
				margin-bottom: 20px;
				overflow: hidden;
				.left {
					width: 30vw;
					height: 30vw;
					margin-right: 15px;
				}
				.right {
					.item {
						margin-bottom: 10px;
					}
					.process {
						display: flex;
						align-items: center;
						position: relative;
					}
				}
			}
			.enter, .invite {
				border-radius: 99999px;
				background-color: #34cd99;
				color: #fff;
				padding: 10px 0;
				text-align: center;
				font-size: 16px;
				margin-bottom: 10px;
			}
		 
		}
	}
</style>