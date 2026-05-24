import { Github, Linkedin, Mail } from "lucide-react";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSocials() {
  try {
    return await prisma.socialLink.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function ContactPage() {
  const socials = await getSocials();

  return (
    <main className="pt-20">
      <Section eyebrow="Contact" title="Start a conversation">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <ContactForm />
          <Card className="p-6">
            <h2 className="font-display text-2xl font-bold text-white">Social links</h2>
            <div className="mt-6 grid gap-3">
              {(socials.length ? socials : [
                { id: "github", label: "GitHub", url: "https://github.com/", icon: "github" },
                { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
                { id: "email", label: "Email", url: "mailto:vansh@example.com", icon: "mail" }
              ]).map((social) => (
                <a key={social.id} href={social.url} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-4 text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
                  {social.icon === "github" ? <Github size={20} /> : social.icon === "linkedin" ? <Linkedin size={20} /> : <Mail size={20} />}
                  {social.label}
                </a>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
}
