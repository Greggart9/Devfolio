import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetail from "@/components/ProjectDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = projects.find((item) => item.slug === params.slug);
  return {
    title: p ? `${p.title} — Olúwadámiláre` : "Project Not Found",
    description: p ? p.description : "Project detail showcase",
  };
}

export default function ProjectPage({ params }: Props) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const moreProjects = [
    projects[(projectIndex + 1) % projects.length],
    projects[(projectIndex + 2) % projects.length],
  ];

  return (
    <ProjectDetail
      project={project}
      moreProjects={moreProjects}
    />
  );
}