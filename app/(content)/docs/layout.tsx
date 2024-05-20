import type { Metadata } from "next";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from 'geist/font/sans';
import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";
import MotionDiv from "@/components/custom/motion-div";

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
        <div>
            <div className="flex mb-16 items-center">
                <h2 className=" mr-2">contentio</h2>
                <Link href="/" className="mr-2">
                    home
                </Link>
                <Link className="mr-2" href="/docs">
                    docs
                </Link>
                <Link className="mr-2" href="/docs">
                    components
                </Link>
                <Link target="blank" href="https://git.new/contentio" >
                    github
                </Link>
            </div>
            {children}
        </div>
    );
}
