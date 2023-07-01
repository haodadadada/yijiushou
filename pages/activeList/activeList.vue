<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,i) in list" :key="i" @click="goDetail(item.id)">
				<image :src="item.image" mode="aspectFill"></image>
				<view class="size-32 px-20 py-10">{{item.name}}</view>
				<view class="size-26 px-20 gray-7 line-clamp">{{item.description}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				list:[]
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
				this.$api.activity({
					page:this.page
				}).then(res=>{
					this.list.push(...res.data.data)
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'../benefitDetail/benefitDetail?id=' + id
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
.list{
	padding: 20upx;
	.item{
		background: #fff;
		border-radius: 16upx;
		margin-bottom: 20upx;
		padding-bottom: 20upx;
		image{
			width: 100%;
			height: 400upx;
		}
	}
}
</style>
