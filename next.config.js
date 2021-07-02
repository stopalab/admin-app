module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'http://localhost:3333/:path*',
      },
      {
        source: '/',
        destination:'/login'
      }
    ]
  },
}
