import matter from "gray-matter"
import fs from "node:fs"
import z from "zod"


interface FrontMatter {
    title: string
}
const FrontMatterSchema = z.object({
    title: z.string()
})
export async function load(): Promise<FrontMatter[]> {
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
await load()