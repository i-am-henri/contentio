import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs"
import Viewer from "@/components/editor/Viewer";
import "@/app/globals.css"
import Link from "@/components/ui/link"
import { FileTree, FileTreeContent, FileTreeItem, FileTreeTrigger, File } from "@/components/ui/file-tree";
import { Folder } from "lucide-react";
export default async function Docs() {
    const raw = (await fs.promises.readFile("content/docs/index.mdx")).toString()
    const withoutFrontmatter: string = raw.replace(/---[sS]*?---/, '');

    return <div className="bg-[#151515] min-h-screen text-white flex items-start justify-center">
        <div className="w-[800px]">
            <FileTree type="single" collapsible>
                <FileTreeItem className="border-none outline-none p-0" value="item-1">
                    <FileTreeTrigger className="p-0">app</FileTreeTrigger>
                    <FileTreeContent>
                        <FileTree type="single" collapsible>
                            <FileTreeItem className="border-none  outline-none p-0" value="item-1">
                                <FileTreeTrigger  className="p-0">Is it accessible?</FileTreeTrigger>
                                <FileTreeContent>
                                    <File >
                                        index.tsx
                                    </File>
                                </FileTreeContent>
                            </FileTreeItem>
                        </FileTree>
                    </FileTreeContent>
                </FileTreeItem>
            </FileTree>
            <MDXRemote components={{ Viewer, Link }} source={withoutFrontmatter} />
        </div>
    </div>
}