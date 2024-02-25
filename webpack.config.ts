import { BuildPaths, BuildMode } from "./config/build/types/types";
import path from "path";
import webpack from "webpack";

import { buildWebpack } from "./config/build/buildWebpack";

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    /** приводим ссылку в какую папку будет билдится приложение */
    output: path.resolve(__dirname, "build"),
    /** точка входа в приложение */
    entry: path.resolve(__dirname, "src", "index.tsx"),
    /** приводим ссылку на html файл */
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
  });

  return config;
};
