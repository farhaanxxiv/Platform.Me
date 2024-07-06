/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
    },
    images: {
        domains: ['media.istockphoto.com', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
    },
};

export default nextConfig;