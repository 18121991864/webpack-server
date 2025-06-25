import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  globalIgnores(["**/dist/*.js"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
  },
]);
