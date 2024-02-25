import React from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./App.module.scss";

export const App = () => {
  const [count, setCount] = React.useState(1);

  return (
    <div>
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
