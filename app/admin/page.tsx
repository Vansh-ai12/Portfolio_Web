import Link from "next/link";
import { ArrowRight, FileText, FolderKanban, Home, Image, Layers, Star } from "lucide-react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const [projects, featured, skills, resumes] = await Promise.all([
    prisma.project.count().catch(() => 0),
    prisma.project.count({ where: { featured: true } }).catch(() => 0),
    prisma.skill.count().catch(() => 0),
    prisma.resume.count().catch(() => 0)
  ]);

  const stats = [
    { label: "Projects", value: projects, icon: FolderKanban },
    { label: "Featured", value: featured, icon: Star },
    { label: "Skills", value: skills, icon: Layers },
    { label: "Resume files", value: resumes, icon: Image }
  ];

  const actions = [
    {
      title: "Add or edit projects",
      description: "Create project cards with tech stack, repo link, live demo, private/demo unavailable states, thumbnail, and gallery uploads.",
      href: "/admin/projects",
      icon: FolderKanban
    },
    {
      title: "Manage resume and content",
      description: "Upload resume PDF, add about sections, manage skills, and update portfolio content.",
      href: "/admin/content",
      icon: FileText
    },
    {
      title: "Open homepage",
      description: "Preview the public visitor website exactly as normal users see it.",
      href: "/",
      icon: Home
    }
  ];

  return (
    <div className="p-5 lg:p-8">
      <h1 className="font-display text-4xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-400">Manage projects, content, links, resume, and visibility.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <stat.icon className="mb-5 text-cyan-200" />
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 font-display text-4xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="group h-full p-6 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.06]">
              <action.icon className="mb-5 text-cyan-200" />
              <h2 className="font-display text-2xl font-bold text-white">{action.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{action.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                Open <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
