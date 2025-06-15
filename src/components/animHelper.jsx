import React, { useEffect, useState } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";

export default function AnimHelper() {
  const [bars, setBars] = useState([]);
  const timer = useGlobalTimer();

  useEffect(() => {
    const animation = function (frame) {
      const data = [];
      for (let index = 0; index < 9; index++) {
        // if (index === 0) continue;
        const delay = 40 * index;
        const prop = getSinProportion(frame + delay, 300);

        data.push(prop);
      }
      setBars(data);
    };

    timer.addAnimation(animation);
  }, [timer]);

  const style = {
    top: 0,
    left: 0,
    position: "fixed",
    zIndex: 100,
    padding: "10px",
    border: "1px solid white",
    display: "flex",
    height: `55px`,
  };

  return (
    <div style={style}>
      {bars.map((prop) => (
        <div
          style={{
            width: "5px",
            height: `${Math.ceil(50 * prop)}px`,
            border: "1px solid white",
          }}
        />
      ))}
    </div>
  );
}
