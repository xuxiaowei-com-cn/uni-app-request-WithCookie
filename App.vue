<script>
	// 第一步：引入 UniUtils 并命名
	import uniUtils from "static/js/UniUtils.js"

	export default {
		onLaunch: function() {
			console.log('App Launch')

			// 第二步：使用别名调用 request(OBJECT),其他同 uni.request(OBJECT)：https://uniapp.dcloud.io/api/request/request
			uniUtils.request({
				url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
				data: {
					text: 'uni.request'
				},
				header: {
					'custom-header': 'hello' // 自定义请求头信息，不可出现 Cookie，否则您自定义的 Cookie 无意义
				},
				success: (res) => {
					console.log(res.data);
					this.text = 'request success';
				}
			})
			
			// 如要有需要，清理 Cookie：
			// uniUtils.clearCookie()

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
