import {
  BriefcaseBusiness,
  Check,
  Paintbrush,
  Smile,
  UserRoundPen,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

type ComparisonRow = {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  status: boolean[];
};

const alternatives: ComparisonRow[] = [
  {
    title: "In House Team",
    description: <>A full-time designer may ensure brand<br />consistency, but there’s a risk of limited<br />expertise even though you pay regularly</>,
    icon: UsersRound,
    status: [false, false, false, true, false],
  },
  {
    title: "Creative Agencies",
    description: <>Agencies offer structured processes but<br />mostly with high costs, long timelines, and<br />less flexibility for your projects</>,
    icon: Paintbrush,
    status: [false, false, true, true, false],
  },
  {
    title: "Freelancers",
    description: <>Freelancers may provide affordable design<br />services but they mostly lack consistency,<br />reliability, and collaboration</>,
    icon: UserRoundPen,
    status: [false, true, false, false, true],
  },
  {
    title: "Self-Service Tools",
    description: <>DIY tools like website builders are budget-<br />friendly, but you can’t expect strategic<br />thinking &amp; originality</>,
    icon: BriefcaseBusiness,
    status: [false, false, true, true, false],
  },
];

function StatusIcon({ available }: { available: boolean }) {
  return (
    <span className={available ? "comparison-status comparison-check" : "comparison-status comparison-cross"} aria-label={available ? "Available" : "Unavailable"}>
      {available ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="comparison-section" aria-labelledby="comparison-heading">
      <header className="comparison-header">
        <p>Why Choose Us</p>
        <h2 id="comparison-heading">
          <em>Design Monks’s</em> Alternative?<br />
          <em>Think</em> One More Time!
        </h2>
      </header>

      <div className="comparison-scroll">
        <div className="comparison-table" role="table" aria-label="Design service comparison">
          <div className="comparison-columns" role="row">
            <span role="columnheader">Platform</span>
            <span role="columnheader">Speed</span>
            <span role="columnheader">Flexibility</span>
            <span role="columnheader">Quality</span>
            <span role="columnheader">Scalability</span>
            <span role="columnheader">Affordability</span>
          </div>

          <div className="comparison-row comparison-featured" role="row">
            <div className="comparison-platform" role="cell">
              <span className="comparison-brand-icon"><Smile aria-hidden="true" /></span>
              <div>
                <h3>Design Monks</h3>
                <p>Expert-driven &amp; committed to higher quality.<br />Get effective result &amp; full support without<br />hiring in-house employees</p>
              </div>
            </div>
            {[true, true, true, true, true].map((available, index) => <StatusIcon available={available} key={index} />)}
          </div>

          {alternatives.map((row) => {
            const Icon = row.icon;
            return (
              <div className="comparison-row comparison-alternative" role="row" key={row.title}>
                <div className="comparison-platform" role="cell">
                  <span className="comparison-alt-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    <h3>{row.title}</h3>
                    <p>{row.description}</p>
                  </div>
                </div>
                {row.status.map((available, index) => <StatusIcon available={available} key={index} />)}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .comparison-section {
          position: relative;
          margin: 100px 0 16px;
          padding: 100px 0 94px;
          overflow: hidden;
          border-radius: 32px;
          background:
            radial-gradient(ellipse 58% 30% at 50% 8%, rgba(10, 82, 54, 0.34), transparent 72%),
            radial-gradient(ellipse 82% 62% at 50% 35%, rgba(4, 35, 25, 0.22), transparent 70%),
            linear-gradient(180deg, #090c0b 0%, #080908 44%, #090909 100%);
          color: #f7f7f7;
        }

        .comparison-section::after {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.28) 100%);
          content: "";
        }

        .comparison-header {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .comparison-header > p {
          display: flex;
          width: max-content;
          min-height: 35px;
          margin: 0 auto 22px;
          padding: 6px 14px;
          align-items: center;
          border: 1px solid #008e50;
          border-radius: 999px;
          color: #12bd6e;
          font-size: 15px;
          line-height: 1;
        }

        .comparison-header h2 {
          margin: 0;
          font-size: clamp(44px, 3.55vw, 54px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -1.8px;
        }

        .comparison-header h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .comparison-scroll {
          position: relative;
          z-index: 1;
          width: 100%;
          overflow-x: auto;
          scrollbar-color: #44376b transparent;
          scrollbar-width: thin;
        }

        .comparison-table {
          width: min(1252px, calc(100% - 64px));
          min-width: 1000px;
          margin: 47px auto 0;
        }

        .comparison-columns,
        .comparison-row {
          display: grid;
          grid-template-columns: minmax(500px, 4fr) repeat(5, minmax(110px, 1fr));
          align-items: center;
        }

        .comparison-columns {
          height: 50px;
          padding: 0 40px;
          font-size: 19px;
          font-weight: 700;
        }

        .comparison-columns span:not(:first-child) { text-align: center; }

        .comparison-row {
          min-height: 198px;
          padding: 0 40px;
        }

        .comparison-featured {
          min-height: 168px;
          border: 1.5px solid rgba(108, 80, 255, 0.82);
          border-radius: 29px;
          background:
            radial-gradient(circle at 88% 15%, rgba(104, 53, 183, 0.3), transparent 32%),
            linear-gradient(105deg, #171127 0%, #100d1c 52%, #19102c 100%);
          box-shadow: inset 0 1px 18px rgba(102, 70, 205, 0.08);
        }

        .comparison-alternative { border-bottom: 1px solid rgba(255,255,255,.12); }
        .comparison-alternative:last-child { border-bottom: 0; }

        .comparison-platform { display: flex; align-items: center; gap: 24px; }
        .comparison-platform h3 { margin: 0 0 8px; font-size: 24px; line-height: 1.1; letter-spacing: -0.5px; }
        .comparison-platform p { margin: 0; color: #f0f0f0; font-size: 16px; font-weight: 500; line-height: 1.55; }

        .comparison-brand-icon,
        .comparison-alt-icon {
          display: grid;
          width: 85px;
          height: 85px;
          flex: none;
          place-items: center;
          border-radius: 11px;
        }

        .comparison-brand-icon { background: linear-gradient(145deg, #7438ff, #8137ff); }
        .comparison-brand-icon svg { width: 39px; height: 39px; padding: 5px; border-radius: 9px; background: #f3eeff; color: #7940ff; stroke-width: 1.7; }
        .comparison-alt-icon { background: #0b315e; }
        .comparison-alt-icon svg { width: 34px; height: 34px; color: #fff; stroke-width: 1.6; }

        .comparison-status { display: grid; place-items: center; }
        .comparison-status svg { width: 35px; height: 35px; stroke-width: 1.8; }
        .comparison-check { color: #f4f4f4; }
        .comparison-cross { color: #ff383d; }

        @media (max-width: 1100px) {
          .comparison-section { margin-top: 72px; padding-top: 82px; }
          .comparison-table { width: calc(100% - 48px); }
          .comparison-columns, .comparison-row { grid-template-columns: minmax(440px, 4fr) repeat(5, minmax(105px, 1fr)); }
          .comparison-row { padding: 0 28px; }
          .comparison-columns { padding: 0 28px; }
        }

        @media (max-width: 700px) {
          .comparison-section { margin: 64px 0 12px; padding: 68px 0 72px; border-radius: 24px; }
          .comparison-header { padding: 0 18px; }
          .comparison-header > p { min-height: 31px; margin-bottom: 18px; font-size: 13px; }
          .comparison-header h2 { font-size: clamp(34px, 10vw, 44px); line-height: 1.08; }
          .comparison-scroll { padding-bottom: 12px; }
          .comparison-table { width: 1000px; margin: 38px 16px 0; }
          .comparison-row { min-height: 178px; }
          .comparison-featured { min-height: 158px; }
        }
      `}</style>
    </section>
  );
}
