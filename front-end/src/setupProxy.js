const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_BASE_URL}`,
      changeOrigin: true,
      // pathRewrite: {
      //   '^/proxy': '/api',
      // },
    }),
  );
  app.use(
    '/social',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_SOCIAL_BASE_URL}`,
      changeOrigin: true,
      // pathRewrite: {
      //   '^/proxy': '/api',
      // },
    }),
  );
  app.use(
    '/inbody',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_NAVER_INVOKE}`,
      changeOrigin: true,
      // pathRewrite: {
      //   '^/proxy': '/api',
      // },
    }),
  );
};
