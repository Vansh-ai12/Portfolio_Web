"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    setLoading(false);

    if (!response.ok) {
      toast.error("Message could not be sent. Please check the fields.");
      return;
    }
    toast.success("Message sent successfully.");
  }

  return (
    <Card className="p-6">
      <form action={submit} className="grid gap-4">
        <Input name="name" placeholder="Your name" required />
        <Input name="email" type="email" placeholder="Your email" required />
        <Input name="subject" placeholder="Subject" required />
        <Textarea name="message" placeholder="Write your message" required />
        <Button disabled={loading} className="w-fit">
          <Send size={18} />
          {loading ? "Sending..." : "Send message"}
        </Button>
      </form>
    </Card>
  );
}
