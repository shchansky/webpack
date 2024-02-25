import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    /** Позволяет приложению react-router-dom отрисовывать нужную страницу. Если строчки ниже не будет, то не будет и роутинга
     * т.к. роутинг в SPA клиентский, т.е. он происходит за счет js (навигация за счет js), а не за счет подгрузки html файла что в папке public
     * Посмотриво вкладке Network вызов http://localhost:3000/about
     * Ищи в доке вебпака devServer.historyApiFallback - там объяснение
     * 
     * Эта опиция работает только для dev-сервера. Если при деплое приложения статику раздавать через nginx--->
     * придется проксировать все запросы через index.html. Смотри ролик про деплой фронтенд приложения
     */
    historyApiFallback: true,
  };
}
