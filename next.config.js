module.exports = {
  reactStrictMode: true,
  env: {
    GMAILACC: process.env.GMAILACC,
    GMAILPASS: process.env.GMAILPASS,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3000/api/:path*',
      },
    ]
  },
};
