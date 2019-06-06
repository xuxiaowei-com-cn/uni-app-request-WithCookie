<script>
	
	// 第一步：引入 UniUtils 并命名
	import uniUtils from "static/js/UniUtils.js"

	export default {
		onLaunch: function() {
			console.log('App Launch')

			// 第二步：使用别名调用 request(OBJECT),其他同 uni.request(OBJECT)：https://uniapp.dcloud.io/api/request/request
			uniUtils.request({
				url: "http://127.0.0.1/test.do",
				success: res => {

				},
				fail: res => {

				},
				complete: res => {

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
