import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "@pmmmwh/react-refresh-webpack-plugin"

export function buildPlugins({
  mode,
  paths,
  isAnalyzer,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development" ? true : false;
  const isProd = mode === "production" ? true : false;

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      /** приводим ссылку на html файл */
      template: paths.html,
    }),
    /** Плагин из под коробки вебпака, устанавливать отдельно не надо
     * Он подменяет глобальные переменные в коде на те значения которые мы задаем на этапе сборки
     * см. по нему доку вебпака
     */
    new DefinePlugin({
      /** JSON.stringify(platform) - костыль , т.к. отваливается сборка, хотя platform строка */
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    //замедляет сборку, показывает в ide процент сборки
    plugins.push(new webpack.ProgressPlugin());

    /** Плагин для проверки типов в реалтайме, и запус кается в отдельном процессе. Позволяет отключить проверку типов в ts-loader в файле buildLoaders
     * и существенно сократить время сборки
     */
     plugins.push(new ForkTsCheckerWebpackPlugin());

     /** Плагин для обновления кода без перезагрузки страницы  */
     plugins.push(new ReactRefreshTypeScript())
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

  if (isAnalyzer) {
    /** Позволяет следить за размерами чанков (страницы About и Shop) и бандла, как смотерть сколько весят библиотеки, какой размер от % бандла они занимают
     * устанавливается как dev зависимость. В dev нет смысла анализировать бандл, т.к. он не минифицирован и в нем много лишнего---> используем его в прод режиме
     * устанавливай c типами:
     * -npm i -D webpack-bundle-analyzer@4.9.1
     * -npm i -D @types/webpack-bundle-analyzer
     */
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
