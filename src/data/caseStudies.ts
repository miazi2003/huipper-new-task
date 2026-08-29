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
    title: "Designing A Lawyer's Second Brain",
    description: "We designed an intuitive AI workspace that simplifies legal research, document analysis, and drafting while helping professionals work with speed & confidence.",
    metricOneLabel: "Scope",
    metricOneValue: "Branding, Web Design",
    metricTwoLabel: "Duration",
    metricTwoValue: "2 Months",
    clientName: "Avneet Chattha",
    clientRole: "Bearister AI CEO",
    clientImage: "",
    projectImage: "/images/hero/affine.png",
    backgroundColor: "#eba0f5",
  },
  {
    category: "FMCG",
    title: "A Fresh Identity Built to Stand Out",
    description: "A vibrant digital experience that helps a growing consumer brand connect with its audience and turn everyday products into memorable moments.",
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
    title: "Payments Without the Friction",
    description: "We simplified complex financial workflows into a clear mobile experience that makes international payments feel fast, familiar, and secure.",
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
    title: "Making Learning Feel Effortless",
    description: "A focused learning platform designed to guide students, simplify discovery, and keep progress visible from the first lesson to the final goal.",
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
    title: "One Smooth Journey From Search to Stay",
    description: "We brought planning, comparison, and booking into one confident flow that helps travelers move from inspiration to confirmation without friction.",
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
    title: "A Smarter Way to Sweat",
    description: "Finding the right gym, booking classes, and tracking fitness goals now feel like one smooth journey instead of separate everyday tasks.",
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
