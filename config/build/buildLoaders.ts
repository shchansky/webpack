import { ModuleOptions } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development" ? true : false;

  /** лоадер для обработки только css файлов */
  const scssLoader = {
    /** Регулярка только для обработки css afqkjd */
    // test: /\.css$/i,
    /** если надо обработать дополнительно scss файлы просто используем другую регулярку (стоку выше коментируем) */
    test: /\.s[ac]ss$/i,

    /** в use можно передать как одичный лоадер, так и массив лоадеров. Порядок в массиве имеет значение!!
     * style-loader установить через npm i -D style-loader@3.3.3
     * css-loader устанавливается через npm i -D css-loader@6.8.1
     * sass loader устанавливается если надо обработать scss файлы через npm i -D sass@1.69.0 sass-loader@13.3.2 (что устанавливать смотри в доке)
     */
    use: [
      /** Плагин MiniCssExtractPlugin  м.б. использован вместо style-loader согласно доке вебпака (см. строку выше). Благодаря
       * плагину MiniCssExtractPlugin в папке build будет файл main.css (или вложенной апапке css в build если пропишем опции в MiniCssExtractPlugin).
       * Если бы пользовали style-loader то css был бы в коде js
       * По условию isDev в продакшен режиме используем MiniCssExtractPlugin (), а в режиме разработки style-loader
       */
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
    ],
  };

  /** Лоадер для обработки tsx файлов */
  const tsLoader = {
    /** Если бы мы не использовали typescript , который умеет работать с jsx (из коробки), то нам понабилось бы настроить babel-loader
     * и подключить его.
     * ts-loader умеет работать с JSX
     * Если бы не использовали ts - нужен быд бы babel-loader
     */
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [scssLoader, tsLoader];
}