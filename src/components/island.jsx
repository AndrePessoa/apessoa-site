import React, { useEffect, useRef } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";
import { ReactComponent as IslandSVG } from "../imgs/ilha.svg";
import { colorInterpolate } from "../helpers/color";

const Island = ({ daylightRef }) => {
  const ref = useRef();
  const timer = useGlobalTimer();

  const control = useRef(0);

  useEffect(() => {
    if (!window.chrome) return;

    const dom = ref.current;

    const skyElem = document.getElementById("home");

    // Animate water line
    const islandTopElem = dom.querySelector("#sand-high");
    const islandTopPoints = islandTopElem.getAttribute("d");
    const islandTopValues = getPathValues(islandTopPoints);
    islandTopElem.style = "opacity: 0";

    const islandBottomElem = dom.querySelector("#sand-low");
    const islandBottomPoints = islandBottomElem.getAttribute("d");
    const islandBottomValues = getPathValues(islandBottomPoints);
    islandBottomElem.style = "opacity: 0.05";

    const islandAnimatedElem = dom.querySelector("#sand-animated");
    const islandWavesEffect = dom.querySelector("#waves");
    const islandAnimationOffset = offsetPathsValues(
      islandTopValues,
      islandBottomValues
    ).reverse();

    const islandAnimatedLeafsElems = Array.from(
      dom.querySelectorAll(`#island #Layer_4 path, #island #Layer_5 path`)
    ).sort(
      (elemA, elemB) =>
        parseFloat(elemA.getAttribute("class").replace(/.*(\d+)/gi, "$1")) -
        parseFloat(elemB.getAttribute("class").replace(/.*(\d+)/gi, "$1"))
    );

    function getPathValues(d) {
      const a = d.match(/([-0-9.]+)|(.)/gi);
      try {
        // const b = d.split(/(?=[a-zA-Z,-])|(?<=[a-zA-Z,-])/gi);
        // console.log(a, b);
      } catch (error) {}

      // console.log(a);

      return a;
    }

    function offsetPathsValues(a, b) {
      return a.map((val, i) => {
        if (!isNaN(val)) {
          return parseFloat(a[i]) - parseFloat(b[i]);
        }
        return undefined;
      });
    }

    function drawSeaWave(frame) {
      function calcProp(i, total) {
        const propTime = i / total;
        const prop1 = getSinProportion(frame + 150 * propTime, 300);
        const prop2 = 1; //getSinProportion(frame + 100 + 400 * propTime, 400);
        return prop1 * prop2;
      }

      islandWavesEffect.setAttribute("dx", calcProp(1, 1) * 14 - 7);
      islandWavesEffect.setAttribute("dy", calcProp(1, 1) * 6);

      const offset = islandAnimationOffset.map((val, i) => {
        const controlValue =
          isNaN(parseInt(control.current)) || control.current === undefined
            ? 0
            : (-100 + parseInt(control.current) * 2) / 100;

        const prop = calcProp(i, (islandAnimationOffset.length - 1) / 2);
        const aProp = (prop * 0.8 + 0.2) * 0.7 * controlValue;
        return val !== undefined ? val * aProp : val;
      });

      const pathValues = offset
        .reverse()
        .map((val, i) =>
          val !== undefined
            ? Math.max(parseFloat(islandBottomValues[i]) + val, 0).toFixed(2)
            : islandTopValues[i]
        );

      islandAnimatedElem.setAttribute("d", pathValues.join(""));
    }

    function drawLeaft(frame) {
      //islandAnimatedLeaf1Elem.style.transform = `rotate(${rotate}deg)`;
      //islandAnimatedLeaf2Elem.style.transform = `rotate(${rotate}deg)`;

      for (let index = 0; index < islandAnimatedLeafsElems.length; index++) {
        // if (index === 0) continue;
        const element = islandAnimatedLeafsElems[index];
        const p = 40 / 300;
        const t = 500;
        const delay = p * t * index;
        const prop1 = getSinProportion(frame + delay, t);

        const rotate = 15 * prop1 - 7.5;

        element.style.transform = `rotate(${rotate}deg)`;
      }
    }

    // animation core
    timer.addAnimation((frame) => {
      const target = daylightRef?.current || 0;
      const newControlValue =
        control.current + (target - control.current) * 0.005;
      control.current = Math.floor(newControlValue * 100) / 100;
    });
    timer.addAnimation(drawSeaWave);
    timer.addAnimation(drawLeaft);
    timer.addAnimation((frame) => {
      const day = "rgb(192, 201, 255)";
      const night = "rgb(33, 37, 66)";

      const color = colorInterpolate(day, night, control.current / 100);

      skyElem.style.setProperty("--home-sky", color);
    });
  }, [daylightRef, timer]);

  return (
    <>
      <IslandSVG ref={ref} />
    </>
  );
};

export default Island;
