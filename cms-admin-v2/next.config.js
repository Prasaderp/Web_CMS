/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,

    // Environment variables available at build time
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },

    // Image optimization for production
    images: {
        domains: ['res.cloudinary.com'],
        unoptimized: false,
    },

    // Enable trailing slash for cleaner URLs
    trailingSlash: false,

    // Disable x-powered-by header for security
    poweredByHeader: false,
}

module.exports = nextConfig
