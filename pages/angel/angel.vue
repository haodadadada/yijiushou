<template>
	<view>
		<view class="section">
			<view class="title">提交资料</view>
			<view class="input-group input-group-1">
				<view class="item">
					<view class="label">姓名</view>
					<u-input type="text" v-model="nickname" border="none" placeholder="请输入您的姓名"></u-input>
				</view>
				<view class="item">
					<view class="label">手机号</view>
					<u-input text="number" maxlength="11" v-model="phone" border="none" placeholder="请输入您的手机号"></u-input>
				</view>
				<view class="item">
					<view class="label">所在地区</view>
					<picker mode="region" @change="selectArea">
						<view class="uni-input">{{ workcity || '请选择'}}</view>
					</picker>
				</view>
				<view class="item flex-start">
					<view class="label">备注</view>
					<u-textarea v-model="remark" border="none" placeholder="请输入备注信息"></u-textarea>
				</view>
			</view>
			
			<view class="btn" @click="submitApply">提交申请</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:uni.getStorageSync('userInfo'),
				area: '',
				phone:'',
				nickname:'',
				workcity:'',
				remark:'',
				baseUrl:'',
			};
		},
		onShow() {
			if(!uni.getStorageSync('openid')){
				uni.switchTab({
					url:'../user/user'
				})
				return
			}
		},
		onLoad() {
			this.baseUrl = this.$tools.baseUrl
		},
		methods: {
			// 选择地区
			selectArea(e) {
				console.log(e)
				this.workcity = `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
				this.city = `${e.detail.value[2]}`
			},
			
			submitApply(){
				if(!this.$tools.verifyName(this.nickname)){
					return
				}
				if(!this.$tools.verifyTelPhone(this.phone)){
					return
				}
				if(!this.$tools.isEmpty(this.workcity,'请选择所在地区')){
					return
				}
				this.$api.angelApply({
					openid:uni.getStorageSync('openid'),
					name:this.nickname,
					mobile:this.phone,
					area:this.workcity,
					remarks:this.remark,
				}).then(res=>{
					console.log(res)
					if(res.code==1){
						this.$tools.toast('提交成功，请耐心等待')
						setTimeout(()=>{
							uni.redirectTo({
								url:'../applySuccess/applySuccess'
							})
						},1000)
					}else{
						this.$tools.toast(res.msg)
					}
				})
			},
			gotregaggrement(){
				uni.navigateTo({
					url:'../regaggrement/regaggrement'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: var(--staus-bar);
		/* #endif */
		right: 0;
		z-index: 100;
		line-height: 88upx;
		display: flex;
		justify-content: space-between;
		background: #fff;

		.item {
			flex: 1;
			text-align: center;
			font-size: 30upx;
			color: #979797;
		}

		.cur {
			color: #fff;
			background: $color-primary;
		}
	}

	.section {
		padding: 0 0 40upx;

		.title {
			font-size: 30upx;
			font-weight: 500;
			color: #222222;
			padding: 40upx 40upx 26upx;
		}

		.id-card {
			padding: 0 40upx 18upx;

			.card {
				border-radius: 12upx;

				image {
					width: 308upx;
					height: 184upx;
					padding: 20upx 10upx;
					background: #FFFFFF;
					border-radius: 12upx;
				}

				view {
					text-align: center;
					font-size: 28upx;
					font-weight: 400;
					color: #979797;
					margin-top: 20upx;
				}
			}
		}

		.input-group {
			background: #fff;
			margin-bottom: 20upx;
				.insuranceimage{
					width: 300upx;
					height: 200upx;
					margin-left: 40upx;
					margin-top: 20upx;
				}
			.item {
				display: flex;
				align-items: center;
				min-height: 116upx;
				border-bottom: 1upx solid #F6F6F6;
				padding: 0 42upx;
				position: relative;
				
				.label {
					width: 240upx;
					font-size: 30upx;
					font-weight: 400;
					color: #222222;
				}
				

				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 100%;
				}
				/deep/ .uni-input{
					flex: 1;
					width: 100%;
				}
				.icon {
					position: absolute;
					right: 40upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			
			.flex-start{
				display: flex;
				align-items: flex-start;
				.label{
					margin-top: 18upx;
				}
				.u-textarea{
					padding: 18upx 0;
				}
			}
			
			&-1 {
				.item {
					.label {
						width: 140upx;
					}
				}
			}
		}
		.btn{
			width: 524upx;
			line-height: 96upx;
			margin: 20upx auto;
		}
	}
</style>
