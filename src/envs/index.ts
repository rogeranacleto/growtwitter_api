import "dotenv/config";

export const envs = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
  PORT: process.env.PORT,
};