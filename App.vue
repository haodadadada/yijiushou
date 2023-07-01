<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.checkWechatUpdata()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods:{
			checkWechatUpdata() {
				// #ifdef MP-WEIXIN
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log(res.hasUpdate);
				});
				updateManager.onUpdateReady(function() {
					wx.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
				updateManager.onUpdateFailed(function() {
					wx.showModal({
						title: '更新失败，请重试',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
				// #endif
			},
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import 'common/css/nekomata.scss';
	@import 'common/css/programBase.scss';
</style>
