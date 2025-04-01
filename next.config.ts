import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    version: "1.0.2",
    API_URL: "http://localhost:5036/api/"
  }
};

export default nextConfig;
