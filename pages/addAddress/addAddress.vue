<template>
	<view class="content pb-30">
		<map :longitude="longitude" :latitude="latitude" :scale="16" style="width: 100%; height: 300px;"></map>
		<view class="input">
			<text>联系人</text>
			<input type="text" value="" placeholder="请输入联系人姓名" v-model="userName" />
		</view>
		<view class="input">
			<text>性别</text>
			<view class="sex" v-for="item in sexList" :key="item.id">
				<view class="item" :class="{cur:gender==item.id}"
				@click="gender=item.id">{{item.name}}</view>
			</view>
		</view>
		<view class="input">
			<text>手机号码</text>
			<input type="text" value="" placeholder="请输入手机号码" v-model="userPhone" />
		</view>
		<view class="input" @click="toggleCommunitySelection">
		  <text>社区信息</text>
		  <input v-model="areaName" />
		</view>

		<view class="input">
			<text>详细地址</text>
			<input type="text" value="" placeholder="例:xx号xx楼xx门牌" v-model="address" />
		</view>
		<view v-if="id" class="btn" @click="edit">确认修改</view>
		<view v-else class="btn" @click="submit">保存地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 0, // 经度
				latitude: 0, // 纬度

				region: '',
				txt: '选择社区',
				customItem: '',
				areaName: '', // 存储选中的社区
				areaId:'',
				communityOptions: [],          // 存储社区选项列表
				isCommunitySelectionOpen: false, // 控制社区选项列表的显示与隐藏
				userId:'',
				sexList:[
					{
						id:0,
						name:'先生'
					},
					{
						id:1,
						name:'女士'
					}
				],
				gender:0,
				userName: '',
				userPhone: '',
				address: '',				
				id:'',
				source:''
			};
		},
		onLoad(e) {
			this.baseUrl = this.$tools.baseUrl			
			if(e.source){
				this.source = e.source
			}
			if(e.id){
				this.getAddress(e.id)
				uni.setNavigationBarTitle({
					title:'编辑地址'
				})
			}else{
				this.getCommunity()
			}
			this.getCommunity()
			this.getLocation()
			this.initMap()
		},
		methods: {
			initMap(){
				uni.getLocation({
				    type: 'gcj02',
				    success: res => {
				        this.longitude = res.longitude;
				        this.latitude = res.latitude;
				    },
				    fail: res => {
				          console.error(res);
				        }
				      });
			},
			getLocation(){
				// 调用定位方法
				this.qqMap.reverseGeocoder({
				  success: (res) => {
				    // 获取定位成功的结果
				    const community = res.result.formatted_addresses.recommend;
					this.areaName = community;
				    // 其他逻辑处理
				    // ...
				  },
				  fail: (error) => {
				    // 定位失败的处理
				    console.log('定位失败', error)
				  }
				})

			},
			toggleCommunitySelection(){
				this.isCommunitySelectionOpen = !this.isCommunitySelectionOpen;
			},
			getCommunity(){
				this.$api.getCommunity().then(res=>{
					this.communityOptions = res.data
					console.log(this.communityOptions);
				})
			},
			searchCommunity(){
				this.isCommunitySelectionOpen = true;
			},
			selectCommunity(option) {
				this.areaId = option.areaId;
			    this.areaName = option.community;  // 将选中的社区赋值给 community
			    this.isCommunitySelectionOpen = false;  // 关闭社区选项列表
			  },
			// 获取修改地址信息
			getAddress(id){
				this.id = id;
				this.$api.getAddress({
					id:id
				}).then(res=>{
					this.userName = res.data.userName
					this.userPhone = res.data.userPhone
					this.gender = res.data.gender
					this.areaId = res.data.areaId
					this.areaName = res.data.areaName
					this.address = res.data.address
					this.userId = res.data.userId
				})
			},
			change(data) {
				this.txt = data.data.join('');
				console.log(data.data.join(''));
			},
			submit() {
				if (this.userName && this.userPhone && this.address) {
					this.$api.addAddress({
						userId: uni.getStorageSync('openid'),
						id : this.id,
						userName : this.userName,
						userPhone : this.userPhone,
						gender : this.gender,
						areaId : this.areaId,
						areaName : this.areaName,
						address : this.address 
					}).then(res=>{
						this.$tools.toast(res.msg)
						if(res.code==200){
							if(this.source=='placeOrder'){
								uni.navigateBack({
									delta:1
								})
							}else{
								uni.redirectTo({
									url:'../address/address'
								})
							}
							
						}
					})
				} else {
					uni.showToast({
						title: '请填写地址信息',
						icon: 'none'
					});
				}
			},
			// 修改地址
			edit() {
				if (this.userName && this.userPhone && this.address) {
					this.$api.siteAddres({
						userId: uni.getStorageSync('openid'),
						userName: this.userName,
						userPhone: this.userPhone,
						gender: this.gender,
						areaId:this.areaId,
						areaName: this.areaName,
						address: this.address,  
						id:this.id
					}).then(res=>{
						this.$tools.toast(res.msg)
						if(res.code==200){
							uni.redirectTo({
								url:'../address/address'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请填写地址信息',
						icon: 'none'
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.map {
		width: 100%;
		height: 588upx;
	}

	.address {
		border-radius: 16upx;
		margin-top: -16upx;
		padding: 32upx 0;

		.icon {
			width: 32upx;
			height: 32upx;
		}
	}

	.content {
		width: 100%;
		margin-top: 20upx;

		.addAddress {
			width: 80%;
			margin-left: 10%;
			// margin-left: 10%;
			height: 80upx;
			background-color: #eabd66;
			border-radius: 40upx;
			font-size: 32upx;
			color: #ffffff;
			line-height: 80upx;
			text-align: center;
		}
		
		.icon {
			position: absolute;
			right: 20upx;
			top: 50%;
			transform: translateY(-50%);
			width: 30upx;
		}

		.input {
			margin: 0 20upx;
			padding: 0 20upx;
			line-height: 100upx;
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #999999;
			border-bottom: 2upx solid #ededed;
			background: #fff;
			position: relative;
			.sex{
				display: flex;
				margin: 20upx 0;
				.item{
					font-size: 32upx;
					color: #C4C4C4;
					width: 128upx;
					line-height: 72upx;
					text-align: center;
					background: #FFFFFF;
					border-radius: 12upx;
					border: 1upx solid #C4C4C4;
					margin-right: 32upx;
				}
				.cur{
					color: #3BB061;
					border: 1upx solid #3BB061;
				}
			}
			text {
				font-size: 30upx;
				width: 170upx;
				min-width: 170upx;
				color: #222;
			}
			
			.text-1{
				padding-right: 50upx;
				line-height: 1.6;
				margin: 10upx 0;
			}

			input {
				font-size: 28upx;
				color: #999999;
			}
		}

		.input1 {
			width: 90%;
			height: 100upx;
			margin-left: 5%;
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #999999;
			border-bottom: 2upx solid #ededed;

			text {
				font-size: 30upx;
			}

			input {
				font-size: 28upx;
				color: #999999;
			}
		}
	}
	.option-item{
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btn{
		margin: 0 auto; 
	}
</style>
