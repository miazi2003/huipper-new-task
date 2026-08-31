"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const regions = [
  { id: "north-america", name: "North America", x: 205, y: 170, projects: "Product strategy and digital platforms" },
  { id: "europe", name: "Europe", x: 495, y: 145, projects: "UX systems and product modernization" },
  { id: "middle-east", name: "Middle East", x: 575, y: 220, projects: "Fintech and enterprise experiences" },
  { id: "south-asia", name: "South Asia", x: 665, y: 245, projects: "SaaS, healthcare, and consumer products" },
  { id: "asia-pacific", name: "Asia Pacific", x: 800, y: 260, projects: "Scalable digital product ecosystems" },
] as const;

type Region = (typeof regions)[number];

const continents = [
  { id: "greenland", d: "M277 35 320 19 354 34 342 70 305 82 279 60Z" },
  { id: "north-america", d: "M55 92 105 48 170 38 226 58 267 105 244 142 203 155 188 193 148 199 121 168 83 158 58 128Z" },
  { id: "south-america", d: "M218 211 270 218 299 254 286 304 263 337 252 390 229 425 208 375 188 338 186 290 199 251Z" },
  { id: "europe", d: "M410 100 448 72 512 74 548 104 528 132 491 131 473 153 438 143 404 123Z" },
  { id: "africa", d: "M426 165 481 145 541 166 565 218 545 279 507 338 473 319 454 271 420 225Z" },
  { id: "asia", d: "M526 94 605 61 701 70 754 103 840 103 910 143 893 190 837 205 807 244 758 238 729 207 675 215 632 181 579 173 548 132Z" },
  { id: "australia", d: "M787 300 839 279 897 302 912 344 874 375 817 365 783 337Z" },
  { id: "japan", d: "M861 180 872 194 866 222 857 211Z" },
  { id: "new-zealand", d: "M923 366 933 379 926 397 916 384Z" },
] as const;

export default function GlobalReach() {
  const [activeRegion, setActiveRegion] = useState<Region>(regions[3]);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  return (
    <section className="gr-section" aria-labelledby="global-reach-heading">
      <div className="gr-card">
        <div className="gr-grid" aria-hidden="true" />

        <div className="gr-info-card">
          <span className="gr-kicker">GLOBAL REACH</span>
          <h2 id="global-reach-heading">5+ Countries.<br />One Product Partner.</h2>
          <p>Huipper works across borders to design digital products that feel clear, useful, and locally relevant.</p>

          <div className="gr-active-region" aria-live="polite">
            <strong>{activeRegion.name}</strong>
            <span>{activeRegion.projects}</span>
          </div>

          <Link className="gr-cta" href="#contact">
            <span>Discuss your project</span>
            <i><ArrowRight /></i>
          </Link>
        </div>

        <div className="gr-map-wrap">
          <svg className="gr-map" viewBox="0 0 960 480" role="img" aria-label="Interactive map showing Huipper project regions">
            <defs>
              <pattern id="gr-dot-pattern" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="1.7" cy="1.7" r="1.08" fill="#896add" />
              </pattern>
              <filter id="gr-pin-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <ellipse className="gr-map-aura" cx="585" cy="255" rx="420" ry="205" aria-hidden="true" />

            <g className="gr-continents" aria-hidden="true">
              {continents.map((continent) => <path d={continent.d} fill="url(#gr-dot-pattern)" key={continent.id} />)}
            </g>

            {regions.map((region) => {
              const isActive = activeRegion.id === region.id;
              return (
                <g
                  className="gr-region"
                  data-active={isActive}
                  key={region.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${region.name}: ${region.projects}`}
                  onMouseEnter={() => { setActiveRegion(region); setHoveredRegion(region); }}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onFocus={() => { setActiveRegion(region); setHoveredRegion(region); }}
                  onBlur={() => setHoveredRegion(null)}
                  onClick={() => { setActiveRegion(region); setHoveredRegion(region); }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setActiveRegion(region);
                  }}
                >
                  <circle className="gr-pin-pulse" cx={region.x} cy={region.y} r="22" />
                  <circle className="gr-pin-halo" cx={region.x} cy={region.y} r={isActive ? 16 : 10} />
                  <circle className="gr-pin" cx={region.x} cy={region.y} r={isActive ? 5 : 3} />
                </g>
              );
            })}
          </svg>

          {hoveredRegion ? (
            <div
              className="gr-map-tooltip"
              style={{ left: `${(hoveredRegion.x / 960) * 100}%`, top: `${(hoveredRegion.y / 480) * 100}%` }}
              role="status"
            >
              <i aria-hidden="true" />
              <strong>{hoveredRegion.name}</strong>
              <span>{hoveredRegion.projects}</span>
            </div>
          ) : null}

        </div>

        <div className="gr-map-statement">
          <strong>DESIGNING BEYOND BORDERS</strong>
          <span>One Huipper team. Global perspective. Products built for real people.</span>
        </div>
      </div>

      <style>{`
        .gr-section { width: 100%; background: #fff; }
        .gr-card { position: relative; width: 100%; height: calc(100svh - 32px); min-height: 620px; overflow: hidden; border: 1px solid rgba(117,83,200,.36); border-radius: 18px; background: radial-gradient(ellipse at 67% 108%,rgba(117,83,200,.82),transparent 51%),radial-gradient(circle at 79% 42%,rgba(64,45,148,.22),transparent 35%),linear-gradient(112deg,#05040c 0%,#090717 39%,#0d0927 70%,#171044 100%); box-shadow: inset 0 0 80px rgba(117,83,200,.1); isolation: isolate; }
        .gr-card::before { position: absolute; z-index: 0; inset: 0; background: radial-gradient(circle at 50% 50%,transparent 35%,rgba(0,0,0,.32) 100%); content: ""; pointer-events: none; }
        .gr-card::after { position: absolute; z-index: 0; right: 0; bottom: -105px; width: 72%; height: 235px; border-radius: 50%; background: rgba(117,83,200,.68); filter: blur(72px); content: ""; }
        .gr-grid { position: absolute; z-index: 0; inset: 0; opacity: .04; background-image: linear-gradient(rgba(255,255,255,.38) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.38) 1px,transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to right,transparent 4%,#000 30%,#000 88%,transparent); }
        .gr-info-card { position: absolute; z-index: 4; top: 50%; left: 3.8%; display: flex; width: clamp(310px,27vw,405px); min-height: 80%; padding: clamp(32px,2.8vw,46px); flex-direction: column; border: 1px solid rgba(255,255,255,.16); border-radius: 14px; background: linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.035)); box-shadow: inset 0 1px 0 rgba(255,255,255,.16),inset 0 0 32px rgba(255,255,255,.025),0 18px 55px rgba(0,0,0,.18); -webkit-backdrop-filter: blur(22px) saturate(125%); backdrop-filter: blur(22px) saturate(125%); transform: translateY(-50%); }
        .gr-kicker { color: #c8b8ef; font-size: 10px; font-weight: 600; letter-spacing: 1.4px; }
        .gr-info-card h2 { margin: 20px 0 0; color: #fff; font-size: clamp(32px,2.8vw,43px); font-weight: 500; line-height: 1.04; letter-spacing: -1.45px; }
        .gr-info-card > p { max-width: 300px; margin: 22px 0 0; color: rgba(255,255,255,.7); font-size: 14px; line-height: 1.55; }
        .gr-active-region { display: grid; margin-top: auto; gap: 5px; color: #fff; }
        .gr-active-region strong { font-size: 13px; font-weight: 600; }
        .gr-active-region span { color: rgba(255,255,255,.58); font-size: 10px; }
        .gr-cta { display: flex; width: 180px; height: 39px; margin-top: 17px; padding: 0 5px 0 15px; align-items: center; justify-content: space-between; border-radius: 999px; background: #fff; color: #3b2c78; font-size: 11px; font-weight: 600; }
        .gr-cta i { display: grid; width: 29px; height: 29px; place-items: center; border-radius: 50%; background: linear-gradient(145deg,#7553c8,#3b2c78); color: #fff; }
        .gr-cta svg { width: 13px; height: 13px; }
        .gr-map-wrap { position: absolute; z-index: 2; top: 2%; right: 1%; bottom: 2%; width: 74%; }
        .gr-map { width: 100%; height: 100%; overflow: visible; }
        .gr-map-aura { fill: rgba(117,83,200,.035); stroke: rgba(137,106,221,.1); stroke-width: 1; }
        .gr-continents { opacity: .62; filter: drop-shadow(0 0 10px rgba(117,83,200,.32)); }
        .gr-region { outline: none; cursor: pointer; }
        .gr-pin-pulse { fill: none; stroke: #896add; stroke-width: 1; opacity: 0; transform-box: fill-box; transform-origin: center; }
        .gr-pin-halo { fill: rgba(137,106,221,.14); stroke: rgba(183,166,229,.32); stroke-width: 1; transition: r 180ms ease,fill 180ms ease; }
        .gr-pin { fill: #b7a6e5; filter: url(#gr-pin-glow); transition: r 180ms ease,fill 180ms ease; }
        .gr-region[data-active="true"] .gr-pin-halo { fill: rgba(137,106,221,.3); stroke: #c8b8ef; }
        .gr-region[data-active="true"] .gr-pin { fill: #fff; }
        .gr-region[data-active="true"] .gr-pin-pulse { animation: gr-map-pulse 2.2s ease-out infinite; }
        .gr-region:focus-visible .gr-pin-halo { stroke: #fff; stroke-width: 2; }
        .gr-map-tooltip { position: absolute; z-index: 8; display: grid; width: 190px; padding: 12px 14px; gap: 5px; border: 1px solid rgba(255,255,255,.2); border-radius: 11px; background: linear-gradient(145deg,rgba(255,255,255,.15),rgba(255,255,255,.055)); color: #fff; box-shadow: 0 12px 34px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.14); -webkit-backdrop-filter: blur(16px) saturate(130%); backdrop-filter: blur(16px) saturate(130%); pointer-events: none; transform: translate(-50%,calc(-100% - 22px)); animation: gr-tooltip-in 160ms ease-out both; }
        .gr-map-tooltip::after { position: absolute; top: 100%; left: 50%; width: 10px; height: 10px; border-right: 1px solid rgba(255,255,255,.18); border-bottom: 1px solid rgba(255,255,255,.18); background: rgba(46,37,88,.88); content: ""; transform: translate(-50%,-5px) rotate(45deg); }
        .gr-map-tooltip i { width: 22px; height: 3px; margin-bottom: 2px; border-radius: 999px; background: linear-gradient(90deg,#b7a6e5,#7553c8); }
        .gr-map-tooltip strong { font-size: 12px; font-weight: 600; line-height: 1.2; }
        .gr-map-tooltip span { color: rgba(255,255,255,.66); font-size: 9px; line-height: 1.4; }
        .gr-map-statement { position: absolute; z-index: 3; right: 4.5%; bottom: 4.8%; display: grid; max-width: 68%; justify-items: end; gap: 10px; pointer-events: none; text-align: right; }
        .gr-map-statement strong { color: rgba(255,255,255,.58); font-size: clamp(34px,4.25vw,66px); font-weight: 500; line-height: .95; letter-spacing: -2.5px; white-space: nowrap; }
        .gr-map-statement span { color: rgba(255,255,255,.76); font-size: 11px; letter-spacing: .35px; }

        @keyframes gr-map-pulse { 0%{opacity:.72;transform:scale(.35)} 72%,100%{opacity:0;transform:scale(1.25)} }
        @keyframes gr-tooltip-in { from{opacity:0;transform:translate(-50%,calc(-100% - 14px)) scale(.96)} to{opacity:1;transform:translate(-50%,calc(-100% - 22px)) scale(1)} }

        @media (max-width:900px) {
          .gr-card { height: calc(100svh - 32px); min-height: 700px; }
          .gr-info-card { top: 32px; left: 32px; width: min(390px,calc(100% - 64px)); min-height: 300px; transform: none; }
          .gr-map-wrap { top: 225px; right: -9%; bottom: -30px; width: 105%; }
          .gr-map-statement { right: 5%; bottom: 4%; max-width: 90%; }
          .gr-map-statement strong { font-size: clamp(30px,6vw,48px); }
        }

        @media (max-width:560px) {
          .gr-card { height: calc(100svh - 20px); min-height: 720px; border-radius: 15px; }
          .gr-info-card { top: 18px; left: 18px; width: calc(100% - 36px); min-height: 324px; padding: 27px; }
          .gr-info-card h2 { font-size: 30px; }
          .gr-map-wrap { top: 303px; right: -34%; width: 145%; }
          .gr-map-statement { right: 18px; bottom: 22px; left: 18px; max-width: none; justify-items: start; text-align: left; }
          .gr-map-statement strong { font-size: clamp(26px,8vw,36px); letter-spacing: -1.5px; white-space: normal; }
          .gr-map-statement span { max-width: 290px; font-size: 10px; line-height: 1.4; }
        }

        @media (prefers-reduced-motion:reduce) {
          .gr-pin,.gr-pin-halo { transition: none; }
          .gr-region[data-active="true"] .gr-pin-pulse { animation: none; }
          .gr-map-tooltip { animation: none; }
        }
      `}</style>
    </section>
  );
}
