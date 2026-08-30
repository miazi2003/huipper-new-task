import Image from "next/image";

export default function FooterBrandVisual() {
  return (
    <section className="footer-brand-visual-section" aria-hidden="true">
      <div className="footer-brand-visual-wrapper">
        <Image
          src="/images/brand/huipper-footer-visual.png"
          alt="Huipper Brand Showcase"
          width={1800}
          height={500}
          className="footer-brand-visual-img"
          priority
        />
      </div>

      <style>{`
        .footer-brand-visual-section {
          width: 100%;
          overflow: hidden;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand-visual-wrapper {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
        }

        .footer-brand-visual-img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}
