export type ProjectStatus = "draft" | "published";

export type ProjectMetric = { label: string; value: string };
export type ProjectSeo = { title: string; description: string; imageUrl: string };

export type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  clientName: string;
  industry: string;
  category: string;
  services: string[];
  technologies: string[];
  thumbnailUrl: string;
  coverImageUrl: string;
  galleryUrls: string[];
  projectUrl: string;
  caseStudyUrl: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  metrics: ProjectMetric[];
  seo: ProjectSeo;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;
export type ProjectList = {
  projects: Project[];
  pagination: { page: number; limit: number; total: number; pages: number };
};

type ApiSuccess<T> = { success: true; data: T };
type ApiFailure = { success: false; error: string; details?: Array<{ field: string; message: string }> };

export class ProjectApiError extends Error {
  constructor(message: string, public status: number, public details?: ApiFailure["details"]) {
    super(message);
  }
}

function resolveApiUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (typeof window !== "undefined") return path;
  const serverApiUrl = process.env.SERVER_API_URL ?? "http://127.0.0.1:4000";
  return `${serverApiUrl}${path}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = resolveApiUrl(path);
  const response = await fetch(url, {
    ...init,
    credentials: typeof window !== "undefined" ? "same-origin" : undefined,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = (await response.json().catch(() => ({ success: false, error: "Invalid server response" }))) as ApiSuccess<T> | ApiFailure;
  if (!response.ok || !body.success) {
    const failure = body as ApiFailure;
    throw new ProjectApiError(failure.error || "Request failed", response.status, failure.details);
  }
  return body.data;
}

export function listAdminProjects(filters: { search?: string; status?: string; featured?: string; page?: number; limit?: number } = {}) {
  const params = new URLSearchParams({ limit: String(filters.limit ?? 20), page: String(filters.page ?? 1) });
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.featured) params.set("featured", filters.featured);
  return request<ProjectList>(`/api/admin/projects?${params}`);
}

export const getAdminProject = (id: string) => request<Project>(`/api/admin/projects/${encodeURIComponent(id)}`);
export const createAdminProject = (input: ProjectInput) => request<Project>("/api/admin/projects", { method: "POST", body: JSON.stringify(input) });
export const updateAdminProject = (id: string, input: ProjectInput) => request<Project>(`/api/admin/projects/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteAdminProject = (id: string) => request<Project>(`/api/admin/projects/${encodeURIComponent(id)}`, { method: "DELETE" });

export function listPublicProjects(filters: { search?: string; featured?: string; page?: number; limit?: number } = {}) {
  const params = new URLSearchParams({ limit: String(filters.limit ?? 20), page: String(filters.page ?? 1) });
  if (filters.search) params.set("search", filters.search);
  if (filters.featured) params.set("featured", filters.featured);
  return request<ProjectList>(`/api/projects?${params}`);
}

export const getPublicProject = (slug: string) => request<Project>(`/api/projects/${encodeURIComponent(slug)}`);

