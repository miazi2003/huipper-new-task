"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function ArrowIcon() {
  return (
    <svg
      className="h-[24px] w-[24px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.65]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 48);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className="pointer-events-none absolute inset-x-0 top-0 z-50"
      data-scrolled={isScrolled}
    >
      <Link
        href="/"
        aria-label="Huipper home"
        className="dm-brand-logo pointer-events-auto absolute left-[calc(50%+84px)] top-[18px] -translate-x-1/2"
      >
        <span className="sr-only">Huipper</span>
      </Link>

      <div className="dm-navbar-wrapper">
        <nav
          aria-label="Primary navigation"
          className="dm-navbar pointer-events-auto grid h-[72px] w-full grid-cols-[1fr_1fr_auto_1fr_1fr] items-center rounded-[16px] border border-[#216e47] bg-[#080808] p-[8px] text-[16px] font-semibold tracking-[-0.12px] text-[#f7f7f7]"
        >
          <Link className="flex h-full items-center justify-center" href="/projects">
            Projects
          </Link>
          <Link className="flex h-full items-center justify-center" href="/services">
            Services
          </Link>
          <Link
            className="dm-project-cta relative flex h-[56px] w-[208px] items-center justify-center gap-[12px] overflow-hidden rounded-[8px] font-bold"
            href="/contact"
          >
            <span className="relative z-[2]">Start a Project</span>
            <ArrowIcon />
          </Link>
          <Link className="flex h-full items-center justify-center" href="/career">
            Career
          </Link>
          <Link className="flex h-full items-center justify-center" href="/more">
            More
          </Link>
        </nav>
      </div>

      <style>{`
        .dm-brand-logo {
          width: 224px;
          height: 56px;
          background-image: url("/images/brand/huipper-logo.webp");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .dm-navbar-wrapper {
          --_shadow-rgb: 48, 255, 151;
          position: fixed;
          z-index: 99999;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          width: 100%;
          max-width: 44.5625rem;
          margin-right: auto;
          margin-left: auto;
          padding-bottom: 1.5rem;
          justify-content: center;
          isolation: isolate;
          pointer-events: none;
        }

        .dm-navbar-wrapper::before {
          position: absolute;
          z-index: 0;
          bottom: 0;
          left: 50%;
          width: 100vw;
          height: 144px;
          background: rgba(245, 245, 245, 0.025);
          content: "";
          pointer-events: none;
          transform: translateX(-50%);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 12%,
            rgba(0, 0, 0, 0.32) 32%,
            rgba(0, 0, 0, 0.68) 54%,
            #000 78%,
            #000 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 12%,
            rgba(0, 0, 0, 0.32) 32%,
            rgba(0, 0, 0, 0.68) 54%,
            #000 78%,
            #000 100%
          );
        }

        .dm-navbar {
          --_action-btn-size: 64px;
          --_curve-round-gap: 6px;
          --_curve-round-radius: 16px;
          --_middle-size: calc(
            var(--_action-btn-size) + var(--_curve-round-radius) +
              (var(--_curve-round-gap) * 2)
          );
          --_link-column-size: calc((100vw - var(--_middle-size)) / 4);
          --_top-offset: 80px;
          --_left-offset: calc(50% - (var(--_middle-size) / 2));
          --_right-offset: calc(50% + (var(--_middle-size) / 2));
          --_cutfix: 10px;
          --_left-offset-cutfix: calc(var(--_left-offset) - var(--_cutfix));
          --_right-offset-cutfix: calc(var(--_right-offset) + var(--_cutfix));
          position: relative;
          z-index: 2;
          isolation: isolate;
          box-shadow:
            inset 0 1px 0 rgba(var(--_shadow-rgb), 0.18),
            0 0 5px rgba(var(--_shadow-rgb), 0.18),
            0 8px 22px rgba(0, 0, 0, 0.18);
        }

        .dm-project-cta {
          background: #3b2c78;
          isolation: isolate;
          transition: box-shadow 260ms ease;
        }

        .dm-project-cta::before {
          position: absolute;
          z-index: 0;
          width: 220%;
          aspect-ratio: 1;
          background: conic-gradient(
            from 0deg,
            transparent 0deg 282deg,
            #7553c8 310deg,
            #ffffff 327deg,
            #896add 342deg,
            transparent 360deg
          );
          content: "";
          animation: dm-border-light 2.7s linear infinite;
          opacity: 1;
          transition: opacity 220ms ease;
        }

        .dm-project-cta::after {
          position: absolute;
          z-index: 1;
          inset: 1px;
          border-radius: 7px;
          background: linear-gradient(112deg, #090909 18%, #101010 72%, #21192c 100%);
          content: "";
          transition: background 260ms ease;
        }

        header[data-scrolled="true"] .dm-project-cta {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.34),
            0 3px 12px rgba(117, 83, 200, 0.3);
        }

        header[data-scrolled="true"] .dm-project-cta::before {
          opacity: 0;
        }

        header[data-scrolled="true"] .dm-project-cta::after {
          background: linear-gradient(105deg, #6845b8 0%, #7553c8 58%, #896add 100%);
        }

        .dm-project-cta svg {
          position: relative;
          z-index: 2;
        }

        @keyframes dm-border-light {
          to {
            transform: rotate(1turn);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dm-project-cta::before {
            animation: none;
          }
        }
      `}</style>
    </header>
  );
}
