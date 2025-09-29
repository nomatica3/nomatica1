const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyPort = process.argv[2] || 6001;
const targetPort = process.argv[3] || 5001;
const name = process.argv[4] || 'Proxy';
const subdomain = process.argv[5] || '';

const app = express();
app.use('/', createProxyMiddleware({ target: `http://localhost:${targetPort}`, changeOrigin: true }));

app.listen(proxyPort, () => {
  console.log(`🌐 ${name} proxy running on port ${proxyPort} → ${targetPort} (${subdomain})`);
});