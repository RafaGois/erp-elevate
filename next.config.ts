import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/auth",
                headers: [
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "unsafe-none",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "unsafe-none",
                    },
                ]
            }
        ]
    }
};

export default nextConfig;
