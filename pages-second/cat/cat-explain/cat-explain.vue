<template>
	<view class="container">
		<view class="header flex">
			<view class="icon"><img src="/static/cat/item1.png" alt="" style="width: 100%; height: 100%;"/></view>
			<view class="title">众筹说明</view>
		</view>
		<view class="tips">在此我们将为您详细介绍众筹池相关说明，若阅读完仍有疑问，欢迎联系校园猫咪协会或联系客服。</view>
		<view class="contain">
			<view class="item">
				<view class="top flex">
					<view class="icon"><img src="/static/cat/cat-icon.png" alt="" style="width: 100%; height: 100%;" /></view>
					<view class="item-word">众筹池用途</view>
				</view>
				<view class="content">众筹池内的积分到达一定数额后，将会1:1兑换为现金（1积分=1元），交与校内猫咪救助群群主，用于校园猫咪救护活动，并于校喵池内实时更新开销情况。</view>
			</view>
			<view class="item">
				<view class="top flex">
					<view class="icon"><img src="/static/cat/cat-icon.png" alt="" style="width: 100%; height: 100%;" /></view>
					<view class="item-word">众筹池来源</view>
				</view>
				<view class="content">
					<view class="paragraph ">（1）依旧收团体将于众筹活动开始时，便投入部分积分作为基础基金，后续由用户自行投入积分。</view>
					<view class="paragraph ">（2）用户在首页上方点击“设置投入比例”，自行定义好投入比例后，每次回收完成后所获取的部分积分将按此比例自动投入众筹池。</view>
					<view class="paragraph ">（3）用户在首页上方点击“投入现有积分”，输入需要投入的积分数（不超过现有积分数），即可马上将积分投入众筹池。  </view>
					<view class="paragraph ">
						<view style="color: rgba(118, 196, 181, 1); font-weight: 550;">tips：如何获取积分？</view>
						<view>进入依旧收小程序，点击下单，预约上门回收，每次回收完将会获得相应积分。</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container {
		padding: 15px;
		.header {
			.icon {
				width: 45px;
				height: 50px;
				margin-right: 10px;
			}
			.title {
				font-size: 24px;
				font-weight: 400;
				color: rgba(118, 196, 181, 1);
			}
		}
		.tips {
			font-size: 11px;
			font-weight: 500;
			letter-spacing: 1.1px;
			line-height: 15px;
			text-align: left;
			vertical-align: top;
			margin: 15px 0;
		}
		.contain {
			.item {
				padding: 10px 10px 30px;
				border-radius: 15px;
				background-color: #fff;
				margin-bottom: 15px;
				.top {
					.icon {
						width: 16px;
						height: 16px;
						margin-right: 10px;
					}
					.item-word {
						color: rgba(118, 196, 181, 1);
					}
				}
				.content {
					padding: 10px 20px;
					font-size: 13px;
					.paragraph  {
						margin-bottom: 10px;
					}
				}
			}
		}

	}
</style>