export type ServiceProject = {
  image: string;
  alt: string;
  column: "left" | "right";
  fallback: string;
};

export type ServiceShowcase = {
  id: string;
  titlePrefix: string;
  titleItalic: string;
  description: string;
  href: string;
  projects: ServiceProject[];
};

export const servicesShowcase: ServiceShowcase[] = [
  {
    id: "ui-ux-design",
    titlePrefix: "UI/UX",
    titleItalic: "Design",
    description:
      "UI/UX Design, App Design, Website Design, Dashboard Design, Wireframing & Prototyping, Interaction Design, Product Design",
    href: "/services/ui-ux-design",
    projects: [
      {
        image: "/images/services-showcase/ui-ux-web-platform.webp",
        alt: "SaaS Analytics & Web Platform UI/UX Mockup",
        column: "left",
        fallback: "linear-gradient(155deg, #15102a 0%, #2e1a5a 50%, #0d081e 100%)",
      },
      {
        image: "/images/services-showcase/ui-ux-finance-app.webp",
        alt: "Fintech Mobile App 3D Mockup",
        column: "right",
        fallback: "linear-gradient(155deg, #0d2b11 0%, #17541f 50%, #061708 100%)",
      },
    ],
  },
  {
    id: "web-development",
    titlePrefix: "Web",
    titleItalic: "Development",
    description:
      "Frontend Development, Backend Development, Full Stack Solutions, Mobile App Development, Custom Web Applications, API Integration",
    href: "/services/web-development",
    projects: [
      {
        image: "/images/services-showcase/web-dashboard.webp",
        alt: "Cloud Developer Dashboard & Web Platform",
        column: "left",
        fallback: "linear-gradient(155deg, #2b110a 0%, #542214 50%, #140704 100%)",
      },
      {
        image: "/images/services-showcase/web-commerce.webp",
        alt: "Modern E-Commerce Web Application",
        column: "right",
        fallback: "linear-gradient(155deg, #2b2308 0%, #574610 50%, #141003 100%)",
      },
    ],
  },
  {
    id: "logo-branding",
    titlePrefix: "Logo &",
    titleItalic: "Branding",
    description:
      "Logo Design, Visual Identity, Brand Strategy, Brand Guidelines, Marketing Collateral, Packaging Design",
    href: "/services/branding",
    projects: [
      {
        image: "/images/services-showcase/branding-identity.webp",
        alt: "Brand Identity & Stationery System",
        column: "left",
        fallback: "linear-gradient(145deg, #26164d 0%, #46298a 50%, #110924 100%)",
      },
      {
        image: "/images/services-showcase/branding-packaging.webp",
        alt: "Premium Product Packaging Mockup",
        column: "right",
        fallback: "linear-gradient(145deg, #421028 0%, #7d1f4d 50%, #1e0612 100%)",
      },
    ],
  },
  {
    id: "webflow-framer",
    titlePrefix: "Webflow &",
    titleItalic: "Framer",
    description:
      "Webflow Development, Framer Development, Responsive Builds, CMS Architecture, Motion & Animation, Launch Support",
    href: "/services/webflow-framer",
    projects: [
      {
        image: "/images/services-showcase/webflow-showcase.webp",
        alt: "Interactive 3D Webflow Website Experience",
        column: "left",
        fallback: "linear-gradient(145deg, #09332c 0%, #136658 50%, #041714 100%)",
      },
      {
        image: "/images/services-showcase/framer-showcase.webp",
        alt: "Fluid Motion Framer Digital Experience",
        column: "right",
        fallback: "linear-gradient(145deg, #0d1e47 0%, #1a3c8c 50%, #060e21 100%)",
      },
    ],
  },
];
