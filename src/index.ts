import "./config/envLoader"; // !! 确保这是文件的第一行 !!
import express, { Request, Response, Application } from "express";
import db from "./db";
const app: Application = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send({
    name: "zs",
    age: 18,
  });
});
// 创建一个新路由来获取所有用户
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await db("users").select("id", "username", "email", "created_at");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
