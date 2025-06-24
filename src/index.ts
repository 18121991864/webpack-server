import "./config/envLoader"; // !! 确保这是文件的第一行 !!
import express from "express";
import db from "./db";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send({
    name: "zs",
    age: 18,
  });
});

// 路由
app.use("/api/users", userRoutes);

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await db();
});
