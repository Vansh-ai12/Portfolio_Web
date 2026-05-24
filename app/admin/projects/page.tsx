import { redirect } from "next/navigation";
import { ProjectManager } from "@/components/admin/project-manager";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const [projects, categories] = await Promise.all([
    prisma.project.findMany({ include: { category: true }, orderBy: { updatedAt: "desc" } }).catch(() => []),
    prisma.category.findMany({ orderBy: { name: "asc" } }).catch(() => [])
  ]);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="font-display text-4xl font-bold">Projects</h1>
      <p className="mt-2 text-slate-400">Create, edit, feature, hide, and publish project cards.</p>
      <ProjectManager projects={JSON.parse(JSON.stringify(projects))} categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}
