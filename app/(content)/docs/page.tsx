import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs"
import NextLink from "next/link"
import { Tabs } from "@/components/ui/tabs"
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
function AppFileDir() {
    return (
        <div className="bg-[#101010] rounded-md border border-black p-2">
            <FileTree type="single" collapsible>
                <FileTreeItem
                    className="border-none outline-none p-0"
                    value="item-1"
                >
                    <FileTreeTrigger className="p-0">app</FileTreeTrigger>
                    <FileTreeContent>
                        <FileTree type="single" collapsible>
                            <FileTreeItem
                                className="border-none  outline-none p-0"
                                value="item-1"
                            >
                                <FileTreeTrigger className="p-0">
                                    Is it accessible?
                                </FileTreeTrigger>
                                <FileTreeContent>
                                    w<File>index.tsx</File>
                                </FileTreeContent>
                            </FileTreeItem>
                        </FileTree>
                        <File>page.tsx</File>
                        <File>blog.ts</File>
                    </FileTreeContent>
                </FileTreeItem>
            </FileTree>
            <File>index.tsx</File>
            <File>index.tsx</File>
        </div>
    )
};
function SrcFileDir() {
    return (
        <div className="bg-[#101010] rounded-md border border-black p-2">
            <FileTree type="single" collapsible>
                <FileTreeItem
                    className="border-none outline-none p-0"
                    value="item-1"
                >
                    <FileTreeTrigger className="p-0">app</FileTreeTrigger>
                    <FileTreeContent>
                        <FileTree type="single" collapsible>
                            <FileTreeItem
                                className="border-none  outline-none p-0"
                                value="item-1"
                            >
                                <FileTreeTrigger className="p-0">
                                    Is it accessible?
                                </FileTreeTrigger>
                                <FileTreeContent>
                                    w<File>index.tsx</File>
                                </FileTreeContent>
                            </FileTreeItem>
                        </FileTree>
                        <File>page.tsx</File>
                        <File>blog.ts</File>
                    </FileTreeContent>
                </FileTreeItem>
            </FileTree>
            <File>index.tsx</File>
            <File>index.tsx</File>
        </div>
    )
};
export default async function Docs() {
    const raw = (await fs.promises.readFile("content/docs/index.mdx")).toString()
    const withoutFrontmatter: string = raw.replace(/---[sS]*?---/, '');

    return <div className="bg-[#151515] min-h-screen text-white flex items-start justify-center">
        <div className="w-[700px]">
            <MDXRemote components={{ Viewer, Link, FileTree, FileTreeItem, File, FileTreeContent, FileTreeTrigger, Tabs, SrcFileDir, AppFileDir, ...standartComponents }} source={withoutFrontmatter} />
        </div>
    </div>
}
const standartComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-3xl font-bold" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-2xl font-bold" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl font-bold" {...props} />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="text-large font-bold" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <p className="text-[#d0d0d0]" {...props} />
    ),
}