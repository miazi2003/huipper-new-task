import Link from "next/link";
import { Download, Star } from "lucide-react";

const footerColumns = [
  {
    title: "Important Links",
    links: [
      ["Contact Us", "/contact"], ["About Us", "/about"], ["Products", "/products"], ["Industry", "/industry"], ["Blogs", "/blogs"],
    ],
  },
  {
    title: "Services",
    links: [
      ["UI/UX Design", "/services/ui-ux-design"], ["Web Design", "/services/web-design"], ["Logo & Branding", "/services/branding"], ["Webflow Design", "/services/webflow"], ["Framer Design", "/services/framer"],
    ],
  },
  {
    title: "Specialized Industry",
    links: [
      ["Fintech Industry", "/industry/fintech"], ["Healthcare & Fitness Industry", "/industry/healthcare"], ["Edtech Industry", "/industry/edtech"], ["Cybersecurity Industry", "/industry/cybersecurity"], ["Company Deck", "/company-deck"],
    ],
  },
  {
    title: "Compare",
    links: [
      ["Vs Agencies", "/compare/agencies"], ["Vs Freelancers", "/compare/freelancers"], ["Vs Inhouse", "/compare/inhouse"],
    ],
  },
];

function Stars() {
  return <span className="footer-stars" aria-label="Five star rating">{Array.from({ length: 5 }, (_, index) => <Star key={index} />)}</span>;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner footer-links">
        {footerColumns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h2>{column.title}</h2>
            <nav aria-label={column.title}>
              {column.links.map(([label, href]) => (
                <Link href={href} key={label}>
                  {label}
                  {label === "Company Deck" ? <i><Download aria-hidden="true" /></i> : null}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="footer-divider">
        <div className="footer-inner footer-partners">
          <div className="footer-partner">
            <div className="partner-brand partner-framer"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 3h22v8H14l13 10H14v8L5 21h9L5 13V3Z" /></svg><b>Framer</b></div>
            <p>Professional Partner</p>
          </div>
          <div className="footer-partner">
            <div className="partner-brand partner-webflow"><b>W</b><strong>Webflow</strong></div>
            <p>Professional Partner</p>
          </div>
          <div className="footer-partner">
            <div className="partner-brand partner-behance">Bēhance</div>
            <p>Top Team On Behance</p>
          </div>
          <div className="footer-partner">
            <div className="partner-brand partner-dribbble">dribbble</div>
            <p>Top Team On Dribbble</p>
          </div>
          <div className="footer-partner">
            <div className="partner-brand partner-clutch">Clutch</div>
            <p>Reviewed On <Stars /></p>
          </div>
          <div className="footer-partner">
            <div className="partner-brand partner-google"><i>G</i><i>o</i><i>o</i><i>g</i><i>l</i><i>e</i></div>
            <p>Reviewed On <Stars /></p>
          </div>
        </div>
      </div>

      <div className="footer-divider">
        <div className="footer-inner footer-legal">
          <Link href="/terms">Terms &amp; Conditions</Link>
          <p>© 2026, Huipper, All Rights Reserved.</p>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <style>{`
        .site-footer {
          width: 100%;
          background: #0a0a0a;
          color: #f4f4f4;
        }

        .footer-inner { width: min(1248px, calc(100% - 64px)); margin: 0 auto; }

        .footer-links {
          display: grid;
          min-height: 347px;
          padding: 58px 0 53px;
          grid-template-columns: 1fr 1fr 1.28fr .72fr;
          gap: 72px;
        }

        .footer-column h2 { margin: 0 0 27px; font-size: 17px; font-weight: 700; line-height: 1; }
        .footer-column nav { display: grid; gap: 20px; }
        .footer-column a { display: flex; width: max-content; align-items: center; gap: 7px; color: #999; font-size: 16px; font-weight: 500; line-height: 1.25; }
        .footer-column a:hover { color: #fff; }
        .footer-column a i { display: grid; width: 16px; height: 16px; place-items: center; border-radius: 50%; background: #7553c8; color: #fff; }
        .footer-column a i svg { width: 11px; height: 11px; stroke-width: 2; }

        .footer-divider { border-top: 1px solid #252525; }

        .footer-partners {
          display: grid;
          min-height: 150px;
          padding: 38px 0 37px;
          grid-template-columns: repeat(6, 1fr);
          gap: 28px;
          align-items: center;
        }

        .footer-partner { min-width: 0; }
        .partner-brand { display: flex; min-height: 31px; align-items: center; font-size: 25px; line-height: 1; white-space: nowrap; }
        .footer-partner > p { display: flex; margin: 11px 0 0; align-items: center; gap: 10px; color: #999; font-size: 15px; font-weight: 500; white-space: nowrap; }
        .partner-framer { gap: 9px; font-size: 20px; }
        .partner-framer svg { width: 28px; height: 28px; fill: #18a9ef; }
        .partner-webflow { gap: 7px; font-size: 20px; }
        .partner-webflow b { color: #1678ec; font-size: 25px; font-style: italic; letter-spacing: -8px; }
        .partner-behance { color: #1678eb; font-size: 27px; font-weight: 600; letter-spacing: -1px; }
        .partner-dribbble { color: #ed5799; font-family: Georgia, "Times New Roman", serif; font-size: 26px; font-style: italic; font-weight: 700; }
        .partner-clutch { font-size: 27px; font-weight: 600; }
        .partner-google { font-size: 27px; font-weight: 500; letter-spacing: -2px; }
        .partner-google i { font-style: normal; }
        .partner-google i:nth-child(1), .partner-google i:nth-child(4) { color: #4285f4; }
        .partner-google i:nth-child(2), .partner-google i:nth-child(6) { color: #ea4335; }
        .partner-google i:nth-child(3) { color: #fbbc05; }
        .partner-google i:nth-child(5) { color: #34a853; }

        .footer-stars { display: inline-flex; gap: 1px; color: #f6bf16; }
        .footer-stars svg { width: 13px; height: 13px; fill: currentColor; stroke: currentColor; }

        .footer-legal {
          display: grid;
          min-height: 93px;
          grid-template-columns: 1fr 1.5fr 1fr;
          align-items: center;
          font-size: 15px;
          font-weight: 600;
        }
        .footer-legal p { margin: 0; text-align: center; }
        .footer-legal a:last-child { justify-self: end; }
        .footer-legal a:hover { color: #bdbdbd; }

        @media (max-width: 1050px) {
          .footer-links { grid-template-columns: repeat(2, 1fr); gap: 54px 80px; padding: 56px 0; }
          .footer-partners { grid-template-columns: repeat(3, 1fr); gap: 38px 34px; padding: 42px 0; }
        }

        @media (max-width: 650px) {
          .footer-inner { width: calc(100% - 36px); }
          .footer-links { grid-template-columns: repeat(2, 1fr); gap: 46px 22px; }
          .footer-column h2 { font-size: 15px; }
          .footer-column a { font-size: 14px; }
          .footer-partners { grid-template-columns: repeat(2, 1fr); gap: 36px 18px; }
          .footer-partner > p { font-size: 12px; white-space: normal; }
          .footer-legal { display: flex; min-height: 150px; padding: 30px 0; flex-direction: column; justify-content: center; gap: 20px; font-size: 14px; text-align: center; }
          .footer-legal a:last-child { align-self: center; }
        }
      `}</style>
    </footer>
  );
}
