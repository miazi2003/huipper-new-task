import Image from "next/image";

const topLabels = ["Social Media", "Framer", "Branding", "Dashboard", "Logos", "Webflow", "Slide Decks", "Mobile Apps", "Figma"];
const bottomLabels = ["Logos", "Webflow", "Slide Decks", "Mobile Apps", "Figma", "Social Media", "Framer", "Branding", "Dashboard"];

const projects = [
  { image: "/images/hero/the-gridline.png", alt: "The Gridline furniture brand project", width: 520 },
  { image: "/images/hero/oter.png", alt: "Oter mobile product project", width: 235 },
  { image: "/images/hero/affine.png", alt: "Affine financial technology project", width: 520 },
  { image: "/images/hero/fitmate.png", alt: "Fitmate mobile application project", width: 235 },
  { image: "/images/hero/gummiz.jpg", alt: "Gummiz digital product project", width: 350 },
  { image: "/images/hero/plentypay.png", alt: "Plentypay financial product project", width: 475 },
  { image: "/images/hero/oh-my-coffee.png", alt: "Oh My Coffee brand project", width: 350 },
];

function TextSequence({ labels }: { labels: string[] }) {
  return (
    <div className="resources-text-set">
      {labels.map((label) => (
        <span key={label}>{label}<i aria-hidden="true">•</i></span>
      ))}
    </div>
  );
}

function ProjectSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="resources-project-set" aria-hidden={duplicate || undefined}>
      {projects.map((project) => (
        <figure className="resources-project" style={{ width: `${project.width}px` }} key={project.image}>
          <Image src={project.image} alt={duplicate ? "" : project.alt} fill sizes={`${project.width}px`} />
        </figure>
      ))}
    </div>
  );
}

export default function ResourcesShowcase() {
  return (
    <section className="resources-section" aria-label="Selected design capabilities and projects">
      <div className="resources-row resources-text-row">
        <div className="resources-text-track resources-track-rtl">
          <TextSequence labels={topLabels} />
          <TextSequence labels={topLabels} />
        </div>
      </div>

      <div className="resources-row resources-project-row">
        <div className="resources-project-track">
          <ProjectSequence />
          <ProjectSequence duplicate />
        </div>
      </div>

      <div className="resources-row resources-text-row">
        <div className="resources-text-track resources-track-ltr">
          <TextSequence labels={bottomLabels} />
          <TextSequence labels={bottomLabels} />
        </div>
      </div>

      <style>{`
        .resources-section {
          width: 100%;
          padding: 103px 0 107px;
          padding-right: 0 !important;
          padding-left: 0 !important;
          overflow: hidden;
          background: #eee9fa;
          color: #101010;
        }

        .resources-row {
          width: 100%;
          overflow: hidden;
        }

        .resources-text-row { height: 36px; }

        .resources-text-track,
        .resources-project-track {
          display: flex;
          width: max-content;
          backface-visibility: hidden;
          will-change: transform;
        }

        .resources-text-set {
          display: flex;
          padding-right: 41px;
          align-items: center;
          flex: none;
          gap: 41px;
        }

        .resources-text-set span {
          display: flex;
          align-items: center;
          gap: 41px;
          font-size: 25px;
          font-weight: 500;
          line-height: 36px;
          white-space: nowrap;
        }

        .resources-text-set i {
          font-size: 21px;
          font-style: normal;
          line-height: 1;
        }

        .resources-track-rtl { animation: resources-text-rtl 20s linear infinite; }
        .resources-track-ltr { animation: resources-text-ltr 22s linear infinite; }

        .resources-project-row {
          width: auto;
          height: 395px;
          margin: 68px 0 67px;
        }
        .resources-project-track { animation: resources-project-rtl 110s linear infinite; }

        .resources-project-set {
          display: flex;
          height: 395px;
          padding-right: 36px;
          align-items: stretch;
          flex: none;
          gap: 36px;
        }

        .resources-project {
          position: relative;
          height: 395px;
          margin: 0;
          flex: none;
          overflow: hidden;
          border: 3px solid #1c1c1c;
          border-radius: 24px;
          background: #111;
        }

        .resources-project img { object-fit: cover; }

        @keyframes resources-text-rtl {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes resources-text-ltr {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @keyframes resources-project-rtl {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 900px) {
          .resources-section { padding: 82px 0 88px; }
          .resources-text-set { gap: 32px; padding-right: 32px; }
          .resources-text-set span { gap: 32px; font-size: 22px; }
          .resources-project-row { height: 320px; margin: 54px 0; }
          .resources-project-set { height: 320px; gap: 28px; padding-right: 28px; }
          .resources-project { width: auto !important; height: 320px; aspect-ratio: 1.25; border-radius: 20px; }
          .resources-project:nth-child(2), .resources-project:nth-child(4) { aspect-ratio: .62; }
        }

        @media (max-width: 600px) {
          .resources-section { padding: 64px 0 70px; }
          .resources-text-row { height: 30px; }
          .resources-text-set { gap: 25px; padding-right: 25px; }
          .resources-text-set span { gap: 25px; font-size: 19px; line-height: 30px; }
          .resources-text-set i { font-size: 16px; }
          .resources-project-row { height: 250px; margin: 43px 0; }
          .resources-project-set { height: 250px; gap: 20px; padding-right: 20px; }
          .resources-project { height: 250px; border-width: 2px; border-radius: 16px; }
          .resources-track-rtl { animation-duration: 18s; }
          .resources-track-ltr { animation-duration: 19s; }
          .resources-project-track { animation-duration: 100s; }
        }
      `}</style>
    </section>
  );
}
