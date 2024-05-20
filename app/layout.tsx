import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from 'geist/font/sans';
import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Contentio | the contnet package",
    absolute: "Home | Contentio",
    template: "%s | Contentio"
  },
  description: "Contentio is a NodeJS Cli to add and handle content in NextJS.",
  keywords: [
    "NextJS", "nextjs", "next", "markdown nextjs", "nextjs cli", "markdown in nextjs", "markdown cli", "markdown nextjs cli", "contentio", "content"
  ],
  authors: [
    {
      name: "henri",
      url: "https://henri.gg"
    }
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Contentio",
    description: "Contentio is a Cli to add content fast and easy to nextjs.",
    type: "website",
    siteName: "contentio"
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, "bg-[#151515] min-h-screen text-white flex items-start justify-center")}>
        <TooltipProvider>
          <Toaster />
          <div className="w-[700px] pt-20">
            {children}
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
