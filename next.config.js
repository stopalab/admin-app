module.exports = {
  async rewrites() {
    console.log("call rewrites")
      return [
        {
          source: '/api/external/:path*',
          destination: 'https://stopalab-admin.herokuapp.com/:path*',
        },
      ]
    },
};