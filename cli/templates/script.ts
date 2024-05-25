/**
 * Generate the template for the script. 
 * Please provide the route-name!
 * @param name string
 */
export const generateScriptTemplate = (name: string): string => {
    return `// Contentio 2024
import { notFound } from "next/navigation";
import matter from "gray-matter"
import fs from "node:fs"
import z from "zod"

export interface FrontMatter {
    title: string
}
const FrontMatterSchema = z.object({
    title: z.string()
})
export async function getGallery(): Promise<FrontMatter[]> {
    let frontmatter: FrontMatter[] = []
    const files = await fs.promises.readdir("content")
    files.forEach(async (file) => {
        // get the content of the file
        const content: string = fs.readFileSync("content/" + file).toString()
        const data = matter(content).data as FrontMatter
        const parse = await FrontMatterSchema.safeParseAsync(data)
        if (!parse.success) throw new Error("Types not matching. Typeerror in the frontmatter of file " + file)
        frontmatter.push(data)
    })

    return frontmatter
}

export async function getMarkdown(slug: string): Promise<string> {
    let raw: string = ""
    await fs.promises.readFile("content/${name}/" + slug + ".mdx", 'utf-8').then((data) => {
        raw = data;
    }).catch((err) => {
        console.log(err.code)
        if (err.code == "ENOENT") notFound()
    })
    if (raw == "") {
        notFound()
    }
    return raw
}`}