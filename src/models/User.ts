import db from "../db";

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface UserRecord extends UserData {
  id: number;
  created_at?: Date;
  updated_at?: Date;
}

class User {
  static async create({ username, email, password }: UserData): Promise<UserRecord> {
    const [user] = await db("users").insert({ username, email, password }).returning("*");
    return user;
  }

  static async findAll(): Promise<UserRecord[]> {
    return await db("users").select("*");
  }

  static async findById(id: number | string): Promise<UserRecord | undefined> {
    return await db("users").where({ id }).first();
  }

  static async update(
    id: number | string,
    { username, email, password }: Partial<UserData>
  ): Promise<UserRecord | undefined> {
    const [user] = await db("users")
      .where({ id })
      .update({ username, email, password })
      .returning("*");
    return user;
  }

  static async delete(id: number | string): Promise<boolean> {
    await db("users").where({ id }).delete();
    return true;
  }
}

export default User;
