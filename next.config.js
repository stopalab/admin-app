module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://stopalab-admin.herokuapp.com/',
      },
      {
        source: '/',
        destination:'/login'
      }
    ]
  },
}
