<template>
  <div class="activity-page">
    <div class="activity-container">
			<div class="top">
				<img src="../../static/activity/top.png" alt="">
				<!-- <div class="top-title">豪礼抽不停</div> -->
			</div>
    	<div class="prize-pool">
				<div class="prize-pool-title">
						<img src="../../static/activity/all-prize.png" alt="" />
				</div>
        <div class="countdown">
          <div class="countdown-title">开奖倒计时： </div>
          <div class="countdown-time">
            {{ endTime }}
          </div>
        </div>
				<div class="status">
					<div class="status-item people-num">
            <div class="title">当前人数： </div>
            <div class="num">{{ lotterUserNum }}人</div>
          </div>
				</div>
        <div class="status">
          <div class="status-item people-num">
            <div class="title">剩余积分： </div>
            <div class="num">{{ userPoint }}人</div>
          </div>
          <div class="status-item remaining-points">
            <div class="title">分享成功次数： </div>
            <div class="num">{{ invitedNum }}</div>
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
		  <div class="pool-line">
			<div class="line" :style="{height: prizeProcess + '%'}"></div>
			<div class="engage-people" :style="{top: prizeProcess + '%'}">{{ lotterUserNum }}人</div>
		  </div>
		  <div class="prize-list">
			<div class="list-item">
			  <div class="item-title">
				<img src="../../static/activity/option.png" alt="">
				<span class="title">一级奖池</span>
			  </div>
			  <div class="item-info">
				<div class="info-img">
				  <img src="../../static/activity/iphone.png" alt="">
				  <span>iPhone 15 Pro Max 1T</span>
				</div>
				<div class="info">
				  <span>参与抽奖人数达到1000人，即可参与一级奖池开奖，抽取1名幸运用户免费赠送一部iPhone 15 ProMax 1T。</span>
				  <div class="info-state" :class="{'info-state-progressing': lotterUserNum >= 0 && lotterUserNum < 1000}">{{ lotterUserNum >= 0 && lotterUserNum < 1000 ? '进行中' : '奖池已升级' }}</div>
				</div>
			  </div>
			</div>
			<div class="list-item">
			  <div class="item-title">
				<img src="../../static/activity/option.png" alt="">
				<span class="title">二级奖池</span>
			  </div>
			  <div class="item-info">
				<div class="info-img">
				  <img src="../../static/activity/huwei.png" alt="">
				  <span>iPhone 15 Pro Max 1T</span>
				</div>
				<div class="info">
				  <span>参与抽奖人数满2000人，升级为二级奖池，抽取1名幸运用户免费赠送一部华为mate 60Pro。</span>
				  <div v-if="lotterUserNum < 1000" class="info-state">奖池待升级</div>
					<div v-else class="info-state" :class="{'info-state-progressing': lotterUserNum >= 1000 && lotterUserNum < 2000}">{{ lotterUserNum >= 1000 && lotterUserNum < 2000 ? '进行中' : '奖池已升级' }}</div>
				</div>
			  </div>
			</div>
			<div class="list-item">
			  <div class="item-title">
				<img src="../../static/activity/option.png" alt="">
				<span class="title">三级奖池</span>
			  </div>
			  <div class="item-info">
				<div class="info-img">
				  <img src="../../static/activity/ipad.png" alt="">
				  <span>iPhone 15 Pro Max 1T</span>
				</div>
				<div class="info">
				  <span>参与抽奖人数满3000人，升级为三级奖池，抽取1名幸运用户免费赠送一部Pad。</span>
				  <div v-if="lotterUserNum < 2000" class="info-state">奖池待升级</div>
					<div v-else class="info-state" :class="{'info-state-progressing': lotterUserNum >= 2000 && lotterUserNum < 3000}">{{ lotterUserNum >= 2000 && lotterUserNum < 3000 ? '进行中' : '奖池已升级' }}</div>
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
		};
	},
	mounted() {

		setInterval(() => {
			this.lotterTimer()
		}, 1000);

		this.getPoint()
		this.getUserCount()
		this.getCoupon()
		this.getUserCountInvited()
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
			}, 0);
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
			this.$api.lotteryDraw({
				id: uni.getStorageSync('openid'),
				copies: 1,
			}).then(res => {
				if (res == 200) {
					this.toast('抽奖成功')
				} else {
					this.toast(res.msg)
				}
				this.getPoint()
				this.getUserCount()
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
				path: '/pages/index/index?invitedId=' + uni.getStorageSync('openid')
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
					this.lotterUserNum = res.data.userNum
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
		}
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
		  margin-top: 10px;
		  width: 100%;
		  display: flex;
		  flex-direction: row;
		  .pool-line {
			margin-top: 8vw;
			width: 5%;
			background: rgb(175, 175, 175);
			border-radius: 10vw;
			position: relative;
			.line {
			  width: 100%;
			  height: 50%;
			  position: absolute;
			  top: 0;
			  left: 0;
			  border-radius: 10vw;
			  background: rgb(255, 102, 0);
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
				margin-bottom: 15px;
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
				  width: 80vw;
				  height: 30vw;
				  display: flex;
				  flex-direction: column;
				  img {
					width: 100%;
				  }
				  span {
					color: black;
					font-size: 3.5vw;
					font-weight: bold;
					text-align: center;
					line-height: 4vw;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
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
						width: 22vw;
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