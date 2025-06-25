import "./config/envLoader"; // !! 确保这是文件的第一行 !!
import db from "./db";
import userRoutes from "./routes/userRoutes";
import express, { Request, Response, Application } from "express";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import i18n from "./i18n";

const app: Application = express();
app.use(express.json());
// 初始化 i18n 中间件
app.use(i18n.init);
const port = 3000;

function response({
  code = 0,
  message,
  data,
  req,
}: {
  code: number;
  message: string;
  data: Record<string, unknown>;
  req: Request;
}) {
  return {
    code,
    data: camelcaseKeys(data, { deep: true }),
    msg: message || req.__(`code`)?.[code] || `Unknown error code: ${code}`,
  };
}

// 请求转换中间件
app.use((req, res, next) => {
  const lang = req.headers["language"] as string;

  if (lang) {
    req.setLocale(lang);
  }
  if (req.body) {
    req.body = snakecaseKeys(req.body, { deep: true });
  }
  next();
});

// 响应转换中间件
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (data) {
    return originalJson.call(
      this,
      response({
        ...data,
        req,
      })
    );
  };
  next();
});

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
// 创建一个新路由来添加用户
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const [newUser] = await db("users")
      .insert({ username, email, password })
      .returning(["id", "username", "email"]); // 返回新插入的用户信息

    res.status(201).json(newUser);
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
    // await db.raw("SELECT 1");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
