"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import { adaptProjectsToCaseStudies } from "@/lib/adapters/project-presentation";
import { listPublicProjects } from "@/lib/api/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const CARD_GAP = 80;
const STACK_HEADER = 56;

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M14 6l6 6-6 6" /></svg>;
}

export default function IndustryWins() {
  const rootRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [studies, setStudies] = useState(caseStudies);

  useEffect(() => {
    void listPublicProjects({ limit: 10 })
      .then((data) => {
        if (data?.projects && data.projects.length > 0) {
          setStudies(adaptProjectsToCaseStudies(data.projects, caseStudies));
        }
      })
      .catch(() => undefined);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stack = stackRef.current;
    if (!root || !stack) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 901px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".iw-card", stack);
        if (cards.length < 2) return;
        const expandedHeight = () => cards[0]?.offsetHeight || 420;

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
            refreshPriority: 1,
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
  }, [studies]);

  return (
    <section id="projects" className="iw-section" ref={rootRef} aria-labelledby="industry-wins-heading">
      <div className="iw-intro">
        <p>Huipper Impact</p>
        <h2 id="industry-wins-heading">Digital Products Built to Win<br /><em>Across Every Industry</em></h2>
      </div>

      <div className="iw-stack" ref={stackRef}>
        {studies.map((study, index) => {
          const initials = study.clientName.split(" ").map((part) => part[0]).join("").slice(0, 2);
          return (
            <article className="iw-card" style={{ backgroundColor: study.backgroundColor }} key={`${study.category}-${study.title}-${index}`}>
              <div className="iw-copy">
                <p className="iw-category">{study.category}</p>
                <h3>{study.title}</h3>
                <p className="iw-description">{study.description}</p>
                <div className="iw-metrics">
                  <div><span>{study.metricOneLabel}</span><strong>{study.metricOneValue}</strong></div>
                  <div><span>{study.metricTwoLabel}</span><strong>{study.metricTwoValue}</strong></div>
                </div>
                {study.slug ? (
                  <Link
                    href={`/projects/${study.slug}`}
                    className="iw-client"
                    aria-label={`View ${study.title} project details`}
                  >
                    <span className="iw-avatar" aria-hidden="true">{initials}</span>
                    <span className="iw-client-copy"><strong>{study.clientName}</strong><small>{study.clientRole}</small></span>
                    <ArrowIcon />
                  </Link>
                ) : (
                  <div className="iw-client">
                    <span className="iw-avatar" aria-hidden="true">{initials}</span>
                    <span className="iw-client-copy"><strong>{study.clientName}</strong><small>{study.clientRole}</small></span>
                    <ArrowIcon />
                  </div>
                )}
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
        <i><ArrowIcon /></i>
      </Link>

      <style>{`
        .iw-section {
          position: relative;
          padding: 96px 24px 60px;
          background: #f8f6fc;
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
          border: 1px solid #896add;
          border-radius: 999px;
          color: #6845b8;
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
          isolation: isolate;
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
          border: 1px solid rgba(117, 83, 200, .11);
          box-shadow: 0 -1px 0 rgba(59, 44, 120, .05);
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
          text-decoration: none;
          color: inherit;
        }

        .iw-avatar {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(145deg, #7553c8, #211b4d);
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
          stroke: #7553c8;
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
          width: 210px;
          height: 48px;
          margin: 44px auto 0;
          padding: 0 6px 0 22px;
          align-items: center;
          justify-content: space-between;
          border-radius: 999px;
          background: linear-gradient(135deg, #7553c8 0%, #5c3ba6 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          box-shadow: 0 8px 24px rgba(33, 27, 77, 0.28), 0 2px 10px rgba(117, 83, 200, 0.35);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .iw-all-projects:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(33, 27, 77, 0.35), 0 4px 14px rgba(117, 83, 200, 0.5);
        }

        .iw-all-projects i {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #7553c8;
          transition: transform 180ms ease;
        }

        .iw-all-projects i svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: #7553c8;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.8;
        }

        .iw-all-projects:hover i {
          transform: translateX(2px);
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
