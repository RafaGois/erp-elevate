/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js config options...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
