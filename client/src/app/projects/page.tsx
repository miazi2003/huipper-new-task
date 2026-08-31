import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteNavbar from "@/components/layout/SiteNavbar";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import FooterBrandVisual from "@/components/sections/FooterBrandVisual";
import { listPublicProjects, type Project } from "@/lib/api/projects";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Projects & Portfolio | Huipper",
  description:
    "Explore our portfolio of category-defining digital products, high-impact web apps, and brand design systems.",
  openGraph: {
    title: "Projects & Portfolio | Huipper",
    description:
      "Explore our portfolio of category-defining digital products, high-impact web apps, and brand design systems.",
    type: "website",
  },
};

const CARD_BACKGROUND_COLORS = [
  "#eba0f5",
  "#b4dff5",
  "#dcffad",
  "#ffca4c",
  "#ffaaa9",
  "#9bd5f7",
];

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const data = await listPublicProjects({ limit: 50 });
    if (data?.projects && data.projects.length > 0) {
      projects = data.projects;
    }
  } catch (error) {
    console.error("[projects-page] Failed to fetch public projects:", error);
  }

  return (
    <>
      <SiteNavbar />

      <main className="projects-page-main">
        {/* Hero Section */}
        <section className="projects-hero">
          <div className="projects-container">
            <p className="projects-eyebrow">SELECTED WORK</p>
            <h1 className="projects-title">
              Crafting Digital Products <br />
              <em>That Define Categories</em>
            </h1>
            <p className="projects-subtitle">
              A curated showcase of our recent design systems, high-growth SaaS platforms,
              and transformative mobile experiences.
            </p>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="projects-grid-section">
          <div className="projects-container">
            {projects.length > 0 ? (
              <div className="projects-grid">
                {projects.map((project, index) => {
                  const bg = CARD_BACKGROUND_COLORS[index % CARD_BACKGROUND_COLORS.length];
                  const imageSrc =
                    project.coverImageUrl ||
                    project.thumbnailUrl ||
                    caseStudies[index % caseStudies.length]?.projectImage ||
                    "/images/hero/affine.png";

                  return (
                    <article className="project-card" key={project.id || project.slug} style={{ "--card-bg": bg } as CSSProperties}>
                      <Link href={`/projects/${project.slug}`} className="project-card-link" aria-label={`View ${project.title} case study`}>
                        <div className="project-card-media">
                          <Image
                            src={imageSrc}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            className="project-card-img"
                          />
                          <div className="project-card-badge">{project.category || project.industry || "Product Design"}</div>
                        </div>

                        <div className="project-card-content">
                          <div className="project-card-header">
                            <div>
                              <p className="project-client">{project.clientName || "Client Partner"}</p>
                              <h2 className="project-name">{project.title}</h2>
                            </div>
                            <span className="project-arrow-btn" aria-hidden="true">
                              <ArrowUpRight size={20} />
                            </span>
                          </div>

                          {project.shortDescription && (
                            <p className="project-description">{project.shortDescription}</p>
                          )}

                          {project.metrics && project.metrics.length > 0 && (
                            <div className="project-metrics">
                              {project.metrics.slice(0, 2).map((metric, mIdx) => (
                                <div className="metric-pill" key={mIdx}>
                                  <span className="metric-label">{metric.label}:</span>
                                  <strong className="metric-val">{metric.value}</strong>
                                </div>
                              ))}
                            </div>
                          )}

                          {project.services && project.services.length > 0 && (
                            <div className="project-tags">
                              {project.services.slice(0, 3).map((service, sIdx) => (
                                <span className="service-tag" key={sIdx}>
                                  {service}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Fallback with hardcoded case studies */
              <div className="projects-grid">
                {caseStudies.map((study) => (
                  <article className="project-card" key={study.title} style={{ "--card-bg": study.backgroundColor } as CSSProperties}>
                    <div className="project-card-media">
                      <Image
                        src={study.projectImage}
                        alt={`${study.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="project-card-img"
                      />
                      <div className="project-card-badge">{study.category}</div>
                    </div>

                    <div className="project-card-content">
                      <div className="project-card-header">
                        <div>
                          <p className="project-client">{study.clientName}</p>
                          <h2 className="project-name">{study.title}</h2>
                        </div>
                      </div>
                      <p className="project-description">{study.description}</p>
                      <div className="project-metrics">
                        <div className="metric-pill">
                          <span className="metric-label">{study.metricOneLabel}:</span>
                          <strong className="metric-val">{study.metricOneValue}</strong>
                        </div>
                        <div className="metric-pill">
                          <span className="metric-label">{study.metricTwoLabel}:</span>
                          <strong className="metric-val">{study.metricTwoValue}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Global CTA */}
        <ContactCTA />
      </main>

      <Footer />
      <FooterBrandVisual />

      <style>{`
        .projects-page-main {
          background: #fcfcfc;
          min-height: 100vh;
        }

        .projects-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .projects-hero {
          padding: 130px 0 60px;
          text-align: center;
        }

        .projects-eyebrow {
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #777777;
          margin-bottom: 16px;
        }

        .projects-title {
          font-size: clamp(36px, 5.5vw, 64px);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #111111;
          margin-bottom: 24px;
        }

        .projects-title em {
          font-style: italic;
          font-family: serif;
          font-weight: 400;
        }

        .projects-subtitle {
          max-width: 640px;
          margin: 0 auto;
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.6;
          color: #666666;
        }

        .projects-grid-section {
          padding: 20px 0 100px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 36px;
        }

        .project-card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #ebebeb;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #d8d8d8;
        }

        .project-card-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .project-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: var(--card-bg, #f3f3f3);
          overflow: hidden;
        }

        .project-card-img {
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-card-img {
          transform: scale(1.04);
        }

        .project-card-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
          letter-spacing: 0.02em;
        }

        .project-card-content {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
        }

        .project-client {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #888888;
          margin-bottom: 4px;
        }

        .project-name {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #111111;
        }

        .project-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111111;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
        }

        .project-card:hover .project-arrow-btn {
          background: #000000;
          color: #ffffff;
          transform: translate(2px, -2px);
        }

        .project-description {
          font-size: 15px;
          line-height: 1.55;
          color: #555555;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: auto;
          margin-bottom: 16px;
        }

        .metric-pill {
          background: #f8f8f8;
          border: 1px solid #ededed;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .metric-label {
          color: #777777;
        }

        .metric-val {
          color: #111111;
          font-weight: 600;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .service-tag {
          font-size: 12px;
          color: #666666;
          background: #f2f2f2;
          padding: 4px 10px;
          border-radius: 6px;
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .projects-hero {
            padding: 60px 0 40px;
          }

          .project-card-content {
            padding: 24px 20px;
          }

          .project-name {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}
