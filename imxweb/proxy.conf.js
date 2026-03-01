const https = require('https');

const secureAgent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: false
});

function onProxyRes(proxyRes, req, res) {
  const key = 'www-authenticate';
  if (proxyRes.headers[key]) {
    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
  }

  if (proxyRes.headers['set-cookie']) {
    const cookies = proxyRes.headers['set-cookie'].map(cookie => {
      return cookie
        .replace(/; Secure/gi, '') 
        .replace(/; SameSite=None/gi, '; SameSite=Lax')
        .replace(/; SameSite=Strict/gi, '; SameSite=Lax');
    });
    
    proxyRes.headers['set-cookie'] = cookies;
    
    console.log('✅ Proxy caught and rewrote cookies for:', req.url);
  }
}

const PROXY_CONFIG = {
  "/portal": {
    "target": "https://bligaapidev.bltest.test/",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "agent": secureAgent,
    "pathRewrite": { "^/portal": "/ApiServer/portal" },
    "cookieDomainRewrite": "localhost",
    "cookiePathRewrite": "/",
    "onProxyRes": onProxyRes
  },
  "/ApiServer": {
    "target": "https://bligaapidev.bltest.test/",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "agent": secureAgent,
    "cookieDomainRewrite": "localhost",
    "cookiePathRewrite": "/",
    "onProxyRes": onProxyRes
  },
  "/imx": {
    "target": "https://bligaapidev.bltest.test/",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "agent": secureAgent,
    "pathRewrite": {
      "^/imx": "/ApiServer/imx"
    },
    "cookieDomainRewrite": "localhost",
    "cookiePathRewrite": "/",
    "onProxyRes": onProxyRes
  },
  "/config": {
    "target": "https://bligaapidev.bltest.test/",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "agent": secureAgent,
    "pathRewrite": {
      "^/config": "/ApiServer/portal/config"
    },
    "cookieDomainRewrite": "localhost",
    "cookiePathRewrite": "/",
    "onProxyRes": onProxyRes
  }
};

module.exports = PROXY_CONFIG;