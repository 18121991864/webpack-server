const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin"); // 引入插件

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    // 1. 设置为 watch 模式
    watch: isDevelopment,
    target: "node",
    externals: [nodeExternals()],

    // 2. 入口文件不再需要 HMR 相关的代码
    entry: {
      server: "./src/index.ts",
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "app.js",
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    // 3. 配置插件
    plugins: [
      // 确保这个插件只在开发模式下使用
      isDevelopment && new NodemonPlugin(),
    ].filter(Boolean), // 使用 filter(Boolean) 过滤掉非开发模式下的 false 值
  };
};
