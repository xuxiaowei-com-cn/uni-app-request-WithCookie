/**
 * 仅适用于 非H5端（小程序端），带有 Cookie 的 uni.request(OBJECT) 网络请求
 * 
 * H5请直接使用：uni.request(OBJECT)
 * 
 * 此方法仅仅是在请求时，使用缓存储存 Cookie，在下一次请求时，获取缓存中的 Cookie，并发送到服务器
 * 
 * uni.request(OBJECT)：注意非H5端不支持cookie，服务器应避免验证cookie
 * uni.request(OBJECT)：https://uniapp.dcloud.io/api/request/request
 * 
 * 自定义header：header = {}
 * 
 * 此方法保留了原 header 里的值（但 header 中不能与有重名的 header['Cookie']，如果有，将被缓存中的值覆盖）
 * 
 * 如要清理 Cookie，请调用本JS中的 clearCookie()
 * 
 * 注意：
 * 		1、如您要自定义，必须使用同步方法，避免连续请求时 Cookie 不同步
 * 		2、您应该在第一次请求服务器时，在服务器创建一个 Session（HttpSession session = request.getSession();），用户响应 Cookie
 */
function request(options) {

	var success = options.success
	var fail = options.fail
	var complete = options.complete

	// 获取传入的 header
	var header = options.header

	// 如果 header 不存在时
	if (!header) {
		header = {}
	}

	// 如果 Content-Type 不存在，设置默认值
	if (!header['Content-Type']) {
		header['Content-Type'] = "application/json"
	}

	try {

		// 读取 缓存中的 Cookie
		const cookie = uni.getStorageSync("cookie")

		// 如果 Cookie 不存在，直接发送网络请求
		// 第一次运行，本地缓存无值，不放入 header['Cookie'] 中
		if (cookie != null && cookie != "") {
			header['Cookie'] = cookie
		}

	} catch (e) {
		console.log("读取缓存中的 Cookie 异常：", e)
	}

	uni.request({
		url: options.url,
		data: options.data,
		header: header,
		method: options.method,
		dataType: options.dataType,
		responseType: options.responseType,
		success: res => {

			// 只有存在 Cookie 时，才向缓存中更新 Cookie
			// 如要清理 Cookie，请调用 clearCookie()
			if (res.cookies && res.cookies.length > 0) {
				var cookie = "";

				// 遍历响应结果的 Cookie
				for (var i = 0; i < res.cookies.length; i++) {
					// 获取 Cookie name与value，并拼接
					cookie += res.cookies[i].split(' ')[0]
				}

				try {
					// 将响应结果的 Cookie 放入缓存中，将原值覆盖
					// 如果响应中无 Cookie，则清空本地缓存中 Cookie
					uni.setStorageSync("cookie", cookie);
				} catch (e) {
					console.log("设置缓存中的 Cookie 异常：", e)
				}

			}

			// 判断是否传入了 success function()，如果传入了，则执行 success function()
			if (success) {
				success(res)
			}

		},
		fail: res => {

			// 判断是否传入了 fail function()，如果传入了，则执行 fail function()
			if (fail) {
				fail(res)
			}
		},
		complete: res => {

			// 判断是否传入了 complete function()，如果传入了，则执行 complete function()
			if (complete) {
				complete(res)
			}
		}
	})
}

/**
 * 清理缓存中的 Cookie
 */
function clearCookie() {
	try {
		uni.setStorageSync("cookie", "");
	} catch (e) {
		console.log("清理缓存中的 Cookie 异常：", e)
	}
}

module.exports = {
	request: request
}
