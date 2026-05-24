import { ProjectBrowser } from "@/components/project-browser";
import { Section } from "@/components/section";
import { prisma } from "@/lib/prisma";
import { projectPlaceholders } from "@/lib/placeholders";

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { visible: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
    });
    return projects.length ? projects : projectPlaceholders;
  } catch {
    return projectPlaceholders;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="pt-20">
      <Section eyebrow="Projects" title="Searchable 3D project showcase">
        <ProjectBrowser projects={JSON.parse(JSON.stringify(projects))} />
      </Section>
    </main>
  );
}
