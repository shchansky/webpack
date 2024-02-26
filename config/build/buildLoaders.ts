import { ModuleOptions } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development" ? true : false;

  /** Загрузка картинок */
  const assetLoader = {
    /** в регулярке типы картинок */
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  /** Закгрузка svg как реакт рабочий вариант */
  // const svgrLoader = {
  //   test: /\.svg$/,
  //   use: ["@svgr/webpack"],
  // };

  /** Закгрузка svg как реакт клмпонентов (смотри доку svgrLoader, данные что в use данные из библиотеки берем ) */
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      //для загрузки css модулей
      modules: {
        /** [hash:base64:8] - 8 это количество символов сколько взять*/
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

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
       * Creates "style" nodes from JS strings
       */
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,

      //Перевод css в CommonJS
      // "css-loader",
      cssLoaderWithModules,

      //компилирует sass в сss
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

    /**Вариант ts-loader выполняет сборку(компиляцию) тайпскрипта с проверкой типов, что существенно увеличивает время сборки  */
    // use: "ts-loader",

    /** Вариант, чтобы значительно ускорить компиляцию с пом.флага  transpileOnly: true (см. доку ts-loader на npm)
     * Т.е. в данном случае ts-loader будет осуществлять только компиляцию (сборку тайпскрипта) без проверки типов,
     * но значительно ускорит сборку
     * Даже если будет тайпскриптовая ошибка она никак не всплывет в логах и не помешает сборке
     *
     * Лучше использоватеь вместе с ForkTsCheckerWebpackPlugin (см. файл buildLoaders)- проверка типов будет выполняться в отдельном процессе
     */
    use: [
      {
        loader: "ts-loader",
        options: {
          /** Не проверяет типы тайпскрипта */
          transpileOnly: true,
          /** Проверяет типы тайпскрипта */
          // transpileOnly: false,
        },
      },
    ],

    exclude: /node_modules/,
  };

  return [assetLoader, scssLoader, tsLoader, svgrLoader];
}
