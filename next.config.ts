const version = '1.2.1';

const devApiUrl = 'http://localhost:5036/api/';
const prodApiUrlDefault = 'http://98.90.231.160:6030/api/';

const development = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? devApiUrl,
    version: version + '[dev]',
  },
};

const production = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? prodApiUrlDefault,
    version,
  },
};

function returnConfig() {
  if (process.env.NODE_ENV === 'development') {
    return development;
  }
  if (process.env.NODE_ENV === 'production') {
    return production;
  }
  return development;
}

const nextConfig = returnConfig();

export default nextConfig;
