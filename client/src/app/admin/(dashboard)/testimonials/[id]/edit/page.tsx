import TestimonialForm from "@/components/admin/testimonials/testimonial-form";
export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <TestimonialForm testimonialId={id} />; }
