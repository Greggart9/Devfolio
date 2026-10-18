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

  const rawAdmin = process.env.ADMIN_EMAIL || "oluwadamilare.greggart9@gmail.com";
  const allowedAdmin = rawAdmin.replace(/['"]/g, "").trim().toLowerCase();

  if (!user || !user.email || user.email.toLowerCase() !== allowedAdmin) {
    throw new Error(`Unauthorized: Current session is not authorized for ${allowedAdmin}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertProject(formData: any) {
  try {
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
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath(`/projects/${formData.slug}`);
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save project" };
  }
}

export async function deleteProject(slug: string) {
  try {
    await assertAdmin();
    const supabase = createAdminClient();

    const { error } = await supabase.from("projects").delete().eq("slug", slug);

    if (error) {
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath(`/projects/${slug}`);
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete project" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertService(serviceData: any) {
  try {
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
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/services");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save service" };
  }
}

export async function deleteService(id: string) {
  try {
    await assertAdmin();
    const supabase = createAdminClient();

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/services");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete service" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertSkill(skillData: any) {
  try {
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
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await assertAdmin();
    const supabase = createAdminClient();

    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete skill" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PROFILE UPDATE
// ─────────────────────────────────────────────────────────────────────────────

export async function updateAboutProfile(profileData: any) {
  try {
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
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update profile" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQS CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function upsertFaq(faqData: any) {
  try {
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
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save FAQ" };
  }
}

export async function deleteFaq(id: string) {
  try {
    await assertAdmin();
    const supabase = createAdminClient();

    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
      return { success: false, error: `Database error: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete FAQ" };
  }
}
