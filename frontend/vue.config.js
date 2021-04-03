
module.exports = {
  devServer: {
    open: true,
    https: false,
    host: 'localhost',
    port: 4200,
    allowedHosts: [
      '.utools.club'
    ],
    proxy: {
      '/api/local': {
        target: 'http://localhost:3000/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api/local': '/api/v1'
        }
      },
      '/api/zaeke': {
        target: 'http://manager.zaeke.com:9999/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api/zaeke': ''
        }
      }
    }
  }
}