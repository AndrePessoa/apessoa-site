import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_FRAME_RATE = 60; // frames por segundo

// Singleton timer state and animation functions
const globalState = {
  paused: false,
  playing: false,
  initTime: null,
  lastTime: null,
  pauseOffset: 0,
  rafId: null,
  frameRate: DEFAULT_FRAME_RATE,
};
const animationFunctions = [];

function startGlobalTick() {
  if (globalState.rafId) return;
  function tick() {
    if (globalState.paused) return;
    const now = performance.now();
    if (!globalState.initTime) {
      globalState.initTime = now;
      globalState.lastTime = now;
    }
    globalState.lastTime = now;
    const elapsed = now - globalState.initTime - globalState.pauseOffset;
    const frame = Math.floor((elapsed / 1000) * globalState.frameRate);
    animationFunctions.forEach((fn) => {
      try {
        fn(frame);
      } catch (error) {
        console.log(error);
      }
    });
    globalState.rafId = window.requestAnimationFrame(tick);
  }
  globalState.rafId = window.requestAnimationFrame(tick);
}

export default function useGlobalTimer(frameRate = DEFAULT_FRAME_RATE) {
  // Set frameRate only on first call
  if (!globalState.playing) {
    globalState.frameRate = frameRate;
  }
  const [paused, setPaused] = useState(globalState.paused);

  const addAnimation = useCallback((fn) => {
    animationFunctions.push(fn);
  }, []);

  const pause = useCallback(() => {
    if (!globalState.paused) {
      globalState.paused = true;
      setPaused(true);
      if (globalState.lastTime) {
        globalState.pauseOffset += performance.now() - globalState.lastTime;
      }
      if (globalState.rafId) {
        window.cancelAnimationFrame(globalState.rafId);
        globalState.rafId = null;
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (globalState.paused) {
      globalState.paused = false;
      setPaused(false);
      globalState.lastTime = performance.now();
      startGlobalTick();
    }
  }, []);

  const play = useCallback(() => {
    if (!globalState.playing) {
      globalState.playing = true;
      globalState.paused = false;
      setPaused(false);
      globalState.initTime = null;
      globalState.lastTime = null;
      globalState.pauseOffset = 0;
      startGlobalTick();
    }
  }, []);

  useEffect(() => {
    if (!globalState.playing) {
      globalState.playing = true;
      startGlobalTick();
    }
    return () => {
      // Não cancela o timer global, pois pode haver outros hooks usando
    };
  }, []);

  const timer = useMemo(
    () => ({
      addAnimation,
      play,
      paused,
      pause,
      resume,
      frameRate: globalState.frameRate,
    }),
    [addAnimation, play, paused, pause, resume]
  );

  return timer;
}
