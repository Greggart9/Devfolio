import { createAdminClient } from "@/lib/supabase/admin";
import {
  projects as fallbackProjects,
  services as fallbackServices,
  faqs as fallbackFaqs,
  Project,
  FaqCategory,
} from "@/lib/data";

export interface SkillItem {
  id?: string;
  label: string;
  theme: "white" | "dark" | "accent";
  display_order?: number;
}

export interface ServiceItem {
  id?: string;
  image: string;
  icon: string;
  title: string;
  desc: string;
  tools: string[];
  display_order?: number;
}

export interface AboutProfile {
  id?: string;
  headline: string;
  subheadline: string;
  intro: string;
  detailed_bio: string;
  highlights: string[];
  experience_years: string;
  resume_url: string;
  avatar_url?: string;
}

export interface FaqItem {
  id?: string;
  category: FaqCategory;
  q: string;
  a: string;
  display_order?: number;
}

const fallbackAboutProfile: AboutProfile = {
  headline: "Code that's clean,",
  subheadline: "fast & production-ready.",
  intro:
    "I’m Olúwadámiláre, a frontend developer focused on building visually engaging, high-performance web applications. I bridge design aesthetics with solid technical execution.",
  detailed_bio:
    "My focus is on modern web development. I’ve spent the last few years developing different types of web applications. I thrive on the technical challenges of the frontend, whether that means optimizing Core Web Vitals under the hood or ensuring a complex UI is perfectly responsive.",
  highlights: [
    "Pixel-Perfect UI Execution",
    "App Router & Server Actions",
    "Sub-300ms Fluid Animations",
    "100% Responsive & Accessible",
  ],
  experience_years: "3+",
  resume_url:
    "https://docs.google.com/document/d/1-ueGgt97JmLLSbXA332Heyxcb5Q2HGiqcsIMSbmqOhg/edit?usp=sharing",
  avatar_url:
    "https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png",
};

const fallbackSkills: SkillItem[] = [
  { label: "React", theme: "white" },
  { label: "Next.js", theme: "dark" },
  { label: "TypeScript", theme: "accent" },
  { label: "Tailwind CSS", theme: "dark" },
  { label: "Framer Motion", theme: "white" },
  { label: "Three.js / 3D", theme: "dark" },
  { label: "UI / UX Design", theme: "white" },
  { label: "Performance & SEO", theme: "white" },
  { label: "Core Web Vitals", theme: "accent" },
  { label: "Figma to Code", theme: "dark" },
  { label: "Microinteractions", theme: "white" },
  { label: "Clean Code", theme: "dark" },
  { label: "JavaScript", theme: "white" },
  { label: "Responsive Layouts", theme: "dark" },
  { label: "Animations", theme: "accent" },
  { label: "GSAP", theme: "accent" },
];

// Helper to map DB row to Project interface
function mapDbProject(row: any): Project {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline || "",
    category: row.category,
    industry: row.industry || "",
    service: row.service || "",
    year: row.year || "",
    client: row.client || "",
    role: row.role || "",
    duration: row.duration || "",
    description: row.description,
    challenge: row.challenge || "",
    solution: row.solution || "",
    tags: row.tags || [],
    cover: row.cover,
    hero: row.hero || row.cover,
    video: row.video || "",
    screens: row.screens || [],
    liveUrl: row.live_url || "",
    githubUrl: row.github_url || "",
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackProjects;
    }

    return data.map(mapDbProject);
  } catch (err) {
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return fallbackProjects.find((p) => p.slug === slug);
    }

    return mapDbProject(data);
  } catch (err) {
    return fallbackProjects.find((p) => p.slug === slug);
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackServices;
    }

    return data.map((row: any) => ({
      id: row.id,
      image: row.image,
      icon: row.icon || "✦",
      title: row.title,
      desc: row.desc_text,
      tools: row.tools || [],
      display_order: row.display_order,
    }));
  } catch (err) {
    return fallbackServices;
  }
}

export async function getSkills(): Promise<SkillItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackSkills;
    }

    return data.map((row: any) => ({
      id: row.id,
      label: row.label,
      theme: row.theme,
      display_order: row.display_order,
    }));
  } catch (err) {
    return fallbackSkills;
  }
}

export async function getAboutProfile(): Promise<AboutProfile> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("about_profile")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return fallbackAboutProfile;
    }

    return {
      id: data.id,
      headline: data.headline,
      subheadline: data.subheadline,
      intro: data.intro,
      detailed_bio: data.detailed_bio,
      highlights: data.highlights || [],
      experience_years: data.experience_years || "3+",
      resume_url: data.resume_url,
      avatar_url: data.avatar_url,
    };
  } catch (err) {
    return fallbackAboutProfile;
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackFaqs;
    }

    return data.map((row: any) => ({
      id: row.id,
      category: row.category,
      q: row.q,
      a: row.a,
      display_order: row.display_order,
    }));
  } catch (err) {
    return fallbackFaqs;
  }
}
