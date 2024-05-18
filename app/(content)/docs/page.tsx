import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs"
import Viewer from "@/components/editor/Viewer";
import "@/app/globals.css"
import Link from "@/components/ui/link"
export default async function Docs() {
    const raw = (await fs.promises.readFile("content/docs/index.mdx")).toString()
    const withoutFrontmatter: string = raw.replace(/---[sS]*?---/, '');

    return <div className="bg-[#151515] min-h-screen text-white flex items-start justify-center">
        <div className="w-[800px]">   
            <MDXRemote  components={{Viewer, Link}}  source={withoutFrontmatter} />
        </div>
    </div>
}