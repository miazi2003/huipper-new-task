const trustedBrands = [
  { name: "ORACLE", className: "tb-oracle" },
  { name: "✦ Hitachi Vantara", className: "tb-hitachi" },
  { name: "◈ VERTIV", className: "tb-vertiv" },
  { name: "NUTANIX", className: "tb-nutanix" },
  { name: "◉ tenable", className: "tb-tenable" },
  { name: "♟ Red Hat", className: "tb-redhat" },
] as const;

export default function TrustedBrands() {
  return (
    <section className="tb-section" aria-label="Technology partners">
      <div className="tb-panel">
        {trustedBrands.map((brand) => (
          <span className={`tb-brand ${brand.className}`} key={brand.name}>{brand.name}</span>
        ))}
      </div>

      <style>{`
        .tb-section { width: 100%; background: #ffffff; }
        .tb-panel { display: flex; width: 100%; height: 86px; padding: 0 clamp(24px,3.7vw,54px); align-items: center; justify-content: space-between; gap: clamp(18px,2.7vw,42px); overflow: hidden; border-radius: 999px; background: #fff; box-shadow: 0 3px 14px rgba(58,82,105,.09), 0 1px 3px rgba(58,82,105,.06); }
        .tb-brand { display: inline-flex; align-items: center; color: #718da7; font-size: clamp(15px,1.45vw,21px); font-weight: 600; line-height: 1; letter-spacing: -.45px; opacity: .72; white-space: nowrap; }
        .tb-oracle { font-weight: 500; letter-spacing: 1.4px; }
        .tb-nutanix { font-weight: 500; letter-spacing: .7px; }
        .tb-vertiv { font-size: clamp(11px,1.05vw,15px); letter-spacing: .5px; }
        .tb-redhat { font-weight: 700; }

        @media (max-width:767px) {
          .tb-panel { height: 48px; padding: 0 15px; justify-content: space-between; gap: 7px; border-radius: 999px; }
          .tb-brand { font-size: 8.5px; letter-spacing: -.2px; }
          .tb-oracle { letter-spacing: .6px; }
          .tb-nutanix { letter-spacing: .3px; }
          .tb-vertiv { font-size: 7px; }
        }
      `}</style>
    </section>
  );
}
