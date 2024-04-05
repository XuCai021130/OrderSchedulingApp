// webpack配置文件中的devServer选项，用于设置代理服务器
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
    },
  }
}