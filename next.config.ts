
const version = "1.2.0";

const development = {
  env: {
    API_URL: "http://localhost:5036/api/",
    version: version + "[dev]"
  }
}

const production = {
  env: {
    API_URL: "https://api.leapcert.com.br/api/",
    version: version
  }
}

function returnConfig() {
  if (process.env.NODE_ENV == "development") {
    console.log("development")
    return development;

  } else if (process.env.NODE_ENV == "production") {
    console.log("production")
    return production;

  }
}

const nextConfig = returnConfig();

export default nextConfig;
