import type { Metadata } from "next";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from 'geist/font/sans';
import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";

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
            <body className={cn(GeistSans.className, "bg-[#151515] min-h-screen text-white flex items-start justify-center")}>
                <TooltipProvider>
                    <Toaster />
                    {children}
                </TooltipProvider>
            </body>
        </html>
    );
}
