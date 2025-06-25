import db from "../db";
import { Request, Response } from "express";

interface UserRequestData {
  userId?: string;
  userName: string;
  userAddress?: string;
  userPhone?: string;
  userEmail: string;
  userPassword: string;
}

interface UserDBData {
  user_id?: string;
  user_name: string;
  user_address?: string;
  user_phone?: string;
  user_email: string;
  user_password: string;
}

// 转换前端数据格式为数据库格式
const convertToDBFormat = (data: UserRequestData): UserDBData => {
  return {
    user_id: data?.userId,
    user_name: data.userName,
    user_address: data.userAddress,
    user_phone: data.userPhone,
    user_email: data.userEmail,
    user_password: data.userPassword,
  };
};

// 转换数据库格式为前端格式
const convertToResponseFormat = (data: UserDBData) => {
  return {
    userId: data?.user_id,
    userName: data.user_name,
    userAddress: data.user_address,
    userPhone: data.user_phone,
    userEmail: data.user_email,
    userPassword: data.user_password,
  };
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.body", req.body);
    const dbData = convertToDBFormat(req.body as UserRequestData);
    const [userId] = await db("users").insert(dbData).returning("id");
    const user = await db("users").where("id", userId.id).first();

    res.status(200).json({
      code: 0,
      data: convertToResponseFormat(user),
      msg: "成功",
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      code: 1,
      data: null,
      msg: err.message,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db("users").select("*");
    const formattedUsers = users.map(user => convertToResponseFormat(user));

    res.status(200).json({
      code: 0,
      data: formattedUsers,
      msg: "成功",
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      code: 1,
      data: null,
      msg: err.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await db("users").where("id", req.params.id).first();
    if (!user) {
      res.status(404).json({
        code: 1,
        data: null,
        msg: "用户不存在",
      });
      return;
    }

    res.status(200).json({
      code: 0,
      data: convertToResponseFormat(user),
      msg: "成功",
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      code: 1,
      data: null,
      msg: err.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbData = convertToDBFormat(req.body as UserRequestData);
    const updated = await db("users").where("id", req.params.id).update(dbData);

    if (!updated) {
      res.status(404).json({
        code: 1,
        data: null,
        msg: "用户不存在",
      });
      return;
    }

    const user = await db("users").where("id", req.params.id).first();
    res.status(200).json({
      code: 0,
      data: convertToResponseFormat(user),
      msg: "成功",
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      code: 1,
      data: null,
      msg: err.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await db("users").where("id", req.params.id).del();

    if (!deleted) {
      res.status(404).json({
        code: 1,
        data: null,
        msg: "用户不存在",
      });
      return;
    }

    res.status(200).json({
      code: 0,
      data: null,
      msg: "删除成功",
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      code: 1,
      data: null,
      msg: err.message,
    });
  }
};
