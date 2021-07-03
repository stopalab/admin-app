module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: process.env.API_URL,
      },
      {
        source: '/',
        destination:'/login'
      }
    ]
  },
}
