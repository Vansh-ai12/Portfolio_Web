export const roles = ["AI Developer", "Java Developer", "Full Stack Developer", "ML Enthusiast", "Open Source Learner"];

export const projectPlaceholders = [
  {
    id: "placeholder-1",
    title: "AI Research Workspace",
    slug: "ai-research-workspace",
    description:
      "A structured placeholder for an AI project. Replace this from the admin dashboard with the real problem statement, architecture, metrics, and links.",
    techStack: ["Next.js", "Python", "ML", "Vector DB"],
    thumbnail: "",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    status: "IN_PROGRESS",
    featured: true,
    visible: true,
    completionDate: null,
    category: { name: "AI/ML", slug: "ai-ml" }
  },
  {
    id: "placeholder-2",
    title: "Full Stack Product System",
    slug: "full-stack-product-system",
    description:
      "A production-style web project placeholder for case studies, deployment notes, authentication, APIs, and UI decisions.",
    techStack: ["Next.js", "TypeScript", "Prisma", "MongoDB"],
    thumbnail: "",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    status: "PLANNED",
    featured: false,
    visible: true,
    completionDate: null,
    category: { name: "Web Dev", slug: "web-dev" }
  },
  {
    id: "placeholder-3",
    title: "Java Systems Project",
    slug: "java-systems-project",
    description:
      "A Java-focused placeholder for backend, OOP, data structures, or system design work. Add repository and demo links when public.",
    techStack: ["Java", "Spring", "SQL"],
    thumbnail: "",
    screenshots: [],
    githubUrl: "",
    liveUrl: "",
    status: "COMPLETED",
    featured: false,
    visible: true,
    completionDate: null,
    category: { name: "Java", slug: "java" }
  }
];

export const categories = ["All", "AI/ML", "Web Dev", "Java", "IoT", "Open Source", "Others"];

export const skillPlaceholders = [
  { name: "Machine Learning", group: "AI", level: 78 },
  { name: "Next.js", group: "Frontend", level: 84 },
  { name: "Java", group: "Backend", level: 82 },
  { name: "Database Design", group: "Systems", level: 74 },
  { name: "Cloud Deployment", group: "DevOps", level: 68 },
  { name: "Open Source Workflow", group: "Collaboration", level: 72 }
];
