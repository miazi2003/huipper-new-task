"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const videoSrc = "/videos/why-us/showcase.mp4";

function WatchVideoControl({ onClick }: { onClick: () => void }) {
  return (
    <button className="why-us-watch" type="button" onClick={onClick} aria-label="Play or pause showcase video">
      <svg className="why-us-watch-ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="why-us-watch-path"
            d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
          />
        </defs>
        <text>
          <textPath href="#why-us-watch-path" startOffset="0%">
            WATCH VIDEO · WATCH VIDEO ·
          </textPath>
        </text>
      </svg>
      <span className="why-us-play" aria-hidden="true">
        <svg viewBox="0 0 28 28">
          <path d="M8.2 6.9c-.8-1.5.8-3.2 2.3-2.4l10.8 6.2c2.5 1.4 2.5 5 0 6.4l-10.8 6.3c-1.5.8-3.1-.9-2.3-2.4 2.3-4.4 2.3-9.7 0-14.1Z" />
        </svg>
      </span>
    </button>
  );
}

export default function WhyUsVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const showcase = showcaseRef.current;
    if (!section || !showcase) return;

    const initialWidth = () => {
      if (window.innerWidth <= 767) return "93vw";
      if (window.innerWidth <= 1199) return "86vw";
      return "72vw";
    };

    const scrollDistance = () => {
      if (window.innerWidth <= 767) return 420;
      if (window.innerWidth <= 1199) return 560;
      return 760;
    };

    const context = gsap.context(() => {
      gsap.fromTo(
        showcase,
        { width: initialWidth },
        {
          width: "100vw",
          ease: "none",
          scrollTrigger: {
            trigger: showcase,
            start: "top 78%",
            end: () => `+=${scrollDistance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    const video = videoRef.current;
    const refresh = () => ScrollTrigger.refresh();
    video?.addEventListener("loadedmetadata", refresh);

    return () => {
      video?.removeEventListener("loadedmetadata", refresh);
      context.revert();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <section ref={sectionRef} className="why-us-section" aria-labelledby="why-us-heading">
      <div className="why-us-header">
        <p className="why-us-kicker">What Sets Us Apart</p>
        <h2 id="why-us-heading">
          Why Us? Because Your <em>Growth Is Our Mission</em>
        </h2>
        <p className="why-us-copy">
          See the difference thoughtful design makes. Our works highlight the dedication
          <br />
          we bring to every client partnership.
        </p>
      </div>

      <div ref={showcaseRef} className="why-us-showcase">
        <div className="why-us-fallback" aria-hidden="true">
          <i />
        </div>
        <video ref={videoRef} autoPlay muted loop playsInline preload="metadata">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <WatchVideoControl onClick={togglePlayback} />
      </div>

      <style>{`
        .why-us-section {
          position: relative;
          width: 100%;
          padding: 101px 0 0;
          overflow: hidden;
          background: #fff;
          color: #050505;
        }

        .why-us-header {
          position: relative;
          z-index: 2;
          padding: 0 24px;
          text-align: center;
        }

        .why-us-kicker {
          display: flex;
          width: max-content;
          min-height: 35px;
          margin: 0 auto 19px;
          padding: 6px 14px;
          align-items: center;
          border: 1px solid #00bd68;
          border-radius: 999px;
          color: #009d59;
          font-size: 15px;
          font-weight: 500;
          line-height: 1;
        }

        .why-us-header h2 {
          margin: 0;
          font-size: clamp(40px, 3.2vw, 50px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -1.9px;
        }

        .why-us-header h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
          letter-spacing: -2.2px;
        }

        .why-us-copy {
          margin: 20px auto 0;
          color: #363636;
          font-size: 18px;
          line-height: 1.5;
          letter-spacing: -0.15px;
        }

        .why-us-showcase {
          position: relative;
          width: 72vw;
          aspect-ratio: 16 / 9;
          margin: 111px auto 0;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
          background: #251d20;
          will-change: width;
        }

        .why-us-showcase video {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .why-us-fallback {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #251d20;
        }

        .why-us-fallback::before,
        .why-us-fallback::after,
        .why-us-fallback i {
          position: absolute;
          top: 12%;
          left: 50%;
          border: 2px solid rgba(255, 255, 255, 0.86);
          border-radius: 50%;
          content: "";
          transform: translateX(-50%);
        }

        .why-us-fallback::before { width: 58%; aspect-ratio: 1; }
        .why-us-fallback::after { top: 22%; width: 44%; aspect-ratio: 1; }
        .why-us-fallback i { top: 32%; width: 30%; aspect-ratio: 1; }

        .why-us-watch {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.94);
          color: #171717;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.13);
          cursor: pointer;
          transform: translate(-50%, -50%);
        }

        .why-us-watch-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          animation: why-us-ring-spin 11s linear infinite;
        }

        .why-us-watch-ring text {
          fill: currentColor;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 2.15px;
        }

        .why-us-play {
          position: absolute;
          top: 50%;
          left: 50%;
          display: grid;
          width: 54px;
          height: 54px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 16px rgba(85, 19, 190, 0.22);
          transform: translate(-50%, -50%);
          transition: transform 180ms ease, filter 180ms ease;
        }

        .why-us-play svg { width: 30px; height: 30px; }
        .why-us-play path { fill: #721cff; }

        .why-us-watch:hover .why-us-play {
          filter: brightness(1.08);
          transform: translate(-50%, -50%) scale(1.06);
        }

        @keyframes why-us-ring-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1199px) {
          .why-us-section { padding-top: 84px; }
          .why-us-header h2 { font-size: clamp(36px, 4.5vw, 47px); }
          .why-us-showcase { width: 86vw; margin-top: 88px; }
        }

        @media (max-width: 767px) {
          .why-us-section { padding-top: 68px; }
          .why-us-header { padding: 0 18px; }
          .why-us-kicker { min-height: 31px; margin-bottom: 17px; font-size: 13px; }
          .why-us-header h2 { font-size: clamp(31px, 9vw, 40px); line-height: 1.08; letter-spacing: -1.4px; }
          .why-us-header h2 em { display: block; letter-spacing: -1.5px; }
          .why-us-copy { max-width: 540px; margin-top: 17px; font-size: 15px; }
          .why-us-copy br { display: none; }
          .why-us-showcase { width: 93vw; margin-top: 62px; border-radius: 12px 12px 0 0; }
          .why-us-watch { width: 92px; height: 92px; }
          .why-us-watch-ring text { font-size: 9.2px; letter-spacing: 1.7px; }
          .why-us-play { width: 42px; height: 42px; }
          .why-us-play svg { width: 24px; height: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-us-watch-ring { animation-duration: 30s; }
        }
      `}</style>
    </section>
  );
}
