<template>
	<view class="container" :class="windowHeight >= rootHeight ? 'bgc-window' : 'bgc-root'">
		<view class="header">
			<view class="left">
				<view class="top">
					<view>猫咪众筹池</view>
					<view>当前积分：<span>{{userPoint}}</span></view>
				</view>
				<view class="flex-between bottom">
					<span @click="handleSetScale">设置投入比例</span>
					<span @click="setScore = true">投入现有积分</span>
				</view>
			</view>
			<view class="right">
				<img src="https://www.19so.net/miniapp/cat-logo.png" alt="" style="width: 70%;" mode="widthFix"/>
			</view>
		</view>
		<view class="nav">
			<view class="item flex-center" @click="fundingExplain">
				<span class="nav-icon">
					<img src="/static/cat/item1.png" alt="" mode="widthFix" />
				</span>
				<span style="font-size: 14px;">众筹说明</span>
			</view>
			<view class="item flex-center" @click="gotoscience">
				<span class="nav-icon">
					<img src="/static/cat/item2.png" alt="" mode="widthFix" />
				</span>
				<span style="font-size: 14px;">科普中心</span>
			</view>
			<view class="item flex-center" @click="goFeedback">
				<span class="nav-icon">
					<img src="/static/cat/item3.png" alt="" mode="widthFix" />
				</span>
				<span style="font-size: 14px;">留言反馈</span>
			</view>
			<view class="item flex-center">
				<span class="nav-icon">
					<img src="/static/cat/item4.png" alt="" mode="widthFix" />
				</span>
				<span style="font-size: 14px;">关于我们</span>
			</view>
			<view class="item flex-center" @click="goUpload">
				<span class="nav-icon">
					<img src="/static/cat/item5.png" alt="" mode="widthFix" />
				</span>
				<span style="font-size: 14px;">新喵上传</span>
			</view>
		</view>
		<view class="contain">
			<view class="top">
				<span class="item" :class="{'item-bgc': locationStatus === 0}" @click="locationStatus = 0">西校区</span>
				<span class="item" :class="{'item-bgc': locationStatus === 1}" @click="locationStatus = 1">中校区</span>
				<span class="item" :class="{'item-bgc': locationStatus === 2}" @click="locationStatus = 2">东校区</span>
			</view>
			<view class="search">
				<img src="/static/cat/search.png" alt=""/>
				<input type="text" placeholder="请输入猫咪昵称进行查找" placeholder-style="color: rgba(118, 196, 181, 1); font-size: 12px;" />
			</view>
			<view class="box-cat">
				<view class="box-item">
					<view class="title">
						<img src="/static/cat/paw.png" alt="" style="width: 12px; height: 12px; margin-right: 5px;" />
						<span class="title-font">在校</span>
					</view>
					<view class="box-cat">
						<swiper :autoplay="false"class="main-banner" style="width: 100%; height: 75px; margin-top: 10px;" :circular="true" :current="firstOptionStatus" @change="changeOption(0, $event)" >
							<swiper-item style="display: flex;" v-for="(item, pageIndex) of firstOptionPage[locationStatus]" :key="pageIndex">
								<view class="cat-school" v-if="pageIndex !== firstOptionPage[locationStatus] - 1">
									<view class="cat-item" @click="goCatDetail(catInfo[locationStatus][0][index + pageIndex * optionCount].id)" v-for="(item, index) of optionCount" :key="catInfo[locationStatus][0][index + pageIndex * optionCount].id" >
										<img :src="catInfo[locationStatus][0][index + pageIndex * optionCount].img" alt="" />
										<view class="name">{{catInfo[locationStatus][0][index + pageIndex * optionCount].name}}</view>
									</view>
								</view>
								<view class="cat-school" v-else>
									<view class="cat-item" @click="goCatDetail(catInfo[locationStatus][0][index + pageIndex * optionCount].id)" v-for="(item, index) of (firstOptionImgs[locationStatus] - pageIndex * optionCount)" :key="catInfo[locationStatus][0][index + pageIndex * optionCount].id">
										<img :src="catInfo[locationStatus][0][index + pageIndex * optionCount].img" alt="" />
										<view class="name">{{catInfo[locationStatus][0][index + pageIndex * optionCount].name}}</view>
									</view>
								</view>
							</swiper-item> 
						</swiper>
						<view class="cat-option flex-center" v-if="firstOptionPage[locationStatus] !== 1">
							<view class="cat-option-item" :class="{'choose': firstOptionStatus === index}" @click="firstOptionStatus = index" v-for="(item, index) of firstOptionPage[locationStatus]" :key="index" ></view>
						</view>
					</view>
				</view>
				<view class="box-item">
					<view class="title">
						<img src="/static/cat/paw.png" alt="" style="width: 12px; height: 12px; margin-right: 5px;" />
						<span class="title-font">毕业</span>
					</view>
					<view class="box-cat">
						<swiper :autoplay="false"class="main-banner" style="width: 100%; height: 75px; margin-top: 10px;" :circular="true" :current="secondOptionStatus" @change="changeOption(1, $event)">
							<swiper-item style="display: flex;" v-for="(item, pageIndex) of secondOptionPage[locationStatus]" :key="pageIndex">
								<view class="cat-school" v-if="pageIndex !== secondOptionPage[locationStatus] - 1">
									<view class="cat-item" @click="goCatDetail(catInfo[locationStatus][1][index + pageIndex * optionCount].id)" v-for="(item, index) of optionCount" :key="catInfo[locationStatus][1][index + pageIndex * optionCount].id">
										<img :src="catInfo[locationStatus][1][index + pageIndex * optionCount].img" alt="" />
										<view class="name">{{catInfo[locationStatus][1][index + pageIndex * optionCount].name}}</view>
									</view>
								</view>
								<view class="cat-school" v-else>
									<view class="cat-item" @click="goCatDetail(catInfo[locationStatus][1][index + pageIndex * optionCount].id)" v-for="(item, index) of (secondOptionImgs[locationStatus] - pageIndex * optionCount)" :key="catInfo[locationStatus][1][index + pageIndex * optionCount].id">
										<img :src="catInfo[locationStatus][1][index + pageIndex * optionCount].img" alt="" />
										<view class="name">{{catInfo[locationStatus][1][index + pageIndex * optionCount].name}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<view class="cat-option flex-center" v-if="secondOptionPage[locationStatus] !== 1">
							<view class="cat-option-item" :class="{'choose': secondOptionStatus === index}" @click="secondOptionStatus = index" v-for="(item, index) of secondOptionPage[locationStatus]" :key="index"></view>
						</view>
					</view>
				</view>
				<view class="box-item">
					<view class="title">
						<img src="/static/cat/paw.png" alt="" style="width: 12px; height: 12px; margin-right: 5px;" />
						<span class="title-font">喵星</span>
					</view>
					<view class="box-cat">
						<swiper :autoplay="false"class="main-banner" style="width: 100%; height: 75px; margin-top: 10px;" :circular="true" :current="thirdOptionStatus" @change="changeOption(2, $event)">
							<swiper-item style="display: flex;" v-for="(item, pageIndex) of thirdOptionPage[locationStatus]" :key="pageIndex">
								<view class="cat-school" v-if="pageIndex !== thirdOptionPage[locationStatus] - 1">
									<view class="cat-item" @click="goCatDetail(catInfo[locationStatus][2][index + pageIndex * optionCount].id)" v-for="(item, index) of optionCount" :key="catInfo[locationStatus][2][index + pageIndex * optionCount].id">
										<img :src="catInfo[locationStatus][2][index + pageIndex * optionCount].img" alt="" />
										<view class="name">{{catInfo[locationStatus][2][index + pageIndex * optionCount].name}}</view>
									</view>
								</view>
								<view class="cat-school" v-else>
									<view class="cat-item" @click="goCatDetail(catInfo[locationStatus][2][index + pageIndex * optionCount].id)" v-for="(item, index) of (thirdOptionImgs[locationStatus] - pageIndex * optionCount)" :key="catInfo[locationStatus][2][index + pageIndex * optionCount].id">
										<img :src="catInfo[locationStatus][2][index + pageIndex * optionCount].img" alt="" />
										<view class="name">{{catInfo[locationStatus][2][index + pageIndex * optionCount].name}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<view class="cat-option flex-center" v-if="thirdOptionPage[locationStatus] !== 1">
							<view class="cat-option-item" :class="{'choose': thirdOptionStatus === index}" @click="thirdOptionStatus = index" v-for="(item, index) of thirdOptionPage[locationStatus]" :key="index"></view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view style="width: 100vw; height: 5vh; background-color: #fff;"></view>
		<u-modal :show="setScale" :showConfirmButton="false">
			<view class="modal">
				<view class="icon" @click="setScale = false"></view>
				<view class="title">设置投入比例</view>
				<view class="main-word">
					在设定了投入比例之后，您每次通过回收活动所获得的积分，将会根据这个事先设定好的比例自动投入到众筹池中。感谢您对校园猫咪的帮助～
				</view>
				<view class="flex">
					<view class="process">
						<span class="processIcon" @touchstart="touchStart" @touchmove="touchMove" style="position: absolute; transform: translate(-10px); width: 20px; height: 20px; border-radius: 10px; z-index: 1;" :style="'left:' + `${iconLeftPrecent}%`">
							<img src="/static/cat/cat-icon.png" alt=""  style="width: 100%; height: 100%;"/>
						</span>
						<span style="position: absolute; flex-grow: 1; height: 20px; border-radius: 99999px; background-color: rgba(118, 196, 181, 1);" :style="'width:' + `${iconLeftPrecent}%`"></span>
						<span @touchstart="touchProcess" style="flex-grow: 1; height: 20px; border-radius: 99999px; background-color: #ddd; opacity: .3;"></span>
					</view>
					<span style="width: 28px;">{{Math.floor(iconLeftPrecent)}}</span>
				</view>
				<view class="flex-center" style="margin-top: 50px; text-align: center; color: #fff;"><span style="width: 40vw; padding: 5px; background-color: rgba(118, 196, 181, 1); border-radius: 10px;" @click="confirmSetScale">确定</span></view>
			</view>
		</u-modal>
		<u-modal :show="setScore" :showConfirmButton="false">
			<view class="modal">
				<view class="icon" @click="setScore = false"></view>
				<view class="title">投入现有积分</view>
				<view class="main-word">
					您可以自行输入要投入到众筹池中的积分数，从当前已有的积分中，输入一定数量的积分投入众筹池。感谢您对校园猫咪的帮助～
				</view>
				<view class="current-score flex">
					<view style="margin-right: 10px;">当前积分:</view>
					<view style="color: rgba(118, 196, 181, 1);">{{userPoint}}</view>
				</view>
				<view class="enter-score flex">
					<view style="margin-right: 10px;">请输入投入的积分:</view>
					<input type="number" v-model="putScore" style="background-color: #ddd; padding: 3px 10px; flex: 1; border-radius: 10px; font-size: 12px;" />
				</view>
				<view class="flex-center" style="margin-top: 50px; text-align: center; color: #fff;"><span style="width: 40vw; padding: 5px; background-color: rgba(118, 196, 181, 1); border-radius: 10px;" @click="confirmSetScore">确定</span></view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				userPoint: '',
				windowHeight: '',
				windowWidth: '',
				rootHeight: '',
				setScale: false,
				setScore: false,
				putScore: 0,
				locationStatus: 0,
				catInfo: [],
				optionCount: 0,
				
				// 第几页
				firstOptionStatus: 0,
				firstOptionPage: [],
				firstOptionImgs: [],
				
				secondOptionStatus: 0,
				secondOptionPage: [],
				secondOptionImgs: [],
				
				thirdOptionStatus: 0,
				thirdOptionPage: [],
				thirdOptionImgs: [],
				
				iconLeftPrecent: 100,
				processWidth: '',
				processLeft: ''
			}
		},
		methods: {
			handleSetScale() {
				this.setScale = true;
				setTimeout(() => {
					this.getProcessWidth();
				}, 500);
			},
			touchStart() {
				
			},
			touchMove(event) {
				this.handleMove(event);
			},
			touchProcess(event) {
				this.handleMove(event);
			},
			handleMove(event) {
				this.iconLeftPrecent = ((event.changedTouches[0].clientX - this.processLeft) / this.processWidth) * 100;
				if(this.iconLeftPrecent <= 0) {
					this.iconLeftPrecent = 0;
				}
				else if(this.iconLeftPrecent >= 100){
					this.iconLeftPrecent = 100;
				}
			},
			async getProcessWidth() {
				uni.createSelectorQuery().select('.process').boundingClientRect().exec(data => {
					this.processWidth = data[0].width;
					this.processLeft = data[0].left;
					console.log(data);
				})
			},
			async confirmSetScale() {
				let res = await this.$api.setUserInputRatio({
					id: this.userInfo.openid,
					ratio: Math.floor(this.iconLeftPrecent)
				})
				console.log(res);
				this.setScale = false;
			},
			async confirmSetScore() {
				if(this.putScore !== 0) {
					let res = await this.$api.setUserInputScore({
						user_id: this.userInfo.openid,
						put_points: this.putScore
					})
					if(res.code === 200) {
						setTimeout(() => {
							this.$tools.toast('投入成功');
						}, 500);
						this.putScore = 0;
						this.getUserPoint();
					}
					console.log(res);
				}
				else {
					this.$tools.toast('投入积分不能为0');
				}
			},
			gotoscience(){
				uni.navigateTo({
					url: '/pages-second/cat/cat-science/cat-science'
				})
			},
			fundingExplain() {
				uni.navigateTo({
					url: '/pages-second/cat/cat-explain/cat-explain'
				})
			},
			goCatDetail(id) {
				uni.navigateTo({
					url: `/pages-second/cat/cat-detail/cat-detail?id=${id}`
				})
			},
			goUpload() {
				uni.navigateTo({
					url: '/pages-second/cat/cat-upload/cat-upload'
				})
			},
			goFeedback() {
				uni.navigateTo({
					url: '/pages-second/cat/cat-feedback/cat-feedback'
				})
			},
			changeOption(index, e) {
				if(index === 0) {
					this.firstOptionStatus = e.detail.current;
				}
				else if(index === 1) {
					this.secondOptionStatus = e.detail.current;
				}
				else if(index === 2) {
					this.thirdOptionStatus = e.detail.current;
				}
			},
			async homepageDisplay() {
				let result = await this.$api.homepageDisplay();
				if(result.code === 200) {
					this.catInfo = result.data;
					this.firstOptionImgs = [this.catInfo[0][0].length, this.catInfo[1][0].length, this.catInfo[2][0].length];
					this.secondOptionImgs = [this.catInfo[0][1].length, this.catInfo[1][1].length, this.catInfo[2][1].length];
					this.thirdOptionImgs = [this.catInfo[0][2].length, this.catInfo[1][2].length, this.catInfo[2][2].length];
					
					this.firstOptionPage = [Math.ceil(this.firstOptionImgs[0] / this.optionCount), Math.ceil(this.firstOptionImgs[1] / this.optionCount), Math.ceil(this.firstOptionImgs[2] / this.optionCount)];
					this.secondOptionPage = [Math.ceil(this.secondOptionImgs[0] / this.optionCount), Math.ceil(this.secondOptionImgs[1] / this.optionCount), Math.ceil(this.secondOptionImgs[2] / this.optionCount)];
					this.thirdOptionPage = [Math.ceil(this.thirdOptionImgs[0] / this.optionCount), Math.ceil(this.thirdOptionImgs[1] / this.optionCount), Math.ceil(this.thirdOptionImgs[2] / this.optionCount)];
				}
				else {
					this.$tools.toast('获取信息失败');
				}
			},
			async getUserPoint() {
				let res = await this.$api.getUserPoint({
					id: this.userInfo.openid
				})
				if(res.code === 200) {
					this.userPoint = res.data;
				}
				else {
					this.$tools.toast('获取积分失败');
				}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.getUserPoint();
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
					this.windowWidth = res.windowWidth;
				}
			})
			uni.createSelectorQuery().select('.container').boundingClientRect().exec(data => {
				this.rootHeight = data[0].height;
			})
			// 一页的数量
			this.optionCount = Math.floor(this.windowWidth * 0.92 / 80);
		},
		onShow() {
			this.homepageDisplay();
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
		width: 100vw;
		.header {
			display: flex;
			justify-content: space-between;
			background-color: #34cd99;
			width: 96vw;
			margin-left: 2vw;
			padding: 4vw 2vw;
			box-sizing: border-box;
			.left {
				margin-right: 10px;
				display: flex;
				justify-content: center;
				flex-direction: column;
				.top {
					margin-bottom: 15px;
				}
				.bottom {
					span {
						font-size: 12px;
						padding: 8px 3px; 
						background-color: white;
						margin-right: 10px;
						border-radius: 10px;
						box-shadow: 1px 1px 10px #666;
					}
				}
			}
			.right {
				flex: 1;
				display: flex;
				img {
					margin-left: auto;
				}
			}
		}
		.nav {
			display: flex;
			justify-content: space-around;
			align-items: flex-end;
			margin-top: 20px;
			.item {
				flex-direction: column;
			}
			.nav-icon {
				img {
					width: 27px;
				}
			}
		}
		.contain {
			margin-top: 20px;
			border-radius: 30px 30px 0 0;
			width: 100%;
			flex: 1;
			padding: 0 4vw;
			box-sizing: border-box;
			background-color: #fff;
			.top {
				display: flex;
				justify-content: center;
				.item {
					padding: 5px 20px;
					border-radius: 9999px;
				}
				.item-bgc {
					background-color: rgba(118, 196, 181, 1);
					color: #fff;
				}
			}
			.search {
				display: flex;
				align-items: center;
				border: 1px rgba(118, 196, 181, 1) solid;
				padding: 2px 10px;
				box-sizing: border-box;
				margin-top: 10px;
				border-radius: 9999px;
				img {
					width: 15px;
					height: 15px;
					margin-right: 5px;
				}
				input {
					padding: 5px 0;
					height: 1.2rem;
					min-height: 1.2rem;
				}
			}
			.box-item {
				margin-top: 10px;
				img {
					width: 100%;
					height: 100%;
				}
				.title {
					display: flex;
					align-items: center;
					.title-icon {
						width: 12px;
						height: 12px;
					}
					.title-font {
						font-size: 14px;
						font-weight: 550;
					}
				}
				.box-cat {
					.cat-school {
						display: flex;
						flex-wrap: nowrap;
						margin-bottom: 10px;
						.cat-item {
							flex-shrink: 0;
							display: flex;
							flex-direction: column;
							overflow: hidden;
							width: 65px;
							height: 65px;
							background-color: pink;
							border-radius: 10px;
							margin-right: 15px;
							margin-bottom: 10px;
							img {
								width: 65px;
								height: 49px;
							}
							.name {
								text-align: center;
								width: 65px;
								line-height: 16px;
								font-size: 14px;
								background-color: rgba(118, 196, 181, 1);
								color: #fff;
							}
						}
					}
					.cat-option {
						.cat-option-item {
							transition: .3s;
							height: 5px;
							background-color: rgba(118, 196, 181, 1);
							border-radius: 9999px;
							margin-right: 5px;
							width: 12px;
						}
						.choose {
							width: 20px;
						}
					}
				}
			}
		}
	}
	.modal {
		.icon {
			position: absolute;
			right: 20px;
			top: 10px;
			width: 20px;
			height: 20px;
			background-color: rgba(118, 196, 181, 1);
			border-radius: 10px;
		}
		.title {
			opacity: 1;
			font-size: 16px;
			font-weight: 550;
			line-height: 21.95px;
			vertical-align: top;
			text-align: center;
			margin-bottom: 5px;
		}
		.main-word {
			opacity: 1;
			font-size: 12px;
			font-weight: 400;
			letter-spacing: 0px;
			line-height: 13.72px;
			text-align: left;
			vertical-align: top;
			margin-bottom: 10px;
		}
		.process {
			display: flex;
			align-items: center;
			position: relative;
			flex: 1;
			margin-right: 15px;
		}
		.current-score {
			margin-bottom: 10px;
		}
	}

</style>