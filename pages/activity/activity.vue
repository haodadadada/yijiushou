<template>
  <div class="activity-page">
    <div class="activity-container">
		<div style="display: inline-block;">
			<button @click="getAuthorize" style="font-size: 14px; background-color: #666; color: #fff; opacity: 0.7; border-radius: 9999px;">刷新定位</button>
		</div>
		<div class="top">
			<img src="https://www.19so.net/miniapp/gift.png" alt="">
			<!-- <div class="top-title">豪礼抽不停</div> -->
		</div>
    	<div class="prize-pool">
				<div class="prize-pool-title">
						<img src="../../static/activity/all-prize.png" alt="" />
				</div>
				<div class="lotter-status" v-if="isLotter && lotterStatus && lotterUserNum >= 1000">
					<img class="lotter-status-img" src="../../static/activity/lotter-status-title.png" alt="">
					<div class="lotter-status-num">{{ lotterStatusInfo.lotteryNum }}</div>
					<div class="lotter-status-tip" style="text-align: center; font-weight: 500; color: #B41B23; font-size: 20px;">
						<span>恭喜您抽中奖品</span>
					</div>
					<div class="lotter-status-prize">
						
						<img v-if="lotterUserNum >= 1000 && lotterUserNum < 2000" src="https://www.apple.com.cn/v/airpods/shared/compare/d/images/compare/compare_airpods_pro__e9uzt0mzviem_medium.png" alt="">
						<img v-if="lotterUserNum >= 2000 && lotterUserNum < 3000" src="https://www.apple.com.cn/v/ipad/home/ch/images/overview/compare_ipad_pro__erf9x8mw04sy_small.png" alt="">
						<img v-if="lotterUserNum >= 3000" src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-15-pro-202309?wid=384&hei=512&fmt=jpeg&qlt=90&.v=1692827834790" alt="">
						<span v-if="lotterUserNum >= 1000 && lotterUserNum < 2000" class="prize-name">Airpods Pro</span>
						<span v-if="lotterUserNum >= 2000 && lotterUserNum < 3000" class="prize-name">ipad Pro 2022</span>
						<span v-if="lotterUserNum >= 3000" class="prize-name">iPhone 15 Pro Max 1T</span>
					</div>
					<div class="contact-official">请等待工作人员联系您</div>
				</div>
				<div class="lotter-status" v-if="!isLotter && lotterStatus && lotterUserNum >= 1000">
					<img class="lotter-status-img" src="../../static/activity/lotter-status-title.png" alt="">
					<div class="lotter-status-num">{{ lotterStatusInfo.lotteryNum }}</div>
					<div style="margin: 4vw 0 2vw 0;font-size: 4vw;font-weight: bold;color: #B41B23;text-align: center;">中奖用户</div>
					<div class="lotter-status-user">
						<img :src="lotterStatusInfo.avatarUrl" alt="">
						<span style="margin-left: 1vw;" class="user-name">{{ lotterStatusInfo.userName }}</span>
						<span class="phone">{{ lotterStatusInfo.phone }}</span>
					</div>
					<div class="lotter-status-tip2">
						<img src="../../static/activity/no-lotter.png" alt="">
					</div>
				</div>
				<div v-if="lotterStatus && lotterUserNum < 1000" style="text-align: center; font-size: 20px; font-weight: 500;">
					人数不足未开奖
				</div>
				<div v-if="!lotterStatus">
					<div class="countdown">
						<div class="countdown-title">开奖倒计时： </div>
						<div class="countdown-time">
							{{ endTime }}
						</div>
					</div>
					<div class="status">
						<div class="status-item people-num">
							<div class="title">当前奖池内奖券数量： </div>
							<div class="num">{{ lotterNum }}张</div>
						</div>
					</div>
					<div class="status">
						<div class="status-item people-num">
							<div class="title">剩余积分： </div>
							<div class="num">{{ userPoint }}</div>
						</div>
						<div class="status-item remaining-points">
							<div class="title">分享成功人数： </div>
							<div class="num">{{ invitedNum }}人</div>
						</div>
					</div>
					<!-- <div class="remaining-qualification">
						<div class="title">您当前拥有&nbsp;</div>
						<div class="num">1</div>
						<div class="title">&nbsp;次抽奖资格</div>
					</div> -->
					<div class="lottery" @click="lotter()">
						<span>参与抽奖</span>
					</div>
					<div class="prize-pool-status">
					<div class="pool-line-wrapper">
						<div class="pool-line">
							<div class="line" :style="{height: prizeProcess + '%'}"></div>
						</div>
						<div class="engage-people" :style="{top: prizeProcess + '%'}">{{ lotterUserNum }}人</div>
					</div>
					<div class="prize-list">
						<div class="list-item">
	
							<div class="item-info" style="margin-bottom: 4vw; margin-top: 4vw;">
								<div class="info-img">
									<img src="https://www.apple.com.cn/v/airpods/shared/compare/d/images/compare/compare_airpods_pro__e9uzt0mzviem_medium.png" alt="">
									<span>Airpods Pro</span>
								</div>
								<div class="info">
									<span>参与抽奖人数满1000人，升级为一级奖池，抽取1名幸运用户免费赠送一副Airpods Pro。</span>
									<div v-if="lotterUserNum < 1000" class="info-state">奖池待升级</div>
									<div v-else class="info-state" :class="{'info-state-progressing': lotterUserNum >= 1000 && lotterUserNum < 2000}">{{ lotterUserNum >= 1000 && lotterUserNum < 2000 ? '进行中' : '奖池已升级' }}</div>
								</div>
							</div>
							<div class="item-title">
								<img src="../../static/activity/option.png" alt="">
								<span class="title">一级奖池</span>
							</div>
						</div>
						<div class="list-item">
			
							<div class="item-info" style="margin-bottom: 4vw; margin-top: 4vw;">
							<div class="info-img">
								<img src="https://www.apple.com.cn/v/ipad/home/ch/images/overview/compare_ipad_pro__erf9x8mw04sy_small.png" alt="">
								<span>ipad Pro 2022</span>
							</div>
								<div class="info">
									<span>参与抽奖人数满2000人，升级为二级奖池，抽取1名幸运用户免费赠送一部iPad Pro。</span>
									<div v-if="lotterUserNum < 2000" class="info-state">奖池待升级</div>
									<div v-else class="info-state" :class="{'info-state-progressing': lotterUserNum >= 2000 && lotterUserNum < 3000}">{{ lotterUserNum >= 2000 && lotterUserNum < 3000 ? '进行中' : '奖池已升级' }}</div>
								</div>
								</div>
								<div class="item-title">
								<img src="../../static/activity/option.png" alt="">
								<span class="title">二级奖池</span>
								</div>
							</div>
			
							<div class="list-item">
					
								<div class="item-info" style="margin-bottom: 4vw; margin-top: 4vw;">
								<div class="info-img">
									<img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-compare-iphone-15-pro-202309?wid=384&hei=512&fmt=jpeg&qlt=90&.v=1692827834790" alt="">
									<span>iPhone 15 Pro Max 1T</span>
								</div>
								<div class="info">
									<span>参与抽奖人数达到3000人，即可参与三级奖池开奖，抽取1名幸运用户免费赠送一部iPhone 15 Pro Max 1T。</span>
									<div v-if="lotterUserNum < 3000" class="info-state">奖池待升级</div>
									<div v-else class="info-state" :class="{'info-state-progressing': lotterUserNum >= 3000}">{{ lotterUserNum >= 3000 ? '进行中' : '奖池已升级' }}</div>
								</div>
								</div>
								<div class="item-title">
								<img src="../../static/activity/option.png" alt="">
								<span class="title">三级奖池</span>
								</div>
							</div>
						</div>
					</div>
				</div>
      </div>
      <div class="tip">
        <div class="tip-title">如何获得抽奖次数</div>
        <div class="tip-list">
          <span class="list-tiem">1.下单回收可获得相应积分。</span>
          <span class="list-tiem">2.分享抽奖活动至好友，并成功拉取新用户注册（需注册完整信息），每次可得5积分。</span>
          <span class="list-tiem">3.每5积分可兑换一次抽奖次数，不限兑换次数。</span>
        </div>
        <div class="tip-option">
          <div class="option to-buy" @click="goToOrder()">去下单</div>
          <button class="option share" open-type="share">分享好友</button>
        </div>
      </div>
    </div>
    <div class="my-prize" @click="checkMyCoupon = true;getCoupon()">
      <img src="../../static/activity/my-prize.svg" alt="">
    </div>
    <div class="rule" @click="checkRule = !checkRule">
      <img src="../../static/activity/rule.svg" alt="">
    </div>
		<div v-if="checkMyCoupon" class="my-coupon" @click="checkMyCoupon = false">
			<div class="coupon-list" @click.stop>
				<div class="list-title">我的奖券</div>
				<div class="coupons" v-if="couponList.length != 0">
					<div v-for="(item, index) in couponList" class="coupon-item">
						{{ item.id }}
					</div>
				</div>
				<div v-else class="coupon-empty">
						<img src="../../static/activity/empty.png" alt="">
						<span class="empty-desc">暂无奖券，快去参与抽奖吧！</span>
					</div>
				<img class="close-button" @click="checkMyCoupon = false" src="../../static/activity/close.svg" alt="">
			</div>
		</div>
		<Transition name="fade">
			<div v-if="checkRule" class="activity-rule" @click="checkRule = false">
				<div class="rules" @click.stop>
					<div class="rules-title">
						<img src="../../static/activity/rule-title.png" alt="">
					</div>
					<div class="rules-content">
						<p><span>1.</span>此活动为抽奖团活动，共抽取1名幸运用户免费赠送礼品。</p>
						<p><span>2.</span>奖池分为一级奖池、二级奖池、三级奖池，奖品价值逐级递增。参与人数满1000人但不足2000人，抽取一级奖池礼品；满2000人但不足3000人，抽取二级奖池礼品；满3000人及以上，抽取三级奖池礼品。</p>
						<p><span>3.</span>用户可使用账户积分兑换抽奖次数，每5积分即可兑换一次，不限兑换次数。</p>
						<p><span>4.</span>用户n次参与抽奖意味着占有n个人 数名额，即抽奖次数越多，中奖率越高。</p>
						<p><span>5.</span>分享抽奖活动至好友，并成功拉取新用户注册（需注册完整信息），每次可得5积分。</p>
						<p><span>6.</span>此抽奖活动为定时开奖，请实时关注开奖时间。</p>
					</div>
					<div class="rule-back">
						<img src="../../static/activity/rule-back.png" alt="">
					</div>
					<img class="close-button" @click="checkRule = false" src="../../static/activity/close.svg" alt="">
				</div>
			</div>
		</Transition>
  </div>
</template>

<script>
export default {
	components: {

	},
	data() {
		return {
			prizeProcess: 0,
			userPoint: 0,
			lotterUserNum: 0,
			invitedNum: 0,
			couponList: [],
			endTime: '0天 0:0:0',
			checkRule: false,
			checkMyCoupon: false,
			lotterStatus: false,
			lotterStatusInfo: null,
			isLotter: false,
			longitude: '',
			latitude: '',
			isAuthorize: true,
			isAround: true,
			lotterNum: 0
		};
	},
	onShow() {
		console.log(uni.getStorageSync('userInfo') === null, !uni.getStorageSync('userInfo').name, !uni.getStorageSync('userInfo').phone)
		if (!uni.getStorageSync('openid')) {
			// this.$tools.toast('请先登录');
			uni.showToast({
				title: '请先登录',
				icon: 'none',
				success: res => {
					console.log('success', res);
				},
				fail: err => {
					console.log('error', err);
				}
			})
			setTimeout(() => {
				uni.switchTab({
					url: '../user/user'
				});
			}, 1000);
			
		}
		else if(uni.getStorageSync('userInfo') === null || !uni.getStorageSync('userInfo').name || !uni.getStorageSync('userInfo').phone) {
			this.$tools.toast('请先填写完整信息');
			setTimeout(() => {
				uni.navigateTo({
					url: '../editUser/editUser'
				});
			}, 1000);
		}
		else {
			this.getAuthorize();
			this.initPosition();
			this.checkLotteryStatus()
			setInterval(() => {
			    this.checkLotteryStatus(); // 定期执行时间比对
			}, 1000);
			this.getPoint()
			this.getUserCount()
			this.getCoupon()
			this.getUserCountInvited()
		}

	},
	watch: {
		
	},
	methods: {
		toast(title, icon) {
			const timer = setTimeout(() => {
				uni.showToast({
					title,
					icon: icon || 'none'
				})
				clearTimeout(timer)
			}, 200);
		},
		
		checkLotteryStatus(){
			if (new Date().getTime() >= 1699617600000 && this.lotterStatus == false) {
				this.getLotterUser()
				this.lotterStatus = true
			}else if(new Date().getTime() >= 1699617600000 && this.lotterStatus == true){
				return;
			}else {
				this.lotterTimer()
			}
		},

		lotterTimer() {
			let nowTime = new Date().getTime();
			let endTime = 1699617600000;
			let time = endTime - nowTime;
			let day = Math.floor(time / (1000 * 60 * 60 * 24));
			let hour = Math.floor(time / (1000 * 60 * 60)) % 24;
			let minute = Math.floor(time / (1000 * 60)) % 60;
			let second = Math.floor(time / 1000) % 60;
			day = day < 10 ? '0' + day : day;
			hour = hour < 10 ? '0' + hour : hour;
			minute = minute < 10 ? '0' + minute : minute;
			second = second < 10 ? '0' + second : second;
			this.endTime = `${day}天 ${hour}:${minute}:${second}`;
		},

		lotter() {
			if(!this.isAuthorize) {
				this.$tools.toast('请授权定位服务');
				return;
			}
			if(!this.isAround) {
				this.$tools.toast('当前位置未在服务范围内');
				return;
			}
			wx.requestSubscribeMessage({
				tmplIds: ['XJC5O8Ee4_-KCpdcOZwsz-vhKeLoMB3XU31ZHne6yCk']
			})
			this.$api.lotteryDraw({
				id: uni.getStorageSync('openid'),
				copies: 1,
			}).then(res => {
				console.log('res', res);
				if (res.code == 200) {
					this.$tools.toast('参与成功')
					setTimeout(() => {
						this.getPoint()
						this.getUserCount()
					}, 500)
				} else {
					this.$tools.toast(res.msg)
				}
			});
		},
		goToOrder() {
			uni.switchTab({
				url: '../placeOrder/placeOrder'
			});
		},

		onShareAppMessage(res) {
			return {
				title: '回收分享赚取积分，最高可抽iPhone 15 Pro Max 1T！',
				path: 'pages/index/index?invitedId=' + uni.getStorageSync('openid')
			}
		},

		getCoupon() {
			this.$api.getLotterCoupon({
				id: uni.getStorageSync('openid')
			}).then(res => {
				if(res.code === 200)
					this.couponList = res.data
			});
		},
		getPoint() {
			console.log(uni.getStorageSync('openid'))
			this.$api.getUserPoint({
				id: uni.getStorageSync('openid')
			}).then(res => {
				if(res.code === 200)
					this.userPoint = res.data;
			});
		},
		getUserCount() {
			this.$api.getLotterUserCount().then(res => {
				if(res.code === 200) {
					this.lotterUserNum = res.data.userNum;
					this.lotterNum = res.data.lotteryNum;
					if(this.lotterUserNum > 3000) this.prizeProcess = 100
					else this.prizeProcess = this.lotterUserNum / 3000 * 100
				}
			});
		},
		getUserCountInvited() {
			this.$api.getUserCountInvited({
				id: uni.getStorageSync('openid')
			}).then(res => {
				this.invitedNum = res.data
			});
		},
		getLotterUser() {
			this.$api.getLotteryStatus().then(res => {
				this.lotterStatusInfo = res.data
				if (this.lotterStatusInfo.userId == uni.getStorageSync('openid')) this.isLotter = true
				else this.isLotter = false
			});
		},
		
		getAuthorize() {
			uni.getSystemInfo({
				success: (res) => {
					if (!res.locationEnabled || !res.locationAuthorized) {
						uni.showModal({
							title: '提示',
							content: '请打开手机定位服务功能',
						})
						this.isAuthorize = false;
						return;
					}
					else if(res.hostName == 'WeChat'){
						uni.authorize({
							scope: 'scope.userLocation',
							success: () => {
								this.isAuthorize = true;
								this.initPosition()
							},
							fail: (err) => {
								err = err['errMsg']
								uni.showModal({
									content: '需要授权位置信息',
									confirmText: '确认授权'
								}).then(res => {
									if (res[1]['confirm']) {
										uni.openSetting({
											success: (res) => {
												if (res.authSetting['scope.userLocation'] || res.authSetting['location']) {
													// 授权成功
													uni.showToast({
														title: '授权成功',
														icon: 'none'
													})
													this.isAuthorize = true;
													this.initPosition();
												} else {
													// 未授权
													uni.showToast({
														title: '授权失败',
														icon: 'none'
													})
													this.isAuthorize = false;
												}
											}	
										})
									}
									if (res[1]['cancel']) {
										// 取消授权
										console.log('取消');
										this.isAuthorize = false;
										this.$tools.toast('请开启定位功能并授权获取地图服务');
									}
								})
							}
						})
					}
				}
			})
		},
		getSite() {
			var ok = 0;
			this.userArea = '';
			this.$api.getAllArea().then(res => {
				const locationList = res.data;
				// console.log("data:",locationList)
				for (const location of locationList) {
				  const location1 = location.location.split(',');
				  const lat1 = parseFloat(location1[0]);
				  const lon1 = parseFloat(location1[1]);
				  // 获得经纬度比较
				  const lat2 = parseFloat(this.latitude);
				  const lon2 = parseFloat(this.longitude);
				  const R = 6371; // 地球半径（单位：公里）
			
				  const dLat = toRad(lat2 - lat1);
				  const dLon = toRad(lon2 - lon1);
				  // console.log(dLat);
				  // console.log(dLon);
			
				  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
					Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
					Math.sin(dLon / 2) * Math.sin(dLon / 2);
			
				  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				  const distance = R * c;
				  // console.log(distance)
				  if (distance <= location.distance) {
					this.userArea = location.id;
					ok=1;
					break;
				  }else{
					  ok = 2;
				  }
				}
				if (ok==2) {
				  uni.showToast({
					title: '当前位置未开通服务',
					icon: 'none'
				  });
				  this.isAround = false;
				}
				else {
					this.isAround = true;
				}
			});
			
			function toRad(value) {
				return value * Math.PI / 180;
			}
		},
		initPosition() {
		  uni.getLocation({
		    type: 'gcj02',
		    success: res => {
		      this.longitude = res.longitude;
		      this.latitude = res.latitude;
			  this.getSite();
		    },
		    fail: (res) => {
		      // 处理错误情况
		    },
		  });
		},
	},
};
</script>

<style lang="scss">
body {
	width: 100%;
	height: 100%;
	div {
		box-sizing: border-box;
	}
}
.activity-page {
  padding: 20px;
  padding-bottom: 60px;
  width: 100%;
  height: 100%;
  background: rgb(240,192,193);
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .activity-container {
    .top {
      width: 90vw;
		height: 80vw;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		img {
			width: 100%;
			height: 100%;
		}
	.top-title {
		font-size: 12vw;
		font-weight: bold;
		color: rgb(255, 233, 167);
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		&::after {
			content: '回收分享赚取积分，兑换抽奖机会';
			padding: 1vw 8vw;
			background: rgb(255, 233, 167);
			border-radius: 0 3vw 0 3vw;
			position: absolute;
			bottom: -40%;
			left: 50%;
			transform: translateX(-50%);
			font-size: 3vw;
			color: rgb(255, 133, 41);
		}
	}
    }
    .prize-pool {
      padding: 20px 15px;
	  padding-top: 50px;
      width: 100%;
      background: white;
      border-radius: 15px;
	  position: relative;
	  .prize-pool-title {
		width: 180px;
		height: 60px;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		img {
			width: 100%;
			height: 100%;
		}
	  }
	  .lotter-status {
		  padding: 12vw 10vw 8vw 10vw;
		  width: 100%;
		  border-radius: 2vw;
		  background: #F0C0C1;
		  position: relative;
		  .lotter-status-img {
			  width: 40vw;
			  height: 9vw;
			  position: absolute;
			  top: 0;
			  left: 50%;
			  transform: translateX(-50%);
		  }
		  .lotter-status-num {
			  font-size: 10vw;
			  font-weight: bold;
			  color: #B41B23;
			  text-align: center;
		  }
		  .lotter-status-user {
			  display: flex;
			  flex-direction: row;
			  justify-content: center;
			  align-items: center;
			  img {
				  width: 6vw;
				  height: 6vw;
				  border-radius: 20vw;
			  }
			  .phone {
				  margin-left: 4vw;
			  }
		  }
		  .lotter-status-tip {
			  margin: 4vw 0;
			  img {
				  height: 10vw;
			  }
		  }
		  .lotter-status-tip2 {
			  margin-top: 10vw;
			  img {
				  width: 100%;
				  height: 20vw;
			  }
		  }
		  .lotter-status-prize {
			  display: flex;
			  flex-direction: column;
			  justify-content: center;
			  align-items: center;
			  img {
				  width: 20vw;
				  height: 20vw;
			  }
			  .prize-name {
				  margin-top: 2vw;
				  font-size: 3.5vw;
				  font-weight: bold;
				  color: black;
			  }
		  }
		  .contact-official {
			  margin-top: 6vw;
			  font-size: 3vw;
			  color: black;
			  // text-decoration: underline;
			  text-align: center;
			}
	  }
      .countdown {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        div {
          font-size: 5.5vw;
          font-weight: bold;
		  color: rgb(180,32,39);
        }
      }
      .status {
		  margin-top: 1.5vw;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        .status-item {
          display: flex;
          flex-direction: row;
          color: black;
          font-size: 3.5vw;
          font-weight: bold;
        }
      }
      .remaining-qualification {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: black;
        font-size: 5vw;
        div {
          font-weight: bold;
        }
        .num {
          color: rgb(180,32,39);
        }
      }
      .lottery {
        margin-top: 15px;
        width: 100%;
        height: 12vw;
        background: linear-gradient(to right, rgb(240,192,193), rgb(243,54,54));
        border-radius: 3vw;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: white;
          font-weight: bold;
          font-size: 4.5vw;
        }
      }
	  .prize-pool-status {
		  padding-left: 10vw;
		  padding-bottom: 30px;
		  // margin-top: 10px;
		  margin-top: 10vw;
		  width: 100%;
		  display: flex;
		  flex-direction: row;
		  .pool-line-wrapper {
			  // margin-top: 8vw;
			  width: 5%;
			  position: relative;
			  // top: 9vw;
			  .pool-line {
				width: 100%;
				height: 100%;
				background: rgb(175, 175, 175);
				border-radius: 10vw;
				position: relative;
				overflow: hidden;
				.line {
				  width: 100%;
				  height: 50%;
				  position: absolute;
				  top: 0;
				  left: 0;
				  border-radius: 10vw;
				  background: rgb(255, 102, 0);
				}
			  }
			  .engage-people {
			    position: absolute;
			    color: rgb(180,32,39);;
			    white-space: nowrap;
			    right: 4.5vw;
			    font-size: 3.5vw;
			  }
		  }
		  
		  .prize-list {
			width: 95%;
			display: flex;
			flex-direction: column;
			.list-item {
			  margin-top: 20px;
			  width: 100%;
			  .item-title {
				// margin-bottom: 15px;
				transform: translateY(50%);
				width: 35vw;
				height: 8vw;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				left: -3vw;
				img {
				  width: 100%;
				  height: 100%;
				}
				.title {
				  position: absolute;
				  top: 50%;
				  left: 50%;
				  transform: translate(-50%, -50%);
				  color: white;
				  font-weight: bold;
				  font-size: 2.8vw;
				}
			  }
			  .item-info {
				width: 100%;
				display: flex;
				flex-direction: row;
				.info-img {
					padding: 3.5vw;
				  width: 42vw;
				  height: 30vw;
				  display: flex;
				  flex-direction: column;
				  img {
					width: 100%;
				  }
				  span {
					color: black;
					font-size: 3vw;
					font-weight: bold;
					text-align: center;
					line-height: 4vw;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				  }
				}
				.info {
				  position: relative;
				  span {
						color: black;
						font-size: 3.3vw;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 5;
						-webkit-box-orient: vertical;
				  }
				  .info-state {
						padding: 2vw;
						min-width: 24vw;
						text-align: center;
						background: rgb(158, 158, 158);
						border-radius: 2.5vw;
						color: white;
						position: absolute;
						bottom: 0;
						right: 0;
						white-space: nowrap;
				  }
					.info-state-progressing {
						background: rgb(180,32,39);
					}
				}
			  }
			}
		  }
		}
    }
    .tip {
      margin-top: 45px;
      padding: 20px 25px;
      padding-top: 40px;
      width: 100%;
      background: white;
      border-radius: 15px;
      position: relative;
      .tip-title {
        padding: 2.5vw 10vw;
        background: rgb(255, 77, 77);
        border-radius: 2.5vw;
        color: white;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }
      .tip-list {
        display: flex;
        flex-direction: column;
        span {
          font-size: 4vw;
          color: black;
        }
      }
      .tip-option {
        margin-top: 3vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .option {
		margin: 0;
          padding: 2.5vw 8vw;
          background: rgb(243, 54, 54);
          color: white;
          font-size: 4.5vw; 
          border-radius: 2.5vw;
			line-height: normal;
			&:active {
				background: rgb(180,32,39);
			}
        }
      }
    }
  }
  .my-prize {
    position: absolute;
    top: 30vh;
    right: 0;
	img {
		width: 24px;
		height: 68px;
	}
  }
  .rule {
    position: absolute;
    top: 5vh;
    right: 0;
		img {
			width: 42px;
			height: 20px;
		}
  }
  .my-coupon {
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.1);
	  position: fixed;
	  top: 0;
	  left: 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  .coupon-list {
			padding: 4vw;
		  width: 80vw;
		  height: 60vw;
		  background: white;
		  border-radius: 2vw;
		  position: relative;
		  .list-title {
				text-align: center;
			  font-size: 4.5vw;
			  font-weight: bold;
			  color: rgb(216, 51, 51);
		  }
		  .coupons {
			  margin-top: 2vw;
			  height: calc(100% - 7vw);
			  display: flex;
			  flex-wrap: wrap;
				align-content: flex-start;
			  overflow: auto;
			  .coupon-item {
				  min-width: 8vw;
				  margin: 2vw 2vw 0 0;
				  padding: 1vw;
				background: rgb(255, 223, 182);
				border-radius: 1vw;
				text-align: center;
				color: rgb(216, 51, 51);
				font-size: 3.5vw;
			  }
		  }
		  .coupon-empty {
			  height: 90%;
			  display: flex;
			  flex-direction: column;
			  justify-content: center;
			  align-items: center;
			  img {
				width: 35vw;
				height: 30vw;
			  }
			  .empty-desc {
				  color: rgb(216, 51, 51);
				  font-size: 3.5vw;
				  font-weight: bold;
			  }
		  }
		  .close-button {
			  width: 7vw;
			  height: 7vw;
			  top: 2.5vw;
			  right: 3vw;
			  position: absolute;
		  }
	  }
  }
	.activity-rule {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		.rules {
			padding: 3vw 8vw 0 8vw;
			width: 90vw;
			background: white;
			border-radius: 2vw;
			position: relative;
			overflow: hidden;
			.rules-title {
				margin: 1vw 0 2vw 0;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 20vw;
					height: 6vw;
				}
			}
			.rules-content {
				p {
					font-size: 3.5vw;
					color: black;
					span {
						font-size: 3.8vw;
						color: rgb(216, 51, 51);
						font-weight: bold;
					}
				}
			}
			.rule-back {
				margin-top: 2vw;
				display: flex;
				justify-content: flex-end;
				img {
					margin-bottom: -0.6vw;
					height: 28vw;
				}
			}
		}
		.close-button {
			width: 7vw;
			height: 7vw;
			top: 2.5vw;
			right: 3vw;
			position: absolute;
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: 0.3s;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
}
</style>