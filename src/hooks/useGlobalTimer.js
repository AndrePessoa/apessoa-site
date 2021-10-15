import { useCallback, useEffect, useMemo } from "react";

const state = {
  paused: false,
  playing: false,
};

let animationFunctions = [];
let frame = 0;

export default function useGlobalTimer() {
  const { paused } = state;
  const addAnimation = useCallback((fn) => animationFunctions.push(fn), []);

  useEffect(() => {
    function tick() {
      frame++;

      animationFunctions.forEach((fn) => {
        try {
          fn(frame);
        } catch (error) {
          console.log(error);
        }
      });

      if (!paused) window.requestAnimationFrame(tick);
    }
    if (!state.playing) {
      state.playing = true;
      tick();
    }

    return () => window.cancelAnimationFrame(tick);
  }, [paused]);

  const timer = useMemo(
    () => ({ addAnimation, paused }),
    [addAnimation, paused]
  );

  return timer;
}
