import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            }
        ],
    },
    webpack: (config) => {
        // Fix for rxjs barrel optimization bug in Next 14
        config.resolve.alias = {
            ...config.resolve.alias,
            'rxjs': require.resolve('rxjs')
        }
        return config
    }
};

export default nextConfig;
