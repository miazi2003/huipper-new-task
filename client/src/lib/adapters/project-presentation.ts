import type { CaseStudy } from "@/data/caseStudies";
import { caseStudies as defaultCaseStudies } from "@/data/caseStudies";
import type { Project } from "@/lib/api/projects";

const DEFAULT_BACKGROUND_COLORS = [
  "#eba0f5",
  "#b4dff5",
  "#dcffad",
  "#ffca4c",
  "#ffaaa9",
  "#9bd5f7",
];

export function adaptProjectToCaseStudy(
  project: Project,
  index: number,
  fallback?: CaseStudy,
): CaseStudy {
  const defaultBg = DEFAULT_BACKGROUND_COLORS[index % DEFAULT_BACKGROUND_COLORS.length];
  const backgroundColor = fallback?.backgroundColor || defaultBg;

  const category = project.category?.trim() || project.industry?.trim() || fallback?.category || "Digital Product";
  const title = project.title?.trim() || fallback?.title || "Untitled Project";
  const description =
    project.shortDescription?.trim() || project.description?.trim() || fallback?.description || "";

  const metric1 = project.metrics?.[0];
  const metric2 = project.metrics?.[1];

  const metricOneLabel = metric1?.label?.trim() || fallback?.metricOneLabel || "Scope";
  const metricOneValue = metric1?.value?.trim() || fallback?.metricOneValue || "Web & Mobile";
  const metricTwoLabel = metric2?.label?.trim() || fallback?.metricTwoLabel || "Impact";
  const metricTwoValue = metric2?.value?.trim() || fallback?.metricTwoValue || "High Growth";

  const clientName = project.clientName?.trim() || fallback?.clientName || "Client Partner";
  const clientRole =
    project.services?.[0]?.trim() || project.industry?.trim() || fallback?.clientRole || "Product Lead";
  const clientImage = fallback?.clientImage || "";

  const projectImage =
    project.coverImageUrl?.trim() || project.thumbnailUrl?.trim() || fallback?.projectImage || "/images/hero/affine.png";

  return {
    category,
    title,
    description,
    metricOneLabel,
    metricOneValue,
    metricTwoLabel,
    metricTwoValue,
    clientName,
    clientRole,
    clientImage,
    projectImage,
    backgroundColor,
  };
}

export function adaptProjectsToCaseStudies(
  projects: Project[],
  fallbackList: CaseStudy[] = defaultCaseStudies,
): CaseStudy[] {
  if (!projects || projects.length === 0) {
    return fallbackList;
  }

  return projects.map((project, index) => {
    const fallback = fallbackList[index] || fallbackList[index % fallbackList.length];
    return adaptProjectToCaseStudy(project, index, fallback);
  });
}

