/**
 * Created by Administrator on 2020/1/12.
 */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {

    /**
     * 可以配置多个代理
     */
    app.use(proxy('/localApi', {
            target: 'http://127.0.0.1:8080',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/localApi": "/"
            },
        // cookieDomainRewrite: "http://localhost:3000"
    }));


    app.use(proxy('/apc', {
        target: 'http://172.19.5.34:9531',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/apc": "/"
        },
    }));
};