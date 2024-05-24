import matter from "gray-matter"
import fs from "node:fs"
import z from "zod"
export async function load() {
    let frontmatter = []
    fs.readdir("content", (err, files) => {
        if (err) throw new Error(err.message)
        console.log(files)
        files.forEach(async (file) => {
            const content =  fs.readFile("content/" + file, (err) => {
                if (err) throw new Error(err.message)
            }) 
            console.log(content, "content/" + file)
        })
    });
}
await load()