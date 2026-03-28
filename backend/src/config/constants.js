import "dotenv/config";

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",

  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/one9-contact",
    name: process.env.DB_NAME || "one9-contact",
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  },

  api: {
    prefix: process.env.API_PREFIX || "/api/v1",
  },
};
