import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 使用 knex.schema.createTable 来创建表
  return knex.schema.createTable("users", table => {
    // knex.increments() 会被自动翻译成 PostgreSQL 的 SERIAL 类型
    table.increments("id").primary();

    // .comment() 方法是 Knex 提供的，用来添加字段注释
    table.string("username").notNullable().unique().comment("名字");
    table.string("email").notNullable().unique().comment("邮箱");
    table.string("password").notNullable().comment("密码");

    // knex.timestamps(true, true) 会创建 created_at 和 updated_at
    // 它会自动为 created_at 设置默认的当前时间。
    // 对于 updated_at，Knex 会在您使用 .update() 方法时在应用层面自动更新它。
    table.timestamps(true, true);
    // 正确的表注释方法：在回调函数内部使用 table.comment()
    table.comment("用户表");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
