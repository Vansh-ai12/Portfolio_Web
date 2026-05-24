import Link from "next/link";
import { ArrowRight, Download, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleRotator } from "@/components/role-rotator";
import { MotionReveal } from "@/components/motion-reveal";
import { Section } from "@/components/section";
import { ProjectBrowser } from "@/components/project-browser";
import { ProfessionalBackdrop } from "@/components/professional-backdrop";
import { prisma } from "@/lib/prisma";
import { projectPlaceholders, roles } from "@/lib/placeholders";

export const dynamic = "force-dynamic";

async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { visible: true, featured: true },
      include: { category: true },
      orderBy: { updatedAt: "desc" },
      take: 3
    });
    return projects.length ? projects : projectPlaceholders;
  } catch {
    return projectPlaceholders;
  }
}

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <main>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
        <ProfessionalBackdrop />
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <MotionReveal>
            <div>
              <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                AI, full-stack, Java, and product engineering
              </p>
              <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-7xl">
                Vansh Jain
                <br />
                <RoleRotator roles={roles} />
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A clean, fast portfolio for presenting real projects, technical depth, resume updates, and secure admin-managed content.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild><Link href="/projects"><Rocket size={18} /> View Projects</Link></Button>
                <Button asChild variant="outline"><Link href="/resume"><Download size={18} /> Resume</Link></Button>
                <Button asChild variant="ghost"><Link href="/contact"><Mail size={18} /> Contact</Link></Button>
              </div>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <div className="glass rounded-lg p-6">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">Portfolio console</p>
                  <h2 className="font-display text-2xl font-bold text-white">Project-first profile</h2>
                </div>
                <span className="rounded-md bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-200">Live</span>
              </div>
              <div className="grid gap-3">
                {["Admin-managed projects", "Resume preview and download", "Searchable case studies", "Secure private dashboard"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] p-4 text-slate-200">
                    <span>{item}</span>
                    <ArrowRight size={18} className="text-cyan-200" />
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Section eyebrow="Featured Work" title="Project cards built for real engineering context">
        <ProjectBrowser projects={JSON.parse(JSON.stringify(projects))} />
      </Section>
    </main>
  );
}
