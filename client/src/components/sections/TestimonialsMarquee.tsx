"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { adaptCmsToTextTestimonials } from "@/lib/adapters/testimonial-presentation";
import { listPublicTestimonials } from "@/lib/api/testimonials";

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("");
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="testimonial-card">
      <p>{testimonial.quote}</p>
      <footer>
        <span className="testimonial-avatar" style={{ "--avatar-color": testimonial.avatarColor } as CSSProperties} aria-hidden="true">
          {initials(testimonial.name)}
        </span>
        <div>
          <h3>{testimonial.name}</h3>
          <p>{testimonial.role}</p>
        </div>
      </footer>
    </article>
  );
}

function TestimonialSet({ items, duplicate = false }: { items: Testimonial[]; duplicate?: boolean }) {
  return (
    <div className="testimonial-set" aria-hidden={duplicate || undefined}>
      {items.map((testimonial, index) => <TestimonialCard testimonial={testimonial} key={`${testimonial.name}-${index}`} />)}
    </div>
  );
}

export default function TestimonialsMarquee() {
  const [items, setItems] = useState<Testimonial[]>(testimonials);

  useEffect(() => {
    void listPublicTestimonials({ type: "text", limit: 20 })
      .then((data) => {
        if (data?.testimonials && data.testimonials.length > 0) {
          setItems(adaptCmsToTextTestimonials(data.testimonials, testimonials));
        }
      })
      .catch(() => undefined);
  }, []);

  const lowerTestimonials = items.length >= 6 ? [...items.slice(3), ...items.slice(0, 3)] : items;

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      <header className="testimonials-header">
        <p>Referral From People</p>
        <h2 id="testimonials-heading">Trusted by People<br /><em>Chosen By Brands</em></h2>
      </header>

      <div className="testimonial-row testimonial-row-top">
        <div className="testimonial-track testimonial-track-rtl">
          <TestimonialSet items={items} />
          <TestimonialSet items={items} duplicate />
        </div>
      </div>

      <div className="testimonial-row testimonial-row-bottom">
        <div className="testimonial-track testimonial-track-ltr">
          <TestimonialSet items={lowerTestimonials} />
          <TestimonialSet items={lowerTestimonials} duplicate />
        </div>
      </div>

      <div className="testimonial-row testimonial-row-third">
        <div className="testimonial-track testimonial-track-rtl">
          <TestimonialSet items={lowerTestimonials} />
          <TestimonialSet items={lowerTestimonials} duplicate />
        </div>
      </div>

      <div className="testimonial-row testimonial-row-fourth">
        <div className="testimonial-track testimonial-track-ltr">
          <TestimonialSet items={items} />
          <TestimonialSet items={items} duplicate />
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 84px 0 100px;
          overflow: hidden;
          background: #fdfdfd;
          color: #151515;
        }

        .testimonials-header { text-align: center; }

        .testimonials-header > p {
          display: flex;
          width: max-content;
          min-height: 34px;
          margin: 0 auto 20px;
          padding: 6px 14px;
          align-items: center;
          border: 1px solid #00b967;
          border-radius: 999px;
          color: #009b57;
          font-size: 14px;
          line-height: 1;
        }

        .testimonials-header h2 {
          margin: 0;
          font-size: clamp(48px, 4vw, 58px);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: -2px;
        }

        .testimonials-header h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .testimonial-row {
          width: min(1280px, calc(100% - 32px));
          margin-right: auto;
          margin-left: auto;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 17%, #000 83%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 17%, #000 83%, transparent 100%);
        }

        .testimonial-row-top { margin-top: 61px; }
        .testimonial-row-bottom,
        .testimonial-row-third,
        .testimonial-row-fourth { margin-top: 16px; }

        .testimonial-track {
          display: flex;
          width: max-content;
          backface-visibility: hidden;
          will-change: transform;
        }

        .testimonial-row-bottom .testimonial-track { margin-left: -158px; }
        .testimonial-row-third .testimonial-track { margin-left: -72px; }
        .testimonial-row-fourth .testimonial-track { margin-left: -236px; }

        .testimonial-set {
          display: flex;
          padding-right: 16px;
          flex: none;
          gap: 16px;
        }

        .testimonial-card {
          display: flex;
          width: 400px;
          height: 396px;
          margin: 0;
          padding: 27px 25px 27px;
          flex: none;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #e4e4e4;
          border-radius: 16px;
          background: rgba(255,255,255,.96);
          box-shadow: 0 7px 20px rgba(35,35,35,.025);
        }

        .testimonial-card > p {
          margin: 0;
          color: #555;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -.1px;
        }

        .testimonial-card footer { display: flex; align-items: center; gap: 12px; }

        .testimonial-avatar {
          display: grid;
          width: 50px;
          height: 50px;
          flex: none;
          place-items: center;
          border-radius: 50%;
          background: var(--avatar-color);
          color: #25202c;
          font-size: 13px;
          font-weight: 800;
        }

        .testimonial-card footer h3 { margin: 0 0 3px; font-size: 19px; font-weight: 700; line-height: 1.1; }
        .testimonial-card footer p { margin: 0; color: #747474; font-size: 15px; line-height: 1.3; white-space: nowrap; }

        .testimonial-track-rtl { animation: testimonial-rtl 130s linear infinite; }
        .testimonial-track-ltr { animation: testimonial-ltr 145s linear infinite; }

        @keyframes testimonial-rtl {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes testimonial-ltr {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @media (max-width: 900px) {
          .testimonials-section { padding: 72px 0 84px; }
          .testimonial-row { mask-image: linear-gradient(to right, transparent, #000 9%, #000 91%, transparent); }
          .testimonial-card { width: 350px; height: 350px; padding: 24px; }
          .testimonial-card > p { font-size: 16px; }
          .testimonial-row-bottom .testimonial-track { margin-left: -110px; }
          .testimonial-row-third .testimonial-track { margin-left: -54px; }
          .testimonial-row-fourth .testimonial-track { margin-left: -170px; }
        }

        @media (max-width: 600px) {
          .testimonials-section { padding: 62px 0 72px; }
          .testimonials-header { padding: 0 18px; }
          .testimonials-header > p { min-height: 31px; margin-bottom: 17px; font-size: 13px; }
          .testimonials-header h2 { font-size: clamp(38px, 11vw, 48px); }
          .testimonial-row { width: calc(100% - 16px); mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent); }
          .testimonial-row-top { margin-top: 45px; }
          .testimonial-row-bottom { margin-top: 12px; }
          .testimonial-row-third, .testimonial-row-fourth { margin-top: 12px; }
          .testimonial-card { width: min(82vw, 330px); height: 340px; padding: 22px; border-radius: 14px; }
          .testimonial-card > p { font-size: 15px; line-height: 1.5; }
          .testimonial-avatar { width: 44px; height: 44px; }
          .testimonial-card footer h3 { font-size: 17px; }
          .testimonial-card footer p { max-width: 220px; overflow: hidden; font-size: 13px; text-overflow: ellipsis; }
          .testimonial-set { gap: 12px; padding-right: 12px; }
          .testimonial-row-bottom .testimonial-track { margin-left: -74px; }
          .testimonial-row-third .testimonial-track { margin-left: -38px; }
          .testimonial-row-fourth .testimonial-track { margin-left: -118px; }
          .testimonial-track-rtl { animation-duration: 120s; }
          .testimonial-track-ltr { animation-duration: 132s; }
        }
      `}</style>
    </section>
  );
}
