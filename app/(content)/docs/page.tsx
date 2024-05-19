import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs"
import NextLink from "next/link"
import {Tabs} from "@/components/ui/tabs"
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza"
import Viewer from "@/components/editor/Viewer";
import "@/app/globals.css"
import Link from "@/components/ui/link"
import { FileTree, FileTreeContent, FileTreeItem, FileTreeTrigger, File } from "@/components/ui/file-tree";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Docs() {
    const raw = (await fs.promises.readFile("content/docs/index.mdx")).toString()
    const withoutFrontmatter: string = raw.replace(/---[sS]*?---/, '');

    return <div className="bg-[#151515] min-h-screen text-white flex items-start justify-center">
        <div className="w-[700px]">
            <MDXRemote components={{ Viewer, Link, FileTree, FileTreeItem, File, FileTreeContent, FileTreeTrigger, Tabs, ...standartComponents }} source={withoutFrontmatter} />
        </div>
    </div>
}
const standartComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1  className="text-3xl font-bold" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2  className="text-2xl font-bold" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3  className="text-xl font-bold" {...props} />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4  className="text-large font-bold" {...props} />
    )
}