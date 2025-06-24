import User from "../models/User";
import { Request, Response } from "express";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body as UserData);
    res.status(201).json(user);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.update(req.params.id, req.body as UserData);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await User.delete(req.params.id);
    res.status(204).end();
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
