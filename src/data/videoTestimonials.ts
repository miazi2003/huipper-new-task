export type VideoTestimonial = {
  id: string;
  name: string;
  company: string;
  logo: string;
  poster: string;
  videoSrc?: string;
  quote: string;
  backgroundColor: string;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "carbobon",
    name: "Tasfia",
    company: "CarboBon",
    logo: "",
    poster: "",
    videoSrc: "",
    quote: "A fantastic experience working with Design Monks. They delivered more than we imagined.",
    backgroundColor: "#a8caa0",
  },
  {
    id: "relaxy",
    name: "Tahmina Rahman",
    company: "Relaxy",
    logo: "",
    poster: "",
    videoSrc: "",
    quote: "Design Monks felt like part of our team. They understood our vision and brought it to life.",
    backgroundColor: "#adf0e3",
  },
  {
    id: "klasio",
    name: "Mahmudul Hasan",
    company: "klasio",
    logo: "",
    poster: "",
    videoSrc: "",
    quote: "The whole Design Monks team made a complex product feel clear, useful, and beautifully simple.",
    backgroundColor: "#b4a8f1",
  },
  {
    id: "ontik",
    name: "Moshiur Rahman Redif",
    company: "Ontik Technology",
    logo: "",
    poster: "",
    videoSrc: "",
    quote: "We have worked with Design Monks for more than 10 projects, and the quality stays exceptional.",
    backgroundColor: "#cceaf8",
  },
  {
    id: "medease",
    name: "Arvin",
    company: "MEDEASE",
    logo: "",
    poster: "",
    videoSrc: "",
    quote: "We tried many designers before, but the Monks finally worked out exactly what we needed.",
    backgroundColor: "#ffe399",
  },
];
