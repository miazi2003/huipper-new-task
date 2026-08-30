export type CaseStudy = {
  category: string;
  title: string;
  description: string;
  metricOneLabel: string;
  metricOneValue: string;
  metricTwoLabel: string;
  metricTwoValue: string;
  clientName: string;
  clientRole: string;
  clientImage: string;
  projectImage: string;
  backgroundColor: string;
};

export const caseStudies: CaseStudy[] = [
  {
    category: "AI SaaS.",
    title: "Turning Complex AI Into a Clear Product",
    description: "Huipper shaped an intuitive legal workspace that makes research, document analysis, and drafting feel faster, clearer, and easier to trust.",
    metricOneLabel: "Scope",
    metricOneValue: "Branding, Web Design",
    metricTwoLabel: "Duration",
    metricTwoValue: "2 Months",
    clientName: "Avneet Chattha",
    clientRole: "Barrister AI CEO",
    clientImage: "",
    projectImage: "/images/hero/affine.png",
    backgroundColor: "#eba0f5",
  },
  {
    category: "FMCG",
    title: "A Bold Brand Experience Made to Connect",
    description: "Huipper created a vibrant digital identity that helps a growing consumer brand earn attention and turn everyday interactions into memorable moments.",
    metricOneLabel: "Impact",
    metricOneValue: "3X Engagement",
    metricTwoLabel: "Delivery",
    metricTwoValue: "8 Weeks",
    clientName: "Mina Park",
    clientRole: "Gummiz Founder",
    clientImage: "",
    projectImage: "/images/hero/gummiz.jpg",
    backgroundColor: "#b4dff5",
  },
  {
    category: "FinTech",
    title: "Making Global Payments Feel Effortless",
    description: "We transformed complex financial workflows into a confident mobile experience where international payments feel fast, familiar, and secure.",
    metricOneLabel: "Conversion",
    metricOneValue: "+64% Growth",
    metricTwoLabel: "Markets",
    metricTwoValue: "12 Countries",
    clientName: "Luca Moretti",
    clientRole: "PlentyPay CEO",
    clientImage: "",
    projectImage: "/images/hero/plentypay.png",
    backgroundColor: "#dcffad",
  },
  {
    category: "EdTech",
    title: "A Learning Journey Designed for Momentum",
    description: "Huipper designed a focused platform that guides students, simplifies discovery, and keeps progress visible from the first lesson to the final goal.",
    metricOneLabel: "Students",
    metricOneValue: "50K+ Active",
    metricTwoLabel: "Retention",
    metricTwoValue: "+38%",
    clientName: "Noah Wilson",
    clientRole: "Product Director",
    clientImage: "",
    projectImage: "/images/hero/the-gridline.png",
    backgroundColor: "#ffca4c",
  },
  {
    category: "Booking Platform",
    title: "From Inspiration to Booking in One Flow",
    description: "We united planning, comparison, and booking in one polished journey that helps travelers move from discovery to confirmation without friction.",
    metricOneLabel: "Bookings",
    metricOneValue: "+72%",
    metricTwoLabel: "Task Time",
    metricTwoValue: "40% Faster",
    clientName: "Emma Taylor",
    clientRole: "Platform Lead",
    clientImage: "",
    projectImage: "/images/hero/oter.png",
    backgroundColor: "#ffaaa9",
  },
  {
    category: "Fitness",
    title: "Fitness Experiences That Keep People Moving",
    description: "Huipper brought gym discovery, class booking, and goal tracking into one seamless product designed around everyday motivation.",
    metricOneLabel: "Revenue",
    metricOneValue: "10X Business",
    metricTwoLabel: "Saving",
    metricTwoValue: "600 /Hr",
    clientName: "Daniel Wight",
    clientRole: "Fitmate CEO",
    clientImage: "",
    projectImage: "/images/hero/fitmate.png",
    backgroundColor: "#9bd5f7",
  },
];
