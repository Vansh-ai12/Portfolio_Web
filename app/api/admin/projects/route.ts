import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { projectSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const project = await prisma.project.create({
    data: {
      ...data,
      slug: `${slugify(data.title)}-${Date.now()}`,
      categoryId: data.categoryId || undefined,
      githubUrl: data.githubUrl || null,
      liveUrl: data.liveUrl || null,
      thumbnail: data.thumbnail || null,
      completionDate: data.completionDate ? new Date(data.completionDate) : null
    }
  });

  return NextResponse.json(project);
}
