export interface BuildPaths {
  //путь к точке входа в приложение (index.tsx)
  entry: string;
  //путь до html
  html: string;
  //путь куда будет происходить сборка
  output: string;
  //для алиасов
  src: string;
  //для favicon
  public: string;
}

export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  //чтобы постоянно не открывался BundleAnalyzerPlugin
  isAnalyzer?: boolean;

  platform?: BuildPlatform;
}
