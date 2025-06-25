import "./config/envLoader"; // !! 确保这是文件的第一行 !!
import db from "./db";
import userRoutes from "./routes/userRoutes";
import express, { Request, Response, Application } from "express";

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
    const users = await db("users").select(
      "id",
      "user_id",
      "user_name",
      "user_address",
      "user_phone",
      "user_email",
      "user_password",
      "create_time"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 路由
app.use("/api/users", userRoutes);

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);

  // 测试数据库连接
  try {
    await db.raw("SELECT 1");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
