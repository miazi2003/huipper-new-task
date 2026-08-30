import { LifeBuoy, Network, RefreshCw, Search } from "lucide-react";

const capabilities = [
  {
    title: "Discovery & Product Strategy",
    description: "Huipper uncovers user needs, business goals, and market opportunities to define a focused product direction before design begins.",
    Icon: Search,
  },
  {
    title: "End-to-End Product Design",
    description: "From early concepts and user flows to polished interfaces, Huipper shapes every touchpoint into one clear, cohesive experience.",
    Icon: RefreshCw,
  },
  {
    title: "Scalable Design Systems",
    description: "We create reusable foundations that keep products consistent, speed up delivery, and help growing teams work with confidence.",
    Icon: Network,
  },
  {
    title: "Launch & Ongoing Support",
    description: "Huipper works alongside your team through handoff, launch, iteration, and continuous product improvement after release.",
    Icon: LifeBuoy,
  },
] as const;

export default function HuipperProcess() {
  return (
    <section className="hp-section" aria-labelledby="huipper-process-heading">
      <div className="hp-inner">
        <h2 id="huipper-process-heading">
          From discovery and product strategy to design, launch, and support—
          <br />
          Huipper stays with your team through every stage of the journey.
        </h2>

        <div className="hp-capabilities">
          {capabilities.map(({ title, description, Icon }) => (
            <article className="hp-capability" key={title}>
              <span className="hp-icon" aria-hidden="true"><Icon /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .hp-section {
          width: 100%;
          overflow: hidden;
          background: #fff;
          color: #111;
        }

        .hp-inner {
          width: min(1240px, calc(100% - 64px));
          margin: 0 auto;
        }

        .hp-section h2 {
          max-width: 980px;
          margin: 0 auto;
          font-size: clamp(34px, 3.15vw, 48px);
          font-weight: 500;
          line-height: 1.13;
          letter-spacing: -1.8px;
          text-align: center;
        }

        .hp-capabilities {
          display: grid;
          margin-top: 96px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .hp-capability {
          min-height: 270px;
          padding: 0 38px;
          border-left: 1px solid #e7e1ef;
        }

        .hp-capability:first-child { padding-left: 0; border-left: 0; }
        .hp-capability:last-child { padding-right: 0; }

        .hp-icon {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          color: #6845b8;
        }

        .hp-icon svg {
          width: 37px;
          height: 37px;
          stroke-width: 1.65;
        }

        .hp-capability h3 {
          max-width: 250px;
          margin: 29px 0 0;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -.55px;
        }

        .hp-capability p {
          max-width: 260px;
          margin: 18px 0 0;
          color: #595567;
          font-size: 16px;
          line-height: 1.52;
        }

        @media (max-width: 900px) {
          .hp-inner { width: min(720px, calc(100% - 40px)); }
          .hp-section h2 { max-width: 720px; }
          .hp-capabilities { margin-top: 72px; grid-template-columns: repeat(2, 1fr); gap: 56px 0; }
          .hp-capability { min-height: 235px; padding: 0 32px; }
          .hp-capability:nth-child(3) { padding-left: 0; border-left: 0; }
        }

        @media (max-width: 560px) {
          .hp-inner { width: calc(100% - 36px); }
          .hp-section h2 { font-size: 32px; line-height: 1.16; letter-spacing: -1.15px; }
          .hp-section h2 br { display: none; }
          .hp-capabilities { margin-top: 60px; grid-template-columns: 1fr; gap: 0; }
          .hp-capability,
          .hp-capability:first-child,
          .hp-capability:nth-child(3) {
            min-height: 0;
            padding: 28px 0;
            border-top: 1px solid #e7e1ef;
            border-left: 0;
          }
          .hp-capability:first-child { padding-top: 0; border-top: 0; }
          .hp-capability h3,
          .hp-capability p { max-width: 100%; }
          .hp-capability h3 { font-size: 20px; }
          .hp-capability p { font-size: 15px; }
        }
      `}</style>
    </section>
  );
}
