const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_ADDRESS_API_BASE_URL:
      process.env.NEXT_PUBLIC_ADDRESS_API_BASE_URL,
    NEXT_PUBLIC_BUSINESS_SECTOR_API_BASE_URL:
      process.env.NEXT_PUBLIC_BUSINESS_SECTOR_API_BASE_URL,
    NEXT_PUBLIC_CHATBOT_API_BASE_URL:
      process.env.NEXT_PUBLIC_CHATBOT_API_BASE_URL,
    NEXT_PUBLIC_CHATBOT_GITHUB_URL: process.env.NEXT_PUBLIC_CHATBOT_GITHUB_URL,
  },
};

module.exports = nextConfig;
