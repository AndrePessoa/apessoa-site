'use client';

import React, { useEffect, useRef } from "react";
import { getSinProportion } from "../helpers";
import useGlobalTimer from "../hooks/useGlobalTimer";
import DivingSvg from "../imgs/diving.svg";

const Diving = ({ control }) => {
  const ref = useRef();
  const timer = useGlobalTimer();



  // Animation setup - wait for SVG to load
  useEffect(() => {
    if (typeof window === 'undefined' || !window.chrome) return;

    const dom = ref.current;
    if (!dom) return;

    // SVG is now available immediately via SVGR
    const seaFilter = dom.querySelector("#sea-filter");
    const divingSvg = dom.querySelector("#driving svg");

    if (!seaFilter || !divingSvg) {
      console.warn('Diving SVG elements not found:', { seaFilter, divingSvg });
      return;
    }

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
    <div ref={ref} id="driving" style={{ width: '100%', height: '100%' }}>
      <DivingSvg />
    </div>
  );
};

export default Diving;
