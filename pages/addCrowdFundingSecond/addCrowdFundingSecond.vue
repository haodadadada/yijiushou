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
						<input type="text" placeholder="必填"/>
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
				<view class="submit">
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
				timeStatus: '',
				nowTime: null
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
					this.startTime = e.fulldate;
				}
				else if(this.timeStatus === 2) {
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
		},
		onLoad(e) {
			console.log(e)
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