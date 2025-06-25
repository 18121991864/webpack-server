import dotenv from "dotenv";
import path from "path";

// 基于 NODE_ENV 加载正确的 .env 文件
// 如果未设置 NODE_ENV，默认为 'development'
const env = process.env.NODE_ENV || "development";
const KNEX_VALUE = Boolean(process.env.KNEX_VALUE);
const ROOTPATH = KNEX_VALUE ? __dirname : process.cwd();
const VALUEENV = KNEX_VALUE ? `../../.${env}.env` : `.${env}.env`;

const envPath = path.resolve(ROOTPATH, VALUEENV);

console.log(`Loading environment variables from: ${envPath}`);

const result = dotenv.config({ path: envPath });

if (result.error) {
  // 在实际生产中，如果 .production.env 文件缺失，可能需要让应用启动失败
  console.warn(`Warning: Could not find and load environment file at ${envPath}.`);
}
