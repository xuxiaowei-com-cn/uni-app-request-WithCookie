# 捐助与转载

- 整理不易，捐助随意。

- 尊重他人的劳动成果，转载请注明地址。

<p align=center>
  <a href="https://xuxiaowei.com.cn">
    <img src="https://cdn2.xuxiaowei.com.cn/img/QRCode.png/xuxiaowei.com.cn" alt="徐晓伟工作室" width="360">
  </a>
</p>

# uni-app-request-Cookie
uni-app 发送网络请求 携带 Cookie。

# 使用方法

- 第一步：引入 UniUtils 并命名：

```	
import uniUtils from "static/js/UniUtils.js"
```

- 第二步：使用别名调用 request(OBJECT)，其他同 uni.request(OBJECT)：https://uniapp.dcloud.io/api/request/request

```
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
});
```

- 如要有需要，清理 Cookie

```
uniUtils.clearCookie()
```