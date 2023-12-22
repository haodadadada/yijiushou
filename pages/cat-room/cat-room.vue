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
					<span>投入现有积分</span>
				</view>
			</view>
			<view class="right">
				
			</view>
		</view>
		<view class="nav flex-around">
			<view class="item flex-center" @click="fundingExplain">
				<span class="nav-icon"></span>
				<span>众筹说明</span>
			</view>
			<view class="item flex-center">
				<span class="nav-icon"></span>
				<span>科普中心</span>
			</view>
			<view class="item flex-center">
				<span class="nav-icon"></span>
				<span>留言反馈</span>
			</view>
			<view class="item flex-center">
				<span class="nav-icon"></span>
				<span>关于我们</span>
			</view>
		</view>
		<view class="contain">
			<view class="top">
				<span class="item">西校区</span>
				<span class="item item-bgc">中校区</span>
				<span class="item">东校区</span>
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
					<view class="cat-school">
						<view class="cat-item" @click="goCatDetail">
							<img src="" alt="" />
							<view class="name">111</view>
						</view>
						<view class="cat-item"></view>
					</view>
					<view class="cat-option flex-center">
						<view class="cat-option-item choose"></view>
						<view class="cat-option-item notchoose"></view>
					</view>
				</view>
			</view>
			<view class="box-item">
				<view class="title">
					<span class="title-icon"></span>
					<span class="title-font">毕业</span>
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
						<view class="cat-option-item notchoose"></view>
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
						<view class="cat-option-item notchoose"></view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100vw; height: 5vh; background-color: #fff;"></view>
		<u-modal :show="setScale" @confirm="confirmSetScale">
			<view class="modal">
				<view class="icon" @click="setScale = false"></view>
				<view class="title">设置投入比例</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				rootHeight: '',
				setScale: false
			}
		},
		methods: {
			confirmSetScale() {
				this.setScale = false;
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
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			})
			uni.createSelectorQuery().select('.container').boundingClientRect().exec(data => {
				this.rootHeight = data[0].height;
			})
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
				width: 16px; 
				height: 16px; 
				background-color: pink;
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
						flex-wrap: wrap;
						margin-bottom: 10px;
						.cat-item {
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
							height: 5px;
							background-color: rgba(118, 196, 181, 1);
							border-radius: 9999px;
							margin-right: 5px;
						}
						.choose {
							width: 15px;
						}
						.notchoose {
							width: 8px;
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
			font-weight: 500;
			line-height: 21.95px;
			vertical-align: top;
		}
	}

</style>