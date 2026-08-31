import type { Testimonial as UiTextTestimonial } from "@/data/testimonials";
import { testimonials as defaultTextTestimonials } from "@/data/testimonials";
import type { VideoTestimonial as UiVideoTestimonial } from "@/data/videoTestimonials";
import { videoTestimonials as defaultVideoTestimonials } from "@/data/videoTestimonials";
import type { Testimonial as CmsTestimonial } from "@/lib/api/testimonials";

const DEFAULT_TEXT_AVATAR_COLORS = [
  "#f2d9ee",
  "#9fc995",
  "#c9baf0",
  "#b8d9ef",
  "#f0c7a7",
  "#d2c7eb",
  "#b8dcbf",
  "#e8c6b8",
];

const DEFAULT_VIDEO_BG_COLORS = [
  "#a8caa0",
  "#adf0e3",
  "#c9baf0",
  "#cceaf8",
  "#ffe399",
];

export function adaptCmsToTextTestimonial(
  cms: CmsTestimonial,
  index: number,
  fallback?: UiTextTestimonial,
): UiTextTestimonial {
  const defaultColor = DEFAULT_TEXT_AVATAR_COLORS[index % DEFAULT_TEXT_AVATAR_COLORS.length];
  const avatarColor = fallback?.avatarColor || defaultColor;

  const name = cms.name?.trim() || fallback?.name || "Client";
  let role = cms.role?.trim() || "";
  const company = cms.company?.trim() || "";

  if (role && company && !role.includes("@") && !role.includes(company)) {
    role = `${role} @ ${company}`;
  } else if (!role && company) {
    role = `Client @ ${company}`;
  } else if (!role && fallback?.role) {
    role = fallback.role;
  }

  const quote = cms.quote?.trim() || fallback?.quote || "";

  return {
    name,
    role,
    quote,
    avatarColor,
  };
}

export function adaptCmsToTextTestimonials(
  cmsList: CmsTestimonial[],
  fallbackList: UiTextTestimonial[] = defaultTextTestimonials,
): UiTextTestimonial[] {
  const textItems = cmsList.filter((item) => item.type === "text" || !item.type);
  if (!textItems || textItems.length === 0) {
    return fallbackList;
  }

  return textItems.map((cms, index) => {
    const fallback = fallbackList[index] || fallbackList[index % fallbackList.length];
    return adaptCmsToTextTestimonial(cms, index, fallback);
  });
}

export function adaptCmsToVideoTestimonial(
  cms: CmsTestimonial,
  index: number,
  fallback?: UiVideoTestimonial,
): UiVideoTestimonial {
  const defaultBg = DEFAULT_VIDEO_BG_COLORS[index % DEFAULT_VIDEO_BG_COLORS.length];
  const backgroundColor = fallback?.backgroundColor || defaultBg;

  const id = cms.id || fallback?.id || `video-testimonial-${index}`;
  const name = cms.name?.trim() || fallback?.name || "Client";
  let role = cms.role?.trim() || "";
  const company = cms.company?.trim() || fallback?.company || "Company";

  if (role && company && !role.includes("@") && !role.includes(company)) {
    role = `${role} @ ${company}`;
  } else if (!role && fallback?.role) {
    role = fallback.role;
  }

  const quote = cms.quote?.trim() || fallback?.quote || "";
  const logo = cms.companyLogo?.trim() || fallback?.logo || "";
  const poster = cms.videoPoster?.trim() || fallback?.poster || "";
  const videoSrc = cms.videoUrl?.trim() || fallback?.videoSrc || "";

  return {
    id,
    name,
    role,
    company,
    logo,
    poster,
    videoSrc,
    quote,
    backgroundColor,
  };
}

export function adaptCmsToVideoTestimonials(
  cmsList: CmsTestimonial[],
  fallbackList: UiVideoTestimonial[] = defaultVideoTestimonials,
): UiVideoTestimonial[] {
  const videoItems = cmsList.filter((item) => item.type === "video");
  if (!videoItems || videoItems.length === 0) {
    return fallbackList;
  }

  return videoItems.map((cms, index) => {
    const fallback = fallbackList[index] || fallbackList[index % fallbackList.length];
    return adaptCmsToVideoTestimonial(cms, index, fallback);
  });
}

