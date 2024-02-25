import React from "react";
import "./App.scss";

export const App = () => {
  const [count, setCount] = React.useState(1);

  return (
    <>
      <div>App</div>
      <hr />
      <h2>{count}</h2>
      <button
        onClick={() => {
          setCount((prev) => ++prev);
        }}
      >
        <span>Inc</span>
      </button>
    </>
  );
};
