const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/login'],
    createProxyMiddleware({
      target: 'https://github.com/',
      changeOrigin: true
    })
  );
};
