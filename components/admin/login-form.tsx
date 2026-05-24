"use client";

import { signIn } from "next-auth/react";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });
    setLoading(false);
    if (result?.error) {
      toast.error("Invalid admin credentials.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8">
        <ShieldCheck className="mb-4 text-cyan-200" size={42} />
        <h1 className="font-display text-3xl font-bold text-white">Admin login</h1>
        <p className="mt-2 text-slate-400">Protected dashboard for managing portfolio content.</p>
      </div>
      <form action={submit} className="grid gap-4">
        <Input name="email" type="email" placeholder="Admin email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" size={18} /> : null}
          {loading ? "Checking..." : "Login"}
        </Button>
      </form>
      <p className="mt-5 text-sm text-slate-400">Only the admin credentials in `.env.local` are allowed.</p>
    </Card>
  );
}
