<template>
	<view class="container" :class="windowHeight >= rootHeight ? 'bgc-window' : 'bgc-root'">
		<view class="header">
			<view class="left">
				<view class="top">
					<view>猫咪众筹池</view>
					<view>当前积分：<span>xxxx</span></view>
				</view>
				<view class="flex-between bottom">
					<span @click="setScale = true">设置投入比例</span>
					<span @click="setScore = true">投入现有积分</span>
				</view>
			</view>
			<view class="right">
				
			</view>
		</view>
		<view class="nav flex-around">
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
			<view class="item flex-center">
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
				<span class="item" :class="{'item-bgc': status === 0}" @click="status = 0">西校区</span>
				<span class="item" :class="{'item-bgc': status === 1}" @click="status = 1">中校区</span>
				<span class="item" :class="{'item-bgc': status === 2}" @click="status = 2">东校区</span>
			</view>
			<view class="search">
				<img src="/static/cat/search.png" alt=""/>
				<input type="text" placeholder="请输入猫咪昵称进行查找" placeholder-style="color: rgba(118, 196, 181, 1); font-size: 12px;" />
			</view>
			<view class="box-item">
				<view class="title">
					<span class="title-icon"></span>
					<span class="title-font">在校</span>
				</view>
				<view class="box-cat">
					<swiper :autoplay="false"class="main-banner" style="width: 100%; height: 75px; margin-top: 10px;" :circular="true" :current="firstOptionStatus" @change="changeOption(0, $event)" >
						<swiper-item style="display: flex;" v-for="(item, index) of firstOptionPage" :key="index">
							<view class="cat-school">
								<view class="cat-item" @click="goCatDetail" v-for="(item, index) of optionCount" :key="index">
									<img src="" alt="" />
									<view class="name">111</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="cat-option flex-center">
						<view class="cat-option-item" :class="{'choose': firstOptionStatus === index}" @click="firstOptionStatus = index" v-for="(item, index) of firstOptionPage" :key="index"></view>
					</view>
				</view>
			</view>
			<view class="box-item">
				<view class="title">
					<span class="title-icon"></span>
					<span class="title-font">毕业</span>
				</view>
				<view class="box-cat">
					<swiper :autoplay="false"class="main-banner" style="width: 100%; height: 75px; margin-top: 10px;" :circular="true" :current="secondOptionStatus" @change="changeOption(1, $event)">
						<swiper-item style="display: flex;" v-for="(item, index) of secondOptionPage" :key="index">
							<view class="cat-school">
								<view class="cat-item" @click="goCatDetail" v-for="(item, index) of optionCount" :key="index">
									<img src="" alt="" />
									<view class="name">111</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="cat-option flex-center">
						<view class="cat-option-item" :class="{'choose': secondOptionStatus === index}" @click="secondOptionStatus = index" v-for="(item, index) of secondOptionPage" :key="index"></view>
					</view>
				</view>
			</view>
			<view class="box-item">
				<view class="title">
					<span class="title-icon"></span>
					<span class="title-font">喵星</span>
				</view>
				<view class="box-cat">
					<view class="cat-school">
						<view class="cat-item">
							<img src="" alt="" />
							<view class="name">111</view>
						</view>
						<view class="cat-item"></view>
					</view>
					<view class="cat-option flex-center">
						<view class="cat-option-item choose"></view>
						<view class="cat-option-item"></view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100vw; height: 5vh; background-color: #fff;"></view>
		<u-modal :show="setScale" @confirm="confirmSetScale" :showConfirmButton="false">
			<view class="modal">
				<view class="icon" @click="setScale = false"></view>
				<view class="title">设置投入比例</view>
				<view class="main-word">
					在设定了投入比例之后，您每次通过回收活动所获得的积分，将会根据这个事先设定好的比例自动投入到众筹池中。感谢您对校园猫咪的帮助～
				</view>
				<view class="process">
					<span style="position: absolute; transform: translate(-10px); width: 16px; height: 16px; background-image: url(/static/cat/cat-icon.png); background-size: 100%; border-radius: 10px; padding: 2px; z-index: 1;" :style="'left:' + `${20}%`"></span>
					<span style="position: absolute; flex-grow: 1; height: 20px; border-radius: 99999px;background-color: rgba(118, 196, 181, 1);" :style="'width:' + `${20}%`"></span>
					<span style="flex-grow: 1; height: 20px; border-radius: 99999px; background-color: #ddd; opacity: .3;"></span>
				</view>
			</view>
		</u-modal>
		<u-modal :show="setScore" @confirm="confirmSetScore" :showConfirmButton="false">
			<view class="modal">
				<view class="icon" @click="setScore = false"></view>
				<view class="title">投入现有积分</view>
				<view class="main-word">
					您可以自行输入要投入到众筹池中的积分数，从当前已有的积分中，输入一定数量的积分投入众筹池。感谢您对校园猫咪的帮助～
				</view>
				<view class="current-score flex">
					<view style="margin-right: 10px;">当前积分:</view>
					<view style="color: rgba(118, 196, 181, 1);">xxxx</view>
				</view>
				<view class="enter-score flex">
					<view style="margin-right: 10px;">请输入投入的积分:</view>
					<input type="number" style="background-color: #ddd; padding: 3px 10px; flex: 1; border-radius: 10px; font-size: 12px;" />
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				windowWidth: '',
				rootHeight: '',
				setScale: false,
				setScore: false,
				
				status: 0,
				optionCount: 0,
				firstOptionStatus: 0,
				firstOptionPage: 0,
				firstOptionImgs: 10,
				
				secondOptionStatus: 0,
				secondOptionPage: 0,
				secondOptionImgs: 7
			}
		},
		methods: {
			confirmSetScale() {
				this.setScale = false;
			},
			confirmSetScore() {
				this.setScore = false;
			},
			gotoscience(){
				uni.navigateTo({
					url: '/pages/cat-science/cat-science'
				})
			},
			fundingExplain() {
				uni.navigateTo({
					url: '/pages/cat-explain/cat-explain'
				})
			},
			goCatDetail() {
				uni.navigateTo({
					url: '/pages/cat-detail/cat-detail'
				})
			},
			goUpload() {
				uni.navigateTo({
					url: '/pages/cat-upload/cat-upload'
				})
			},
			changeOption(index, e) {
				if(index === 0) {
					this.firstOptionStatus = e.detail.current;
				}
				else if(index === 1) {
					this.secondOptionStatus = e.detail.current;
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
					this.windowWidth = res.windowWidth;
				}
			})
			uni.createSelectorQuery().select('.container').boundingClientRect().exec(data => {
				this.rootHeight = data[0].height;
			})
			// this.firstOptionPage = Math.ceil();
			// 一页的数量
			this.optionCount = Math.floor(this.windowWidth * 0.92 / 80);
			this.firstOptionPage = Math.ceil(this.firstOptionImgs / this.optionCount);
			this.secondOptionPage = Math.ceil(this.secondOptionImgs / this.optionCount);
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
				background-color: pink;
			}
		}
		.nav {
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
				.title {
					display: flex;
					align-items: center;
					.title-icon {
						width: 9px;
						height: 6px;
						background-color: pink;
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
			margin-bottom: 5px;
		}
		.current-score {
			margin-bottom: 10px;
		}
	}

</style>