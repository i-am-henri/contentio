// Contentio 2024
import {type FrontMatter, getGallery} from "./[slug]/changelog"

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

