import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  serverExternalPackages: ["sequelize", "pg", "pg-hstore"],
};

export default nextConfig;