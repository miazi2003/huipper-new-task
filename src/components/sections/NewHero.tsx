import Link from "next/link";
import { ArrowRight, Camera, CircleUser, Menu, Send } from "lucide-react";

const navigation = ["About", "Solutions", "Advantages", "Partners", "Contacts"];
const partners = ["ORACLE", "✦ Hitachi Vantara", "◈ VERTIV", "NUTANIX", "◉ tenable", "♢ Red Hat"];
const stats = [
  ["5+", "YEARS OF SUCCESSFUL", "DELIVERY"],
  ["40+", "COMPLETED", "PROJECTS"],
  ["10+", "YEARS OF EXPERT", "EXPERIENCE"],
];

function ParticleSphere() {
  const dots = Array.from({ length: 740 }, (_, index) => {
    const y = 1 - (index / 739) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { cx: 250 + x * 219, cy: 250 + y * 219, r: .72 + ((z + 1) / 2) * .82, opacity: .14 + ((z + 1) / 2) * .5 };
  });

  return (
    <svg className="ac-particle-sphere" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <radialGradient id="ac-sphere-fade"><stop offset="0" stopColor="white" stopOpacity=".95" /><stop offset=".72" stopColor="white" stopOpacity=".62" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
        <mask id="ac-sphere-mask"><circle cx="250" cy="250" r="245" fill="url(#ac-sphere-fade)" /></mask>
      </defs>
      <g mask="url(#ac-sphere-mask)">{dots.map((dot, index) => <circle key={index} cx={dot.cx} cy={dot.cy} r={dot.r} fill="white" opacity={dot.opacity} />)}</g>
    </svg>
  );
}

export default function NewHero() {
  return (
    <section className="ac-hero-section" aria-labelledby="ac-hero-heading">
      <div className="ac-page-wrapper">
        <div className="ac-hero-card">
          <Link className="ac-brand" href="/" aria-label="Huipper home">
            <span className="sr-only">Huipper</span>
          </Link>

          <nav className="ac-nav-shell" aria-label="Hero navigation">
            <div className="ac-nav-links">{navigation.map((item) => <Link href={`#${item}`} key={item}>{item}</Link>)}</div>
            <button className="ac-mobile-menu" type="button" aria-label="Open navigation"><Menu /></button>
          </nav>

          <Link className="ac-start-button" href="#contact">Get Started</Link>
          <ParticleSphere />

          <div className="ac-hero-copy">
            <h1 id="ac-hero-heading">ACROPOLIS INTEGRO</h1>
            <p>COMPREHENSIVE SERVICES DESIGNED TO IMPROVE<br />THE SECURITY, RELIABILITY, AND PERFORMANCE<br />OF YOUR IT INFRASTRUCTURE</p>
            <Link className="ac-hero-button" href="#contact"><span>Learn more</span><i><ArrowRight /></i></Link>
          </div>

          <aside className="ac-contact-card" id="contact" aria-label="Contact details">
            <small>CONTACT US</small>
            <a className="ac-email" href="mailto:info@acropolis.uz">info@acropolis.uz</a>
            <div className="ac-socials">
              <a href="#linkedin" aria-label="LinkedIn"><CircleUser /></a>
              <a href="#telegram" aria-label="Telegram"><Send /></a>
              <a href="#instagram" aria-label="Instagram"><Camera /></a>
            </div>
          </aside>

          <div className="ac-stats" aria-label="Company statistics">
            {stats.map(([value, first, second]) => <div key={value}><strong>{value}</strong><span>{first}<br />{second}</span></div>)}
          </div>
        </div>

        <div className="ac-partners" aria-label="Technology partners">
          {partners.map((partner) => <span key={partner}>{partner}</span>)}
        </div>
      </div>

      <style>{`
        .ac-hero-section { width: 100%; overflow: hidden; background: #fff; font-family: Arial,Helvetica,sans-serif; }
        .ac-page-wrapper { width: 100%; max-width: none; margin: 0; }
        .ac-hero-card { position: relative; height: calc(100svh - 32px); min-height: 570px; overflow: hidden; border-radius: 24px; background: radial-gradient(circle at 15% 18%,rgba(255,255,255,.25),transparent 31%),radial-gradient(circle at 77% 65%,rgba(32,91,150,.12),transparent 40%),linear-gradient(104deg,#d7e6f8 0%,#a8c9ec 26%,#6ca0d2 55%,#28659f 100%); color: #fff; isolation: isolate; }
        .ac-brand { position: absolute; z-index: 5; top: 14px; left: 25px; width: 160px; height: 40px; background-image: url("/images/brand/huipper-logo.webp"); background-position: center; background-repeat: no-repeat; background-size: contain; }
        .ac-nav-shell { position: absolute; z-index: 6; top: 0; left: 50%; display: flex; width: 51.5%; height: 67px; align-items: center; justify-content: center; border-radius: 0 0 21px 21px; background: #fff; transform: translateX(-50%); }
        .ac-nav-shell::before,.ac-nav-shell::after { position: absolute; top: 0; width: 28px; height: 28px; background: transparent; content: ""; }
        .ac-nav-shell::before { right: 100%; border-radius: 0 18px 0 0; box-shadow: 12px -12px 0 12px #fff; }
        .ac-nav-shell::after { left: 100%; border-radius: 18px 0 0; box-shadow: -12px -12px 0 12px #fff; }
        .ac-nav-links { display: flex; width: 82%; align-items: center; justify-content: space-between; gap: 20px; }
        .ac-nav-links a { color: #18354f; font-size: 15px; font-weight: 400; white-space: nowrap; }
        .ac-nav-links a:hover { color: #3375ae; }
        .ac-mobile-menu { display: none; }
        .ac-start-button { position: absolute; z-index: 6; top: 16px; right: 25px; display: flex; width: 122px; height: 43px; align-items: center; justify-content: center; border-radius: 999px; background: #fff; color: #264967; font-size: 14px; font-weight: 500; }
        .ac-particle-sphere { position: absolute; z-index: 1; top: 49px; right: 15.5%; width: min(42vw,520px); height: min(42vw,520px); opacity: .68; pointer-events: none; animation: ac-sphere-drift 18s ease-in-out infinite alternate; }
        .ac-hero-copy { position: absolute; z-index: 3; top: 218px; left: 50%; display: flex; width: min(690px,70%); align-items: center; flex-direction: column; text-align: center; transform: translateX(-50%); }
        .ac-hero-copy h1 { margin: 0; font-size: clamp(46px,4.35vw,64px); font-weight: 400; line-height: 1; letter-spacing: -2.2px; white-space: nowrap; }
        .ac-hero-copy p { margin: 22px 0 0; color: rgba(255,255,255,.9); font-size: 15px; font-weight: 400; line-height: 1.45; letter-spacing: .15px; }
        .ac-hero-button { display: flex; width: 158px; height: 44px; margin-top: 30px; padding: 0 5px 0 19px; align-items: center; justify-content: space-between; border-radius: 999px; background: #fff; color: #254a6d; font-size: 12px; font-weight: 500; }
        .ac-hero-button i { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 50%; background: #234f78; color: #fff; transition: transform 180ms ease; }
        .ac-hero-button i svg { width: 15px; height: 15px; stroke-width: 1.6; }
        .ac-hero-button:hover i { transform: translateX(2px); }
        .ac-contact-card { position: absolute; z-index: 5; bottom: 0; left: 0; display: flex; width: 27%; height: 166px; padding: 29px 36px 24px; flex-direction: column; border-top: 5px solid #fff; border-right: 5px solid #fff; border-radius: 0 22px 0 0; background: linear-gradient(135deg,rgba(121,163,205,.78),rgba(91,139,186,.92)); box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
        .ac-contact-card::after { position: absolute; right: -25px; bottom: 0; width: 24px; height: 24px; border-radius: 0 0 0 18px; box-shadow: -8px 8px 0 8px #fff; content: ""; }
        .ac-contact-card small { color: rgba(255,255,255,.72); font-size: 10px; line-height: 1; letter-spacing: .4px; }
        .ac-email { width: max-content; margin-top: 15px; color: #fff; font-size: 20px; font-weight: 400; }
        .ac-socials { display: flex; margin-top: 19px; gap: 7px; }
        .ac-socials a { display: grid; width: 29px; height: 29px; place-items: center; border-radius: 50%; background: rgba(38,87,130,.86); color: #fff; }
        .ac-socials svg { width: 13px; height: 13px; stroke-width: 1.7; }
        .ac-stats { position: absolute; z-index: 4; right: 19.5%; bottom: 33px; display: grid; width: 44%; grid-template-columns: repeat(3,1fr); text-align: center; }
        .ac-stats strong { display: block; font-size: 31px; font-weight: 400; line-height: 1; }
        .ac-stats span { display: block; margin-top: 11px; color: rgba(255,255,255,.75); font-size: 10px; line-height: 1.3; }
        .ac-partners { display: flex; height: 93px; padding: 0 38px; align-items: center; justify-content: space-between; gap: 30px; overflow: hidden; color: #8fa8bf; opacity: .43; }
        .ac-partners span { font-size: clamp(17px,1.7vw,25px); font-weight: 600; letter-spacing: -.55px; white-space: nowrap; }
        .ac-partners span:first-child { letter-spacing: 2px; }
        .ac-partners span:nth-child(4) { letter-spacing: 1px; }
        .ac-brand:focus-visible,.ac-nav-links a:focus-visible,.ac-start-button:focus-visible,.ac-hero-button:focus-visible,.ac-socials a:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        @keyframes ac-sphere-drift { from { transform: rotate(-1.5deg) translateY(-2px); } to { transform: rotate(1.5deg) translateY(3px); } }
        @media (max-width:1000px) { .ac-hero-card{height:calc(100svh - 32px);min-height:560px}.ac-nav-shell{width:57%}.ac-nav-links{width:88%;gap:12px}.ac-nav-links a{font-size:13px}.ac-hero-copy{top:195px}.ac-contact-card{width:31%;padding-left:26px}.ac-stats{right:11%;width:51%}.ac-particle-sphere{right:6%} }
        @media (max-width:767px) {
          .ac-page-wrapper{width:100%}.ac-hero-card{height:calc(100svh - 32px);min-height:700px;border-radius:20px}.ac-brand{top:14px;left:14px;width:136px;height:34px}.ac-nav-shell{width:78px;height:62px}.ac-nav-links{display:none}.ac-mobile-menu{display:grid;width:35px;height:35px;padding:0;place-items:center;border:0;border-radius:50%;background:#e9f1f9;color:#264967}.ac-mobile-menu svg{width:16px;height:16px}.ac-start-button{top:14px;right:14px;width:105px;height:38px;font-size:12px}.ac-particle-sphere{top:125px;right:-145px;width:430px;height:430px}.ac-hero-copy{top:190px;width:calc(100% - 34px)}.ac-hero-copy h1{font-size:clamp(32px,9.5vw,42px);letter-spacing:-1.3px}.ac-hero-copy p{margin-top:18px;font-size:12px}.ac-hero-button{margin-top:24px;font-size:12px}.ac-stats{right:5%;bottom:191px;width:90%}.ac-stats strong{font-size:27px}.ac-stats span{font-size:8px}.ac-contact-card{width:100%;height:160px;padding:26px 28px;border-right:0;border-radius:22px 22px 0 0}.ac-contact-card::after{display:none}.ac-partners{height:106px;padding:0 22px;justify-content:flex-start;overflow-x:auto;gap:36px}.ac-partners span{font-size:19px}
        }
        @media (prefers-reduced-motion:reduce) { .ac-particle-sphere{animation:none}.ac-hero-button i{transition:none} }
      `}</style>
    </section>
  );
}
