import { BuildOptions } from "./../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {
  const isDev = options.mode === "development" ? true : false;
  const isProd = options.mode === "production";

  const _plugins = [];

  if (isProd) {
    _plugins.push(
      /** props: ["data-testId"] -- data-testId это data-атрибут для покрытия тестами, который надо удалить
       */
      [removeDataTestIdBabelPlugin, { props: ["data-testId"] }]
    );
  }

  return {
    /** Регулярка из доки обрабатывает только js файлы */
    // test: /\.m?js$/,
    /** В регулярке обработка ts, tsx файлов */
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",

      /** Настройки пресетов также вынесены в файл babel.config.json (в качестве альтернативного примера - сожержимое этого файла закоментировано).
       * Если все-таки брать данные из  babel.config.json, то поле  options надо закоментировать или удалить*/
      options: {
        /** Массив пресетов (читай вкладку Presets в документации). Для пресетов надо ставить пакеты через npm */
        presets: [
          "@babel/preset-env",
          /**Этот пресет добавляет поддержку синтаксиса типов, используемого языком программирования TypeScript .
           * Однако этот плагин не добавляет возможность проверки типа переданного ему JavaScript.
           * Для этого вам необходимо установить и настроить TypeScript */
          "@babel/preset-typescript",
          /** Если необходимо довать опций в пресет необходимо код завернуть в квадратные скобки (сделать через массив) */
          ["@babel/preset-react", { runtime: isDev ? "automatic" : "classic" }],
        ],

        /** массив кастомных плагинов. Можно передать сам плагин, а если надо передать опции, то передаем массив как в примере---
         * первый элемент это плагин, а второй это опции (также как и делалось в presets(смотри строки выше))
         */
        plugins: _plugins.length ? _plugins : undefined,
      },
    },
  };
}
