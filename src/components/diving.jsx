import React, { useEffect, useRef } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";
import { ReactComponent as DivingSVG } from "../imgs/diving.svg";

const Diving = () => {
  const ref = useRef();
  const timer = useGlobalTimer();

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
    const dom = ref.current;
    if (!dom) return;
    
    // SVG is now available immediately via SVGR
    const seaFilter = dom.querySelector("#sea-filter");
    const divingSvg = dom.querySelector("#driving svg");

    function animateFilter(frame) {
      if (seaFilter) {
        const prop1 = getSinProportion(frame, 100);
        const prop2 = getSinProportion(frame + 50, 200);

        seaFilter.setAttribute("x", prop1 * 5);
        seaFilter.setAttribute("y", prop2 * 5);
      }
    }

    function animateDiving(frame) {
      if (divingSvg) {
        const prop1 = getSinProportion(frame, 300);
        const prop2 = getSinProportion(frame + 150, 400);

        const translateX = prop1 * 10;
        const translateY = prop2 * 15;
        const rotate = getSinProportion(frame, 500) * 5;

        divingSvg.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
      }
    }

    function onScrollHandler(frame) {
      const dom = ref.current;
      const driving = dom;
      const winHeight = window.innerHeight;
      const prop = (window.scrollY - winHeight) / winHeight;

      if (driving) {
        driving.style.top = `${20 + (1 - prop) * 40}%`;
        driving.style.filter = `brightness(${Math.max(
          0.25,
          Math.min(0.7 + prop, 1)
        )})`;
      }
    }

    // Start animations
    timer.addAnimation(animateFilter);
    timer.addAnimation(animateDiving);
    timer.addAnimation(onScrollHandler);
  }, [timer]);

  return (
    <div id="driving" ref={ref}>
      <DivingSVG />
    </div>
  );
};

export default Diving;
