// Contentio 2024
import {type FrontMatter, getGallery} from "./[slug]/blog"

export default async function Gallery() {
    const data: FrontMatter[] = await getGallery()
    return (
        <div>
            {
                data.map((data) => (
                    <div key={data.title}>
                        {data.title}
                    </div>
                ))
            }
        </div>
    )
}

