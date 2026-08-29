"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { caseStudies } from "@/data/caseStudies";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const CARD_GAP = 80;
const STACK_HEADER = 56;

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M14 6l6 6-6 6" /></svg>;
}

export default function IndustryWins() {
  const rootRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stack = stackRef.current;
    if (!root || !stack) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 901px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".iw-card", stack);
        if (cards.length < 2) return;
        const expandedHeight = () => cards[0].offsetHeight;

        cards.forEach((card, index) => {
          gsap.set(card, {
            y: () => index * (expandedHeight() + CARD_GAP),
            zIndex: index + 1,
          });
        });

        const timeline = gsap.timeline({
          defaults: { duration: 1, ease: "none" },
          scrollTrigger: {
            trigger: stack,
            start: "top 14%",
            end: () => `+=${Math.max(window.innerHeight * 3.75, 3000)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        for (let activeIndex = 1; activeIndex < cards.length; activeIndex += 1) {
          const step = activeIndex - 1;
          const isLastCard = activeIndex === cards.length - 1;

          if (isLastCard) {
            cards.forEach((card) => {
              timeline.to(card, { y: 0 }, step);
            });
            continue;
          }

          cards.slice(activeIndex).forEach((card, offset) => {
            timeline.to(
              card,
              {
                y: () => {
                  const activeY = activeIndex * STACK_HEADER;
                  if (offset === 0) return activeY;

                  return (
                    activeY +
                    expandedHeight() +
                    CARD_GAP +
                    (offset - 1) * (expandedHeight() + CARD_GAP)
                  );
                },
              },
              step,
            );
          });
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section className="iw-section" ref={rootRef} aria-labelledby="industry-wins-heading">
      <div className="iw-intro">
        <p>Industry Wins</p>
        <h2 id="industry-wins-heading">Proven Success in<br /><em>Every Industry</em></h2>
      </div>

      <div className="iw-stack" ref={stackRef}>
        {caseStudies.map((study) => {
          const initials = study.clientName.split(" ").map((part) => part[0]).join("").slice(0, 2);
          return (
            <article className="iw-card" style={{ backgroundColor: study.backgroundColor }} key={study.category}>
              <div className="iw-copy">
                <p className="iw-category">{study.category}</p>
                <h3>{study.title}</h3>
                <p className="iw-description">{study.description}</p>
                <div className="iw-metrics">
                  <div><span>{study.metricOneLabel}</span><strong>{study.metricOneValue}</strong></div>
                  <div><span>{study.metricTwoLabel}</span><strong>{study.metricTwoValue}</strong></div>
                </div>
                <div className="iw-client">
                  <span className="iw-avatar" aria-hidden="true">{initials}</span>
                  <span className="iw-client-copy"><strong>{study.clientName}</strong><small>{study.clientRole}</small></span>
                  <ArrowIcon />
                </div>
              </div>
              <div className="iw-project-image">
                <Image src={study.projectImage} alt={`${study.title} project`} fill sizes="(max-width: 900px) 100vw, 46vw" />
              </div>
            </article>
          );
        })}
      </div>

      <Link className="iw-all-projects" href="/projects">
        <span>See All Projects</span>
        <ArrowIcon />
      </Link>

      <style>{`
        .iw-section {
          position: relative;
          padding: 96px 24px 60px;
          overflow: clip;
          background: #fbfbfb;
          color: #0b0b0b;
        }

        .iw-intro {
          width: min(1254px, 100%);
          margin: 0 auto 62px;
        }

        .iw-intro > p {
          display: flex;
          width: max-content;
          height: 34px;
          margin: 0 0 20px;
          padding: 0 13px;
          align-items: center;
          border: 1px solid #00bd68;
          border-radius: 999px;
          color: #008d4e;
          font-size: 15px;
          line-height: 1;
        }

        .iw-intro h2 {
          margin: 0;
          font-size: 48px;
          font-weight: 500;
          line-height: 1.22;
          letter-spacing: -1.9px;
        }

        .iw-intro h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .iw-stack {
          position: relative;
          width: min(1254px, 100%);
          height: 432px;
          margin: 0 auto;
        }

        .iw-card {
          position: absolute;
          inset: 0 auto auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1.06fr) minmax(0, 1fr);
          width: 100%;
          height: 420px;
          padding: 20px;
          gap: 40px;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04);
          will-change: transform;
        }

        .iw-copy {
          display: flex;
          min-width: 0;
          padding: 1px 20px 9px;
          flex-direction: column;
        }

        .iw-category {
          margin: 0 0 17px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-style: italic;
          font-weight: 700;
          line-height: 1;
        }

        .iw-copy h3 {
          margin: 0;
          font-size: 32px;
          font-weight: 500;
          line-height: 1.18;
          letter-spacing: -1px;
        }

        .iw-description {
          max-width: 570px;
          margin: 17px 0 0;
          font-size: 16px;
          line-height: 1.5;
          letter-spacing: -0.15px;
        }

        .iw-metrics {
          display: flex;
          margin-top: auto;
          margin-bottom: 25px;
          gap: 48px;
        }

        .iw-metrics > div { display: grid; gap: 8px; min-width: 200px; }
        .iw-metrics span { font-size: 16px; line-height: 1; }
        .iw-metrics strong { font-size: 24px; font-weight: 500; line-height: 1.05; letter-spacing: -0.5px; }

        .iw-client {
          display: grid;
          grid-template-columns: 48px 1fr 24px;
          height: 64px;
          padding: 7px 16px 7px 12px;
          align-items: center;
          border-radius: 8px;
          background: #fff;
        }

        .iw-avatar {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 50%;
          background: #202124;
          color: white;
          font-size: 12px;
          font-weight: 700;
        }

        .iw-client-copy { display: grid; gap: 4px; }
        .iw-client-copy strong { font-size: 15px; line-height: 1; }
        .iw-client-copy small { font-size: 14px; line-height: 1; }

        .iw-client svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: #7130ff;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.7;
        }

        .iw-project-image {
          position: relative;
          min-width: 0;
          height: 380px;
          overflow: hidden;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.28);
        }

        .iw-project-image img { object-fit: cover; }

        .iw-all-projects {
          display: flex;
          width: 207px;
          height: 56px;
          margin: 44px auto 0;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.58);
          border-radius: 7px;
          background: linear-gradient(110deg, #7130ef 0%, #8038f7 72%, #7431de 100%);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
        }

        .iw-all-projects svg {
          width: 24px;
          height: 24px;
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.7;
        }

        @media (max-width: 1100px) and (min-width: 901px) {
          .iw-card { gap: 20px; }
          .iw-copy { padding-right: 4px; padding-left: 4px; }
          .iw-copy h3 { font-size: 27px; }
          .iw-metrics > div { min-width: 150px; }
        }

        @media (max-width: 900px) {
          .iw-section { padding: 72px 16px 84px; overflow: hidden; }
          .iw-intro { margin-bottom: 42px; }
          .iw-intro h2 { font-size: clamp(38px, 8vw, 48px); }
          .iw-stack { display: grid; height: auto; gap: 16px; }
          .iw-card {
            position: relative;
            inset: auto;
            grid-template-columns: 1fr;
            height: auto;
            min-height: 0;
            padding: 16px;
            gap: 24px;
            transform: none !important;
          }
          .iw-copy { min-height: 390px; padding: 4px; }
          .iw-project-image { height: clamp(260px, 62vw, 430px); }
        }

        @media (max-width: 560px) {
          .iw-intro h2 { font-size: 38px; }
          .iw-copy h3 { font-size: 27px; }
          .iw-description { font-size: 15px; }
          .iw-metrics { gap: 20px; }
          .iw-metrics > div { min-width: 0; flex: 1; }
          .iw-metrics strong { font-size: 20px; }
          .iw-copy { min-height: 405px; }
        }
      `}</style>
    </section>
  );
}
