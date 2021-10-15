import React, { useEffect, useRef } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";
import { ReactComponent as IslandSVG } from "../imgs/ilha.svg";

const Island = () => {
  const ref = useRef();
  const timer = useGlobalTimer();

  useEffect(() => {
    const dom = ref.current;

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
      return d.split(/(?=[a-zA-Z,-])|(?<=[a-zA-Z,-])/gi);
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
        const prop = calcProp(i, (islandAnimationOffset.length - 1) / 2);
        const aProp = prop * 0.8 + 0.2;
        return val !== undefined ? val * aProp * 0.7 : val;
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
    timer.addAnimation(drawSeaWave);
    timer.addAnimation(drawLeaft);
  }, [timer]);

  return <IslandSVG ref={ref} />;
};

export default Island;
