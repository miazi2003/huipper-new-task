export type TestimonialType = "text" | "video";
export type TestimonialStatus = "draft" | "published";
export type Testimonial = {
  id: string; name: string; role: string; company: string; quote: string; avatar: string; companyLogo: string;
  rating: number | null; type: TestimonialType; videoUrl: string; videoPoster: string; featured: boolean;
  status: TestimonialStatus; order: number; projectId: string | null; createdAt: string; updatedAt: string;
};
export type TestimonialInput = Omit<Testimonial, "id" | "createdAt" | "updatedAt">;
export type TestimonialList = { testimonials: Testimonial[]; pagination: { page: number; limit: number; total: number; pages: number } };
type Failure = { success: false; error: string; details?: Array<{ field: string; message: string }> };
type Success<T> = { success: true; data: T };

export class TestimonialApiError extends Error {
  constructor(message: string, public status: number, public details?: Failure["details"]) { super(message); }
}
async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, { ...init, credentials: "same-origin", headers: { "Content-Type": "application/json", ...init?.headers } });
  const body = await response.json().catch(() => ({ success: false, error: "Invalid server response" })) as Success<T> | Failure;
  if (!response.ok || !body.success) {
    const failure = body as Failure;
    throw new TestimonialApiError(failure.error || "Request failed", response.status, failure.details);
  }
  return body.data;
}

export function listAdminTestimonials(filters: { search?: string; status?: string; type?: string; featured?: string; page?: number } = {}) {
  const params = new URLSearchParams({ page: String(filters.page ?? 1), limit: "20" });
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.type) params.set("type", filters.type);
  if (filters.featured) params.set("featured", filters.featured);
  return request<TestimonialList>(`/api/admin/testimonials?${params}`);
}
export const getAdminTestimonial = (id: string) => request<Testimonial>(`/api/admin/testimonials/${encodeURIComponent(id)}`);
export const createAdminTestimonial = (input: TestimonialInput) => request<Testimonial>("/api/admin/testimonials", { method: "POST", body: JSON.stringify(input) });
export const updateAdminTestimonial = (id: string, input: TestimonialInput) => request<Testimonial>(`/api/admin/testimonials/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteAdminTestimonial = (id: string) => request<Testimonial>(`/api/admin/testimonials/${encodeURIComponent(id)}`, { method: "DELETE" });
