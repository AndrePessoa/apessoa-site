import { useEffect, useRef } from "react";
import useGlobalTimer from "./useGlobalTimer.js";

export const useScrollInertia = (weight = 1) => {
  const targetRef = useRef(null);
  const context = useRef({
    rotationDirection: 1,
    currentScrollYOfset: 0,
    lastScrollY: 0,
    scroll: 0,
    lastTime: null,
    rafId: null,
  });
  const timer = useGlobalTimer(60); // 60 FPS

  useEffect(() => {
    timer.addAnimation(() => {
      const now = performance.now();
      if (
        context.current.lastTime !== null &&
        context.current.lastScrollY !== window.scrollY
      ) {
        // const deltaTime = now - context.current.lastTime;
        const deltaScroll = window.scrollY - context.current.lastScrollY;
        context.current.lastScrollY = window.scrollY;
        context.current.lastTime = now;
        context.current.currentScrollYOfset += deltaScroll;

        context.current.currentScrollYOfset = Math.min(
          context.current.currentScrollYOfset,
          window.innerHeight * 0.25
        ); // Limit offset to half the viewport height
      } else {
        context.current.lastTime = now;
        context.current.lastScrollY = window.scrollY;
      }

      if (targetRef.current) {
        // Apply inertia effect
        const friction = 1 - 0.02 * weight; // Adjust friction as needed
        const newOffet = context.current.currentScrollYOfset * friction;
        const diff = Math.abs(newOffet - context.current.currentScrollYOfset);
        const rotation = `rotate(${
          diff * context.current.rotationDirection * 0.5
        }deg)`; // Example rotation effect
        const transition = `translateY(${context.current.currentScrollYOfset}px)`;
        targetRef.current.style.transform = `${transition} ${rotation}`;
        context.current.currentScrollYOfset =
          Math.abs(newOffet) < 0.1 ? 0 : newOffet;

        if (Math.abs(context.current.currentScrollYOfset) < 0.1) {
          context.current.rotationDirection = Math.random() > 0.5 ? 1 : -1; // Reset offset when close to zero
        }
      }
    });
  }, [weight, timer]);

  return { targetRef, context };
};
