const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // http-proxy-middleware2.0 写法
    // app.use(
    //     createProxyMiddleware("/jian", {
    //         target: "https://www.jianshu.com/asimov",
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: { "^/jian": "" }
    //     })
    // )
    // app.use(
    //     createProxyMiddleware("/zhi", {
    //         target: "https://new-at.zhihu.com/api/4",
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: { "^/zhi": "" }
    //     })
    // )
    // http-proxy-middleware3.0 写法
    app.use(
        '/jian',
        createProxyMiddleware({
            target: 'https://www.jianshu.com/asimov',
            changeOrigin: true,
            pathRewrite: { '^/jian': '' }
        })
    );
    app.use(
        '/zhi',
        createProxyMiddleware({
            target: 'https://new-at.zhihu.com/api/4',
            changeOrigin: true,
            pathRewrite: { '^/zhi': '' }
        })
    );
}