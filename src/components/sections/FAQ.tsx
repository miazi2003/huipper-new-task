"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <header className="faq-header">
        <p>Frequently Asked Questions</p>
        <h2 id="faq-heading">Your Questions<br /><em>Answered!</em></h2>
      </header>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <article className={`faq-item${isOpen ? " faq-item-open" : ""}`} key={faq.question}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.question}</span>
                <i className="faq-toggle" aria-hidden="true">
                  <ChevronDown />
                </i>
              </button>

              <div className="faq-answer" id={answerId} aria-hidden={!isOpen}>
                <div>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .faq-section {
          padding: 86px 24px 112px;
          background: #fdfdfd;
          color: #151515;
        }

        .faq-header { text-align: center; }

        .faq-header > p {
          display: flex;
          width: max-content;
          min-height: 34px;
          margin: 0 auto 21px;
          padding: 6px 14px;
          align-items: center;
          border: 1px solid #00bb68;
          border-radius: 999px;
          color: #009c58;
          font-size: 14px;
          line-height: 1;
        }

        .faq-header h2 {
          margin: 0;
          font-size: clamp(48px, 4vw, 58px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -2px;
        }

        .faq-header h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .faq-list {
          width: min(1040px, 100%);
          margin: 89px auto 0;
        }

        .faq-item { border-bottom: 1px solid #dedede; }

        .faq-question {
          display: flex;
          width: 100%;
          min-height: 105px;
          padding: 0;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          border: 0;
          background: transparent;
          color: #171717;
          text-align: left;
          cursor: pointer;
        }

        .faq-question > span {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.65px;
        }

        .faq-question:focus-visible {
          border-radius: 8px;
          outline: 2px solid #6d28e8;
          outline-offset: 4px;
        }

        .faq-toggle {
          display: grid;
          width: 42px;
          height: 42px;
          flex: none;
          place-items: center;
          border: 1.5px solid #5416e8;
          border-radius: 50%;
          color: #5416e8;
          font-style: normal;
          perspective: 300px;
          transform: perspective(300px) rotateX(0deg);
          transform-style: preserve-3d;
          transition:
            transform 420ms cubic-bezier(.34, 1.36, .64, 1),
            background-color 210ms ease,
            border-color 210ms ease,
            color 210ms ease;
        }

        .faq-toggle svg {
          width: 23px;
          height: 23px;
          stroke-width: 1.65;
          transform: scale(.96);
        }

        .faq-item-open .faq-toggle {
          border-color: #5920c9;
          background: #5920c9;
          color: #fff;
          transform: perspective(300px) rotateX(180deg);
        }

        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 320ms cubic-bezier(.22, 1, .36, 1);
        }

        .faq-answer > div { overflow: hidden; }

        .faq-answer p {
          max-width: 920px;
          margin: 0;
          padding: 0 76px 0 0;
          color: #5d5d5d;
          font-size: 17px;
          line-height: 1.65;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 260ms ease,
            transform 320ms cubic-bezier(.22, 1, .36, 1),
            padding-bottom 320ms cubic-bezier(.22, 1, .36, 1);
        }

        .faq-item-open .faq-answer { grid-template-rows: 1fr; }

        .faq-item-open .faq-answer p {
          padding-bottom: 29px;
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 760px) {
          .faq-section { padding: 68px 18px 82px; }
          .faq-header > p { min-height: 31px; margin-bottom: 18px; font-size: 13px; }
          .faq-header h2 { font-size: clamp(39px, 11vw, 48px); }
          .faq-list { margin-top: 61px; }
          .faq-question { min-height: 88px; gap: 16px; }
          .faq-question > span { font-size: 19px; line-height: 1.32; letter-spacing: -.35px; }
          .faq-toggle { width: 38px; height: 38px; }
          .faq-toggle svg { width: 21px; height: 21px; }
          .faq-answer p { padding-right: 48px; font-size: 15px; line-height: 1.65; }
          .faq-item-open .faq-answer p { padding-bottom: 25px; }
        }
      `}</style>
    </section>
  );
}
