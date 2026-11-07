/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/onepiece", destination: "/onepiece/index.html" },
        { source: "/onepiece/", destination: "/onepiece/index.html" },
        { source: "/mrMiao", destination: "/mrMiao/index.html" },
        { source: "/mrMiao/", destination: "/mrMiao/index.html" },
      ],
    };
  },
};

export default nextConfig;
