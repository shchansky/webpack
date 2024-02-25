import React from "react";
import classes from "./App.module.scss";

export const App = () => {
  const [count, setCount] = React.useState(1);

  return (
    <>
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
    </>
  );
};
