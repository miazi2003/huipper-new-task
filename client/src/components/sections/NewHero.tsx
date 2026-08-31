"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, Camera, CircleUser, Menu, Send, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DEFAULT_SITE_SETTINGS, getPublicSiteSettings } from "@/lib/api/site-settings";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const DOTS = Array.from({ length: 740 }, (_, index) => {
  const y = 1 - (index / 739) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const cx = Math.round((250 + x * 219) * 1000) / 1000;
  const cy = Math.round((250 + y * 219) * 1000) / 1000;
  const r = Math.round((0.72 + ((z + 1) / 2) * 0.82) * 1000) / 1000;
  const opacity = Math.round((0.14 + ((z + 1) / 2) * 0.5) * 1000) / 1000;
  return { cx, cy, r, opacity };
});

function ParticleSphere() {
  return (
    <svg className="ac-particle-sphere" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <radialGradient id="ac-sphere-fade"><stop offset="0" stopColor="white" stopOpacity=".95" /><stop offset=".72" stopColor="white" stopOpacity=".62" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
        <mask id="ac-sphere-mask"><circle cx="250" cy="250" r="245" fill="url(#ac-sphere-fade)" /></mask>
      </defs>
      <g mask="url(#ac-sphere-mask)">{DOTS.map((dot, index) => <circle key={index} cx={dot.cx} cy={dot.cy} r={dot.r} fill="white" opacity={dot.opacity} />)}</g>
    </svg>
  );
}

export default function NewHero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    void getPublicSiteSettings().then(setSiteSettings).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const logo = logoRef.current;

    if (!wrapper || !topPanel || !bottomPanel || !logo) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(topPanel, { yPercent: -100 });
        gsap.set(bottomPanel, { yPercent: 100 });
        gsap.set(logo, { opacity: 0 });
        return;
      }

      // Explicit initial states for deterministic forward & reverse scrubbing
      gsap.set(topPanel, { yPercent: 0 });
      gsap.set(bottomPanel, { yPercent: 0 });
      gsap.set(logo, { opacity: 1, scale: 1 });

      gsap.set(".ac-hero-card", { scale: 1.05, transformOrigin: "center center" });
      gsap.set(".ac-hero-copy h1", { opacity: 0, y: 40, filter: "blur(10px)" });
      gsap.set(".ac-hero-copy p", { opacity: 0, y: 25 });
      gsap.set(".ac-hero-button", { opacity: 0, y: 20, scale: 0.95 });
      gsap.set([".ac-nav-shell", ".ac-start-button", ".ac-brand"], { opacity: 0, y: -20 });
      gsap.set([".ac-contact-card", ".ac-stats"], { opacity: 0, y: 25 });

      // Single deterministic scrubbed timeline with pin & dedicated hero hold phase
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=175%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      // 1. Logo fades out smoothly (0.04 -> 0.18)
      tl.to(
        logo,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.14,
          ease: "none",
        },
        0.04
      );

      // 2. Top and bottom split doors slide open simultaneously (0.08 -> 0.62)
      tl.to(
        topPanel,
        {
          yPercent: -100,
          duration: 0.54,
          ease: "none",
        },
        0.08
      );

      tl.to(
        bottomPanel,
        {
          yPercent: 100,
          duration: 0.54,
          ease: "none",
        },
        0.08
      );

      // 3. Synchronized hero reveal underneath (finishes completely by 0.75)
      tl.to(
        ".ac-hero-card",
        {
          scale: 1,
          duration: 0.58,
          ease: "none",
        },
        0.10
      );

      tl.to(
        ".ac-hero-copy h1",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.42,
          ease: "none",
        },
        0.22
      );

      tl.to(
        ".ac-hero-copy p",
        {
          opacity: 1,
          y: 0,
          duration: 0.36,
          ease: "none",
        },
        0.32
      );

      tl.to(
        ".ac-hero-button",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.30,
          ease: "none",
        },
        0.40
      );

      tl.to(
        [".ac-nav-shell", ".ac-start-button", ".ac-brand"],
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.03,
          ease: "none",
        },
        0.44
      );

      tl.to(
        [".ac-contact-card", ".ac-stats"],
        {
          opacity: 1,
          y: 0,
          duration: 0.26,
          stagger: 0.03,
          ease: "none",
        },
        0.48
      );

      // 4. Dedicated Hero Hold Phase (0.75 -> 1.00 = 25% of the pinned scroll distance)
      // Doors remain 100% open, hero stays fully visible and completely stationary in viewport
      tl.to({}, { duration: 0.25 }, 0.75);
    }, wrapper);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={wrapperRef} className="ac-hero-section split-hero" aria-labelledby="ac-hero-heading">
      <div className="ac-hero-stage">
        <div className="ac-page-wrapper">
          <div className="ac-hero-card">
            <Link className="ac-brand" href="/" aria-label="Huipper home">
              <span className="sr-only">Huipper</span>
            </Link>

            <nav className={`ac-nav-shell${menuOpen ? " ac-nav-open" : ""}`} aria-label="Hero navigation">
              <div className="ac-nav-links" id="ac-mobile-navigation">{navigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}</div>
              <button
                className="ac-mobile-menu"
                type="button"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                aria-controls="ac-mobile-navigation"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </nav>

            <Link className="ac-start-button" href="#contact" aria-label="Get Started"><span>Get Started</span><i><ArrowRight /></i></Link>
            <ParticleSphere />

            <div className="ac-hero-copy">
              <h1 id="ac-hero-heading">{siteSettings.hero.title}</h1>
              <p>{siteSettings.hero.subtitle.split("\n").map((line, index) => <Fragment key={`${index}-${line}`}>{index > 0 && <br />}{line}</Fragment>)}</p>
              <Link className="ac-hero-button" href={siteSettings.hero.ctaUrl || "#"}><span>{siteSettings.hero.ctaText}</span><i><ArrowRight /></i></Link>
            </div>

            <aside className="ac-contact-card" aria-label="Contact details">
              <small>CONTACT US</small>
              <a className="ac-email" href={`mailto:${siteSettings.hero.contactEmail}`}>{siteSettings.hero.contactEmail}</a>
              <div className="ac-socials">
                <a href="#linkedin" aria-label="LinkedIn"><CircleUser /></a>
                <a href="#telegram" aria-label="Telegram"><Send /></a>
                <a href="#instagram" aria-label="Instagram"><Camera /></a>
              </div>
            </aside>

            <div className="ac-stats" aria-label="Company statistics">
              {siteSettings.hero.stats.map((stat, statIndex) => <div key={statIndex}><strong>{stat.value}</strong><span>{stat.label.split("\n").map((line, lineIndex) => <Fragment key={`${lineIndex}-${line}`}>{lineIndex > 0 && <br />}{line}</Fragment>)}</span></div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Split-Door Overlay (Seamless pure white doors & centered logo) */}
      <div className="split-overlay" aria-hidden="true">
        <div ref={topPanelRef} className="split-panel top" />
        <div ref={bottomPanelRef} className="split-panel bottom" />

        <div className="split-logo-position">
          <div ref={logoRef} className="split-logo-animated">
            <Image
              src="/images/brand/huipper-logo.webp"
              alt="Huipper"
              width={160}
              height={40}
              priority
              className="split-logo-img"
            />
          </div>
        </div>
      </div>

      <style>{`
        .split-hero {
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background: #fff;
          font-family: Arial,Helvetica,sans-serif;
        }

        .ac-hero-stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ac-page-wrapper { width: 100%; height: 100%; max-width: none; margin: 0; }
        .ac-hero-card { position: relative; width: 100%; height: 100%; min-height: 570px; overflow: hidden; border-radius: 24px; background: radial-gradient(circle at 14% 16%,rgba(255,255,255,.3),transparent 32%),radial-gradient(circle at 73% 62%,rgba(139,99,220,.22),transparent 39%),linear-gradient(108deg,#ddd3f4 0%,#a98bdf 28%,#7553c8 57%,#3b2c78 79%,#211b4d 100%); color: #fff; isolation: isolate; }
        .ac-brand { position: absolute; z-index: 5; top: 14px; left: 25px; width: 160px; height: 40px; background-image: url("/images/brand/huipper-logo.webp"); background-position: center; background-repeat: no-repeat; background-size: contain; }
        .ac-nav-shell { position: absolute; z-index: 6; top: 0; left: 50%; display: flex; width: 51.5%; height: 67px; align-items: center; justify-content: center; border-radius: 0 0 21px 21px; background: #fff; transform: translateX(-50%); }
        .ac-nav-shell::before,.ac-nav-shell::after { position: absolute; top: 0; width: 28px; height: 28px; background: transparent; content: ""; }
        .ac-nav-shell::before { right: 100%; border-radius: 0 18px 0 0; box-shadow: 12px -12px 0 12px #fff; }
        .ac-nav-shell::after { left: 100%; border-radius: 18px 0 0; box-shadow: -12px -12px 0 12px #fff; }
        .ac-nav-links { display: flex; width: 82%; align-items: center; justify-content: space-between; gap: 20px; }
        .ac-nav-links a { color: #2d2458; font-size: 15px; font-weight: 400; white-space: nowrap; }
        .ac-nav-links a:hover { color: #7553c8; }
        .ac-mobile-menu { display: none; }
        .ac-start-button { position: absolute; z-index: 6; top: 16px; right: 25px; display: flex; width: 146px; height: 44px; padding: 0 5px 0 16px; align-items: center; justify-content: space-between; border-radius: 999px; background: linear-gradient(135deg,#7553c8 0%,#5c3ba6 100%); color: #fff; font-size: 13px; font-weight: 600; box-shadow: 0 4px 16px rgba(117,83,200,.4); transition: transform 180ms ease,box-shadow 180ms ease; }
        .ac-start-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(117,83,200,.55); }
        .ac-start-button i { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; background: #fff; color: #7553c8; transition: transform 180ms ease; }
        .ac-start-button i svg { width: 15px; height: 15px; stroke-width: 1.6; }
        .ac-start-button:hover i { transform: translateX(2px); }
        .ac-particle-sphere { position: absolute; z-index: 1; top: 49px; right: 15.5%; width: min(42vw,520px); height: min(42vw,520px); opacity: .68; pointer-events: none; animation: ac-sphere-drift 18s ease-in-out infinite alternate; }
        .ac-hero-copy { position: absolute; z-index: 3; top: 218px; left: 50%; display: flex; width: min(690px,70%); align-items: center; flex-direction: column; text-align: center; transform: translateX(-50%); }
        .ac-hero-copy h1 { margin: 0; font-size: clamp(46px,4.35vw,64px); font-weight: 400; line-height: 1; letter-spacing: -2.2px; white-space: nowrap; }
        .ac-hero-copy p { margin: 22px 0 0; color: rgba(255,255,255,.9); font-size: 15px; font-weight: 400; line-height: 1.45; letter-spacing: .15px; }
        .ac-hero-button { display: flex; width: 158px; height: 44px; margin-top: 30px; padding: 0 5px 0 19px; align-items: center; justify-content: space-between; border-radius: 999px; background: linear-gradient(135deg,#7553c8 0%,#5c3ba6 100%); color: #fff; font-size: 12px; font-weight: 600; box-shadow: 0 8px 24px rgba(33,27,77,.28),0 2px 10px rgba(117,83,200,.35); transition: transform 180ms ease,box-shadow 180ms ease; }
        .ac-hero-button:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(33,27,77,.35),0 4px 14px rgba(117,83,200,.5); }
        .ac-hero-button i { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; background: #fff; color: #7553c8; transition: transform 180ms ease; }
        .ac-hero-button i svg { width: 15px; height: 15px; stroke-width: 1.6; }
        .ac-hero-button:hover i { transform: translateX(2px); }
        .ac-contact-card { position: absolute; z-index: 5; bottom: 0; left: 0; display: flex; width: 27%; height: 166px; padding: 29px 36px 24px; flex-direction: column; border-top: 5px solid #fff; border-right: 5px solid #fff; border-radius: 0 22px 0 0; background: linear-gradient(135deg,rgba(137,106,221,.8),rgba(59,44,120,.94)); box-shadow: inset 0 1px 0 rgba(255,255,255,.2); }
        .ac-contact-card::after { position: absolute; right: -25px; bottom: 0; width: 24px; height: 24px; border-radius: 0 0 0 18px; box-shadow: -8px 8px 0 8px #fff; content: ""; }
        .ac-contact-card small { color: rgba(255,255,255,.72); font-size: 10px; line-height: 1; letter-spacing: .4px; }
        .ac-email { width: max-content; margin-top: 15px; color: #fff; font-size: 20px; font-weight: 400; }
        .ac-socials { display: flex; margin-top: 19px; gap: 7px; }
        .ac-socials a { display: grid; width: 29px; height: 29px; place-items: center; border-radius: 50%; background: rgba(33,27,77,.82); color: #fff; }
        .ac-socials svg { width: 13px; height: 13px; stroke-width: 1.7; }
        .ac-stats { position: absolute; z-index: 4; right: 19.5%; bottom: 33px; display: grid; width: 44%; grid-template-columns: repeat(3,1fr); text-align: center; }
        .ac-stats strong { display: block; font-size: 31px; font-weight: 400; line-height: 1; }
        .ac-stats span { display: block; margin-top: 11px; color: rgba(255,255,255,.75); font-size: 10px; line-height: 1.3; }
        .ac-brand:focus-visible,.ac-nav-links a:focus-visible,.ac-start-button:focus-visible,.ac-hero-button:focus-visible,.ac-socials a:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        /* Split Door Overlay (Zero Seam, Zero Shadows, 100% Solid White) */
        .split-overlay {
          position: absolute;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          overflow: hidden;
        }

        .split-panel {
          position: absolute;
          left: 0;
          width: 100%;
          background: #ffffff;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .split-panel.top {
          top: 0;
          height: calc(50% + 2px);
        }

        .split-panel.bottom {
          bottom: 0;
          height: calc(50% + 2px);
        }

        .split-logo-position {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 110;
          pointer-events: none;
        }

        .split-logo-animated {
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
        }

        .split-logo-img {
          width: clamp(120px, 14vw, 175px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        @keyframes ac-sphere-drift { from { transform: rotate(-1.5deg) translateY(-2px); } to { transform: rotate(1.5deg) translateY(3px); } }
        @media (max-width:1000px) { .ac-nav-shell{width:57%}.ac-nav-links{width:88%;gap:12px}.ac-nav-links a{font-size:13px}.ac-hero-copy{top:195px}.ac-contact-card{width:31%;padding-left:26px}.ac-stats{right:11%;width:51%}.ac-particle-sphere{right:6%} }
        @media (max-width:767px) {
          .ac-hero-stage{padding:10px}
          .ac-hero-card{min-height:700px;border-radius:20px}
          .ac-brand{top:14px;left:14px;width:136px;height:34px}
          .ac-nav-shell{width:78px;height:62px}
          .ac-nav-links{display:none}
          .ac-nav-shell.ac-nav-open .ac-nav-links{position:absolute;top:72px;left:50%;display:flex;width:min(320px,calc(100vw - 32px));padding:14px;align-items:stretch;flex-direction:column;gap:4px;border:1px solid rgba(117,83,200,.18);border-radius:18px;background:rgba(255,255,255,.96);box-shadow:0 18px 48px rgba(33,27,77,.24);transform:translateX(-50%);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
          .ac-nav-shell.ac-nav-open .ac-nav-links a{display:flex;min-height:45px;padding:0 15px;align-items:center;border-radius:11px;color:#2d2458;font-size:15px;font-weight:600;transition:background 160ms ease,color 160ms ease}
          .ac-nav-shell.ac-nav-open .ac-nav-links a:hover,.ac-nav-shell.ac-nav-open .ac-nav-links a:focus-visible{background:#eee9fa;color:#6845b8}
          .ac-mobile-menu{position:relative;z-index:2;display:grid;width:35px;height:35px;padding:0;place-items:center;border:0;border-radius:50%;background:#eee9fa;color:#3b2c78;cursor:pointer}
          .ac-mobile-menu svg{width:16px;height:16px}
          .ac-start-button{top:14px;right:14px;width:38px;height:38px;padding:3px;justify-content:center}
          .ac-start-button>span{display:none}
          .ac-start-button i{width:32px;height:32px}
          .ac-particle-sphere{top:125px;right:-145px;width:430px;height:430px}
          .ac-hero-copy{top:190px;width:calc(100% - 34px)}
          .ac-hero-copy h1{font-size:clamp(32px,9.5vw,42px);letter-spacing:-1.3px}
          .ac-hero-copy p{margin-top:18px;font-size:12px}
          .ac-hero-button{margin-top:24px;font-size:12px}
          .ac-stats{right:5%;bottom:191px;width:90%}
          .ac-stats strong{font-size:27px}
          .ac-stats span{font-size:8px}
          .ac-contact-card{width:100%;height:160px;padding:26px 28px;border-right:0;border-radius:22px 22px 0 0}
          .ac-contact-card::after{display:none}
          .split-logo-img{width:clamp(100px, 28vw, 130px)}
        }
        @media (max-width:400px) {
          .ac-hero-stage{padding:10px}
          .ac-brand{top:13px;left:13px;width:38px;height:38px;background-image:url("/images/brand/huipper-mark-clean.png");background-size:contain}
          .ac-nav-shell{width:72px;height:59px}
          .ac-mobile-menu{width:34px;height:34px}
          .ac-start-button{top:13px;right:13px;width:36px;height:36px;padding:2px}
          .ac-start-button i{width:32px;height:32px}
          .ac-hero-copy{top:198px;width:calc(100% - 40px);padding:0 10px}
          .ac-hero-copy h1{width:100%;font-size:clamp(24px,7.6vw,29px);line-height:1.08;letter-spacing:-.8px;white-space:normal}
          .ac-hero-copy p{max-width:290px;margin-top:20px;padding:0 8px;font-size:11px;line-height:1.55}
          .ac-hero-button{margin-top:26px}
          .ac-stats{right:4%;width:92%}
          .ac-stats strong{font-size:25px}
          .ac-contact-card{padding-right:20px;padding-left:20px}
          .ac-email{max-width:100%;font-size:clamp(16px,5vw,19px);overflow-wrap:anywhere}
        }
        @media (prefers-reduced-motion:reduce) { .ac-particle-sphere{animation:none}.ac-hero-button i{transition:none} }
      `}</style>
    </section>
  );
}
