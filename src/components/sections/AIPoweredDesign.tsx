"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  aiTools,
  bottomMarqueeTools,
  topMarqueeTools,
  workflowStages,
  type AITool,
} from "@/data/aiWorkflow";

const toolMap = new Map(aiTools.map((tool) => [tool.id, tool]));

function ToolIcon({ tool, small = false }: { tool: AITool; small?: boolean }) {
  return (
    <span className={small ? "ai-tool-icon ai-tool-icon-small" : "ai-tool-icon"} title={tool.name}>
      {tool.icon ? (
        <Image src={tool.icon} alt={tool.name} width={small ? 30 : 42} height={small ? 30 : 42} />
      ) : (
        <i style={{ color: tool.color }}>{tool.shortLabel}</i>
      )}
    </span>
  );
}

function MarqueeRow({ toolIds, direction }: { toolIds: string[]; direction: "left" | "right" }) {
  const sequence = [...toolIds, ...toolIds]
    .map((id) => toolMap.get(id))
    .filter((tool): tool is AITool => Boolean(tool));

  return (
    <div className="ai-marquee-row">
      <div className={`ai-marquee-track ai-marquee-${direction}`}>
        {[0, 1].map((copy) => (
          <div className="ai-marquee-set" aria-hidden={copy === 1} key={copy}>
            {sequence.map((tool, index) => (
              <span className="ai-tool-tile" key={`${copy}-${tool.id}-${index}`}>
                <ToolIcon tool={tool} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M14 6l6 6-6 6" /></svg>;
}

export default function AIPoweredDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ai-section${isVisible ? " ai-section-visible" : ""}`}
      aria-labelledby="ai-powered-heading"
    >
      <div className="ai-header">
        <p>AI-Powered Design</p>
        <h2 id="ai-powered-heading">Smarter Design, <em>Supercharged By AI</em></h2>
        <span>From wireframes to launch, we blend AI tools with strategy to deliver faster,<br />sharper, and data-led design results.</span>
      </div>

      <div className="ai-ecosystem">
        <div className="ai-marquees" aria-label="AI and design tool ecosystem">
          <MarqueeRow toolIds={topMarqueeTools} direction="left" />
          <MarqueeRow toolIds={bottomMarqueeTools} direction="right" />
        </div>

        <div className="ai-node" aria-label="AI orchestration node">
          <Image
            src="/images/ai-powered-design/ai-tools-workflow.avif"
            alt=""
            fill
            sizes="430px"
            aria-hidden="true"
          />
        </div>

        <div className="ai-connectors" aria-hidden="true">
          <Image
            src="/images/ai-powered-design/ai-workflow-connectors.avif"
            alt=""
            fill
            sizes="957px"
          />
        </div>

        <div className="ai-workflow">
          {workflowStages.map((stage) => (
            <article className="ai-stage" key={stage.title}>
              <h3>{stage.title}</h3>
              <div className="ai-stage-tools">
                {stage.toolIds.map((id) => {
                  const tool = toolMap.get(id);
                  return tool ? <ToolIcon tool={tool} small key={id} /> : null;
                })}
              </div>
              <p>PRODUCES:</p>
              <div className="ai-outputs">
                {stage.outputs.map((output) => <span key={output}>{output}</span>)}
              </div>
            </article>
          ))}
        </div>

        <Link className="ai-cta" href="/services">
          <span>Explore AI Capabilities</span>
          <ArrowIcon />
        </Link>
      </div>

      <style>{`
        .ai-section {
          position: relative;
          height: 1220px;
          margin: 16px 0;
          padding-top: 62px;
          overflow: hidden;
          border-radius: 32px 32px 0 0 ;
          background: #020202;
          color: #f7f7f7;
        }

        .ai-header { position: relative; z-index: 5; text-align: center; }

        .ai-header > p {
          display: flex;
          width: max-content;
          height: 34px;
          margin: 0 auto 24px;
          padding: 0 16px;
          align-items: center;
          border: 1px solid #00a95d;
          border-radius: 999px;
          color: #19cb78;
          font-size: 15px;
          line-height: 1;
        }

        .ai-header h2 {
          margin: 0;
          font-size: clamp(46px, 3.4vw, 52px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -1.8px;
        }

        .ai-header h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .ai-header > span {
          display: block;
          margin-top: 20px;
          color: #b8b8b8;
          font-size: 18px;
          line-height: 1.5;
        }

        .ai-ecosystem { position: relative; height: 910px; margin-top: 98px; }

        .ai-marquees {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 50%;
          display: grid;
          width: min(1680px, calc(100% - 120px));
          gap: 24px;
          transform: translateX(-50%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }

        .ai-marquees::before,
        .ai-marquees::after {
          position: absolute;
          z-index: 3;
          top: -12px;
          bottom: -12px;
          width: min(220px, 18vw);
          pointer-events: none;
          content: "";
          -webkit-backdrop-filter: blur(2.5px);
          backdrop-filter: blur(2.5px);
        }

        .ai-marquees::before {
          left: 0;
          background: linear-gradient(90deg, rgba(2, 2, 2, 0.96), rgba(2, 2, 2, 0));
        }

        .ai-marquees::after {
          right: 0;
          background: linear-gradient(270deg, rgba(2, 2, 2, 0.96), rgba(2, 2, 2, 0));
        }

        .ai-marquee-row { position: relative; z-index: 1; width: 100%; overflow: hidden; }
        .ai-marquee-track, .ai-marquee-set { display: flex; width: max-content; gap: 24px; }
        .ai-marquee-track { backface-visibility: hidden; will-change: transform; }
        .ai-marquee-left { animation: ai-marquee-left 96s linear infinite; }
        .ai-marquee-right { animation: ai-marquee-right 102s linear infinite; }

        .ai-tool-tile {
          display: grid;
          width: 86px;
          height: 86px;
          flex: none;
          place-items: center;
          border: 1px solid rgba(111, 163, 190, 0.12);
          border-radius: 20px;
          background: rgba(33, 42, 51, 0.72);
        }

        .ai-tool-icon {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border-radius: 13px;
          background: #101820;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
        }

        .ai-tool-icon i {
          font-size: 16px;
          font-style: normal;
          font-weight: 800;
          line-height: 1;
        }

        .ai-tool-icon-small { width: 56px; height: 56px; border-radius: 13px; }
        .ai-tool-icon-small i { font-size: 14px; }

        .ai-node {
          position: absolute;
          z-index: 4;
          top: -105px;
          left: 50%;
          width: 430px;
          height: 430px;
          pointer-events: none;
          transform: translateX(-50%);
          animation: ai-node-breathe 3.6s ease-in-out infinite;
        }

        .ai-node img {
          top: 0 !important;
          right: auto !important;
          bottom: auto !important;
          left: 50% !important;
          width: 430px !important;
          height: 430px !important;
          max-width: none !important;
          object-fit: contain;
          transform: translateX(-50%);
        }

        .ai-connectors {
          position: absolute;
          z-index: 2;
          top: 290px;
          left: 50%;
          width: 957px;
          height: 132px;
          transform: translateX(-50%);
          opacity: 0;
          filter: blur(4px);
        }

        .ai-connectors img { object-fit: fill; }

        .ai-workflow {
          position: absolute;
          z-index: 3;
          top: 410px;
          left: 50%;
          display: grid;
          grid-template-columns: repeat(4, 295px);
          gap: 24px;
          transform: translateX(-50%);
        }

        .ai-stage {
          position: relative;
          height: 268px;
          padding: 22px 20px;
          overflow: hidden;
          border: 1px solid rgba(109, 200, 239, 0.3);
          border-radius: 16px;
          background:
            radial-gradient(circle at 50% -20%, rgba(44, 126, 166, 0.2), transparent 48%),
            linear-gradient(145deg, #121d25 0%, #0a141b 72%, #081117 100%);
          box-shadow:
            0 18px 46px rgba(0, 0, 0, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            inset 0 0 35px rgba(32, 117, 157, 0.06);
          opacity: 0;
          filter: blur(8px);
          transform: translate3d(0, 82px, 0);
          will-change: transform, opacity, filter;
        }

        .ai-stage::before {
          position: absolute;
          top: 0;
          right: 18px;
          left: 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(97, 211, 255, 0.48), transparent);
          content: "";
        }

        .ai-section-visible .ai-connectors {
          animation: ai-wire-arrive 620ms cubic-bezier(0.2, 0.8, 0.2, 1) 80ms both;
        }

        .ai-section-visible .ai-stage {
          animation: ai-card-rise 820ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .ai-section-visible .ai-stage:nth-child(1) { animation-delay: 260ms; }
        .ai-section-visible .ai-stage:nth-child(2) { animation-delay: 370ms; }
        .ai-section-visible .ai-stage:nth-child(3) { animation-delay: 480ms; }
        .ai-section-visible .ai-stage:nth-child(4) { animation-delay: 590ms; }

        .ai-stage h3 { margin: 0 0 22px; font-size: 24px; line-height: 1; letter-spacing: -0.6px; }
        .ai-stage-tools { display: flex; gap: 12px; }
        .ai-stage > p { margin: 38px 0 11px; color: #9ca4aa; font-size: 12px; line-height: 1; }
        .ai-outputs { display: flex; flex-wrap: wrap; gap: 7px; }

        .ai-outputs span {
          padding: 6px 8px;
          border-radius: 5px;
          background: #d8e1e5;
          color: #172027;
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
        }

        .ai-cta {
          position: absolute;
          z-index: 4;
          top: 735px;
          left: 50%;
          display: flex;
          width: 240px;
          height: 54px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 7px;
          background: linear-gradient(110deg, #6c2de8, #823cff);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          transform: translateX(-50%);
          transition: filter 160ms ease;
        }

        .ai-cta:hover { filter: brightness(1.12); }
        .ai-cta svg { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }

        @keyframes ai-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-50% - 12px), 0, 0); }
        }

        @keyframes ai-marquee-right {
          from { transform: translate3d(calc(-50% - 12px), 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @keyframes ai-node-breathe {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(68, 201, 255, 0.16)); }
          50% { filter: drop-shadow(0 0 18px rgba(68, 201, 255, 0.3)); }
        }

        @keyframes ai-wire-arrive {
          from { opacity: 0; filter: blur(4px); transform: translate3d(-50%, -12px, 0); }
          to { opacity: 1; filter: blur(0); transform: translate3d(-50%, 0, 0); }
        }

        @keyframes ai-card-rise {
          0% { opacity: 0; filter: blur(8px); transform: translate3d(0, 82px, 0); }
          72% { opacity: 1; filter: blur(0); transform: translate3d(0, -4px, 0); }
          100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 1199px) and (min-width: 761px) {
          .ai-connectors { width: 702px; height: 120px; }
          .ai-workflow { grid-template-columns: repeat(4, 220px); gap: 14px; }
          .ai-stage { height: 230px; padding: 17px; }
          .ai-stage h3 { font-size: 17px; }
          .ai-outputs span { font-size: 9px; }
        }

        @media (max-width: 760px) {
          .ai-section { height: auto; min-height: 1040px; margin: 12px; padding: 45px 0 60px; }
          .ai-header { padding: 0 18px; }
          .ai-header h2 { font-size: 28px; }
          .ai-header > span br { display: none; }
          .ai-ecosystem { height: 850px; margin-top: 36px; }
          .ai-tool-tile { width: 38px; height: 38px; border-radius: 10px; }
          .ai-marquees {
            left: 50%;
            width: 100%;
            gap: 8px;
            mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          }
          .ai-marquees::before, .ai-marquees::after { width: 48px; -webkit-backdrop-filter: blur(1px); backdrop-filter: blur(1px); }
          .ai-node { top: 3px; width: 84px; height: 92px; }
          .ai-node img { top: -25px !important; width: 120px !important; height: 120px !important; }
          .ai-connectors { display: none; }
          .ai-workflow { top: 144px; grid-template-columns: 250px; gap: 18px; }
          .ai-workflow::before {
            position: absolute;
            z-index: -1;
            top: -50px;
            bottom: 0;
            left: 50%;
            width: 1px;
            background: #55cdfb;
            content: "";
          }
          .ai-stage { height: 132px; }
          .ai-cta { top: 748px; width: 170px; height: 42px; font-size: 11px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-marquee-track { animation-play-state: paused; }
          .ai-connectors {
            animation: none !important;
            opacity: 1;
            filter: none;
            transform: translateX(-50%);
          }
          .ai-stage {
            animation: none !important;
            opacity: 1;
            filter: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
