import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs"
export default async function Docs() {
    const raw = (await fs.promises.readFile("content/docs/index.mdx")).toString()
    const withoutFrontmatter: string = raw.replace(/---[sS]*?---/, '');
    return <MDXRemote source={withoutFrontmatter} />
}