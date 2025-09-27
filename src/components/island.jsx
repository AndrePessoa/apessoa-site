'use client';

import React, { useEffect, useRef } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";
import { colorInterpolate } from "../helpers/color";
import IslandSvg from "../imgs/ilha.svg";

const Island = ({ daylight }) => {
  const ref = useRef();
  const daylightRef = useRef({ current: daylight });
  const control = useRef(0);
  const timer = useGlobalTimer();

  daylightRef.current = daylight;



  // Non-Animated version for reduced motion preference
  useEffect(() => {
    if(timer.isReduced) {
      const skyElem = document.getElementById("home");
      const day = "rgb(192, 201, 255)";
      const night = "rgb(33, 37, 66)";
      const color = colorInterpolate(day, night, daylight / 100);
      if (skyElem) {
        skyElem.style.setProperty("--home-sky", color);
      }
    }
  }, [daylight, timer]);

  // Animation setup - wait for SVG to load
  useEffect(() => {
    if (typeof window === 'undefined' || !window.chrome) return;

    const dom = ref.current;
    if (!dom) return;

    const skyElem = document.getElementById("home");

    // SVG is now available immediately via SVGR
    const islandTopElem = dom.querySelector("#sand-high");
    const islandBottomElem = dom.querySelector("#sand-low");
    
    if (!islandTopElem || !islandBottomElem) {
      console.warn('Island SVG elements not found:', { islandTopElem, islandBottomElem });
      return;
    }

      // Helper functions
      function getPathValues(d) {
        const a = d.match(/([-0-9.]+)|(.)/gi);
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

      // Initialize animation elements
      const islandTopPoints = islandTopElem.getAttribute("d");
      const islandTopValues = getPathValues(islandTopPoints);
      islandTopElem.style = "opacity: 0";

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
        dom.querySelectorAll("#island #Layer_4 path, #island #Layer_5 path")
      ).sort(
        (elemA, elemB) =>
          parseFloat(elemA.getAttribute("class").replace(/.*(\d+)/gi, "$1")) -
          parseFloat(elemB.getAttribute("class").replace(/.*(\d+)/gi, "$1"))
      );

      function drawSeaWave(frame) {
        function calcProp(i, total) {
          const propTime = i / total;
          const prop1 = getSinProportion(frame + 150 * propTime, 300);
          const prop2 = 1;
          return prop1 * prop2;
        }

        if (islandWavesEffect) {
          islandWavesEffect.setAttribute("dx", calcProp(1, 1) * 14 - 7);
          islandWavesEffect.setAttribute("dy", calcProp(1, 1) * 6);
        }

        if (islandAnimatedElem) {
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
      }

      function drawLeafs(frame) {
        for (let index = 0; index < islandAnimatedLeafsElems.length; index++) {
          const element = islandAnimatedLeafsElems[index];
          const p = 40 / 300;
          const t = 500;
          const delay = p * t * index;
          const prop1 = getSinProportion(frame + delay, t);

          const rotate = 15 * prop1 - 7.5;

          element.style.transform = `rotate(${rotate}deg)`;
        }
      }

      // Start animations
      timer.addAnimation(() => {
        const target = daylightRef?.current || 0;
        const newControlValue =
          control.current + (target - control.current) * 0.005;
        control.current = Math.floor(newControlValue * 100) / 100;
      });
      
      timer.addAnimation(drawSeaWave);
      timer.addAnimation(drawLeafs);
      
      timer.addAnimation(() => {
        const day = "rgb(192, 201, 255)";
        const night = "rgb(33, 37, 66)";
        const color = colorInterpolate(day, night, control.current / 100);

        if (skyElem) {
          skyElem.style.setProperty("--home-sky", color);
        }
      });
  }, [daylightRef, timer]);

  return (
    <div ref={ref} id="island" style={{ width: '80vw', maxWidth: '800px', maxHeight: '70vh' }}>
      <IslandSvg />
    </div>
  );
};

export default Island;
