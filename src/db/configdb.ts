import "../config/envLoader";
import type { Knex } from "knex";
import "dotenv/config";
import path from "path";
// Update this configuration object to be exposed to the CLI

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg", // 指定客户端为 PostgreSQL
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
      extension: "ts", // 指定迁移文件扩展名
    },
    // seeds: {
    //   directory: './src/db/seeds'
    // }
  },

  // staging: { ... },
  // production: { ... }
};

export default config;
