"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { servicesShowcase, type ServiceShowcase } from "@/data/servicesShowcase";

function ServiceDetails({ service }: { service: ServiceShowcase }) {
  const items = service.description.split(", ");
  return (
    <div className="services-active-details">
      <h3>
        {service.titlePrefix} <em>{service.titleItalic}</em>
      </h3>
      <span className="services-divider" aria-hidden="true" />
      <p className="services-description">
        {items.map((item, idx) => (
          <span key={item} className="service-tag-wrapper">
            <strong className="service-bold-text">{item}</strong>
            {idx < items.length - 1 && <span className="service-bullet" aria-hidden="true"> · </span>}
          </span>
        ))}
      </p>
      <Link className="services-cta-btn" href={service.href}>
        <span>See More</span>
        <i><ArrowRight /></i>
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
          start: () => (window.innerWidth <= 760 ? "top 38%" : "top 52%"),
          end: () => (window.innerWidth <= 760 ? "bottom 38%" : "bottom 52%"),
          onToggle: (self) => {
            if (self.isActive) activateService(index);
          },
          onEnter: () => activateService(index),
          onEnterBack: () => activateService(index),
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh, { passive: true });

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      if (details) gsap.killTweensOf(details);
      context.revert();
    };
  }, [activateService]);

  return (
    <section id="services" ref={sectionRef} className="services-section" aria-labelledby="services-heading">
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
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 420px"
                        priority={serviceIndex === 0}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="services-card-overlay">
                        <span className="services-card-badge">{project.alt}</span>
                      </div>
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
          overflow: visible;
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
        .services-active-details h3 em {
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

        .services-active-details h3 {
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

        .services-active-details p {
          max-width: 380px;
          margin: 0;
          color: #d1d5db;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.6;
        }

        .service-tag-wrapper {
          display: inline;
        }

        .service-bold-text {
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
        }

        .service-bullet {
          color: #7553c8;
          font-weight: 700;
          padding: 0 3px;
        }

        .services-cta-btn {
          display: inline-flex;
          width: auto;
          min-width: 148px;
          height: 44px;
          margin-top: 29px;
          padding: 0 5px 0 18px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7553c8 0%, #5c3ba6 100%);
          color: #fff !important;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(33, 27, 77, 0.28), 0 2px 10px rgba(117, 83, 200, 0.35);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .services-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(33, 27, 77, 0.35), 0 4px 14px rgba(117, 83, 200, 0.5);
        }

        .services-cta-btn i {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #7553c8;
          transition: transform 180ms ease;
        }

        .services-cta-btn i svg {
          width: 15px;
          height: 15px;
          stroke-width: 1.6;
        }

        .services-cta-btn:hover i {
          transform: translateX(2px);
        }

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
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: var(--project-fallback);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.35);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .services-card:hover {
          transform: translateY(-5px);
          border-color: rgba(117, 83, 200, 0.4);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(117, 83, 200, 0.15);
        }

        .services-card-right { margin-top: 96px; }

        .services-card img {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
        }

        .services-card:hover img {
          transform: scale(1.04);
        }

        .services-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 18px;
          background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.78) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .services-card:hover .services-card-overlay {
          opacity: 1;
        }

        .services-card-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(18, 18, 24, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.2px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
          transform: translateY(6px);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .services-card:hover .services-card-badge {
          transform: translateY(0);
        }

        @media (max-width: 1100px) and (min-width: 761px) {
          .services-shell { width: min(960px, calc(100% - 48px)); }
          .services-layout { grid-template-columns: minmax(245px, 0.72fr) minmax(440px, 1.45fr); gap: 48px; }
          .services-info { top: 27vh; }
          .services-group { min-height: 410px; margin-bottom: 44px; }
          .services-card-right { margin-top: 68px; }
        }

        @media (max-width: 760px) {
          .services-section {
            margin: -28px 0 12px;
            padding: 44px 0 64px;
            border-radius: 0 0 24px 24px;
          }

          .services-shell { width: calc(100% - 24px); }

          .services-header { margin-bottom: 12px; }

          .services-header h2 {
            font-size: clamp(26px, 8vw, 34px);
            line-height: 1.12;
            letter-spacing: -1px;
          }

          .services-layout {
            display: flex;
            flex-direction: column;
            margin-top: 14px;
          }

          .services-info {
            display: block;
            position: sticky;
            top: 10px;
            z-index: 30;
            min-height: auto;
            padding: 12px 14px;
            margin-bottom: 14px;
            border-radius: 16px;
            background: rgba(10, 10, 14, 0.95);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.14);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(117, 83, 200, 0.2);
          }

          .services-active-details h3 {
            font-size: 19px;
            letter-spacing: -0.5px;
          }

          .services-divider {
            margin: 6px 0;
            background: rgba(104, 69, 184, 0.6);
          }

          .services-active-details p {
            font-size: 12px;
            line-height: 1.4;
          }

          .service-bold-text {
            font-size: 12px;
          }

          .services-cta-btn {
            margin-top: 10px;
            min-width: 124px;
            height: 34px;
            font-size: 11px;
            padding: 0 4px 0 12px;
            gap: 6px;
          }

          .services-cta-btn i {
            width: 26px;
            height: 26px;
          }

          .services-cta-btn i svg {
            width: 12px;
            height: 12px;
          }

          .services-gallery {
            width: 100%;
            min-width: 0;
            margin-top: 0;
            display: flex;
            flex-direction: column;
            gap: 28px;
          }

          .services-group {
            width: 100%;
            min-height: auto;
            margin-bottom: 0;
            padding-bottom: 6px;
          }

          .services-projects {
            display: flex;
            flex-direction: column;
            gap: 18px;
            width: 100%;
          }

          .services-card {
            position: relative;
            width: 100%;
            max-width: 100%;
            height: auto;
            min-height: 0;
            aspect-ratio: 4 / 5;
            border-radius: 18px;
            overflow: hidden;
            display: block;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
          }

          .services-card-right {
            margin-top: 0;
          }

          .services-card-overlay {
            opacity: 1;
            padding: 14px;
            background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.8) 100%);
          }

          .services-card-badge {
            font-size: 11px;
            padding: 4px 10px;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
