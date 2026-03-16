const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Proxy /ollama to local Ollama instance
app.use('/ollama', createProxyMiddleware({
  target: 'http://127.0.0.1:11434',
  pathRewrite: { '^/ollama': '' },
  changeOrigin: true,
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback — all routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
