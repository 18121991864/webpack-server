import i18n from "i18n";
import path from "path";

// 配置 i18n

i18n.configure({
  locales: ["en", "zh"], // 支持的语言
  directory: path.join(__dirname, "i18n/locales"), // 使用绝对路径指向locales目录
  defaultLocale: "en",
  queryParameter: "lang", // 通过 ?lang=zh 设置语言
  autoReload: true,
  updateFiles: false,
  syncFiles: false,
  cookie: "lang",
  // 添加回退规则
  fallbacks: {
    "zh-CN": "zh",
    "zh-HK": "zh",
    "zh-TW": "zh",
    "en-US": "en",
  },
});
export default i18n;
