import db from "../db";

interface UserData {
  user_id?: string;
  user_name: string;
  user_address?: string;
  user_phone?: string;
  user_email: string;
  user_password: string;
}

interface UserRecord extends UserData {
  id: number;
  create_time?: Date;
  updated_at?: Date;
}

class User {
  static async create({
    user_name,
    user_address,
    user_phone,
    user_email,
    user_password,
  }: UserData): Promise<UserRecord> {
    const [user] = await db("users")
      .insert({
        user_name,
        user_address,
        user_phone,
        user_email,
        user_password,
      })
      .returning("*");
    return user;
  }

  static async findAll(): Promise<UserRecord[]> {
    return await db("users").select("*");
  }

  static async findById(id: number | string): Promise<UserRecord | undefined> {
    return await db("users").where({ id }).first();
  }

  static async findByUserId(user_id: string): Promise<UserRecord | undefined> {
    return await db("users").where({ user_id }).first();
  }

  static async update(
    id: number | string,
    { user_name, user_address, user_phone, user_email, user_password }: Partial<UserData>
  ): Promise<UserRecord | undefined> {
    const [user] = await db("users")
      .where({ id })
      .update({
        user_name,
        user_address,
        user_phone,
        user_email,
        user_password,
      })
      .returning("*");
    return user;
  }

  static async delete(id: number | string): Promise<boolean> {
    await db("users").where({ id }).delete();
    return true;
  }
}

export default User;
