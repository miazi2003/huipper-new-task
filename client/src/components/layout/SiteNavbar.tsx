"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export type SiteNavbarProps = {
  variant?: "transparent-dark" | "transparent-light" | "default";
};

export default function SiteNavbar({ variant = "default" }: SiteNavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const isDarkHero = variant === "transparent-dark";

  return (
    <header
      className={`site-navbar ${isDarkHero ? "is-dark-variant" : "is-light-variant"} ${
        scrolled ? "is-scrolled" : "is-top"
      }`}
    >
      <div className="site-navbar-container">
        <Link href="/" className="site-navbar-logo" aria-label="Huipper Home">
          <Image
            src="/images/brand/huipper-logo.webp"
            alt="Huipper"
            width={140}
            height={36}
            priority
            className="logo-img"
          />
        </Link>

        <nav className={`site-navbar-links ${menuOpen ? "is-open" : ""}`} aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/projects" ? pathname.startsWith("/projects") : pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-navbar-actions">
          <Link href="/#contact" className="site-cta-btn">
            <span>Get Started</span>
            <i><ArrowRight size={14} /></i>
          </Link>

          <button
            type="button"
            className="mobile-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Dark Variant (Over Dark Hero) */
        .site-navbar.is-dark-variant.is-top {
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .site-navbar.is-dark-variant.is-scrolled {
          background: rgba(8, 8, 12, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.36);
        }

        .site-navbar.is-dark-variant .logo-img {
          filter: brightness(0) invert(1);
        }

        .site-navbar.is-dark-variant .nav-link {
          color: rgba(255, 255, 255, 0.72);
        }

        .site-navbar.is-dark-variant .nav-link:hover,
        .site-navbar.is-dark-variant .nav-link.is-active {
          color: #ffffff;
        }

        .site-navbar.is-dark-variant .nav-link.is-active::after {
          background: #ffffff;
        }

        .site-navbar.is-dark-variant .site-cta-btn {
          background: #ffffff;
          color: #000000;
        }

        .site-navbar.is-dark-variant .site-cta-btn:hover {
          background: #f0f0f0;
        }

        .site-navbar.is-dark-variant .site-cta-btn i {
          background: rgba(0, 0, 0, 0.1);
        }

        .site-navbar.is-dark-variant .mobile-toggle {
          color: #ffffff;
        }

        /* Light Variant */
        .site-navbar.is-light-variant.is-top {
          background: transparent;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .site-navbar.is-light-variant.is-scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .site-navbar.is-light-variant .nav-link {
          color: #555555;
        }

        .site-navbar.is-light-variant .nav-link:hover,
        .site-navbar.is-light-variant .nav-link.is-active {
          color: #000000;
        }

        .site-navbar.is-light-variant .nav-link.is-active::after {
          background: #000000;
        }

        .site-navbar.is-light-variant .site-cta-btn {
          background: #000000;
          color: #ffffff;
        }

        .site-navbar.is-light-variant .site-cta-btn:hover {
          background: #222222;
        }

        .site-navbar.is-light-variant .site-cta-btn i {
          background: rgba(255, 255, 255, 0.2);
        }

        .site-navbar.is-light-variant .mobile-toggle {
          color: #111111;
        }

        /* Common Container & Nav */
        .site-navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 18px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .site-navbar-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo-img {
          width: auto;
          height: 32px;
          object-fit: contain;
          transition: filter 0.2s ease;
        }

        .site-navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 6px 0;
        }

        .nav-link.is-active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 2px;
        }

        .site-navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .site-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: 9999px;
          text-decoration: none;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .site-cta-btn:hover {
          transform: translateY(-1px);
        }

        .site-cta-btn i {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          padding: 4px;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .site-navbar-container {
            padding: 14px 20px;
          }

          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .site-navbar.is-dark-variant .site-navbar-links {
            background: #0d0d12;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          }

          .site-navbar.is-light-variant .site-navbar-links {
            background: #ffffff;
            border-bottom: 1px solid #eeeeee;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }

          .site-navbar-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            padding: 24px;
            gap: 20px;
            display: none;
          }

          .site-navbar-links.is-open {
            display: flex;
          }

          .site-cta-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
