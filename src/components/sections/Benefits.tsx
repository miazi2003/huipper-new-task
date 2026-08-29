const team = [
  { initials: "SD", name: "Sourov Dhali", role: "Product Designer", tags: ["UX Specialist", "Design System"] },
  { initials: "TA", name: "Tanvir Ahmed", role: "Creative Director", tags: ["Brand Design", "Design Direction"] },
  { initials: "AA", name: "Azaz Ahamed", role: "Sr Product Designer", tags: ["UX Consultant", "SaaS Design"] },
  { initials: "SA", name: "Sajib Ahmed", role: "SEO Manager", tags: ["Growth Marketing", "SEO Strategy"] },
];

const orbitPeople = ["SD", "TA", "AA", "SA", "RD", "MF", "AR"];

function Avatar({ initials }: { initials: string }) {
  return <span className="benefit-avatar" aria-hidden="true">{initials}</span>;
}

export default function Benefits() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-heading">
      <header className="benefits-header">
        <p>Why Choose Us</p>
        <h2 id="benefits-heading">
          Unmatched <em>Benefits</em> For<br /><em>Your</em> Success
        </h2>
      </header>

      <div className="benefits-grid">
        <article className="benefit-card benefit-payment">
          <h3>Flexible Payment Plans</h3>
          <p>Pay your way</p>
          <div className="benefit-plans" aria-label="Available billing periods">
            <span>Monthly</span><span>Quarterly</span><span>Annually</span>
          </div>
          <ul>
            <li>No commitment</li>
            <li>Cancel anytime</li>
          </ul>
          <div className="payment-art" aria-hidden="true">
            <span className="payment-card payment-card-one"><b>VISA</b><i>4455 5451 6119 6164</i></span>
            <span className="payment-card payment-card-two"><b>VISA</b><i>4455 5451 6119 6164</i></span>
            <span className="payment-card payment-card-three"><b>VISA</b><i>5455 5451 6119 6164</i></span>
          </div>
        </article>

        <article className="benefit-card benefit-revisions">
          <h3>Unlimited revision</h3>
          <p>Enjoy unlimited revisions and lifetime support,<br />ensuring your satisfaction at every stage.</p>
          <div className="revision-panel">
            <div className="revision-toolbar">
              <strong><span>#</span> Landing Animation Feedback</strong>
              <span className="revision-members"><Avatar initials="SD" /><Avatar initials="TA" /> 3+ ⋮</span>
            </div>
            <div className="revision-message">
              <Avatar initials="AH" />
              <p><b>Abid Hasan</b><small>Today at 2:47 PM</small><br /><span>Hey team, is the landing feedback finalized?</span></p>
            </div>
            <div className="revision-message">
              <Avatar initials="H" />
              <p><b>Hafij</b><small>Today at 2:55 PM</small><br /><span>Yep, all set up ready for <mark>@RubenDao</mark></span><br /><i>👍 2</i></p>
            </div>
            <div className="revision-message">
              <Avatar initials="AH" />
              <p><b>Abid Hasan</b><small>Today at 3:03 PM</small><br /><span>Excited to see this rolled out 🙌</span></p>
            </div>
          </div>
        </article>

        <article className="benefit-card benefit-support">
          <h3>Lifetime Support</h3>
          <p>Enjoy unlimited revisions and lifetime support, ensuring your satisfaction at every stage.</p>
          <div className="support-panel">
            <span>✓ Ongoing updates</span>
            <span>✓ Priority response handling</span>
            <span>✓ 24/7 expert assistance</span>
          </div>
        </article>

        <div className="benefit-card benefit-combined">
          <article className="benefit-diverse">
            <div className="skill-roster">
              <h3>Diverse Skill Set</h3>
              {team.map((member) => (
                <div className="skill-row" key={member.name}>
                  <Avatar initials={member.initials} />
                  <p><b>{member.name}</b><small>{member.role}</small></p>
                  <span>{member.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="benefit-resources">
            <h3>Hand Picked Resources</h3>
            <p>Explore a wide array of thoughtfully curated resources that showcase the rich diversity and unique perspectives from various regions</p>
            <div className="resource-orbit" aria-hidden="true">
              {orbitPeople.map((person, index) => <Avatar initials={person} key={`${person}-${index}`} />)}
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .benefits-section {
          padding: 68px 24px 96px;
          background: #fbfbfb;
          color: #181818;
        }

        .benefits-header { text-align: center; }

        .benefits-header > p {
          display: flex;
          width: max-content;
          min-height: 31px;
          margin: 0 auto 21px;
          padding: 5px 13px;
          align-items: center;
          border: 1px solid #00bd68;
          border-radius: 999px;
          color: #009c58;
          font-size: 14px;
          line-height: 1;
        }

        .benefits-header h2 {
          margin: 0;
          font-size: clamp(44px, 3.5vw, 52px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -2px;
        }

        .benefits-header h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .benefits-grid {
          display: grid;
          width: min(1040px, 100%);
          margin: 58px auto 0;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          grid-template-rows: 392px 405px;
          gap: 16px;
        }

        .benefit-card {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
        }

        .benefit-card h3 { margin: 0; font-size: 20px; line-height: 1.2; letter-spacing: -0.35px; }
        .benefit-card > p { margin: 9px 0 0; color: #41475a; font-size: 15px; line-height: 1.55; }

        .benefit-payment {
          grid-column: 1 / 6;
          grid-row: 1;
          padding: 25px;
          background:
            radial-gradient(circle at 82% 73%, rgba(164, 255, 211, 0.72), transparent 23%),
            radial-gradient(circle at 45% 105%, rgba(127, 79, 255, 0.42), transparent 44%),
            linear-gradient(145deg, #dbe8ff, #c7d5fc);
        }

        .benefit-plans { display: flex; gap: 9px; margin-top: 24px; }
        .benefit-plans span { padding: 11px 19px; border-radius: 9px; background: rgba(255,255,255,.72); font-size: 13px; }

        .benefit-payment ul {
          position: relative;
          z-index: 3;
          margin: 25px 0 0;
          padding: 0;
          color: #505269;
          font-size: 15px;
          line-height: 1.65;
          list-style: none;
        }

        .benefit-payment li::before { margin-right: 9px; color: #7b3cff; content: "●"; font-size: 11px; }

        .payment-art { position: absolute; right: -36px; bottom: -34px; width: 340px; height: 238px; }
        .payment-card {
          position: absolute;
          display: flex;
          width: 276px;
          height: 95px;
          padding: 20px 25px;
          align-items: flex-start;
          justify-content: space-between;
          border: 1px solid rgba(255,255,255,.72);
          border-radius: 14px;
          background: linear-gradient(130deg, rgba(255,255,255,.76), rgba(215,255,231,.4));
          color: #7044ff;
          box-shadow: 0 10px 22px rgba(65,64,137,.12);
          transform: rotate(-28deg);
        }
        .payment-card b { font-size: 21px; font-style: italic; }
        .payment-card i { color: rgba(255,255,255,.92); font-size: 12px; font-style: normal; }
        .payment-card-one { top: 5px; left: 45px; }
        .payment-card-two { top: 76px; left: 21px; }
        .payment-card-three { top: 147px; left: -3px; }

        .benefit-revisions {
          grid-column: 6 / 11;
          grid-row: 1;
          padding: 25px 25px 0;
          background:
            radial-gradient(circle, rgba(117,155,219,.12) 1px, transparent 1px) 0 0 / 5px 5px,
            linear-gradient(145deg, #d9eaff, #c3e4ff);
        }

        .revision-panel { position: absolute; right: 0; bottom: 0; left: 23px; height: 267px; overflow: hidden; border-radius: 13px 0 12px 0; background: #222; color: #f5f5f5; box-shadow: 0 0 0 3px rgba(62,147,255,.32); }
        .revision-toolbar { display: flex; height: 55px; padding: 0 17px; align-items: center; justify-content: space-between; background: #303136; font-size: 16px; }
        .revision-toolbar strong span { margin-right: 11px; font-size: 20px; }
        .revision-members { display: flex; align-items: center; gap: 2px; font-size: 14px; }
        .revision-members .benefit-avatar { width: 24px; height: 24px; margin-left: -8px; font-size: 7px; }
        .revision-message { display: flex; gap: 12px; padding: 17px 17px 0; align-items: flex-start; }
        .revision-message .benefit-avatar { flex: none; }
        .revision-message p { margin: 0; font-size: 13px; line-height: 1.5; }
        .revision-message small { margin-left: 7px; color: #8d8e93; font-size: 10px; }
        .revision-message p span { color: #b7b7ba; }
        .revision-message mark { background: none; color: #29bcff; }
        .revision-message i { display: inline-block; margin-top: 4px; padding: 1px 5px; border-radius: 3px; background: #454548; font-style: normal; }

        .benefit-avatar {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 1.5px solid #fff;
          border-radius: 50%;
          background: linear-gradient(145deg, #311765, #151820);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          box-shadow: 0 2px 7px rgba(42,28,92,.25);
        }

        .benefit-support {
          grid-column: 1 / 4;
          grid-row: 2;
          padding: 25px 24px;
          background: linear-gradient(150deg, #7241ff 0%, #7d32ff 65%, #8b4eff 100%);
          color: #fff;
        }
        .benefit-support > p { max-width: 250px; color: #fff; font-weight: 600; }
        .support-panel { position: absolute; right: 0; bottom: 0; left: 24px; height: 190px; padding: 24px; border-radius: 12px 0 0 0; background: linear-gradient(145deg, #202124, #353537); box-shadow: 0 -12px 20px rgba(255,255,255,.18); }
        .support-panel span { display: block; width: max-content; margin-bottom: 11px; padding: 10px 13px; border: 1px solid #55565a; border-radius: 7px; background: #3c3d41; color: #cdcdcf; font-size: 14px; }

        .benefit-combined {
          display: grid;
          grid-column: 4 / 11;
          grid-row: 2;
          grid-template-columns: 43% 57%;
          background:
            radial-gradient(circle, rgba(117,155,219,.12) 1px, transparent 1px) 0 0 / 5px 5px,
            linear-gradient(145deg, #d8e8ff, #c9dbfb);
        }

        .benefit-diverse { padding: 24px 0 22px 24px; }
        .skill-roster { height: 285px; padding: 22px 19px; border-radius: 13px; background: #fff; box-shadow: 0 12px 28px rgba(62,93,149,.1); }
        .skill-roster h3 { margin-bottom: 16px; }
        .skill-row { display: grid; grid-template-columns: 34px minmax(98px,1fr) auto; gap: 8px; margin-bottom: 12px; align-items: center; }
        .skill-row .benefit-avatar { width: 30px; height: 30px; font-size: 7px; }
        .skill-row p { margin: 0; font-size: 11px; line-height: 1.15; }
        .skill-row p b, .skill-row p small { display: block; }
        .skill-row p small { color: #444; font-size: 9px; }
        .skill-row > span { display: grid; gap: 2px; }
        .skill-row i { min-width: 66px; padding: 2px 5px; background: #e3eff9; color: #567187; font-size: 7px; font-style: normal; text-align: center; }

        .benefit-resources { position: relative; padding: 25px 24px; overflow: hidden; }
        .benefit-resources > p { margin: 11px 0 0; color: #424a5e; font-size: 15px; line-height: 1.5; }
        .resource-orbit { position: absolute; right: -56px; bottom: -206px; width: 412px; height: 412px; border: 1px solid rgba(255,255,255,.72); border-radius: 50%; }
        .resource-orbit::before, .resource-orbit::after { position: absolute; border: 1px solid rgba(255,255,255,.72); border-radius: 50%; content: ""; }
        .resource-orbit::before { inset: 60px; }
        .resource-orbit::after { inset: 120px; }
        .resource-orbit .benefit-avatar { position: absolute; z-index: 2; }
        .resource-orbit .benefit-avatar:nth-child(1) { top: 46px; left: 77px; }
        .resource-orbit .benefit-avatar:nth-child(2) { top: 77px; right: 72px; }
        .resource-orbit .benefit-avatar:nth-child(3) { top: 139px; left: 7px; }
        .resource-orbit .benefit-avatar:nth-child(4) { top: 156px; left: 196px; }
        .resource-orbit .benefit-avatar:nth-child(5) { top: 219px; right: 3px; }
        .resource-orbit .benefit-avatar:nth-child(6) { top: 248px; left: 90px; }
        .resource-orbit .benefit-avatar:nth-child(7) { top: 275px; right: 114px; }

        @media (max-width: 760px) {
          .benefits-section { padding: 60px 16px 72px; }
          .benefits-header h2 { font-size: clamp(36px, 10.6vw, 46px); }
          .benefits-grid { display: flex; margin-top: 42px; flex-direction: column; gap: 14px; }
          .benefit-payment, .benefit-revisions, .benefit-support { width: 100%; max-width: none; height: 315px; margin: 0; }
          .benefit-combined { display: contents; }
          .benefit-diverse, .benefit-resources { position: relative; height: 325px; overflow: hidden; border-radius: 14px; background: linear-gradient(145deg, #d8e8ff, #c9dbfb); }
          .benefit-diverse { padding: 19px; }
          .skill-roster { height: auto; min-height: 265px; }
          .benefit-resources { padding: 21px 19px; }
          .resource-orbit { right: 50%; transform: translateX(50%); }
        }
      `}</style>
    </section>
  );
}
