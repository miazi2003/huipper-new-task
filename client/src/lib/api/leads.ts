export type LeadStatus = "new" | "contacted" | "closed";
export type Lead = { id: string; name: string; email: string; phone: string; company: string; subject: string; message: string; source: string; status: LeadStatus; createdAt: string; updatedAt: string };
export type LeadList = { leads: Lead[]; pagination: { page: number; limit: number; total: number; pages: number }; counts: { new: number } };
export type ContactInput = { name: string; email: string; phone?: string; company?: string; subject?: string; message: string; source?: string };
type Failure = { success: false; error: string; details?: Array<{ field: string; message: string }> };
type DataSuccess<T> = { success: true; data: T }; type MessageSuccess = { success: true; message: string };
export class LeadApiError extends Error { constructor(message: string, public status: number, public details?: Failure["details"]) { super(message); } }
async function parse<T>(response: Response) {
  const body = await response.json().catch(() => ({ success: false, error: "Invalid server response" })) as DataSuccess<T> | Failure;
  if (!response.ok || !body.success) { const failure = body as Failure; throw new LeadApiError(failure.error || "Request failed", response.status, failure.details); }
  return body.data;
}
async function adminRequest<T>(path: string, init?: RequestInit) { return parse<T>(await fetch(path, { ...init, credentials: "same-origin", headers: { "Content-Type": "application/json", ...init?.headers } })); }
export async function submitContactForm(input: ContactInput) {
  const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  const body = await response.json().catch(() => ({ success: false, error: "Invalid server response" })) as MessageSuccess | Failure;
  if (!response.ok || !body.success) { const failure = body as Failure; throw new LeadApiError(failure.error || "Your message could not be sent", response.status, failure.details); }
  return body.message;
}
export function listAdminLeads(filters: { search?: string; status?: string; page?: number } = {}) { const params = new URLSearchParams({ page: String(filters.page ?? 1), limit: "20" }); if (filters.search) params.set("search", filters.search); if (filters.status) params.set("status", filters.status); return adminRequest<LeadList>(`/api/admin/leads?${params}`); }
export const getAdminLead = (id: string) => adminRequest<Lead>(`/api/admin/leads/${encodeURIComponent(id)}`);
export const updateAdminLeadStatus = (id: string, status: LeadStatus) => adminRequest<Lead>(`/api/admin/leads/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) });
export const deleteAdminLead = (id: string) => adminRequest<Lead>(`/api/admin/leads/${encodeURIComponent(id)}`, { method: "DELETE" });
