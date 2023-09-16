<template>
	<view class="container">
<!-- 		<view class="question" v-for="(item, index) in chooseItems" :key="item.id">
			<radio-group @change="radioChange($event, index)" v-if="item.type === 1">
				<view style="display: flex;">
					<view class="header">{{item.text}}</view><span>单选</span>
				</view>
				<label class="option" v-for="(option, index) in item.answers" :key="option.id">
					<view style="display: flex; align-items: center;">
						<radio :value="option.text" :checked="index === current" style="transform:scale(0.7);" />
					</view>
					<view>{{option.text}}</view>
				</label>
			</radio-group>
			
			<checkbox-group @change="checkboxChange($event, index)" v-if="item.type === 2">
				<view style="display: flex;">
					<view class="header">{{item.text}}</view><span>多选</span>
				</view>
				<label class="option" v-for="option in item.answers" :key="option.id">
					<view style="display: flex; align-items: center;">
						<checkbox :value="option.value" :checked="option.checked" style="transform:scale(0.7);"/>
					</view>
					<view>{{option.text}}</view>
				</label>
			</checkbox-group>
		</view>
		
		<view class="textarea">
			<textarea name="" id="mytextarea"  @blur="bindTextAreaBlur" placeholder="您有什么想对我们说的?(可选填)"></textarea>
		</view>
		
		<view class="submit">
			<span @click="submit">提交</span>
		</view> -->
		<web-view :src="toUrl" @message="tell"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// chooseItems: [
				// 	{
				// 		id: 1,
				// 		text: '你有卖废品的经历吗?',
				// 		answers: [
				// 			{
				// 				id: 101,
				// 				text: '有',
				// 				order: 1,
				// 			},
				// 			{
				// 				id: 102,
				// 				text: '没有',
				// 				order: 2
				// 			}
				// 		],
				// 		type: 1
				// 	},
				// 	{
				// 		id: 2,
				// 		text: '你有卖废品的经历吗?',
				// 		answers: [
				// 			{
				// 				id: 101,
				// 				text: '有',
				// 				value: '有',
				// 				order: 1,
				// 				checked: false
				// 			},
				// 			{
				// 				id: 102,
				// 				text: '没有',
				// 				value: '没有',
				// 				order: 2,
				// 				checked: false
				// 			}
				// 		],
				// 		type: 2
				// 	}
				// ],
				// current: '',
				// suggestion: '',
				// surveyContent: {
				// 	key: "value"
				// }
				toUrl: ''
			}
		},
		// methods: {
		// 	// 单选答案在answers[current].text中
		// 	radioChange: function(evt, index) {
		// 		for (let i = 0; i < this.chooseItems.length; i++) {
		// 			if (this.chooseItems[index].answers[i].text === evt.detail.value) {
		// 				this.current = i;
		// 				break;
		// 			}
		// 		}
		// 		console.log(this.chooseItems[index].answers[this.current].text)
		// 		Object.defineProperty(this.surveyContent, this.chooseItems[index].text, {
		// 			value : this.chooseItems[index].answers[this.current].text,
		// 			writable : true,
		// 			enumerable : true,
		// 			configurable : true
		// 		});
		// 	},
		// 	checkboxChange: function (e, index) {
		// 		var chooseItems = this.chooseItems, 
		// 			values = e.detail.value;
					
		// 		// 多选答案在 answers的checked中
		// 		for (var i = 0, lenI = chooseItems[index].answers.length; i < lenI; ++i) {
		// 			const answer = chooseItems[index].answers[i]
		// 			if(values.includes(answer.value)){
		// 				this.$set(answer,'checked',true)
		// 				console.log(this.chooseItems[index].answers[i].text)
		// 			}else{
		// 				this.$set(answer,'checked',false)
		// 			}
		// 		}
		// 	},
		// 	bindTextAreaBlur: function (e) {
		// 		this.suggestion = e.detail.value;
		// 	},
		// 	async submit() {
		// 		const newSurveyContent = JSON.stringify(this.surveyContent);
		// 		console.log(newSurveyContent)
		// 		let result = await this.$api.sendQuestionnaire({
		// 			user_openid: uni.getStorageSync('openid'),
		// 			survey_json: newSurveyContent,
		// 		})
		// 	}
		// },
		methods: {
			tell(e)	{
				console.log(e)
			}
		},
		onLoad(option) {
			this.toUrl = option.url;
		},
		// onShow() {
		// 	if (!uni.getStorageSync('openid')) {
		// 		this.$tools.toast('请先登录');
		// 		setTimeout(() => {
		// 			uni.switchTab({
		// 				url: '../user/user'
		// 			});
		// 		}, 500);
		// 		return;
		// 	}
		// }
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		.question {
			width: 90vw;
			margin-left: 5vw;
			margin-bottom: 5vw;
			background-color: #fff;
			border-radius: 15px;
			padding: 5vw;
			box-sizing: border-box;
			.radioHeader {
				margin-bottom: 15px;
			}
			.option {
				display: flex;
				align-items: center;
				margin: 0 10px 5px 0;
				width: 50%;
			}
		}
		.textarea{
			#mytextarea {
				width: 90vw;
				margin-left: 5vw;
				height: 200px;
				background-color: #eee;
				padding: 20px;
				border-radius: 15px;
				box-sizing: border-box;
			}
		}
		.submit {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20px;
			span {
				padding: 10px 20px;
				color: #fff;
				background: linear-gradient(to left, #4eb777, #00e1b4);
				border-radius: 10px;
			}
		}
	}
</style>