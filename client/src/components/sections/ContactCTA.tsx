"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Globe2, MessageCircle, UserRound } from "lucide-react";
import { LeadApiError, submitContactForm } from "@/lib/api/leads";

const budgetOptions = ["Less than $5K", "$5K - $10K", "$10K - $20K", "$20K - $50K", "More than $50K"];

export default function ContactCTA() {
  const [budget, setBudget] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget; const data = new FormData(form);
    setSubmitting(true); setFeedback(null);
    try {
      const message = await submitContactForm({
        name: String(data.get("fullName") ?? ""), email: String(data.get("email") ?? ""),
        phone: String(data.get("whatsapp") ?? ""), subject: budget ?? "", message: String(data.get("details") ?? ""),
        source: "website-contact",
      });
      form.reset(); setBudget(null); setFeedback({ type: "success", message });
    } catch (submitError) {
      const message = submitError instanceof LeadApiError && submitError.status === 429
        ? "You’ve sent several messages. Please wait a little before trying again."
        : submitError instanceof Error ? submitError.message : "Your message could not be sent. Please try again.";
      setFeedback({ type: "error", message });
    } finally { setSubmitting(false); }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-card">
        <div className="contact-intro">
          <p className="contact-offer">Claim a $799 Consultation, on Us!</p>
          <h2 id="contact-heading">Enhance Your Brand<br />Potential <em>At No Cost!</em></h2>

          <ul className="contact-benefits">
            <li><span><Check /></span>Expect a response from us within 24 hours</li>
            <li><span><Check /></span>We’re happy to sign an NDA upon request.</li>
            <li><span><Check /></span>Get access to a team of dedicated product specialists.</li>
          </ul>

          <div className="contact-profile">
            <div className="contact-portrait" role="img" aria-label="Portrait placeholder">
              <i aria-hidden="true"><UserRound /></i>
            </div>
            <h3>********</h3>
            <p>COO &amp; Co-founder</p>
            <a className="contact-phone" href="#contact"><MessageCircle />********</a>
            <a className="contact-book" href="#contact">Book a Call Directly</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={(event) => void handleSubmit(event)}>
          <label className="contact-field contact-field-full">
            <span>Full Name</span>
            <input type="text" name="fullName" placeholder="John Doe" autoComplete="name" maxLength={160} required />
          </label>

          <div className="contact-split">
            <label className="contact-field">
              <span>Your Email</span>
              <input type="email" name="email" placeholder="yourmail@gmail.com" autoComplete="email" maxLength={320} required />
            </label>

            <label className="contact-field">
              <span>Whatsapp Number</span>
              <span className="contact-phone-input">
                <Globe2 aria-hidden="true" />
                <ChevronDown aria-hidden="true" />
                <input type="tel" name="whatsapp" placeholder="123 456 7890" autoComplete="tel" maxLength={50} />
              </span>
            </label>
          </div>

          <fieldset className="contact-budget">
            <legend>Project Budget</legend>
            <div>
              {budgetOptions.map((option) => (
                <button
                  className={budget === option ? "contact-budget-active" : ""}
                  type="button"
                  aria-pressed={budget === option}
                  onClick={() => setBudget(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="contact-field contact-details">
            <span>Project Details</span>
            <textarea name="details" placeholder="I want to redesign my website.." maxLength={10000} required />
          </label>

          <button className="contact-submit" disabled={submitting} type="submit">
            <span>{submitting ? "Sending…" : "Lets Connect"}</span>
            <i><ArrowRight aria-hidden="true" /></i>
          </button>
          <p aria-live="polite" className={`contact-feedback${feedback ? ` contact-feedback-${feedback.type}` : ""}`}>{feedback?.message}</p>
        </form>
      </div>

      <style>{`
        .contact-section {
          padding: 18px 24px 112px;
          background: #fdfdfd;
        }

        .contact-card {
          display: grid;
          width: min(1252px, 100%);
          min-height: 827px;
          margin: 0 auto;
          padding: 64px;
          grid-template-columns: minmax(0, 44fr) minmax(0, 56fr);
          gap: 74px;
          overflow: hidden;
          border-radius: 31px;
          background:
            radial-gradient(ellipse 72% 64% at 91% 5%, rgba(147, 125, 39, .72), transparent 66%),
            radial-gradient(ellipse 54% 58% at 88% 39%, rgba(128, 67, 30, .55), transparent 72%),
            radial-gradient(ellipse 36% 28% at 3% 100%, rgba(139, 97, 31, .65), transparent 72%),
            linear-gradient(115deg, #080908 0%, #090a09 48%, #0b0a09 100%);
          color: #f8f8f8;
          box-shadow: none;
        }

        .contact-offer {
          display: flex;
          width: max-content;
          min-height: 35px;
          margin: 0 0 20px;
          padding: 6px 13px;
          align-items: center;
          border: 1px solid #008e50;
          border-radius: 999px;
          color: #11c873;
          font-size: 15px;
          line-height: 1;
        }

        .contact-intro h2 {
          margin: 0;
          font-size: clamp(43px, 3.25vw, 50px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -1.7px;
        }

        .contact-intro h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
          white-space: nowrap;
        }

        .contact-benefits {
          display: grid;
          margin: 24px 0 0;
          padding: 0;
          gap: 13px;
          list-style: none;
        }

        .contact-benefits li { display: flex; align-items: center; gap: 10px; font-size: 17px; font-weight: 500; line-height: 1.3; }
        .contact-benefits li > span { display: grid; width: 20px; height: 20px; flex: none; place-items: center; border: 1.5px solid #fff; border-radius: 50%; }
        .contact-benefits svg { width: 13px; height: 13px; stroke-width: 2; }

        .contact-profile { margin-top: 40px; }
        .contact-portrait {
          position: relative;
          display: grid;
          width: 240px;
          height: 220px;
          place-items: end center;
          overflow: hidden;
          border-radius: 19px;
          background:
            radial-gradient(circle at 12% 14%, transparent 14px, rgba(255,255,255,.12) 15px 17px, transparent 18px) 0 0 / 58px 58px,
            linear-gradient(145deg, #d9cff1, #b7a6e5);
        }

        .contact-portrait i { display: grid; width: 185px; height: 185px; place-items: center; border-radius: 50% 50% 0 0; background: linear-gradient(#30333b, #111318); color: #d7d0df; font-style: normal; transform: translateY(24px); }
        .contact-portrait svg { width: 126px; height: 126px; stroke-width: 1; }
        .contact-profile h3 { margin: 13px 0 2px; font-size: 25px; line-height: 1.1; letter-spacing: -.5px; }
        .contact-profile > p { margin: 0; color: #c8c8c8; font-size: 16px; }
        .contact-phone { display: flex; width: max-content; margin-top: 29px; align-items: center; gap: 9px; font-size: 16px; }
        .contact-phone svg { width: 22px; height: 22px; stroke-width: 1.6; }
        .contact-book { display: block; width: max-content; margin-top: 9px; color: #896add; font-size: 17px; font-weight: 700; }

        .contact-form { min-width: 0; }
        .contact-field { display: grid; gap: 15px; min-width: 0; }
        .contact-field > span:first-child,
        .contact-budget legend { color: #fff; font-size: 18px; font-weight: 700; line-height: 1; }

        .contact-field input,
        .contact-field textarea,
        .contact-phone-input {
          width: 100%;
          border: 1px solid #575757;
          border-radius: 8px;
          background: rgba(49, 48, 45, .7);
          color: #fff;
          font: inherit;
        }

        .contact-field input { height: 51px; padding: 0 16px; }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder { color: #b9bdc6; opacity: 1; }

        .contact-field input:focus,
        .contact-field textarea:focus,
        .contact-phone-input:focus-within { border-color: #7553c8; outline: 2px solid rgba(133,83,232,.18); outline-offset: 0; }

        .contact-split { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 39px; }
        .contact-phone-input { display: flex; height: 51px; padding: 0 13px; align-items: center; gap: 7px; }
        .contact-phone-input > svg:first-child { width: 18px; height: 18px; flex: none; }
        .contact-phone-input > svg:nth-child(2) { width: 13px; height: 13px; flex: none; }
        .contact-phone-input input { height: 49px; min-width: 0; padding: 0 0 0 3px; border: 0; background: transparent; outline: 0; }

        .contact-budget { margin: 39px 0 0; padding: 0; border: 0; }
        .contact-budget legend { margin-bottom: 17px; }
        .contact-budget > div { display: flex; max-width: 520px; flex-wrap: wrap; gap: 16px; }
        .contact-budget button { min-height: 51px; padding: 0 20px; border: 1px solid #5b5b5b; border-radius: 8px; background: rgba(13,13,13,.45); color: #cfd1d7; font-size: 16px; cursor: pointer; }
        .contact-budget button:focus-visible { outline: 2px solid #896add; outline-offset: 3px; }
        .contact-budget .contact-budget-active { border-color: #7553c8; background: rgba(117,83,200,.24); color: #fff; }

        .contact-details { margin-top: 39px; }
        .contact-field textarea { height: 106px; padding: 16px; resize: none; }

        .contact-submit {
          display: flex;
          width: 184px;
          height: 48px;
          margin-top: 36px;
          padding: 0 6px 0 20px;
          align-items: center;
          justify-content: space-between;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #7553c8 0%, #5c3ba6 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(33, 27, 77, 0.28), 0 2px 10px rgba(117, 83, 200, 0.35);
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .contact-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(33, 27, 77, 0.35), 0 4px 14px rgba(117, 83, 200, 0.5);
        }
        .contact-submit i {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border-radius: 50%;
          background: #fff;
          color: #7553c8;
          transition: transform 180ms ease;
        }
        .contact-submit i svg {
          width: 16px;
          height: 16px;
          stroke-width: 1.8;
        }
        .contact-submit:hover i {
          transform: translateX(2px);
        }
        .contact-submit:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        .contact-submit:disabled { cursor: wait; opacity: .72; transform: none; }
        .contact-feedback { min-height: 20px; margin: 13px 0 0; font-size: 13px; line-height: 1.45; }
        .contact-feedback-success { color: #6ee7a8; }
        .contact-feedback-error { color: #ff9baa; }

        @media (max-width: 1050px) and (min-width: 761px) {
          .contact-card { padding: 48px; gap: 44px; }
          .contact-intro h2 { font-size: 40px; }
          .contact-benefits li { font-size: 14px; }
          .contact-portrait { width: 210px; height: 200px; }
          .contact-budget > div { gap: 10px; }
          .contact-budget button { padding: 0 13px; font-size: 14px; }
        }

        @media (max-width: 760px) {
          .contact-section { padding: 12px 12px 78px; }
          .contact-card { display: block; width: 100%; min-height: 0; padding: 34px 24px 42px; border-radius: 24px; }
          .contact-intro h2 { font-size: clamp(37px, 10.8vw, 48px); }
          .contact-offer { font-size: 13px; }
          .contact-benefits li { align-items: flex-start; font-size: 15px; }
          .contact-profile { margin-top: 34px; }
          .contact-portrait { width: 220px; height: 205px; }
          .contact-profile h3 { font-size: 22px; }
          .contact-form { margin-top: 60px; }
          .contact-split { grid-template-columns: 1fr; gap: 28px; margin-top: 28px; }
          .contact-budget, .contact-details { margin-top: 31px; }
          .contact-budget > div { gap: 10px; }
          .contact-budget button { min-height: 47px; padding: 0 14px; font-size: 14px; }
          .contact-submit { width: 178px; margin-top: 30px; }
        }
      `}</style>
    </section>
  );
}
