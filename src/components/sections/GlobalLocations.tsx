import { globalLocations } from "@/data/locations";

const videoSrc = "https://designmonks.b-cdn.net/Website%20Design%20Videos/footer_globe.mp4";

export default function GlobalLocations() {
  return (
    <section className="locations-section" aria-label="Our global locations">
      <video
        className="locations-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/global-locations/earth-poster.png"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="locations-grade" aria-hidden="true" />

      <div className="locations-grid">
        {globalLocations.map((location) => (
          <article className="location-card" key={location.country}>
            <h2>{location.country}</h2>
            <address>{location.address.map((line) => <span key={line}>{line}</span>)}</address>
          </article>
        ))}
      </div>

      <style>{`
        .locations-section {
          position: relative;
          width: 100%;
          height: 900px;
          overflow: hidden;
          background: #020711;
        }

        .locations-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          object-position: center center;
        }

        .locations-grade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 18% at 50% 31%, rgba(27, 225, 240, .12), transparent 72%),
            linear-gradient(180deg, rgba(0, 9, 29, .03) 0%, transparent 46%, rgba(0, 3, 10, .34) 100%),
            linear-gradient(90deg, rgba(0,0,0,.12), transparent 18%, transparent 82%, rgba(0,0,0,.12));
          pointer-events: none;
        }

        .locations-grid {
          position: absolute;
          z-index: 2;
          top: 58.5%;
          left: 50%;
          display: grid;
          width: 956px;
          grid-template-columns: repeat(4, 221px);
          gap: 23px 24px;
          transform: translateX(-50%);
        }

        .location-card {
          display: flex;
          width: 13.75rem;
          height: 100px;
          padding: .7rem;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: .5px solid #fff3;
          border-radius: 1rem;
          background: transparent;
          color: #fff;
          text-align: center;
          -webkit-backdrop-filter: blur(56px);
          backdrop-filter: blur(56px);
          box-shadow: -2px -2px 0 -1.75px #ffffff96, 2px 2px 0 -1.75px #ffffff96;
        }

        .location-card h2 {
          margin: 0 0 7px;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -.35px;
        }

        .location-card address {
          margin: 0;
          color: #aeb8c5;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 1.45;
        }

        .location-card address span { display: block; }

        @media (max-width: 1050px) {
          .locations-section { height: 920px; }
          .locations-video { object-position: center center; }
          .locations-grid {
            top: 43%;
            width: min(700px, calc(100% - 48px));
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
          .location-card { width: 100%; }
        }

        @media (max-width: 600px) {
          .locations-section { height: 1000px; }
          .locations-video { object-position: center center; }
          .locations-grade { background: linear-gradient(180deg, rgba(0,8,25,.08), rgba(0,3,10,.48)); }
          .locations-grid { top: 39%; width: calc(100% - 24px); gap: 12px 10px; }
          .location-card { height: 118px; padding: 11px 8px; border-radius: 14px; }
          .location-card h2 { font-size: 17px; }
          .location-card address { font-size: 12px; line-height: 1.4; }
        }
      `}</style>
    </section>
  );
}
