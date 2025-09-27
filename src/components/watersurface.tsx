'use client'

import React, { useRef, useEffect } from "react";
import "./watersurface.css";
import useGlobalTimer from "../hooks/useGlobalTimer.js";

function getWaveMoment(time: number, x: number): number {
  const amplitude = 10;
  const wavelength = 100;

  const wave1 = Math.sin((x + time) / wavelength) * amplitude;
  const wave2 =
    Math.sin((x + time * 1.1) / (wavelength * 0.9)) * amplitude * 0.25;

  return wave1 + wave2;
}

export const WaterSurfaceCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timer = useGlobalTimer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    timer.addAnimation((frame: number) => {
      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, width, height);

      const speed = 3;

      const time = frame * speed;

      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
        const waves = getWaveMoment(time, x);

        const y = height / 4 + waves;
        ctx.lineTo(x, y);
      }

      // Fechar a forma para baixo
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Gradiente do azul escuro ao transparente
      const gradient = ctx.createLinearGradient(0, height / 4, 0, height);
      gradient.addColorStop(0, "rgba(0, 29, 58, 0.2)");
      gradient.addColorStop(1, "rgba(0, 100, 200, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();

      // Linha de contorno da água
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < width; x++) {
        const waves = getWaveMoment(time, x);

        const y = height / 4 + waves - 4;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(81, 175, 242, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [timer]);

  return (
    <canvas
      className="watersurface"
      ref={canvasRef}
      style={{
        width: "100%",
        height: "500px",
        display: "block",
      }}
    />
  );
};
