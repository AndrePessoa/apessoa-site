'use client'

import { useScrollInertia } from "../hooks/useScrollInertia.js";
import "./portfolio.css";

// scrolling inertia effect
const PortfolioItem = ({
  weight = 1,
  label,
  href,
  img,
  alt,
}: {
  weight?: number; // default weight for inertia effect
  label: string;
  href: string;
  img: string;
  alt: string;
}) => {
  const { targetRef } = useScrollInertia(weight);

  return (
    <a href={href} rel="noreferrer" target="_blank" ref={targetRef}>
      <div className="thumb">
        <img src={img} alt={alt} width="1274" height="880" />
      </div>
      <span>{label}</span>
    </a>
  );
};

export default function ScreenPortfolio() {
  return (
    <section id="portfolio" className="screen">
      <div className="content">
        <h2>Portfolio</h2>
        <p>
          Here you can find some of my last works...
        </p>
        <div className="portfolio-list">
          <ul>
            <li>
              <PortfolioItem
                weight={1.2}
                label="Nextjs visual builder"
                href="https://www.clutch.io/"
                img="./imgs/clutch.png"
                alt="Clutch.io - Next-generation visual builder for WordPress screenshot"
              />
            </li>
            <li>
              <PortfolioItem
                weight={2}
                label="Online fencing card game"
                href="https://www.encarte.apessoa.com/"
                img="./imgs/fencing.png"
                alt="Encarte - Online fencing card game interface screenshot"
              />
            </li>
            <li>
              <PortfolioItem
                weight={1.5}
                label="Torino Po's river rowing rules"
                href="https://torinoriver.netlify.app/"
                img="./imgs/torino.png"
                alt="Torino River - Po River navigation rules and weather data for rowing screenshot"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
