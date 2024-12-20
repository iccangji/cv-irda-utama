const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: "5000",
                pathname: "/api/uploads/**"
            }
        ],
    },
    experimental: {
        scrollRestoration: true,
    },
    env: {
        NEXT_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
};
module.exports = nextConfig;