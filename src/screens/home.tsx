import React from "react";
import Island from "../components/island";
import { ReactComponent as Anchor } from "../imgs/anchor.svg";
import { ReactComponent as Sun } from "../imgs/sun.svg";
import { ReactComponent as Moon } from "../imgs/moon.svg";
import "./home.css";

enum Mode {
  light = "light",
  dark = "dark",
}

// Returns the sun's vertical position (0 = top, 100 = bottom) for a given hour (0-24, can be float)
function sunPositionValue(hour: number): number {
  // Normalize hour to [0, 24)
  const h = ((hour % 24) + 24) % 24;
  // Night: 20h–4h (inclusive)
  if (h >= 20 || h < 4) return 100;
  // Day: 11h–13h (inclusive) sun at top
  if (h >= 11 && h <= 13) return 0;
  // Sunrise: 4h–11h (100 → 0)
  if (h >= 4 && h < 11) {
    return 100 - ((h - 4) / 7) * 100;
  }
  // Sunset: 13h–20h (0 → 100)
  if (h > 13 && h < 20) {
    return ((h - 13) / 7) * 100;
  }
  // Fallback (should not reach here)
  return 100;
}

function getInitialValue(): number {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  return sunPositionValue(hour);
}

function getInitialMode(): Mode {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 19 ? Mode.light : Mode.dark;
}

export default function ScreenHome() {
  const [mode, setMode] = React.useState<Mode>(getInitialMode());
  const daylightRef = React.useRef<number>(getInitialValue());

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    daylightRef.current = newMode === Mode.light ? 0 : 100;
  };

  return (
    <section
      id="home"
      className="screen"
      style={
        {
          "--mask-stars": mode === Mode.dark ? "black" : "transparent",
        } as React.CSSProperties
      }
    >
      <h1>A. Pessoa </h1>
      <div className={`mode ${mode}`}>
        <span onClick={() => handleModeChange(Mode.light)} className="light">
          <Sun />
        </span>
        <span onClick={() => handleModeChange(Mode.dark)} className="dark">
          <Moon />
        </span>
      </div>
      <div id="island">
        <Island daylightRef={daylightRef} />
      </div>
      <div id="bottombar">
        <div id="greeting">
          <p>Hi, nice to see you!</p>
          <p className="small">(It was really lonely in here.)</p>
        </div>
        <a id="godown" href="#portfolio">
          <div className="anchor">
            <div className="scaler">
              <Anchor />
            </div>
          </div>
          <div className="label">Let's go!</div>
        </a>
      </div>
    </section>
  );
}
