export interface BuildPaths {
  //путь к точке входа в приложение (index.tsx)
  entry: string;
  //путь до html
  html: string;
  //путь куда будет происходить сборка
  output: string;
}

export type BuildMode = "production" | "development";

export interface BuildOptions {
  port: number;

  paths: BuildPaths;
  mode: BuildMode;
}
