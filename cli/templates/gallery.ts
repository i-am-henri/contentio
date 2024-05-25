/**
 * Generate the template for the gallery.
 */
export const generateGalleryTemplate = (name: string): string => {
    return `// Contentio 2024
import {type FrontMatter, getGallery} from "./[slug]/${name}"

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