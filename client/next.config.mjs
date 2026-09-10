import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048],
    imageSizes: [64, 96, 128, 256, 384, 512],
    qualities: [75, 82, 90, 91, 92, 93, 94, 95, 100],
    minimumCacheTTL: 86400,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
