import { PrismaClient } from "@prisma/client";
import { slugify } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  for (const name of ["AI/ML", "Web Dev", "Java", "IoT", "Open Source", "Others"]) {
    await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) }
    });
  }

  const home = await prisma.homeContent.findFirst();
  if (!home) {
    await prisma.homeContent.create({
      data: {
        headline: "Vansh Jain",
        roles: ["AI Developer", "Java Developer", "Full Stack Developer", "ML Enthusiast", "Open Source Learner"],
        subheadline: "Editable premium portfolio content managed from the admin dashboard."
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
