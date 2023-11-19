<template>
	<view class="container">
		<view class="third">
			<view class="header"><span style="font-size: 24px; font-weight: 550; color: #34cd99;">3、</span>编辑众筹信息</view>
			<view class="content">
				<view class="top">
					<view class="left">
						<span>发起人联系方式</span>
						<span>(对参与者展示)</span>
					</view>
					<view class="right">
						<input type="text" placeholder="必填" v-model="startUserPhone"/>
					</view>
				</view>
				<view class="option">
					<view>
						<span>开团时间<span style="color: #34cd99; margin-left: 5px; font-size: 12px; border-bottom: 1px #34cd99 solid;" @click="chooseTime(1)">请选择</span></span>
						<!-- <span><switch color="#34cd99" style="transform: scale(.7, .7);"></switch></span> -->
						<span>{{startTime}}</span>
					</view>
					<view>
						<span>截止时间<span style="color: #34cd99; margin-left: 5px; font-size: 12px; border-bottom: 1px #34cd99 solid;" @click="chooseTime(2)">请选择</span></span>
						<!-- <span><switch color="#34cd99" style="transform: scale(.7, .7);"></switch></span> -->
						<span>{{endTime}}</span>
					</view>
				</view>
			</view>
		</view>
		<!-- <zui-calendar :list="list" :extraData="extraData" @click-active="clickActive"></zui-calendar> -->
		<uni-calendar 
			:insert="false"
			:lunar="false" 
			:start-date="nowTime"
			:end-date="'2029-5-20'"
			ref="calendar"
			@confirm="confirmTime"
			 />
		<view class="footer">
			<view class="content">
				<view class="back" @click="goBack">
					<img src="/static/icon/xiaoyuhao-white.png" alt="" style="width: 20px; height: 20px; margin-right: 10px;" />
					<span>上一步</span>
				</view>
				<view class="submit" @click="handleSubmit">
					<span>提交</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import { methods } from '../../uni_modules/uview-ui/libs/mixin/mixin'
	export default {
		data() {
			return {
				list: [], // 日历的任务栏
				upDatakey: '',//为重新渲染DOM值，入不需要则可取消
				extraData:[{date: '2022-7-20', value: '签到', status: true, dot: true, active: false},{date: '2022-7-19', value: '未签到', status: false, dot: true, active: true}],
				
				startUserPhone: '',
				startTime: '',
				endTime: '',
				startTimestamp: '',
				endTimestamp: '',
				timeStatus: '',
				nowTime: null,
				fundingInfo: {}
			}
		},
		methods: {
			// 点击日数方法
			// clickActive({year, month, date, index}){
			// 	console.log(year, month, date, index)
			// 	let timestr = date.replace(/-/g,'/');
			// 	let timestamp = new Date(timestr).getTime();
			// 	console.log(timestamp, Date.now())
			// },
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			chooseTime(status) {
				this.timeStatus = status;
				this.$refs.calendar.open();
			},
			confirmTime(e) {
				console.log(e);
				if(this.timeStatus === 1) {
					this.startTimestamp = this.timeToTimestamp(e.fulldate);
					if(this.endTime && this.endTimestamp < this.startTimestamp) {
						this.$tools.toast('请选择正确的时间');
						this.startTimestamp = this.timeToTimestamp(this.startTime);
						return;
					}
					this.startTime = e.fulldate;
				}
				else if(this.timeStatus === 2) {
					this.endTimestamp = this.timeToTimestamp(e.fulldate);
					if(this.startTime && this.endTimestamp < this.startTimestamp) {
						this.$tools.toast('请选择正确的时间');
						this.endTimestamp = this.timeToTimestamp(this.endTime);
						return;
					}
					this.endTime = e.fulldate;
				}
			},
			timestampToTime(timestamp) {
			    timestamp = timestamp ? timestamp : null;
			    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			    let Y = date.getFullYear() + '-';
			    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			    return Y + M + D;
			},
			timeToTimestamp(time){
			    let timestamp = Date.parse(new Date(time).toString());
			    //timestamp = timestamp / 1000; //时间戳为13位需除1000，时间戳为13位的话不需除1000
			    // console.log(time + "的时间戳为：" + timestamp);
			    return timestamp;
			},
			async handleSubmit() {
				if(!this.startUserPhone || !this.startTime || !this.endTime) {
					this.$tools.toast('请填写完整信息');
					return;
				}
				const {fundingName, fundingNotice, fundingImg, fundingMoney} = this.fundingInfo;
				let result = await this.$api.startPinProduct({
					productName: fundingName,
					pointsRequireMoney: Number(fundingMoney),
					productImg: fundingImg,
					productRemark: fundingNotice,
					startUserPhone: this.startUserPhone,
					startUser: uni.getStorageSync('openid'),
					startTime: this.startTime,
					endTime: this.endTime
				})
				console.log(result);
			}
		},
		onLoad(e) {
			console.log(e);
			this.fundingInfo = e;
		},
		onShow() {
			this.nowTime = this.timestampToTime(new Date().getTime());
			console.log(this.nowTime)
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px 15px;
		.third {
			.header {
				margin-bottom: 20px;
			}
			.content {
				.top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 10px;
					padding: 15px 15px;
					background-color: #fff;
					font-size: 14px;
					margin-bottom: 15px;
					.left {
						display: flex;
						margin-right: 10px;
						span:nth-child(1) {
							margin-right: 5px;
							word-break: keep-all;
						}
						span:nth-child(2) {
							font-size: 12px;
							color: #666;
							word-break: keep-all;
						}
					}
					.right {
						flex-grow: 1;
						input {
							font-size: 12px;
							color: #000;
							border-bottom: 1px solid #ccc;
						}
					}
				}
				.option {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					border-radius: 15px;
					background-color: #fff;
					padding: 15px 0;
					view:nth-child(1) {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 10px;
						padding-bottom: 10px;
						border-bottom: 1px solid #ccc;
					}
					view:nth-child(2) {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 10px;
						padding-top: 10px;
					}
				}
			}
		}
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			padding: 3vh 20px;
			box-sizing: border-box;
			.content {
				display: flex;
				justify-content: space-between;
				.back {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 30px;
					color: #fff;
					background-color: #34cd99;
					border-radius: 10px;
				}
				.submit {
					padding: 10px 30px;
					text-align: center;
					color: #fff;
					background-color: #34cd99;
					border-radius: 10px;
				}
			}
		}
	}
</style>