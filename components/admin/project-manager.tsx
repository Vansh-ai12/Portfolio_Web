"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  featured: boolean;
  visible: boolean;
  categoryId?: string;
  completionDate?: string;
};

type Category = { id: string; name: string };

const emptyProject: Partial<Project> = {
  title: "",
  description: "",
  techStack: [],
  thumbnail: "",
  screenshots: [],
  githubUrl: "",
  liveUrl: "",
  status: "IN_PROGRESS",
  featured: false,
  visible: true
};

export function ProjectManager({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Partial<Project>>(projects[0] ?? emptyProject);
  const [tech, setTech] = useState((projects[0]?.techStack ?? []).join(", "));
  const [newCategory, setNewCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (!response.ok) throw new Error("Upload failed");
    return response.json() as Promise<{ secure_url: string }>;
  }

  async function uploadThumbnail(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const uploaded = await uploadFile(file);
      setSelected((value) => ({ ...value, thumbnail: uploaded.secure_url }));
      toast.success("Thumbnail uploaded.");
    } catch {
      toast.error("Thumbnail upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function uploadGallery(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map(uploadFile));
      setSelected((value) => ({
        ...value,
        screenshots: [...(value.screenshots ?? []), ...uploaded.map((item) => item.secure_url)]
      }));
      toast.success("Gallery uploaded.");
    } catch {
      toast.error("Gallery upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function addCategory() {
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory })
    });
    if (!response.ok) {
      toast.error("Category could not be created.");
      return;
    }
    toast.success("Category created.");
    setNewCategory("");
    router.refresh();
  }

  async function save() {
    const body = { ...selected, techStack: tech.split(",").map((item) => item.trim()).filter(Boolean), screenshots: selected.screenshots ?? [] };
    const response = await fetch(selected.id ? `/api/admin/projects/${selected.id}` : "/api/admin/projects", {
      method: selected.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      toast.error("Project could not be saved.");
      return;
    }
    toast.success("Project saved.");
    router.refresh();
  }

  async function removeProject() {
    if (!selected.id) return;
    const response = await fetch(`/api/admin/projects/${selected.id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Project could not be deleted.");
      return;
    }
    toast.success("Project deleted.");
    setSelected(emptyProject);
    setTech("");
    router.refresh();
  }

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card className="p-4">
        <Button className="mb-4 w-full" onClick={() => { setSelected(emptyProject); setTech(""); }}><Plus size={16} /> New project</Button>
        <div className="mb-4 grid gap-2 border-b border-white/10 pb-4">
          <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category" />
          <Button variant="outline" onClick={addCategory} disabled={!newCategory.trim()}>Add category</Button>
        </div>
        <div className="grid gap-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => { setSelected(project); setTech(project.techStack.join(", ")); }}
              className="rounded-md border border-white/10 bg-white/5 p-3 text-left text-sm text-slate-200 hover:border-cyan-300/40"
            >
              <span className="block font-semibold text-white">{project.title}</span>
              <span>{project.visible ? "Visible" : "Hidden"} · {project.status.replace("_", " ")}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input value={selected.title ?? ""} onChange={(e) => setSelected({ ...selected, title: e.target.value })} placeholder="Title" />
          <select value={selected.status ?? "IN_PROGRESS"} onChange={(e) => setSelected({ ...selected, status: e.target.value })} className="h-11 rounded-md border border-white/15 bg-slate-950/70 px-3 text-sm text-white">
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <Input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Tech stack, comma separated" />
          <select value={selected.categoryId ?? ""} onChange={(e) => setSelected({ ...selected, categoryId: e.target.value })} className="h-11 rounded-md border border-white/15 bg-slate-950/70 px-3 text-sm text-white">
            <option value="">No category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          <Input value={selected.githubUrl ?? ""} onChange={(e) => setSelected({ ...selected, githubUrl: e.target.value })} placeholder="GitHub URL (optional)" />
          <Input value={selected.liveUrl ?? ""} onChange={(e) => setSelected({ ...selected, liveUrl: e.target.value })} placeholder="Live URL (optional)" />
          <Input value={selected.thumbnail ?? ""} onChange={(e) => setSelected({ ...selected, thumbnail: e.target.value })} placeholder="Thumbnail URL or Cloudinary URL" />
          <Input type="date" value={selected.completionDate?.slice(0, 10) ?? ""} onChange={(e) => setSelected({ ...selected, completionDate: e.target.value })} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-300">
            Thumbnail upload
            <Input type="file" accept="image/*" onChange={(e) => uploadThumbnail(e.target.files?.[0])} disabled={uploading} />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Gallery upload
            <Input type="file" accept="image/*" multiple onChange={(e) => uploadGallery(e.target.files)} disabled={uploading} />
          </label>
        </div>
        {(selected.screenshots?.length ?? 0) > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {selected.screenshots?.map((src) => (
              <div key={src} className="aspect-video overflow-hidden rounded-md border border-white/10 bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}
        <Textarea className="mt-4" value={selected.description ?? ""} onChange={(e) => setSelected({ ...selected, description: e.target.value })} placeholder="Description" />
        <div className="mt-4 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-200"><input type="checkbox" checked={selected.featured ?? false} onChange={(e) => setSelected({ ...selected, featured: e.target.checked })} /> Featured</label>
          <label className="flex items-center gap-2 text-sm text-slate-200"><input type="checkbox" checked={selected.visible ?? true} onChange={(e) => setSelected({ ...selected, visible: e.target.checked })} /> Visible</label>
        </div>
        <div className="mt-6 flex gap-3">
          <Button onClick={save}><Save size={16} /> Save</Button>
          <Button variant="outline" onClick={removeProject} disabled={!selected.id}><Trash2 size={16} /> Delete</Button>
        </div>
      </Card>
    </div>
  );
}
