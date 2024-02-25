import webpack, { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(
  options: BuildOptions
): Configuration["resolve"] {
  return {
    /* #region  Резолвинг расширений для файлов с исходным кодом */
    extensions: [".tsx", ".ts", ".js"],
    /* #endregion */
  };
}
