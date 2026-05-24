import { Download, FileText } from "lucide-react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getResume() {
  try {
    return await prisma.resume.findFirst({ where: { active: true }, orderBy: { createdAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <main className="pt-20">
      <Section eyebrow="Resume" title="Preview and download">
        <Card className="overflow-hidden p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">{resume?.title ?? "Resume placeholder"}</h2>
              <p className="mt-1 text-slate-400">Upload the current PDF from the admin panel.</p>
            </div>
            <Button asChild variant={resume?.fileUrl ? "default" : "ghost"}>
              {resume?.fileUrl ? <a href={resume.fileUrl} target="_blank" rel="noreferrer"><Download size={18} /> Download</a> : <span><Download size={18} /> Not Uploaded</span>}
            </Button>
          </div>
          <div className="grid min-h-[60vh] place-items-center rounded-md border border-white/10 bg-slate-950/70">
            {resume?.fileUrl ? (
              <iframe src={resume.fileUrl} title="Resume preview" className="h-[70vh] w-full rounded-md" />
            ) : (
              <div className="text-center text-slate-300">
                <FileText className="mx-auto mb-4 text-cyan-200" size={48} />
                Resume preview will appear here after upload.
              </div>
            )}
          </div>
        </Card>
      </Section>
    </main>
  );
}
