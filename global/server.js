const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use('/api/users', createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
app.use('/api/profiles', createProxyMiddleware({ target: process.env.PROFILE_SERVICE_URL, changeOrigin: true }));
app.use('/api/videos', createProxyMiddleware({ target: process.env.VIDEO_SERVICE_URL, changeOrigin: true }));

app.listen(5000, () => console.log('API Gateway running on port 5000'));
