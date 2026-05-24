import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body.title || !body.body) return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  const count = await prisma.aboutContent.count();
  return NextResponse.json(await prisma.aboutContent.create({
    data: { key: `${slugify(body.title)}-${Date.now()}`, title: body.title, body: body.body, order: count }
  }));
}
