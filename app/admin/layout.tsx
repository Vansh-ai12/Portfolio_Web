import Link from "next/link";
import { ExternalLink, FolderKanban, Home, Layers, LogOut, UserRoundCog } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-display text-lg font-bold">
            <UserRoundCog className="text-cyan-200" size={20} />
            Admin
          </Link>
          <Button asChild size="sm" variant="outline">
            <Link href="/">
              <ExternalLink size={15} />
              Site
            </Link>
          </Button>
        </div>
        <nav className="grid grid-cols-3 gap-2">
          <Link className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-slate-200" href="/admin">Dashboard</Link>
          <Link className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-slate-200" href="/admin/projects">Projects</Link>
          <Link className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-slate-200" href="/admin/content">Content</Link>
        </nav>
      </header>
      <aside className="fixed bottom-0 left-0 top-0 hidden w-64 border-r border-white/10 bg-slate-950/75 p-5 backdrop-blur-xl lg:block">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <UserRoundCog className="text-cyan-200" />
          Vansh Admin
        </Link>
        <nav className="mt-10 grid gap-2">
          <Link className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/10" href="/admin"><Home size={16} className="mr-2 inline" /> Dashboard</Link>
          <Link className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/10" href="/admin/projects"><FolderKanban size={16} className="mr-2 inline" /> Projects</Link>
          <Link className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/10" href="/admin/content"><Layers size={16} className="mr-2 inline" /> Content</Link>
          <Link className="rounded-md px-3 py-3 text-slate-200 hover:bg-white/10" href="/"><ExternalLink size={16} className="mr-2 inline" /> View Site</Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="absolute bottom-5 left-5 right-5"
        >
          <Button variant="outline" className="w-full"><LogOut size={16} /> Sign out</Button>
        </form>
      </aside>
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
