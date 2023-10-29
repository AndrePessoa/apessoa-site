import React from "react";
import Island from "../components/island";
import { ReactComponent as Anchor } from "../imgs/anchor.svg";

export default function ScreenHome() {
  return (
    <section id="home" className="screen">
      <h1>A. Pessoa</h1>
      <div id="island">
        <Island />
      </div>
      <div id="bottombar">
        <div id="greeting">
          <p>Hi, nice to see you!</p>
          <p className="small">(It was really lonely in here.)</p>
        </div>
        <a id="godown" href="#info">
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
