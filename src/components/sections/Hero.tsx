import Image from "next/image";
import Link from "next/link";

const purpleBackground =
  "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/69ca30aa7176f823e816838f_Hero%20(1).svg";
const dottedTexture =
  "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/69ca30bcd624ff132ecf6c42_9931928039c2b9614fcf61170716ce8c_texture%20%281%29.svg";

type MarqueeCard = {
  label: string;
  width: number;
  src?: string;
};

const topCards: MarqueeCard[] = [
  { label: "Fitmate", width: 195, src: "/images/hero/fitmate.png" },
  { label: "Affine", width: 430, src: "/images/hero/affine.png" },
  { label: "Gummiz", width: 196, src: "/images/hero/gummiz.jpg" },
  { label: "The Gridline", width: 430, src: "/images/hero/the-gridline.png" },
  { label: "Oter", width: 196, src: "/images/hero/oter.png" },
  { label: "Plentypay", width: 258, src: "/images/hero/plentypay.png" },
  { label: "Oh My Coffee", width: 196, src: "/images/hero/oh-my-coffee.png" },
];

const bottomCards = topCards;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}

function PlatformIcons() {
  return (
    <span className="dm-platforms" aria-label="Figma, Webflow and Framer">
      <span className="dm-platform" aria-hidden="true">
        <Image
          className="dm-platform-figma"
          src="/images/hero/platforms/figma.png"
          alt=""
          width={28}
          height={28}
        />
      </span>
      <span className="dm-platform" aria-hidden="true">
        <Image
          className="dm-platform-webflow"
          src="/images/hero/platforms/webflow.png"
          alt=""
          width={31}
          height={31}
        />
      </span>
      <span className="dm-platform" aria-hidden="true">
        <Image
          className="dm-platform-framer"
          src="/images/hero/platforms/framer.png"
          alt=""
          width={29}
          height={29}
        />
      </span>
    </span>
  );
}

function MarqueeCards({ cards }: { cards: MarqueeCard[] }) {
  return (
    <>
      {[0, 1].map((copy) => (
        <div className="dm-marquee-set" aria-hidden={copy === 1} key={copy}>
          {cards.map((card, index) => (
            <article
              className="dm-work-card"
              style={{ width: card.width }}
              aria-label={card.label}
              key={`${copy}-${card.label}-${index}`}
            >
              {card.src ? (
                <Image
                  src={card.src}
                  alt={copy === 0 ? card.label : ""}
                  fill
                  sizes={`${card.width}px`}
                />
              ) : null}
            </article>
          ))}
        </div>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className="dm-hero" aria-labelledby="hero-heading">
      <div
        className="dm-hero-background"
        style={{ backgroundImage: `url("${purpleBackground}")` }}
        aria-hidden="true"
      />
      <div
        className="dm-hero-texture"
        style={{ backgroundImage: `url("${dottedTexture}")` }}
        aria-hidden="true"
      />

      <div className="dm-hero-content">
        <div className="dm-rating" aria-label="4.9 out of 5 rating">
          <span className="dm-rating-logo" aria-hidden="true" />
          <div className="dm-rating-score">
            <small>4.9</small>
            <span className="dm-rating-stars" aria-hidden="true" />
          </div>
        </div>

        <p className="dm-eyebrow">Leading UI/UX Design Agency</p>

        <h1 id="hero-heading">
          We <em>Design</em> Products That
          <br />
          Drive <PlatformIcons /> <em>Results</em>
        </h1>

        <div
          className="dm-country-pill"
          aria-label="Designing across 8 plus countries"
        />

        <Link className="dm-hero-cta" href="/contact">
          <span>Book a Call</span>
          <ArrowIcon />
          <span className="dm-cta-star" aria-hidden="true" />
        </Link>
      </div>

      <div className="dm-marquees" aria-label="Selected projects">
        <div className="dm-marquee-row">
          <div className="dm-marquee-track dm-marquee-left">
            <MarqueeCards cards={topCards} />
          </div>
        </div>
        <div className="dm-marquee-row">
          <div className="dm-marquee-track dm-marquee-right">
            <MarqueeCards cards={bottomCards} />
          </div>
        </div>
      </div>

      <style>{`
        .dm-hero {
          --dm-marquee-gap: 20px;
          --dm-marquee-half-gap: 10px;
          position: relative;
          height: calc(100vh + 28px);
          min-height: 1088px;
          overflow: hidden;
          color: #fff;
        }

        .dm-hero-background,
        .dm-hero-texture {
          position: absolute;
          inset: 0;
          background-position: 50% 0%;
          background-repeat: no-repeat;
          background-size: cover;
          pointer-events: none;
        }

        .dm-hero-background { z-index: 0; }
        .dm-hero-texture { z-index: 1; }

        .dm-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 2rem;
          padding-top: 76px;
          padding-bottom: 482px;
          text-align: center;
        }

        .dm-rating {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 8px;
          color: white;
          line-height: 1;
        }

        .dm-rating-logo {
          display: block;
          width: 56px;
          height: 29px;
          flex: none;
          background-image: url("https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/6799fee94ce8588c2c639fd5_Frame%204.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .dm-rating-score {
          display: flex;
          height: 16px;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .dm-rating small {
          font-size: 14px;
          font-weight: 600;
          line-height: 16px;
        }

        .dm-rating-stars {
          display: block;
          width: 82px;
          height: 16px;
          flex: none;
          background-image: url("https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ae340747e7ad9d1fc783d9_Star%20(2).svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .dm-eyebrow {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          line-height: 26px;
          letter-spacing: -0.55px;
        }

        .dm-hero h1 {
          margin: 0;
          max-width: 960px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 72px;
          font-weight: 700;
          line-height: 1.27;
          letter-spacing: -3px;
        }

        .dm-hero h1 em {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1em;
          font-weight: 700;
          letter-spacing: -3.5px;
        }

        .dm-platforms {
          display: inline-flex;
          margin: 0 6px;
          position: relative;
          top: -3px;
          vertical-align: middle;
        }

        .dm-platform {
          display: inline-grid;
          width: 55px;
          height: 55px;
          margin-left: -10px;
          place-items: center;
          border: 1px solid #212121;
          border-radius: 50%;
          background: #f7f7f3;
          overflow: hidden;
        }

        .dm-platform:first-child {
          margin-left: 0;
        }

        .dm-platform img {
          display: block;
          height: auto;
          object-fit: contain;
        }

        .dm-country-pill {
          width: 440px;
          height: 44px;
          margin-top: 0;
          border: 1px solid #008f56;
          border-radius: 999px;
          background-color: #080a09;
          background-image: url("https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/6889b68aa02abc3bb1176b0b_f472c03fd1225214fac5555465dd215b_country-chip.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: calc(100% - 36px) auto;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .dm-hero-cta {
          position: relative;
          display: flex;
          width: 177px;
          height: 56px;
          margin-top: 0;
          align-items: center;
          justify-content: center;
          gap: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 6px;
          background: linear-gradient(110deg, #6c2be8, #833cff);
          font-size: 16px;
          font-weight: 700;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 6px 18px rgba(39, 11, 95, .25);
        }

        .dm-cta-star {
          position: absolute;
          z-index: 0;
          top: -3px;
          right: -2px;
          width: 26px;
          height: 26px;
          background-image: url("https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/672a7a8e3a6aba070d15d4c0_Star%206.avif");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          pointer-events: none;
        }

        .dm-hero-cta > span:not(.dm-cta-star),
        .dm-hero-cta > svg {
          position: relative;
          z-index: 1;
        }

        .dm-hero-cta svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.6;
        }

        .dm-marquees {
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          left: 0;
          display: grid;
          gap: var(--dm-marquee-gap);
          overflow: hidden;
        }

        .dm-marquee-row { width: 100%; overflow: hidden; }

        .dm-marquee-track,
        .dm-marquee-set {
          display: flex;
          width: max-content;
          gap: var(--dm-marquee-gap);
        }

        .dm-marquee-track {
          will-change: transform;
          backface-visibility: hidden;
        }

        .dm-marquee-left { animation: dm-marquee-left 112s linear infinite; }
        .dm-marquee-right { animation: dm-marquee-right 112s linear infinite; }

        .dm-work-card {
          position: relative;
          height: 218px;
          flex: none;
          overflow: hidden;
          border-radius: 16px;
          background: transparent;
        }

        .dm-work-card img {
          object-fit: cover;
        }

        @keyframes dm-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-50% - var(--dm-marquee-half-gap)), 0, 0); }
        }

        @keyframes dm-marquee-right {
          from { transform: translate3d(calc(-50% - var(--dm-marquee-half-gap)), 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 900px) {
          .dm-hero {
            --dm-marquee-gap: 14px;
            --dm-marquee-half-gap: 7px;
            height: auto;
            min-height: 800px;
          }

          .dm-hero-content {
            padding: 72px 18px 324px;
          }

          .dm-eyebrow {
            margin: 0;
            font-size: 14px;
          }

          .dm-hero h1 { font-size: clamp(35px, 10vw, 48px); line-height: 1.13; letter-spacing: -1.7px; }
          .dm-platform { width: 33px; height: 33px; margin-left: -6px; }
          .dm-platform-figma { width: 17px; }
          .dm-platform-webflow { width: 19px; }
          .dm-platform-framer { width: 18px; }
          .dm-platforms { top: -2px; vertical-align: middle; }

          .dm-country-pill {
            width: min(440px, calc(100vw - 28px));
            max-width: calc(100vw - 28px);
            margin-top: 0;
          }

          .dm-hero-cta { margin-top: 0; }
          .dm-work-card { height: 140px; }
        }

        @media (max-width: 520px) {
          .dm-hero {
            min-height: 780px;
          }

          .dm-hero-content {
            padding-top: 68px;
          }

          .dm-rating-logo {
            height: 22px;
          }

          .dm-hero h1 {
            max-width: 390px;
            font-size: clamp(32px, 9.5vw, 42px);
          }

          .dm-work-card {
            height: 122px;
            border-radius: 11px;
          }

          .dm-marquees {
            gap: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dm-marquee-track { animation-play-state: paused; }
        }
      `}</style>
    </section>
  );
}
