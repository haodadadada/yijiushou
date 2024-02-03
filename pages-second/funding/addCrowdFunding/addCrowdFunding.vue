<template>
	<view class="container">
		<view class="first">
			<view class="header"><span style="font-size: 24px; font-weight: 550; color: #34cd99;">1、</span>请输入众筹名称</view>
			<view class="content">
				<span style="color: #666;">众筹名称</span>
				<input type="text" placeholder="请输入众筹名称" placeholder-class="placeholder-style" v-model="fundingName" style="background-color: #ddd;"/>
				
				<span style="color: #666;">众筹描述(必填)</span>
				<textarea type="text" placeholder="请输入众筹相关描述/注意事项" placeholder-class="placeholder-style" v-model="fundingNotice" style="background-color: #ddd;"/>
			</view>
		</view>
		<view class="second">
			<view class="header"><span style="font-size: 24px; font-weight: 550; color: #34cd99;">2、</span>编辑众筹商品</view>
			<view class="content">
				<view class="img" @click="chooseImage">
					<img :src="fundingImg ? fundingImg : '/static/img/img.png'" alt="" />
					<span>点击上传商品图片</span>
				</view>
				<view class="count">
					<view class="money">
						<span>金额:</span>
						<input type="text" placeholder="请输入商品所需的金额" class="iptPoint" placeholder-class="placeholderPoint" v-model="fundingMoney"/>
					</view>
					<view class="tips">tips：金额由管理员审核后转化为等价众筹积分</view>
				</view>
			</view>
		</view>
		<view style="width: 100%; height: 10vh;"></view>
		<view class="next">
			<view class="content" @click="goNext">
				<span>下一步</span>
				<!-- <img src="/static/icon/dayuhao-white.png" alt="" style="width: 20px; height: 20px;" /> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fundingName: '',
				fundingNotice: '',
				fundingImg: '',
				fundingMoney: ''
			}
		},
		methods: {
			goNext() {
				console.log()
				if(!this.fundingName || !this.fundingNotice || !this.fundingImg || !this.fundingMoney) {
					this.$tools.toast('请完善众筹信息');
					return;
				}
				const {fundingName, fundingNotice, fundingImg, fundingMoney} = this;
				uni.navigateTo({
					url: `/pages-second/funding/addCrowdFundingSecond/addCrowdFundingSecond?fundingName=${fundingName}&fundingNotice=${fundingNotice}&fundingImg=${fundingImg}&fundingMoney=${fundingMoney}`
				})
			},
			chooseImage() {
				wx.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					success: async res => {
						// tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFiles[0].tempFilePath;
						console.log(tempFilePaths)
						uni.uploadFile({
							url: 'http://110.42.228.141:10010/pin/uploadProdcutPicture',
							filePath: tempFilePaths,
							name: 'file',
							success: res => {
								let data = JSON.parse(res.data);
								this.fundingImg = data.data;
								console.log('upload', data);
							},
							fail: error => {
								console.log('uploadfile', error)
							}
						})
					},
					fail: err => {
						console.log('choosefail', err);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px 15px;
		box-sizing: border-box;
		.first {
			.header {
				margin-bottom: 20px;
			}
			.content {
				input {
					padding: 20px 10px;
					background-color: #ccc;
					border-radius: 15px;
					margin-top: 10px;
					margin-bottom: 10px;
				}
				textarea {
					background-color: #ccc;
					border-radius: 15px;
					padding: 20px 10px;
					width: 100%;
					box-sizing: border-box;
					margin-top: 10px;
				}
				.placeholder-style {
					color: #666;
					background-color: #ddd;
				}
			}
		}
		.second {
			margin-top: 10px;
			.header {
				margin-bottom: 20px;
			}
			.content {
				display: flex;
				align-items: center;
				border-radius: 15px;
				background-color: #fff;
				padding: 20px 15px;
				.img {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border: 1px dashed #666;
					padding: 2vw 3vw;
					border-radius: 3vw;
					img {
						width: 16vw;
						height: 16vw;
						margin-bottom: 10px;
						background-color: #ddd;
					}
					span {
						font-size: 12px; 
						color: #666;
						word-break: keep-all;
					}
				}
				.count {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 10px;
					.money {
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px #ccc solid;
						margin-bottom: 10px;
						.iptPoint {
							padding: 5px 0;
							font-size: 12px;
						}
						span {
							margin-right: 5px;
							flex-grow: 1;
							white-space: nowrap;
						}
					}	
					.tips {
						color: #ccc;
						font-size: 12px;
					}
				}
			}
		}
		.next {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			padding: 3vh 0;
			.content {
				display: flex;
				align-items: center;
				position: relative;
				width: 50%;
				margin: 0 auto;
				background-color: #34cd99;
				padding: 10px;
				text-align: center;
				border-radius: 10px;
				color: #fff;
				span:nth-child(1) {
					margin: 0 auto;
				}
				span:nth-child(2) {
					position: absolute;
					right: 10px;
				}
			}
		}
	}
</style>