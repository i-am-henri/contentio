/**
 * Generate the template for the gallery.
 */
export const generateGalleryTemplate = (): string => {
    return `// Contentio 2024
import matter from "gray-matter"
import fs from "node:fs"
import z from "zod"
import {type FrontMatter, getGallery} from "./[slug]/script
export default async function Gallery() {
    const data: FrontMatter[] = await getGallery()
    return (
        <div>
            {
                data.map((data) => (
                    <div>
                        {data.title}
                    </div>
                ))
            }
        </div>
    )
}

`}