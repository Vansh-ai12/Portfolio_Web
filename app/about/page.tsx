import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/motion-reveal";
import { prisma } from "@/lib/prisma";
import { skillPlaceholders } from "@/lib/placeholders";

export const dynamic = "force-dynamic";

async function getAboutData() {
  try {
    const [about, skills, timeline] = await Promise.all([
      prisma.aboutContent.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
      prisma.timelineItem.findMany({ where: { visible: true }, orderBy: { order: "asc" } })
    ]);
    return { about, skills: skills.length ? skills : skillPlaceholders, timeline };
  } catch {
    return { about: [], skills: skillPlaceholders, timeline: [] };
  }
}

export default async function AboutPage() {
  const { about, skills, timeline } = await getAboutData();
  const sections = about.length
    ? about
    : [
        { id: "intro", title: "Intro", body: "Editable intro placeholder. Add Vansh's real story from the admin dashboard." },
        { id: "journey", title: "Journey", body: "Editable journey placeholder. Add learning milestones, internships, community work, and technical interests." },
        { id: "stack", title: "Tech Stack", body: "Editable stack placeholder. Keep this aligned with current strengths and project evidence." }
      ];

  return (
    <main className="pt-20">
      <Section eyebrow="About" title="Editable story, skills, education, and experience">
        <div className="grid gap-5 lg:grid-cols-3">
          {sections.map((item, index) => (
            <MotionReveal key={item.id} delay={index * 0.06}>
              <Card className="h-full p-6">
                <h2 className="font-display text-2xl font-bold text-white">{item.title}</h2>
                <p className="mt-4 leading-7 text-slate-300">{item.body}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Skills" title="Capability map">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.name} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-white">{skill.name}</span>
                <span className="text-sm text-cyan-200">{skill.group}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" style={{ width: `${skill.level}%` }} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Timeline" title="Experience and education">
        <div className="grid gap-4">
          {(timeline.length ? timeline : [
            { id: "experience", type: "Experience", title: "Experience placeholder", org: "Editable", startDate: "Start", endDate: "End", body: "Add experience entries from the admin dashboard." },
            { id: "education", type: "Education", title: "Education placeholder", org: "Editable", startDate: "Start", endDate: "End", body: "Add education entries from the admin dashboard." }
          ]).map((item) => (
            <Card key={item.id} className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{item.type}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{item.org} · {item.startDate} - {item.endDate}</p>
              <p className="mt-4 text-slate-300">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
