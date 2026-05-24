import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body.title || !body.fileUrl) return NextResponse.json({ error: "Invalid resume" }, { status: 400 });
  await prisma.resume.updateMany({ data: { active: false } });
  return NextResponse.json(await prisma.resume.create({ data: { title: body.title, fileUrl: body.fileUrl, publicId: body.publicId, active: true } }));
}
