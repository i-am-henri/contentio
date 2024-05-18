/**
 * Generate the template for the script. 
 * Please provide the route-name!
 * @param name string
 */
export const generateScriptTemplate = (name: string): string => {
    return `// file added by next-docs
import { notFound } from "next/navigation";
import fs from "node:fs"
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
}`
}