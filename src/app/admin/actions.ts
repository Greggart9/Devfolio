"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// Helper to assert admin authorization
async function assertAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowedAdmin = process.env.ADMIN_EMAIL || "oluwadamilare.greggart9@gmail.com";
  if (!user || user.email?.toLowerCase() !== allowedAdmin.toLowerCase()) {
    throw new Error("Unauthorized: Only admin can perform this action");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertProject(formData: any) {
  await assertAdmin();
  const supabase = createAdminClient();

  const projectPayload = {
    slug: formData.slug.trim().toLowerCase(),
    title: formData.title.trim(),
    tagline: formData.tagline || "",
    category: formData.category || "Website",
    industry: formData.industry || "",
    service: formData.service || "",
    year: formData.year || "2026",
    client: formData.client || "Personal Project",
    role: formData.role || "",
    duration: formData.duration || "",
    description: formData.description || "",
    challenge: formData.challenge || "",
    solution: formData.solution || "",
    tags: formData.tags || [],
    cover: formData.cover || "",
    hero: formData.hero || formData.cover || "",
    video: formData.video || "",
    screens: formData.screens || [],
    live_url: formData.liveUrl || "",
    github_url: formData.githubUrl || "",
    display_order: parseInt(formData.display_order) || 0,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("projects")
    .upsert(projectPayload, { onConflict: "slug" });

  if (error) {
    throw new Error(`Failed to save project: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath(`/projects/${formData.slug}`);
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(slug: string) {
  await assertAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.from("projects").delete().eq("slug", slug);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertService(serviceData: any) {
  await assertAdmin();
  const supabase = createAdminClient();

  const payload: any = {
    title: serviceData.title,
    desc_text: serviceData.desc,
    icon: serviceData.icon || "✦",
    image: serviceData.image,
    tools: serviceData.tools || [],
    display_order: parseInt(serviceData.display_order) || 0,
  };

  if (serviceData.id) {
    payload.id = serviceData.id;
  }

  const { error } = await supabase.from("services").upsert(payload);

  if (error) {
    throw new Error(`Failed to save service: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  await assertAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete service: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertSkill(skillData: any) {
  await assertAdmin();
  const supabase = createAdminClient();

  const payload: any = {
    label: skillData.label,
    theme: skillData.theme || "dark",
    display_order: parseInt(skillData.display_order) || 0,
  };

  if (skillData.id) {
    payload.id = skillData.id;
  }

  const { error } = await supabase.from("skills").upsert(payload);

  if (error) {
    throw new Error(`Failed to save skill: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  await assertAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete skill: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PROFILE UPDATE
// ─────────────────────────────────────────────────────────────────────────────

export async function updateAboutProfile(profileData: any) {
  await assertAdmin();
  const supabase = createAdminClient();

  const payload: any = {
    headline: profileData.headline,
    subheadline: profileData.subheadline,
    intro: profileData.intro,
    detailed_bio: profileData.detailed_bio,
    highlights: profileData.highlights || [],
    experience_years: profileData.experience_years || "3+",
    resume_url: profileData.resume_url,
    avatar_url: profileData.avatar_url,
    updated_at: new Date().toISOString(),
  };

  if (profileData.id) {
    payload.id = profileData.id;
  }

  const { error } = await supabase.from("about_profile").upsert(payload);

  if (error) {
    throw new Error(`Failed to update about profile: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/about");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQS CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertFaq(faqData: any) {
  await assertAdmin();
  const supabase = createAdminClient();

  const payload: any = {
    category: faqData.category,
    q: faqData.q,
    a: faqData.a,
    display_order: parseInt(faqData.display_order) || 0,
  };

  if (faqData.id) {
    payload.id = faqData.id;
  }

  const { error } = await supabase.from("faqs").upsert(payload);

  if (error) {
    throw new Error(`Failed to save FAQ: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { success: true };
}

export async function deleteFaq(id: string) {
  await assertAdmin();
  const supabase = createAdminClient();

  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete FAQ: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { success: true };
}
