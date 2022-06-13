module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
    open: true, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/api': {
        // 真实转换成的后台请求地址，别忘了加http(https)
        target: 'http://www.liulongbin.top:3008',
        changeOrigin: true, // 是否跨域
        pathRewrite: { // 重定向
          '^/api': '/' // 和上面一样，将请求地址中前面的替换为后面的内容
        }
      }
    }
  }
}
