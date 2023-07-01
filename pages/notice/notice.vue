<template>
	<view>
		<view class="flex px-42 py-28 bg-white mt-1">
			<image class="icon" src="../../static/msg_icon_list_msg@2x.png" mode=""></image>
			<view class="size-32 ml-14">系统通知</view>	
		</view>
		<view class="p-14">
			<view class="list">
				<view class="item bg-white p-26" v-for="item in list" :key="item.id">
					<view class="flex-between">
						<view class="gray-0 size-30 text-bold">{{item.typename}}</view>
						<view class="gray-9 size-28">{{item.createtime}}</view>
					</view>
					<view class="size-28 mt-10">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1
			};
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods:{
			getList(){
				this.$api.message({
					openid:uni.getStorageSync('openid'),
					page:this.page
				}).then(res=>{
					this.list.push(...res.data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.icon{
		width: 32upx;
		height: 32upx;
	}
.list{
	.item{
		border-radius: 12upx;
		margin-bottom: 12upx;
	}
}
</style>
