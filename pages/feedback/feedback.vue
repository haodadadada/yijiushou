<template>
	<view class="p-24">
		<u-textarea v-model="content" 
		height="280" border="none"
		placeholder="请描述您的问题">
		</u-textarea>
		<view class="btn mt-24" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				source:'',
				id:''
			};
		},
		onLoad(e) {
			if(e.source){
				this.source = e.source
				this.id = e.id
				uni.setNavigationBarTitle({
					title:'订单投诉'
				})
			}
		},
		methods:{
			submit(){
				if(this.source=='order'){
					// 订单投诉
					this.$api.complaint({
						openid:uni.getStorageSync('openid'),
						orderid:this.id,
						content:this.content
					}).then(res=>{
						this.$tools.toast(res.msg)
						if(res.code==1){
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1500)
						}
					})
				}else{
					// 反馈信息
					this.$api.feedback({
						openid:uni.getStorageSync('openid'),
						content:this.content
					}).then(res=>{
						this.$tools.toast(res.msg)
						if(res.code==1){
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1500)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
