import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteNavbar from "@/components/layout/SiteNavbar";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import FooterBrandVisual from "@/components/sections/FooterBrandVisual";
import { getPublicProject, listPublicProjects, type Project } from "@/lib/api/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getPublicProject(slug);
    if (!project) return { title: "Project Not Found | Huipper" };

    const title = project.seo?.title || `${project.title} — Case Study | Huipper`;
    const description =
      project.seo?.description ||
      project.shortDescription ||
      project.description?.slice(0, 160) ||
      "Explore this digital product case study by Huipper.";
    const imageUrl = project.seo?.imageUrl || project.coverImageUrl || project.thumbnailUrl;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: imageUrl ? [{ url: imageUrl }] : undefined,
      },
    };
  } catch {
    return { title: "Project | Huipper" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  let project: Project | null = null;
  let nextProject: Project | null = null;

  try {
    project = await getPublicProject(slug);
  } catch {
    notFound();
  }

  if (!project || project.status === "draft") {
    notFound();
  }

  // Fetch adjacent project for next-project navigation
  try {
    const all = await listPublicProjects({ limit: 50 });
    if (all?.projects && all.projects.length > 1) {
      const currentIndex = all.projects.findIndex((p) => p.slug === slug);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % all.projects.length;
        nextProject = all.projects[nextIndex] || null;
      }
    }
  } catch {
    // Non-fatal if next project fails to load
  }

  const heroBackgroundImage = project.coverImageUrl;
  const foregroundThumbnail = project.thumbnailUrl;

  // Build metadata items from available CMS data (up to 3 items)
  const metadataItems: Array<{ label: string; value: string }> = [];
  if (project.clientName) {
    metadataItems.push({ label: "Client", value: project.clientName });
  }
  if (project.category) {
    metadataItems.push({ label: "Category", value: project.category });
  } else if (project.industry) {
    metadataItems.push({ label: "Industry", value: project.industry });
  }
  if (project.services && project.services.length > 0) {
    metadataItems.push({ label: "Services", value: project.services.slice(0, 2).join(", ") });
  }

  const projectNarrative = project.description || project.shortDescription || "";

  return (
    <>
      {/* Transparent Navbar configured specifically for the dark hero */}
      <SiteNavbar variant="transparent-dark" />

      <main className="case-study-page">
        {/* 1. Large Dark Visual Hero Section */}
        <section className="case-study-hero">
          {heroBackgroundImage && (
            <div className="hero-background-media" aria-hidden="true">
              <Image
                src={heroBackgroundImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="hero-background-img"
              />
            </div>
          )}
          <div className="hero-background-overlay" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />

          <div className="hero-container">
            <div className="hero-breadcrumb-wrap">
              <Link href="/projects" className="hero-back-link">
                <ArrowLeft size={16} />
                <span>All Projects</span>
              </Link>
            </div>

            <div className="hero-text-block">
              <h1 className="hero-project-title">{project.title}</h1>

              {metadataItems.length > 0 && (
                <div className="hero-metadata-row">
                  {metadataItems.map((meta, idx) => (
                    <div className="hero-meta-item" key={idx}>
                      <span className="meta-item-label">{meta.label}</span>
                      <strong className="meta-item-value">{meta.value}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. Thumbnail Overlapping the Cover Background */}
        {foregroundThumbnail && (
          <section className="overlap-image-section">
            <div className="overlap-container">
              <div className="thumbnail-image-frame">
                <Image
                  src={foregroundThumbnail}
                  alt={`${project.title} thumbnail visual`}
                  fill
                  sizes="(max-width: 600px) 86vw, (max-width: 900px) 72vw, 732px"
                  className="project-thumbnail-img"
                />
              </div>
            </div>
          </section>
        )}

        {/* 3. Project Description Section (Centered, Editorial Typography) */}
        <section className="project-description-section">
          <div className="description-container">
            <header className="description-header">
              <h2 className="description-title">
                <em>Project</em> Description
              </h2>
            </header>

            <div className="description-body">
              {projectNarrative.split("\n\n").map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {project.projectUrl && (
              <div className="live-project-cta-wrap">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-project-cta-btn"
                >
                  <span>View Live Project</span>
                  <i><ArrowUpRight size={16} /></i>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* 4. Optional Project Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="project-metrics-section">
            <div className="section-container">
              <div className="metrics-card-grid">
                {project.metrics.map((metric, idx) => (
                  <div className="metric-box" key={idx}>
                    <strong className="metric-box-val">{metric.value}</strong>
                    <span className="metric-box-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Optional Gallery / Screen Showcase */}
        {project.galleryUrls && project.galleryUrls.length > 0 && (
          <section className="project-gallery-section">
            <div className="section-container">
              <header className="gallery-header">
                <p className="gallery-eyebrow">VISUAL EXPERIENCE</p>
                <h3 className="gallery-heading">Interface & Visual Showcase</h3>
              </header>

              <div className="gallery-grid">
                {project.galleryUrls.map((url, gIdx) => (
                  <div className="gallery-frame" key={gIdx}>
                    <Image
                      src={url}
                      alt={`${project.title} screenshot ${gIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="gallery-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Next Project Navigation */}
        {nextProject && (
          <section className="next-case-section">
            <div className="section-container">
              <Link href={`/projects/${nextProject.slug}`} className="next-case-card">
                <div>
                  <span className="next-case-hint">NEXT CASE STUDY</span>
                  <h3 className="next-case-title">{nextProject.title}</h3>
                </div>
                <span className="next-case-arrow" aria-hidden="true">
                  <ArrowUpRight size={24} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* Global CTA */}
        <ContactCTA />
      </main>

      <Footer />
      <FooterBrandVisual />

      <style>{`
        .case-study-page {
          background: #ffffff;
          min-height: 100vh;
        }

        /* 1. Large Dark Hero */
        .case-study-hero {
          position: relative;
          display: flex;
          min-height: 80vh;
          align-items: center;
          background: linear-gradient(180deg, #07070b 0%, #0d0c14 60%, #131120 100%);
          color: #ffffff;
          padding: 130px 24px 180px;
          border-radius: 0 0 44px 44px;
          overflow: hidden;
        }

        .hero-background-media,
        .hero-background-overlay {
          position: absolute;
          inset: 0;
        }

        .hero-background-media {
          z-index: 0;
        }

        .hero-background-img {
          object-fit: cover;
        }

        .hero-background-overlay {
          z-index: 1;
          background: linear-gradient(180deg, rgba(7, 7, 11, 0.68) 0%, rgba(9, 8, 14, 0.78) 58%, rgba(13, 11, 20, 0.9) 100%);
        }

        .hero-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 480px;
          background: radial-gradient(ellipse at 50% 30%, rgba(117, 83, 200, 0.24) 0%, rgba(33, 27, 77, 0.08) 50%, transparent 75%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
        }

        .hero-breadcrumb-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .hero-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }

        .hero-back-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          transform: translateX(-3px);
        }

        .hero-text-block {
          text-align: center;
          max-width: 960px;
          margin: 0 auto;
        }

        .hero-project-title {
          margin: 0 0 36px;
          color: #ffffff;
          font-size: clamp(38px, 6vw, 68px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 28px rgba(0, 0, 0, 0.42);
        }

        .hero-metadata-row {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 36px 48px;
          padding: 16px 32px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
        }

        .hero-meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .meta-item-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }

        .meta-item-value {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
        }

        /* 2. Foreground Thumbnail */
        .overlap-image-section {
          position: relative;
          z-index: 10;
          height: clamp(330px, 40vw, 480px);
          padding: 0 24px;
        }

        .overlap-container {
          position: relative;
          max-width: 1180px;
          height: 100%;
          margin: 0 auto;
        }

        .project-thumbnail-img {
          object-fit: cover;
        }

        .thumbnail-image-frame {
          position: absolute;
          z-index: 2;
          top: -220px;
          left: 50%;
          width: 80%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 22px;
          background: #f2f2f2;
          box-shadow: 0 26px 64px rgba(0, 0, 0, 0.24), 0 4px 18px rgba(0, 0, 0, 0.1);
          transform: translateX(-50%);
        }

        /* 3. Project Description Section */
        .project-description-section {
          padding: 90px 24px 70px;
          background: #ffffff;
        }

        .description-container {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        .description-header {
          margin-bottom: 32px;
        }

        .description-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111111;
        }

        .description-title em {
          font-style: italic;
          font-family: serif;
          font-weight: 400;
        }

        .description-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 36px;
        }

        .description-body p {
          font-size: clamp(17px, 2.1vw, 22px);
          line-height: 1.7;
          color: #3a3a3a;
          font-weight: 400;
        }

        .live-project-cta-wrap {
          display: flex;
          justify-content: center;
        }

        .live-project-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #000000;
          color: #ffffff;
          padding: 13px 26px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .live-project-cta-btn:hover {
          background: #242424;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }

        .live-project-cta-btn i {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 4. Project Metrics */
        .project-metrics-section {
          padding: 40px 24px 60px;
          background: #fbfbfb;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .section-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        .metrics-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .metric-box {
          background: #ffffff;
          border: 1px solid #ebebeb;
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        .metric-box-val {
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1;
        }

        .metric-box-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #777777;
        }

        /* 5. Gallery Screens */
        .project-gallery-section {
          padding: 80px 24px 100px;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 44px;
        }

        .gallery-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888888;
          margin-bottom: 8px;
        }

        .gallery-heading {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111111;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .gallery-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 22px;
          overflow: hidden;
          background: #f0f0f0;
          border: 1px solid #e8e8e8;
        }

        .gallery-img {
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-frame:hover .gallery-img {
          transform: scale(1.03);
        }

        /* 6. Next Project Card */
        .next-case-section {
          padding: 20px 24px 80px;
        }

        .next-case-card {
          background: linear-gradient(135deg, #0e0e13 0%, #1a1926 100%);
          color: #ffffff;
          border-radius: 26px;
          padding: 44px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .next-case-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .next-case-hint {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 8px;
        }

        .next-case-title {
          font-size: clamp(22px, 3.2vw, 36px);
          font-weight: 700;
          color: #ffffff;
        }

        .next-case-arrow {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .next-case-card:hover .next-case-arrow {
          background: #ffffff;
          color: #000000;
          transform: scale(1.1);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .case-study-hero {
            padding: 110px 20px 140px;
            border-radius: 0 0 32px 32px;
          }

          .hero-metadata-row {
            gap: 24px;
            padding: 14px 20px;
          }

          .overlap-image-section {
            height: 300px;
            padding: 0 16px;
          }

          .thumbnail-image-frame {
            top: -150px;
            width: 72%;
            border-radius: 18px;
          }

          .project-description-section {
            padding: 60px 20px 50px;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .next-case-card {
            padding: 32px 24px;
          }
        }

        @media (max-width: 600px) {
          .overlap-image-section {
            height: 170px;
            padding: 0 12px;
          }

          .thumbnail-image-frame {
            top: -82px;
            width: 86%;
            border-radius: 15px;
            box-shadow: 0 18px 42px rgba(0, 0, 0, 0.22), 0 3px 12px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </>
  );
}
