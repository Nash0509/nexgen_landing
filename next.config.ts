import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: "http://localhost:3000/api/v1",
  },
};

export default nextConfig;
