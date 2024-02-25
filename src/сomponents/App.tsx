import React from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./App.module.scss";
//импорт картинки как алиаса
import avatarPng from "@/assets/avatar.png";
import avatarJpg from "@/assets/avatar.jpg";
import СalendarSvg from "@/assets/calendar.svg";

export const App = () => {
  const [count, setCount] = React.useState(1);

  return (
    <div>
      <img width={100} height={100} src={avatarPng} />
      <img width={100} height={100} src={avatarJpg} />
      <div>
        <СalendarSvg fill={"red"} width={50} height={50}/>
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
