import React, { useEffect, useRef } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";
import { ReactComponent as DivingSVG } from "../imgs/diving.svg";

const Diving = () => {
  const timer = useGlobalTimer();
  const ref = useRef();

  useEffect(() => {
    const dom = ref.current;
    // animate underwater effect

    const meDrivingElem = dom.querySelector("#driving svg");
    const meDrivingEffect = dom.querySelector("#sea-filter");

    function drawDrivingEffect(frame) {
      const cycle = 2000;
      const noiseProp = getSinProportion(frame + cycle / 4, cycle / 3);
      const prop1 = getSinProportion(frame, cycle) * noiseProp;
      const prop2 = getSinProportion(frame + cycle / 2, cycle) * noiseProp;
      const prop3 = getSinProportion(frame, cycle * 2);

      meDrivingEffect.setAttribute(
        "baseFrequency",
        `${0.005 * prop1} ${0.005 * prop2}`
      );
      meDrivingElem.setAttribute(
        "style",
        `transform: translate(0, ${(50 * prop2).toFixed(2)}px) rotate(${(
          5 * prop3
        ).toFixed(2)}deg);`
      );
    }

    timer.addAnimation(drawDrivingEffect);
  }, [timer]);

  useEffect(() => {
    function onScrollHandler() {
      const dom = ref.current;
      const driving = dom;
      const winHeight = window.innerHeight;
      const limit = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const prop = window.scrollY / limit;
      const paralax = prop * winHeight - winHeight / 3;
      if (driving) driving.style = `bottom: ${paralax}px`;
    }
    window.addEventListener("scroll", onScrollHandler);

    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  return (
    <div id="driving" ref={ref}>
      <DivingSVG />
    </div>
  );
};

export default Diving;
