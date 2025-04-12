import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    version: "1.0.5",
    API_URL: "http://localhost:5036/api/"
  }
};

export default nextConfig;
