"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { servicesShowcase, type ServiceShowcase } from "@/data/servicesShowcase";

function ServiceDetails({ service, mobile = false }: { service: ServiceShowcase; mobile?: boolean }) {
  return (
    <div className={mobile ? "services-mobile-details" : "services-active-details"}>
      <h3>
        {service.titlePrefix} <em>{service.titleItalic}</em>
      </h3>
      <span className="services-divider" aria-hidden="true" />
      <p>{service.description}</p>
      <Link href={service.href}>
        See More <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const activateService = useCallback((index: number) => {
    if (activeRef.current === index) return;
    activeRef.current = index;

    const details = detailsRef.current;
    if (!details) {
      setActiveIndex(index);
      return;
    }

    gsap.killTweensOf(details);
    gsap.to(details, {
      opacity: 0,
      y: -8,
      duration: 0.16,
      ease: "power1.in",
      onComplete: () => setActiveIndex(index),
    });
  }, []);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    gsap.fromTo(details, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const details = detailsRef.current;

    const context = gsap.context(() => {
      groupRefs.current.forEach((group, index) => {
        if (!group) return;
        ScrollTrigger.create({
          trigger: group,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => activateService(index),
          onEnterBack: () => activateService(index),
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      if (details) gsap.killTweensOf(details);
      context.revert();
    };
  }, [activateService]);

  return (
    <section ref={sectionRef} className="services-section" aria-labelledby="services-heading">
      <div className="services-shell">
        <header className="services-header">
          <p>What We Do</p>
          <h2 id="services-heading">
            We Design <em>Brands</em> That <em>Speak</em> to Audiences
          </h2>
        </header>

        <div className="services-layout">
          <aside className="services-info" aria-live="polite">
            <div ref={detailsRef}>
              <ServiceDetails service={servicesShowcase[activeIndex]} />
            </div>
          </aside>

          <div className="services-gallery">
            {servicesShowcase.map((service, serviceIndex) => (
              <div
                className="services-group"
                id={service.id}
                key={service.id}
                ref={(node) => { groupRefs.current[serviceIndex] = node; }}
              >
                <ServiceDetails service={service} mobile />
                <div className="services-projects">
                  {service.projects.map((project) => (
                    <article
                      className={`services-card services-card-${project.column}`}
                      key={project.image}
                      style={{ "--project-fallback": project.fallback } as CSSProperties}
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 760px) 90vw, (max-width: 1100px) 34vw, 360px"
                        onError={(event) => { event.currentTarget.style.opacity = "0"; }}
                      />
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
          z-index: 2;
          margin: -48px 0 16px;
          padding: 98px 0 140px;
          overflow: clip;
          border-radius: 32px;
          background: #080808;
          color: #f7f7f7;
        }

        .services-shell {
          width: min(1240px, calc(100% - 64px));
          margin: 0 auto;
        }

        .services-header > p {
          display: flex;
          width: max-content;
          min-height: 34px;
          margin: 0 0 22px;
          padding: 6px 14px;
          align-items: center;
          border: 1px solid #008f50;
          border-radius: 999px;
          color: #17c676;
          font-size: 14px;
          line-height: 1;
        }

        .services-header h2 {
          max-width: 1080px;
          margin: 0;
          font-size: clamp(42px, 3.55vw, 54px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
        }

        .services-header h2 em,
        .services-active-details h3 em,
        .services-mobile-details h3 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .services-layout {
          display: grid;
          grid-template-columns: minmax(300px, 0.78fr) minmax(660px, 1.7fr);
          gap: clamp(70px, 8vw, 132px);
          margin-top: 84px;
          align-items: start;
        }

        .services-info {
          position: sticky;
          top: 30vh;
          min-height: 230px;
        }

        .services-active-details h3,
        .services-mobile-details h3 {
          margin: 0;
          font-size: clamp(31px, 2.35vw, 38px);
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .services-divider {
          display: block;
          width: 100%;
          height: 1px;
          margin: 17px 0 17px;
          background: #6845b8;
        }

        .services-active-details p,
        .services-mobile-details p {
          max-width: 380px;
          margin: 0;
          color: #cacaca;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.48;
        }

        .services-active-details a,
        .services-mobile-details a {
          display: inline-flex;
          margin-top: 29px;
          align-items: center;
          gap: 8px;
          color: #7553c8;
          font-size: 15px;
          font-weight: 700;
        }

        .services-active-details a span,
        .services-mobile-details a span { transition: transform 180ms ease; }
        .services-active-details a:hover span,
        .services-mobile-details a:hover span { transform: translateX(5px); }
        .services-mobile-details { display: none; }

        .services-gallery { min-width: 0; }

        .services-group {
          position: relative;
          min-height: 620px;
          margin-bottom: 44px;
        }

        .services-group:last-child { margin-bottom: 0; }

        .services-projects {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 26px;
          align-items: start;
        }

        .services-card {
          position: relative;
          width: 100%;
          aspect-ratio: 0.72;
          overflow: hidden;
          border-radius: 17px;
          background: var(--project-fallback);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.28);
        }

        .services-card-right { margin-top: 96px; }

        .services-card img {
          object-fit: cover;
          transition: opacity 160ms ease;
        }

        @media (max-width: 1100px) and (min-width: 761px) {
          .services-shell { width: min(960px, calc(100% - 48px)); }
          .services-layout { grid-template-columns: minmax(245px, 0.72fr) minmax(440px, 1.45fr); gap: 48px; }
          .services-info { top: 27vh; }
          .services-group { min-height: 410px; margin-bottom: 44px; }
          .services-card-right { margin-top: 68px; }
        }

        @media (max-width: 760px) {
          .services-section { margin: -36px 0 12px; padding: 68px 0 82px; border-radius: 24px; }
          .services-shell { width: calc(100% - 32px); }
          .services-header > p { min-height: 31px; margin-bottom: 18px; font-size: 13px; }
          .services-header h2 { font-size: clamp(34px, 10.4vw, 45px); line-height: 1.08; letter-spacing: -1.5px; }
          .services-layout { display: block; margin-top: 70px; }
          .services-info { display: none; }
          .services-mobile-details { display: block; margin-bottom: 34px; }
          .services-mobile-details h3 { font-size: 30px; }
          .services-mobile-details p { font-size: 15px; }
          .services-group { min-height: 0; margin-bottom: 64px; }
          .services-group:last-child { margin-bottom: 0; }
          .services-projects { grid-template-columns: 1fr; gap: 18px; }
          .services-card { aspect-ratio: 0.78; border-radius: 14px; }
          .services-card-right { margin-top: 0; }
        }
      `}</style>
    </section>
  );
}
