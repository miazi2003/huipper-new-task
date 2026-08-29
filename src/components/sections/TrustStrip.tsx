const people = [
  { initials: "AN", color: "#263b45" },
  { initials: "SD", color: "#42657a" },
  { initials: "TA", color: "#59352f" },
  { initials: "RT", color: "#473349" },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip-section" aria-label="Design Monks social proof">
      <div className="trust-strip">
        <div className="trust-people" aria-label="More than 40 collaborators and clients">
          {people.map((person) => (
            <span style={{ background: person.color }} key={person.initials}>{person.initials}</span>
          ))}
          <strong>40+</strong>
        </div>

        <div className="trust-marquee">
          <div className="trust-marquee-track">
            <p className="trust-copy">
              100% Value And Guarantee. Don&apos;t Miss Out — Secure <em>Your Brand&apos;s Future</em> Today. Why Risk It With The <em>Wrong Partner?</em>
            </p>
            <p className="trust-copy" aria-hidden="true">
              100% Value And Guarantee. Don&apos;t Miss Out — Secure <em>Your Brand&apos;s Future</em> Today. Why Risk It With The <em>Wrong Partner?</em>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .trust-strip-section {
          position: relative;
          z-index: 2;
          margin-top: -85px;
          padding: 0 24px 96px;
          background: #fdfdfd;
        }

        .trust-strip {
          display: flex;
          width: min(1252px, 100%);
          height: 70px;
          margin: 0 auto;
          padding: 0 20px;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          border-radius: 999px;
          background: linear-gradient(90deg, #d7ff77 0%, #c9ff69 47%, #d5ff78 100%);
          box-shadow: 0 18px 34px rgba(120, 151, 56, .18);
        }

        .trust-people {
          position: relative;
          z-index: 2;
          display: flex;
          flex: none;
          align-items: center;
        }

        .trust-people span,
        .trust-people strong {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 2px solid #d3ff73;
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          line-height: 1;
        }

        .trust-people span + span { margin-left: -7px; }

        .trust-people strong {
          margin-left: -5px;
          border-color: #f8f8f8;
          background: #f8f8f8;
          color: #232323;
          font-size: 13px;
        }

        .trust-marquee {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }

        .trust-marquee-track {
          display: flex;
          width: max-content;
          backface-visibility: hidden;
          will-change: transform;
          animation: trust-copy-marquee 28s linear infinite;
        }

        .trust-copy {
          margin: 0;
          padding-right: 48px;
          flex: none;
          color: #161616;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -.45px;
          white-space: nowrap;
        }

        .trust-copy em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        @keyframes trust-copy-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 900px) {
          .trust-strip { padding-right: 15px; padding-left: 15px; }
          .trust-copy { font-size: 20px; }
          .trust-people span, .trust-people strong { width: 36px; height: 36px; }
        }

        @media (max-width: 600px) {
          .trust-strip-section { margin-top: -49px; padding: 0 12px 72px; }
          .trust-strip { min-height: 84px; height: auto; padding: 10px 14px; gap: 10px; border-radius: 44px; }
          .trust-people span, .trust-people strong { width: 34px; height: 34px; }
          .trust-people span + span { margin-left: -8px; }
          .trust-copy {
            font-size: 15px;
            line-height: 1.2;
            white-space: nowrap;
          }
          .trust-marquee { mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); }
        }
      `}</style>
    </section>
  );
}
