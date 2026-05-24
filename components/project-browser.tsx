"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Search, Shield, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/placeholders";
import { FancySelect } from "@/components/ui/fancy-select";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string | null;
  screenshots?: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  status: string;
  featured: boolean;
  completionDate?: Date | string | null;
  category?: { name: string; slug: string } | null;
};

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesQuery = `${project.title} ${project.description} ${project.techStack.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "All" || project.category?.name === category;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "featured") return Number(b.featured) - Number(a.featured);
        if (sort === "title") return a.title.localeCompare(b.title);
        return String(b.completionDate ?? "").localeCompare(String(a.completionDate ?? ""));
      });
  }, [category, projects, query, sort]);

  return (
    <>
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, tech, or category" className="pl-10" />
        </label>
        <FancySelect
          label="Project category"
          value={category}
          onChange={setCategory}
          options={categories.map((item) => ({ label: item, value: item }))}
        />
        <FancySelect
          label="Project sorting"
          value={sort}
          onChange={setSort}
          options={[
            { label: "Featured first", value: "featured" },
            { label: "Most recent", value: "recent" },
            { label: "Title", value: "title" }
          ]}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, index) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => setActive(project)}
            className="group text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
          >
            <Card className="relative h-full overflow-hidden p-5">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-cyan-400/20 via-fuchsia-400/20 to-emerald-300/20 opacity-70" />
              <div className="relative mb-5 grid aspect-video place-items-center overflow-hidden rounded-md border border-white/10 bg-slate-950/70">
                {project.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.thumbnail} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <Sparkles className="text-cyan-200" size={42} />
                )}
              </div>
              <div className="relative">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {project.category?.name ?? "Others"}
                  </span>
                  {project.featured ? <span className="text-xs font-semibold text-fuchsia-200">Featured</span> : null}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-md bg-white/8 px-2 py-1 text-xs text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-md" onClick={() => setActive(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">{active.status.replace("_", " ")}</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-white">{active.title}</h3>
              </div>
              <Button variant="ghost" onClick={() => setActive(null)}>Close</Button>
            </div>
            <p className="leading-7 text-slate-300">{active.description}</p>
            {active.screenshots?.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.screenshots.map((src) => (
                  <div key={src} className="aspect-video overflow-hidden rounded-md border border-white/10 bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button asChild variant={active.githubUrl ? "outline" : "ghost"}>
                {active.githubUrl ? (
                  <a href={active.githubUrl} target="_blank" rel="noreferrer"><Github size={18} /> GitHub Repo</a>
                ) : (
                  <span><Shield size={18} /> Private Repository</span>
                )}
              </Button>
              <Button asChild variant={active.liveUrl ? "default" : "ghost"}>
                {active.liveUrl ? (
                  <a href={active.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Live Demo</a>
                ) : (
                  <span><ExternalLink size={18} /> Demo Not Available</span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
