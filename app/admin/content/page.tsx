import { redirect } from "next/navigation";
import { ContentManager } from "@/components/admin/content-manager";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const data = await Promise.all([
    prisma.skill.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.aboutContent.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.resume.findFirst({ where: { active: true }, orderBy: { createdAt: "desc" } }).catch(() => null)
  ]);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="font-display text-4xl font-bold">Content</h1>
      <p className="mt-2 text-slate-400">Update homepage, about, skills, social links, and resume assets.</p>
      <ContentManager skills={JSON.parse(JSON.stringify(data[0]))} about={JSON.parse(JSON.stringify(data[1]))} socials={JSON.parse(JSON.stringify(data[2]))} resume={JSON.parse(JSON.stringify(data[3]))} />
    </div>
  );
}
