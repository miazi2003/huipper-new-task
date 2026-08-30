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
      "UI/UX Design, App Design, Website Design, Dashboard Design, Wireframing & Prototyping, Interaction Design, and Product Design.",
    href: "/services/ui-ux-design",
    projects: [
      {
        image: "/images/services-showcase/ui-ux-web-platform.webp",
        alt: "Web platform interface presented on a laptop",
        column: "left",
        fallback: "linear-gradient(155deg, #a9dcff 0%, #74bdea 46%, #277cad 100%)",
      },
      {
        image: "/images/services-showcase/ui-ux-finance-app.webp",
        alt: "Finance application interface presented on a phone",
        column: "right",
        fallback: "linear-gradient(155deg, #d8ff91 0%, #aee84c 48%, #5f9b09 100%)",
      },
    ],
  },
  {
    id: "web-development",
    titlePrefix: "Web",
    titleItalic: "Development",
    description:
      "Frontend Development, Backend Development, Full Stack Solutions, Mobile App Development, Custom Web Applications, API Integration.",
    href: "/services/web-development",
    projects: [
      {
        image: "/images/services-showcase/web-dashboard.webp",
        alt: "Analytics dashboard displayed on a tablet",
        column: "left",
        fallback: "linear-gradient(155deg, #ff8e79 0%, #ff6749 47%, #bd2f09 100%)",
      },
      {
        image: "/images/services-showcase/web-commerce.webp",
        alt: "Commerce website displayed on a tablet",
        column: "right",
        fallback: "linear-gradient(155deg, #fff5b5 0%, #ffd452 52%, #ca8711 100%)",
      },
    ],
  },
  {
    id: "logo-branding",
    titlePrefix: "Logo &",
    titleItalic: "Branding",
    description:
      "Logo Design, Visual Identity, Brand Strategy, Brand Guidelines, Marketing Collateral, and Packaging Design.",
    href: "/services/branding",
    projects: [
      {
        image: "/images/services-showcase/branding-identity.webp",
        alt: "Colorful brand identity system",
        column: "left",
        fallback: "linear-gradient(145deg, #896add 0%, #5c3ba6 48%, #211b4d 100%)",
      },
      {
        image: "/images/services-showcase/branding-packaging.webp",
        alt: "Branded product packaging collection",
        column: "right",
        fallback: "linear-gradient(145deg, #ff9dc7 0%, #f35495 48%, #9f1a54 100%)",
      },
    ],
  },
  {
    id: "webflow-framer",
    titlePrefix: "Webflow &",
    titleItalic: "Framer",
    description:
      "Webflow Development, Framer Development, Responsive Builds, CMS Architecture, Motion, and Launch Support.",
    href: "/services/webflow-framer",
    projects: [
      {
        image: "/images/services-showcase/webflow-showcase.webp",
        alt: "Webflow website experience",
        column: "left",
        fallback: "linear-gradient(145deg, #58dfc2 0%, #0c9e83 50%, #075246 100%)",
      },
      {
        image: "/images/services-showcase/framer-showcase.webp",
        alt: "Framer website experience",
        column: "right",
        fallback: "linear-gradient(145deg, #7bb8ff 0%, #386be3 50%, #14296e 100%)",
      },
    ],
  },
];
