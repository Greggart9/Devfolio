import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/data-service";
import ProjectDetail from "@/components/ProjectDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProjectBySlug(params.slug);
  return {
    title: p ? `${p.title} - Olúwadámiláre` : "Project Not Found",
    description: p ? p.description : "Project detail showcase",
  };
}

export default async function ProjectPage({ params }: Props) {
  const [allProjects, project] = await Promise.all([
    getProjects(),
    getProjectBySlug(params.slug),
  ]);

  if (!project) notFound();

  const projectIndex = allProjects.findIndex((p) => p.slug === params.slug);
  const moreProjects =
    allProjects.length > 1
      ? [
          allProjects[(projectIndex + 1) % allProjects.length],
          allProjects[(projectIndex + 2) % allProjects.length],
        ].filter(Boolean)
      : [];

  return (
    <ProjectDetail
      project={project}
      moreProjects={moreProjects}
    />
  );
}