import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Benefits() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-heading">
      <div className="benefits-grid">
        <article className="benefit-intro">
          <span className="benefit-pill">Why choose Huipper?</span>
          <h2 id="benefits-heading">More than developers<br />We&apos;re your tech partners</h2>
          <Link className="benefit-cta-btn" href="#contact">
            <span>Let&apos;s talk strategy</span>
            <i><ArrowRight /></i>
          </Link>
        </article>

        <article className="benefit-box benefit-strategy">
          <h3>Strategy first approach</h3>
          <p>We align every build with your long-term business goals.</p>
          <div className="strategy-map" aria-label="Huipper strategy process">
            <span>Understand the vision</span>
            <span>Craft a winning strategy</span>
            <strong>Build with Purpose<small>We develop with strategy in mind</small></strong>
            <span>Measure &amp; Optimize</span>
          </div>
        </article>

        <article className="benefit-box benefit-code">
          <h3>Reliable &amp; scalable code</h3>
          <p>Our engineers deliver future-proof, maintainable products.</p>
          <div className="code-window" aria-label="Example of maintainable code">
            <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            <code>
              <em>{"// Built for scale by Huipper"}</em><br />
              <span>function</span> ProductButton(label) &#123;<br />
              &nbsp;&nbsp;return &lt;Button variant=&quot;primary&quot;&gt;&#123;label&#125;&lt;/Button&gt;;<br />
              &#125;
            </code>
          </div>
        </article>

        <article className="benefit-box benefit-testing">
          <h3>Full cycle testing</h3>
          <p>Quality assurance is embedded throughout the lifecycle—not added at the end.</p>
          <div className="testing-art" aria-hidden="true"><span /></div>
        </article>

        <article className="benefit-box benefit-communication">
          <h3>Transparent communication</h3>
          <p>Weekly updates, live demos, and real-time collaboration.</p>
          <div className="communication-grid" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        </article>
      </div>

      <style>{`
        .benefits-section {
          width: 100%;
          background: #fff;
          color: #1c1c1f;
        }

        .benefits-grid {
          display: grid;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          grid-template-columns: repeat(3,minmax(0,1fr));
          grid-template-rows: minmax(340px, auto) 330px;
          gap: 26px;
        }

        .benefit-intro,
        .benefit-box {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(59,44,120,.08);
          border-radius: 17px;
          background: #fff;
          box-shadow: 0 8px 28px rgba(33,27,77,.065),0 2px 7px rgba(33,27,77,.035);
        }

        .benefit-intro {
          grid-column: 1 / 3;
          padding: 38px 44px 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          isolation: isolate;
        }

        .benefit-intro::before {
          position: absolute;
          z-index: -1;
          top: -106px;
          right: -36px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: conic-gradient(from 215deg,#fff 0deg,#f4a7ee 80deg,#bd75ef 146deg,#2468ef 218deg,#fff 300deg);
          filter: blur(28px);
          opacity: .82;
          content: "";
        }

        .benefit-pill {
          display: flex;
          width: max-content;
          height: 29px;
          padding: 0 18px;
          align-items: center;
          border-radius: 999px;
          background: #ebe4fb;
          color: #30284b;
          font-size: 11px;
        }

        .benefit-intro h2 {
          margin: 20px 0 0;
          font-size: clamp(38px,3.8vw,54px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -2px;
        }

        .benefit-cta-btn {
          display: inline-flex;
          width: auto;
          min-width: 196px;
          height: 46px;
          margin-top: 32px;
          padding: 0 6px 0 20px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7553c8 0%, #5c3ba6 100%);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(33, 27, 77, 0.28), 0 2px 10px rgba(117, 83, 200, 0.35);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .benefit-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(33, 27, 77, 0.35), 0 4px 14px rgba(117, 83, 200, 0.5);
        }
        .benefit-cta-btn i {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #7553c8;
          transition: transform 180ms ease;
        }
        .benefit-cta-btn i svg {
          width: 15px;
          height: 15px;
          stroke-width: 1.6;
        }
        .benefit-cta-btn:hover i {
          transform: translateX(2px);
        }

        .benefit-box { padding: 28px 25px 24px; }
        .benefit-box h3 { margin: 0; font-size: 20px; font-weight: 400; line-height: 1.2; letter-spacing: -.65px; }
        .benefit-box > p { max-width: 290px; margin: 8px 0 0; color: #747477; font-size: 13px; line-height: 1.55; }

        .strategy-map {
          position: absolute;
          right: 25px;
          bottom: 24px;
          left: 25px;
          display: flex;
          height: 160px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 14px;
          background: #f4f5f8;
        }
        .strategy-map::before { position: absolute; top: 40px; bottom: 40px; left: 26%; width: 1px; background: #dcdde3; content: ""; }
        .strategy-map span { position: relative; z-index: 1; min-width: 112px; margin: 2px 0; padding: 4px 9px; border-radius: 5px; background: #fff; box-shadow: 0 2px 8px rgba(20,20,28,.05); font-size: 8px; text-align: center; }
        .strategy-map strong { position: relative; z-index: 2; display: grid; width: 145px; margin: 2px 0; padding: 9px 10px; gap: 5px; border-radius: 7px; background: #1d1d20; color: #fff; font-size: 9px; font-weight: 400; text-align: center; box-shadow: 0 8px 20px rgba(20,20,25,.18); }
        .strategy-map strong small { color: #aaa9ae; font-size: 7px; font-weight: 400; }

        .code-window,
        .testing-art {
          position: absolute;
          right: 25px;
          bottom: 24px;
          left: 25px;
          height: 180px;
          border-radius: 13px;
          background: #f1f2f6;
        }
        .window-dots { display: flex; padding: 14px 12px 0; gap: 7px; }
        .window-dots i { width: 10px; height: 10px; border-radius: 50%; background: #f36b62; }
        .window-dots i:nth-child(2) { background: #f2c24d; }
        .window-dots i:nth-child(3) { background: #58c76e; }
        .code-window code { display: block; padding: 24px 14px 0; color: #22232a; font-family: Arial,Helvetica,sans-serif; font-size: 10px; line-height: 1.55; }
        .code-window code em { color: #66c66a; font-style: normal; }
        .code-window code span { color: #7553c8; }

        .testing-art { display: grid; place-items: center; }
        .testing-art::before { position: absolute; inset: 0; border-radius: inherit; background-image: radial-gradient(circle,rgba(117,83,200,.18) 1px,transparent 1px); background-size: 7px 7px; opacity: .28; content: ""; mask-image: radial-gradient(circle,#000,transparent 64%); }
        .testing-art span { position: relative; width: 120px; height: 125px; background: linear-gradient(145deg,#7967d7,#eff084 54%,#b574e8); clip-path: polygon(8% 8%,93% 33%,64% 47%,89% 72%,53% 100%,31% 58%,0 40%); filter: drop-shadow(0 14px 14px rgba(74,52,134,.2)); transform: rotate(9deg); }
        .testing-art span::after { position: absolute; inset: 0; background-image: radial-gradient(circle,rgba(33,27,77,.6) 1px,transparent 1.5px); background-size: 5px 5px; content: ""; }

        .communication-grid {
          position: absolute;
          right: 25px;
          bottom: 24px;
          left: 25px;
          display: grid;
          height: 188px;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 11px;
        }
        .communication-grid span { border-radius: 13px; background: #f1f2f6; }
        .communication-grid span:nth-child(2) { border: 1px solid #e1e2e7; background: #fff; box-shadow: inset 0 0 0 3px #f6f7f9; transform: rotate(-1.5deg); }

        @media (max-width: 980px) {
          .benefits-grid { grid-template-columns: repeat(2,1fr); grid-template-rows: auto auto auto; gap: 20px; }
          .benefit-intro { grid-column: 1 / 3; padding: 36px 32px 38px; }
          .benefit-strategy { grid-column: 1; min-height: 330px; }
          .benefit-code { grid-column: 2; min-height: 330px; }
          .benefit-testing { grid-column: 1; min-height: 330px; }
          .benefit-communication { grid-column: 2; min-height: 330px; }
          .benefit-intro h2 { font-size: clamp(34px,5vw,46px); }
        }

        @media (max-width: 620px) {
          .benefits-grid { display: flex; flex-direction: column; gap: 16px; }
          .benefit-intro { min-height: auto; padding: 32px 24px 36px; }
          .benefit-intro h2 { font-size: clamp(32px,8.5vw,42px); letter-spacing: -1.6px; }
          .benefit-intro > a { margin-top: 28px; }
          .benefit-box { min-height: 330px; padding: 25px 21px; }
          .strategy-map,.code-window,.testing-art,.communication-grid { right: 21px; bottom: 21px; left: 21px; }
        }
      `}</style>
    </section>
  );
}
