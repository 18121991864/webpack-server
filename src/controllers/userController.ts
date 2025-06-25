import db from "../db";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.body", req.body);
    const [userId] = await db("users").insert(req.body).returning("id");
    const user = await db("users").where("id", userId.id).first();

    res.status(200).json({
      code: 0,
      data: user,
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
    res.status(200).json({
      data: users,
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
      data: user,
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
    const updated = await db("users").where("id", req.params.id).update(req.body);

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
      data: user,
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
