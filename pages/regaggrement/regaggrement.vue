<template>
	<view class="p-20">
		<view class="p-20 border-radius-12 bg-white" v-html="content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			};
		},
		onLoad() {
			this.getregaggrement()
		},
		methods:{
			getregaggrement(){
				this.$api.regaggrement().then(res=>{
					this.content = res.data.value
					uni.setNavigationBarTitle({
						title:res.data.title
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
