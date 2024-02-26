import React from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./App.module.scss";
//импорт картинки как алиаса
import avatarPng from "@/assets/avatar.png";
import avatarJpg from "@/assets/avatar.jpg";
import СalendarSvg from "@/assets/calendar.svg";

/** TREE SHAKING
 * Покуда эта ф-ия не будет использована, она в итоговый бандл не попадент
 * */
function TODO(num: number) {
  console.log("TODOFUNCTION");
}

export const App = () => {
  const [count, setCount] = React.useState(1);

  // Сборка упадет с ошибкой тайпскрипта (см. комменты в файле buildLoader). Также проверка типов существенно замедлет сборку
  // TODO("ddd");

  /** Исключит из сборки код что представлен ниже (после ).
   * Можно разделять бандлы на несколько. Один для десктопа, другой для мобильной версии
   * Неиспользуемые ветки кода вебпак выпиливает из сборки (этот механизм называется tree shaking)
   */
  if (__PLATFORM__ === "mobile") return <div>IsMobilePlatform</div>;

  if (__PLATFORM__ === "desktop") return <div>IsDesktopPlatform</div>;

  /** Кусок кода как пример */
  // if(__ENV__ === "development") {addDevTools}

  return (
    <div>
      <h1>Platform = {__PLATFORM__}</h1>
      <img width={100} height={100} src={avatarPng} />
      <img width={100} height={100} src={avatarJpg} />
      <div>
        <СalendarSvg fill={"red"} width={50} height={50} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={"/about"}>about</Link>
        <Link to={"/shop"}>shop</Link>
      </div>

      <div>App</div>
      <hr />
      <h2 className={classes.value}>{count}</h2>
      <button
        className={classes.button}
        onClick={() => {
          setCount((prev) => ++prev);
        }}
      >
        <span>Inc</span>
      </button>
      {/** В Outlet отрисовывается контент react-router-dom */}
      <Outlet />
    </div>
  );
};
