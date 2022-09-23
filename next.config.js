/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        destination: '/auth/login',
        source: '/login'
      },
      {
        destination: '/auth/register',
        source: '/register'
      },
      {
        destination: '/dashboard/home',
        source: '/home'
      },
      {
        destination: '/dashboard/transactionHistory',
        source: '/transactionHistory'
      },
      {
        destination: '/dashboard/searchReceiver',
        source: '/searchReceiver'
      },
    ]
  },

  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
