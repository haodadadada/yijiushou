<template>
	<view class="container">
		<view class="header">
			<span>湖州</span>
			<input type="text" v-model="keyword" placeholder="请输入地址" @input="getSuggest" @confirm="chooseAddress($event.target.value)">
		</view>
		<view class="contain">
			<ul>
				<!-- #ifdef MP-WEIXIN -->
				<li v-for="(item, index) in suggestList" :key="index" :class="flag[index]? 'bgc' : ''" @touchstart="flag.splice(index, 1, true)" @touchend="flag.splice(index, 1, false)" @click="chooseAddress(item.title)">
				<!-- <li v-for="(item, index) in suggestList" :key="index" :class="flag[index]? 'bgc' : ''" @touchstart="tell(1)" @touchend="tell(2)" @click="chooseAddress(item.title)"> -->
					<view class="title">{{item.title}}</view>
					<view class="address">{{item.address}}</view>
				</li>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<li v-for="(item, index) in suggestList" :key="index" :class="flag[index]? 'bgc' : ''" @click="chooseAddress(item.title)">
				<!-- <li v-for="(item, index) in suggestList" :key="index" :class="flag[index]? 'bgc' : ''" @touchstart="tell(1)" @touchend="tell(2)" @click="chooseAddress(item.title)"> -->
					<view class="title">{{item.title}}</view>
					<view class="address">{{item.address}}</view>
				</li>
				<!-- #endif -->
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				suggestList: [],
				flag: [false]
			}
		},
		methods: {
			getSuggest() {
				this.qqMap.getSuggestion({
					sig: '4NZ8JTPFCfuMz5ND8wewajIo84hlJ4QT',
					keyword: this.keyword,
					region: '湖州市',
					region_fix: 1,
					success: res => {
						this.suggestList = res.data;
					},
					fail: error => {
						console.log('fail:',error);
					}
				})
			},
			chooseAddress(title) {
				this.$store.dispatch('pushAddress', title);
				this.$store.dispatch('keepAddress', title);
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		.header {
			display: flex;
			align-items: center;
			margin: 10px;
			border-radius: 10px;
			background-color: #eee;
			span {
				margin: 10px 15px;
				flex: 1;
				border-right: 1px solid #ccc;
				text-align: center;
			}
			input {
				flex: 3;
			}
		}
		.contain {
			ul {
				.bgc {
					background-color: #ccc;
				}
				li {
					height: 40px;
					padding: 10px 0;
					border-bottom: 1px solid #ccc;
					.title {
						margin-left: 20px;
						font-size: 15px;
						color: black;
					}
					.address {
						margin-left: 20px;
						font-size: 12px;
						color: #aaa;
					}
				}
			}
		}
	}
</style>