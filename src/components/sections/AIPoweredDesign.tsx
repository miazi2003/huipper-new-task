"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2, Compass, PenTool, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  aiTools,
  bottomMarqueeTools,
  topMarqueeTools,
  workflowStages,
  type AITool,
} from "@/data/aiWorkflow";

const toolMap = new Map(aiTools.map((tool) => [tool.id, tool]));
const stageIcons = [Compass, PenTool, Code2, TrendingUp];

function BrandToolGlyph({ id }: { id: string }) {
  if (id === "miro") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 2H22l-6.3 20h-4.2l2.05-6.5L9.35 22H5.1l4.25-13.4L5.2 15H1L7.3 2h4.2L9.4 8.6 13.65 2h4.15l-2.1 6.65L17.8 2Z" /></svg>;
  }

  if (id === "figma") {
    return <svg className="ai-brand-glyph ai-figma-glyph" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f24e1e" d="M7.5 2h4.5v6H7.5a3 3 0 0 1 0-6Z" /><path fill="#ff7262" d="M12 2h4.5a3 3 0 0 1 0 6H12V2Z" /><path fill="#a259ff" d="M7.5 8H12v6H7.5a3 3 0 0 1 0-6Z" /><path fill="#1abcfe" d="M15 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /><path fill="#0acf83" d="M7.5 14H12v3a3 3 0 1 1-4.5-3Z" /></svg>;
  }

  if (id === "cursor") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2.5 20.8 11 13 13.1 10.8 21 3 2.5Zm4.35 5.15 3.1 7.35.9-3.35 3.4-.9-7.4-3.1Z" fillRule="evenodd" /></svg>;
  }

  if (id === "framer") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14v6H12l7 6h-7v6l-7-6V3Zm7 6H5l7 6V9Z" fillRule="evenodd" /></svg>;
  }

  if (id === "webflow") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 8.25h4.15l-1.7 7.5H.3L2 8.25Zm5.3 0h4.1l-1.7 7.5H5.6l1.7-7.5Zm7.1-3h4.15l-5.3 13.5H9.1l5.3-13.5Zm5.05 0H23.7l-5.3 13.5h-4.25l5.3-13.5Z" /></svg>;
  }

  if (id === "bolt") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 1.75 4.7 13.1h6.05l-1 9.15 9.55-12.8h-6.4l.3-7.7Z" /></svg>;
  }

  if (id === "relume") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h3v3h-3v-3Zm4 0h3v7h-3v-7Zm-4 4h3v3h-3v-3Z" /></svg>;
  }

  if (id === "v0") {
    return <svg className="ai-brand-glyph ai-v0-glyph" viewBox="0 0 30 18" aria-hidden="true"><path d="M1 4h4l3.2 9L11.5 4h4l-5.3 13H6.3L1 4Zm21.5-.4c4.2 0 6.5 2.7 6.5 6.9s-2.3 6.9-6.5 6.9S16 14.7 16 10.5s2.3-6.9 6.5-6.9Zm0 3.2c-1.7 0-2.5 1.2-2.5 3.7s.8 3.7 2.5 3.7 2.5-1.2 2.5-3.7-.8-3.7-2.5-3.7Z" /></svg>;
  }

  if (id === "zapier") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.1 2h1.8v7.1l5-5 1.3 1.3-5 5H22v1.8h-7.8l5.4 5.4-1.3 1.3-5.4-5.4V22h-1.8v-8.5l-5.4 5.4-1.3-1.3 5.4-5.4H2v-1.8h7.8l-5-5L6.1 4l5 5V2Z" /></svg>;
  }

  if (id === "claude") {
    return <svg className="ai-brand-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.35 6.25L17 3l-1.55 6.2L21 6l-4.45 4.45L23 10l-6.1 2 6.1 2-6.45-.45L21 18l-5.55-3.2L17 21l-3.65-5.25L12 22l-1.35-6.25L7 21l1.55-6.2L3 18l4.45-4.45L1 14l6.1-2L1 10l6.45.45L3 6l5.55 3.2L7 3l3.65 5.25L12 2Z" /></svg>;
  }

  if (id === "openai") {
    return <svg className="ai-brand-glyph ai-openai-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.15a4.25 4.25 0 0 1 7.25 3.02 4.26 4.26 0 0 1 1.95 6.92 4.25 4.25 0 0 1-5.29 6.6A4.26 4.26 0 0 1 9 20.05a4.25 4.25 0 0 1-6.25-3.79A4.26 4.26 0 0 1 2.8 9.34 4.25 4.25 0 0 1 8.09 2.7 4.2 4.2 0 0 1 12 3.15Zm0 3.05-4.9 2.83v5.66L12 17.52l4.9-2.83V9.03L12 6.2Zm0 3.1 2.22 1.28v2.56L12 14.42l-2.22-1.28v-2.56L12 9.3Z" fillRule="evenodd" /></svg>;
  }

  return null;
}

function ToolIcon({ tool, small = false }: { tool: AITool; small?: boolean }) {
  return (
    <span className={small ? "ai-tool-icon ai-tool-icon-small" : "ai-tool-icon"} title={tool.name}>
      {tool.icon ? (
        <Image src={tool.icon} alt={tool.name} width={small ? 30 : 42} height={small ? 30 : 42} />
      ) : ["miro", "figma", "cursor", "framer", "webflow", "bolt", "relume", "v0", "zapier", "claude", "openai"].includes(tool.id) ? (
        <BrandToolGlyph id={tool.id} />
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
        <p>Huipper AI Studio</p>
        <h2 id="ai-powered-heading">Human-Led Design, <em>Accelerated By AI</em></h2>
        <span>Huipper combines product thinking, craft, and intelligent workflows to move from<br />complex ideas to scalable digital experiences with greater speed and clarity.</span>
      </div>

      <div className="ai-ecosystem">
        <div className="ai-marquees" aria-label="AI and design tool ecosystem">
          <MarqueeRow toolIds={topMarqueeTools} direction="left" />
          <MarqueeRow toolIds={bottomMarqueeTools} direction="right" />
        </div>

        <div className="ai-node" aria-label="AI orchestration node">
          <span className="ai-node-mark" aria-hidden="true" />
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
          {workflowStages.map((stage, stageIndex) => {
            const StageIcon = stageIcons[stageIndex];

            return (
            <article className="ai-stage" key={stage.title}>
              <div className="ai-stage-heading">
                <div className="ai-stage-title">
                  <span className="ai-stage-icon" aria-hidden="true"><StageIcon /></span>
                  <h3>{stage.title}</h3>
                </div>
                <span aria-hidden="true"><i /><i /><i /></span>
              </div>
              <p className="ai-stage-description">{stage.description}</p>
              <div className="ai-stage-visual">
                <div className="ai-stage-tools">
                  {stage.toolIds.map((id) => {
                    const tool = toolMap.get(id);
                    return tool ? <ToolIcon tool={tool} small key={id} /> : null;
                  })}
                </div>
                <div className="ai-outputs">
                  {stage.outputs.map((output) => <span key={output}>{output}</span>)}
                </div>
              </div>
            </article>
            );
          })}
        </div>

        <Link className="ai-cta" href="/services">
          <span>Explore AI Capabilities</span>
          <i><ArrowIcon /></i>
        </Link>
      </div>

      <style>{`
        .ai-section {
          position: relative;
          height: 1320px;
          margin: 16px 0;
          padding-top: 62px;
          overflow: hidden;
          border-radius: 32px 32px 0 0 ;
          background:
            radial-gradient(circle at 50% 45%, rgba(117,83,200,.15), transparent 35%),
            radial-gradient(circle at 18% 82%, rgba(59,44,120,.18), transparent 30%),
            linear-gradient(180deg, #070610 0%, #0a0818 48%, #05040c 100%);
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
          border: 1px solid #896add;
          border-radius: 999px;
          color: #b7a6e5;
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
          color: #bdb5cc;
          font-size: 18px;
          line-height: 1.5;
        }

        .ai-ecosystem { position: relative; height: 1010px; margin-top: 98px; }

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
          background: linear-gradient(90deg, rgba(7,6,16,.98), rgba(7,6,16,0));
        }

        .ai-marquees::after {
          right: 0;
          background: linear-gradient(270deg, rgba(7,6,16,.98), rgba(7,6,16,0));
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
          border: 1px solid rgba(183,166,229,.15);
          border-radius: 20px;
          background: linear-gradient(145deg,rgba(48,38,87,.72),rgba(20,16,39,.8));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
        }

        .ai-tool-icon {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border-radius: 13px;
          background: #131025;
          box-shadow: 0 5px 16px rgba(0,0,0,.32),inset 0 0 0 1px rgba(183,166,229,.08);
        }

        .ai-tool-icon i {
          font-size: 16px;
          font-style: normal;
          font-weight: 800;
          line-height: 1;
        }

        .ai-brand-glyph { width: 25px; height: 25px; fill: currentColor; color: #f1eef8; }
        .ai-tool-icon[title="Zapier"] .ai-brand-glyph { color: #ff5a00; }
        .ai-tool-icon[title="Claude"] .ai-brand-glyph { color: #d97757; }
        .ai-tool-icon[title="OpenAI"] .ai-brand-glyph { color: #e8ecea; }
        .ai-tool-icon[title="Webflow"] .ai-brand-glyph { color: #146ef5; }
        .ai-tool-icon[title="Bolt"] .ai-brand-glyph { color: #46e78d; }
        .ai-tool-icon[title="Relume"] .ai-brand-glyph { color: #8f63ff; }
        .ai-tool-icon[title="v0"] .ai-brand-glyph { width: 30px; color: #f3f3f3; }
        .ai-tool-icon[title="Figma"] .ai-brand-glyph { width: 27px; height: 27px; }
        .ai-tool-icon[title="Cursor"] .ai-brand-glyph { color: #eeeeee; }
        .ai-tool-icon[title="Framer"] .ai-brand-glyph { color: #f3f3f3; }
        .ai-tool-icon[title="Miro"] .ai-brand-glyph { color: #ffd633; }
        .ai-tool-icon-small .ai-brand-glyph { width: 27px; height: 27px; }
        .ai-tool-icon-small .ai-v0-glyph { width: 31px; }

        .ai-tool-icon-small { width: 56px; height: 56px; border-radius: 13px; }
        .ai-tool-icon-small i { font-size: 14px; }

        .ai-node {
          position: absolute;
          z-index: 4;
          top: -43px;
          left: 50%;
          width: 430px;
          height: 430px;
          pointer-events: none;
          transform: translateX(-50%);
          animation: ai-node-breathe 3.6s ease-in-out infinite;
        }

        .ai-node-mark {
          position: absolute;
          top: 12px;
          left: 50%;
          display: block;
          width: 340px;
          height: 340px;
          background-image: url("/images/brand/huipper-mark-clean.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
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
          filter: blur(4px) hue-rotate(68deg) saturate(.86);
        }

        .ai-connectors img { object-fit: fill; }

        .ai-workflow {
          position: absolute;
          z-index: 3;
          top: 390px;
          left: 50%;
          display: grid;
          grid-template-columns: repeat(4, 295px);
          gap: 24px;
          transform: translateX(-50%);
        }

        .ai-stage {
          position: relative;
          height: 350px;
          padding: 24px 20px 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.055);
          border-radius: 18px;
          background: linear-gradient(145deg,#1d1d1e 0%,#171718 72%,#141415 100%);
          box-shadow:
            0 18px 46px rgba(0,0,0,.38),
            inset 0 1px 0 rgba(255,255,255,.045),
            inset 0 0 0 8px rgba(255,255,255,.012);
          opacity: 0;
          filter: blur(8px);
          transform: translate3d(0, 82px, 0);
          will-change: transform, opacity, filter;
        }

        .ai-stage::before {
          position: absolute;
          top: 0;
          right: 20px;
          left: 20px;
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(137,106,221,.38),transparent);
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

        .ai-stage-heading { display: flex; align-items: center; justify-content: space-between; }
        .ai-stage-title { display: flex; min-width: 0; align-items: center; gap: 11px; }
        .ai-stage-icon {
          display: grid;
          width: 37px;
          height: 37px;
          flex: none;
          place-items: center;
          border: 1px solid rgba(183,166,229,.22);
          border-radius: 10px;
          background: linear-gradient(145deg,rgba(137,106,221,.25),rgba(75,49,132,.16));
          color: #c7b4fa;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08),0 7px 18px rgba(0,0,0,.2);
        }
        .ai-stage-icon svg { width: 19px; height: 19px; stroke-width: 1.8; }
        .ai-stage h3 { margin: 0; font-size: 25px; font-weight: 500; line-height: 1; letter-spacing: -.75px; }
        .ai-stage-heading > span { display: flex; gap: 5px; }
        .ai-stage-heading > span i { display: block; width: 7px; height: 7px; background: #535355; transform: rotate(45deg); }
        .ai-stage-heading > span i:first-child { background: #896add; }
        .ai-stage-description { min-height: 61px; margin: 15px 0 0; color: #d0cdd5; font-size: 14px; line-height: 1.4; }
        .ai-stage-visual { position: absolute; right: 20px; bottom: 20px; left: 20px; height: 190px; padding: 22px 18px; overflow: hidden; border: 1px solid rgba(255,255,255,.055); border-radius: 11px; background: linear-gradient(145deg,#303031,#29292a); box-shadow: inset 0 1px 0 rgba(255,255,255,.035); }
        .ai-stage-visual::after { position: absolute; right: -34px; bottom: -62px; width: 150px; height: 150px; border-radius: 50%; background: rgba(117,83,200,.12); filter: blur(24px); content: ""; }
        .ai-stage-tools { position: relative; z-index: 1; display: flex; min-height: 60px; align-items: center; }
        .ai-stage-tools .ai-tool-icon { margin-left: -9px; border: 2px solid #303031; box-shadow: 0 8px 18px rgba(0,0,0,.24); }
        .ai-stage-tools .ai-tool-icon:first-child { margin-left: 0; }
        .ai-outputs { position: relative; z-index: 1; display: flex; margin-top: 20px; flex-wrap: wrap; gap: 7px; }

        .ai-outputs span {
          padding: 6px 8px;
          border-radius: 5px;
          border: 1px solid rgba(183,166,229,.16);
          background: rgba(117,83,200,.16);
          color: #e3dcf4;
          font-size: 10px;
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
        }

        .ai-cta {
          position: absolute;
          z-index: 4;
          top: 790px;
          left: 50%;
          display: flex;
          width: 252px;
          height: 48px;
          padding: 0 6px 0 22px;
          align-items: center;
          justify-content: space-between;
          border-radius: 999px;
          background: linear-gradient(135deg, #7553c8 0%, #5c3ba6 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          transform: translateX(-50%);
          box-shadow: 0 8px 24px rgba(33, 27, 77, 0.28), 0 2px 10px rgba(117, 83, 200, 0.35);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .ai-cta:hover {
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 0 10px 28px rgba(33, 27, 77, 0.35), 0 4px 14px rgba(117, 83, 200, 0.5);
        }

        .ai-cta i {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #7553c8;
          transition: transform 180ms ease;
        }

        .ai-cta i svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: #7553c8;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ai-cta:hover i {
          transform: translateX(2px);
        }

        @keyframes ai-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-50% - 12px), 0, 0); }
        }

        @keyframes ai-marquee-right {
          from { transform: translate3d(calc(-50% - 12px), 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @keyframes ai-node-breathe {
          0%,100% { filter: drop-shadow(0 0 10px rgba(117,83,200,.2)); }
          50% { filter: drop-shadow(0 0 22px rgba(137,106,221,.4)); }
        }

        @keyframes ai-wire-arrive {
          from { opacity: 0; filter: blur(4px) hue-rotate(68deg) saturate(.86); transform: translate3d(-50%, -12px, 0); }
          to { opacity: 1; filter: blur(0) hue-rotate(68deg) saturate(.86); transform: translate3d(-50%, 0, 0); }
        }

        @keyframes ai-card-rise {
          0% { opacity: 0; filter: blur(8px); transform: translate3d(0, 82px, 0); }
          72% { opacity: 1; filter: blur(0); transform: translate3d(0, -4px, 0); }
          100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 1199px) and (min-width: 761px) {
          .ai-connectors { width: 702px; height: 120px; }
          .ai-workflow { grid-template-columns: repeat(4, 220px); gap: 14px; }
          .ai-stage { height: 310px; padding: 19px; }
          .ai-stage h3 { font-size: 19px; }
          .ai-stage-icon { width: 32px; height: 32px; border-radius: 9px; }
          .ai-stage-icon svg { width: 17px; height: 17px; }
          .ai-stage-description { font-size: 11px; }
          .ai-stage-visual { right: 16px; bottom: 16px; left: 16px; height: 174px; padding: 17px 14px; }
          .ai-outputs span { font-size: 9px; }
        }

        @media (max-width: 760px) {
          .ai-section { height: auto; min-height: 1540px; margin: 12px; padding: 45px 0 60px; }
          .ai-header { padding: 0 18px; }
          .ai-header h2 { font-size: 28px; }
          .ai-header > span br { display: none; }
          .ai-ecosystem { height: 1320px; margin-top: 36px; }
          .ai-tool-tile { width: 38px; height: 38px; border-radius: 10px; }
          .ai-marquees {
            left: 50%;
            width: 100%;
            gap: 8px;
            mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          }
          .ai-marquees::before, .ai-marquees::after { width: 48px; -webkit-backdrop-filter: blur(1px); backdrop-filter: blur(1px); }
          .ai-node { top: 10px; width: 84px; height: 92px; }
          .ai-node-mark { top: 0; width: 84px; height: 84px; }
          .ai-connectors { display: none; }
          .ai-workflow { top: 144px; grid-template-columns: 280px; gap: 18px; }
          .ai-workflow::before {
            position: absolute;
            z-index: -1;
            top: -50px;
            bottom: 0;
            left: 50%;
            width: 1px;
            background: linear-gradient(#896add,#7553c8);
            content: "";
          }
          .ai-stage { height: 250px; padding: 18px; }
          .ai-stage h3 { font-size: 19px; }
          .ai-stage-icon { width: 32px; height: 32px; }
          .ai-stage-description { min-height: 0; margin-top: 10px; font-size: 11px; }
          .ai-stage-visual { right: 15px; bottom: 15px; left: 15px; height: 132px; padding: 12px; }
          .ai-stage-tools { min-height: 42px; }
          .ai-stage-tools .ai-tool-icon { width: 42px; height: 42px; }
          .ai-outputs { margin-top: 10px; }
          .ai-outputs span { padding: 5px 6px; }
          .ai-cta { top: 1230px; width: 190px; height: 44px; font-size: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-marquee-track { animation-play-state: paused; }
          .ai-connectors {
            animation: none !important;
            opacity: 1;
            filter: hue-rotate(68deg) saturate(.86);
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
