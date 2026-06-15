/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  turbopack: {
    // Pin workspace root to this project, silencing the multi-lockfile warning
    root: new URL(".", import.meta.url).pathname,
  },
};
export default nextConfig;
