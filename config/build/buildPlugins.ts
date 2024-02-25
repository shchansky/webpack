import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const isDev = options.mode === "development" ? true : false;
  const isProd = options.mode === "production" ? true : false;

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      /** приводим ссылку на html файл */
      template: options.paths.html,
    }),
  ];

  if (isDev) {
    //замедляет сборку, показывает в ide процент сборки
    plugins.push(new webpack.ProgressPlugin());
  }

  if (isProd) {
    plugins.push(
      /** браузер обрабатывает css файлы не так js файлы и именно они предназначены для css (для наших стилей)
       * гугли- mini css extract plugin webpack в доке вебпака
       * Этот плагин ставим так npm i -D mini-css-extract-plugin@2.7.6
       * Благодяря этому плагину в папке build будет файл main.css (или вложенной апапке css в build,
       *  если не передать аргументы в new MiniCssExtractPlugin)
       * По условию isProd плагин MiniCssExtractPlugin будет использоваться для продакшн сборки
       */
      new MiniCssExtractPlugin(
        /** Опционально (не обязательно) можно передать парамеиры конфигурации */
        {
          /** Основной файл сохраняем в папку scss. Берем хэш от контента. Благодяаря этой строке появится в папке build Папка css c минифицированным файлом scss
           * В противном случае этот файл будет в корне папки build
           */
          filename: "css/[name].[contenthash:8].css",
          /** Чанки сохраняем в папку scss */
          chunkFilename: "css/[name].[contenthash:8].css",
        }
      )
    );
  }

  return plugins;
}
