"use client";

import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContentManager({ skills, about, socials, resume }: { skills: any[]; about: any[]; socials: any[]; resume: any }) {
  const router = useRouter();
  const [skillName, setSkillName] = useState("");
  const [skillGroup, setSkillGroup] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutBody, setAboutBody] = useState("");

  async function addSkill() {
    const response = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: skillName, group: skillGroup, level: 75, visible: true, order: skills.length })
    });
    if (!response.ok) {
      toast.error("Skill could not be saved.");
      return;
    }
    toast.success("Skill saved.");
    router.refresh();
  }

  async function addAbout() {
    const response = await fetch("/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: aboutTitle, body: aboutBody })
    });
    if (!response.ok) {
      toast.error("About content could not be saved.");
      return;
    }
    toast.success("About content saved.");
    router.refresh();
  }

  async function uploadResume(formData: FormData) {
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) return;
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (!response.ok) {
      toast.error("Upload failed.");
      return;
    }
    const uploaded = await response.json();
    const save = await fetch("/api/admin/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: file.name, fileUrl: uploaded.secure_url, publicId: uploaded.public_id })
    });
    if (!save.ok) {
      toast.error("Resume could not be saved.");
      return;
    }
    toast.success("Resume uploaded.");
    router.refresh();
  }

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-2">
      <Card className="p-5">
        <h2 className="font-display text-2xl font-bold">Skills</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="Skill name" />
          <Input value={skillGroup} onChange={(e) => setSkillGroup(e.target.value)} placeholder="Group" />
        </div>
        <Button className="mt-4" onClick={addSkill}>Add skill</Button>
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => <span key={skill.id} className="rounded-md bg-white/10 px-3 py-2 text-sm">{skill.name} · {skill.group}</span>)}
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="font-display text-2xl font-bold">About content</h2>
        <div className="mt-4 grid gap-3">
          <Input value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} placeholder="Section title" />
          <Textarea value={aboutBody} onChange={(e) => setAboutBody(e.target.value)} placeholder="Section body" />
        </div>
        <Button className="mt-4" onClick={addAbout}>Add section</Button>
        <div className="mt-5 grid gap-2">
          {about.map((item) => <p key={item.id} className="rounded-md bg-white/10 px-3 py-2 text-sm">{item.title}</p>)}
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="font-display text-2xl font-bold">Resume upload</h2>
        <p className="mt-2 text-sm text-slate-400">Current: {resume?.title ?? "No active resume uploaded"}</p>
        <form action={uploadResume} className="mt-4 flex flex-wrap gap-3">
          <Input name="file" type="file" accept="application/pdf" className="max-w-sm" />
          <Button><Upload size={16} /> Upload PDF</Button>
        </form>
      </Card>

      <Card className="p-5">
        <h2 className="font-display text-2xl font-bold">Social links</h2>
        <div className="mt-5 grid gap-2">
          {(socials.length ? socials : [{ id: "empty", label: "Add social links through API or extend this panel", url: "" }]).map((social) => (
            <p key={social.id} className="rounded-md bg-white/10 px-3 py-2 text-sm">{social.label} {social.url ? `· ${social.url}` : ""}</p>
          ))}
        </div>
      </Card>
    </div>
  );
}
