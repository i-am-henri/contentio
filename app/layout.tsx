import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: "next-docs | Content for your app.",
  description: "Next-docs is a modern way to add content to your nextjs app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider></body>
    </html>
  );
}
