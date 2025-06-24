import "./config/envLoader"; // !! 确保这是文件的第一行 !!
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send({
    name: "zs",
    age: 18,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
