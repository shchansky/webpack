import path from "path";
import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;

  const isDev = options.mode === "development" ? true : false;
  const isProd = options.mode === "production" ? true : false;

  const config: webpack.Configuration = {
    mode: mode ?? "production",
    /** точка входа в приложение */
    /** приводим ссылку на файл index.tsx(точка входа в приложение) */
    entry: paths.entry,

    output: {
      /** приводим ссылку в какую папку будет билдится приложение */
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },

    plugins: buildPlugins(options),

    /* #region  Лоадеры которые как-то обрабатывают файлы с разными расширениями */
    module: {
      rules: buildLoaders(options),
    },
    /* #endregion */

    /* #region  Резолвинг расширений для файлов с исходным кодом */
    resolve: buildResolvers(options),
    /* #endregion */

    /* #region  devtool карты с исходным кодом */
    devtool: isDev && "inline-source-map",
    /* #endregion */

    /* #region  devServer для запуска сервера по указанном порту */
    devServer: isDev ? buildDevServer(options) : undefined,
    /* #endregion */
  };

  return config;
}
