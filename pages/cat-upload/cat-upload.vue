<template>
	<view class="container">
		<view class="header">
			<view class="icon flex">
				<img src="" alt="" />
				<view>新喵上传</view>
			</view>
			<view class="tip">若您发现有新猫咪未被收录进校喵池，可填写相关信息然后点击上传，管理员进行核实后会及时更新校喵池～</view>
		</view>
		<view class="contain">
			<view class="top flex">
				<view class="icon"></view>
				<view class="title">信息表</view>
			</view>
			<view class="info">
				<view class="info-item">
					<view class="left">发现地点</view>
					<textarea class="info-text" v-model="catArea" placeholder="必填, 越详细越好" placeholder-style="font-size: 14px" maxlength="50"></textarea>
				</view>
				<view class="info-item">
					<view class="left">毛发特征</view>
					<textarea class="info-text" v-model="catFeature" placeholder="必填, 越详细越好" placeholder-style="font-size: 14px" maxlength="50"></textarea>
				</view>
				<view class="info-item">
					<view class="left">图片</view>
					<view class="right">
						<view style="display: flex; margin-right: 5px;">
							<view class="img" @click="chooseImage">
								<img src="/static/img/img.png" alt="" />
								<span>上传图片</span>
							</view>
						</view>
						<view class="item" v-for="item of catImgs" :key="item.tempFilePath">
							<img :src="item" alt="" style="width: 100%; height: 100%;"/>
						</view>
					</view>
				</view>
				<view class="info-item">
					<view class="left">其他补充</view>
					<textarea class="info-text" v-model="otherTip" maxlength="50" style="height: 25px;"></textarea>
				</view>
			</view>
			<view class="bottom flex-center">
				<view class="submit-btn" @click="submit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				catArea: '',
				catFeature: '',
				catImgs: [],
				otherTip: '',
			}
		},
		methods: {
			chooseImage() {
				wx.chooseMedia({
					count: 5,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					success: async res => {
						// tempFilePath可以作为img标签的src属性显示图片
						let {tempFiles} = res;
						for(let i = 0; i < tempFiles.length; i++) {
							uni.uploadFile({
								url: 'http://110.42.228.141:10010/cat/upload/pictures', //仅为示例，非真实的接口地址
								filePath: tempFiles[i].tempFilePath,
								name: 'files',
								formData: {
									
								},
								success: (uploadFileRes) => {
									let res = JSON.parse(uploadFileRes.data);
									this.catImgs.push(res.data[0]);
								},
								fail: err => {
									console.log(err);
								}
							});
						}
					},
					fail: err => {
						console.log('choosefail', err);
					}
				})
			},
			async submit() {
				let res1 = await this.$api.catAdd({
					locationOfDiscovery: this.catArea,
					coatColor: this.catFeature,
					others: this.otherTip,
					picture: this.catImgs[0],
					uploadUser: this.userInfo.openid,
					userPhone: this.userInfo.phone
				})
				console.log(res1);
				let res2 = await this.$api.picturesToCat({
					imgUrls: '"' + this.catImgs[0] + '"',
					catUploadId: res1.data.id
				})
				console.log(res2);
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 15px;
		.header {
			padding: 20px 0;
			margin-bottom: 10px;
			.icon {
				margin-bottom: 10px;
				img {
					width: 40px;
					height: 45px;
					margin-right: 15px;
					background-color: pink;
				}
			}
			.tip {
				font-size: 14px;
				font-weight: 500;
			}
		}
		.contain {
			background-color: #fff;
			border-radius: 15px;
			padding: 15px;
			.top {
				margin-bottom: 20px;
				.icon {
					width: 24px;
					height: 24px;
					margin-right: 10px;
					background-color: #34cd99;
				}
				.title {
					font-size: 20px;
					color: rgba(118, 196, 181, 1);
					font-weight: 550;
				}
			}
			.info {
				.info-item {
					display: flex;
					margin-bottom: 10px;
					.left {
						margin-right: 15px;
						font-size: 14px;
						text-align: justify;
						text-align-last: justify;
						// width: 56px;
						flex: 1;
					}
					.right {
						display: flex;
						flex-wrap: wrap;
						flex: 4;
						.item {
							width: 70px;
							height: 75px;
							border-radius: 3vw;
							background: #ddd;
							margin-right: 5px;
							margin-bottom: 10px;
						}
					}
					.info-text {
						flex: 4;
						background-color: #ddd;
						border-radius: 20px;
						padding: 10px;
						height: 35px;
						font-size: 14px;
					}
					.img {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						border: 1px dashed #666;
						border-radius: 3vw;
						width: 70px;
						height: 75px;
						margin-bottom: 10px;
						img {
							width: 45px;
							height: 45px;
							// background-color: #ddd;
						}
						span {
							font-size: 10px; 
							color: #666;
							word-break: keep-all;
						}
					}
				}
			}
			.bottom {
				margin-top: 10vh;
				.submit-btn {
					padding: 10px 40px;
					background-color: rgba(118, 196, 181, 1);
					border-radius: 15px;
					color: #fff;
				}
			}
		}
	}
</style>