import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 我们告诉 Knex 要创建一个名为 'users' 的新表
  return knex.schema.createTable("users", table => {
    // 创建一个名为 'id' 的字段。
    // .increments() 表示它是一个自增的数字。
    // .primary() 表示它是这张表的主键。
    table.increments("id").primary();
    // 创建一个名为 'username' 的字段。
    // .string() 表示它是文本类型。
    // .notNullable() 表示这个字段不能为空。
    // .unique() 表示所有行的这个字段值都必须是唯一的，不能有重复的用户名。
    table.string("username").notNullable().unique();

    // 同理，创建一个 'email' 字段
    table.string("email").notNullable().unique();

    // 创建一个 'password_hash' 字段，用来存密码
    table.string("password_hash").notNullable();

    // 这是一个非常有用的快捷方式。
    // .timestamps(true, true) 会自动帮我们创建两个字段：
    // 1. created_at：记录这一行数据是什么时候创建的
    // 2. updated_at：记录这一行数据是什么时候最后更新的
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  console.log("down", knex);
}
