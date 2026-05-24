import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Vansh Jain | AI & Full Stack Developer",
    template: "%s | Vansh Jain"
  },
  description:
    "A premium 3D developer portfolio for Vansh Jain, showcasing AI, full-stack, Java, ML, and open-source work.",
  openGraph: {
    title: "Vansh Jain | AI & Full Stack Developer",
    description: "Interactive 3D portfolio and project showcase.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${space.variable} noise font-sans antialiased`}>
        <SiteNav />
        {children}
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
