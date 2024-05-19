import  {MDXRemote}  from "next-mdx-remote/rsc";
import fs from "fs"
import NextLink from "next/link"
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
import { Folder } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Docs() {
    const raw = (await fs.promises.readFile("content/docs/index.mdx")).toString()
    const withoutFrontmatter: string = raw.replace(/---[sS]*?---/, '');

    return <div className="bg-[#151515] min-h-screen text-white flex items-start justify-center">
        <div className="w-[700px]">
            <FileTree type="single" collapsible>
                <FileTreeItem className="border-none outline-none p-0" value="item-1">
                    <FileTreeTrigger className="p-0">app</FileTreeTrigger>
                    <FileTreeContent>
                        <FileTree type="single" collapsible>
                            <FileTreeItem className="border-none  outline-none p-0" value="item-1">
                                <FileTreeTrigger className="p-0">Is it accessible?</FileTreeTrigger>
                                <FileTreeContent>
                                    <File >
                                        index.tsx
                                    </File>
                                </FileTreeContent>
                            </FileTreeItem>
                        </FileTree>
                        <File>
                            page.tsx
                        </File>
                        <File>
                            blog.ts
                        </File>
                    </FileTreeContent>
                </FileTreeItem>
            </FileTree>
            <File>
                index.tsx
            </File>
            <File>
                index.tsx
            </File>
            <MDXRemote components={{ Viewer, Link }} source={withoutFrontmatter} />
            <Credenza>
                <CredenzaTrigger className="cursor-pointer" asChild>
                    <span className="relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                        <span className="text-neutral-400">authors: henri</span>
                    </span>
                </CredenzaTrigger>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>The authors of this page:</CredenzaTitle>
                        <CredenzaDescription>
                            Peope who build this page.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaBody className="grid grid-cols-3">
                        <div className="flex items-center">
                            <Avatar>
                                <AvatarFallback>HN</AvatarFallback>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/98414850?v=4" />
                            </Avatar>
                            <p className="ml-2">henri</p>
                        </div>
                    </CredenzaBody>
                    <CredenzaFooter>
                        <NextLink
                            href={`https://git.new/contentio`}
                            className={cn(buttonVariants({ variant: "default" }))}
                        >
                            GitHub
                        </NextLink>
                        <CredenzaClose asChild>
                            <Button
                                variant={"outline"}
                            >Close</Button>
                        </CredenzaClose>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </div>
    </div>
}