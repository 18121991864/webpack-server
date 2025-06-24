import knex from "knex";
import knexConfig from "./configdb";

// 根据当前环境选择配置 (开发/生产)
const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];

const db = knex(config);

export default db;
