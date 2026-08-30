"use client";

import { ArrowRight, Mail } from "lucide-react";

const socialLinks = [
  { id: "dribbble", label: "Dribbble", href: "https://dribbble.com" },
  { id: "behance", label: "Behance", href: "https://behance.net" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com" },
  { id: "x", label: "X", href: "https://x.com" },
  { id: "telegram", label: "Telegram", href: "https://telegram.org" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com" },
];

function BrandIcon({ id }: { id: string }) {
  if (id === "dribbble") return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M7.2 4.8c4.1 4 6.8 8.7 8.1 14.1M3.4 10.1c5.8.1 10.8-1.4 14.8-4.2M5 18c3.4-3.2 8.1-4.5 15.2-3.6" /></svg>;
  if (id === "behance") return <svg viewBox="0 0 24 24"><path d="M3.5 6.5h6.1c2.6 0 4.1 1.1 4.1 3 0 1.3-.7 2.2-1.8 2.7 1.6.4 2.5 1.5 2.5 3.1 0 2.2-1.7 3.4-4.6 3.4H3.5V6.5Zm2.4 2v2.9h3.4c1.3 0 2-.5 2-1.5 0-.9-.7-1.4-2-1.4H5.9Zm0 4.8v3.4h3.7c1.5 0 2.3-.6 2.3-1.7s-.8-1.7-2.3-1.7H5.9ZM16 8h5M18.6 10.2c2.5 0 4.1 1.8 4.1 4.5v.7h-6.1c.2 1.2.9 1.9 2.1 1.9.9 0 1.5-.3 2-1l1.7 1.1c-.8 1.2-2 1.8-3.8 1.8-2.7 0-4.5-1.8-4.5-4.5 0-2.6 1.8-4.5 4.5-4.5Zm-2 3.6h3.8c-.1-1.1-.8-1.7-1.8-1.7-1.1 0-1.8.6-2 1.7Z" /></svg>;
  if (id === "instagram") return <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="brand-fill" cx="17.5" cy="6.5" r="1" /></svg>;
  if (id === "linkedin") return <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M7.3 10v7M7.3 7.2v.1M11 17v-7m0 3.1c.4-2 4.8-2.5 4.8 1V17" /></svg>;
  if (id === "facebook") return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M13.5 20v-7h2.3l.4-2.7h-2.7V8.6c0-.8.2-1.3 1.4-1.3h1.5V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.4-3.7 3.8v1.7H8V13h2.5v7" /></svg>;
  if (id === "x") return <svg viewBox="0 0 24 24"><path d="M4.5 4.5 19.5 19.5M19 4.5 5 19.5" /></svg>;
  if (id === "telegram") return <svg viewBox="0 0 24 24"><path d="m3.5 11 16.7-6.6-3 15.3-5.2-4-2.8 2.6.5-4.5 7.3-6.4-9 5-4.5-1.4Z" /></svg>;
  return <svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="4" /><path className="brand-fill" d="m10 9 5 3-5 3V9Z" /></svg>;
}

export default function Newsletter() {
  return (
    <section className="newsletter-section" aria-label="Newsletter and social links">
      <p className="newsletter-copy">
        Say goodbye to outdated enterprise software and welcome the smoother one. We lead you from<br />
        design to product innovation to shape your path from idea to success
      </p>

      <nav className="newsletter-socials" aria-label="Social media links">
        {socialLinks.map((social) => (
          <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} key={social.id}>
            <BrandIcon id={social.id} />
          </a>
        ))}
      </nav>

      <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
        <div className="newsletter-input-wrapper">
          <Mail className="newsletter-mail-icon" aria-hidden="true" />
          <input
            type="email"
            name="email"
            placeholder="Your email here"
            aria-label="Email address"
            required
          />
          <button type="submit">
            <span>Subscribe</span>
            <i><ArrowRight aria-hidden="true" /></i>
          </button>
        </div>
      </form>

      <style>{`
        .newsletter-section {
          margin-top: -72px;
          padding: 86px 24px 102px;
          background: #fdfdfd;
          color: #171717;
          text-align: center;
        }

        .newsletter-copy {
          max-width: 820px;
          margin: 0 auto;
          color: #5a5a5a;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.45;
        }

        .newsletter-socials {
          display: flex;
          margin-top: 35px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .newsletter-socials a {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border-radius: 7px;
          background: #e4e4e4;
          color: #141414;
        }

        .newsletter-socials a:hover { background: #dcecff; }
        .newsletter-socials a:focus-visible { background: #dcecff; outline: 2px solid #278cff; outline-offset: 2px; }
        .newsletter-socials svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }
        .newsletter-socials .brand-fill { fill: currentColor; stroke: none; }

        .newsletter-form {
          width: min(520px, 100%);
          margin: 47px auto 0;
        }

        .newsletter-input-wrapper {
          position: relative;
          display: flex;
          width: 100%;
          height: 58px;
          padding: 5px 6px 5px 20px;
          align-items: center;
          border: 1.5px solid #dfdfdf;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,.03);
          transition: border-color 180ms ease,box-shadow 180ms ease;
        }

        .newsletter-input-wrapper:hover {
          border-color: #c4b8e8;
        }

        .newsletter-input-wrapper:focus-within {
          border-color: #7553c8;
          box-shadow: 0 0 0 3px rgba(117,83,200,.18),0 4px 20px rgba(0,0,0,.03);
        }

        .newsletter-mail-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          flex: none;
          color: #6b7280;
          stroke-width: 1.6;
        }

        .newsletter-input-wrapper input {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #171717;
          font-family: inherit;
          font-size: 15px;
        }

        .newsletter-input-wrapper input::placeholder {
          color: #9ca3af;
          opacity: 1;
        }

        .newsletter-input-wrapper button {
          display: flex;
          height: 100%;
          padding: 0 5px 0 18px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex: none;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #7553c8 0%, #5c3ba6 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(117, 83, 200, 0.35);
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .newsletter-input-wrapper button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(117, 83, 200, 0.5);
        }

        .newsletter-input-wrapper button i {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #7553c8;
          transition: transform 180ms ease;
        }

        .newsletter-input-wrapper button i svg {
          width: 16px;
          height: 16px;
          stroke-width: 1.8;
        }

        .newsletter-input-wrapper button:hover i {
          transform: translateX(2px);
        }

        .newsletter-input-wrapper button:focus-visible {
          outline: 2px solid #7553c8;
          outline-offset: 2px;
        }

        @media (max-width: 600px) {
          .newsletter-section { margin-top: -48px; padding: 72px 18px 82px; }
          .newsletter-copy { font-size: 16px; line-height: 1.5; }
          .newsletter-copy br { display: none; }
          .newsletter-socials { max-width: 230px; margin-right: auto; margin-left: auto; gap: 12px; }
          .newsletter-socials a { width: 42px; height: 42px; }
          .newsletter-form { width: 100%; margin-top: 38px; }
          .newsletter-input-wrapper { height: 54px; padding: 4px 5px 4px 16px; }
          .newsletter-mail-icon { width: 18px; height: 18px; margin-right: 8px; }
          .newsletter-input-wrapper input { font-size: 14px; }
          .newsletter-input-wrapper button { padding: 0 4px 0 14px; font-size: 13px; }
          .newsletter-input-wrapper button i { width: 34px; height: 34px; }
        }
      `}</style>
    </section>
  );
}
