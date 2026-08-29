const topBrands = [
  "Onethread",
  "Rabfy",
  "Ontik Technology",
  "Ostad",
  "oter",
  "Sift",
  "SKILLOPHY",
  "TEMPO",
  "CRE Guard",
  "Affine",
  "telenor",
  "axiata",
];

const bottomBrands = [
  "Property Finder",
  "Rakuten Viber",
  "homerun",
  "SiteWise",
  "TATVIST",
  "externalize it",
  "SalesGo",
  "MEDEASE",
  "crantech",
  "GUARDIAN",
  "klasio",
  "Affine",
];

const thirdRowBrands = [...topBrands.slice(5), ...topBrands.slice(0, 5)];
const fourthRowBrands = [...bottomBrands.slice(6), ...bottomBrands.slice(0, 6)];

const brandRows = [
  { brands: topBrands, direction: "rtl" },
  { brands: bottomBrands, direction: "ltr" },
  { brands: thirdRowBrands, direction: "rtl" },
  { brands: fourthRowBrands, direction: "ltr" },
] as const;

function BrandSequence({ brands }: { brands: string[] }) {
  return (
    <>
      {[0, 1].map((copy) => (
        <div className="tb-set" aria-hidden={copy === 1} key={copy}>
          {brands.map((brand, index) => (
            <span className="tb-logo" key={`${copy}-${brand}-${index}`}>
              {brand}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

export default function TrustedBrands() {
  return (
    <section className="tb-section" aria-labelledby="trusted-brands-heading">
      <h2 id="trusted-brands-heading">Trusted by 200+ of the world&apos;s top brands</h2>

      <div className="tb-rows" aria-label="Trusted brands">
        {brandRows.map((row, index) => (
          <div className="tb-row" key={index}>
            <div className={`tb-track tb-track-${row.direction}`}>
              <BrandSequence brands={[...row.brands]} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .tb-section {
          --tb-gap: 56px;
          --tb-set-edge: 28px;
          --tb-row-width: min(1280px, calc(100vw - 48px));
          position: relative;
          z-index: 3;
          height: 560px;
          margin-top: -32px;
          padding-top: 96px;
          overflow: hidden;
          border-radius: 32px 32px 0 0;
          background: #fbfbfb;
          color: #111;
        }

        .tb-section h2 {
          margin: 0;
          text-align: center;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.75px;
        }

        .tb-rows {
          display: grid;
          margin-top: 66px;
          gap: 54px;
        }

        .tb-row {
          position: relative;
          width: var(--tb-row-width);
          margin-right: auto;
          margin-left: auto;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
        }

        .tb-track,
        .tb-set {
          display: flex;
          width: max-content;
          align-items: center;
        }

        .tb-track {
          gap: 0;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tb-set {
          min-width: var(--tb-row-width);
          padding: 0 var(--tb-set-edge);
          gap: var(--tb-gap);
        }

        .tb-logo {
          display: flex;
          min-width: max-content;
          height: 34px;
          align-items: center;
          color: #363636;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          opacity: 0.38;
          white-space: nowrap;
        }

        .tb-track-rtl { animation: tb-rtl 96s linear infinite; }
        .tb-track-ltr { animation: tb-ltr 96s linear infinite; }

        @keyframes tb-rtl {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes tb-ltr {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 768px) {
          .tb-section {
            --tb-gap: 32px;
            --tb-set-edge: 16px;
            --tb-row-width: calc(100vw - 24px);
            height: 420px;
            margin-top: -22px;
            padding-top: 68px;
            border-radius: 22px 22px 0 0;
          }

          .tb-section h2 {
            padding: 0 20px;
            font-size: 20px;
          }

          .tb-rows {
            margin-top: 54px;
            gap: 38px;
          }

          .tb-logo {
            height: 28px;
            font-size: 15px;
          }

          .tb-row {
            -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
            mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .tb-track { animation-play-state: paused; }
        }
      `}</style>
    </section>
  );
}
